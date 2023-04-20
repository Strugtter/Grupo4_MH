import { data } from "../data/data.js";

let eventosPasados = data.eventos.filter((e)=>e.date<data.fechaActual);

const nav = document.getElementById("nav");
const content = document.getElementById("card");
let allEvents = eventosPasados;
let pageIndexAll = 0;
let pageIndexFilter = 0;
let itemsPerPage = 4;
let eventosFiltrados = [];
let cardsFilter = [];

loadItems();
function loadItems() {
  content.innerHTML = "";
  for ( let i = pageIndexAll * itemsPerPage; i < pageIndexAll * itemsPerPage + itemsPerPage; i++) {
    if (!allEvents[i]) {
      break;
    }

    const name = allEvents[i].name;
    const img = allEvents[i].image;
    const desc = allEvents[i].description;
    const price = allEvents[i].price;
    const categ = allEvents[i].category;
    const dat = allEvents[i].date;
    const pla = allEvents[i].place;
    const capa = allEvents[i].capacity;
    const assis = allEvents[i].assistance;

    content.innerHTML += `
        <div class="col-lg-3 col-sm-6 ">
                <div class="card p-3 tCard">
                <div class="tImg">
                    <img src="${img}" class="card-img-top shadow-lg bg-body-tertiary rounded tImg" alt="${name}"></div>
                    <div class="card-body tBody">
                    <div class="tDec">
                        <h5 class="card-title text-center">${name}</h5>
                        <p class="card-text text-center dCard">${desc}</p>
                    </div>
                        <br>
                        <div class="d-flex justify-content-between tFoot">
                            <p class="card-text align-items-end"><small class="text-muted">Price $ ${price}</small></p>
                            <a href="../pages/details.html?nombre=${name}&descripcion=${desc}&imagen=${img}&precio=${price}&category=${categ}&date=${dat}&place=${pla}&capacity=${capa}&assistance=${assis}" class="btn btn-primary float-right">View details</a>
                        </div>
                    </div>
                </div>
            </div> `;
  }
  loadPageNav();
}

function loadPageNav() {
  nav.innerHTML = "";
  for (let i = 0; i < allEvents.length / itemsPerPage; i++) {
    const span = document.createElement("button");
    span.innerHTML = i + 1;
    span.addEventListener("click", (e) => {
      pageIndexAll = e.target.innerHTML - 1;
      loadItems();
    });
    if (i === pageIndexAll) {
      span.style.backgroundColor = "black";
      span.style.color = "white";
    }
    nav.append(span);
  }
}

function loadPageNavF(cardsFilter) {
  nav.innerHTML = "";
  for (let i = 0; i < cardsFilter.length / itemsPerPage; i++) {
    const span = document.createElement("button");
    span.innerHTML = i + 1;
    span.addEventListener("click", (e) => {
      pageIndexFilter = e.target.innerHTML - 1 ;
    });
    if (i === pageIndexFilter) {
      span.style.backgroundColor = "black";
      span.style.color = "white";
    }
    nav.append(span);
  }
}

let botonFilter = document.getElementById("buscarBoton");
function filtrarCards() {
  let buscarInput = document.getElementById("buscarInput");
  let eventsArray = eventosFiltrados.length > 0 ? eventosFiltrados : allEvents; 

  if (buscarInput.value) {
    cardsFilter = eventsArray.filter((events) =>
      events.name
        .toLowerCase()
        .trim()
        .includes(buscarInput.value.toLowerCase().trim())
    );

    if (cardsFilter.length === 0) {
      Swal.fire({
        title: 'Esta seguro de su busqueda',
        text: "¡El evento no se encontro!",
        icon: 'Advertencia',
        showCancelButton: false,
        confirmButtonColor: 'red',
        cancelButtonColor: '#d33',
        confirmButtonText: '!Intentalo de nuevo¡'
    })

    } else {
      loadPageNavF(cardsFilter); 
      loadItemsFiltro(cardsFilter);
    }
  }
  document.getElementById("buscarInput").value = "";
}
botonFilter.addEventListener("click", filtrarCards);

function loadItemsFiltro(cardsFilter) {  
  nav.innerHTML = "";
  content.innerHTML = "";
  for ( let i = 0; i < allEvents.length; i++  
  ) {
    if (!cardsFilter[i]) {
      break;
    }
    const name = cardsFilter[i].name;
    const img = cardsFilter[i].image;
    const desc = cardsFilter[i].description;
    const price = cardsFilter[i].price;
    const categ = cardsFilter[i].category;
    const dat = cardsFilter[i].date;
    const pla = cardsFilter[i].place;
    const capa = cardsFilter[i].capacity;
    const assis = cardsFilter[i].assistance;
    content.innerHTML += `
        <div class="col-lg-3 col-sm-6 ">
                <div class="card p-3 tCard">
                <div class="tImg">
                    <img src="${img}" class="card-img-top shadow-lg bg-body-tertiary rounded tImg" alt="${name}"></div>
                    <div class="card-body tBody">
                    <div class="tDec">
                        <h5 id="tituloCard" class="card-title text-center">${name}</h5>
                        <p class="card-text text-center dCard">${desc}</p>
                    </div>
                        <br>
                        <div class="d-flex justify-content-between tFoot">
                            <p class="card-text align-items-end"><small class="text-muted">Price $ ${price}</small></p>
                            <a href="../pages/details.html?nombre=${name}&descripcion=${desc}&imagen=${img}&precio=${price}&category=${categ}&date=${dat}&place=${pla}&capacity=${capa}&assistance=${assis}" class="btn btn-primary float-right">View details</a>
                        </div>
                    </div>
                </div>
            </div> `;
  }
}

const contenedorCategorias = document.getElementById("contenedorCategorias");
const categorias = [];
console.log(categorias);
for (let i = 0; i < allEvents.length; i++) {
  const categoria = allEvents[i].category;
  if (!categorias.includes(categoria)) {
    categorias.push(categoria);
    contenedorCategorias.innerHTML += `
        <li class="list-group-item">
        <input type="checkbox" value="${categoria}" name="${categoria}" id="filtroCheck">
        <label for="${categoria}">${categoria}</label>
        </li>
        `;
  }
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
let arreglo = [];
let todosLosEventos = allEvents;
for (var i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("click", function () {
    if (this.checked) {
      arreglo.push(this.value);
    } else {
      let index = arreglo.indexOf(this.value);
      if (index !== -1) {
        arreglo.splice(index, 1);
      }
    }
    eventosFiltrados = todosLosEventos.filter(evento => arreglo.includes(evento.category));
    loadItemsFiltro(eventosFiltrados);
    
    console.log(eventosFiltrados);
    if (arreglo.length === 0) {
      loadItems(todosLosEventos);
    }
    console.log(arreglo);
  });
}