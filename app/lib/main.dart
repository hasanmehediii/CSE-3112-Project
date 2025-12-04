// lib/main.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'auth/auth_state.dart';
import 'pages/login_page.dart';
import 'widgets/student_shell.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final authState = AuthState();
  await authState.loadFromPrefs();

  runApp(
    ChangeNotifierProvider.value(value: authState, child: const KhaiKhaiApp()),
  );
}

class KhaiKhaiApp extends StatelessWidget {
  const KhaiKhaiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'KhaiKhai Student',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepOrange),
        useMaterial3: true,
      ),
      home: const _RootRouter(),
    );
  }
}

/// Decides what to show:
/// 1) Splash for 2s
/// 2) If authenticated -> StudentShell
///    else -> WelcomeScreen
class _RootRouter extends StatefulWidget {
  const _RootRouter({super.key});

  @override
  State<_RootRouter> createState() => _RootRouterState();
}

class _RootRouterState extends State<_RootRouter> {
  bool _showSplash = true;

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 2), () {
      if (!mounted) return;
      setState(() => _showSplash = false);
    });
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthState>();

    if (_showSplash) {
      return const SplashScreen();
    }

    if (auth.isAuthenticated) {
      return const StudentShell();
    }

    return const WelcomeScreen();
  }
}

/// =====================
/// Splash Screen
/// =====================
class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          // Background image
          Image.asset('assets/background.jpg', fit: BoxFit.cover),
          // Dark overlay
          Container(color: Colors.black.withOpacity(0.45)),
          // Centered logo + text
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.9),
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.3),
                      blurRadius: 18,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Image.asset('assets/logo.png'),
                ),
              ),
              const SizedBox(height: 20),
              Text(
                'KhaiKhai',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 0.5,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Smart Campus Meal Planner',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.white.withOpacity(0.9),
                ),
              ),
              const SizedBox(height: 32),
              const CircularProgressIndicator(
                color: Colors.white,
                strokeWidth: 2.5,
              ),
            ],
          ),
          // Bottom text
          Positioned(
            bottom: size.height * 0.06,
            left: 0,
            right: 0,
            child: Center(
              child: Text(
                'Loading your experience...',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.8),
                  fontSize: 12,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// =====================
/// Welcome / Landing Screen
/// =====================
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
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildHeroSection(context),
            _buildFeaturesSection(context),
            const _Footer(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeroSection(BuildContext context) {
    final height = MediaQuery.of(context).size.height * 0.5;

    return Stack(
      alignment: Alignment.center,
      children: [
        // Background
        SizedBox(
          height: height,
          width: double.infinity,
          child: Image.asset("assets/background.jpg", fit: BoxFit.cover),
        ),
        // Overlay
        Container(
          height: height,
          width: double.infinity,
          color: Colors.black.withOpacity(0.45),
        ),
        // Content
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Logo
              Container(
                width: 110,
                height: 110,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.9),
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.35),
                      blurRadius: 18,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Image.asset("assets/logo.png"),
                ),
              ),
              const SizedBox(height: 16),
              // Title
              Text(
                "KhaiKhai",
                style: Theme.of(context).textTheme.displaySmall?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              // Subtitle
              Text(
                "Enjoy your campus meal in an effective way.",
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: Colors.white.withOpacity(0.95),
                ),
              ),
              const SizedBox(height: 24),
              // Get Started button
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF1876D1),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 30,
                    vertical: 12,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30),
                  ),
                  elevation: 6,
                ),
                onPressed: () {
                  Navigator.of(
                    context,
                  ).push(MaterialPageRoute(builder: (_) => const LoginPage()));
                },
                child: const Text(
                  "Get Started",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildFeaturesSection(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Color(0xFFFFF7ED), // warm light
            Color(0xFFF1F5F9), // subtle slate
          ],
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
      ),
      padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 20),
      child: Column(
        children: [
          // Small pill tag
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0xFFFEF3C7),
              borderRadius: BorderRadius.circular(999),
              border: Border.all(color: const Color(0xFFFACC15), width: 0.6),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                Icon(
                  Icons.local_fire_department,
                  size: 16,
                  color: Color(0xFFEA580C),
                ),
                SizedBox(width: 6),
                Text(
                  "Built for hungry students",
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: Color(0xFF92400E),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Title
          Text(
            "Why KhaiKhai?",
            textAlign: TextAlign.center,
            style: theme.textTheme.headlineMedium?.copyWith(
              fontWeight: FontWeight.bold,
              color: const Color(0xFF0F172A),
              height: 1.1,
            ),
          ),
          const SizedBox(height: 8),

          // Subtitle
          Text(
            "Plan, order, and enjoy your campus meals without stress.",
            textAlign: TextAlign.center,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: const Color(0xFF6B7280),
              fontSize: 13.5,
            ),
          ),
          const SizedBox(height: 28),

          // Features cards
          Wrap(
            spacing: 20,
            runSpacing: 20,
            alignment: WrapAlignment.center,
            children: const [
              _FeatureCard(
                icon: Icons.fastfood,
                title: "Variety & Freshness",
                text:
                    "Discover daily menus, specials, and healthy picks from all your campus canteens in one place.",
                highlight: "Daily updated menus",
              ),
              _FeatureCard(
                icon: Icons.schedule,
                title: "Convenient Orders",
                text:
                    "Order ahead, pick up on time, and skip the long queues between busy classes.",
                highlight: "Skip the queue",
              ),
              _FeatureCard(
                icon: Icons.people,
                title: "Student-Centric Service",
                text:
                    "Designed around university life — complaints, feedback, and profiles tailored for students.",
                highlight: "Made for DU life",
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String text;
  final String highlight;

  const _FeatureCard({
    required this.icon,
    required this.title,
    required this.text,
    required this.highlight,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return SizedBox(
      width: 290,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: const LinearGradient(
            colors: [Color(0xFFFFFFFF), Color(0xFFF9FAFB)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          border: Border.all(color: const Color(0xFFE5E7EB), width: 0.9),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.06),
              blurRadius: 18,
              offset: const Offset(0, 10),
            ),
          ],
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Icon in soft circle
            Container(
              width: 40,
              height: 40,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                gradient: LinearGradient(
                  colors: [Color(0xFF0EA5E9), Color(0xFF6366F1)],
                ),
              ),
              child: Center(child: Icon(icon, size: 22, color: Colors.white)),
            ),
            const SizedBox(height: 12),

            Text(
              title,
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w700,
                color: const Color(0xFF111827),
              ),
            ),
            const SizedBox(height: 6),

            Text(
              text,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: const Color(0xFF6B7280),
                fontSize: 13.5,
              ),
            ),
            const SizedBox(height: 12),

            // Highlight pill
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(999),
                color: const Color(0xFFEEF2FF),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(
                    Icons.check_circle_rounded,
                    size: 14,
                    color: Color(0xFF4F46E5),
                  ),
                  const SizedBox(width: 6),
                  Text(
                    highlight,
                    style: const TextStyle(
                      fontSize: 11.5,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF4338CA),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Footer extends StatelessWidget {
  const _Footer();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [
            Color(0xFF020617), // slate-950
            Color(0xFF0f172a), // slate-900
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.4),
            blurRadius: 18,
            offset: const Offset(0, -4),
          ),
        ],
        border: Border(
          top: BorderSide(color: Colors.white.withOpacity(0.05), width: 0.5),
        ),
      ),
      padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 20),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Top row: logo-ish dot + brand + tagline
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 10,
                height: 10,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    colors: [Color(0xFFf97316), Color(0xFFfb923c)],
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                'KhaiKhai',
                style: theme.textTheme.titleMedium?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 0.4,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            "Smart campus meal planning for DU students.",
            textAlign: TextAlign.center,
            style: theme.textTheme.bodySmall?.copyWith(
              color: Colors.grey[300],
              fontSize: 12.5,
            ),
          ),
          const SizedBox(height: 14),

          // Divider
          Opacity(
            opacity: 0.18,
            child: Container(
              height: 1,
              width: 130,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Colors.transparent,
                    Colors.white,
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 10),

          // Bottom row: copyright + tiny "Made for campus life"
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.school, size: 14, color: Colors.orange[300]),
              const SizedBox(width: 6),
              Text(
                "© 2025 KhaiKhai · University Meal Planner",
                style: TextStyle(color: Colors.grey[400], fontSize: 11.5),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(
            "Made with ❤ for hungry students.",
            style: TextStyle(
              color: Colors.grey[500],
              fontSize: 10.5,
              letterSpacing: 0.2,
            ),
          ),
        ],
      ),
    );
  }
}
