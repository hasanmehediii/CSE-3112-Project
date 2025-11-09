import 'package:flutter/material.dart';

class BudgetSettingsScreen extends StatefulWidget {
  const BudgetSettingsScreen({super.key});

  @override
  State<BudgetSettingsScreen> createState() => _BudgetSettingsScreenState();
}

class _BudgetSettingsScreenState extends State<BudgetSettingsScreen> {
  double _monthlyBudget = 6000; // Example starting budget in Tk
  late double _dailyBudget;
  int _daysInMonth = 30;

  final TextEditingController _manualController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _dailyBudget = _monthlyBudget / _daysInMonth;
    _manualController.text = _dailyBudget.toStringAsFixed(0);
  }

  void _updateDailyBudget(double value) {
    setState(() {
      _dailyBudget = value;
      _monthlyBudget = _dailyBudget * _daysInMonth;
      _manualController.text = _dailyBudget.toStringAsFixed(0);
    });
  }

  void _manualInputChanged(String value) {
    final val = double.tryParse(value);
    if (val != null) {
      setState(() {
        _dailyBudget = val;
        _monthlyBudget = _dailyBudget * _daysInMonth;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Budget Settings"),
        backgroundColor: Colors.deepOrange,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              color: Colors.orange.shade100,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    const Text(
                      "Monthly Budget",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      "Tk ${_monthlyBudget.toStringAsFixed(0)}",
                      style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.deepOrange),
                    ),
                    const SizedBox(height: 20),
                    const Text(
                      "Daily Budget",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      "Tk ${_dailyBudget.toStringAsFixed(0)} per day",
                      style: const TextStyle(fontSize: 20, color: Colors.deepOrange),
                    ),
                    const SizedBox(height: 10),
                    Slider(
                      value: _dailyBudget,
                      min: 50,
                      max: 1000,
                      divisions: 95,
                      activeColor: Colors.deepOrange,
                      inactiveColor: Colors.orange.shade300,
                      label: "Tk ${_dailyBudget.toStringAsFixed(0)}",
                      onChanged: _updateDailyBudget,
                    ),
                    const SizedBox(height: 10),
                    TextField(
                      controller: _manualController,
                      keyboardType: TextInputType.number,
                      decoration: InputDecoration(
                        labelText: "Manual Input",
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                        suffixText: "Tk",
                      ),
                      onChanged: _manualInputChanged,
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.deepOrange,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      ),
                      onPressed: () {
                        // TODO: Save budget logic
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text("Budget saved successfully!")),
                        );
                      },
                      child: const Text("Save Budget"),
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
