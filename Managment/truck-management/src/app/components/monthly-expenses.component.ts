import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TruckService } from '../services/truck.service';
import { MonthlyExpense } from '../models/truck.model';

@Component({
  selector: 'app-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrls: ['./monthly-expenses.component.css']
})
export class MonthlyExpensesComponent implements OnInit {
  monthlyExpenseForm: FormGroup;
  isSubmitted = false;
  successMessage = '';
  monthlyExpenses: MonthlyExpense[] = [];
  truckNumbers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private truckService: TruckService
  ) {
    this.monthlyExpenseForm = this.fb.group({
      truckNumber: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(2020), Validators.max(2030)]],
      driverSalary: ['', [Validators.required, Validators.min(0)]],
      maintenanceCost: ['', [Validators.required, Validators.min(0)]],
      otherMonthlyExpenses: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadMonthlyExpenses();
    this.loadTruckNumbers();
    
    // Set current month and year as default
    const now = new Date();
    this.monthlyExpenseForm.patchValue({
      month: now.getMonth() + 1,
      year: now.getFullYear()
    });
  }

  loadMonthlyExpenses(): void {
    this.monthlyExpenses = this.truckService.getMonthlyExpenses();
  }

  loadTruckNumbers(): void {
    this.truckNumbers = this.truckService.getAllTruckNumbers();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    
    if (this.monthlyExpenseForm.valid) {
      const formData = this.monthlyExpenseForm.value;
      
      const monthlyExpenseData = {
        truckNumber: formData.truckNumber,
        month: formData.month.toString(),
        year: Number(formData.year),
        driverSalary: Number(formData.driverSalary),
        maintenanceCost: Number(formData.maintenanceCost),
        otherMonthlyExpenses: Number(formData.otherMonthlyExpenses)
      };

      this.truckService.addMonthlyExpense(monthlyExpenseData);
      
      this.successMessage = 'Monthly expense added successfully!';
      this.monthlyExpenseForm.reset();
      
      // Reset to current month and year
      const now = new Date();
      this.monthlyExpenseForm.patchValue({
        month: now.getMonth() + 1,
        year: now.getFullYear()
      });
      
      this.isSubmitted = false;
      this.loadMonthlyExpenses();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }

  get f() {
    return this.monthlyExpenseForm.controls;
  }

  calculateTotalMonthlyExpense(): number {
    const formData = this.monthlyExpenseForm.value;
    const driverSalary = Number(formData.driverSalary) || 0;
    const maintenanceCost = Number(formData.maintenanceCost) || 0;
    const otherMonthlyExpenses = Number(formData.otherMonthlyExpenses) || 0;
    
    return driverSalary + maintenanceCost + otherMonthlyExpenses;
  }

  deleteMonthlyExpense(id: string): void {
    if (confirm('Are you sure you want to delete this monthly expense?')) {
      this.truckService.deleteMonthlyExpense(id);
      this.loadMonthlyExpenses();
    }
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getMonthName(month: string): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[parseInt(month) - 1] || month;
  }
}
