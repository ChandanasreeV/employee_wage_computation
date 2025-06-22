// Employee Payroll Application
class Employee {
  // Constructor to initialize employee details
  constructor(empId, empName) {
    this.empId = empId;
    this.empName = empName;
    this.attendance = "";
    this.dailyWage = 0;
    this.workingHours = 0; // UC3 - Adding working hours property

    // UC4 - Monthly Wage Tracking
    this.totalWage = 0; // Total wage for the month
    this.totalWorkingHours = 0; // Total working hours for the month
  }

  displayMessage() {
    console.log("Welcome to Employee Payroll Application");
  }

  // UC1 - Method to mark attendance randomly
  markAttendance() {
    let attendanceType = Math.floor(Math.random() * 3); // 0: Absent, 1: Part-Time, 2: Full-Time
    switch (attendanceType) {
      case 0:
        this.attendance = "Absent";
        this.workingHours = 0;
        break;
      case 1:
        this.attendance = "Part-Time";
        this.workingHours = 4;
        break;
      case 2:
        this.attendance = "Full-Time";
        this.workingHours = 8;
        break;
      default:
        this.attendance = "Unknown";
        this.workingHours = 0;
    }
  }

  // UC2 - Calculate daily wage based on attendance
  calculateWage() {
    const WAGE_PER_HOUR = 20;
    this.dailyWage = WAGE_PER_HOUR * this.workingHours;
    this.totalWage += this.dailyWage; // UC4 - Update total wage
    this.totalWorkingHours += this.workingHours; // UC4 - Update total hours
  }

  // UC3 - Display daily details
  displayDetails(day) {
    console.log(
      `Day ${day} - Employee ID: ${this.empId}, Name: ${this.empName}, Attendance: ${this.attendance}, Working Hours: ${this.workingHours}, Daily Wage: ₹${this.dailyWage}`
    );
  }

  // UC4 - Display monthly summary
  displayMonthlySummary() {
    console.log(`\nMonthly Summary for ${this.empName} (ID: ${this.empId}):`);
    console.log(`Total Working Hours: ${this.totalWorkingHours}`);
    console.log(`Total Wage for the Month: ₹${this.totalWage}`);
    console.log(`----------------------------------------------`);
  }
}

// Call the welcome message
const employeeApp = new Employee();
employeeApp.displayMessage();

// Create employee objects
let empDetails = [
  new Employee(11, "Pooja"),
  new Employee(41, "Deepika"),
  new Employee(12, "Lakshmi"),
];

const Working_Days = 20; // Assuming 20 working days in a month

// For each employee, simulate 20 days of work and show their wage details
empDetails.forEach((employee) => {
  console.log(`\nDaily Details for Employee: ${employee.empName}`);
  for (let day = 1; day <= Working_Days; day++) {
    employee.markAttendance();      // UC1
    employee.calculateWage();       // UC2
    employee.displayDetails(day);   // UC3
  }
  employee.displayMonthlySummary(); // UC4
});
