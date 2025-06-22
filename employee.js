// Employee Payroll Application
class Employee {
  // Constructor to initialize employee details
  constructor(empId, empName) {
    this.empId = empId;
    this.empName = empName;
    this.attendance = "";
  }

  displayMessage() {
    console.log("Welcome to Employee Payroll Application");
  }

  // Method to mark attendance randomly
  markAttendance() {
    let isPresent = Math.floor(Math.random() * 2);
    this.attendance = isPresent ? "Present" : "Absent";
  }

  // Method to display employee details
  displayDetails() {
    console.log(
      `Employee ID: ${this.empId}, Name: ${this.empName}, Attendance: ${this.attendance}`
    );
  }
}

// Call the welcome message
const employeeApp = new Employee();
employeeApp.displayMessage();

// Create employee objects
let empDetails = [
  new Employee(11, "Chandana"),
  new Employee(41, "sree"),
  new Employee(12, "Sunaina"),
];

// Mark attendance for each employee and display their details
empDetails.forEach((employee) => {
  employee.markAttendance();
  employee.displayDetails();
});