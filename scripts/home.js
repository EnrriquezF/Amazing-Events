//archivo propio de home.html aka. index.html

//implementación JSON
fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then(eventos => {
    //crea cartas del json
    cartas(eventos.events)
    //crea checkbox de categorias a partir del json
    crearCheckboxes(eventos.events)
    //combina dos funciones para crear un filtro avanzado
    function filtro(){
        let filtroTexto = filtraTexto(eventos.events, searchInput.value)
        let filtroCategoria = filtrarCategory(filtroTexto)
        cartas(filtroCategoria)
    }
    //llama a la función filtro para que funcione en la barra de busqueda y los checkbox
    searchInput.addEventListener('input', filtro)
    contenedorChecks.addEventListener('change', filtro)
})

//Implementacion DOM
let contenedor = document.getElementById('contenedor'); //aclarando el contenedor que albergará las cards

let cartas = (array) => { //nuevo código con métodos de órden superior
    let cartitas = "";
    if(array.length==0) {
        cartitas += `<h2 class="text-center fw-bold my-5">There are no matches</h2>`
    }
    array.forEach((card) => {
        cartitas += `<div class="col-lg-2 col-md-5 col-sm-11 cartita">
        <div class="row">
        <img src="${card.image}" alt="">
        </div>
        <div class="row"><h3>${card.name}</h3></div>
        <div class="row"><p>${card.description}</p></div>
        <div class="row d-flex justify-content-around flex-wrap">
        <div class="col-lg-4 col-sm-9">Price $${card.price}</div>
        <div class="col-lg-4 col-sm-8 add-cart"><a href="details.html?id=${card._id}"><button class="btn" role="button">Ver más</button></a></div>
        </div></div> `
    })
    contenedor.innerHTML = cartitas
}

//BARRA DE BUSQUEDA
let searchInput = document.getElementById("barra-busqueda");

//CHECKBOXES (Los comentarios son para tratar de entender el proceso)
let contenedorChecks = document.getElementById("div-checks")

function crearCheckboxes(array){
    let arrayEventos = array.map(elemento => elemento.category) //crear arrayCategorias que analiza las categorias events del json
    let setCategory = new Set(arrayEventos.sort((a,b)=>{ //acá ordena el set alfabeticamente
        if(a<b){
            return -1
        }
        if(a>b){
            return 1
        }
        return 0
    }))
    let checks = '' //lo que va dentro del contenedor de checks?
    setCategory.forEach(elemento =>{ //aca crea cada checkbox de acuerdo a cada categoría (país originalmente)
        checks += `<div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" role="switch" id="${elemento}" value="${elemento}">
        <label class="form-check-label" for="${elemento}">${elemento}</label>
      </div>  `
    })
    contenedorChecks.innerHTML = checks
}

//filtra texto a partir del json
function filtraTexto (array, texto) {
    let arrayFiltrado = array.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
    return arrayFiltrado
}

//filtrar las categorias de los checkbox a partir del json
function filtrarCategory(array){
    let checkboxes = document.querySelectorAll("input[type='checkbox']") //selecciona todos los input de checkbox
    let arrayChecks = Array.from(checkboxes) //crea una instancia de array segun mdn web docs
    let checksCheckeados = arrayChecks.filter(check => check.checked) //filtra los que si esten marcados
    if(checksCheckeados.length == 0){
        return array //si el largo de los check es 0, directamente no hay filtrado
    }
    let categories = checksCheckeados.map(check => check.value) //rastrea que los que esten marcados y los captura
    let arrayFiltrado = array.filter(elemento => categories.includes(elemento.category))  //filtra el array que toma la funcion y la filtra por categoria 
    return arrayFiltrado
}