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



    //format column dates
    const formatDate = (dateString) => {
      if(!dateString){
        return '';
      }
      const date = new Date(dateString);

      if(isNaN(date.getTime())){
        return dateString;
      }

      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    };


    //PDF render
    const pdfLinkCellRenderer = (params) => {
      // params.value will be the path, e.g., "/documents/test-convenio.pdf"
      const pdfPath = params.value;
  
      if (!pdfPath) {
        return 'No PDF existente'; // Return empty string if no path is provided
      }
  
      // Create an anchor element
      const linkElement = document.createElement('a');
      linkElement.href = pdfPath; // Set the href to the PDF path
      linkElement.target = '_blank'; // Open in a new tab
      linkElement.textContent = 'Ver PDF'; // Text to display in the link (e.g., "View PDF")
      linkElement.style.textDecoration = 'underline'; // Add underline for link appearance
      linkElement.style.color = 'blue'; // Make it blue like a link
  
      // Optional: Add a title for hover effect
      linkElement.title = `Abrir: ${pdfPath}`;
  
      // Return the DOM element
      return linkElement;
    };
  
    // Define column definitions
    const columnDefs = [
        {
            headerName: 'Nombre',
            field: 'nombre',
            filter: 'agTextColumnFilter'
        },
        {
            headerName: 'Categoria',
            field: 'categoria',
            filter: 'agTextColumnFilter',
            cellStyle: params => {
              switch (params.value) {
                case 'vigente': return { backgroundColor: '#e6f7e6' };
                case 'en proceso': return { backgroundColor: '#fffae6' };
                case 'irregular': return { backgroundColor: '#f2f2f2' };
                default: return {};
              }
            }
        },
        // {
        //     headerName: 'Convenio / inicio',
        //     field: 'fecha_inicio_convenio',
        //     valueFormatter: (params) => formatDate(params.value),
        //     filter: 'agTextColumnFilter'
        // },
        {
            headerName: 'Vigencia de Convenio',
            field: 'fecha_fin_convenio',
            valueFormatter: (params) => formatDate(params.value)
        },
        {
            headerName: 'PDF',
            field: 'pdf_convenio_path',
            editable: true,
            cellRenderer: pdfLinkCellRenderer,
        },
        {
            headerName: 'Observaciones',
            field: 'observaciones',
            editable: true
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
        // console.log("Fetched data:", rowData);
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
        defaultColDef: {
          flex: 1,
          minWidth: 100,
        },
      };
  
      // Initialize the grid once the DOM is ready and data is (potentially) fetched
      // ag-Grid expects a DOM element and an options object
      agGrid.createGrid(gridDiv, gridOptions);
    }
  
    // Call the function to initialize the grid
    initializeGrid();
  });