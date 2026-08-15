import 'package:app/app.dart';
import 'package:app/auth/auth_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';

void main() {
  testWidgets('student welcome screen offers sign in and registration', (
    tester,
  ) async {
    await tester.pumpWidget(
      ChangeNotifierProvider(
        create: (_) => AuthState(),
        child: const KhaiKhaiApp(),
      ),
    );

    expect(find.text('Campus meals,\nright on time.'), findsOneWidget);
    expect(find.widgetWithText(FilledButton, 'Sign in'), findsOneWidget);
    expect(find.text('Create student account'), findsOneWidget);
  });
}
