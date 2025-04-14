document;

const register = () => {
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;

    if (password !== repeatPassword) Swal.fire({ title: "Error", text: "Las contraseñas no coinciden", icon: "error", allowOutsideClick: false, confirmButtonText: "Aceptar" });
  
    fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_name: document.getElementById("firstName").value,
            last_name: document.getElementById("lastName").value,
            email: document.getElementById("emailAddress").value,
            date: document.getElementById("birthdayDate").value,
            password,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.error) throw new Error(data.message);
        Swal.fire({
            title: "Registro exitoso",
            text: "Usuario registrado correctamente",
            icon: "success",
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/login";
            }
        });
    })
    .catch((error) => {
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            allowOutsideClick: false,
            confirmButtonText: "Aceptar",
        });
    });
};
