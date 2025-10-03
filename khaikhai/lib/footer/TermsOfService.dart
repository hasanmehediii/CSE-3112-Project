import 'package:flutter/material.dart';
import 'package:khaikhai/common/FooterPageTemplate.dart';

class TermsOfServiceScreen extends StatelessWidget {
  const TermsOfServiceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FooterPageTemplate(
      title: 'Terms of Service',
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Terms of Service',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 20),
          const Text(
            'By using our service, you agree to these terms. Please read them carefully.',
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
          const SizedBox(height: 20),
          Text(
            'Using our Service',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 10),
          const Text(
            'You must follow any policies made available to you within the Service. Don’t misuse our Services. For example, don’t interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.',
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
          const SizedBox(height: 20),
          Text(
            'Your KhaiKhai Account',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 10),
          const Text(
            'You may need a KhaiKhai Account in order to use some of our Services. You may create your own KhaiKhai Account, or your KhaiKhai Account may be assigned to you by an administrator, such as your employer or educational institution. If you are using a KhaiKhai Account assigned to you by an administrator, different or additional terms may apply and your administrator may be able to access or disable your account.',
            style: TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
          ),
        ],
      ),
    );
  }
}