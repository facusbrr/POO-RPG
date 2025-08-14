export default class Inventario {
    #cuchillasActuales;
    #pociones = [];

    equiparCuchillas(cuchillas) {
        this.#cuchillasActuales = cuchillas;
    }

    agregarPocion(pocion) {
        this.#pociones.push(pocion);
    }

    usarPocion(nombrePocion, usuario, objetivo) { // Ahora acepta usuario y objetivo
        const index = this.#pociones.findIndex(p => p.getNombre() === nombrePocion);
        if (index > -1) {
            const pocion = this.#pociones[index];
            const efecto = pocion.getEfecto();

            if (efecto.tipo === 'vida') {
                usuario.curar(efecto.cantidad);
            } else if (efecto.tipo === 'aturdir') {
                if (objetivo) objetivo.aturdir();
            }

            this.#pociones.splice(index, 1);
            return efecto;
        }
        return null;
    }

    getBonoDeDano() {
        return this.#cuchillasActuales ? this.#cuchillasActuales.getBonoDeDano() : 0;
    }

    desgastarCuchillas(cantidad) {
        if (this.#cuchillasActuales) {
            this.#cuchillasActuales.desgastar(cantidad);
        }
    }

    getCuchillas() { return this.#cuchillasActuales; }
    getPociones() { return this.#pociones; }
}
