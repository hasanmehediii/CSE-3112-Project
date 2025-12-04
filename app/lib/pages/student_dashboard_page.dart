import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../auth/auth_state.dart';
import '../models/meal.dart';

class StudentDashboardPage extends StatefulWidget {
  const StudentDashboardPage({super.key});

  @override
  State<StudentDashboardPage> createState() => _StudentDashboardPageState();
}

class _StudentDashboardPageState extends State<StudentDashboardPage> {
  bool _loading = true;
  List<Meal> _availableMeals = [];
  List<Meal> _budgetDeals = [];
  String? _message;

  @override
  void initState() {
    super.initState();
    _loadMeals();
  }

  Future<void> _loadMeals() async {
    setState(() {
      _loading = true;
      _message = null;
    });

    final auth = context.read<AuthState>();

    try {
      final availableRes =
          await auth.apiClient.get('/meals/available') as List<dynamic>;
      final budgetRes =
          await auth.apiClient.get('/meals/budget') as List<dynamic>;

      setState(() {
        _availableMeals = availableRes
            .map((e) => Meal.fromJson(e as Map<String, dynamic>))
            .toList();
        _budgetDeals = budgetRes
            .map((e) => Meal.fromJson(e as Map<String, dynamic>))
            .toList();
      });
    } catch (e) {
      setState(() {
        _message = 'Failed to load meals: $e';
      });
    } finally {
      if (mounted) {
        setState(() => _loading = false);
      }
    }
  }

  Future<void> _quickOrder(Meal meal) async {
    final auth = context.read<AuthState>();
    setState(() {
      _message = null;
    });

    try {
      final res = await auth.apiClient.post(
        '/orders/',
        body: {
          'canteen_id': meal.canteenId,
          'mode': 'pickup',
          'delivery_address': null,
          'items': [
            {'meal_id': meal.id, 'quantity': 1},
          ],
        },
      );

      final id = res['id'];
      setState(() {
        _message = 'Order #$id placed for ${meal.name}';
      });
    } catch (e) {
      setState(() {
        _message = 'Could not place order: $e';
      });
    }
  }

  Widget _buildMealCard(Meal m, {bool showQuickOrder = true}) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(18),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.06),
            blurRadius: 16,
            offset: const Offset(0, 10),
          ),
        ],
        border: Border.all(color: const Color(0xFFE5E7EB), width: 0.8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (m.imageUrl != null)
            ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(18),
                topRight: Radius.circular(18),
              ),
              child: Image.network(
                m.imageUrl!,
                height: 110,
                width: double.infinity,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => const SizedBox(
                  height: 110,
                  child: Center(child: Text('No image')),
                ),
              ),
            )
          else
            const SizedBox(
              height: 110,
              child: Center(
                child: Text(
                  'No image',
                  style: TextStyle(fontSize: 12, color: Colors.grey),
                ),
              ),
            ),
          Padding(
            padding: const EdgeInsets.fromLTRB(10, 8, 10, 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  m.name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 14.5,
                  ),
                ),
                const SizedBox(height: 3),
                Text(
                  'Canteen #${m.canteenId}',
                  style: const TextStyle(fontSize: 11.5, color: Colors.grey),
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '৳ ${m.price.toStringAsFixed(0)}',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 14.5,
                      ),
                    ),
                    if (showQuickOrder)
                      ElevatedButton(
                        onPressed: () => _quickOrder(m),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF2563EB),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 6,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(999),
                          ),
                        ),
                        child: const Text(
                          'Quick Order',
                          style: TextStyle(fontSize: 11.5),
                        ),
                      )
                    else
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(999),
                          color: const Color(0xFFDCFCE7),
                        ),
                        child: const Text(
                          'Budget pick',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                            color: Color(0xFF166534),
                          ),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return RefreshIndicator(
      onRefresh: _loadMeals,
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
        children: [
          // Hero card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFFF97316), Color(0xFFEA580C)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(18),
              boxShadow: [
                BoxShadow(
                  color: Colors.orange.withOpacity(0.25),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Row(
              children: [
                Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white.withOpacity(0.15),
                  ),
                  child: const Icon(
                    Icons.restaurant_menu_outlined,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Student Dashboard',
                        style: theme.textTheme.titleMedium?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'View today’s meals, explore budget deals, and place quick pickup orders.',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: Colors.white.withOpacity(0.9),
                          fontSize: 11.5,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          if (_message != null) ...[
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: _message!.startsWith('Order')
                    ? Colors.green[50]
                    : Colors.red[50],
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                _message!,
                style: TextStyle(
                  color: _message!.startsWith('Order')
                      ? Colors.green[800]
                      : Colors.red[800],
                  fontSize: 12.5,
                ),
              ),
            ),
          ],

          const SizedBox(height: 16),

          if (_loading)
            const Padding(
              padding: EdgeInsets.all(24.0),
              child: Center(child: CircularProgressIndicator()),
            )
          else ...[
            // Available meals
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Today's Available Meals",
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                if (_availableMeals.isNotEmpty)
                  Text(
                    '${_availableMeals.length} items',
                    style: const TextStyle(fontSize: 11.5, color: Colors.grey),
                  ),
              ],
            ),
            const SizedBox(height: 6),
            if (_availableMeals.isEmpty)
              const Text(
                'No meals available.',
                style: TextStyle(fontSize: 13, color: Colors.grey),
              )
            else
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _availableMeals.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 10,
                  crossAxisSpacing: 10,
                  childAspectRatio: 0.78,
                ),
                itemBuilder: (_, i) =>
                    _buildMealCard(_availableMeals[i], showQuickOrder: true),
              ),
            const SizedBox(height: 18),

            // Budget deals
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Budget Deals (Low → High)',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                if (_budgetDeals.isNotEmpty)
                  Text(
                    '${_budgetDeals.length} picks',
                    style: const TextStyle(fontSize: 11.5, color: Colors.grey),
                  ),
              ],
            ),
            const SizedBox(height: 6),
            if (_budgetDeals.isEmpty)
              const Text(
                'No meals found.',
                style: TextStyle(fontSize: 13, color: Colors.grey),
              )
            else
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _budgetDeals.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 10,
                  crossAxisSpacing: 10,
                  childAspectRatio: 0.78,
                ),
                itemBuilder: (_, i) =>
                    _buildMealCard(_budgetDeals[i], showQuickOrder: false),
              ),
          ],
        ],
      ),
    );
  }
}
