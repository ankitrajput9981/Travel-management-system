# Truck Management System

A comprehensive Angular application for managing truck trips, tracking costs, and calculating profits. This system helps you monitor your truck fleet's performance and profitability.

## Features

### 📝 Add Trip Data
- **Truck Information**: Track truck number and driver details
- **Trip Details**: Record date and kilometers driven
- **Cost Tracking**: 
  - Fuel costs
  - Driver salary
  - Maintenance costs
  - Other expenses
- **Revenue Tracking**: Record total revenue for each trip
- **Automatic Calculations**: Real-time profit/loss calculation

### 📊 View & Search Data
- **Truck Selection**: Filter data by specific truck number
- **Search Functionality**: Search by truck number, driver name, or date
- **Truck Summary**: Get comprehensive statistics for each truck:
  - Total trips
  - Total kilometers
  - Total revenue and costs
  - Total profit/loss
  - Average profit per kilometer
- **Data Management**: Delete individual records
- **Overall Statistics**: View aggregated data across all trucks

### 💾 Data Storage
- **Local Storage**: All data is stored locally in your browser
- **No Server Required**: Works completely offline
- **Data Persistence**: Data remains available between sessions

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd truck-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:4200
   ```

### Building for Production

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Usage Guide

### Adding Trip Data

1. Click on the "📝 Add Trip Data" tab
2. Fill in all required fields:
   - **Truck Number**: Unique identifier for your truck (e.g., TR-001)
   - **Driver Name**: Name of the driver
   - **Trip Date**: Date of the trip
   - **Kilometers**: Distance covered
   - **Costs**: Fuel, driver salary, maintenance, and other expenses
   - **Revenue**: Total income from the trip
3. Review the calculated profit/loss in the summary section
4. Click "Add Truck Data" to save

### Viewing and Searching Data

1. Click on the "📊 View & Search Data" tab
2. Use the filters:
   - **Select Truck**: Choose a specific truck to view its data
   - **Search**: Type to search across truck numbers, driver names, or dates
3. View detailed statistics and summaries
4. Delete records using the delete button (🗑️) if needed

### Understanding the Data

- **Total Cost**: Sum of all expenses (fuel + salary + maintenance + other)
- **Profit/Loss**: Revenue minus total cost
- **Average Profit per KM**: Total profit divided by total kilometers
- **Truck Summary**: Aggregated data for a specific truck across all trips

## Data Model

Each truck trip record includes:
- Truck number and driver information
- Trip date and kilometers
- Cost breakdown (fuel, salary, maintenance, other)
- Revenue and calculated profit/loss
- Unique ID for data management

## Technical Details

- **Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: CSS with modern design principles
- **Storage**: Browser localStorage
- **Responsive**: Mobile-friendly design

## Browser Compatibility

This application works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- localStorage API

## Data Backup

Since data is stored locally, consider:
- Exporting data periodically
- Using browser sync features
- Taking screenshots of important summaries

## Support

For issues or questions:
1. Check the browser console for any errors
2. Ensure all required fields are filled
3. Verify that numbers are entered correctly
4. Clear browser cache if experiencing issues

## License

This project is created for internal truck management purposes.
