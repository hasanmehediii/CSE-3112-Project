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
          "allergies":
          _allergiesController.text.trim().split(',').map((s) => s.trim()).toList(),
        }
      };

      try {
        final updatedUserMap = await ApiService.updateProfile(updatedData);
        final updatedUser = UserProfile.fromJson(updatedUserMap);

        Provider.of<UserProfileProvider>(context, listen: false)
            .setUserProfile(updatedUser);

        if (context.mounted) Navigator.pop(context);
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error updating profile: $e')),
        );
      }
    }
  }

  Widget _buildTitle(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Text(
        text,
        style: const TextStyle(
            fontSize: 18, fontWeight: FontWeight.bold, color: Colors.deepOrange),
      ),
    );
  }

  Widget _buildTextField(
      {required TextEditingController controller,
        required String label,
        IconData? icon,
        int maxLines = 1,
        String? Function(String?)? validator}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      child: TextFormField(
        controller: controller,
        maxLines: maxLines,
        validator: validator,
        decoration: InputDecoration(
          prefixIcon: icon != null ? Icon(icon, color: Colors.deepOrange) : null,
          labelText: label,
          labelStyle: const TextStyle(color: Colors.deepOrange),
          filled: true,
          fillColor: Colors.orange.shade50,
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: Colors.orange.shade200),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: const BorderSide(color: Colors.deepOrange, width: 2),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final profileImg = _profileImageController.text;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Profile'),
        backgroundColor: Colors.deepOrange,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Profile Image Preview Card
              Center(
                child: Column(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(80),
                      child: profileImg.isEmpty
                          ? Image.asset("assets/profile_pic.jpg",
                          width: 120,
                          height: 120,
                          fit: BoxFit.cover)
                          : Image.network(profileImg,
                          width: 120,
                          height: 120,
                          fit: BoxFit.cover,
                          errorBuilder: (_, __, ___) =>
                              Image.asset("assets/profile_pic.jpg",
                                  width: 120, height: 120)),
                    ),
                    const SizedBox(height: 12),
                    const Text("Profile Picture",
                        style:
                        TextStyle(fontSize: 16, fontWeight: FontWeight.w500)),
                  ],
                ),
              ),

              const SizedBox(height: 20),
              _buildTitle("Personal Information"),

              _buildTextField(
                controller: _nameController,
                label: "Name",
                icon: Icons.person,
                validator: (v) => v == null || v.isEmpty ? "Enter a name" : null,
              ),

              _buildTextField(
                controller: _profileImageController,
                label: "Profile Image URL",
                icon: Icons.image,
              ),

              const SizedBox(height: 10),
              _buildTitle("Preferences"),

              _buildTextField(
                controller: _dietController,
                label: "Diet (e.g. Vegan, Keto)",
                icon: Icons.fastfood,
              ),

              _buildTextField(
                controller: _allergiesController,
                label: "Allergies (comma separated)",
                icon: Icons.warning_amber_rounded,
              ),

              const SizedBox(height: 20),
              Center(
                child: ElevatedButton(
                  onPressed: _submit,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepOrange,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 40, vertical: 14),
                    textStyle:
                    const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14)),
                  ),
                  child: const Text('Save Changes'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
