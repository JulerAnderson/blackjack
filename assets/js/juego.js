// C: Clubs (Tréboles)
// D: Diamonds (Diamantes)
// H: Hearts (Corazones)
// S: Spades (Espadas)

(() => {
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0;
    let puntosComputadora = 0;

    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevoJuego = document.querySelector('#btnNuevo');
    const divCartasJugador = document.querySelector('#jugador-cartas')
    const divCartasComputadora = document.querySelector('#computador-cartas')
    const puntosHtml = document.querySelectorAll('small');

    //Función para crear nuevo Deck
    const crearDeck = () => {
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
        deck = _.shuffle(deck);
        return deck;
    }
    crearDeck();

    //Función para tomar carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw "No hay cartas en el deck";
        }
        const carta = deck.pop();
        return carta;
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

    // Función para turno de computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHtml[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta')
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }
        } while ((puntosMinimos <= 21) && (puntosComputadora < puntosMinimos));

        setTimeout(() => {
            if (puntosComputadora === puntosJugador) {
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

    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHtml[0].innerText = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta')
        divCartasJugador.append(imgCarta);

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
        turnoComputadora(puntosJugador);
    })

    btnNuevoJuego.addEventListener('click', () => {
        deck = [];
        deck = crearDeck();
        console.clear();
        btnDetener.disabled = false;
        btnPedir.disabled = false;
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHtml[0].innerText = 0;
        puntosHtml[1].innerText = 0;
        divCartasJugador.innerHTML = '';
        divCartasComputadora.innerHTML = '';
    })
})();

