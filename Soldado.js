import EntidadDeCombate from "./EntidadDeCombate.js";
import Inventario from "./equipamiento/Inventario.js";

export default class Soldado extends EntidadDeCombate {
  #puntos = 0;
  #inventario;
  #estaDefendiendo = false;
  #estaEsquivando = false;
  #nivel = 1;
  #exp = 0;
  #expSiguienteNivel = 100;
  #modificadorDefensa = 0;
  #energia = 50;
  #energiaMaxima = 100;

  constructor(nombre, vida, danoBase) {
    super(nombre, vida, danoBase);
    this.#inventario = new Inventario();
  }

  recibirDano(monto) {
    let danoFinal = monto;
    danoFinal *= 1 - this.#modificadorDefensa;

    if (this.#estaEsquivando) {
      if (Math.random() < 0.75) {
        console.log(`> ¡Esquiva exitosa! ${this.getNombre()} no recibe daño.`);
        return 0; //
      } else {
        console.log(`> ¡La esquiva ha fallado!`);
      }
    }

    if (this.#estaDefendiendo) {
      const danoOriginal = danoFinal;
      danoFinal *= 0.5;
      console.log(
        `> ¡La defensa reduce el daño de ${Math.round(danoOriginal)} a ${Math.round(danoFinal)}!`,
      );
    }
    return super.recibirDano(danoFinal); //
  }

  atacar(objetivo) {
    const cuchillas = this.#inventario.getCuchillas();
    if (cuchillas.getDurabilidad() <= 0) {
      console.log(
        "\n❌ ¡Tus cuchillas están rotas! No puedes atacar. Necesitas repararlas en el mercado.",
      );
      return;
    }

    const danoTotal = this.getDanoBase() + this.#inventario.getBonoDeDano();
    console.log(
      `\n> ¡${this.getNombre()} ataca a ${objetivo.getNombre()} con sus cuchillas!`,
    );
    const danoRealizado = objetivo.recibirDano(danoTotal);
    this.#inventario.desgastarCuchillas(1);
    console.log(
      `> Le inflige ${danoRealizado} de daño. Vida restante de ${objetivo.getNombre()}: ${objetivo.getVida()}`,
    );
  }

  ganarExperiencia(cantidad) {
    this.#exp += cantidad;
    console.log(
      `\n💡 ¡${this.getNombre()} ha ganado ${cantidad} puntos de experiencia!`,
    );
    if (this.#exp >= this.#expSiguienteNivel) {
      this.subirDeNivel();
    }
  }

  subirDeNivel() {
    this.#nivel++;
    this.#exp = 0;
    this.#expSiguienteNivel = Math.floor(this.#expSiguienteNivel * 1.5);
    const mejoraVida = 20;
    const mejoraDano = 5;
    this.mejorarEstadisticasBase(mejoraVida, mejoraDano);
    this.curar(this.getVidaMaxima());
    console.log("\n\n ¡SUBISTE DE NIVEL! ");
    console.log(`       ${this.getNombre()} ahora es Nivel ${this.#nivel}`);
    console.log(`       ❤️ Vida Máxima +${mejoraVida}`);
    console.log(`       🗡️ Daño Base +${mejoraDano}`);
    console.log(`       Próximo nivel en ${this.#expSiguienteNivel} EXP.`);
    console.log("\n");
  }

  resetearEstadoTurno() {
    this.#estaDefendiendo = false;
    this.#estaEsquivando = false;
    this.regenerarEnergia(10);
  }

  regenerarEnergia(cantidad) {
    this.#energia += cantidad;
    if (this.#energia > this.#energiaMaxima)
      this.#energia = this.#energiaMaxima;
  }

  furiaDeAtaque(objetivo) {
    const costoEnergia = 40;
    if (this.#energia < costoEnergia) {
      console.log(
        "\n❌ ¡No tienes suficiente energía para usar Furia de Ataque!",
      );
      return false;
    }
    this.#energia -= costoEnergia;
    console.log(`\n🔥 ¡${this.getNombre()} utilizo una LANZA RELAMPAGO`);
    const danoTotal =
      (this.getDanoBase() + this.#inventario.getBonoDeDano()) * 2.5;
    const danoRealizado = objetivo.recibirDano(danoTotal);
    this.#inventario.desgastarCuchillas(3);
    console.log(`> ¡Un golpe devastador inflige ${danoRealizado} de daño!`);
    return true;
  }

  defender() {
    this.#estaDefendiendo = true;
    console.log(
      `\n> ${this.getNombre()} se prepara para defenderse, ¡reducirá el próximo daño a la mitad!`,
    );
  }

  esquivar() {
    this.#estaEsquivando = true;
    console.log(
      `\n> ${this.getNombre()} se concentra para esquivar el próximo ataque...`,
    );
  }

  ganarPuntos(cantidad) {
    this.#puntos += cantidad;
  }

  gastarPuntos(cantidad) {
    if (this.#puntos < cantidad) {
      return false;
    }
    this.#puntos -= cantidad;
    return true;
  }

  getInventario() {
    return this.#inventario;
  }

  getNivel() {
    return this.#nivel;
  }

  getExp() {
    return this.#exp;
  }

  getExpSiguienteNivel() {
    return this.#expSiguienteNivel;
  }

  getModificadorDefensa() {
    return this.#modificadorDefensa;
  }

  getEnergia() {
    return this.#energia;
  }

  getEnergiaMaxima() {
    return this.#energiaMaxima;
  }

  getPuntos() {
    return this.#puntos;
  }

  aumentarDefensa(cantidad) {
    this.#modificadorDefensa += cantidad;
  }
}
