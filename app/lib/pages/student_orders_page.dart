import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../auth/auth_state.dart';
import '../models/order.dart';

class StudentOrdersPage extends StatefulWidget {
  const StudentOrdersPage({super.key});

  @override
  State<StudentOrdersPage> createState() => _StudentOrdersPageState();
}

class _StudentOrdersPageState extends State<StudentOrdersPage> {
  var _loading = true;
  String? _error;
  List<StudentOrder> _orders = const [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final result = await context.read<AuthState>().apiClient.get(
        '/orders/me',
      );
      final values = result as List<dynamic>;
      if (!mounted) return;
      setState(
        () => _orders = values
            .map(
              (value) => StudentOrder.fromJson(value as Map<String, dynamic>),
            )
            .toList(),
      );
    } catch (error) {
      if (mounted) setState(() => _error = error.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) return const Center(child: CircularProgressIndicator());
    if (_error != null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.cloud_off_outlined, size: 44),
              const SizedBox(height: 12),
              Text(_error!, textAlign: TextAlign.center),
              const SizedBox(height: 12),
              FilledButton.icon(
                onPressed: _load,
                icon: const Icon(Icons.refresh),
                label: const Text('Retry'),
              ),
            ],
          ),
        ),
      );
    }
    if (_orders.isEmpty) {
      return RefreshIndicator(
        onRefresh: _load,
        child: ListView(
          children: const [
            SizedBox(height: 180),
            Icon(Icons.receipt_long_outlined, size: 54, color: Colors.grey),
            SizedBox(height: 14),
            Center(child: Text('No orders yet. Choose a meal to get started.')),
          ],
        ),
      );
    }
    return RefreshIndicator(
      onRefresh: _load,
      child: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: _orders.length,
        separatorBuilder: (_, __) => const SizedBox(height: 10),
        itemBuilder: (context, index) {
          final order = _orders[index];
          return Card(
            child: ListTile(
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 16,
                vertical: 8,
              ),
              leading: CircleAvatar(
                backgroundColor: const Color(0xFFFFEDD5),
                child: Text(
                  '#${order.id}',
                  style: const TextStyle(
                    color: Color(0xFF9A3412),
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              title: Text(
                '৳${order.totalPrice.toStringAsFixed(2)} · ${order.mode ?? 'pickup'}',
              ),
              subtitle: Text(
                'Canteen #${order.canteenId ?? '-'}\n${MaterialLocalizations.of(context).formatMediumDate(order.createdAt.toLocal())}',
              ),
              isThreeLine: true,
              trailing: Chip(
                label: Text(order.status),
                backgroundColor: const Color(0xFFFFF7ED),
              ),
            ),
          );
        },
      ),
    );
  }
}
