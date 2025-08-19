import Soldado from "./Soldado.js";
import GestorDeBatalla from "./servicios/GestorDeBatallas.js";
import Mercado from "./servicios/Mercado.js";
import Cuchillas from "./equipamiento/Cuchillas.js";
import CLI from "./utils/CLI.js";
import { logoPrincipal, titulo } from "./logo.js";

async function main() {
  console.clear();
  console.log(logoPrincipal);
  console.log(titulo);
  console.log("");
  console.log("¡Prepárate para defender a la humanidad!");
  const nombreSoldado = await CLI.pedirNombre();
  await CLI.mostrarConfirmacionPersonaje(nombreSoldado);
  const jugador = new Soldado(nombreSoldado, 150, 10);
  const cuchillasBasicas = new Cuchillas("Cuchillas de Recluta", 15, 20);
  jugador.getInventario().equiparCuchillas(cuchillasBasicas);
  const gestor = new GestorDeBatalla(jugador);
  const mercado = new Mercado();
  let enJuego = true;

  while (enJuego) {
    let estado = gestor.getEstadoJuego();

    if (estado === "INICIO" || estado === "EN_MERCADO") {
      if (estado === "EN_MERCADO") {
        const accionMercado = await CLI.mostrarMenuMercado(jugador);
        switch (accionMercado) {
          case "comprar_pocion":
            mercado.venderPocionDeVida(jugador);
            continue;
          case "comprar_humo":
            mercado.venderHumoDeSenales(jugador);
            continue;
          case "mejorar_cuchillas":
            mercado.mejorarCuchillas(jugador);
            continue;
          case "reparar_cuchillas":
            mercado.repararCuchillas(jugador);
            continue;
          case "reforzar_equipo":
            mercado.reforzarEquipo(jugador);
            continue;
          case "siguiente_oleada":
            break;
        }
      }
      gestor.iniciarNuevaOleada();
      estado = gestor.getEstadoJuego();
    }

    if (estado === "EN_CURSO") {
      jugador.resetearEstadoTurno();

      let turnoDelJugadorTerminado = false;
      while (!turnoDelJugadorTerminado) {
        CLI.mostrarEstado(jugador, gestor.getTitanesVivos());
        const accion = await CLI.mostrarMenuCombate(jugador);

        switch (accion) {
          case "item": {
            const itemSeleccionado = await CLI.seleccionarItem(
              jugador.getInventario().getPociones(),
            );
            let objetivoItem = null;
            if (itemSeleccionado.getEfecto().tipo === "aturdir") {
              const titanesVivos = gestor.getTitanesVivos();
              const objetivoId = await CLI.seleccionarObjetivo(
                titanesVivos,
                "¿Sobre qué titán usar el humo?",
              );
              objetivoItem = titanesVivos[objetivoId];
            }
            jugador
              .getInventario()
              .usarPocion(itemSeleccionado.getNombre(), jugador, objetivoItem);
            console.log(`\n✅ ¡Has usado ${itemSeleccionado.getNombre()}!`);
            break;
          }
          case "atacar":
          case "defender":
          case "esquivar":
          case "habilidad": {
            if (accion === "atacar") {
              const titanesVivos = gestor.getTitanesVivos();
              const objetivoId = await CLI.seleccionarObjetivo(titanesVivos);
              const objetivoReal = titanesVivos[objetivoId];
              jugador.atacar(objetivoReal);
            } else if (accion === "defender") {
              jugador.defender();
            } else if (accion === "esquivar") {
              jugador.esquivar();
            } else if (accion === "habilidad") {
              const titanesVivos = gestor.getTitanesVivos();
              const objetivoId = await CLI.seleccionarObjetivo(
                titanesVivos,
                "¿Sobre qué titán usar la habilidad?",
              );
              const objetivoReal = titanesVivos[objetivoId];
              jugador.furiaDeAtaque(objetivoReal);
            }
            turnoDelJugadorTerminado = true;
            break;
          }
        }
      }

      gestor.verificarEstadoDelJuego();
      if (gestor.getEstadoJuego() === "EN_CURSO") {
        gestor.ejecutarTurnosDeTitanes();
      }
    }

    estado = gestor.verificarEstadoDelJuego();
    if (estado === "DERROTA") {
      console.log("\n\nGAME OVER... La humanidad ha caído.");
      enJuego = false;
    }
  }
}

main();
