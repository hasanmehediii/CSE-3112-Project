import 'package:flutter/material.dart';
import 'package:khaikhai/common/FooterPageTemplate.dart';

class PrivacyPolicyScreen extends StatelessWidget {
  const PrivacyPolicyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FooterPageTemplate(
      title: 'Privacy Policy',
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Privacy Policy',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 20),
          const Text(
            "Your privacy is important to us. It is KhaiKhai's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.",
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
          const SizedBox(height: 20),
          const Text(
            'We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.',
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
          const SizedBox(height: 20),
          const Text(
            'We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.',
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
          const SizedBox(height: 20),
          const Text(
            'We don’t share any personally identifying information publicly or with third-parties, except when required to by law.',
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
        ],
      ),
    );
  }
}