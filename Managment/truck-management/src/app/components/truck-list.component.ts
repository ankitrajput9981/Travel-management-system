import { Component, OnInit } from '@angular/core';
import { Truck, TruckSummary } from '../models/truck.model';
import { TruckService } from '../services/truck.service';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit {
  trucks: Truck[] = [];
  filteredTrucks: Truck[] = [];
  truckNumbers: string[] = [];
  selectedTruckNumber = '';
  searchTerm = '';
  showSummary = false;
  truckSummary: TruckSummary | null = null;

  constructor(private truckService: TruckService) {}

  ngOnInit(): void {
    this.loadTrucks();
    this.loadTruckNumbers();
  }

  loadTrucks(): void {
    this.trucks = this.truckService.getTrucks();
    this.filteredTrucks = [...this.trucks];
  }

  loadTruckNumbers(): void {
    this.truckNumbers = this.truckService.getAllTruckNumbers();
  }

  onTruckNumberChange(): void {
    if (this.selectedTruckNumber) {
      this.filteredTrucks = this.truckService.getTrucksByTruckNumber(this.selectedTruckNumber);
      this.truckSummary = this.truckService.getTruckSummary(this.selectedTruckNumber);
      this.showSummary = true;
    } else {
      this.filteredTrucks = [...this.trucks];
      this.showSummary = false;
      this.truckSummary = null;
    }
  }

  onSearchChange(): void {
    if (this.searchTerm.trim()) {
      this.filteredTrucks = this.trucks.filter(truck =>
        truck.truckNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        truck.driverName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        truck.date.includes(this.searchTerm)
      );
    } else {
      this.filteredTrucks = [...this.trucks];
    }
  }

  clearFilters(): void {
    this.selectedTruckNumber = '';
    this.searchTerm = '';
    this.filteredTrucks = [...this.trucks];
    this.showSummary = false;
    this.truckSummary = null;
  }

  deleteTruck(id: string): void {
    if (confirm('Are you sure you want to delete this truck data?')) {
      this.truckService.deleteTruck(id);
      this.loadTrucks();
      this.loadTruckNumbers();
      this.onTruckNumberChange(); // Refresh summary if showing
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
