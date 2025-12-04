// lib/core/api_client.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/app_config.dart';

class ApiClient {
  String? _token;

  void setToken(String? token) {
    _token = token;
  }

  Uri _buildUri(String path) {
    return Uri.parse(apiBaseUrl + path);
  }

  Future<dynamic> get(String path) async {
    final res = await http.get(_buildUri(path), headers: _headers());
    return _handleResponse(res);
  }

  Future<dynamic> post(String path, {Object? body}) async {
    final res = await http.post(
      _buildUri(path),
      headers: _headers(),
      body: body == null ? null : jsonEncode(body),
    );
    return _handleResponse(res);
  }

  Future<dynamic> patch(String path, {Object? body}) async {
    final res = await http.patch(
      _buildUri(path),
      headers: _headers(),
      body: body == null ? null : jsonEncode(body),
    );
    return _handleResponse(res);
  }

  Map<String, String> _headers() {
    final headers = <String, String>{'Content-Type': 'application/json'};
    if (_token != null) {
      headers['Authorization'] = 'Bearer $_token';
    }
    return headers;
  }

  dynamic _handleResponse(http.Response res) {
    if (res.statusCode == 204) return null;
    if (res.statusCode < 200 || res.statusCode >= 300) {
      // try parse error text/json
      final bodyText = res.body;
      throw Exception(bodyText.isNotEmpty ? bodyText : res.reasonPhrase);
    }
    if (res.body.isEmpty) return null;
    return jsonDecode(res.body);
  }
}
