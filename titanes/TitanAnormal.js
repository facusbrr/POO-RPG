import Titan from './Titan.js';

export default class TitanAcorazado extends Titan {
    #blindaje = 0.4; // 40% de reducción de daño

    constructor() {
        super("Titán Acorazado", 200, 30, "Acorazado");
    }

    recibirDano(monto) {
        const danoReducido = monto * (1 - this.#blindaje);
        console.log(`> El blindaje del ${this.getNombre()} absorbe parte del golpe...`);
        super.recibirDano(danoReducido);
    }
}
