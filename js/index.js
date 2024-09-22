//dom elements
const opinionsImg = document.querySelector(".opinions__userImg img");
const opinionsText = document.querySelector(".opinions__userText p");

let res;
let index = 0; // Índice para recorrer los datos

const request = new XMLHttpRequest();
request.open("GET", "../json/review.json");
request.responseType = "json";
request.send();

request.onload = function () {
    res = request.response;
    console.log(res); 

    //Llamar a la función si el json no está vacío
    if (res.length > 0) {
        setInterval(updateContent, 10000);
    }
};

//Función para cambiar el contenido cada 10s
function updateContent() {
    opinionsImg.src = res[index].img; 
    opinionsText.textContent = res[index].review; 
    // Incrementar el i y reiniciar cuando llegue al final
    index = (index + 1) % res.length;
    console.log(index);
}


