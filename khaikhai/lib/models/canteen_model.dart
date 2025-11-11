class Canteen {
  final String id;
  final String name;
  final String location;
  final String description;
  final String? imageUrl;

  Canteen({
    required this.id,
    required this.name,
    required this.location,
    required this.description,
    this.imageUrl,
  });

  factory Canteen.fromJson(Map<String, dynamic> json) {
    return Canteen(
      id: json['_id'],
      name: json['name'],
      location: json['location'],
      description: json['description'] ?? '',
      imageUrl: json['image_url'], // optional
    );
  }
}
