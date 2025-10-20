import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Truck, TruckSummary, MonthlyExpense, BranchSummary } from '../models/truck.model';

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  private trucksSubject = new BehaviorSubject<Truck[]>([]);
  private monthlyExpensesSubject = new BehaviorSubject<MonthlyExpense[]>([]);
  public trucks$ = this.trucksSubject.asObservable();
  public monthlyExpenses$ = this.monthlyExpensesSubject.asObservable();
  private readonly STORAGE_KEY = 'truck-management-data';
  private readonly MONTHLY_EXPENSES_KEY = 'truck-monthly-expenses';

  constructor() {
    this.loadTrucksFromStorage();
    this.loadMonthlyExpensesFromStorage();
  }

  private loadTrucksFromStorage(): void {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      try {
        const trucks = JSON.parse(storedData);
        this.trucksSubject.next(trucks);
      } catch (error) {
        console.error('Error loading trucks from storage:', error);
        this.trucksSubject.next([]);
      }
    }
  }

  private saveTrucksToStorage(trucks: Truck[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trucks));
    } catch (error) {
      console.error('Error saving trucks to storage:', error);
    }
  }

  private loadMonthlyExpensesFromStorage(): void {
    const storedData = localStorage.getItem(this.MONTHLY_EXPENSES_KEY);
    if (storedData) {
      try {
        const monthlyExpenses = JSON.parse(storedData);
        this.monthlyExpensesSubject.next(monthlyExpenses);
      } catch (error) {
        console.error('Error loading monthly expenses from storage:', error);
        this.monthlyExpensesSubject.next([]);
      }
    }
  }

  private saveMonthlyExpensesToStorage(monthlyExpenses: MonthlyExpense[]): void {
    try {
      localStorage.setItem(this.MONTHLY_EXPENSES_KEY, JSON.stringify(monthlyExpenses));
    } catch (error) {
      console.error('Error saving monthly expenses to storage:', error);
    }
  }

  addTruck(truck: Omit<Truck, 'id' | 'totalCost' | 'profit'>): void {
    const newTruck: Truck = {
      ...truck,
      id: this.generateId(),
      totalCost: truck.fuelCost + truck.otherExpenses,
      profit: truck.totalRevenue - (truck.fuelCost + truck.otherExpenses)
    };

    const currentTrucks = this.trucksSubject.value;
    const updatedTrucks = [...currentTrucks, newTruck];
    this.trucksSubject.next(updatedTrucks);
    this.saveTrucksToStorage(updatedTrucks);
  }

  getTrucks(): Truck[] {
    return this.trucksSubject.value;
  }

  getTrucksByTruckNumber(truckNumber: string): Truck[] {
    return this.trucksSubject.value.filter(truck => 
      truck.truckNumber.toLowerCase().includes(truckNumber.toLowerCase())
    );
  }

  getTrucksByDateRange(startDate: string, endDate: string): Truck[] {
    return this.trucksSubject.value.filter(truck => 
      truck.date >= startDate && truck.date <= endDate
    );
  }

  getTruckSummary(truckNumber: string): TruckSummary | null {
    const trucks = this.getTrucksByTruckNumber(truckNumber);
    if (trucks.length === 0) return null;

    const totalTrips = trucks.length;
    const totalKilometers = trucks.reduce((sum, truck) => sum + truck.kilometers, 0);
    const totalRevenue = trucks.reduce((sum, truck) => sum + truck.totalRevenue, 0);
    const totalCost = trucks.reduce((sum, truck) => sum + truck.totalCost, 0);
    const totalProfit = trucks.reduce((sum, truck) => sum + truck.profit, 0);
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
  }

  getAllTruckNumbers(): string[] {
    const trucks = this.getTrucks();
    const uniqueNumbers = [...new Set(trucks.map(truck => truck.truckNumber))];
    return uniqueNumbers.sort();
  }

  getAllBranches(): string[] {
    const trucks = this.getTrucks();
    const uniqueBranches = [...new Set(trucks.map(truck => truck.branch))];
    return uniqueBranches.sort();
  }

  getTrucksByBranch(branch: string): Truck[] {
    return this.trucksSubject.value.filter(truck => 
      truck.branch.toLowerCase().includes(branch.toLowerCase())
    );
  }

  getBranchSummary(branch: string): BranchSummary | null {
    const trucks = this.getTrucksByBranch(branch);
    if (trucks.length === 0) return null;

    const totalTrucks = [...new Set(trucks.map(truck => truck.truckNumber))].length;
    const totalTrips = trucks.length;
    const totalKilometers = trucks.reduce((sum, truck) => sum + truck.kilometers, 0);
    const totalRevenue = trucks.reduce((sum, truck) => sum + truck.totalRevenue, 0);
    const totalCost = trucks.reduce((sum, truck) => sum + truck.totalCost, 0);
    const totalProfit = trucks.reduce((sum, truck) => sum + truck.profit, 0);
    const averageProfitPerKm = totalKilometers > 0 ? totalProfit / totalKilometers : 0;

    return {
      branch,
      totalTrucks,
      totalTrips,
      totalKilometers,
      totalRevenue,
      totalCost,
      totalProfit,
      averageProfitPerKm
    };
  }

  deleteTruck(id: string): void {
    const currentTrucks = this.trucksSubject.value;
    const updatedTrucks = currentTrucks.filter(truck => truck.id !== id);
    this.trucksSubject.next(updatedTrucks);
    this.saveTrucksToStorage(updatedTrucks);
  }

  addMonthlyExpense(monthlyExpense: Omit<MonthlyExpense, 'id' | 'totalMonthlyExpense'>): void {
    const newMonthlyExpense: MonthlyExpense = {
      ...monthlyExpense,
      id: this.generateId(),
      totalMonthlyExpense: monthlyExpense.driverSalary + monthlyExpense.maintenanceCost + monthlyExpense.otherMonthlyExpenses
    };

    const currentMonthlyExpenses = this.monthlyExpensesSubject.value;
    const updatedMonthlyExpenses = [...currentMonthlyExpenses, newMonthlyExpense];
    this.monthlyExpensesSubject.next(updatedMonthlyExpenses);
    this.saveMonthlyExpensesToStorage(updatedMonthlyExpenses);
  }

  getMonthlyExpenses(): MonthlyExpense[] {
    return this.monthlyExpensesSubject.value;
  }

  getMonthlyExpensesByTruck(truckNumber: string): MonthlyExpense[] {
    return this.monthlyExpensesSubject.value.filter(expense => 
      expense.truckNumber === truckNumber
    );
  }

  deleteMonthlyExpense(id: string): void {
    const currentMonthlyExpenses = this.monthlyExpensesSubject.value;
    const updatedMonthlyExpenses = currentMonthlyExpenses.filter(expense => expense.id !== id);
    this.monthlyExpensesSubject.next(updatedMonthlyExpenses);
    this.saveMonthlyExpensesToStorage(updatedMonthlyExpenses);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
