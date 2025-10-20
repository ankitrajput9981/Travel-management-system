import { Component, OnInit } from '@angular/core';
import { Truck, TruckSummary, MonthlyExpense } from '../models/truck.model';
import { TruckService } from '../services/truck.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  trucks: Truck[] = [];
  monthlyExpenses: MonthlyExpense[] = [];
  truckSummaries: TruckSummary[] = [];
  overallStats = {
    totalTrucks: 0,
    totalTrips: 0,
    totalKilometers: 0,
    totalRevenue: 0,
    totalCost: 0,
    totalProfit: 0,
    totalMonthlyExpenses: 0
  };

  constructor(private truckService: TruckService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.trucks = this.truckService.getTrucks();
    this.monthlyExpenses = this.truckService.getMonthlyExpenses();
    this.calculateSummaries();
    this.calculateOverallStats();
  }

  calculateSummaries(): void {
    const truckNumbers = [...new Set(this.trucks.map(truck => truck.truckNumber))];
    this.truckSummaries = truckNumbers.map(truckNumber => {
      const truckData = this.trucks.filter(truck => truck.truckNumber === truckNumber);
      const totalTrips = truckData.length;
      const totalKilometers = truckData.reduce((sum, truck) => sum + truck.kilometers, 0);
      const totalRevenue = truckData.reduce((sum, truck) => sum + truck.totalRevenue, 0);
      const totalCost = truckData.reduce((sum, truck) => sum + truck.totalCost, 0);
      const totalProfit = truckData.reduce((sum, truck) => sum + truck.profit, 0);
      const averageProfitPerKm = totalKilometers > 0 ? totalProfit / totalKilometers : 0;

      return {
        truckNumber,
        totalTrips,
        totalKilometers,
        totalRevenue,
        totalCost,
        totalProfit,
        averageProfitPerKm
      };
    });
  }

  calculateOverallStats(): void {
    this.overallStats.totalTrucks = this.truckSummaries.length;
    this.overallStats.totalTrips = this.trucks.length;
    this.overallStats.totalKilometers = this.trucks.reduce((sum, truck) => sum + truck.kilometers, 0);
    this.overallStats.totalRevenue = this.trucks.reduce((sum, truck) => sum + truck.totalRevenue, 0);
    this.overallStats.totalCost = this.trucks.reduce((sum, truck) => sum + truck.totalCost, 0);
    this.overallStats.totalProfit = this.trucks.reduce((sum, truck) => sum + truck.profit, 0);
    this.overallStats.totalMonthlyExpenses = this.monthlyExpenses.reduce((sum, expense) => sum + expense.totalMonthlyExpense, 0);
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getTruckMonthlyExpenses(truckNumber: string): number {
    return this.monthlyExpenses
      .filter(expense => expense.truckNumber === truckNumber)
      .reduce((sum, expense) => sum + expense.totalMonthlyExpense, 0);
  }

  getTruckNetProfit(truckSummary: TruckSummary): number {
    const monthlyExpenses = this.getTruckMonthlyExpenses(truckSummary.truckNumber);
    return truckSummary.totalProfit - monthlyExpenses;
  }

  getOverallNetProfit(): number {
    return this.overallStats.totalProfit - this.overallStats.totalMonthlyExpenses;
  }
}
