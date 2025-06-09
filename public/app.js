// const gridOptions = {
//     // Row Data: The data to be displayed.
//     rowData: [
//         { make: "Tesla", model: "Model Y", price: 64950, electric: true },
//         { make: "Ford", model: "F-Series", price: 33850, electric: false },
//         { make: "Toyota", model: "Corolla", price: 29600, electric: false },
//     ],
//     // Column Definitions: Defines the columns to be displayed.
//     columnDefs: [
//         { field: "make" },
//         { field: "model" },
//         { field: "price" },
//         { field: "electric" }
//     ]
// };

// // Your Javascript code to create the Data Grid
// const myGridElement = document.querySelector('#myGrid');
// agGrid.createGrid(myGridElement, gridOptions);



document.addEventListener("DOMContentLoaded", () => {
    const gridDiv = document.querySelector("#myGrid");
  
    // Define column definitions
    const columnDefs = [
        {
            headerName: 'Nombre',
            field: 'nombre'
        },
        {
            headerName: 'Categoria',
            field: 'categoria'
        },
        {
            headerName: 'Convenio / inicio',
            field: 'fecha_inicio_convenio'
        },
        {
            headerName: 'Convenio / final',
            field: 'fecha_fin_convenio'
        },
        {
            headerName: 'PDF',
            field: 'pdf_convenio_path'
        },
        {
            headerName: 'Observaciones',
            field: 'observaciones'
        },
    ];
  
    // Function to fetch data and initialize the grid
    async function initializeGrid() {
      let rowData = [];
      try {
        // Replace with your actual backend endpoint
        // Using JSONPlaceholder for a public example
        const response = await fetch("http://localhost:3000/api/fraccionamientos");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        rowData = await response.json();
        console.log("Fetched data:", rowData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, display an error message in the grid or console
        alert("Failed to load data. Check console for details.");
      }
  
      // Grid Options
      const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData, // Set the fetched data here
        // You can add more grid options here, e.g., pagination, sorting, filtering
        pagination: true,
        paginationPageSize: 10,
        suppressRowClickSelection: true, // Example: disable row selection on click
        // Other options like:
        // defaultColDef: {
        //   flex: 1,
        //   minWidth: 100,
        // },
      };
  
      // Initialize the grid once the DOM is ready and data is (potentially) fetched
      // ag-Grid expects a DOM element and an options object
      agGrid.createGrid(gridDiv, gridOptions);
    }
  
    // Call the function to initialize the grid
    initializeGrid();
  });