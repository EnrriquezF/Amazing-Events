//archivo propio de home.html aka. index.html

/*  //RECORRIDO Y OBTENCION DE FECHAS PARA CADA EVENTO

function eventosFuturos(eventos, fechaActual) {
    let upcommingEvents = [];
    for(let card of eventos) {
        if(card.date > fechaActual) {
            upcommingEvents.push(card);
        }
    }
    return upcommingEvents;
}

function eventosPasados(eventos, fechaActual) {
    let pastEvents = [];
    for(let card of eventos) {
        if(card.date <= fechaActual) {
            pastEvents.push(card);
        }
    }
    return pastEvents;
}

console.table(eventosFuturos(data.events, data.currentDate));
console.table(eventosPasados(data.events, data.currentDate));
 */

//REEMPLAZO DE CARTAS DE EVENTOS ESTATICAS POR DINAMICAS

//Implementacion DOM

let contenedor = document.getElementById('contenedor'); //aclarando el contenedor que albergará las cards

let cartitas = "" //cargará las cards que se mostrarán dentro del contenedor

function implementoTodo(array) { 
    for(let card of array) {//por cada objeto del array, añadirá una carta que muestre cierta información de los eventos
        cartitas += `<div class="col-lg-2 col-md-5 col-sm-11 cartita">
        <div class="row">
        <img src="${card.image}" alt="">
        </div>
        <div class="row"><h3>${card.name}</h3></div>
        <div class="row"><p>${card.description}</p></div>
        <div class="row d-flex justify-content-around flex-wrap">
        <div class="col-lg-4 col-sm-9">Price $${card.price}</div>
        <div class="col-lg-4 col-sm-8 add-cart"><a href="details.html"><button class="btn" role="button">Ver más</button></a></div>
        </div></div> `
    }
}

implementoTodo(data.events) //llama a la función

contenedor.innerHTML = cartitas //el resultado son 14 tarjetas, indistintas de si fueron antes o después de la fecha actual

//REFERENCIA PARA LAS CARDS

/* <div class="col-lg-2 col-md-5 col-sm-11 cartita">
<div class="row">
<img src="assets/Museum_Tour.jpg" alt="">
</div>
<div class="row"><h3>Título</h3></div>
<div class="row"><p>Texto descriptivo.</p></div>
<div class="row d-flex justify-content-around flex-wrap">
<div class="col-lg-4 col-sm-9">Price $2000</div>
<div class="col-lg-4 col-sm-8 add-cart"><a href="details.html"><button class="btn" role="button">Ver más</button></a></div>
</div> */