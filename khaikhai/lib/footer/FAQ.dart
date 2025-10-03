import 'package:flutter/material.dart';
import 'package:khaikhai/common/FooterPageTemplate.dart';

class FAQScreen extends StatelessWidget {
  const FAQScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return FooterPageTemplate(
      title: 'FAQ',
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'FAQs',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 20),
          _buildFAQItem(
            context,
            'What is KhaiKhai?',
            'KhaiKhai is a platform that allows you to order food from your university canteen online.',
          ),
          _buildFAQItem(
            context,
            'How do I place an order?',
            'You can place an order by browsing the menu, adding items to your cart, and proceeding to checkout.',
          ),
          _buildFAQItem(
            context,
            'Can I pay online?',
            'Yes, we support online payments through various methods.',
          ),
          _buildFAQItem(
            context,
            'Is there a delivery service?',
            'Currently, we only offer a pickup service. You will be notified when your order is ready for pickup.',
          ),
          _buildFAQItem(
            context,
            'How can I contact support?',
            'You can contact our support team via the Contact Us page or email us',
          ),
        ],
      ),
    );
  }

  Widget _buildFAQItem(BuildContext context, String question, String answer) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          question,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 10),
        Text(
          answer,
          style: const TextStyle(fontSize: 16, color: Colors.white, height: 1.5),
        ),
        const SizedBox(height: 20),
      ],
    );
  }
}