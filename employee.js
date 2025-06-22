// Employee Payroll Application
import readline from "readline";

class Employee {
  // UC7 - Refactor the code to write class variables and methods
  static MAX_WORKING_DAYS = 20;
  static MAX_WORKING_HOURS = 100;
  static WAGE_PER_HOUR = 20;

  // Constructor to initialize employee details
  constructor(empId, empName) {
    this.empId = empId;
    this.empName = empName;
    this.attendance = "";
    this.dailyWage = 0;
    this.workingHours = 0;
    this.totalWage = 0;
    this.totalWorkingHours = 0;
    this.totalWorkingDays = 0;
  }

  static displayMessage() {
    console.log("Welcome to Employee Payroll Application\n");
  }

  // UC1 - Mark attendance randomly
  markAttendance() {
    let attendanceType = Math.floor(Math.random() * 3);
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

  // UC2 - Calculate daily wage
  calculateWage() {
    this.dailyWage = Employee.WAGE_PER_HOUR * this.workingHours;
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
    console.log(`----------------------------------------------`);
    console.log(`\nMonthly Summary for ${this.empName} (ID: ${this.empId}):`);
    console.log(`Total Working Hours: ${this.totalWorkingHours}`);
    console.log(`Total Working Days: ${this.totalWorkingDays}`);
    console.log(`Total Wage for the Month: ₹${this.totalWage}`);
    console.log();
  }

  // UC7 - Static method to compute wages for all employees
  static computeWagesForAll(employeeList) {
    employeeList.forEach((employee) => {
      console.log(`----------------------------------------------`);
      console.log(
        `Daily details of Employee: ${employee.empName} with ID: ${employee.empId}`
      );
      console.log(`----------------------------------------------`);

      let day = 1;

      while (
        day <= Employee.MAX_WORKING_DAYS &&
        employee.totalWorkingHours < Employee.MAX_WORKING_HOURS
      ) {
        employee.markAttendance();
        employee.calculateWage();
        employee.displayDetails(day);
        day++;
      }

      employee.displayMonthlySummary();
    });
  }
}

// Input handling
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let empDetails = [];
let numberOfEmployees = 0;
let count = 0;

function askEmployeeCount() {
  rl.question("How many employees you want to add?: ", (answer) => {
    numberOfEmployees = parseInt(answer);
    askEmployeeDetails();
  });
}

function askEmployeeDetails() {
  if (count < numberOfEmployees) {
    rl.question(`Enter Employee ID for Employee ${count + 1}: `, (empId) => {
      rl.question(
        `Enter Employee Name for Employee ${count + 1}: `,
        (empName) => {
          empDetails.push(new Employee(parseInt(empId), empName));
          count++;
          askEmployeeDetails();
        }
      );
    });
  } else {
    rl.close();
    startApplication();
  }
}

function startApplication() {
  Employee.computeWagesForAll(empDetails);
}

// Start the program
Employee.displayMessage();
askEmployeeCount();
