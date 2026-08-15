class StudentOrder {
  const StudentOrder({
    required this.id,
    required this.totalPrice,
    required this.status,
    required this.createdAt,
    this.canteenId,
    this.mode,
  });

  final int id;
  final int? canteenId;
  final double totalPrice;
  final String status;
  final String? mode;
  final DateTime createdAt;

  factory StudentOrder.fromJson(Map<String, dynamic> json) => StudentOrder(
    id: json['id'] as int,
    canteenId: json['canteen_id'] as int?,
    totalPrice: (json['total_price'] as num).toDouble(),
    status: json['status'] as String,
    mode: json['mode'] as String?,
    createdAt: DateTime.parse(json['created_at'] as String),
  );
}
