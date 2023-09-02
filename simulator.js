console.log("Linkeado...");

let proceed;
let confirmation = "Si"
let exitMenu = false

const validZones = {
    "BOZO": 600,
    "ROSTRO_COMPLETO": 1500,
    "MENTON_BOZO": 800,
    "NUCA": 800,
    "ESPALDA": 1500,
    "MEDIA_ESPALDA": 900,
    "PECHO": 900,
    "AXILA": 1000,
    "ABDOMEN": 900,
    "BRAZO_COMPLETO": 1500,
    "MEDIO_BRAZO": 900,
    "CAVADO": 1500,
    "TIRO": 800,
    "GLUTEOS": 1000,
    "LINEA_ALBA": 600,
    "PIERNA_COMPLETA": 2000,
    "MEDIA_PIERNA": 1500,
    "EMPEINE_DEDOS": 800,
    "BARBA": 1200
};

const validCombos = {
    "AXILA-CAVADO-TIRO-PIERNA_COMPLETA": 3200,
    "AXILA-CAVADO-TIRO-MEDIA_PIERNA": 2500,
    "AXILA-CAVADO-TIRO": 1600,
    "AXILA-CAVADO": 1400,
    "AXILA-BOZO": 1000
};

let zones = Object.keys(validZones);
let combos = Object.keys(validCombos);
let selectedZones = []

proceed = prompt(`Bienvenido.\nSi quiere calcular el costo de su sesión,\nIndique: ${confirmation}`)

if (proceed.toLowerCase() === "si") {
    console.log("Comenzando...")
    do{
        let opcionIngresada = parseInt(prompt(`Ingrese la opción deseada
           1 - Seleccionar zona.
           2 - Quitar zona
           3 - Ver zonas elegidas.
           4 - Ver combos.
           5 - Pagar.
           0 - Salir del menu`))

           if (isNaN(opcionIngresada)){
            console.log("Selección no válida. Por favor, elige un número válido.");
            continue;
           }

           switch(opcionIngresada){
              case 1:
                console.log("Opción uno")
                addZoneFromTo(zones, selectedZones)
              break
              case 2:
                console.log("Opción dos")
                addZoneFromTo(selectedZones, zones)
              break
              case 3:
                console.log("Opción tres")
                showAvailableZones(selectedZones)
              break
              case 4:
                console.log("Opción cuatro")
                showAvailableCombos(combos)
              break
              case 5:
                console.log("Opción cinco")
                alert("Recomendamos revisar los combos, para obtener descuentos.")
                let precioSinCombo
                precioSinCombo = payment(selectedZones, validZones)
                console.log(`El precio de zonas indiciduales es ${precioSinCombo}`)
                comboSeleccionado = takeSale(selectedZones, validCombos)
                recalcPayment(selectedZones, comboSeleccionado, validZones)
              break
              case 0:
                 console.log(`Gracias por utilizar nuestra app. Saludos!`)
                 exitMenu = true
              break   
              default:
                 console.log("Opción no válida, ingrese alguna presente en el menu")
              break
           }
        }while(!exitMenu)
} else {
    alert("Adios.");
}

function addZoneFromTo(zones, selectedZones){
    //agrega una zona a la seleccion
    let elemnt2add = selectZone(zones)
    selectedZones.push(elemnt2add);
}

function selectZone(zones){
    //devuelve la zona a agregar
    let indexZone = selectIndex(zones)
    const elementoAMover = zones.splice(indexZone, 1)[0];
    console.log(`Eligió Zona: ${elementoAMover}`)
    return elementoAMover
}

function selectIndex(zones){
    // selecciona un indice valido dentro de las zonas y lo retorna
    let zonaElegidaIndex
    while(true){
        zonaElegidaIndex = prompt(`Elige una zona:\n${zones.map((zona, index) => `${index + 1}. ${zona}`).join("\n")}`);
        zonaElegidaIndex = parseInt(zonaElegidaIndex) - 1

        if (isNaN(zonaElegidaIndex) || zonaElegidaIndex < 0 || zonaElegidaIndex >= zones.length) {
            console.log("Selección no válida. Por favor, elige un número válido.")
        } else {
            console.log(`Eligió Indice: ${zonaElegidaIndex + 1}`)
            break
        }
    }
    return zonaElegidaIndex
}

function showAvailableZones(selectedZones){
    // muestra las zonas elegidas
    alert(`Zonas Elegidas:\n${selectedZones.map((zona, index) => `${index + 1}. ${zona}`).join("\n")}`);
}

function showAvailableCombos(combos){
    // muestra los combos
    alert(`Zonas Elegidas:\n${combos.map((combo, index) => `${index + 1}. ${combo}`).join("\n")}`);
}

function payment(selectedZones, validZones){
    // muestra cuanto debemos pagar
    let totalPrecioIndividual = 0;
    for (let zona of selectedZones) {
        if (validZones[zona]) {
            totalPrecioIndividual += validZones[zona];
        }
    }
    return totalPrecioIndividual
}

function takeSale(selectedZones, validCombos){
    // devuelve el combo de mayor precio que se encuentra en el pedido
    for (let combo in validCombos) {
        let combozones = combo.split("-");
        if (combozones.every(zona => selectedZones.includes(zona))){
            console.log(`Se enontro el combo: ${combozones}`)
            return combo
        }
    }
    console.log("No hay combo valido detectado")
    return "No hay combo valido detectado"
}

function recalcPayment(selectedZones, comboSeleccionado, validZones){
    //detecta si hay un combo y hace un recalculo del precio
    let precioCombinado = 0
    let zones = selectedZones.slice()
    if (validCombos[comboSeleccionado]){
        console.log(`Combo validado: ${comboSeleccionado}`)

        precioCombinado = validCombos[comboSeleccionado]
        for (let combo of comboSeleccionado.split("-")){
            let index = zones.indexOf(combo)

            if (index !== -1) {
                zones.splice(index, 1);
            }
        }
    } else {
        console.log(`Error en el combo seleccionado: ${comboSeleccionado}`)
    }

    precioCombinado = parseInt(precioCombinado) + parseInt(payment(zones, validZones))
    console.log(`Precio combinado: ${precioCombinado}`)
    alert(`Precio combinado: ${precioCombinado}`)
    return precioCombinado

}