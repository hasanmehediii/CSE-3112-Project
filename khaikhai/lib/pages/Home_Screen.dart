import 'dart:async';
import 'package:khaikhai/pages/canteen_list_screen.dart';

import 'BudgetEntry.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../services/storage_service.dart';
import '../../providers/user_profile_provider.dart';
import 'daily_budget.dart';
import 'meal_suggestions.dart';
import 'expense_entry.dart';
import 'expense_report.dart';
import 'budget_settings.dart';
import 'profile.dart';
import 'set_budget_screen.dart';
import 'budget_dashboard.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentTipIndex = 0;
  final PageController _tipPageController = PageController();
  late Timer _tipTimer;

  // Example tips or motivational messages for the day
  final List<String> dailyTips = [
    "Remember to save some budget for snacks today!",
    "Try a balanced meal at Math Canteen today.",
    "You can save Tk. 50 today by skipping extra drinks.",
    "Plan ahead for tomorrow's lunch at Curzon!",
  ];

  @override
  void initState() {
    super.initState();
    _tipTimer = Timer.periodic(const Duration(seconds: 6), (Timer timer) {
      if (_tipPageController.hasClients) {
        _currentTipIndex = (_currentTipIndex + 1) % dailyTips.length;
        _tipPageController.animateToPage(
          _currentTipIndex,
          duration: const Duration(milliseconds: 800),
          curve: Curves.easeInOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _tipTimer.cancel();
    _tipPageController.dispose();
    super.dispose();
  }

  void _navigateTo(Widget page) {
    Navigator.pop(context);
    Navigator.push(context, MaterialPageRoute(builder: (_) => page));
  }

  Future<void> _logout(BuildContext context) async {
    await StorageService.clearStorage();
    Provider.of<UserProfileProvider>(context, listen: false).clearUserProfile();
    if (mounted) {
      Navigator.pushReplacementNamed(context, '/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProfileProvider>(context);
    final userProfile = userProvider.userProfile;

    if (userProfile == null) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      drawer: Drawer(
        child: SafeArea(
          child: Column(
            children: [
              const Padding(
                padding: EdgeInsets.all(16),
                child: Text(
                  'KhaiKhai',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
              ),
              const Divider(),
              Expanded(
                child: ListView(
                  children: [
                    _buildDrawerItem(Icons.home, "Home Dashboard", const DailyBudgetScreen()),
                    _buildDrawerItem(Icons.restaurant_menu, "Meal Suggestions", const MealSuggestionsScreen()),
                    _buildDrawerItem(Icons.dining, "Canteens", const CanteenListScreen()),
                    _buildDrawerItem(Icons.edit, "Set Budget", const SetBudgetScreen()),
                    _buildDrawerItem(Icons.dining, "Budget Dashboard", const BudgetDashboardScreen()),
                    _buildDrawerItem(Icons.edit, "Expense Entry", const ExpenseEntryScreen()),
                    _buildDrawerItem(Icons.edit, "Budget Entry", const BudgetEntryScreen()),
                    _buildDrawerItem(Icons.bar_chart, "Expense Report", const ExpenseReportScreen()),
                    _buildDrawerItem(Icons.account_balance_wallet, "Budget Settings", const BudgetSettingsScreen()),
                    _buildDrawerItem(Icons.person, "Profile", const ProfileScreen()),
                    //_buildDrawerItem(Icons.person, "Profile", const ProfilePage1()),
                  ],
                ),
              ),
              const Divider(),
              ListTile(
                leading: const Icon(Icons.logout),
                title: const Text('Logout'),
                onTap: () => _logout(context),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
      appBar: AppBar(
        title: const Text('KhaiKhai'),
        centerTitle: true,
        backgroundColor: Colors.green,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: 120,
              child: PageView.builder(
                controller: _tipPageController,
                itemCount: dailyTips.length,
                itemBuilder: (context, index) {
                  return Card(
                    margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    color: Colors.green.shade100,
                    child: Center(
                      child: Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Text(
                          dailyTips[index],
                          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 20),
            _buildSection("Today's Suggested Meals", [
              {"meal": "Breakfast - Paratha & Eggs", "canteen": "Math Canteen", "price": "Tk 60"},
              {"meal": "Lunch - Chicken Biryani", "canteen": "Curzon", "price": "Tk 150"},
              {"meal": "Snacks - Samosa", "canteen": "Tong", "price": "Tk 30"},
              {"meal": "Dinner - Veg Curry & Rice", "canteen": "Hall", "price": "Tk 120"},
            ]),
            const SizedBox(height: 20),
            _buildSection("Monthly Budget Overview", [
              {"label": "Total Budget", "value": "Tk 5000"},
              {"label": "Spent", "value": "Tk 2800"},
              {"label": "Remaining", "value": "Tk 2200"},
            ], isBudget: true),
            const SizedBox(height: 20),
            _buildFooter(),
          ],
        ),
      ),
    );
  }

  ListTile _buildDrawerItem(IconData icon, String label, Widget page) {
    return ListTile(
      leading: Icon(icon),
      title: Text(label),
      onTap: () => _navigateTo(page),
    );
  }

  Widget _buildSection(String title, List<Map<String, String>> items, {bool isBudget = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 10),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: isBudget ? 3 : 2,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 2.5,
            ),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final item = items[index];
              return GestureDetector(
                onTap: () {
                  if (!isBudget) {
                    _showMealDetailsDialog(item);
                  }
                },
                child: Container(
                  decoration: BoxDecoration(
                    color: isBudget ? Colors.orange.shade100 : Colors.green.shade100,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black26,
                        blurRadius: 6,
                        offset: const Offset(0, 3),
                      ),
                    ],
                  ),
                  padding: const EdgeInsets.all(12),
                  child: isBudget
                      ? Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(item["label"]!, style: const TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 5),
                      Text(item["value"]!, style: const TextStyle(fontSize: 14)),
                    ],
                  )
                      : Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(item["meal"]!, style: const TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 5),
                      Text("Canteen: ${item["canteen"]}"),
                      const SizedBox(height: 5),
                      Text("Price: ${item["price"]}"),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  void _showMealDetailsDialog(Map<String, String> meal) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: Text(meal["meal"] ?? "Meal Details", style: const TextStyle(fontWeight: FontWeight.bold)),
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
              child: const Text("Close"),
              onPressed: () => Navigator.pop(context),
            ),
          ],
        );
      },
    );
  }

  Widget _buildFooter() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Column(
        children: const [
          Text(
            'All rights reserved 2025, Version 25.24.1',
            style: TextStyle(fontSize: 12, color: Colors.grey),
          ),
          SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.facebook, color: Colors.blue, size: 24),
              SizedBox(width: 16),
              Icon(Icons.code, color: Colors.black, size: 24),
              SizedBox(width: 16),
              Icon(Icons.business_center, color: Color(0xFF0A66C2), size: 24),
              SizedBox(width: 16),
              Icon(Icons.email, color: Colors.red, size: 24),
            ],
          ),
        ],
      ),
    );
  }
}
