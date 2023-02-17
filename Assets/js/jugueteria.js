import { getData, createCards, filterProducts, writeSponsors, createCarru, createShopping, orderProducts } from "./module/functions.js";

const container = document.getElementById("card-container")
const searchBar = document.getElementById("search-bar")
const shopping = document.getElementById("cart")
const carrito = document.getElementById("btn-car")
const modalCarrito = document.getElementById("modal-content")
const prueba = document.getElementsByClassName("btn-heart")

let products = JSON.parse(localStorage.getItem("products")) || [] // trae del local storage los productos que fueron agregados al carrito
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

localStorage.setItem("products", JSON.stringify(products))

let precioTotal = 0
//products.forEach(product => precioTotal += product.precio)
createShopping(products,shopping)

let data = getData()
data.then((response) => {
    if (!JSON.parse(localStorage.getItem("toys"))) {
        let items = response.filter((product) => product.categoria === "jugueteria") // guarda en items los productos con categoria "jugueteria" traidos del fetch
        localStorage.setItem("toys", JSON.stringify(items)) // crea una propiedad en localStorage donde la key es "toys" y el value son todos los items
    }
})

let toys = JSON.parse(localStorage.getItem("toys")) || [] // toma el value de la key "toys" en el localStorage y lo guarda en la variable toys
createCards(toys, container, "")

toys.forEach(toy => {
    favoritos.forEach(fav => {
        if(toy._id == fav._id){
            let asd = Array.from(prueba).filter(e => e.firstElementChild.children[0].id == toy.producto)
            asd[0].children[0].children[0].classList.replace("black", "redPath")
        }
    })
})

searchBar.addEventListener("keyup", (e) => {
    let filteredToys = filterProducts(toys, e.target.value.toLowerCase())
    createCards(filteredToys, container, e.target.value.toLowerCase())
})

container.addEventListener("click", (e) => {
    if (e.target.localName === "button") {
        let pressToy = toys.find(toy => toy._id == e.target.id)
        if (pressToy.disponibles > 0) {
            for (let toy of toys) {
               if (toy == pressToy) {
                   let i = toys.indexOf(toy)
                   pressToy.disponibles--

                   toys[i] = pressToy
                   localStorage.setItem("toys", JSON.stringify(toys)) // se actualiza la propiedad del localStorage, para que cuando recargues la pag no se vuelva a la info antigua
                   let unidades = document.getElementById(`unidades-${pressToy._id}`)
                   unidades.textContent = `${pressToy.disponibles} unidades` // toma el id de <p> y le cambia el textContent
               }
            }
            
            products.push(pressToy)
            localStorage.setItem("products", JSON.stringify(products)) // actualiza el valor de la key "products" en el localStorage
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya no hay stock disponible',
            })
        }
    }
    else if (e.target.offsetParent && e.target.offsetParent.className == "card producto") { //si existe un parent y ese parent tiene className card y producto
        let modal = e.target.offsetParent.nextElementSibling // el elemento que le sigue al parent, en este caso el modal
        modal.addEventListener("click", (e) => {
            if (e.target.className.includes("modal-container")) {
                createCards(toys, container, "") //cuando se clickee afuera del modal se actualizan las cards
            }
        })
    }
    else if(e.target.localName == "path"){
        if(favoritos.some( fav => fav.producto == e.target.id) ){
            favoritos = favoritos.filter( fav => fav.producto != e.target.id )
            e.target.classList.replace("redPath", "black")
            localStorage.setItem( 'favoritos', JSON.stringify( favoritos ) )
        }else{
            favoritos.push(toys.find( producto => producto.producto == e.target.id ))
            e.target.classList.replace("black", "redPath")
            localStorage.setItem( 'favoritos', JSON.stringify( favoritos ) )
        }

    }
    console.log([e.target])
})

carrito.addEventListener("click", (e) => {
    precioTotal = 0
    products.forEach(product => precioTotal += product.precio)
    createShopping(products,shopping,precioTotal) // actualiza el modal del carrito

    modalCarrito.addEventListener("click", (e) => {
        if (e.target.className.includes("garbage")) {
            let id = e.target.id
            toys.forEach((toy,i) => {
                if (toy._id == id) {         
                    let finalProduct = products.find( product => product._id == toy._id)           
                    let position = products.findIndex( product => product == finalProduct )         
                    products.splice(position,1)
                    localStorage.setItem("products", JSON.stringify(products))

                    toy.disponibles++
                    
                    localStorage.setItem("toys", JSON.stringify(toys))
                }
            })

            precioTotal = 0
            products.forEach(product => precioTotal += product.precio)
            createShopping(products,shopping,precioTotal) 

        }else if(e.target.id == "eliminar"){
            toys.forEach(toy => {
                products.forEach(product => {
                    if(product._id == toy._id){
                        toy.disponibles++
                    }
                })
            })
            localStorage.setItem("toys", JSON.stringify(toys))
            products = []
            localStorage.setItem("products", JSON.stringify(products))
            precioTotal = 0
            createShopping(products,shopping,precioTotal)

        }else if(e.target.id == "comprar"){
            products = []
            localStorage.setItem("products", JSON.stringify(products))
            precioTotal = 0
            createShopping(products,shopping,precioTotal)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Compra realizada con exito',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
    
    let modal = document.getElementById("staticBackdrop") // el elemento que le sigue al parent, en este caso el modal
    modal.addEventListener("click", (e) => {
        if (e.target.className.includes("modal-container")) {
            createCards(toys, container, "") //cuando se clickee afuera del modal se actualizan las cards
        }
        
    })
})


let slideTrack = document.getElementById("slide-track")

let array = ["dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png", "dog-chow.png", "dog-selection.png", "dogui.png", "kongo.jpg", "pedigree.png", "proplan.png", "royal-canin.png", "sabrocitos.png", "whiscas.png"]

writeSponsors(array, slideTrack)

let slide = document.getElementById("slide")

let array2 = ["dog.jpg", "pexels-adam-kontor-333083.jpg", "pexels-kat-smith-551628.jpg", "dog-ball.jpg", "carpincho.jpg"]

createCarru(array2, slide)



// PARA BORRAR ITEMS DEL CARRITO
// if( products.some( product => product._id == e.target.id) ){
//     products = products.filter( (product) => product._id != e.target.id)
//     localStorage.setItem("products", JSON.stringify(products))
// }