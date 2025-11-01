import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:khaikhai/auth/Login.dart';
import 'package:khaikhai/common/InputDecoration.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _profileImageController = TextEditingController();
  final _dietController = TextEditingController();
  final _allergyController = TextEditingController();

  String? previewImage;
  bool _isLoading = false;

  // ⚙️ Change to your FastAPI IP
  final String baseUrl = "${dotenv.env['API_BASE_URL'] ?? 'http://192.168.0.103:8000'}/auth/signup";

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _profileImageController.dispose();
    _dietController.dispose();
    _allergyController.dispose();
    super.dispose();
  }

  Future<void> _signupUser() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    final user = {
      "name": _nameController.text.trim(),
      "email": _emailController.text.trim(),
      "password": _passwordController.text.trim(),
      "role": "student", // backend expects this
      "profile_image": _profileImageController.text.trim(),
      "preferences": {
        "diet": _dietController.text.trim(),
        "allergies": _allergyController.text
            .split(',')
            .map((a) => a.trim())
            .where((a) => a.isNotEmpty)
            .toList(),
      },
    };

    try {
      final response = await http.post(
        Uri.parse(baseUrl),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(user),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(data['message'] ?? "Signup successful!"),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const LoginPage()),
        );
      } else {
        // Print the response body for debugging
        debugPrint("Signup failed with status: ${response.statusCode}");
        debugPrint("Response body: ${response.body}");

        // Try to decode JSON for a detailed error, but handle failure
        String errorMessage = "Signup failed";
        try {
          final data = jsonDecode(response.body);
          errorMessage = data['detail'] ?? errorMessage;
        } catch (_) {
          // Ignore JSON decode error if the body is not JSON
          errorMessage = "An unexpected server error occurred.";
        }

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(errorMessage),
            backgroundColor: Colors.redAccent,
          ),
        );
      }
    } catch (e) {
      debugPrint("An exception occurred during signup: $e");
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text("Signup failed: $e")));
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: const Color(0xFFFDF6EC),
      appBar: AppBar(
        title: const Text(
          'Create Student Account',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.white,
            letterSpacing: 1.2,
          ),
        ),
        centerTitle: true,
        elevation: 6,
        backgroundColor: const Color(0xFF4568DC),
        shadowColor: Colors.black.withOpacity(0.3),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: Container(
        height: size.height,
        width: size.width,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [
              Color.fromARGB(255, 250, 250, 250),
              Color.fromARGB(255, 117, 195, 226),
            ],
            begin: Alignment.topRight,
            end: Alignment.bottomLeft,
          ),
        ),
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24.0),
            child: Card(
              elevation: 12,
              shadowColor: Colors.black54,
              color: const Color(0xFFFDF5E6),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(28),
              ),
              child: Padding(
                padding: const EdgeInsets.all(28.0),
                child: Form(
                  key: _formKey,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Image.asset('assets/logo.png', height: 80),
                      const SizedBox(height: 12),
                      const Text(
                        'Join KhaiKhai',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1A237E),
                        ),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'Create your student profile',
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 16, color: Colors.black54),
                      ),
                      const SizedBox(height: 28),

                      // Name
                      TextFormField(
                        controller: _nameController,
                        decoration: customInputDecoration(
                          'Full Name',
                          Icons.person_outline,
                        ).copyWith(filled: true, fillColor: Colors.white),
                        validator: (value) => value == null || value.isEmpty
                            ? 'Enter your name'
                            : null,
                      ),
                      const SizedBox(height: 16),

                      // Email
                      TextFormField(
                        controller: _emailController,
                        decoration: customInputDecoration(
                          'Email',
                          Icons.email_outlined,
                        ).copyWith(filled: true, fillColor: Colors.white),
                        validator: (value) => value == null || value.isEmpty
                            ? 'Enter your email'
                            : null,
                      ),
                      const SizedBox(height: 16),

                      // Password
                      TextFormField(
                        controller: _passwordController,
                        obscureText: true,
                        decoration: customInputDecoration(
                          'Password',
                          Icons.lock_outline,
                        ).copyWith(filled: true, fillColor: Colors.white),
                        validator: (value) => value == null || value.isEmpty
                            ? 'Enter your password'
                            : null,
                      ),
                      const SizedBox(height: 16),

                      // Profile Image URL
                      TextFormField(
                        controller: _profileImageController,
                        decoration:
                            customInputDecoration(
                              'Profile Image URL (Unsplash or others)',
                              Icons.image_outlined,
                            ).copyWith(
                              filled: true,
                              fillColor: Colors.white,
                              suffixIcon: IconButton(
                                icon: const Icon(
                                  Icons.preview,
                                  color: Colors.deepPurple,
                                ),
                                onPressed: () {
                                  if (_profileImageController.text.isNotEmpty) {
                                    setState(() {
                                      previewImage = _profileImageController
                                          .text
                                          .trim();
                                    });
                                  }
                                },
                              ),
                            ),
                      ),

                      if (previewImage != null && previewImage!.isNotEmpty) ...[
                        const SizedBox(height: 12),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(16),
                          child: Image.network(
                            previewImage!,
                            height: 120,
                            fit: BoxFit.cover,
                            errorBuilder: (_, __, ___) => Container(
                              height: 120,
                              color: Colors.grey.shade200,
                              alignment: Alignment.center,
                              child: const Text("Invalid Image URL"),
                            ),
                          ),
                        ),
                      ],

                      const SizedBox(height: 16),

                      // Diet
                      TextFormField(
                        controller: _dietController,
                        decoration: customInputDecoration(
                          'Diet preference (optional)',
                          Icons.restaurant_outlined,
                        ).copyWith(filled: true, fillColor: Colors.white),
                      ),
                      const SizedBox(height: 16),

                      // Allergies
                      TextFormField(
                        controller: _allergyController,
                        decoration: customInputDecoration(
                          'Allergies (comma separated)',
                          Icons.warning_amber_rounded,
                        ).copyWith(filled: true, fillColor: Colors.white),
                      ),
                      const SizedBox(height: 28),

                      // Sign Up Button
                      Container(
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF4568DC), Color(0xFFB06AB3)],
                            begin: Alignment.centerLeft,
                            end: Alignment.centerRight,
                          ),
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black26,
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: ElevatedButton(
                          onPressed: _isLoading ? null : _signupUser,
                          style: ElevatedButton.styleFrom(
                            elevation: 0,
                            backgroundColor: Colors.transparent,
                            shadowColor: Colors.transparent,
                            padding: const EdgeInsets.symmetric(vertical: 15),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                          child: _isLoading
                              ? const CircularProgressIndicator(
                                  color: Colors.white,
                                )
                              : const Text(
                                  'Sign Up',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w700,
                                    color: Colors.white,
                                  ),
                                ),
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Redirect
                      TextButton(
                        onPressed: () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const LoginPage(),
                            ),
                          );
                        },
                        child: const Text(
                          "Already have an account? Login",
                          style: TextStyle(
                            color: Color(0xFF1A237E),
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
