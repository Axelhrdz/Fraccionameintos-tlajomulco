
document.addEventListener('DOMContentLoaded', function(){
    const gridOptions = {
        // Row Data: The data to be displayed.
        rowData: [
            { 
                nombre: "Bosque Real", 
                categoria: "vigente", 
                'vigencia/inicio': '02/05/2000', 
                'vigencia/final': 64950, 
                convenio: true ,
                observaciones: 'Convenio vigente hasta 2027'
            },
            { 
                nombre: "Bosques de Santa Anita", 
                categoria: "vigente", 
                'vigencia/inicio': 64950, 
                'vigencia/final': 64950, 
                convenio: false,
                observaciones: 'Convenio vigente hasta 2027'
            },
            { 
                nombre: "Senderos de Monteverde", 
                categoria: "vigente", 
                'vigencia/inicio': 64950, 
                'vigencia/final': 64950, 
                convenio: false,
                observaciones: 'Convenio vigente hasta 2027'
            },
            { 
                nombre: "Valle de las Flores", 
                categoria: "vigente", 
                'vigencia/inicio': 64950, 
                'vigencia/final': 64950, 
                convenio: true ,
                observaciones: 'Convenio vigente hasta 2027'
            },
            { 
                nombre: "Casa Fuerte", 
                categoria: "vigente", 
                'vigencia/inicio': 64950, 
                'vigencia/final': 64950, 
                convenio: true ,
                observaciones: 'Convenio vigente hasta 2027'
            },
            { 
                nombre: "Colinas de Cajititlan", 
                categoria: "vencido", 
                'vigencia/inicio': 64950, 
                'vigencia/final': 64950, 
                convenio: false ,
                observaciones: 'Convenio vigente hasta 2027'
            },
            { 
                nombre: "La Noria de los Reyes", 
                categoria: "irregular", 
                'vigencia/inicio': 64950, 
                'vigencia/final': 64950, 
                convenio: false,
                observaciones: 'Convenio vigente hasta 2027'
            },
        ],
        // Column Definitions: Defines the columns to be displayed.
        columnDefs: [
            { field: "nombre", filter: true },
            {
                field: "categoria",
                filter: 'agSetColumnFilter',
                cellClassRules: {
                    // Apply different CSS classes based on cell value
                    'vigente-row': params => params.value === 'vigente',
                    'en-proceso-row': params => params.value === 'en proceso',
                    'irregular-row': params => params.value === 'irregular'
                }
            },
            { 
                field: "vigencia/inicio",
                editable: true,
                cellDataType: 'date',
            },
            { 
                field: "vigencia/final",
                editable: true,
                cellDataType: 'date'
            },
            { 
                field: "convenio", 
            },
            {
                field: 'observaciones'
            },
            {
                field: 'pdf convenio'
            },
        ],
    };
    
      const myGrid = document.getElementById("myGrid");
      agGrid.createGrid(myGrid, gridOptions);

      
});
