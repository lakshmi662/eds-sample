export default async function decorate(block) {
    try {
      const response = await fetch("https://assignment-2--eds-sample--lakshmi662.aem.live/states.json");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data);  // Log the fetched data
  
      // Create the table
      const table = document.createElement("table");
      table.classList.add("state-table");
  
      // Create and append the table header
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
  
      const th1 = document.createElement("th");
      th1.textContent = "State";
      const th2 = document.createElement("th");
      th2.textContent = "Capital";
  
      headerRow.appendChild(th1);
      headerRow.appendChild(th2);
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      // Create and append the table body
      const tbody = document.createElement("tbody");
      data.forEach(state => {
        const row = document.createElement("tr");
  
        const tdState = document.createElement("td");
        tdState.textContent = state.name;
  
        const tdCapital = document.createElement("td");
        tdCapital.textContent = state.capital;
  
        row.appendChild(tdState);
        row.appendChild(tdCapital);
        tbody.appendChild(row);
      });
  
      table.appendChild(tbody);
      block.appendChild(table);  // Append the table to the custom block
    } catch (error) {
      console.error("Error fetching data:", error);
      block.textContent = "Failed to load state data.";
    }
  }
  