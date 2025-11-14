import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/budget_model.dart';
import '../models/meal_model.dart';
import '../services/api_services.dart';
import '../services/storage_service.dart';

class BudgetDashboardScreen extends StatefulWidget {
  const BudgetDashboardScreen({super.key});

  @override
  State<BudgetDashboardScreen> createState() => _BudgetDashboardScreenState();
}

class _BudgetDashboardScreenState extends State<BudgetDashboardScreen> {
  bool isLoading = true;
  Budget? budget;
  List<Meal> allMeals = [];
  List<Meal> recommendedMeals = [];

  @override
  void initState() {
    super.initState();
    fetchBudgetAndMeals();
  }

  Future<void> fetchBudgetAndMeals() async {
    try {
      // Get JWT token from StorageService
      final token = await StorageService.getToken();
      if (token == null) throw Exception('No auth token found');

      // Fetch budget from backend
      final fetchedBudget = await ApiService.getBudget(token);

      // Fetch all meals (example: fetch meals from canteen 1)
      final meals = await ApiService.getAllMeals(); // new

      // Recommend meals within daily budget
      final recMeals = ApiService.recommendMeals(meals, fetchedBudget.dailyBudget);

      setState(() {
        budget = fetchedBudget;
        allMeals = meals;
        recommendedMeals = recMeals;
        isLoading = false;
      });
    } catch (e) {
      setState(() => isLoading = false);
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Budget Dashboard'),
        backgroundColor: Colors.deepOrange,
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : budget == null
          ? const Center(child: Text('No budget set.'))
          : Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
                'Monthly Budget: ${budget!.monthlyBudget.toStringAsFixed(2)} BDT',
                style: const TextStyle(fontSize: 16)),
            const SizedBox(height: 8),
            Text(
                'Remaining Budget: ${budget!.remainingBudget.toStringAsFixed(2)} BDT',
                style: const TextStyle(fontSize: 16)),
            const SizedBox(height: 8),
            Text(
                'Daily Budget: ${budget!.dailyBudget.toStringAsFixed(2)} BDT',
                style: const TextStyle(fontSize: 16)),
            const SizedBox(height: 8),
            Text(
                'Overspent: ${budget!.overspentAmount.toStringAsFixed(2)} BDT',
                style: const TextStyle(
                    fontSize: 16, color: Colors.red)),
            const SizedBox(height: 16),
            const Text('Recommended Meals:',
                style: TextStyle(
                    fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Expanded(
              child: ListView.builder(
                itemCount: recommendedMeals.length,
                itemBuilder: (context, index) {
                  final meal = recommendedMeals[index];
                  return ListTile(
                    leading: meal.imageUrl != null && meal.imageUrl!.isNotEmpty
                        ? Image.network(meal.imageUrl!,
                        width: 50, height: 50, fit: BoxFit.cover)
                        : const Icon(Icons.fastfood),
                    title: Text(meal.name),
                    subtitle: Text(
                        '${meal.price.toStringAsFixed(2)} BDT • ${meal.calories} kcal'),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
