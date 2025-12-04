// lib/models/meal.dart
class Meal {
  final int id;
  final String name;
  final double price;
  final int canteenId;
  final int quantity;
  final String? imageUrl;

  Meal({
    required this.id,
    required this.name,
    required this.price,
    required this.canteenId,
    required this.quantity,
    this.imageUrl,
  });

  factory Meal.fromJson(Map<String, dynamic> json) {
    return Meal(
      id: json['id'] as int,
      name: json['name'] as String,
      price: (json['price'] as num).toDouble(),
      canteenId: json['canteen_id'] as int,
      quantity: json['quantity'] as int,
      imageUrl: json['image_url'] as String?,
    );
  }
}
