let categorysUp = document.getElementById('tableBody');
let url = 'https://pro-talento.up.railway.app/api/amazing?time=upcoming';
let api = "";

async function loadStatsUp(url) {
    let upComing = document.getElementById("upComing");
    let response = await fetch(url);
    response = await response.json()
    response = response.response;
    // console.log(response);
    let categorysArray = [...new Set(response.map(event => event.category))];
    let filas = categorysUp.rows;
    // console.log(filas);

    categorysArray.forEach(category => {
        let eventosCategorys = response.filter(event => event.category == category);
        let revenues = eventosCategorys.map(event => { return event.estimate * event.price }).reduce((acumulado, actual) => acumulado + actual);
        let EstimateTotal = eventosCategorys.map(event => event.estimate).reduce((acumulado, actual) => acumulado + actual);
        let capacityTotal = eventosCategorys.map(event => event.capacity).reduce((acumulado, actual) => acumulado + actual);
        
        let percentOfAsistence = (EstimateTotal / capacityTotal)*100
    
        upComing.innerHTML += `
         <tr>
         <td>${category}</td>
        <td> ${revenues.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
        <td>${percentOfAsistence.toFixed(0)+'%'}</td>
        </tr>`;
    })
} loadStatsUp(url)

const urlData = 'https://pro-talento.up.railway.app/api/amazing?time=past'

async function statsPast (urlData) {
    const statsPast = document.getElementById("pasados");
    let response = await fetch(urlData);
    response = await response.json();
    response = response.response
    let allEvents = response;
    let categorias = [...new Set(allEvents.map(category => category.category))]//modifico el arreglo solo a categorias para mostrarlo en la tabla
    // console.log(categorias)
    categorias.forEach((category)=> {
        let categoriasAgrupadas = allEvents.filter( each => each.category == category);
        let ingresosPorCategoria = categoriasAgrupadas.map(each => each.price*each.assistance).reduce((acumulador,valor)=>acumulador+valor);
        let totalAsitencia = categoriasAgrupadas.map(each => each.assistance*100).reduce((acumulador, valor)=>acumulador+valor);
        let totalCapacidad = categoriasAgrupadas.map(each => each.capacity).reduce((acumulador, valor)=>acumulador+valor);
        let porcentajePorCategoria = totalAsitencia / totalCapacidad;
        // console.log(porcentajePorCategoria)
        statsPast.innerHTML += `<tr>
        <td>${category}</td>
        <td>${ingresosPorCategoria.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
        <td>${porcentajePorCategoria.toFixed(0)+'%'}</td>
        </tr>`;

    }) 
}
statsPast (urlData)

async function EventsStats(api) {
    let response = await fetch(api).then(response => response.json());
        response = response.response;
        const hatendance = response.reduce((ac, actual) => (ac.assistance/ac.capacity > actual.assistance/actual.capacity) ? ac : actual);
        const latendance = response.reduce((ac, actual) => (ac.assistance/ac.capacity < actual.assistance/actual.capacity) ? ac : actual);
        api = "https://pro-talento.up.railway.app/api/amazing";
        response = await fetch(api).then(response => response.json());
        response = response.response;
        const lcapacity = response.reduce((maximo, evento) => (maximo.capacity > evento.capacity) ? maximo : evento);
        // console.log(lcapacity.capacity.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }));
        let content = document.getElementById('main-view');
        content.innerHTML = `
        <td>${hatendance.name+" - "+((hatendance.assistance*100)/hatendance.capacity).toFixed(0)+'%'}</td>
        <td>${latendance.name+" - "+((latendance.assistance*100)/latendance.capacity).toFixed(0)+'%'}</td>
        <td>${lcapacity.name+" - "+lcapacity.capacity+" "+"Aforo"}</td>
        `;    
} EventsStats(urlData)

