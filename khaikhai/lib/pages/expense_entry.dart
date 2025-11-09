import 'package:flutter/material.dart';

class ExpenseEntryScreen extends StatefulWidget {
  const ExpenseEntryScreen({super.key});

  @override
  State<ExpenseEntryScreen> createState() => _ExpenseEntryScreenState();
}

class _ExpenseEntryScreenState extends State<ExpenseEntryScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _mealController = TextEditingController();
  final TextEditingController _canteenController = TextEditingController();
  final TextEditingController _priceController = TextEditingController();

  final List<Map<String, String>> expenses = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Expense Entry"),
        backgroundColor: Colors.deepOrange,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Form(
              key: _formKey,
              child: Card(
                color: Colors.orange.shade100,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                elevation: 3,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      TextFormField(
                        controller: _mealController,
                        decoration: const InputDecoration(
                          labelText: "Meal",
                          border: OutlineInputBorder(),
                        ),
                        validator: (value) => value!.isEmpty ? "Enter meal name" : null,
                      ),
                      const SizedBox(height: 10),
                      TextFormField(
                        controller: _canteenController,
                        decoration: const InputDecoration(
                          labelText: "Canteen",
                          border: OutlineInputBorder(),
                        ),
                        validator: (value) => value!.isEmpty ? "Enter canteen" : null,
                      ),
                      const SizedBox(height: 10),
                      TextFormField(
                        controller: _priceController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: "Price (Tk)",
                          border: OutlineInputBorder(),
                        ),
                        validator: (value) => value!.isEmpty ? "Enter price" : null,
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.deepOrange,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            setState(() {
                              expenses.add({
                                "meal": _mealController.text,
                                "canteen": _canteenController.text,
                                "price": _priceController.text,
                              });
                              _mealController.clear();
                              _canteenController.clear();
                              _priceController.clear();
                            });
                          }
                        },
                        child: const Text("Add Expense"),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: expenses.isEmpty
                  ? const Center(child: Text("No expenses added yet!"))
                  : ListView.builder(
                itemCount: expenses.length,
                itemBuilder: (context, index) {
                  final item = expenses[index];
                  return Card(
                    color: Colors.orange.shade50,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    child: ListTile(
                      title: Text(item["meal"]!),
                      subtitle: Text("${item["canteen"]} - Tk ${item["price"]}"),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () {
                          setState(() {
                            expenses.removeAt(index);
                          });
                        },
                      ),
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
