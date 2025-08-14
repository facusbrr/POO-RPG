import EntidadDeCombate from '../EntidadDeCombate.js';

export default class Titan extends EntidadDeCombate {
    #tipo;
    #estaAturdido = false;

    constructor(nombre, vida, danoBase, tipo) {
        super(nombre, vida, danoBase);
        this.#tipo = tipo;
        this.recompensaOtorgada = false;
    }

    atacar(objetivo) {
        if (this.#estaAturdido) {
            console.log(`\n> El ${this.getNombre()} está aturdido por el humo y no puede atacar este turno.`);
            this.#estaAturdido = false; // Se recupera en el siguiente turno
            return;
        }

        console.log(`\n> ¡${this.getNombre()} ataca a ${objetivo.getNombre()}!`);
        objetivo.recibirDano(this.getDanoBase());
        console.log(`> Te inflige ${this.getDanoBase()} de daño. Tu vida restante: ${objetivo.getVida()}`);
    }

    aturdir() {
        this.#estaAturdido = true;
    }

    getTipo() { return this.#tipo; }
}
