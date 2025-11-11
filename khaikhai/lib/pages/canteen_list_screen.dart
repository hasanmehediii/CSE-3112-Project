import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/canteen_provider.dart';
import 'package:khaikhai/models/canteen_model.dart';

class CanteenListScreen extends StatefulWidget {
  const CanteenListScreen({super.key});

  @override
  State<CanteenListScreen> createState() => _CanteenListScreenState();
}

class _CanteenListScreenState extends State<CanteenListScreen> {
  @override
  void initState() {
    super.initState();
    Provider.of<CanteenProvider>(context, listen: false).fetchCanteens();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Canteens"),
        backgroundColor: Colors.deepOrange,
      ),
      body: Consumer<CanteenProvider>(
        builder: (context, provider, child) {
          if (provider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          if (provider.canteens.isEmpty) {
            return const Center(
              child: Text("No canteens found."),
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.all(12),
            itemCount: provider.canteens.length,
            itemBuilder: (context, index) {
              final canteen = provider.canteens[index];
              return CanteenCard(canteen: canteen);
            },
          );
        },
      ),
    );
  }
}

class CanteenCard extends StatelessWidget {
  final Canteen canteen;

  const CanteenCard({super.key, required this.canteen});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        // TODO: navigate to canteen details page
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.2),
              spreadRadius: 2,
              blurRadius: 6,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Banner Image
            ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
              child: canteen.imageUrl == null
                  ? Image.asset(
                "assets/canteen_placeholder.jpeg",
                height: 140,
                width: double.infinity,
                fit: BoxFit.cover,
              )
                  : Image.network(
                canteen.imageUrl!,
                height: 140,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),

            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    canteen.name,
                    style: const TextStyle(
                        fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(Icons.location_on,
                          size: 18, color: Colors.deepOrange),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          canteen.location,
                          style: TextStyle(fontSize: 14, color: Colors.grey[700]),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
