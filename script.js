// Load JSON data and populate the table
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('tableBody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item["Name"]}</td>
                <td><a href="${item["Company Website"]}" target="_blank">${item["Company Website"]}</a></td>
                <td>${item["What are the Technologies hiring in India "] || "N/A"}</td>
                <td>${item["What are the technologies hiring in the usa ?"] || "N/A"}</td>
                <td>${item["Do they have office in APAC ?"] ? "Yes" : "No"}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error loading data:', error));

// Function to filter table based on search input
function filterTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('companyTable');
    const tr = table.getElementsByTagName('tr');
    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
        }
    }
}

// Function to sort table
function sortTable(n) {
    const table = document.getElementById('companyTable');
    let switching = true;
    let shouldSwitch, dir = "asc", switchcount = 0;
    while (switching) {
        switching = false;
        const rows = table.rows;
        for (let i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            const x = rows[i].getElementsByTagName('TD')[n];
            const y = rows[i + 1].getElementsByTagName('TD')[n];
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
