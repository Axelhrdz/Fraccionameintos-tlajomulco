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
    const addBtn = document.querySelector("#addFraccionamientosBtn");

    // Modal elements
    const detailsModal = document.getElementById("detailsModal");
    const closeButton = detailsModal.querySelector(".close-button");
    const modalNombre = document.getElementById("modalNombre");
    // const modalInicioConvenio = document.getElementById("modalInicioConvenio");
    const modalFinConvenio = document.getElementById("modalFinConvenio");
    const modalEstatus = document.getElementById("modalEstatus");
    const modalPdfLink = document.getElementById("modalPdfLink");
    const modalObservaciones = document.getElementById("modalObservaciones");


    // HELPER FUNCTIONS
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


    // Modal observations
    const observationsCellRenderer = (params) => {
      const observations = params.value;
      const cellDiv = document.createElement('div');
      cellDiv.style.cursor = 'pointer'; // Indicate it's clickable
      // cellDiv.style.textDecoration = 'underline';
      cellDiv.style.color = '#757575';
      cellDiv.style.fontWeight = 'bold';
      cellDiv.classList.add('observButton');
  
      // Display a truncated version or a "Click to view" message
      const displayValue = observations && observations.length > 50
        ? observations.substring(0, 47) + '...' // Truncate long observations
        : observations || 'Ver Detalles'; // If null/empty, show "Ver Detalles"
  
      cellDiv.textContent = displayValue;
      cellDiv.title = 'Click para ver detalles completos'; // Tooltip
  
      // Attach click event listener
      cellDiv.addEventListener('click', () => {
        // Access the full row data from params.data
        showDetailsModal(params.data);
      });
  
      return cellDiv;
    };


    // Show modal with data
    const showDetailsModal = (data) => {
      modalNombre.textContent = data.nombre || 'N/A';
      // modalInicioConvenio.textContent = formatDate(data.fecha_inicio_convenio);
      modalFinConvenio.textContent = formatDate(data.fecha_fin_convenio);
      modalEstatus.textContent = data.tiene_convenio ? 'Activo' : 'Inactivo';
  
      // Handle PDF link within modal
      if (data.pdf_convenio_path) {
        const existingLink = modalPdfLink.querySelector('a');
        if (existingLink) modalPdfLink.removeChild(existingLink); // Remove old link if any
        const link = document.createElement('a');
        link.href = data.pdf_convenio_path;
        link.target = '_blank';
        link.textContent = 'Abrir PDF';
        modalPdfLink.appendChild(link);
      } else {
        modalPdfLink.textContent = 'N/A';
        const existingLink = modalPdfLink.querySelector('a'); // Clear old link if no new one
        if (existingLink) modalPdfLink.removeChild(existingLink);
      }
  
      modalObservaciones.textContent = data.observaciones || 'Sin observaciones adicionales.';
  
      detailsModal.style.display = "flex"; // Use flex to center with CSS
    };


    // --- NEW: Function to close the modal ---
    const closeDetailsModal = () => {
      detailsModal.style.display = "none";
    };

    // --- NEW: Event listeners for closing modal ---
    closeButton.addEventListener('click', closeDetailsModal);
    // Close when clicking outside the modal content
    window.addEventListener('click', (event) => {
      if (event.target == detailsModal) {
        closeDetailsModal();
      }
    });


    // Autosuficiente format

    // const formatAuto = (params) => {
    //   if(params == 0){
    //     console.log('param seen');
    //   }
    // }
    const autosuficienteCellRenderer = (params) => {
      const cellValue = params.value === 1 || params.value === true;
      
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.justifyContent = 'center';
      container.style.alignItems = 'center';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = cellValue;
      checkbox.disabled = true; // Make it read-only
      
      container.appendChild(checkbox);
      return container;
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
          editable: true,
          cellRenderer: observationsCellRenderer,
        },
        {
          headerName: 'Autosuficiente',
          field: 'autosuficiente',
          cellRenderer: autosuficienteCellRenderer, // Use the custom renderer
          // Or if you prefer text representation:
          // valueFormatter: (params) => params.value ? 'Sí' : 'No',
          filter: 'agBooleanColumnFilter', // Enable boolean filtering
          filterParams: {
            cellRenderer: autosuficienteCellRenderer // Optional: show checkboxes in filter
          }
        },
    ];
  
    // Function to fetch data and initialize the grid
    const API_BASE = window.location.origin;
    async function initializeGrid() {
      let rowData = [];
      try {
        // Replace with your actual backend endpoint
        // Using JSONPlaceholder for a public example
        const response = await fetch(`${API_BASE}/api/fraccionamientos`);
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