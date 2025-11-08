import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../models/user_profile.dart';
import '../services/storage_service.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class UserProfileProvider with ChangeNotifier {
  UserProfile? _userProfile;

  UserProfile? get userProfile => _userProfile;

  bool get isLoggedIn => _userProfile != null;

  void setUserProfile(UserProfile profile) {
    _userProfile = profile;
    notifyListeners();
  }

  void clearUserProfile() {
    _userProfile = null;
    notifyListeners();
  }

  /// Fetch profile from FastAPI endpoint `/user/profile`
  Future<void> fetchUserProfile() async {
    final token = await StorageService.getToken();
    if (token == null) {
      throw Exception('No authentication token available');
    }

    try {
      final response = await http.get(
        Uri.parse('${dotenv.env['BASE_URL']}/user/profile'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        /// FastAPI returns `_id` as {"$oid": "..."} unless you flatten it.
        // final normalized = {
        //   "_id": data["_id"] is Map ? data["_id"]["\$oid"] : data["_id"],
        //   "name": data["name"],
        //   "email": data["email"],
        //   "role": data["role"],
        //   "profile_image": data["profile_image"],
        //   "preferences": data["preferences"],
        //   "created_at": data["created_at"] is Map
        //       ? data["created_at"]["\$date"]
        //       : data["created_at"],
        // };

        //_userProfile = UserProfile.fromJson(normalized);
        _userProfile = UserProfile.fromJson(data);
        await StorageService.saveUserProfile(_userProfile!);
        notifyListeners();
      } else {
        throw Exception(
            'Failed to fetch user profile: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching user profile: $e');
    }
  }

  /// Example: update profile image or preferences
  Future<void> updateProfileImage(String newUrl) async {
    final token = await StorageService.getToken();
    if (token == null) {
      throw Exception('No authentication token available');
    }

    try {
      final response = await http.patch(
        Uri.parse('${dotenv.env['BASE_URL']}/user/update-profile'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({"profile_image": newUrl}),
      );

      if (response.statusCode == 200) {
        _userProfile = UserProfile(
          id: _userProfile!.id,
          name: _userProfile!.name,
          email: _userProfile!.email,
          role: _userProfile!.role,
          profileImage: newUrl,
          diet: _userProfile!.diet,
          allergies: _userProfile!.allergies,
          createdAt: _userProfile!.createdAt,
        );

        await StorageService.saveUserProfile(_userProfile!);
        notifyListeners();
      } else {
        throw Exception(
            'Failed to update profile image: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error updating profile image: $e');
    }
  }
}
