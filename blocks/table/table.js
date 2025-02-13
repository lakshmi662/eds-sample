export default async function decorate(block) {
    try {
      const response = await fetch("http://localhost:3000/states.json");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
      const data = jsonData.data;
      const columns = jsonData.columns;
  
      console.log("Fetched Data:", data); 
  
      const table = document.createElement("table");
      table.classList.add("data-table");
  
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
  
      columns.forEach(column => {
        const th = document.createElement("th");
        th.textContent = column.charAt(0).toUpperCase() + column.slice(1); 
        headerRow.appendChild(th);
      });
  
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      const tbody = document.createElement("tbody");
      data.forEach(item => {
        const row = document.createElement("tr");
        columns.forEach(column => {
          const td = document.createElement("td");
          td.textContent = item[column] || ""; 
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });
  
      table.appendChild(tbody);
      block.appendChild(table); 
    } catch (error) {
      console.error("Error fetching data:", error);
      block.textContent = "Failed to load data.";
    }
  }
  