import 'package:flutter/material.dart';
import 'package:khaikhai/footer/AboutUs.dart';
import 'package:khaikhai/footer/ContactUs.dart';
import 'package:khaikhai/footer/CookiePolicy.dart';
import 'package:khaikhai/footer/FAQ.dart';
import 'package:khaikhai/footer/OurStory.dart';
import 'package:khaikhai/footer/PrivacyPolicy.dart';
import 'package:khaikhai/footer/Support.dart';
import 'package:khaikhai/footer/TermsOfService.dart';

class Footer extends StatelessWidget {
  const Footer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color.fromARGB(
        255,
        0,
        0,
        0,
      ), // A more modern, neutral dark color
      padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 20),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Using Wrap for better responsiveness on smaller screens
          Wrap(
            spacing: 40, // Horizontal space between columns
            runSpacing: 30, // Vertical space between rows
            alignment: WrapAlignment.center,
            children: [
              _buildFooterColumn(context, 'About', {
                'About Us': const AboutUsScreen(),
                'Our Story': const OurStoryScreen(),
              }),
              _buildFooterColumn(context, 'Support', {
                'Contact Us': const ContactUsScreen(),
                'Support': const SupportScreen(),
                'FAQ': const FAQScreen(),
              }),
              _buildFooterColumn(context, 'Legal', {
                'Privacy Policy': const PrivacyPolicyScreen(),
                'Terms of Service': const TermsOfServiceScreen(),
                'Cookie Policy': const CookiePolicyScreen(),
              }),
            ],
          ),
          const SizedBox(height: 30),
          const Divider(color: Color.fromARGB(255, 255, 255, 255)),
          const SizedBox(height: 20),
          // Social Media Icons
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                icon: const Icon(Icons.facebook),
                color: const Color.fromARGB(255, 255, 255, 255),
                onPressed: () {},
              ),
              IconButton(
                icon: const Icon(Icons.camera_alt),
                color: const Color.fromARGB(255, 255, 255, 255),
                onPressed: () {},
              ),
              IconButton(
                icon: const Icon(Icons.email),
                color: const Color.fromARGB(255, 255, 255, 255),
                onPressed: () {},
              ),
              IconButton(
                icon: const Icon(Icons.youtube_searched_for),
                color: const Color.fromARGB(255, 255, 255, 255),
                onPressed: () {},
              ),
            ],
          ),
          const SizedBox(height: 20),
          // Copyright notice
          Text(
            '© 2025 KhaiKhai. All Rights Reserved.',
            style: TextStyle(color: Colors.white54, fontSize: 12),
          ),
          const SizedBox(height: 30),
        ],
      ),
    );
  }

  Widget _buildFooterColumn(
    BuildContext context,
    String title,
    Map<String, Widget> items,
  ) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          title,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
        const SizedBox(height: 12),
        ...items.entries.map((item) {
          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 5.0),
            child: InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => item.value),
                );
              },
              child: Text(
                item.key,
                style: const TextStyle(color: Colors.white70, fontSize: 14),
              ),
            ),
          );
        }).toList(),
      ],
    );
  }
}
