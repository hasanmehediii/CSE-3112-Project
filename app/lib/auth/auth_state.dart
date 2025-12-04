// lib/auth/auth_state.dart
import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/api_client.dart';

class AuthState extends ChangeNotifier {
  final ApiClient apiClient = ApiClient();
  String? _token;
  String? _role; // will be "student" for this app

  bool get isAuthenticated => _token != null;
  String? get role => _role;

  Future<void> loadFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    final storedToken = prefs.getString('token');
    if (storedToken != null) {
      _applyToken(storedToken, notify: false);
    }
  }

  Future<void> login(String token) async {
    _applyToken(token);
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
  }

  Future<void> logout() async {
    _token = null;
    _role = null;
    apiClient.setToken(null);
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    notifyListeners();
  }

  void _applyToken(String token, {bool notify = true}) {
    _token = token;
    apiClient.setToken(token);

    try {
      final parts = token.split('.');
      if (parts.length >= 2) {
        final payload =
            jsonDecode(
                  utf8.decode(base64Url.decode(base64Url.normalize(parts[1]))),
                )
                as Map<String, dynamic>;
        _role = payload['role'] as String?;
      }
    } catch (_) {
      _role = null;
    }

    if (notify) notifyListeners();
  }
}
