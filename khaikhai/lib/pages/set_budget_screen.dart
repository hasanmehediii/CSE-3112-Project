import 'package:flutter/material.dart';
import 'package:khaikhai/models/budget_model.dart';
import 'package:khaikhai/services/api_services.dart';
import 'package:khaikhai/services/storage_service.dart';

class SetBudgetScreen extends StatefulWidget {
  const SetBudgetScreen({super.key});

  @override
  State<SetBudgetScreen> createState() => _SetBudgetScreenState();
}

class _SetBudgetScreenState extends State<SetBudgetScreen> {
  final _manualController = TextEditingController();
  bool isLoading = false;

  double _dailyBudget = 200; // default daily budget
  double _monthlyBudget = 0; // calculated dynamically
  late int _remainingDays;

  @override
  void initState() {
    super.initState();
    _calculateRemainingDays();
    _monthlyBudget = _dailyBudget * _remainingDays;
    _manualController.text = _dailyBudget.toStringAsFixed(0);
  }

  void _calculateRemainingDays() {
    final now = DateTime.now();
    final daysInMonth = DateTime(now.year, now.month + 1, 0).day;
    _remainingDays = daysInMonth - now.day + 1; // include today
  }

  @override
  void dispose() {
    _manualController.dispose();
    super.dispose();
  }

  void _updateDailyBudget(double value) {
    setState(() {
      _dailyBudget = value;
      _monthlyBudget = _dailyBudget * _remainingDays;
      _manualController.text = _dailyBudget.toStringAsFixed(0);
    });
  }

  void _manualInputChanged(String value) {
    final val = double.tryParse(value);
    if (val != null && val > 0) {
      setState(() {
        _dailyBudget = val;
        _monthlyBudget = _dailyBudget * _remainingDays;
      });
    }
  }

  Future<void> _submitBudget() async {
    setState(() => isLoading = true);
    try {
      final token = await StorageService.getToken();
      if (token == null) throw Exception('No auth token found');

      final budget = await ApiService.setMonthlyBudget(_monthlyBudget, token);

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Budget set successfully!'),
          backgroundColor: Colors.green,
        ),
      );

      Navigator.pop(context, budget);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error setting budget: $e'),
          backgroundColor: Colors.redAccent,
        ),
      );
    } finally {
      setState(() => isLoading = false);
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
        child: Card(
          color: Colors.orange.shade100,
          elevation: 8,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  "Set Your Budget",
                  style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.deepOrange),
                ),
                const SizedBox(height: 16),

                // Monthly budget display
                Text(
                  "Monthly Budget: Tk ${_monthlyBudget.toStringAsFixed(0)}",
                  style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Colors.deepOrange),
                ),
                const SizedBox(height: 8),
                Text(
                  "($_remainingDays days remaining)",
                  style: const TextStyle(fontSize: 14, color: Colors.grey),
                ),
                const SizedBox(height: 16),

                // Daily budget display
                Text(
                  "Daily Budget: Tk ${_dailyBudget.toStringAsFixed(0)}",
                  style: const TextStyle(fontSize: 18, color: Colors.deepOrange),
                ),
                const SizedBox(height: 16),

                // Slider input
                Slider(
                  value: _dailyBudget,
                  min: 50,
                  max: 1000,
                  divisions: 95,
                  activeColor: Colors.deepOrange,
                  inactiveColor: Colors.orange.shade200,
                  label: "Tk ${_dailyBudget.toStringAsFixed(0)}",
                  onChanged: _updateDailyBudget,
                ),
                const SizedBox(height: 16),

                // Manual input
                TextField(
                  controller: _manualController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    labelText: "Manual Daily Budget",
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12)),
                    suffixText: "Tk",
                  ),
                  onChanged: _manualInputChanged,
                ),
                const SizedBox(height: 24),

                // Save button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: isLoading ? null : _submitBudget,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.deepOrange,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12)),
                    ),
                    child: isLoading
                        ? const CircularProgressIndicator(color: Colors.white)
                        : const Text(
                      "Save Budget",
                      style: TextStyle(
                          fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
