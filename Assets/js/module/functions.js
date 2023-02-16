export async function getData() {
  try {
      const response = await fetch("https://mindhub-xj03.onrender.com/api/petshop")
      const data = await response.json()
      return data
  }
  catch (error) {
      console.log(`Error: ${error}`)
  }
}

export function createCards(list, container,formulario) {
  container.innerHTML = ""
  let aux = ""
  if(list.length === 0){
    noEncontrado(container,formulario)
  }else{

    for (let element of list) {
        aux += writeCard(element)
    }
    container.innerHTML += aux
  }
}

export function writeCard(element) {
  let color = element.disponibles < 5 ? "red" : "green";
  return `
    <div class="card" style="width: 18rem;">
        <div>
            <img src="${element.imagen}"class="card-img-top tam_img_card" alt="${element.producto}">
            <button class="favorite-btn"><img src="../img/heart.png" class="img-heart" alt="heart"></button>
        </div>
        <div class="card-body ">
            <div class="cont-stock d-flex flex-column">
                <p class="card-text"><b>Price: $${element.precio}</b></p>
                <p class=" ${color} text-center stock"><b>Stock</b></p>
                <h5 >${element.producto}</h5>
            </div>
            <div class="cont-unidad d-flex justify-content-end align-items-end">
                <p>${element.disponibles} Unidades</p>
            </div>
        </div>
    </div>
    `
}


export function filterProducts(products, value){
  return products.filter( (product) => product.producto.toLowerCase().includes(value))
}

export function writeSponsors(list, container){
    for(let i=0; i<18; i++){
      container.innerHTML+=`
        <div class="cont-slide">
          <img src="../img/${list[i]}" alt="">
        </div>
      `
    }
}

export function writeSponsorsHome(list, container){
  for(let i=0; i<18; i++){
    container.innerHTML+=`
      <div class="cont-slide">
        <img src="./Assets/img/${list[i]}" alt="">
      </div>
    `
  }
}

export function createCarru(list, container){
  
    container.innerHTML+=`
      <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src="../img/${list[0]}" class="d-block w-100 border1" alt="${list[0]}">
                      </div>
                      <div class="carousel-item">
                        <img src="../img/${list[1]}" class="d-block w-100 border1" alt="${list[1]}">
                      </div>
                      <div class="carousel-item">
                        <img src="../img/${list[2]}" class="d-block w-100 border1" alt="${list[2]}">
                      </div>
                      <div class="carousel-item">
                        <img src="../img/${list[3]}" class="d-block w-100 border1" alt="${list[3]}">
                      </div>
                      <div class="carousel-item">
                        <img src="../img/${list[4]}" class="d-block w-100 border1" alt="${list[4]}">
                      </div>
                    </div>
    `
  
}
export function createCarruHome(list, container){
  
  container.innerHTML+=`
    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src="./Assets/img/${list[0]}" class="d-block w-100 border1" alt="${list[0]}">
                      </div>
                      <div class="carousel-item">
                        <img src="./Assets/img/${list[1]}" class="d-block w-100 border1" alt="${list[1]}">
                      </div>
                      <div class="carousel-item">
                        <img src="./Assets/img/${list[2]}" class="d-block w-100 border1" alt="${list[2]}">
                      </div>
                      <div class="carousel-item">
                        <img src="./Assets/img/${list[3]}" class="d-block w-100 border1" alt="${list[3]}">
                      </div>
                      <div class="carousel-item">
                        <img src="./Assets/img/${list[4]}" class="d-block w-100 border1" alt="${list[4]}">
                      </div>
                    </div>
  `
}

export function noEncontrado(container,formulario){
  container.innerHTML = `<div class="style-mens">
  <h5>No ha sido posible encontrar nada para "${formulario}".</h5>
  <h5>Prueba a detallar tu búsqueda.</h5>
  <img src="../img/cinnamon.png" alt="perro">
  </div>`
  
}

