import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/user_profile_provider.dart';
import '../services/storage_service.dart'; // ← ADD THIS LINE

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<UserProfileProvider>(
      builder: (context, userProvider, child) {
        final user = userProvider.userProfile;

        // Show loading if not loaded
        if (user == null) {
          return Scaffold(
            appBar: AppBar(
              title: const Text("Profile"),
              backgroundColor: Colors.deepOrange,
              centerTitle: true,
            ),
            body: const Center(child: CircularProgressIndicator()),
          );
        }

        return Scaffold(
          appBar: AppBar(
            title: const Text("Profile"),
            backgroundColor: Colors.deepOrange,
            centerTitle: true,
          ),
          body: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Card(
                  color: Colors.orange.shade100,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12)),
                  elevation: 3,
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Profile Picture
                        SizedBox(
                          width: MediaQuery.of(context).size.width * 0.45,
                          height: MediaQuery.of(context).size.width * 0.45,
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(12),
                            child: _buildProfileImage(user.profileImage),
                          ),
                        ),
                        const SizedBox(width: 16),
                        // User Info
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                user.name,
                                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(height: 8),
                              Text(user.email),
                              const SizedBox(height: 8),
                              Text("Student ID: ${user.id}"),
                              const SizedBox(height: 8),
                              Text("Diet: ${user.diet?.isNotEmpty == true ? user.diet : 'Not set'}"),
                              const SizedBox(height: 8),
                              Text(
                                "Allergies: ${user.allergies.isEmpty ? 'None' : user.allergies!.join(', ')}",
                              ),
                              const SizedBox(height: 8),
                              const Text("Monthly Budget: Tk 6000"), // ← Will be dynamic later
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                // Action Buttons
                ListTile(
                  leading: const Icon(Icons.edit, color: Colors.deepOrange),
                  title: const Text("Edit Profile"),
                  onTap: () {
                    // TODO: Navigate to Edit Profile
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.settings, color: Colors.deepOrange),
                  title: const Text("Settings"),
                  onTap: () {
                    // TODO: Open settings
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.logout, color: Colors.red),
                  title: const Text("Logout"),
                  onTap: () async {
                    await StorageService.clearStorage();
                    userProvider.clearUserProfile();
                    if (context.mounted) {
                      Navigator.pushReplacementNamed(context, '/login');
                    }
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  // Helper: Load image from URL or fallback to asset
  Widget _buildProfileImage(String? url) {
    if (url == null || url.isEmpty) {
      return Image.asset(
        "assets/profile_pic.jpg",
        fit: BoxFit.cover,
      );
    }

    return Image.network(
      url,
      fit: BoxFit.cover,
      loadingBuilder: (context, child, loadingProgress) {
        if (loadingProgress == null) return child;
        return const Center(child: CircularProgressIndicator());
      },
      errorBuilder: (context, error, stackTrace) {
        return Image.asset(
          "assets/profile_pic.jpg",
          fit: BoxFit.cover,
        );
      },
    );
  }
}