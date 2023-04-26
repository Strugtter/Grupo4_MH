const queryString = window.location.search; // CAPTURAMOS TODA LA URL
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id')

let url = "https://pro-talento.up.railway.app/api/amazing/" + id

async function fetchApi(url) {
    try {
        let response = await fetch(url); //fetcheo la api
        response = await response.json() //transformo la respuesta de la app en datos utilizables
        console.log(response)//response es un objeto que tiene 2 propiedades:
        console.log(response.success);
        console.log(response.response);//response.response= objeto con todas las propiedades del evento
        let name = response.response.name;
        let category = response.response.category;
        let price = response.response.price;
        let { image, description, date, assistance, capacity, place } = response.response;
        let dynamicc = document.getElementById('row');
        dynamicc.innerHTML = `
<div class="card mb-3 c-card col-7 m-5" style="max-width: 900px;">
<div class="row g-0">
    <div class="col-md-7 mt-3 mb-3 ">
        <img src="${image}" class="img-fluid rounded img-dt shadow h-100" alt="${name}">
    </div>
    <div class="col-md-5 pt-4 d-flex flex-column">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
        </div>
        <ul class="list-group list-group-flush mt-3 ">
            <li class="list-group-item c-card border-dark">Category: ${category}</li>
            <li class="list-group-item c-card border-dark">Dates: ${date}</li>
            <li class="list-group-item c-card border-dark">Place of the event: ${place}</li>
            <li class="list-group-item c-card border-dark">Capacity: ${capacity}</li>
            <li class="list-group-item c-card border-dark">Assistance or estimate: ${assistance}</li>
            <li class="list-group-item c-card border-dark">Price: $${price}</li>
        </ul>
        <div class="card-footer text-muted mt-4">
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
    </div>
</div>
</div>`;
document.title = name;
    } catch (error) {
        console.log(error)
    }
}
fetchApi(url);
