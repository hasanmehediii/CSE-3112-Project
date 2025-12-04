// lib/models/complaint.dart
class Complaint {
  final int id;
  final int studentId;
  final int? canteenId;
  final int? mealId;
  final int? orderId;
  final String message;
  final String status;

  Complaint({
    required this.id,
    required this.studentId,
    this.canteenId,
    this.mealId,
    this.orderId,
    required this.message,
    required this.status,
  });

  factory Complaint.fromJson(Map<String, dynamic> json) {
    return Complaint(
      id: json['id'] as int,
      studentId: json['student_id'] as int,
      canteenId: json['canteen_id'] as int?,
      mealId: json['meal_id'] as int?,
      orderId: json['order_id'] as int?,
      message: json['message'] as String,
      status: json['status'] as String,
    );
  }
}
