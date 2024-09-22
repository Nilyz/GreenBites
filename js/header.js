//Para que el header se peque al hacer scroll

window.onscroll = function() {
    const header = document.querySelector('header');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        header.classList.add('scrolled'); // Cambia el estilo si se ha desplazado
    } else {
        header.classList.remove('scrolled');
    }
};