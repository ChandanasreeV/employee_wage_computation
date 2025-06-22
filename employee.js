// Employee Payroll Application
class Employee {
  // Constructor to initialize employee details
  constructor(empId, empName) {
    this.empId = empId;
    this.empName = empName;
    this.attendance = "";
    this.dailyWage = 0;
  }

  displayMessage() {
    console.log("Welcome to Employee Payroll Application");
  }

  // Method to mark attendance randomly
  markAttendance() {
    let isPresent = Math.floor(Math.random() * 2);
    this.attendance = isPresent ? "Present" : "Absent";
  }

  // UC2 - For calculating daily wage based on attendance
  calculateWage() {
    const WAGE_PER_HOUR = 20;
    const WORKING_HOURS = 8;
    const dailyWage = WAGE_PER_HOUR * WORKING_HOURS;
    this.dailyWage = this.attendance === "Present" ? dailyWage : 0;
  }

  // Method to display employee details
  displayDetails() {
    console.log(
      `Employee ID: ${this.empId}, Name: ${this.empName}, Attendance: ${this.attendance}, Daily Wage: ₹${this.dailyWage}`
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
  employee.calculateWage(); // UC2
  employee.displayDetails();
});
