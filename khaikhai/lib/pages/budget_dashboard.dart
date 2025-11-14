import 'package:flutter/material.dart';
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
  Map<String, String> canteenMap = {};

  @override
  void initState() {
    super.initState();
    fetchBudgetAndMeals();
  }

  Future<void> fetchBudgetAndMeals() async {
    try {
      final token = await StorageService.getToken();
      if (token == null) throw Exception('No auth token found');

      // Fetch budget
      final fetchedBudget = await ApiService.getBudget(token);

      // Fetch all meals
      final meals = await ApiService.getAllMeals();

      // **Debug log for meals**
      for (var meal in meals) {
        print("Meal: ${meal.name}, canteenId: ${meal.canteenId}");
      }


      // Fetch all canteens and build map
      final canteens = await ApiService.getAllCanteens();
      final canteenMap = {for (var c in canteens) c.id: c.name};

      // Recommend meals within daily budget
      final recMeals = ApiService.recommendMeals(meals, fetchedBudget.dailyBudget);

      setState(() {
        budget = fetchedBudget;
        allMeals = meals;
        recommendedMeals = recMeals;
        this.canteenMap = canteenMap; // store in state
        isLoading = false;
      });
    } catch (e) {
      setState(() => isLoading = false);
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }


  Color _getDietColor(String dietType) {
    switch (dietType.toLowerCase()) {
      case 'veg':
        return Colors.green;
      case 'non-veg':
        return Colors.red;
      case 'vegan':
        return Colors.lightGreen;
      default:
        return Colors.grey;
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
            // Budget Overview Card
            Card(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16)),
              elevation: 4,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Monthly Budget: ${budget!.monthlyBudget.toStringAsFixed(2)} BDT',
                      style: const TextStyle(
                          fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Remaining Budget: ${budget!.remainingBudget.toStringAsFixed(2)} BDT',
                      style: const TextStyle(fontSize: 16),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Daily Budget: ${budget!.dailyBudget.toStringAsFixed(2)} BDT',
                      style: const TextStyle(fontSize: 16),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Overspent: ${budget!.overspentAmount.toStringAsFixed(2)} BDT',
                      style: const TextStyle(fontSize: 16, color: Colors.red),
                    ),
                    const SizedBox(height: 12),
                    // Budget progress bar
                    LinearProgressIndicator(
                      value: (budget!.remainingBudget / budget!.monthlyBudget)
                          .clamp(0.0, 1.0),
                      color: Colors.deepOrange,
                      backgroundColor: Colors.grey[300],
                      minHeight: 8,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            const Text(
              'Recommended Meals:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Expanded(
              child: recommendedMeals.isEmpty
                  ? const Center(child: Text("No recommended meals."))
                  : ListView.builder(
                itemCount: recommendedMeals.length,
                itemBuilder: (context, index) {
                  final meal = recommendedMeals[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 16),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16)),
                    elevation: 4,
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        ClipRRect(
                          borderRadius: const BorderRadius.only(
                            topLeft: Radius.circular(16),
                            bottomLeft: Radius.circular(16),
                          ),
                          child: Image.network(
                            meal.imageUrl ?? "assets/meal_placeholder.jpg",
                            width: 120,
                            height: 120,
                            fit: BoxFit.cover,
                          ),
                        ),
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.all(12.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  meal.name,
                                  style: const TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  "${meal.price.toStringAsFixed(2)} BDT • ${meal.calories} kcal",
                                  style: const TextStyle(
                                      fontSize: 14, color: Colors.grey),
                                ),
                                const SizedBox(height: 6),
                                Row(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 8, vertical: 2),
                                      decoration: BoxDecoration(
                                        color: _getDietColor(meal.dietType),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      child: Text(
                                        meal.dietType.toUpperCase(),
                                        style: const TextStyle(
                                            fontSize: 11, color: Colors.white),
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Text(
                                      meal.category,
                                      style: TextStyle(
                                          fontSize: 13, color: Colors.grey[600]),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 6),
                                // Canteen Name placeholder
                                Text(
                                  "Canteen: ${canteenMap[meal.canteenId] ?? '--'}",
                                  style: TextStyle(
                                      fontSize: 12, color: Colors.grey[700]),
                                ),
                                const SizedBox(height: 8),
                                Row(
                                  children: [
                                    Icon(
                                      Icons.circle,
                                      size: 10,
                                      color: meal.isAvailable
                                          ? Colors.green
                                          : Colors.red,
                                    ),
                                    const SizedBox(width: 4),
                                    Text(
                                      meal.isAvailable
                                          ? "Available"
                                          : "Sold Out",
                                      style: TextStyle(
                                          fontSize: 12,
                                          color: meal.isAvailable
                                              ? Colors.green
                                              : Colors.red),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
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
