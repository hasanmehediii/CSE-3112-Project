import 'package:flutter/material.dart';
import 'package:khaikhai/common/FooterPageTemplate.dart';

class SupportScreen extends StatelessWidget {
  const SupportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FooterPageTemplate(
      title: 'Support',
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'How can we help you?',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 20),
          const Text(
            'Our support team is here to assist you with any issues or questions you may have. Please check our FAQ page for answers to common questions. If you still need help, don\'t hesitate to contact us.',
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
          const SizedBox(height: 20),
          const Text(
            'You can reach us by email at support@khaikhai.com or by phone at +1 (123) 456-7890. Our support hours are Monday to Friday, 9 AM to 5 PM.',
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
        ],
      ),
    );
  }
}