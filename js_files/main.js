//CAPTURA DOM
let validZonesCards = document.getElementById("validZonesCards")


//FUNCTIONS: 

function showZones(array){
    validZonesCards.innerHTML = ""
    for(let zone of array){
        console.log(zone)
        let newZoneCard = document.createElement("div")
        newZoneCard.className = "col-12 col-md-6 col-lg-4 my-2"
        newZoneCard.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="./images/${zone.image}" class="card-img-top" alt="image of ${zone.name}">
            <div class="card-body">
            <h5 class="card-title">${zone.name}</h5>
            <p class="card-text">Precio: ${zone.price}</p>
            <button id="selectTogle${zone.name}" class="btn btn-primary">Add to selection</button>
            </div>
        </div>`
        validZonesCards.append(newZoneCard)
    }
}

//CÓDIGO
showZones(validZones)