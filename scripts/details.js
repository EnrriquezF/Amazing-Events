fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then(eventos => {
    let card = eventos.events.find(info => info._id == id)
    
    html+=  `<div class="col-12">
<div class="row borde-negro d-flex justify-content-around">
<div class="col-lg-5 col-md-8">
  <img src="${card.image}" class="borde-negro py-5 px-0 m-5 responsive-div details-img" alt="">
</div>
<div class="col-lg-5 col-md-11 borde-negro py-5 text-center m-5 responsive-sm">
  <h2>${card.name}</h2>
  <h5>${card.description}</h5>
  <h5>${card.category} at ${card.place}. Date: ${card.date}</h5>
  <h5>Price: $${card.price}</h5>
</div>
</div>
</div> 
</div>`;

container.innerHTML = html
})

let params = new URLSearchParams(location.search)//obtiene parametros de la URL

let id = params.get("id")

let container = document.getElementById("container-detail");

let html = "";