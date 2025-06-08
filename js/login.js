function validacionVacio() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

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

    function seguridadChafa(username, password){
        let camposListos = false;

        if(username === "goatt" && password === "123"){
            camposListos = true;
        }

        if(camposListos){
            window.location.href = "./index.html";
        }
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