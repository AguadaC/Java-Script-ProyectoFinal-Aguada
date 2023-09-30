// CAPTURA DOM
let validZonesCards = document.getElementById("validZonesCards")
let selectOrder = document.getElementById("selectOrder")
let paymentButton = document.getElementById("paymentBtn")
let modalBodyPayment = document.getElementById("modal-bodyCarrito")
let totalPrice = document.getElementById("totalPrice")
let search = document.getElementById("search")
let itemsFound = document.getElementById("itemsFound")


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

        const selectToggleBtn = newZoneCard.querySelector(`#selectToggle${zone.name}`);
        const cardBody = newZoneCard.querySelector(`#cardToggle${zone.name}`);

        //Chequeo si esta seleccionado
        let exist = selectedZones.filter(
            (element) => element.name == zone.name
        )
        //Si esta seleccionado le cambio el estilo
        if (exist.length != 0) {
            toggleStyle(selectToggleBtn, cardBody)
        }
        validZonesCards.append(newZoneCard)
        //Si cliqueo alli, debo agregarlo o desagregarlo de la lista y cambiar el estilo
        selectToggleBtn.addEventListener("click",
         () => {
            toggleStyle(selectToggleBtn, cardBody);
            addRemoveZone(zone);
            }
        );
    }
}
function toggleStyle(button, card) {
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
function addRemoveZone(zone) {
    //Chequeo si esta seleccionado
    let exist = selectedZones.filter(
        (element) => element.name == zone.name
    )
    //Si esta seleccionado le cambio el estilo
    if (exist.length == 0) {
        selectedZones.push(zone);
        console.log("Zona agregada")
    } else {
        let selectedZones_aux = selectedZones.filter(
            element => element.name !== zone.name
        )
        selectedZones.splice(0)
        for (zone_aux of selectedZones_aux){
            selectedZones.push(zone_aux)
        }
        console.log("Zona removida")
    }

    localStorage.setItem("selectedZones", JSON.stringify(selectedZones))
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


function takeSale(selectedZones, validCombos){
    // devuelve el combo de mayor precio que se encuentra en el pedido
    const zonaNames = selectedZones.map(zone => zone.name);

    validCombos.sort((a, b) => b.price - a.price);

    for (let combo of validCombos) {
        let comboZones = combo.get_combo_name().split("-");
        if (comboZones.every(comboZone => zonaNames.includes(comboZone))){
            console.log(`Se enontro el combo: ${comboZones}`)
            return combo
        }
    }
    console.log("No hay combo valido detectado")
    return "No hay combo valido detectado"
}
function payment(selectedZones){
    // muestra cuanto debemos pagar
    let totalPrecioIndividual = 0;
    for (let zona of selectedZones) {
        if (zona.get_area_price()) {
            totalPrecioIndividual += zona.get_area_price();
        }
    }
    return totalPrecioIndividual
}
function recalcPayment(selectedZones, comboSeleccionado){
    //detecta si hay un combo y hace un recalculo del precio
    let combinedPrice = 0
    let zones_aux_copy = selectedZones.slice()
    if (typeof comboSeleccionado !== 'string' &&
        validCombos.find(
            combo => combo.get_combo_name() === comboSeleccionado.get_combo_name()
        )){
        console.log(`Combo validado: ${comboSeleccionado.get_combo_name()}`)

        combinedPrice = comboSeleccionado.get_combo_price()
        for (let comboElementName of comboSeleccionado.get_combo_name().split("-")){
            let index
            objectZone = zones_aux_copy.find(zone => zone.get_area_name() === comboElementName)
            if (objectZone != undefined){
                index = zones_aux_copy.indexOf(objectZone)
                zones_aux_copy.splice(index, 1);
            } else {
                console.log(`Cuidado, un elemento del combo no fue encontrado: ${comboElementName}`)
            }
        }
    } else {
        console.log(`No posee descuento por combo.`)
    }

    combinedPrice = parseInt(combinedPrice) + parseInt(payment(zones_aux_copy))
    console.log(`Precio combinado: ${combinedPrice}`)
    return combinedPrice
}

function uploadDetail(array){
    modalBodyPayment.innerHTML = ""
    array.forEach(
        (productoCarrito) => {
            modalBodyPayment.innerHTML += `
            <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.name}" style="max-width: 540px;">
                 <div class="card-body">
                        <h4 class="card-title">${productoCarrito.name}</h4>
                        <p class="card-text">$${productoCarrito.price}</p> 
                 </div>
            </div>
            `
        }
    )
}

function searchZones(search, array){
    let itemsFound = array.filter(
        (zone) => zone.name.toLowerCase().includes(search.value.toLowerCase())
    )
    console.log(itemsFound)
    itemsFound.length > 0 ? (showZones(itemsFound), itemsFound.innerText ="") : (showZones(array), itemsFound.innerText = `Pruebe introduciendo otra zona`) 
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

paymentButton.addEventListener("click", () => {
    console.log("Pagando")
    uploadDetail(selectedZones)
    comboSeleccionado = takeSale(selectedZones, validCombos)
    totalToPay = recalcPayment(selectedZones, comboSeleccionado, validZones)
    totalToPay > 0 ? totalPrice.innerHTML = `<strong>El total de su compra es: ${totalToPay}</strong>` : totalPrice.innerHTML = `No hay productos en el carrito` 
})

search.addEventListener("input", ()=> {
    searchZones(search, validZones)
}
)
// CÓDIGO
showZones(validZones)