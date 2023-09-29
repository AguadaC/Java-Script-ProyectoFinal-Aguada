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
const validZones = []
if(localStorage.getItem("validZones")){
    for(let zone of JSON.parse(localStorage.getItem("validZones"))){
        let new_zone_to_save = new BodyArea (zone.name, zone.price, zone.image)
        validZones.push(new_zone_to_save)
   }

}else{
   console.log("Primera carga")
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
    area_barba);
   localStorage.setItem("validZones", JSON.stringify(validZones))
}
//setear productosCarrito con operador Nullish
let selectedZones = JSON.parse(localStorage.getItem("selectedZones")) ?? []
console.log(selectedZones)