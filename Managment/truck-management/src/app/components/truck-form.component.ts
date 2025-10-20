import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TruckService } from '../services/truck.service';

@Component({
  selector: 'app-truck-form',
  templateUrl: './truck-form.component.html',
  styleUrls: ['./truck-form.component.css']
})
export class TruckFormComponent implements OnInit {
  truckForm: FormGroup;
  isSubmitted = false;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private truckService: TruckService
  ) {
    this.truckForm = this.fb.group({
      truckNumber: ['', [Validators.required, Validators.minLength(2)]],
      driverName: ['', [Validators.required, Validators.minLength(2)]],
      branch: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(2)]],
      kilometers: ['', [Validators.required, Validators.min(1)]],
      fuelCost: ['', [Validators.required, Validators.min(0)]],
      otherExpenses: ['', [Validators.required, Validators.min(0)]],
      totalRevenue: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    this.truckForm.patchValue({ date: today });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    
    if (this.truckForm.valid) {
      const formData = this.truckForm.value;
      
      // Convert string values to numbers
      const truckData = {
        truckNumber: formData.truckNumber.trim(),
        driverName: formData.driverName.trim(),
        branch: formData.branch.trim(),
        date: formData.date,
        location: formData.location.trim(),
        kilometers: Number(formData.kilometers),
        fuelCost: Number(formData.fuelCost),
        otherExpenses: Number(formData.otherExpenses),
        totalRevenue: Number(formData.totalRevenue)
      };

      this.truckService.addTruck(truckData);
      
      this.successMessage = 'Truck data added successfully!';
      this.truckForm.reset();
      this.truckForm.patchValue({ date: new Date().toISOString().split('T')[0] });
      this.isSubmitted = false;
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }

  get f() {
    return this.truckForm.controls;
  }

  calculateTotalCost(): number {
    const formData = this.truckForm.value;
    const fuelCost = Number(formData.fuelCost) || 0;
    const otherExpenses = Number(formData.otherExpenses) || 0;
    
    return fuelCost + otherExpenses;
  }

  calculateProfit(): number {
    const formData = this.truckForm.value;
    const totalRevenue = Number(formData.totalRevenue) || 0;
    const totalCost = this.calculateTotalCost();
    
    return totalRevenue - totalCost;
  }
}
