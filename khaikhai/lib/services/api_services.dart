import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiService {
  //static final String baseUrl = dotenv.env['API_BASE_URL'] ?? "http://192.168.0.103:8000"; // your FastAPI base
  static final String baseUrl = dotenv.env['API_BASE_URL'] ?? "http://127.0.0.1:8000";
  static Future<Map<String, dynamic>> loginUser(
    String email,
    String password,
  ) async {
    final response = await http.post(
      Uri.parse("$baseUrl/auth/login"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"email": email, "password": password}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception(jsonDecode(response.body)["detail"] ?? "Login failed");
    }
  }
}
