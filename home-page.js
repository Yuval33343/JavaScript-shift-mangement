// Retrieve the current user from local storage
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
// Display the user's first name in the greeting
document.getElementById('userName').textContent = currentUser.firstName || 'Username';
// Initialize shiftsData with the shifts array of the current user
let shiftsData = currentUser.shifts || [];


function showShifts() {
    // Initialize shiftsData with the shifts array of the current user
    currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    shiftsData = currentUser.shifts || [];

    const content = document.getElementById('content');
    content.innerHTML = ''; // Clear previous content

    // Add filter options (branch and role) here if needed
    showFilterOptions();

    // Create and populate the table
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    const columns = ['Date', 'Start Time', 'End Time', 'Hourly Wage', 'Role', 'Branch', 'Total Salary'];
    columns.forEach(column => {
        const th = document.createElement('th');
        th.textContent = column;
        headerRow.appendChild(th);
    });

    const totalSalaryRow = table.insertRow();
    totalSalaryRow.classList.add('total-salary');
    const totalSalaryCell = totalSalaryRow.insertCell();
    totalSalaryCell.colSpan = columns.length;
    totalSalaryCell.textContent = 'Total Salary: $0'; // Initialize with 0, you can update it later

    shiftsData.forEach(shift => {
        const row = table.insertRow();
        columns.forEach(colName => {
            const cell = row.insertCell();
            // Adjust property names to match the columns
            const propName = colName.toLowerCase().replace(' ', '');
            cell.textContent = shift[propName] || '';
        });
    });

    const addShiftBtn = document.createElement('button');
    addShiftBtn.classList.add('add-shift-btn');
    addShiftBtn.textContent = 'Add Shift';
    addShiftBtn.addEventListener('click', addShift);

    content.appendChild(table);
    content.appendChild(totalSalaryRow);
    content.appendChild(addShiftBtn);

    // Display the shifts table
    displayShiftsTable();
}


function showFilterOptions() {
    const content = document.getElementById('content');

    // Check if the filter form already exists
    const existingFilterForm = document.getElementById('filterForm');
    if (existingFilterForm) {
        return; // If it exists, do nothing
    }

    const filterForm = document.createElement('form');
    filterForm.id = 'filterForm'; // Set an ID for easy identification and retrieval

    // Select for Branch
    const branchLabel = document.createElement('label');
    branchLabel.textContent = 'Select Branch: ';
    const branchSelect = document.createElement('select');
    branchSelect.id = 'branchFilter';

    const branches = ['All', 'Petah Tikva', 'Tel Aviv', 'Caesarea', 'Tiberias', 'Eilat'];
    branches.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch;
        option.text = branch;
        branchSelect.appendChild(option);
    });

    branchLabel.appendChild(branchSelect);

    // Select for Role
    const roleLabel = document.createElement('label');
    roleLabel.textContent = ' Select Role: ';
    const roleSelect = document.createElement('select');
    roleSelect.id = 'roleFilter';

    const roles = ['All', 'Restaurant Manager', 'Shift Manager', 'Waiter', 'Barman', 'Chef'];
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role;
        option.text = role;
        roleSelect.appendChild(option);
    });

    roleLabel.appendChild(roleSelect);

    const applyFilterButton = document.createElement('button');
    applyFilterButton.type = 'button';
    applyFilterButton.textContent = 'Apply Filter';
    applyFilterButton.addEventListener('click', applyFilter);

    filterForm.appendChild(branchLabel);
    filterForm.appendChild(roleLabel);
    filterForm.appendChild(applyFilterButton);

    content.appendChild(filterForm);
}


function applyFilter() {
    const selectedBranch = document.getElementById('branchFilter').value;
    const selectedRole = document.getElementById('roleFilter').value;

    const filteredShifts = shiftsData.filter(shift => {
        return (selectedBranch === 'All' || shift.branch === selectedBranch) &&
            (selectedRole === 'All' || shift.role === selectedRole);
    });

    // Update the shifts table with filtered data
    displayShiftsTable(filteredShifts);
}


