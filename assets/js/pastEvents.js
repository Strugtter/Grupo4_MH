import { data } from "../data/data.js";

let eventosPasados = data.eventos.filter((e)=>e.date<data.fechaActual);


const nav = document.getElementById("nav");
const content = document.getElementById("card");
let allEvents = eventosPasados;
let pageIndex = 0;
let itemsPerPage = 4;

loadItems();

function loadItems() {

    content.innerHTML = "";
    for (let i = pageIndex * itemsPerPage; i < (pageIndex * itemsPerPage) + itemsPerPage; i++) {
        
        if (!allEvents[i]) { break }

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
                            <a href="details.html?nombre=${name}&descripcion=${desc}&imagen=${img}&precio=${price}&category=${categ}&date=${dat}&place=${pla}&capacity=${capa}&assistance=${assis}" class="btn btn-primary float-right">View details</a>
                        </div>
                    </div>
                </div>
            </div> `;

        
    }
    loadPageNav();
}

function loadPageNav(){
nav.innerHTML="";
for (let i=0 ; i<(allEvents.length/itemsPerPage); i++){
    const span= document.createElement("button");
    span.innerHTML=i+1;
    span.addEventListener("click", (e)=>{
        pageIndex= e.target.innerHTML-1;
        loadItems();
    });
    if (i===pageIndex){
        span.style.backgroundColor="black";
        span.style.color="white";
    }
    nav.append(span);
}
}