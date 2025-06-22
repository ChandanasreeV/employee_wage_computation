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
    this.totalWorkingDays = 0; // Total working days for the month
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

  // UC2 - Calculate daily wage and update totals
  calculateWage() {
    const WAGE_PER_HOUR = 20;
    this.dailyWage = WAGE_PER_HOUR * this.workingHours;
    this.totalWage += this.dailyWage;
    this.totalWorkingHours += this.workingHours;

    if (this.attendance !== "Absent") {
      this.totalWorkingDays++;
    }
  }

  // UC3 - Display daily details
  displayDetails(day) {
    console.log(
      `Day ${day} - Attendance: ${this.attendance}, Working Hours: ${this.workingHours}, Daily Wage: ₹${this.dailyWage}`
    );
  }

  // UC4 - Display monthly summary
  displayMonthlySummary() {
    console.log(`\nMonthly Summary for ${this.empName} (ID: ${this.empId}):`);
    console.log(`Total Working Days: ${this.totalWorkingDays}`);
    console.log(`Total Working Hours: ${this.totalWorkingHours}`);
    console.log(`Total Wage for the Month: ₹${this.totalWage}`);
    console.log(`----------------------------------------------`);
  }
}

// Call the welcome message once
const employeeApp = new Employee(0, "System");
employeeApp.displayMessage();

// Create employee objects
let empDetails = [
  new Employee(11, "Chandana"),
  new Employee(41, "Sree"),
  new Employee(12, "Sunaina"),
];

const MAX_WORKING_DAYS = 20;
const MAX_WORKING_HOURS = 100;

// Simulate payroll for each employee
empDetails.forEach((employee) => {
  console.log(`\nDaily details of Employee: ${employee.empName} (ID: ${employee.empId})`);
  let day = 1;

  while (day <= MAX_WORKING_DAYS && employee.totalWorkingHours < MAX_WORKING_HOURS) {
    employee.markAttendance();     // UC1
    employee.calculateWage();      // UC2 + UC4
    employee.displayDetails(day);  // UC3
    day++;
  }

  employee.displayMonthlySummary(); // UC4
});