function addShift() {
  const content = document.getElementById('content');
  content.innerHTML = ''; // Clear previous content

  const form = document.createElement('form');

  // Input for Date
  const dateLabel = document.createElement('label');
  dateLabel.textContent = 'Date: ';
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.required = true;
  dateLabel.appendChild(dateInput);

  // Input for Start Time
  const startTimeLabel = document.createElement('label');
  startTimeLabel.textContent = 'Start Time: ';
  const startTimeInput = document.createElement('input');
  startTimeInput.type = 'time';
  startTimeInput.required = true;
  startTimeLabel.appendChild(startTimeInput);

  // Input for End Time
  const endTimeLabel = document.createElement('label');
  endTimeLabel.textContent = 'End Time: ';
  const endTimeInput = document.createElement('input');
  endTimeInput.type = 'time';
  endTimeInput.required = true;
  endTimeLabel.appendChild(endTimeInput);

  // Input for Hourly Wage
  const hourlyWageLabel = document.createElement('label');
  hourlyWageLabel.textContent = 'Hourly Wage: ';
  const hourlyWageInput = document.createElement('input');
  hourlyWageInput.type = 'number';
  hourlyWageInput.step = '0.01';
  hourlyWageInput.min = '0';
  hourlyWageInput.required = true;
  hourlyWageLabel.appendChild(hourlyWageInput);

  // Select for Role
  const roleLabel = document.createElement('label');
  roleLabel.textContent = 'Role: ';
  const roleSelect = document.createElement('select');
  roleSelect.required = true;

  const roles = ['Restaurant Manager', 'Shift Manager', 'Waiter', 'Barman', 'Chef'];
  roles.forEach(role => {
    const option = document.createElement('option');
    option.value = role;
    option.text = role;
    roleSelect.appendChild(option);
  });

  roleLabel.appendChild(roleSelect);

  // Select for Branch
  const branchLabel = document.createElement('label');
  branchLabel.textContent = 'Branch: ';
  const branchSelect = document.createElement('select');
  branchSelect.required = true;

  const branches = ['Petah Tikva', 'Tel Aviv', 'Caesarea', 'Tiberias', 'Eilat'];
  branches.forEach(branch => {
    const option = document.createElement('option');
    option.value = branch;
    option.text = branch;
    branchSelect.appendChild(option);
  });

  branchLabel.appendChild(branchSelect);

  const addButton = document.createElement('button');
  addButton.type = 'button';
  addButton.textContent = 'Add Shift';
  addButton.addEventListener('click', function () {
    // Validate that all fields are filled
    if (
      dateInput.value &&
      startTimeInput.value &&
      endTimeInput.value &&
      hourlyWageInput.value &&
      roleSelect.value &&
      branchSelect.value
    ) {
      const newShift = {
        date: dateInput.value,
        startTime: startTimeInput.value,
        endTime: endTimeInput.value,
        hourlyWage: parseFloat(hourlyWageInput.value),
        role: roleSelect.value,
        branch: branchSelect.value,
        // Calculate Total Salary based on the entered values
        totalSalary: calculateTotalSalary(
          parseFloat(hourlyWageInput.value),
          startTimeInput.value,
          endTimeInput.value
        ),
      };

      // Update currentUser with the new shift data
      currentUser.shifts.push(newShift);

      // Save the updated currentUser to local storage
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Display the shifts table
      showShifts();
    } else {
      alert('Please fill in all fields before adding a shift.');
    }
  });

  form.appendChild(dateLabel);
  form.appendChild(startTimeLabel);
  form.appendChild(endTimeLabel);
  form.appendChild(hourlyWageLabel);
  form.appendChild(roleLabel);
  form.appendChild(branchLabel);
  form.appendChild(addButton);

  content.appendChild(form);
}


