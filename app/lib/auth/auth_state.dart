import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../core/api_client.dart';

class AuthState extends ChangeNotifier {
  AuthState({FlutterSecureStorage? storage})
    : _storage = storage ?? const FlutterSecureStorage() {
    apiClient.onUnauthorized = () => logout();
  }

  static const _tokenKey = 'khaikhai_access_token';
  final FlutterSecureStorage _storage;
  final ApiClient apiClient = ApiClient();
  String? _token;
  String? _role;

  bool get isAuthenticated => _token != null && _role == 'student';
  String? get role => _role;

  Future<void> loadFromStorage() async {
    final storedToken = await _storage.read(key: _tokenKey);
    if (storedToken == null || !_applyToken(storedToken, notify: false)) {
      await _clearSession(notify: false);
    }
  }

  Future<void> login(String token) async {
    if (!_applyToken(token, notify: false) || _role != 'student') {
      await _clearSession(notify: false);
      throw const ApiException(
        'This Android app is available to students only.',
      );
    }
    await _storage.write(key: _tokenKey, value: token);
    notifyListeners();
  }

  Future<void> logout() => _clearSession();

  Future<void> _clearSession({bool notify = true}) async {
    _token = null;
    _role = null;
    apiClient.setToken(null);
    await _storage.delete(key: _tokenKey);
    if (notify) notifyListeners();
  }

  bool _applyToken(String token, {bool notify = true}) {
    try {
      final parts = token.split('.');
      if (parts.length != 3) return false;
      final payload =
          jsonDecode(
                utf8.decode(base64Url.decode(base64Url.normalize(parts[1]))),
              )
              as Map<String, dynamic>;
      final expiresAt = payload['exp'] as int?;
      final role = payload['role'] as String?;
      if (expiresAt == null ||
          DateTime.fromMillisecondsSinceEpoch(
            expiresAt * 1000,
          ).isBefore(DateTime.now())) {
        return false;
      }
      if (role != 'student') return false;
      _token = token;
      _role = role;
      apiClient.setToken(token);
      if (notify) notifyListeners();
      return true;
    } on FormatException {
      return false;
    } on TypeError {
      return false;
    }
  }

  @override
  void dispose() {
    apiClient.close();
    super.dispose();
  }
}
