/*
Se cargan los datos del archivo XML que ocupamos y obtiene los datos del elemento "AJOLOTE"
*/
function loadXMLDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const xmlDoc = xhttp.responseXML;
        const ajolote = xmlDoc.getElementsByTagName("AJOLOTE");
        myFunction(ajolote);
    }
    xhttp.open("GET", "listaAjolotes.xml");
    xhttp.send();
}

/*
Genera una tabla HTML con los datos de los ajolotes obtenidos del XML.
Crea las filas con nombre y descripción de cada ajolote y las inserta en el elemento "demo" (Nuestra tabla pues).
*/
function myFunction(ajolotes) {
    let table = "<thead><tr><th scope='col' id='nombre-header'>Nombre</th><th scope='col' id='descripcion-header'>Descripción</th></tr></thead><tbody>";
    
    for (let i = 0; i < ajolotes.length; i++) {
        const nombre = ajolotes[i].nombre || ajolotes[i].getElementsByTagName?.("NOMBRE")?.[0]?.childNodes?.[0]?.nodeValue || "";
        const descripcion = ajolotes[i].descripcion || ajolotes[i].getElementsByTagName?.("DESCRIPCION")?.[0]?.childNodes?.[0]?.nodeValue || "";
        
        table += `<tr role="row">
            <td role="gridcell" headers="nombre-header" tabindex="0">${nombre}</td>
            <td role="gridcell" headers="descripcion-header" tabindex="0">${descripcion}</td>
        </tr>`;
    }
    table += "</tbody>";
    
    document.getElementById("demo").innerHTML = table;
    
    addTableKeyboardNavigation();
}

/*
Añade la funcion de poder moverse por cada indice dentro de la tabla con las flechas
mejorando la navegación de esta. 
*/
function addTableKeyboardNavigation() {
    const table = document.getElementById("demo");
    const cells = table.querySelectorAll('td[tabindex="0"]');
    
    /*
    Agrega un evento de teclado a cada celda de la tabla para permitir navegación con flechas
    */
    cells.forEach((cell, index) => {
        cell.addEventListener('keydown', function(e) {
            const currentRow = Math.floor(index / 2);
            const currentCol = index % 2;
            const totalRows = Math.floor(cells.length / 2);
            
            let newIndex = index;
            
            /*
            Switch para distinguir que flecha se presionó junto a la posicion de la tabla en la que nos
            va a dirigir esa interacción.
             */
            switch(e.key) {
                case 'ArrowRight':
                    if (currentCol < 1) {
                        newIndex = index + 1;
                    }
                    break;
                case 'ArrowLeft':
                    if (currentCol > 0) {
                        newIndex = index - 1;
                    }
                    break;
                case 'ArrowDown':
                    if (currentRow < totalRows - 1) {
                        newIndex = index + 2;
                    }
                    break;
                case 'ArrowUp':
                    if (currentRow > 0) {
                        newIndex = index - 2;
                    }
                    break;
                case 'Home':
                    newIndex = currentRow * 2;
                    break;
                case 'End':
                    newIndex = currentRow * 2 + 1;
                    break;
            }
            
            /*
            Si la nueva posición es válida, mueve el foco a esa celda
            */
            if (newIndex !== index && newIndex >= 0 && newIndex < cells.length) {
                e.preventDefault();
                cells[newIndex].focus();
            }
        });
    });
}

/*
Funcion que carga el contenido de la tabla al inicializar la pagina.
Manda a llamar la funcion anterior.
*/
window.addEventListener('load', function() {
    loadXMLDoc();
});