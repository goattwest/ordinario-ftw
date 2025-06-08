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

    function myFunction(ajolote) {
        let table = "<tr><th>Nombre</th><th>Descripción</th></tr>";
        for (let i = 0; i < ajolote.length; i++) {
            table += "<tr><td>" +
                ajolote[i].getElementsByTagName("NOMBRE")[0].childNodes[0].nodeValue +
                "</td><td>" +
                ajolote[i].getElementsByTagName("DESCRIPCION")[0].childNodes[0].nodeValue +
                "</td></tr>";
        }
        document.getElementById("demo").innerHTML = table;
    }

    //Se tomó como base el script de las primeras actividades del curso, nadamas se cambio lo siguiente
    //para que cargue la pagina al iniciarse en vez de al presionar un boton
    window.addEventListener('load', function() {
        loadXMLDoc();
    });