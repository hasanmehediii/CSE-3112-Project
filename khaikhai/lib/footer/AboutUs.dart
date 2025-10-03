import 'package:flutter/material.dart';
import 'package:khaikhai/common/FooterPageTemplate.dart';

class AboutUsScreen extends StatelessWidget {
  const AboutUsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FooterPageTemplate(
      title: 'About Us',
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'About KhaiKhai',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 20),
          const Text(
            'KhaiKhai is a revolutionary platform dedicated to improving the dining experience for students and faculty. We believe that good food is essential for a productive learning environment. Our mission is to provide a seamless and efficient way to access canteen menus, order food, and provide feedback.',
            style: TextStyle(
              fontSize: 16,
              color: Colors.white,
              height: 1.5, // Improved line spacing
            ),
          ),
          const SizedBox(height: 20),
          const Text(
            'Our team is passionate about technology and food. We are committed to creating a user-friendly and reliable service that meets the needs of our university community.',
            style: TextStyle(
              fontSize: 16,
              color: Colors.white,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}
