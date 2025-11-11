import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/user_profile_provider.dart';
import '../services/api_services.dart';
import '../../models/user_profile.dart';

class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({super.key});

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _dietController;
  late TextEditingController _allergiesController;
  late TextEditingController _profileImageController;

  @override
  void initState() {
    super.initState();
    final user = Provider.of<UserProfileProvider>(context, listen: false).userProfile!;
    _nameController = TextEditingController(text: user.name);
    _dietController = TextEditingController(text: user.diet);
    _allergiesController = TextEditingController(text: user.allergies.join(", "));
    _profileImageController = TextEditingController(text: user.profileImage);
  }

  @override
  void dispose() {
    _nameController.dispose();
    _dietController.dispose();
    _allergiesController.dispose();
    _profileImageController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (_formKey.currentState!.validate()) {
      final updatedData = {
        "name": _nameController.text.trim(),
        "profile_image": _profileImageController.text.trim(),
        "preferences": {
          "diet": _dietController.text.trim(),
          "allergies": _allergiesController.text.trim().split(',').map((s) => s.trim()).toList(),
        }
      };

      try {
        final updatedUserMap = await ApiService.updateProfile(updatedData);
        final updatedUser = UserProfile.fromJson(updatedUserMap);

        Provider.of<UserProfileProvider>(context, listen: false).setUserProfile(updatedUser);

        if (context.mounted) Navigator.pop(context);
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error updating profile: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Profile'),
        backgroundColor: Colors.deepOrange,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Name'),
                validator: (v) => v == null || v.isEmpty ? 'Enter a name' : null,
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: _profileImageController,
                decoration: const InputDecoration(labelText: 'Profile Image URL'),
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: _dietController,
                decoration: const InputDecoration(labelText: 'Diet'),
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: _allergiesController,
                decoration: const InputDecoration(labelText: 'Allergies (comma separated)'),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: _submit,
                style: ElevatedButton.styleFrom(backgroundColor: Colors.deepOrange),
                child: const Text('Save Changes'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
