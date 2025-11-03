import 'package:flutter/material.dart';

class MealSuggestionsScreen extends StatelessWidget {
  const MealSuggestionsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Existing meals (for GridView at bottom)
    final List<Map<String, String>> meals = [
      {"meal": "Breakfast - Paratha & Eggs", "canteen": "Math Canteen", "price": "Tk 60"},
      {"meal": "Lunch - Chicken Biryani", "canteen": "Curzon", "price": "Tk 150"},
      {"meal": "Snacks - Samosa", "canteen": "Tong", "price": "Tk 30"},
      {"meal": "Dinner - Veg Curry & Rice", "canteen": "Hall", "price": "Tk 120"},
    ];

    // Featured suggestions
    final Map<String, dynamic> nearestMeal = {
      "name": "Chicken Roll",
      "description": "Delicious chicken roll with crispy paratha and spicy chutney. A quick and filling meal for busy students.",
      "image": "assets/meal1.jpg"
    };

    final Map<String, dynamic> budgetMeal = {
      "name": "Veg Khichuri",
      "description": "Light and healthy khichuri served with fried eggplant. Perfect for staying full while keeping within budget.",
      "image": "assets/meal2.jpg"
    };

    return Scaffold(
      appBar: AppBar(
        title: const Text("Meal Suggestions"),
        backgroundColor: Colors.deepOrange,
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Best for today header
            const Text(
              "Best For Today",
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),

            // Nearest section
            const Text(
              "Nearest",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            _buildFeaturedMeal(context, nearestMeal),
            const SizedBox(height: 24),

            // Budget Friendly section
            const Text(
              "Budget Friendly",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            _buildFeaturedMeal(context, budgetMeal),
            const SizedBox(height: 24),

            // Existing cards grid
            const Text(
              "Other Suggestions",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 12),
            GridView.builder(
              physics: const NeverScrollableScrollPhysics(), // disable inner scroll
              shrinkWrap: true, // let it expand within SingleChildScrollView
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
                childAspectRatio: 2.5,
              ),
              itemCount: meals.length,
              itemBuilder: (context, index) {
                final meal = meals[index];
                return GestureDetector(
                  onTap: () => _showMealDialog(context, meal),
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.orange.shade100,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: const [
                        BoxShadow(color: Colors.black26, blurRadius: 6, offset: Offset(0, 3)),
                      ],
                    ),
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(meal["meal"]!, style: const TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 5),
                        Text("Canteen: ${meal["canteen"]}"),
                        const SizedBox(height: 5),
                        Text("Price: ${meal["price"]}"),
                      ],
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  // Widget for featured meal
  Widget _buildFeaturedMeal(BuildContext context, Map<String, dynamic> meal) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      elevation: 3,
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image
            SizedBox(
              width: MediaQuery.of(context).size.width * 0.4,
              height: 120,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.asset(meal["image"], fit: BoxFit.cover),
              ),
            ),
            const SizedBox(width: 12),
            // Text info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(meal["name"],
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Text(
                    meal["description"],
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 14, color: Colors.black87),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showMealDialog(BuildContext context, Map<String, String> meal) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Text(meal["meal"]!, style: const TextStyle(fontWeight: FontWeight.bold)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Canteen: ${meal["canteen"]}"),
            const SizedBox(height: 10),
            Text("Price: ${meal["price"]}"),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Close"),
          ),
          TextButton(
            onPressed: () {
              // TODO: Add to Expense logic
              Navigator.pop(context);
            },
            child: const Text("Add to Expense"),
          ),
        ],
      ),
    );
  }
}
