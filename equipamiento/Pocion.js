export default class Pocion {
  #nombre;
  #efecto;

  constructor(nombre, efecto) {
    this.#nombre = nombre;
    this.#efecto = efecto;
  }

  getNombre() {
    return this.#nombre;
  }
  getEfecto() {
    return this.#efecto;
  }
}
