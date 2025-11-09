class UserProfile {
  final String id;
  final String name;
  final String email;
  final String role;
  final String profileImage;
  final String diet;
  final List<String> allergies;
  final DateTime createdAt;

  UserProfile({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    required this.profileImage,
    required this.diet,
    required this.allergies,
    required this.createdAt,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      id: json['_id'],
      name: json['name'],
      email: json['email'],
      role: json['role'],
      profileImage: json['profile_image'],
      diet: json['preferences']?['diet'] ?? '',
      allergies: List<String>.from(json['preferences']?['allergies'] ?? []),
      createdAt: DateTime.parse(json['created_at']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "_id": id,
      "name": name,
      "email": email,
      "role": role,
      "profile_image": profileImage,
      "preferences": {
        "diet": diet,
        "allergies": allergies,
      },
      "created_at": createdAt.toIso8601String(),
    };
  }
}
