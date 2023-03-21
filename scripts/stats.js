//archivo propio de stats.html

//implementación JSON
fetch("./scripts/amazing.json")
.then((response) => response.json())
.then(eventos => {
    //filtra el json por fecha, UPCOMMING EVENTS
    const antesFilter = eventos.events.filter(events =>
        (events.date > eventos.currentDate)
    );
    //filtra el json por fecha, PAST EVENTS
    const despuesFilter = eventos.events.filter(events =>
        (events.date < eventos.currentDate)
    )

    //DOM PRIMER TABLA:
    creoObjeto(despuesFilter);
    
    //SEGUNDA TABLA:
    segundaTabla(separoCategorias(antesFilter), antesFilter)

    //DOM TERCER TABLA:
    tercerTabla(separoCategorias(despuesFilter), despuesFilter);
})

//primero hago array de categoría, luego analizo si la categoria de un elemento coincide con la categoria, añado sus ingresos por categoría
//filtrado por categoria


function separoCategorias(array) {
    let arrayCategoria = array.map(elemento => elemento.category)
    let setCategory = new Set(arrayCategoria.sort((a,b)=>{
        if(a < b){
            return -1
        }
        if(a > b){
            return 1
        }
        return 0
    }))
    return setCategory
}

//PRIMER TABLA

let eventStatistics = document.getElementById("eventsStatistics")

//Calcula cuál evento tuvo mayor capacidad
function largestCapacityEvent(array) {
    let largestCapacity = 0;
    let eventCapacity = 0;
    array.forEach(event => {
        
        if (event.capacity > largestCapacity) {
          largestCapacity = event.capacity;
          eventCapacity = event;
        }
      });
    return eventCapacity;
}

let largestAttendancePercentage = 0; //numero usado para comparar

//Calcula cuál fue el evento con mayor concurrencia (datos tomados sobre eventos pasados)
function highestAttendance(array) {
    let largestAttendance = 0;
    array.forEach(event => {
        let attendancePercentage = event.assistance/ event.capacity *100;
        if (attendancePercentage > largestAttendancePercentage) {
          largestAttendancePercentage = attendancePercentage;
          largestAttendance = event;
        }
    });
    return largestAttendance
}

let lowestAttendancePercentage = 110; //numero usado para comparar

//Calcula cuál fue el evento con menor concurrencia (datos tomados sobre eventos pasados)
function lowestAttendance(array) {
    let largestAttendance = 0;
    array.forEach(event => {
        let attendancePercentage = event.assistance/ event.capacity *100;
        if (attendancePercentage < largestAttendancePercentage) {
          largestAttendancePercentage = attendancePercentage;
          largestAttendance = event;
        }
    });
    return largestAttendance
}

//crea las filas donde irán los elementos.
function creoObjeto(array) {
    let htmlInner = ""
    let arrayPrueba = []
    arrayPrueba.push(largestCapacityEvent(array))
    arrayPrueba.push(highestAttendance(array))
    arrayPrueba.push(lowestAttendance(array))
    htmlInner +=
    `<td class="col-lg-3">`+arrayPrueba[1].name+` (`+ ((arrayPrueba[1].assistance / arrayPrueba[1].capacity * 100).toFixed(2)) +`%)</td>` +
    `<td class="col-lg-3">`+arrayPrueba[2].name+` (`+ ((arrayPrueba[2].assistance / arrayPrueba[2].capacity * 100).toFixed(2)) +`%)</td>` +
    `<td class="col-lg-3">`+arrayPrueba[0].name+` (`+ arrayPrueba[0].capacity +`)</td>`
    eventStatistics.innerHTML = htmlInner
}


//SEGUNDA TABLA
const upcommingStatistics = document.getElementById("upcomming-statistics")

//funcion que usa el filtrado de categorias, para obtener el ingreso y la asistencia (upcomming events)
function segundaTabla(arrayCategorias, arrayObj){
    let internoHTML = ""
    arrayCategorias.forEach(elemento => {
        let numeroIncome = 0
        let numeroPorcentageAssistance = 0
        let numeroPorcentageCapacity = 0
        let probando = arrayObj.filter(element => element.category == elemento);
        let prueba2 = probando.forEach(elemento=>{
            numeroIncome += elemento.price * elemento.estimate
            numeroPorcentageAssistance += elemento.estimate
            numeroPorcentageCapacity += elemento.capacity
        })
        internoHTML +=`<tr><td class="col-lg-3">`+elemento+`</td><td class="col-lg-3">$ `+numeroIncome+`</td><td class="col-lg-3">`+((numeroPorcentageAssistance / numeroPorcentageCapacity * 100).toFixed(2))+` %</td></tr>`
    })
    upcommingStatistics.innerHTML = internoHTML
}


//TERCER TABLA
const pastStatistics = document.getElementById("past-statistics")

//funcion que usa el filtrado de categorias, para obtener el ingreso y la asistencia (past events)
function tercerTabla(arrayCategorias, arrayObj){
    let internoHTML = ""
    arrayCategorias.forEach(elemento => {
        let numeroIncome = 0
        let numeroPorcentageAssistance = 0
        let numeroPorcentageCapacity = 0
        let probando = arrayObj.filter(element => element.category == elemento);
        let prueba2 = probando.forEach(elemento=>{
            numeroIncome += elemento.price * elemento.assistance
            numeroPorcentageAssistance += elemento.assistance
            numeroPorcentageCapacity += elemento.capacity
        })
        internoHTML +=`<tr><td class="col-lg-3">`+elemento+`</td><td class="col-lg-3">$ `+numeroIncome+`</td><td class="col-lg-3">`+((numeroPorcentageAssistance / numeroPorcentageCapacity * 100).toFixed(2))+` %</td></tr>`
    })
    pastStatistics.innerHTML = internoHTML
}