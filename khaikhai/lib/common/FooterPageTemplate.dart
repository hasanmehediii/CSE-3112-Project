import 'dart:ui';
import 'package:flutter/material.dart';

class FooterPageTemplate extends StatelessWidget {
  final String title;
  final Widget child;

  const FooterPageTemplate({
    super.key,
    required this.title,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        backgroundColor: const Color(0xFF1876D1),
        elevation: 0,
      ),
      body: Stack(
        children: [
          // Background Image
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage("assets/background.jpg"),
                fit: BoxFit.cover,
              ),
            ),
          ),
          // Blurry Card
          Center(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(16.0),
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 5.0, sigmaY: 5.0),
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(16.0),
                    border: Border.all(
                      color: Colors.white.withOpacity(0.2),
                    ),
                  ),
                  child: SingleChildScrollView( // Moved SingleChildScrollView inside
                    padding: const EdgeInsets.all(24.0), // Padding moved here
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        child,
                        const SizedBox(height: 40), // Added space below the card content
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}