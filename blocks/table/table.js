export default async function decorate(block) {
    try {
      // Fetch data from the given URL
      const response = await fetch("http://localhost:3000/states.json");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
      const data = jsonData.data;
      const columns = jsonData.columns; // Headers from the JSON
  
      console.log("Fetched Data:", data); // Debugging log
  
      // Create a table
      const table = document.createElement("table");
      table.classList.add("data-table");
  
      // Create the table header
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
  
      columns.forEach(column => {
        const th = document.createElement("th");
        th.textContent = column.charAt(0).toUpperCase() + column.slice(1); // Capitalize header
        headerRow.appendChild(th);
      });
  
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      // Create and populate the table body
      const tbody = document.createElement("tbody");
      data.forEach(item => {
        const row = document.createElement("tr");
        columns.forEach(column => {
          const td = document.createElement("td");
          td.textContent = item[column] || ""; // Populate cell with data or empty if missing
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
  
      table.appendChild(tbody);
      block.appendChild(table); // Append the table to the custom block
    } catch (error) {
      console.error("Error fetching data:", error);
      block.textContent = "Failed to load data.";
    }
  }
  