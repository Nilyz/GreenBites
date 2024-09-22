//dom elements
const dishCardCont = document.querySelector(".dishSection__cardCont");
const dessertCardCont = document.querySelector(".dessertSection__cardCont");


let res;


const request = new XMLHttpRequest();
request.open("GET", "../json/platos.json");
request.responseType = "json";
request.send();

request.onload = function () {
    res = request.response;
    console.log(res); 

    if (res.dishes && res.dishes.length > 0) {
        createDishCards(res.dishes); // Llamar a la función pasando los datos del JSON
    }
    if (res.desserts && res.desserts.length > 0) {
        createDishCards(res.desserts); // Llamar a la función pasando los datos del JSON
    }
};

function createDishCards(platos){
    
    platos.forEach(plato => {
        const dishCont = document.createElement('div');
                dishCont.classList.add('dishCont');

                // Crear la imagenCont
                const dish__imgCont = document.createElement('div');
                dish__imgCont.classList.add('dish__imgCont'); 
                
                const dishImg = document.createElement('img');
                dishImg.src = plato.dishImg; 
                dishImg.alt = plato.dishName;

                //  Div de info
                const dish__infoCont = document.createElement("div");
                dish__infoCont.classList.add('dish__infoCont');

                const dish__infoCont__name = document.createElement("div");
                dish__infoCont__name.classList.add('dish__infoCont__name');
                const dishName = document.createElement('p');
                dishName.textContent = plato.dishName;
                

                const dish__infoCont__time = document.createElement("div");
                dish__infoCont__time.classList.add('dish__infoCont__time');
                const timeImg = document.createElement('img');
                timeImg.src = "../img/clock.svg"; 
                timeImg.alt = "reloj";
                const preparationTime = document.createElement('p');
                preparationTime.textContent = plato.preparationTime;

                const dish__price = document.createElement("div");
                dish__price.classList.add('dish__price');
                const price = document.createElement('p');
                price.textContent = plato.price;
                const orderLink = document.createElement('a');
                orderLink.href = "#"; 
                orderLink.textContent = "Ordenar Ahora";

                // Añadir todo al contenedor
                dishCont.appendChild(dish__imgCont);
                dishCont.appendChild(dish__infoCont);
                dish__imgCont.appendChild(dishImg);
                dish__infoCont.appendChild(dish__infoCont__name);
                dish__infoCont__name.appendChild(dishName);
                dish__infoCont.appendChild(dish__infoCont__time);
                dish__infoCont__time.appendChild(timeImg);
                dish__infoCont__time.appendChild(preparationTime);
                dish__infoCont.appendChild(dish__price);
                dish__price.appendChild(price);
                dish__price.appendChild(orderLink);
                

                // Añadir el contenedor al DOM despendiendo de si es plato o postre
                if(platos===res.dishes){
                    dishCardCont.appendChild(dishCont);
                }else if(platos===res.desserts){
                    dessertCardCont.appendChild(dishCont);

                }
                
    })
    
}
