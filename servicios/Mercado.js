import Pocion from "../equipamiento/Pocion.js";

export default class Mercado {
  venderPocionDeVida(soldado) {
    const costo = 15;
    if (soldado.gastarPuntos(costo)) {
      const pocion = new Pocion("Poción de Vida", {
        tipo: "vida",
        cantidad: 50,
      });
      soldado.getInventario().agregarPocion(pocion);
      console.log("\n✅ ¡Has comprado una Poción de Vida!");
      return true;
    }
    console.log("\n❌ ¡No tienes suficientes puntos!");
    return false;
  }

  reforzarEquipo(soldado) {
    const costo = 30;
    if (soldado.gastarPuntos(costo)) {
      // Aumenta la defensa en un 5% (0.05)
      soldado.aumentarDefensa(0.05);
      console.log(
        `\n✅ ¡Tu Equipo de Maniobras ha sido reforzado! (Defensa +5%)`,
      );
      return true;
    }
    console.log("\n❌ ¡No tienes suficientes puntos!");
    return false;
  }

  venderHumoDeSenales(soldado) {
    const costo = 20;
    if (soldado.gastarPuntos(costo)) {
      const humo = new Pocion("Humo de Señales", { tipo: "aturdir" });
      soldado.getInventario().agregarPocion(humo);
      console.log("\n✅ ¡Has comprado Humo de Señales!");
      return true;
    }
    console.log("\n❌ ¡No tienes suficientes puntos!");
    return false;
  }

  mejorarCuchillas(soldado) {
    const costo = 25;
    if (soldado.gastarPuntos(costo)) {
      soldado.getInventario().getCuchillas().mejorarFilo(10);
      console.log(
        "\n✅ ¡El filo de tus cuchillas ha sido mejorado (+10 de daño)!",
      );
      return true;
    }
    console.log("\n❌ ¡No tienes suficientes puntos!");
    return false;
  }

  repararCuchillas(soldado) {
    const costo = 10;
    if (soldado.gastarPuntos(costo)) {
      soldado.getInventario().getCuchillas().reparar();
      console.log(
        "\n✅ ¡Tus cuchillas han sido reparadas a su máxima durabilidad!",
      );
      return true;
    }
    console.log("\n❌ ¡No tienes suficientes puntos!");
    return false;
  }
}
