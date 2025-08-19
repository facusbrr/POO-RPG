export default class EntidadDeCombate {
  #nombre;
  #vida;
  #vidaMaxima;
  #danoBase;

  constructor(nombre, vida, danoBase) {
    this.#nombre = nombre;
    this.#vida = vida;
    this.#vidaMaxima = vida;
    this.#danoBase = danoBase;
  }

  atacar(objetivo) {
    throw new Error(
      "El método 'atacar' debe ser implementado por una clase hija.",
    );
  }

  recibirDano(monto) {
    const danoReal = Math.round(monto);
    this.#vida -= danoReal;
    if (this.#vida < 0) this.#vida = 0;
    return danoReal; //
  }

  curar(monto) {
    this.#vida += monto;
    if (this.#vida > this.#vidaMaxima) this.#vida = this.#vidaMaxima;
  }

  mejorarEstadisticasBase(vida, dano) {
    this.#vidaMaxima += vida;
    this.#danoBase += dano;
  }

  estaVivo() {
    return this.#vida > 0;
  }

  getNombre() {
    return this.#nombre;
  }
  getVida() {
    return this.#vida;
  }
  getVidaMaxima() {
    return this.#vidaMaxima;
  }
  getDanoBase() {
    return this.#danoBase;
  }
  setDanoBase(nuevoDano) {
    this.#danoBase = nuevoDano;
  }
}
