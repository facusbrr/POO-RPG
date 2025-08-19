export default class Cuchillas {
  #nombre;
  #filo;
  #durabilidad;
  #durabilidadMaxima;

  constructor(nombre, filo, durabilidad) {
    this.#nombre = nombre;
    this.#filo = filo;
    this.#durabilidad = durabilidad;
    this.#durabilidadMaxima = durabilidad;
  }

  getBonoDeDano() {
    return this.#durabilidad > 0 ? this.#filo : 0;
  }

  desgastar(cantidad) {
    this.#durabilidad -= cantidad;
    if (this.#durabilidad < 0) this.#durabilidad = 0;
  }

  reparar() {
    this.#durabilidad = this.#durabilidadMaxima;
  }

  mejorarFilo(cantidad) {
    this.#filo += cantidad;
  }

  getNombre() {
    return this.#nombre;
  }
  getFilo() {
    return this.#filo;
  }
  getDurabilidad() {
    return this.#durabilidad;
  }
  getDurabilidadMaxima() {
    return this.#durabilidadMaxima;
  }
}
