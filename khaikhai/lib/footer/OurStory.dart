import 'package:flutter/material.dart';
import 'package:khaikhai/common/FooterPageTemplate.dart';

class OurStoryScreen extends StatelessWidget {
  const OurStoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FooterPageTemplate(
      title: 'Our Story',
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Our Story',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 20),
          const Text(
            'The idea for KhaiKhai was born out of a simple frustration: the long queues and limited information available at our university canteen. We knew there had to be a better way. As students of computer science, we decided to use our skills to solve this problem.',
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
          const SizedBox(height: 20),
          const Text(
            'We started small, with a simple prototype and a lot of passion. We worked tirelessly to build a platform that was both powerful and easy to use. After months of development and testing, we launched KhaiKhai at our university.',
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
          const SizedBox(height: 20),
          const Text(
            "The response was overwhelming. Students and faculty loved the convenience of ordering food online and the transparency of the digital menu. Today, KhaiKhai is an essential part of our university's dining experience, and we are proud of the positive impact we have made.",
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
        ],
      ),
    );
  }
}