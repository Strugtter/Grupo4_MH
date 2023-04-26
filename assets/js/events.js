const content = document.getElementById("swiper-wrapper");//se cambia la id para poder guardar las card en el swiper
let allEvents = fetchApi();

function loadItems(allEvents) {
  const content = document.getElementById("swiper-wrapper");//se cambia la id para poder guardar las card en el swiper
  content.innerHTML = "";
  for (let i = 0; i < allEvents.length; i++) {
    if (!allEvents[i]) {
      break;
    }
    const id = allEvents[i].id;
    const name = allEvents[i].name;
    const img = allEvents[i].image;
    const desc = allEvents[i].description;
    const price = allEvents[i].price;

    content.innerHTML += `
    <div class="swiper-slide">
        <div class="col-lg-10 col-sm-8 ">
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
                            <a href="../pages/details.html?id=${id}" class="btn btn-primary float-right">View details</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>`;
  }
}
//control del swiper
let swiper = new Swiper(".slide-content", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 10,
  grabCursor: 'true',
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: {
      540: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 40 },
      820: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 40 },
      1240: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 40 },
  }
});

async function fetchApi() {
  try {
    let url = "https://pro-talento.up.railway.app/api/amazing";
    let response = await fetch(url);
    response = await response.json();
    console.log(response.response);
    loadItems(response.response);
    document
      .getElementById("buscarBoton")
      .addEventListener("click", filterData);
  } catch (error) {
    console.log(error);
  }
}
fetchApi();

createChecks("https://pro-talento.up.railway.app/api/amazing");

async function createChecks(url) {
  let response = await fetch(url);
  response = await response.json();
  const contenedorCategorias = document.getElementById("contenedorCategorias");
  const categorias = [];
  for (let i = 0; i < response.response.length; i++) {
    const categoria = response.response[i].category;
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
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", filterData);
  }
}

async function filterData() {
  try {
    let texto = document
      .getElementById("buscarInput")
      .value.toLowerCase()
      .trim();
    let categoria = [...document.querySelectorAll("#filtroCheck:checked")]
      .map((each) => each.value)
      .join(",");
    let url = `https://pro-talento.up.railway.app/api/amazing/?name=${texto}&category=${categoria}`;
    let response = await fetch(url);
    response = await response.json();
    loadItems(response.response);
    if (response.response.length == 0) {
      content.innerHTML = `Su busqueda no coincide con nuestros eventos, por favor vuelva a intentarlo.`;
    } else {
      loadItems(response.response);
    }
  } catch (error) {
    console.log(error);
  }
}
