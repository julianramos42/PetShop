import { getData, createCards, filterProducts,writeSponsors,createCarru } from "./module/functions.js";

const container = document.getElementById("card-container")
const searchBar = document.getElementById("search-bar")

let data = getData()
data.then( (response) => {
    let toys = response.filter( (product) => product.categoria === "jugueteria")
    createCards(toys,container,"")

    searchBar.addEventListener( "keyup", (e) => {
        let filteredToys = filterProducts(toys, e.target.value.toLowerCase())
        createCards(filteredToys,container,e.target.value.toLowerCase())
    })
})


let slideTrack = document.getElementById("slide-track")

let array = ["dog-chow.png","dog-selection.png","dogui.png","kongo.jpg","pedigree.png","proplan.png","royal-canin.png","sabrocitos.png","whiscas.png","dog-chow.png","dog-selection.png","dogui.png","kongo.jpg","pedigree.png","proplan.png","royal-canin.png","sabrocitos.png","whiscas.png"]

writeSponsors(array, slideTrack)

let slide = document.getElementById("slide")

let array2 = ["dog.jpg","pexels-adam-kontor-333083.jpg","pexels-kat-smith-551628.jpg","dog-ball.jpg","carpincho.jpg"]

createCarru(array2,slide)