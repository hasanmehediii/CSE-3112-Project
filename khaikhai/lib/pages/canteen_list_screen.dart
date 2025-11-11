import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/canteen_provider.dart';
import 'package:khaikhai/models/canteen_model.dart';
import 'canteen_menu_screen.dart';

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
        elevation: 0,
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
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => CanteenMenuScreen(
              canteenId: canteen.id,
              canteenName: canteen.name,
            ),
          ),
        );
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
                height: 160,
                width: double.infinity,
                fit: BoxFit.cover,
              )
                  : Image.network(
                canteen.imageUrl!,
                height: 160,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Name
                  Text(
                    canteen.name,
                    style: const TextStyle(
                        fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 6),

                  // Location
                  Row(
                    children: [
                      const Icon(Icons.location_on,
                          size: 18, color: Colors.deepOrange),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          canteen.location,
                          style:
                          TextStyle(fontSize: 14, color: Colors.grey[700]),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),

                  // Short description
                  if (canteen.description != null)
                    Text(
                      canteen.description!,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style:
                      TextStyle(fontSize: 14, color: Colors.grey[600]),
                    ),
                  const SizedBox(height: 6),

                  // Open hours
                  Row(
                    children: [
                      const Icon(Icons.access_time, size: 16, color: Colors.grey),
                      const SizedBox(width: 4),
                      Text(
                        "Open: ${canteen.openHours?.start ?? '--'} – ${canteen.openHours?.end ?? '--'}",
                        style: TextStyle(fontSize: 13, color: Colors.grey[700]),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),

                  // View Menu Button
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => CanteenMenuScreen(
                              canteenId: canteen.id,
                              canteenName: canteen.name,
                            ),
                          ),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.deepOrange,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                      child: const Text(
                        "View Menu",
                        style: TextStyle(fontSize: 16),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
