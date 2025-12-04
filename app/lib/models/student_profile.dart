// lib/models/student_profile.dart
class StudentProfile {
  final int id;
  final String name;
  final String email;
  final String? registrationNo;
  final String? phone;
  final String? dept;
  final String? address;
  final String? imageUrl;

  StudentProfile({
    required this.id,
    required this.name,
    required this.email,
    this.registrationNo,
    this.phone,
    this.dept,
    this.address,
    this.imageUrl,
  });

  factory StudentProfile.fromJson(Map<String, dynamic> json) {
    return StudentProfile(
      id: json['id'] as int,
      name: json['name'] as String,
      email: json['email'] as String,
      registrationNo: json['registration_no'] as String?,
      phone: json['phone'] as String?,
      dept: json['dept'] as String?,
      address: json['address'] as String?,
      imageUrl: json['image_url'] as String?,
    );
  }
}
