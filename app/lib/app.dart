import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'auth/auth_state.dart';
import 'pages/welcome_page.dart';
import 'widgets/student_shell.dart';

class KhaiKhaiApp extends StatelessWidget {
  const KhaiKhaiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'KhaiKhai Student',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFEA580C)),
        scaffoldBackgroundColor: const Color(0xFFF8FAFC),
        useMaterial3: true,
        inputDecorationTheme: const InputDecorationTheme(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.all(Radius.circular(14)),
          ),
          filled: true,
          fillColor: Colors.white,
        ),
      ),
      home: const RootRouter(),
    );
  }
}

class RootRouter extends StatelessWidget {
  const RootRouter({super.key});

  @override
  Widget build(BuildContext context) {
    return context.watch<AuthState>().isAuthenticated
        ? const StudentShell()
        : const WelcomePage();
  }
}
