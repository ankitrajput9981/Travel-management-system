export interface Truck {
  id: string;
  truckNumber: string;
  driverName: string;
  branch: string;
  date: string;
  location: string;
  kilometers: number;
  fuelCost: number;
  otherExpenses: number;
  totalRevenue: number;
  totalCost: number;
  profit: number;
}

export interface MonthlyExpense {
  id: string;
  truckNumber: string;
  month: string;
  year: number;
  driverSalary: number;
  maintenanceCost: number;
  otherMonthlyExpenses: number;
  totalMonthlyExpense: number;
}

export interface TruckSummary {
  truckNumber: string;
  totalTrips: number;
  totalKilometers: number;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  averageProfitPerKm: number;
}

export interface BranchSummary {
  branch: string;
  totalTrucks: number;
  totalTrips: number;
  totalKilometers: number;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  averageProfitPerKm: number;
}
