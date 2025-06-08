/*
Aca se obtienen los valores de los campos del login para priero validar que no
esten vacios. Esto mediante el uso de una bandera que por defecto esta con un valor "false"
y se cambia el valor a "true" cuando se valide que alguno de los valores esta vacio.
    
Cuando se corrobora que ambos no estan vacios, este manda a llamar otra funcion donde ahora
si se valida que el contenido ingresado sea igual a un usuario y contraseña especificos para realizar
el cambio de pagina.
*/
function validacionVacio() {
    
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        /*
        Se tienen mensajes de error con un atributo de hidden para que no se vean de primera mano.

        Si el campo tiene contenido falso se quita el atributo de hidden del mensaje de error y aparece
        en la pantalla.
        */
        document.getElementById("errorUser").setAttribute("hidden", "");
        document.getElementById("errorPass").setAttribute("hidden", "");
        
        let hasError = false;
        
        if(username === "" || username.trim() === "") {
            document.getElementById("errorUser").removeAttribute("hidden");
            hasError = true;
        }
        
        if(password === "" || password.trim() === "") {
            document.getElementById("errorPass").removeAttribute("hidden");
            hasError = true;
        }
        
        // Si no hay errores, proceder con el login
        if(!hasError) {
            seguridadChafa(username, password);
        }
    }

/*
Validacion del contenido de los campos para realizar el cambio de pantalla.
*/
    function seguridadChafa(username, password){
        let camposListos = false;

        if(username === "goatt" && password === "123"){
            camposListos = true;
        }

        if(camposListos){
            window.location.href = "./index.html";
        }
    }
