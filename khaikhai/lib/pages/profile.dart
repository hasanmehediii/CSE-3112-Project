import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Example user data
    final Map<String, dynamic> user = {
      "name": "John Doe",
      "email": "johndoe@gmail.com",
      "studentId": "123456",
      "monthlyBudget": 6000,
      "profilePic": "https://via.placeholder.com/150" // sample image url
    };

    final String userName = user["name"].toString();
    final String userEmail = user["email"].toString();
    final String userId = user["studentId"].toString();
    final String userBudget = user["monthlyBudget"].toString();

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
                    // Profile picture - rectangular
                    SizedBox(
                      width: MediaQuery.of(context).size.width * 0.45,
                      height: MediaQuery.of(context).size.width * 0.45,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Image.asset(
                          "assets/profile_pic.jpg", // local image
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),

                    const SizedBox(width: 16),
                    // User info
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            userName,
                            style: const TextStyle(
                                fontSize: 20, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 8),
                          Text(userEmail),
                          const SizedBox(height: 8),
                          Text("Student ID: $userId"),
                          const SizedBox(height: 8),
                          Text("Monthly Budget: Tk $userBudget"),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),
            // Buttons section
            ListTile(
              leading: const Icon(Icons.edit, color: Colors.deepOrange),
              title: const Text("Edit Profile"),
              onTap: () {
                // TODO: Edit Profile
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
              onTap: () {
                // TODO: Logout
              },
            ),
          ],
        ),
      ),
    );
  }
}
