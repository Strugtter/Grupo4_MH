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