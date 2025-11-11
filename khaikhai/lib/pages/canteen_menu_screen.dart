import 'package:flutter/material.dart';
import '../models/meal_model.dart';
import '../services/api_services.dart';

class CanteenMenuScreen extends StatefulWidget {
  final String canteenId;
  final String canteenName;

  const CanteenMenuScreen({
    super.key,
    required this.canteenId,
    required this.canteenName,
  });

  @override
  State<CanteenMenuScreen> createState() => _CanteenMenuScreenState();
}

class _CanteenMenuScreenState extends State<CanteenMenuScreen> {
  bool isLoading = true;
  List<Meal> meals = [];

  @override
  void initState() {
    super.initState();
    fetchCanteenMenu();
  }

  Future<void> fetchCanteenMenu() async {
    try {
      final mealList = await ApiService.getCanteenMeals(widget.canteenId);
      setState(() {
        meals = mealList;
        isLoading = false;
      });
    } catch (e) {
      setState(() => isLoading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to load menu: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.canteenName),
        backgroundColor: Colors.deepOrange,
        elevation: 0,
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : meals.isEmpty
          ? const Center(child: Text("No meals available."))
          : ListView.builder(
        padding: const EdgeInsets.all(12),
        itemCount: meals.length,
        itemBuilder: (context, index) {
          final meal = meals[index];
          return MealCard(meal: meal);
        },
      ),
    );
  }
}

class MealCard extends StatelessWidget {
  final Meal meal;

  const MealCard({super.key, required this.meal});

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
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      elevation: 4,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Meal Image
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
                  // Meal Name
                  Text(
                    meal.name,
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 6),

                  // Price and Calories
                  Text(
                    "${meal.price.toStringAsFixed(2)} BDT • ${meal.calories ?? '--'} kcal",
                    style: const TextStyle(fontSize: 14, color: Colors.grey),
                  ),
                  const SizedBox(height: 6),

                  // Category and Diet Type Badge
                  Row(
                    children: [
                      Text(
                        meal.category,
                        style: TextStyle(fontSize: 13, color: Colors.grey[600]),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: _getDietColor(meal.dietType),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          meal.dietType.toUpperCase(),
                          style:
                          const TextStyle(fontSize: 11, color: Colors.white),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),

                  // Availability Indicator
                  Row(
                    children: [
                      Icon(
                        Icons.circle,
                        size: 10,
                        color: meal.isAvailable ? Colors.green : Colors.red,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        meal.isAvailable ? "Available" : "Sold Out",
                        style: TextStyle(
                            fontSize: 12,
                            color: meal.isAvailable ? Colors.green : Colors.red),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // Add Button
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: meal.isAvailable
                          ? () {
                        // TODO: Add to cart functionality
                      }
                          : null,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.deepOrange,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        padding: const EdgeInsets.symmetric(vertical: 10),
                      ),
                      child: const Text(
                        "Add",
                        style: TextStyle(fontSize: 16),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
