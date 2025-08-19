import Titan from "./Titan.js";

export default class TitanAnormal extends Titan {
  constructor() {
    super("Titán Anormal", 80, 25, "Anormal");
  }

  atacar(objetivo) {
    if (Math.random() < 0.3) {
      console.log(
        `\n> ¡El ${this.getNombre()} se mueve erráticamente y lanza un golpe devastador!`,
      );

      const danoMultiplicado = this.getDanoBase() * 1.5;
      objetivo.recibirDano(danoMultiplicado);
      console.log(
        `> ¡Te inflige ${danoMultiplicado} de daño! Tu vida restante: ${objetivo.getVida()}`,
      );
    } else {
      super.atacar(objetivo);
    }
  }
}
