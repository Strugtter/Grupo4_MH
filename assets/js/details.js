

const queryString = window.location.search; // CAPTURAMOS TODA LA URL
const urlParams = new URLSearchParams(queryString);

const nombre = urlParams.get('nombre');
const descripcion = urlParams.get('descripcion');
const imagen = urlParams.get('imagen');
const precio = urlParams.get('precio');
const category = urlParams.get('category');
const date = urlParams.get('date');
const capacity = urlParams.get('capacity');
const assistance = urlParams.get('assistance');
const place = urlParams.get('place')

// 

let dynamicc = document.getElementById('row');  

dynamicc.innerHTML = `
<div class="card mb-3 c-card col-7 m-5" style="max-width: 900px;">
<div class="row g-0">
    <div class="col-md-7 mt-3 mb-3 ">
        <img src="${imagen}" class="img-fluid rounded img-dt shadow h-100" alt="${nombre}">
    </div>
    <div class="col-md-5 pt-4 d-flex flex-column">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">${descripcion}</p>
        </div>
        <ul class="list-group list-group-flush mt-3 ">
            <li class="list-group-item c-card border-dark">Category: ${category}</li>
            <li class="list-group-item c-card border-dark">Dates: ${date}</li>
            <li class="list-group-item c-card border-dark">Place of the event: ${place}</li>
            <li class="list-group-item c-card border-dark">Capacity: ${capacity}</li>
            <li class="list-group-item c-card border-dark">Assistance or estimate: ${assistance}</li>
            <li class="list-group-item c-card border-dark">Price: $${precio}</li>
        </ul>
        <div class="card-footer text-muted mt-4">
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
</div>
</div>`;

//window.history.replaceState({},'','details.html'); // AQUÍ CAMBIAMOS LA URL PARA BORARR LOS PARÁMETROS

document.title = nombre;