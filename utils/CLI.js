import inquirer from 'inquirer';
import { caraSoldado } from '../logo.js';
import chalk from 'chalk';

export default class CLI {

    static async pedirNombre() {
        const { nombre } = await inquirer.prompt({
            type: 'input',
            name: 'nombre',
            message: '¿Cuál es el nombre de tu soldado?',
            default: 'Eren Jaeger',
        });
        return nombre;
    }

    static mostrarEstado(jugador, titanes) {
        console.log("\n========================================");
        const cuchillas = jugador.getInventario().getCuchillas();
        console.log(`👤 ${jugador.getNombre()} | ❤️ ${jugador.getVida()}/${jugador.getVidaMaxima()} | 🗡️ ${cuchillas.getNombre()} (Daño: ${cuchillas.getFilo()}, Dur: ${cuchillas.getDurabilidad()}/${cuchillas.getDurabilidadMaxima()})`);
        console.log("----------------------------------------");
        console.log("ENEMIGOS:");
        titanes.forEach((titan, index) => {
            console.log(`  ${index + 1}. ${titan.getNombre()} (${titan.getTipo()}) | ❤️ ${titan.getVida()}/${titan.getVidaMaxima()}`);
        });
        console.log("========================================");
    }

    static async mostrarMenuCombate(jugador) {
        const choices = [
            { name: 'Atacar', value: 'atacar' },
            { name: 'Defender', value: 'defender' },
            { name: 'Esquivar', value: 'esquivar' },
        ];

        choices.push({
            name: `LANZA RELAMPAGO (40 Energía)`,
            value: 'habilidad',
            disabled: jugador.getEnergia() < 40
        });

        if (jugador.getInventario().getPociones().length > 0) {
            choices.push({ name: 'Usar Ítem', value: 'item' });
        }

        const { accion } = await inquirer.prompt({
            type: 'list',
            name: 'accion',
            message: '¿Qué harás?',
            choices,
        });
        return accion;
    }

    static async seleccionarObjetivo(titanes, mensaje = '¿A qué titán atacar?') {
        const { objetivo } = await inquirer.prompt({
            type: 'list',
            name: 'objetivo',
            message: mensaje,
            choices: titanes.map((titan, index) => ({
                name: `${titan.getNombre()} (${titan.getVida()}/${titan.getVidaMaxima()})`,
                value: index,
            })),
        });
        return objetivo;
    }

    static async seleccionarItem(pociones) {
        const { item } = await inquirer.prompt({
            type: 'list',
            name: 'item',
            message: '¿Qué ítem usar?',
            choices: pociones.map(p => ({
                name: p.getNombre(),
                value: p,
            })),
        });
        return item;
    }

    static async mostrarConfirmacionPersonaje(nombre) {
        console.clear();
        console.log(caraSoldado);
        console.log(chalk.white.bold(`\n        SOLDADO ${nombre.toUpperCase()}`));
        console.log(chalk.white.bold(`          CONSAGRA TU CORAZON.`));
        console.log("");

        await inquirer.prompt({
            type: 'input',
            name: 'continuar',
            message: 'Presiona ENTER para comenzar tu misión...',
        });
    }


    static async mostrarMenuMercado(jugador) {
        console.log("\n================ MERCADO ================");
        console.log(`Tus Puntos de Victoria: 💰 ${jugador.getPuntos()}`);
        console.log("========================================");

        const { accion } = await inquirer.prompt({
            type: 'list',
            name: 'accion',
            message: '¿Qué deseas hacer en el mercado?',
            choices: [
                { name: 'Comprar Poción de Vida (15 Puntos)', value: 'comprar_pocion' },
                { name: 'Comprar Humo de Señales (20 Puntos)', value: 'comprar_humo' },
                { name: 'Mejorar Filo de Cuchillas (25 Puntos)', value: 'mejorar_cuchillas' },
                { name: 'Reparar Cuchillas (10 Puntos)', value: 'reparar_cuchillas' },
                { name: 'Reforzar Equipo (+5% Defensa) (30 Puntos)', value: 'reforzar_equipo' },
                new inquirer.Separator(),
                { name: 'Iniciar Siguiente Oleada', value: 'siguiente_oleada' },
            ],
        });
        return accion;
    }
}