function calculateTotalSalary(hourlyWage, startTime, endTime) {
  // Assuming a simple calculation based on hourly wage and duration
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  let hoursWorked;
  if(start>end){
     hoursWorked = (end - start + 24 * 60 * 60 * 1000) / (1000 * 60 * 60);
  }else{
     hoursWorked = (end - start) / (1000 * 60 * 60);
  }
  
  return hourlyWage * hoursWorked;
}


function displayShiftsTable(filteredShifts) {
  var table = '<table border="1"><tr><th>Date</th><th>Start Time</th><th>End Time</th><th>Hourly Wage</th><th>Role</th><th>Branch</th><th>Total Salary</th><th>Action</th></tr>';
  var totalSalary = 0;
  const shiftsToDisplay = filteredShifts || shiftsData;

  for (var i = 0; i < shiftsToDisplay.length; i++) {
      var shift = shiftsToDisplay[i];
      var total = calculateTotalSalary(shift.hourlyWage, shift.startTime, shift.endTime);
      totalSalary += total;

      table += '<tr>';
      table += '<td>' + shift.date + '</td>';
      table += '<td>' + shift.startTime + '</td>';
      table += '<td>' + shift.endTime + '</td>';
      table += '<td>' + shift.hourlyWage + '</td>';
      table += '<td>' + shift.role + '</td>';
      table += '<td>' + shift.branch + '</td>';
      table += '<td>' + total + '</td>';
      table += '<td><button onclick="deleteShift(' + i + ')">Delete</button></td>'; // Add delete button
      table += '</tr>';
  }

  table += '</table>';
  table += '<p>Total Salary: ' + totalSalary + '</p>';

  document.getElementById('content').innerHTML = table;
}


function deleteShift(index) {
  // Remove the shift at the specified index from the shiftsData array
  shiftsData.splice(index, 1);

  // Display the updated shifts table
  displayShiftsTable();
}


function editProfile() {
  const content = document.getElementById('content');
  content.innerHTML = ''; // Clear previous content

  const form = document.createElement('form');

  // Input for First Name
  const firstNameLabel = document.createElement('label');
  firstNameLabel.textContent = 'First Name: ';
  const firstNameInput = document.createElement('input');
  firstNameInput.type = 'text';
  // Populate the input with the current user's first name
  firstNameInput.value = currentUser.firstName || '';
  firstNameLabel.appendChild(firstNameInput);

  // Input for Last Name
  const lastNameLabel = document.createElement('label');
  lastNameLabel.textContent = 'Last Name: ';
  const lastNameInput = document.createElement('input');
  lastNameInput.type = 'text';
  // Populate the input with the current user's last name
  lastNameInput.value = currentUser.lastName || '';
  lastNameLabel.appendChild(lastNameInput);

  // Input for Email
  const emailLabel = document.createElement('label');
  emailLabel.textContent = 'Email: ';
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  // Populate the input with the current user's email
  emailInput.value = currentUser.email || '';
  emailLabel.appendChild(emailInput);

  const saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.textContent = 'Save Changes';
  saveButton.addEventListener('click', function () {
      // Update currentUser with the modified data
      currentUser.firstName = firstNameInput.value;
      currentUser.lastName = lastNameInput.value;
      currentUser.email = emailInput.value;

      // Save the updated currentUser to local storage
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Update the #userName span
      document.getElementById('userName').textContent = currentUser.firstName || 'Username';

      // Display the shifts table
      showShifts();
  });

  // Append form elements to the form
  form.appendChild(firstNameLabel);
  form.appendChild(lastNameLabel);
  form.appendChild(emailLabel);
  form.appendChild(saveButton);

  // Append the form to the content
  content.appendChild(form);
}
    
  
function logout() {
    alert('Logging out...');
    // Redirect to the specified page
    window.location.href = 'http://127.0.0.1:5500/login-page.html';
}


// Initial load
showShifts();