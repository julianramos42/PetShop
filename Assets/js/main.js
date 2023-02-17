import { getData, createCarruHome,writeSponsorsHome} from './module/functions.js'

let data = getData()
data.then((response) => {
    if (!JSON.parse(localStorage.getItem("toys"))) {
        let toys = response.filter((product) => product.categoria === "jugueteria") // guarda en toys los productos con categoria "jugueteria" traidos del fetch
        localStorage.setItem("toys", JSON.stringify(toys)) // crea una propiedad en localStorage donde la key es "toys" y el value son todos los items
        let pharmacyProducts = response.filter((product) => product.categoria === "farmacia")
        localStorage.setItem("pharmacyProducts", JSON.stringify(pharmacyProducts))
    }
})

let slide = document.getElementById("slide")

let array2 = ["dog.jpg","pexels-adam-kontor-333083.jpg","pexels-kat-smith-551628.jpg","dog-ball.jpg"]

createCarruHome(array2,slide)

let slideTrack = document.getElementById("slide-track")

let array = ["dog-chow.png","dog-selection.png","dogui.png","kongo.jpg","pedigree.png","proplan.png","royal-canin.png","sabrocitos.png","whiscas.png","dog-chow.png","dog-selection.png","dogui.png","kongo.jpg","pedigree.png","proplan.png","royal-canin.png","sabrocitos.png","whiscas.png"]

writeSponsorsHome(array, slideTrack)