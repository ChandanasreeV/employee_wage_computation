// Employee Payroll Application
import readline from "readline";

class Employee {
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
    const attendanceType = Math.floor(Math.random() * 3);
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

  // UC2 + UC8 - Calculate daily wage
  calculateWage(wagePerHour) {
    this.dailyWage = wagePerHour * this.workingHours;
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
  displayMonthlySummary(companyName) {
    console.log(`----------------------------------------------`);
    console.log(`\nMonthly Summary for ${this.empName} (ID: ${this.empId}) at ${companyName} Company:`);
    console.log(`Total Working Hours: ${this.totalWorkingHours}`);
    console.log(`Total Working Days: ${this.totalWorkingDays}`);
    console.log(`Total Wage: ₹${this.totalWage}`);
    console.log();
  }
}

class EmpWageBuilder {
  constructor(companyName, wagePerHour, maxWorkingDays, maxWorkingHours) {
    this.companyName = companyName;
    this.wagePerHour = wagePerHour;
    this.maxWorkingDays = maxWorkingDays;
    this.maxWorkingHours = maxWorkingHours;
    this.employeeeDetailsList = [];
    this.totalCompanyWage = 0;
  }

  addEmployee(empId, empName) {
    const employee = new Employee(empId, empName);
    this.employeeeDetailsList.push(employee);
  }

  computeWagesForCompany() {
    console.log(`\nCalculated wages for company: ${this.companyName}\n`);

    this.employeeeDetailsList.forEach((employee) => {
      console.log(`\n----------------------------------------------`);
      console.log(`Daily details of Employee : ${employee.empName} with ID: ${employee.empId}`);
      console.log(`----------------------------------------------`);

      let day = 1;
      while (
        day <= this.maxWorkingDays &&
        employee.totalWorkingHours < this.maxWorkingHours
      ) {
        employee.markAttendance();
        employee.calculateWage(this.wagePerHour);
        employee.displayDetails(day);
        day++;
      }

      employee.displayMonthlySummary(this.companyName);
      this.totalCompanyWage += employee.totalWage;
    });

    console.log(`Total wage for company ${this.companyName} is: ₹${this.totalCompanyWage}`);
  }
}

// --- User Input via readline ---

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let companyList = [];
let totalCompanies = 0;
let currentCompany = 0;
let currentBuilder = null;
let numberOfEmployees = 0;
let employeeIndex = 0;

function askTotalCompanies() {
  rl.question("How many companies you want to add?: ", (count) => {
    totalCompanies = parseInt(count);
    askCompanyDetails();
  });
}

function askCompanyDetails() {
  if (currentCompany < totalCompanies) {
    console.log(`\n--- Entering details of company ${currentCompany + 1} ---\n`);
    rl.question("Enter Company Name: ", (name) => {
      rl.question("Enter wage per hour: ", (wage) => {
        rl.question("Enter Max Working Days: ", (days) => {
          rl.question("Enter Max Working Hours: ", (hours) => {
            currentBuilder = new EmpWageBuilder(
              name,
              parseInt(wage),
              parseInt(days),
              parseInt(hours)
            );
            askEmployeeCount();
          });
        });
      });
    });
  } else {
    rl.close();
    startApplication();
  }
}

function askEmployeeCount() {
  rl.question("How many employees you want to add?: ", (count) => {
    numberOfEmployees = parseInt(count);
    employeeIndex = 0;
    askEmployeeDetails();
  });
}

function askEmployeeDetails() {
  if (employeeIndex < numberOfEmployees) {
    rl.question(`Enter Employee ID for Employee ${employeeIndex + 1}: `, (empId) => {
      rl.question(`Enter Employee Name for Employee ${employeeIndex + 1}: `, (empName) => {
        currentBuilder.addEmployee(parseInt(empId), empName);
        employeeIndex++;
        askEmployeeDetails();
      });
    });
  } else {
    companyList.push(currentBuilder);
    currentCompany++;
    askCompanyDetails();
  }
}

function startApplication() {
  Employee.displayMessage();
  companyList.forEach((builder) => builder.computeWagesForCompany());
}

// Entry point
Employee.displayMessage();
askTotalCompanies();
