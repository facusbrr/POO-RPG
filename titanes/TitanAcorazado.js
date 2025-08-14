import Titan from './Titan.js';

export default class TitanAcorazado extends Titan {
    #blindaje = 0.3;

    constructor() {
        super("Titán Acorazado", 180, 30, "Acorazado");
    }

    recibirDano(monto) {
        const danoReducido = monto * (1 - this.#blindaje);
        console.log(`> El blindaje del ${this.getNombre()} absorbe parte del golpe...`);
        super.recibirDano(danoReducido);
    }
}
