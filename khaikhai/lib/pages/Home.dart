import 'package:flutter/material.dart';
import 'package:khaikhai/auth/Login.dart';
import 'package:khaikhai/common/Footer.dart';

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("KhaiKhai"),
        centerTitle: true,
        elevation: 0,
        backgroundColor: const Color(0xFF1876D1),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Hero Section with background image and centered content
              Stack(
                children: [
                  Container(
                    height: MediaQuery.of(context).size.height * 0.45,
                    width: double.infinity,
                    decoration: const BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage("assets/background.jpg"),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  Container(
                    height: MediaQuery.of(context).size.height * 0.45,
                    width: double.infinity,
                    color: Colors.black.withOpacity(0.3), // overlay
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height * 0.45,
                    width: double.infinity,
                    child: Center(
                      child: SingleChildScrollView(
                        physics: const ClampingScrollPhysics(),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 12.0),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              // Logo with rounded shape
                              Container(
                                width: 120,
                                height: 120,
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  shape: BoxShape.circle,
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.black12,
                                      blurRadius: 8,
                                      offset: Offset(0, 4),
                                    ),
                                  ],
                                ),
                                child: Padding(
                                  padding: const EdgeInsets.all(12.0),
                                  child: Image.asset(
                                    "assets/logo.png",
                                    height: 100,
                                  ),
                                ),
                              ),
                              const SizedBox(height: 12),
                              Text(
                                "KhaiKhai",
                                style: Theme.of(context).textTheme.displayLarge
                                    ?.copyWith(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                "Enjoy campus meals and snacks the smart way!",
                                style: Theme.of(context).textTheme.titleLarge
                                    ?.copyWith(
                                      color: Colors.white70,
                                      fontWeight: FontWeight.w500,
                                    ),
                                textAlign: TextAlign.center,
                              ),
                              const SizedBox(height: 14),
                              SizedBox(
                                width: 150,
                                child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: const Color(0xFF1876D1),
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 0,
                                      vertical: 14,
                                    ),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                  ),
                                  onPressed: () {
                                    Navigator.of(context).push(
                                      MaterialPageRoute(
                                        builder: (context) => LoginPage(),
                                      ),
                                    );
                                  },
                                  child: const Text(
                                    "Get Started",
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),

              // Features Section
              Container(
                color: Colors.grey.shade100,
                padding: const EdgeInsets.symmetric(
                  vertical: 40,
                  horizontal: 20,
                ),
                child: Column(
                  children: [
                    Text(
                      "Why KhaiKhai?",
                      style: Theme.of(context).textTheme.headlineMedium
                          ?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                    ),
                    const SizedBox(height: 40),
                    Wrap(
                      spacing: 50,
                      runSpacing: 50,
                      alignment: WrapAlignment.center,
                      children: const [
                        _FeatureCard(
                          icon: Icons.fastfood,
                          title: "Variety & Freshness",
                          text:
                              "Choose from daily menus, snacks, and healthy options directly from your campus cafeteria.",
                        ),
                        _FeatureCard(
                          icon: Icons.schedule,
                          title: "Convenient Orders",
                          text:
                              "Order ahead and skip lines—save time between classes and never miss your meal.",
                        ),
                        _FeatureCard(
                          icon: Icons.people,
                          title: "Student-Centric Service",
                          text:
                              "Support, rewards, and personal customization made for university life.",
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const Footer(),
            ],
          ),
        ),
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String text;

  const _FeatureCard({
    required this.icon,
    required this.title,
    required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 280,
      child: Column(
        children: [
          Icon(icon, size: 48, color: const Color(0xFF1876D1)),
          const SizedBox(height: 12),
          Text(
            title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
              color: Colors.black,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            text,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              color: Colors.black87,
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
