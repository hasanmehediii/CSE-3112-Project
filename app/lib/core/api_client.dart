import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;

import '../config/app_config.dart';

class ApiException implements Exception {
  const ApiException(this.message, {this.statusCode, this.code});
  final String message;
  final int? statusCode;
  final String? code;

  @override
  String toString() => message;
}

class ApiClient {
  ApiClient({http.Client? client}) : _client = client ?? http.Client();

  final http.Client _client;
  static const _timeout = Duration(seconds: 15);
  String? _token;
  Future<void> Function()? onUnauthorized;

  void setToken(String? token) => _token = token;

  Future<Object?> get(String path) => _send('GET', path);
  Future<Object?> post(String path, {Object? body}) =>
      _send('POST', path, body: body);
  Future<Object?> patch(String path, {Object? body}) =>
      _send('PATCH', path, body: body);

  Future<Object?> _send(String method, String path, {Object? body}) async {
    try {
      final request = http.Request(method, Uri.parse('$apiBaseUrl$path'));
      request.headers.addAll(_headers());
      if (body != null) request.body = jsonEncode(body);
      final streamed = await _client.send(request).timeout(_timeout);
      final response = await http.Response.fromStream(streamed);
      return _handleResponse(response);
    } on TimeoutException {
      throw const ApiException(
        'The server took too long to respond. Please try again.',
        code: 'timeout',
      );
    } on SocketException {
      throw const ApiException(
        'No connection to the server. Check your internet connection.',
        code: 'offline',
      );
    } on http.ClientException {
      throw const ApiException(
        'Unable to reach the server. Please try again.',
        code: 'network_error',
      );
    }
  }

  Map<String, String> _headers() => {
    'Content-Type': 'application/json',
    if (_token != null) 'Authorization': 'Bearer $_token',
  };

  Future<Object?> _handleResponse(http.Response response) async {
    if (response.statusCode == 401) await onUnauthorized?.call();
    if (response.statusCode == 204) return null;
    Object? decoded;
    if (response.body.isNotEmpty) {
      try {
        decoded = jsonDecode(response.body);
      } on FormatException {
        decoded = null;
      }
    }
    if (response.statusCode < 200 || response.statusCode >= 300) {
      final envelope = decoded is Map<String, dynamic> ? decoded : null;
      final error = envelope?['error'];
      final message = error is Map<String, dynamic>
          ? error['message'] as String?
          : envelope?['detail'] as String?;
      throw ApiException(
        message ?? response.reasonPhrase ?? 'Request failed',
        statusCode: response.statusCode,
        code: error is Map<String, dynamic> ? error['code'] as String? : null,
      );
    }
    return decoded;
  }

  void close() => _client.close();
}
