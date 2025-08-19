import EntidadDeCombate from "../EntidadDeCombate.js";

export default class Titan extends EntidadDeCombate {
  #tipo;
  #estaAturdido = false;
  recompensaOtorgada = false;

  constructor(nombre, vida, danoBase, tipo) {
    super(nombre, vida, danoBase);
    this.#tipo = tipo;
  }

  atacar(objetivo) {
    if (this.#estaAturdido) {
      console.log(
        `\n> El ${this.getNombre()} está aturdido por el humo y no puede atacar este turno.`,
      );
      this.#estaAturdido = false;
      return;
    }

    console.log(`\n> ¡${this.getNombre()} ataca a ${objetivo.getNombre()}!`);
    const danoRealizado = objetivo.recibirDano(this.getDanoBase());
    if (danoRealizado > 0) {
      console.log(
        `> Te inflige ${danoRealizado} de daño. Tu vida restante: ${objetivo.getVida()}`,
      );
    }
  }

  aturdir() {
    this.#estaAturdido = true;
  }

  getTipo() {
    return this.#tipo;
  }
}
