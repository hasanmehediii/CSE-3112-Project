class OpenHours {
  final String start;
  final String end;

  OpenHours({required this.start, required this.end});

  factory OpenHours.fromJson(Map<String, dynamic> json) {
    return OpenHours(
      start: json['start'],
      end: json['end'],
    );
  }
}

class Canteen {
  final String id;
  final String name;
  final String location;
  final String description;
  final String? imageUrl;
  final OpenHours? openHours; // <-- add this

  Canteen({
    required this.id,
    required this.name,
    required this.location,
    required this.description,
    this.imageUrl,
    this.openHours,
  });

  factory Canteen.fromJson(Map<String, dynamic> json) {
    return Canteen(
      id: json['_id'],
      name: json['name'],
      location: json['location'],
      description: json['description'] ?? '',
      imageUrl: json['image_url'],
      openHours: json['open_hours'] != null
          ? OpenHours.fromJson(json['open_hours'])
          : null,
    );
  }
}
