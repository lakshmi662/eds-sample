export default async function decorate(block) {
    try {
      const response = await fetch("http://localhost:3000/states.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
      const data = jsonData.data;
      const columns = jsonData.columns;
      let currentPage = 0;
      const resultsPerPage = 20;
      const totalPages = Math.ceil(data.length / resultsPerPage);
  
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
      table.appendChild(tbody);
      block.appendChild(table);
  
      const paginationContainer = document.createElement("div");
      paginationContainer.classList.add("pagination-controls");
      block.appendChild(paginationContainer);
  
      function renderPage() {
        tbody.innerHTML = ""; 
        const start = currentPage * resultsPerPage;
        const end = Math.min(start + resultsPerPage, data.length);
        const pageData = data.slice(start, end);
  
        pageData.forEach(item => {
          const row = document.createElement("tr");
          columns.forEach(column => {
            const td = document.createElement("td");
            td.textContent = item[column] || "";
            row.appendChild(td);
          });
          tbody.appendChild(row);
        });
  
        renderPaginationControls();
      }
  
      function renderPaginationControls() {
        paginationContainer.innerHTML = ""; 
  
        const prevButton = document.createElement("button");
        prevButton.classList.add("prev-button");
        prevButton.textContent = "Previous";
        prevButton.disabled = currentPage === 0;
        prevButton.addEventListener("click", () => {
          currentPage--;
          renderPage();
        });
        paginationContainer.appendChild(prevButton);
  
        const pageIndicator = document.createElement("span");
        pageIndicator.classList.add("page-indicator");
        pageIndicator.textContent = ` Page ${currentPage + 1} of ${totalPages} `;
        paginationContainer.appendChild(pageIndicator);
  
        const nextButton = document.createElement("button");
        nextButton.classList.add("next-button");
        nextButton.textContent = "Next";
        nextButton.disabled = currentPage === totalPages - 1;
        nextButton.addEventListener("click", () => {
          currentPage++;
          renderPage();
        });
        paginationContainer.appendChild(nextButton);
      }
  
      renderPage();
    } catch (error) {
      console.error("Error fetching data:", error);
      block.textContent = "Failed to load data.";
    }
  }
  