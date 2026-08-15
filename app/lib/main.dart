import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'app.dart';
import 'auth/auth_state.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final authState = AuthState();
  await authState.loadFromStorage();
  runApp(
    ChangeNotifierProvider.value(value: authState, child: const KhaiKhaiApp()),
  );
}
