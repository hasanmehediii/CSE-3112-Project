import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:provider/provider.dart';

import 'providers/user_profile_provider.dart';
import 'providers/canteen_provider.dart';
import 'pages/Splash.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  try {
    await dotenv.load(fileName: ".env");
    print('Loaded .env successfully: ${dotenv.env}');
  } catch (e) {
    print('Error loading .env file: $e');
  }

  runApp(const AuthApp());
}

class AuthApp extends StatelessWidget {
  const AuthApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<UserProfileProvider>(
          create: (_) => UserProfileProvider(),
        ),
        ChangeNotifierProvider(create: (_) => CanteenProvider()),
      ],
      child: MaterialApp(
        title: 'Flutter Auth Demo',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          //brightness: Brightness.dark,
          brightness: Brightness.light,
          primaryColor: Colors.deepPurple,
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.deepPurple,
            //brightness: Brightness.dark,
            brightness: Brightness.light,
          ),
          useMaterial3: true,
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.deepPurple,
              foregroundColor: Colors.white,
              minimumSize: const Size(double.infinity, 50),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
        ),
        home: const SplashScreen(),
      ),
    );
  }
}
