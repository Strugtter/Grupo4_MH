
let categorysUp = document.getElementById('tableBody');
let url = 'https://pro-talento.up.railway.app/api/amazing?time=upcoming';

async function loadStatsUp(url) {
    let response = await fetch(url);
    response = await response.json()
    response = response.response;
    console.log(response);
    let categorysArray = [...new Set(response.map(event => event.category))];
    let filas = categorysUp.rows;
    console.log(filas);

    categorysArray.forEach(category => {
        let eventosCategorys = response.filter(event => event.category == category);
        let revenues = eventosCategorys.map(event => { return event.estimate * event.price }).reduce((acumulado, actual) => acumulado + actual);
        let EstimateTotal = eventosCategorys.map(event => event.estimate).reduce((acumulado, actual) => acumulado + actual);
        let capacityTotal = eventosCategorys.map(event => event.capacity).reduce((acumulado, actual) => acumulado + actual);
        
        let percentOfAsistence = (EstimateTotal / capacityTotal)*100
        
        
        
        let fila = categorysUp.insertRow(filas[2].rowIndex);
        let celda1 = fila.insertCell();
        let celda2 = fila.insertCell();
        let celda3 = fila.insertCell();
        celda1.innerHTML = category;
        celda2.innerHTML = revenues.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        celda3.innerHTML = percentOfAsistence.toFixed(0)+'%';
    })
} loadStatsUp(url)

import getDataFetch from "../../helpers/getData.js";

const urlData = 'https://pro-talento.up.railway.app/api/amazing?time=past'


document.addEventListener("DOMContentLoaded", async () => {
    const statsPast = document.getElementById("pasados");
    let {response} = await getDataFetch(urlData);
    let allEvents = response;
    let categorias = [...new Set(allEvents.map(category => category.category))]//modifico el arreglo solo a categorias para mostrarlo en la tabla
    console.log(categorias)
    categorias.forEach((category)=> { 
        statsPast.innerHTML += `<tr>
        <td>${category}</td>
        <td></td>
        <td></td>
        </tr>`;

    }) 
})

