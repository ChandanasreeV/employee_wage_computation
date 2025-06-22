// Employee Payroll Application
class Employee {
  // Constructor to initialize employee details
  constructor(empId, empName) {
    this.empId = empId;
    this.empName = empName;
    this.attendance = "";
    this.dailyWage = 0;
    this.workingHours = 0; // UC3 - Adding working hours property
  }

  displayMessage() {
    console.log("Welcome to Employee Payroll Application");
  }

  // Method to mark attendance randomly (UC3)
  markAttendance() {
    let attendanceType = Math.floor(Math.random() * 3); // 0: Absent, 1: Present, 2: Half Day
    if (attendanceType === 0) {
      this.attendance = "Absent";
      this.workingHours = 0;
    } else if (attendanceType === 1) {
      this.attendance = "Present";
      this.workingHours = 8;
    } else {
      this.attendance = "Half Day";
      this.workingHours = 4;
    }
  }

  // UC2 - Calculate daily wage based on working hours
  calculateWage() {
    const WAGE_PER_HOUR = 20;
    this.dailyWage = WAGE_PER_HOUR * this.workingHours;
  }

  // Display employee details (UC3)
  displayDetails() {
    console.log(
      `Employee ID: ${this.empId}, Name: ${this.empName}, Attendance: ${this.attendance}, Working Hours: ${this.workingHours}, Daily Wage: ₹${this.dailyWage}`
    );
  }
}

// Call the welcome message
const employeeApp = new Employee();
employeeApp.displayMessage();

// Create employee objects
let empDetails = [
  new Employee(11, "Chandana"),
  new Employee(41, "Sree"),
  new Employee(12, "Sunaina"),
];

// Mark attendance, calculate wage, and display details
empDetails.forEach((employee) => {
  employee.markAttendance();
  employee.calculateWage();
  employee.displayDetails();
});
