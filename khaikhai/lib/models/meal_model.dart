class Meal {
  final String id;
  final String name;
  final String category;
  final double price;
  final int calories;
  final String? imageUrl;
  final String dietType;     // NEW
  final bool isAvailable;    // NEW

  Meal({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
    required this.calories,
    this.imageUrl,
    required this.dietType,       // NEW
    required this.isAvailable,    // NEW
  });

  factory Meal.fromJson(Map<String, dynamic> json) {
    return Meal(
      id: json['_id'],
      name: json['name'],
      category: json['category'],
      price: (json['price'] as num).toDouble(),
      calories: json['calories'] ?? 0,
      imageUrl: json['image_url'],
      dietType: json['diet_type'] ?? 'veg',          // NEW
      isAvailable: json['is_available'] ?? true,    // NEW
    );
  }
}
