import 'package:flutter/material.dart';

InputDecoration customInputDecoration(String labelText, IconData icon) {
  return InputDecoration(
    hintText: labelText,
    hintStyle: const TextStyle(color: Colors.white70),
    prefixIcon: Icon(icon, color: Colors.white70),
    filled: true,
    fillColor: Colors.white.withAlpha(25),
    contentPadding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide.none,
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide.none,
    ),
  );
}
