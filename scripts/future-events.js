//archivo propio de future-events.html

function eventosFuturos(eventos, fechaActual) { //esta función separa los eventos futuros de los eventos pasados, metiéndolos en un array de objetos
    let upcommingEvents = [];
    for(let card of eventos) {
        if(card.date > fechaActual) {
            upcommingEvents.push(card);
        }
    }
    return upcommingEvents;
}


//Implementacion DOM

let contenedor = document.getElementById('contenedor'); //aclarando el contenedor que albergará las cards

let cartitas = ""//cargará las cards que se mostrarán dentro del contenedor

function implementoFuturo(array) {
    for(let card of array) { //por cada objeto del array que cumpla ciertas condiciones, añadirá una carta que muestre cierta información de los eventos
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

implementoFuturo(eventosFuturos(data.events, data.currentDate)) //llamando a la función

contenedor.innerHTML = cartitas //el resultado es 7 cards que ocurrirán después de la fecha actual