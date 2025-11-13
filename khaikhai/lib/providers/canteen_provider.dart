import 'package:flutter/material.dart';
import '../models/canteen_model.dart';
import '../services/api_services.dart';

class CanteenProvider extends ChangeNotifier {
  List<Canteen> _canteens = [];
  bool _isLoading = false;

  List<Canteen> get canteens => _canteens;
  bool get isLoading => _isLoading;

  Future<void> fetchCanteens() async {
    _isLoading = true;
    notifyListeners();

    try {
      _canteens = await ApiService.getAllCanteens();
    } catch (e) {
      print("Error fetching canteens: $e");
    }

    _isLoading = false;
    notifyListeners();
  }
}
