// This function is triggered when the user clicks the "Search" button
async function filterData() {
    // Retrieve user inputs from the form fields
    const A_beam = document.getElementById('A_beam').value;
    const Z_beam = document.getElementById('Z_beam').value;
    const A_target = document.getElementById('A_target').value;
    const Z_target = document.getElementById('Z_target').value;

    // Fetch the CSV file containing the stopping power data
    const response = await fetch('StoppingPowers.csv');  // Assumes the CSV is in the same directory
    const data = await response.text();  // Convert the CSV file data to text

    // Split the CSV data by new lines and ignore the header
    const rows = data.split('\n').slice(1);  

    // Clear any previous results from the results table
    const resultsTable = document.getElementById('resultsTable');
    resultsTable.innerHTML = '';  // Clears the table before displaying new results

    // Loop through each row of the CSV data
    rows.forEach(row => {
        // Split the current row into its columns based on commas
        const columns = row.split(',');

        // Check if the current row matches the user's input
        if (columns[0] == A_beam && columns[1] == Z_beam && columns[2] == A_target && columns[3] == Z_target) {
            // If the row matches, create a new table row element
            const newRow = document.createElement('tr');
            // Populate the table row with the E_beam, dE/dx, and Uncertainty values
            newRow.innerHTML = `
                <td>${columns[4]}</td>
                <td>${columns[5]}</td>
                <td>${columns[6]}</td>
            `;
            // Add the new row to the results table in the HTML
            resultsTable.appendChild(newRow);
        }
    });
}

