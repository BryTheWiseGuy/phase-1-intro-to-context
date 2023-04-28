// Your code here
function createEmployeeRecord(array) {
    let employeeObj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeObj;
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeInEvent = {
      type: 'TimeIn',
      hour: parseInt(hour),
      date: date,
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeOutEvent = {
      type: 'TimeOut',
      hour: parseInt(hour),
      date: date,
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(obj => obj.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(obj => obj.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const payPerHour = employeeRecord.payPerHour
    return hoursWorkedOnDate(employeeRecord, date) * payPerHour;
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((acc, date) => acc + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
}

function calculatePayroll(array) {
    let payrollSum = 0
    array.forEach(employee => {
        payrollSum += allWagesFor(employee);
    })
    return payrollSum;
}