import 'package:flutter/material.dart';

class DailyBudgetScreen extends StatelessWidget {
  const DailyBudgetScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Example data
    final todayBudget = 200; // Tk
    final spent = 120; // Tk
    final remaining = todayBudget - spent;

    final progress = spent / todayBudget;

    return Scaffold(
      appBar: AppBar(
        title: const Text("Today's Budget"),
        backgroundColor: Colors.deepOrange,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Card(
              color: Colors.orange.shade100,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    const Text(
                      "Today's Budget",
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 10),
                    LinearProgressIndicator(
                      value: progress,
                      minHeight: 12,
                      backgroundColor: Colors.orange.shade200,
                      color: Colors.deepOrange,
                    ),
                    const SizedBox(height: 10),
                    Text(
                      "Spent: Tk $spent / Tk $todayBudget",
                      style: const TextStyle(fontSize: 16),
                    ),
                    const SizedBox(height: 5),
                    Text(
                      "Remaining: Tk $remaining",
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
