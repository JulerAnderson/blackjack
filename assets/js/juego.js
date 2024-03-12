// C: Clubs (Tréboles)
// D: Diamonds (Diamantes)
// H: Hearts (Corazones)
// S: Spades (Espadas)

const miModulo = (() => {
    'use strict'
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevoJuego = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas');
    const puntosHtml = document.querySelectorAll('small');

    //Función que inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHtml.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }

    //Función para crear nuevo Deck
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo)
            }
        }
        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo)
            }
        }
        return _.shuffle(deck);
    }

    //Función para tomar carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el deck";
        }
        return deck.pop();
    }

    //Función para calcular valor real de carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        let resultado;
        if (isNaN(valor)) {
            //Si es isNotaNumber
            resultado = (valor === "A") ? 11 : 10;
        } else {
            //Operación para string => number
            resultado = valor * 1;
        }
        return resultado;
    }

    //Turno 0: jugador --- Turno 1: computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana :(');
            } else if (puntosComputadora > 21) {
                alert('Ganaste :)')
            } else {
                alert('Computadora gana')
            }
        }, 200);
    }
    // Función para turno de computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while ((puntosMinimos <= 21) && (puntosComputadora < puntosMinimos));

        determinarGanador();
    }

    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });

    //Lo que se retorna es lo único visible para terceros
    return {
        nuevoJuego: inicializarJuego
    };
})();

