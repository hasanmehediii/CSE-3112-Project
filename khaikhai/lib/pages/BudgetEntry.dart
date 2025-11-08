import 'package:flutter/material.dart';

class BudgetEntryScreen extends StatefulWidget {
  const BudgetEntryScreen({super.key});

  @override
  State<BudgetEntryScreen> createState() => _BudgetEntryScreenState();
}

class _BudgetEntryScreenState extends State<BudgetEntryScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _budgetController = TextEditingController();

  double? dailyBudget;
  List<Map<String, dynamic>> mealPlan = [];

  void _generateMealPlan(double monthlyBudget) {
    int days = 30;
    dailyBudget = monthlyBudget / days;

    // mock meals
    List<Map<String, dynamic>> mockMeals = [
      {
        "meal": "Breakfast",
        "canteen": "Math Canteen",
        "price": 40,
        "image": "assets/breakfast.jpg",
        "desc": "A light meal with bread, egg, and tea."
      },
      {
        "meal": "Lunch",
        "canteen": "Curzon",
        "price": 80,
        "image": "assets/lunch.jpg",
        "desc": "Rice, chicken curry, dal, and salad."
      },
      {
        "meal": "Snacks",
        "canteen": "Tong",
        "price": 30,
        "image": "assets/dinner.jpg",
        "desc": "Singara, samosa, or puffed rice with tea."
      },
      {
        "meal": "Dinner",
        "canteen": "Hall",
        "price": 70,
        "image": "assets/dinner.jpg",
        "desc": "Rice, fish curry, vegetables, and dal."
      },
    ];

    setState(() {
      mealPlan = List.generate(days, (index) {
        return {
          "day": index + 1,
          "meals": mockMeals,
          "total": mockMeals.fold(0, (sum, m) => sum + (m["price"] as int)),
        };
      });
    });
  }

  void _showMealPopup(BuildContext context, Map<String, dynamic> dayPlan) {
    showDialog(
      context: context,
      builder: (context) {
        return Dialog(
          shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  "Day ${dayPlan["day"]} - Total: Tk ${dayPlan["total"]}",
                  style: const TextStyle(
                      fontSize: 18, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                ...dayPlan["meals"].map<Widget>((m) {
                  return Card(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    child: ListTile(
                      leading: ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: Image.asset(
                          m["image"],
                          width: 60,
                          height: 60,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            return Container(
                              width: 60,
                              height: 60,
                              color: Colors.orange[100],
                              child: const Icon(Icons.restaurant_menu, color: Colors.orange),
                            );
                          },
                        ),
                      ),
                      title: Text(m["meal"]),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(m["canteen"]),
                          const SizedBox(height: 4),
                          Text(
                            m["desc"],
                            style: const TextStyle(fontSize: 12),
                          ),
                        ],
                      ),
                      trailing: Text(
                        "Tk ${m["price"]}",
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  );
                }).toList()
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: const ValueKey('budget_entry_scaffold'),
      appBar: AppBar(
        title: const Text("KhaiKhai Meal Planner"),
        backgroundColor: Colors.deepOrange,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Form(
              key: _formKey,
              child: Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _budgetController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: "Enter Monthly Budget (Tk)",
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) => value!.isEmpty ? "Enter budget" : null,
                    ),
                  ),
                  const SizedBox(width: 10),
                  SizedBox(
                    width: 120,
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.deepOrange,
                        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                      ),
                      onPressed: () {
                        if (_formKey.currentState!.validate()) {
                          double budget = double.parse(_budgetController.text);
                          _generateMealPlan(budget);
                        }
                      },
                      child: const Text("Generate"),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            dailyBudget != null
                ? Text(
              "Daily Budget: Tk ${dailyBudget!.toStringAsFixed(2)}",
              style: const TextStyle(
                  fontSize: 18, fontWeight: FontWeight.bold),
            )
                : const SizedBox(),
            const SizedBox(height: 10),
            Expanded(
              child: mealPlan.isEmpty
                  ? const Center(
                child: Text("Enter your budget to see meal plan"),
              )
                  : GridView.builder(
                gridDelegate:
                const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 5, // 5 per row
                  crossAxisSpacing: 8,
                  mainAxisSpacing: 8,
                  childAspectRatio: 1,
                ),
                itemCount: mealPlan.length,
                itemBuilder: (context, index) {
                  final dayPlan = mealPlan[index];
                  return InkWell(
                    onTap: () {
                      Future.microtask(() {
                        if (context.mounted) {
                          _showMealPopup(context, dayPlan);
                        }
                      });
                    },
                    borderRadius: BorderRadius.circular(12),
                    child: Card(
                      color: Colors.orange.shade100,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Center(
                        child: Text(
                          "Day ${dayPlan["day"]}",
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
