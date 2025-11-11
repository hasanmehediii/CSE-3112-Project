class Meal {
  final String id;
  final String name;
  final String category;
  final double price;
  final int calories;
  final String? imageUrl;

  Meal({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
    required this.calories,
    this.imageUrl,
  });

  factory Meal.fromJson(Map<String, dynamic> json) {
    return Meal(
      id: json['_id'],
      name: json['name'],
      category: json['category'],
      price: (json['price'] as num).toDouble(),
      calories: json['calories'] ?? 0,
      imageUrl: json['image_url'],
    );
  }
}
