// Clases
class BodyArea{

    constructor(name, price, image){
        this.name = name,
        this.price = price
        this.image = image
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

// Zonas
const area_bozo = new BodyArea("BOZO", 600, "body.png");
const area_rostro_completo = new BodyArea("ROSTRO_COMPLETO", 1500, "body.png");
const area_menton_bozo = new BodyArea("MENTON_BOZO", 800, "body.png");
const area_nuca = new BodyArea("NUCA", 800, "body.png");
const area_espalda = new BodyArea("ESPALDA", 1500, "body.png");
const area_media_espalda = new BodyArea("MEDIA_ESPALDA", 900, "body.png");
const area_pecho = new BodyArea("PECHO", 900, "body.png");
const area_axila = new BodyArea("AXILA", 1000, "body.png");
const area_abdomen = new BodyArea("ABDOMEN", 900, "body.png");
const area_brazo_completo = new BodyArea("BRAZO_COMPLETO", 1500, "body.png");
const area_medio_brazo = new BodyArea("MEDIO_BRAZO", 900, "body.png");
const area_cavado = new BodyArea("CAVADO", 1500, "body.png");
const area_tiro = new BodyArea("TIRO", 800, "body.png");
const area_gluteos = new BodyArea("GLUTEOS", 1000, "body.png");
const area_linea_alba = new BodyArea("LINEA_ALBA", 600, "body.png");
const area_pierna_completa = new BodyArea("PIERNA_COMPLETA", 2000, "body.png");
const area_media_pierna = new BodyArea("MEDIA_PIERNA", 1500, "body.png");
const area_empeine_dedos = new BodyArea("EMPEINE_DEDOS", 800, "body.png");
const area_barba = new BodyArea("BARBA", 1200, "body.png");


// Combos
const combo_a = new Combo("AXILA-CAVADO-TIRO-MEDIA_PIERNA", 2500);
const combo_b = new Combo("AXILA-CAVADO-TIRO", 1600);
const combo_c = new Combo("AXILA-CAVADO", 1400);
const combo_d = new Combo("AXILA-BOZO", 1000);
const combo_e = new Combo("AXILA-CAVADO-TIRO-PIERNA_COMPLETA", 3200);

// Arrays contenedores
// Seteamos validZones
const validZones = []
async function main(){
    if(localStorage.getItem("validZones")){
        for(let zone of JSON.parse(localStorage.getItem("validZones"))){
            let new_zone_to_save = new BodyArea (zone.name, zone.price, zone.image)
            validZones.push(new_zone_to_save)
    }

    }else{
    console.log("Primera carga de Zonas")
    const loadedZones = await firstLoad()
    validZones.push(...loadedZones)
    localStorage.setItem("validZones", JSON.stringify(validZones))
    }
    showZones(validZones);
}

// Seteamos validCombos
const validCombos = []
if(localStorage.getItem("validCombos")){
    for(let combo of JSON.parse(localStorage.getItem("validCombos"))){
        let new_combo_to_save = new Combo (combo.name, combo.price)
        validCombos.push(new_combo_to_save)
   }
}else{
   console.log("Primera carga de Combos")
   validCombos.push(combo_a, combo_b, combo_c, combo_d, combo_e);
   localStorage.setItem("validCombos", JSON.stringify(validCombos))
}

// Seteamos selectedZones
const selectedZones = []
if (localStorage.getItem("selectedZones")){
    for(let zone of JSON.parse(localStorage.getItem("selectedZones"))){
        let new_zone_to_select = new BodyArea (zone.name, zone.price, zone.image)
        selectedZones.push(new_zone_to_select)
    }
}else{
    localStorage.setItem("selectedZones", JSON.stringify(selectedZones))
}

async function firstLoad(){
    const loadedZones = []
    const resp = await fetch("zones.json");
    const zonesJson = await resp.json();
    for (let zone of zonesJson) {
        let new_zone_to_save = new BodyArea(zone.name, zone.price, zone.image);
        loadedZones.push(new_zone_to_save);
    }
    console.log(loadedZones)
    return loadedZones
}