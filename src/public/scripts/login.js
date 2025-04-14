const signin = () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.error) throw new Error(data.message);
        console.log("ingreso exitoso", data);
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
}