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
    announceToScreenReader(`Tabla cargada con ${ajolotes.length} tipos de ajolotes`);
}

function addTableKeyboardNavigation() {
    const table = document.getElementById("demo");
    const cells = table.querySelectorAll('td[tabindex="0"]');
    
    cells.forEach((cell, index) => {
        cell.addEventListener('keydown', function(e) {
            const currentRow = Math.floor(index / 2);
            const currentCol = index % 2;
            const totalRows = Math.floor(cells.length / 2);
            
            let newIndex = index;
            
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
            
            if (newIndex !== index && newIndex >= 0 && newIndex < cells.length) {
                e.preventDefault();
                cells[newIndex].focus();
            }
        });
    });
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

window.addEventListener('load', function() {
    loadXMLDoc();
    
    setTimeout(() => {
        const firstCell = document.querySelector('td[tabindex="0"]');
        if (firstCell) {
            firstCell.focus();
        }
    }, 100);
});

document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        const firstCell = document.querySelector('td[tabindex="0"]');
        if (firstCell) {
            firstCell.focus();
            announceToScreenReader('Enfocado en tabla de ajolotes');
        }
    }
    
    if (e.altKey && e.key === 'b') {
        e.preventDefault();
        const backButton = document.querySelector('.BotonRegresar');
        if (backButton) {
            backButton.focus();
            announceToScreenReader('Enfocado en botón regresar');
        }
    }
});