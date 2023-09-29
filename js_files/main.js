// CAPTURA DOM
let validZonesCards = document.getElementById("validZonesCards")
let selectOrder = document.getElementById("selectOrder")


// FUNCTIONS: 

function showZones(array){
    validZonesCards.innerHTML = ""
    for(let zone of array){
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
        card.classList.add("border-success");
    } else {
        button.innerText = "Add to selection";
        button.classList.remove("btn-danger");
        button.classList.add("btn-primary");
        card.classList.remove("border-success");
    }
}

function priceDesc(array){
    //copiar array: 
    let arrayMayorMenor = array.concat()
    
     arrayMayorMenor.sort(
        (par1,par2) => par2.price - par1.price
    )
    showZones(arrayMayorMenor)
}
function priceAsc(ar){
    let arrMenor = ar.concat()
    arrMenor.sort(
        //menor a mayor
        (a, b) => a.price - b.price
    )
    showZones(arrMenor)
}
function abcOrder(array){
    let ordenadoAlf = array.concat()
    ordenadoAlf.sort(
        (a,b) => {
            if(a.name > b.name){
                return 1
            }
            if(a.name < b.name){
                return -1
            }
            //no es ni mayor ni menor
            return 0
        }
    )
    showZones(ordenadoAlf)
}

// EVENTOS
selectOrder.addEventListener("change", () => {
    console.log(selectOrder.value)
    switch(selectOrder.value){
        case "1":
            priceDesc(validZones)
        break
        case "2":
            priceAsc(validZones)
        break
        case "3":
            abcOrder(validZones)
        break
        default:
            showZones(validZones)
        break
    }
})

// CÓDIGO
showZones(validZones)