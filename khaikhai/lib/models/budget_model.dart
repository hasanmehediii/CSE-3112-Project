class Budget {
  final double monthlyBudget;
  final double remainingBudget;
  final double dailyBudget;
  final double overspentAmount;
  final DateTime startDate;
  final DateTime endDate;

  Budget({
    required this.monthlyBudget,
    required this.remainingBudget,
    required this.dailyBudget,
    required this.overspentAmount,
    required this.startDate,
    required this.endDate,
  });

  factory Budget.fromJson(Map<String, dynamic> json) {
    return Budget(
      monthlyBudget: (json['monthly_budget'] as num).toDouble(),
      remainingBudget: (json['remaining_budget'] as num).toDouble(),
      dailyBudget: (json['daily_budget'] as num).toDouble(),
      overspentAmount: (json['overspent_amount'] as num).toDouble(),
      startDate: DateTime.parse(json['budget_start_date']),
      endDate: DateTime.parse(json['budget_end_date']),
    );
  }
}
