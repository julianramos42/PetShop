const form = document.getElementById('form')
form.addEventListener("submit", (e) => {
    e.preventDefault()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Mensaje Enviado',
        showConfirmButton: false,
        timer: 1500
      })
    form.reset()
} );
