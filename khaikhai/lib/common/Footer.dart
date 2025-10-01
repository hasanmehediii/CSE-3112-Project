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
      color: const Color.fromARGB(255, 26, 53, 110),
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 40),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildFooterColumn(context, 'About Us', {
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
          const SizedBox(height: 20),
          const Divider(color: Colors.white54),
          const SizedBox(height: 20),
          const Text(
            '© 2025 LooterBank. All Rights Reserved.',
            style: TextStyle(color: Colors.white70),
          ),
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
      children: [
        Text(
          title,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
        const SizedBox(height: 10),
        for (final item in items.entries)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 4.0),
            child: InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => item.value),
                );
              },
              child: Text(
                item.key,
                style: const TextStyle(color: Colors.white70),
              ),
            ),
          ),
      ],
    );
  }
}
