import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'storage_service.dart';
import 'package:khaikhai/models/canteen_model.dart';
import 'package:khaikhai/models/meal_model.dart';
import 'package:khaikhai/models/budget_model.dart';

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

  static Future<Map<String, dynamic>> updateProfile(Map<String, dynamic> data) async {
    final token = await StorageService.getToken();
    print("TOKEN = $token");
    final response = await http.patch(
      Uri.parse("$baseUrl/user/update-profile"),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $token",
      },
      body: jsonEncode(data),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to update profile: ${response.body}');
    }
  }

  static Future<List<Canteen>> getAllCanteens() async {
    final response = await http.get(Uri.parse("$baseUrl/canteens"));

    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Canteen.fromJson(e)).toList();
    } else {
      throw Exception("Failed to load canteens: ${response.body}");
    }
  }


  static Future<List<Meal>> getCanteenMeals(String canteenId) async {
    final response = await http.get(Uri.parse("$baseUrl/canteens/$canteenId/meals"));

    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Meal.fromJson(e)).toList();
    } else {
      throw Exception('Failed to fetch meals: ${response.body}');
    }
  }


  // Set monthly budget
  static Future<Budget> setMonthlyBudget(double amount, String token) async {
    final response = await http.post(
      Uri.parse('$baseUrl/budget/set-budget'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode({'monthly_budget': amount}),
    );

    if (response.statusCode == 200) {
      return Budget.fromJson(jsonDecode(response.body)['budget']);
    } else {
      throw Exception('Failed to set budget: ${response.body}');
    }
  }

  // Get budget
  static Future<Budget> getBudget(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/budget/get-budget'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return Budget.fromJson(jsonDecode(response.body)['budget']);
    } else {
      throw Exception('Failed to fetch budget: ${response.body}');
    }
  }

  // Recommend meals within daily budget
  static List<Meal> recommendMeals(List<Meal> meals, double dailyBudget) {
    // Simple greedy approach: pick meals <= daily budget
    meals.sort((a, b) => a.price.compareTo(b.price));
    double total = 0;
    List<Meal> recommended = [];

    for (var meal in meals) {
      if (total + meal.price <= dailyBudget) {
        recommended.add(meal);
        total += meal.price;
      }
    }

    return recommended;
  }


  // Fetch all meals (from all canteens)
  static Future<List<Meal>> getAllMeals() async {
    final response = await http.get(Uri.parse('$baseUrl/meals/'));

    if (response.statusCode == 200) {
      final List data = jsonDecode(response.body);
      return data.map((e) => Meal.fromJson(e)).toList();
    } else {
      throw Exception('Failed to fetch all meals: ${response.body}');
    }
  }


}
