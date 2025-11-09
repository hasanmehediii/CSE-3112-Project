import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';

class ExpenseReportScreen extends StatelessWidget {
  const ExpenseReportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Example data
    final Map<String, double> dailyExpenses = {
      "Math": 200,
      "Curzon": 350,
      "Tong": 120,
      "Hall": 300,
    };

    return Scaffold(
      appBar: AppBar(
        title: const Text("Expense Report"),
        backgroundColor: Colors.deepOrange,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const Text(
              "Canteen-wise Spending",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: PieChart(
                PieChartData(
                  sections: dailyExpenses.entries.map((entry) {
                    final color = entry.key == "Math"
                        ? Colors.orange.shade400
                        : entry.key == "Curzon"
                        ? Colors.orange.shade600
                        : entry.key == "Tong"
                        ? Colors.orange.shade200
                        : Colors.orange.shade800;
                    return PieChartSectionData(
                      value: entry.value,
                      color: color,
                      title: "${entry.key}\nTk ${entry.value.toInt()}",
                      radius: 70,
                      titleStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                    );
                  }).toList(),
                  sectionsSpace: 2,
                  centerSpaceRadius: 40,
                ),
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              "Daily Spending Trend",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 200,
              child: LineChart(
                LineChartData(
                  gridData: FlGridData(show: true, drawVerticalLine: false, horizontalInterval: 100),
                  titlesData: FlTitlesData(
                    leftTitles: AxisTitles(
                      sideTitles: SideTitles(showTitles: true, interval: 100),
                    ),
                    bottomTitles: AxisTitles(
                      sideTitles: SideTitles(showTitles: true, getTitlesWidget: (value, meta) {
                        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                        return Text(days[value.toInt() % 7]);
                      }),
                    ),
                  ),
                  borderData: FlBorderData(show: false),
                  lineBarsData: [
                    LineChartBarData(
                      spots: const [
                        FlSpot(0, 150),
                        FlSpot(1, 200),
                        FlSpot(2, 120),
                        FlSpot(3, 300),
                        FlSpot(4, 180),
                        FlSpot(5, 250),
                        FlSpot(6, 100),
                      ],
                      isCurved: true,
                      color: Colors.deepOrange,
                      barWidth: 4,
                      dotData: FlDotData(show: true),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
