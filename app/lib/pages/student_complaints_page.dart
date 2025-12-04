import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../auth/auth_state.dart';
import '../models/complaint.dart';

class StudentComplaintsPage extends StatefulWidget {
  const StudentComplaintsPage({super.key});

  @override
  State<StudentComplaintsPage> createState() => _StudentComplaintsPageState();
}

class _StudentComplaintsPageState extends State<StudentComplaintsPage> {
  bool _loading = true;
  List<Complaint> _complaints = [];
  String? _message;

  final _canteenIdCtrl = TextEditingController();
  final _mealIdCtrl = TextEditingController();
  final _orderIdCtrl = TextEditingController();
  final _complaintCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadComplaints();
  }

  @override
  void dispose() {
    _canteenIdCtrl.dispose();
    _mealIdCtrl.dispose();
    _orderIdCtrl.dispose();
    _complaintCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadComplaints() async {
    setState(() {
      _loading = true;
      _message = null;
    });

    final auth = context.read<AuthState>();

    try {
      final data = await auth.apiClient.get('/complaints/me');
      final list = (data as List<dynamic>)
          .map((e) => Complaint.fromJson(e as Map<String, dynamic>))
          .toList();
      setState(() {
        _complaints = list;
      });
    } catch (e) {
      setState(() {
        _message = 'Failed to load complaints: $e';
      });
    } finally {
      if (mounted) {
        setState(() => _loading = false);
      }
    }
  }

  Future<void> _submitComplaint() async {
    final canteenText = _canteenIdCtrl.text.trim();
    final complaintText = _complaintCtrl.text.trim();

    if (canteenText.isEmpty || complaintText.isEmpty) {
      setState(() {
        _message = 'Canteen ID and message are required.';
      });
      return;
    }

    final auth = context.read<AuthState>();

    setState(() {
      _message = null;
    });

    try {
      final body = {
        'canteen_id': int.parse(canteenText),
        'meal_id': _mealIdCtrl.text.trim().isEmpty
            ? null
            : int.parse(_mealIdCtrl.text),
        'order_id': _orderIdCtrl.text.trim().isEmpty
            ? null
            : int.parse(_orderIdCtrl.text),
        'message': complaintText,
      };

      await auth.apiClient.post('/complaints/', body: body);

      setState(() {
        _message = 'Complaint submitted.';
      });

      _canteenIdCtrl.clear();
      _mealIdCtrl.clear();
      _orderIdCtrl.clear();
      _complaintCtrl.clear();

      await _loadComplaints();
    } catch (e) {
      setState(() {
        _message = 'Failed to submit complaint: $e';
      });
    }
  }

  Color _statusColor(String status) {
    if (status == 'open' || status == 'pending') {
      return Colors.orange;
    } else if (status == 'resolved' || status == 'completed') {
      return Colors.green;
    } else if (status == 'in_progress') {
      return Colors.blue;
    } else if (status == 'rejected') {
      return Colors.red;
    }
    return Colors.grey;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return RefreshIndicator(
      onRefresh: _loadComplaints,
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
        children: [
          // Header section
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF2563EB), Color(0xFF4F46E5)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(18),
              boxShadow: [
                BoxShadow(
                  color: Colors.blue.withOpacity(0.25),
                  blurRadius: 18,
                  offset: const Offset(0, 8),
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
                    Icons.report_problem_outlined,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'My Complaints',
                        style: theme.textTheme.titleMedium?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'Submit issues about canteens, meals, or orders and track how they\'re resolved.',
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
                color: _message!.startsWith('Failed')
                    ? Colors.red[50]
                    : Colors.green[50],
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                _message!,
                style: TextStyle(
                  color: _message!.startsWith('Failed')
                      ? Colors.red[800]
                      : Colors.green[800],
                  fontSize: 12.5,
                ),
              ),
            ),
          ],

          const SizedBox(height: 16),

          // Submit form card
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.08),
                  blurRadius: 16,
                  offset: const Offset(0, 10),
                ),
              ],
              border: Border.all(color: const Color(0xFFE5E7EB), width: 0.7),
            ),
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Submit a Complaint',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: const Color(0xFF111827),
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Link the right canteen, meal or order so it can be handled faster.',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: const Color(0xFF6B7280),
                    fontSize: 12,
                  ),
                ),
                const SizedBox(height: 12),

                // Row of IDs
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _canteenIdCtrl,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Canteen ID *',
                          hintText: 'e.g. 1',
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: TextField(
                        controller: _mealIdCtrl,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                          labelText: 'Meal ID',
                          hintText: 'optional',
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: _orderIdCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Order ID',
                    hintText: 'optional',
                  ),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _complaintCtrl,
                  maxLines: 4,
                  decoration: const InputDecoration(
                    labelText: 'Complaint message *',
                    alignLabelWithHint: true,
                    hintText:
                        'Describe what went wrong, when it happened, and any details…',
                  ),
                ),
                const SizedBox(height: 10),
                Align(
                  alignment: Alignment.centerRight,
                  child: ElevatedButton.icon(
                    onPressed: _submitComplaint,
                    icon: const Icon(Icons.send, size: 16),
                    label: const Text('Submit Complaint'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF2563EB),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(999),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // History header
          Text(
            'Complaint History',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 6),

          if (_loading)
            const Padding(
              padding: EdgeInsets.all(24.0),
              child: Center(child: CircularProgressIndicator()),
            )
          else if (_complaints.isEmpty)
            const Padding(
              padding: EdgeInsets.symmetric(vertical: 8.0),
              child: Text(
                'You have not submitted any complaints yet.',
                style: TextStyle(fontSize: 13, color: Colors.grey),
              ),
            )
          else
            Column(
              children: _complaints
                  .map(
                    (c) => Container(
                      margin: const EdgeInsets.only(bottom: 10),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(16),
                        color: const Color(0xFFF9FAFB),
                        border: Border.all(
                          color: const Color(0xFFE5E7EB),
                          width: 0.8,
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.04),
                            blurRadius: 12,
                            offset: const Offset(0, 6),
                          ),
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(10),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // header row
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Complaint #${c.id}',
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                    horizontal: 8,
                                    vertical: 3,
                                  ),
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(999),
                                    color: _statusColor(
                                      c.status,
                                    ).withOpacity(0.12),
                                  ),
                                  child: Row(
                                    children: [
                                      Icon(
                                        Icons.circle,
                                        size: 8,
                                        color: _statusColor(c.status),
                                      ),
                                      const SizedBox(width: 4),
                                      Text(
                                        c.status,
                                        style: TextStyle(
                                          fontSize: 11,
                                          fontWeight: FontWeight.w500,
                                          color: _statusColor(c.status),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Text(
                              c.message,
                              style: const TextStyle(fontSize: 13.5),
                            ),
                            const SizedBox(height: 6),
                            Text(
                              'Canteen: ${c.canteenId ?? '-'} • Meal: ${c.mealId ?? '-'} • Order: ${c.orderId ?? '-'}',
                              style: const TextStyle(
                                fontSize: 12,
                                color: Colors.grey,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  )
                  .toList(),
            ),
        ],
      ),
    );
  }
}
