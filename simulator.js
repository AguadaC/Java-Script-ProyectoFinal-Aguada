console.log("Linkeado...");

let proceed;
let confirmation = "Si"
let exitMenu = false

// Clases
class BodyArea{

    constructor(name, price){
        this.name = name,
        this.price = price
    }

    get_area_name(){
        return this.name
    }

    get_area_price(){
        return this.price
    }
}

class Combo {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    get_combo_name() {
        return this.name;
    }

    get_combo_price() {
        return this.price;
    }
}

// Genero todos los objetos que antes declaraba en un simple diccionario
// Zonas
const area_bozo = new BodyArea("BOZO", 600);
const area_rostro_completo = new BodyArea("ROSTRO_COMPLETO", 1500);
const area_menton_bozo = new BodyArea("MENTON_BOZO", 800);
const area_nuca = new BodyArea("NUCA", 800);
const area_espalda = new BodyArea("ESPALDA", 1500);
const area_media_espalda = new BodyArea("MEDIA_ESPALDA", 900);
const area_pecho = new BodyArea("PECHO", 900);
const area_axila = new BodyArea("AXILA", 1000);
const area_abdomen = new BodyArea("ABDOMEN", 900);
const area_brazo_completo = new BodyArea("BRAZO_COMPLETO", 1500);
const area_medio_brazo = new BodyArea("MEDIO_BRAZO", 900);
const area_cavado = new BodyArea("CAVADO", 1500);
const area_tiro = new BodyArea("TIRO", 800);
const area_gluteos = new BodyArea("GLUTEOS", 1000);
const area_linea_alba = new BodyArea("LINEA_ALBA", 600);
const area_pierna_completa = new BodyArea("PIERNA_COMPLETA", 2000);
const area_media_pierna = new BodyArea("MEDIA_PIERNA", 1500);
const area_empeine_dedos = new BodyArea("EMPEINE_DEDOS", 800);
const area_barba = new BodyArea("BARBA", 1200);

// Combos
const combo_a = new Combo("AXILA-CAVADO-TIRO-MEDIA_PIERNA", 2500);
const combo_b = new Combo("AXILA-CAVADO-TIRO", 1600);
const combo_c = new Combo("AXILA-CAVADO", 1400);
const combo_d = new Combo("AXILA-BOZO", 1000);
const combo_e = new Combo("AXILA-CAVADO-TIRO-PIERNA_COMPLETA", 3200);

// Arrays contenedores
const validZones = []
validZones.push(
    area_bozo,
    area_rostro_completo,
    area_menton_bozo,
    area_nuca,
    area_espalda,
    area_media_espalda,
    area_pecho,
    area_axila,
    area_abdomen,
    area_brazo_completo,
    area_medio_brazo,
    area_cavado,
    area_tiro,
    area_gluteos,
    area_linea_alba,
    area_pierna_completa,
    area_media_pierna,
    area_empeine_dedos,
    area_barba
);
validZones.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
});

const validCombos = []
validCombos.push(combo_a, combo_b, combo_c, combo_d, combo_e);

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
                addZoneFromTo(validZones, selectedZones)
              break
              case 2:
                console.log("Opción dos")
                addZoneFromTo(selectedZones, validZones)
              break
              case 3:
                console.log("Opción tres")
                showAvailableZones(selectedZones)
              break
              case 4:
                console.log("Opción cuatro")
                showAvailableCombos(validCombos)
              break
              case 5:
                console.log("Opción cinco")
                alert("Recomendamos revisar los combos, para obtener descuentos.")
                let precioSinCombo
                precioSinCombo = payment(selectedZones, validZones)
                console.log(`El precio de zonas individuales es ${precioSinCombo}`)
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
    if(elemnt2add != null) selectedZones.push(elemnt2add);
}

function selectZone(zones){
    //devuelve la zona a agregar
    let indexZone = selectIndex(zones)
    if (indexZone == undefined) return null
    const elementoAMover = zones.splice(indexZone, 1)[0];
    console.log(`Eligió Zona: ${elementoAMover.get_area_name()}`)
    return elementoAMover
}

function selectIndex(zones){
    // selecciona un indice valido dentro de las zonas y lo retorna
    let zonaElegidaIndex
    while(true){

        if (!zones.length){
            alert("Ya no hay zonas para seleccionar. Elija otras opciones.")
            break
        }

        zonaElegidaIndex = prompt(`Elige una zona:\n${zones.map((zona, index) => `${index + 1}. ${zona.get_area_name()}`).join("\n")}`);
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
    alert(`Zonas Elegidas:\n${selectedZones.map((zona, index) => `${index + 1}. ${zona.get_area_name()} - $ ${zona.get_area_price()}`).join("\n")}`);
}

function showAvailableCombos(combos){
    // muestra los combos
    alert(`Zonas Elegidas:\n${combos.map((combo, index) => `${index + 1}. ${combo.get_combo_name()}`).join("\n")}`);
}

function payment(selectedZones, validZones){
    // muestra cuanto debemos pagar
    let totalPrecioIndividual = 0;
    for (let zona of selectedZones) {
        if (zona.get_area_price()) {
            totalPrecioIndividual += zona.get_area_price();
        }
    }
    return totalPrecioIndividual
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

function recalcPayment(selectedZones, comboSeleccionado, validZones){
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

    combinedPrice = parseInt(combinedPrice) + parseInt(payment(zones_aux_copy, validZones))
    console.log(`Precio combinado: ${combinedPrice}`)
    alert(`Precio combinado: ${combinedPrice}`)
    return combinedPrice

}