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
        <div id="cardToggle${zone.name}" class="card" style="width: 18rem;">
            <img src="./images/${zone.image}" class="card-img-top" alt="image of ${zone.name}">
            <div class="card-body">
            <h5 class="card-title">${zone.name}</h5>
            <p class="card-text">Precio: ${zone.price}</p>
            <button id="selectToggle${zone.name}" class="btn btn-primary">Add to selection</button>
            </div>
        </div>`
        validZonesCards.append(newZoneCard)

        const selectToggleBtn = newZoneCard.querySelector(`#selectToggle${zone.name}`);
        const cardBody = newZoneCard.querySelector(`#cardToggle${zone.name}`);
        selectToggleBtn.addEventListener("click", () => toggleButtonText(selectToggleBtn, cardBody));
    }
}

function toggleButtonText(button, card) {
    if (button.innerText === "Add to selection") {
        button.innerText = "Remove from selection";
        button.classList.remove("btn-primary");
        button.classList.add("btn-danger");
        card.classList.remove("border-primary");
        card.classList.add("border-success");
    } else {
        button.innerText = "Add to selection";
        button.classList.remove("btn-danger");
        button.classList.add("btn-primary");
        card.classList.remove("border-success");
        card.classList.add("border-primary");
    }
}

//CÓDIGO
showZones(validZones)