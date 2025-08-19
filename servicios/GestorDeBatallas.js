// ./servicios/GestorDeBatalla.js

import TitanComun from "../titanes/TitanComun.js";
import TitanAnormal from "../titanes/TitanAnormal.js";
import TitanAcorazado from "../titanes/TitanAcorazado.js";

export default class GestorDeBatalla {
  #jugador;
  #titanes = [];
  #oleadaActual = 0;
  #estadoJuego = "INICIO";
  #recompensaDeOleadaOtorgada = false; // <-- NUEVO FLAG

  constructor(jugador) {
    this.#jugador = jugador;
  }

  iniciarNuevaOleada() {
    this.#oleadaActual++;
    this.#titanes = [];
    this.#recompensaDeOleadaOtorgada = false; // <-- REINICIAMOS EL FLAG

    if (this.#oleadaActual === 1) {
      console.log(
        "Un titán común se acerca. ¡Es tu oportunidad para demostrar tu valía!",
      );
      this.#titanes.push(new TitanComun());
    } else if (this.#oleadaActual === 2) {
      console.log("¡Han aparecido dos titanes comunes!");
      this.#titanes.push(new TitanComun());
      this.#titanes.push(new TitanComun());
    } else if (this.#oleadaActual === 3) {
      console.log(
        "¡Un Titán Anormal se une a la lucha! Sus movimientos son erráticos.",
      );
      this.#titanes.push(new TitanComun());
      this.#titanes.push(new TitanAnormal());
    } else if (this.#oleadaActual === 4) {
      console.log("La amenaza se intensifica. ¡Son más numerosos!");
      this.#titanes.push(new TitanComun());
      this.#titanes.push(new TitanComun());
      this.#titanes.push(new TitanAnormal());
    } else if (this.#oleadaActual === 5) {
      console.log(
        "¡¡Un estruendo sacude la tierra! ¡¡EL TITÁN ACORAZADO ESTÁ AQUÍ!!",
      );
      this.#titanes.push(new TitanAcorazado());
    } else {
      console.log(
        "¡Una oleada masiva! ¡La verdadera batalla por la humanidad comienza!",
      );
      this.#titanes.push(new TitanAcorazado());
      this.#titanes.push(new TitanAnormal());
      this.#titanes.push(new TitanComun());
    }
    this.#estadoJuego = "EN_CURSO";
  }

  verificarEstadoDelJuego() {
    if (!this.#jugador.estaVivo()) {
      this.#estadoJuego = "DERROTA";
      return this.#estadoJuego;
    }

    const titanesDerrotadosEnEsteTurno = this.#titanes.filter(
      (t) => !t.estaVivo() && !t.recompensaOtorgada,
    );
    titanesDerrotadosEnEsteTurno.forEach((titan) => {
      let exp = 0;
      if (titan.getTipo() === "Común") exp = 30;
      if (titan.getTipo() === "Anormal") exp = 50;
      if (titan.getTipo() === "Acorazado") exp = 150;
      this.#jugador.ganarExperiencia(exp);
      titan.recompensaOtorgada = true;
    });

    const todosMuertos = this.#titanes.every((t) => !t.estaVivo());
    if (todosMuertos && !this.#recompensaDeOleadaOtorgada) {
      const puntosGanados = this.#oleadaActual * 15;
      this.#jugador.ganarPuntos(puntosGanados);
      console.log(`\n🎉 ¡Has ganado ${puntosGanados} Puntos de Victoria!`);
      this.#estadoJuego = "EN_MERCADO";
      this.#recompensaDeOleadaOtorgada = true; // <-- MARCAMOS COMO OTORGADA
    }

    return this.#estadoJuego;
  }

  ejecutarTurnoDelJugador(accion, objetivoId) {
    const objetivo = this.#titanes[objetivoId];
    if (accion === "atacar" && objetivo && objetivo.estaVivo()) {
      this.#jugador.atacar(objetivo);
    }
  }
  ejecutarTurnosDeTitanes() {
    this.#titanes.forEach((titan) => {
      if (titan.estaVivo()) {
        titan.atacar(this.#jugador);
      }
    });
  }
  getJugador() {
    return this.#jugador;
  }
  getTitanesVivos() {
    return this.#titanes.filter((t) => t.estaVivo());
  }
  getEstadoJuego() {
    return this.#estadoJuego;
  }
}
