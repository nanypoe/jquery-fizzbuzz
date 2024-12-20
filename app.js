$(function () {
    //Asignando valor al número inicial/actual y puntaje
    let numeroActual = 1;
    let puntos = 0;

    //Función para actualizar el número en pantalla
    function actualizarNumero() {
        $("#numeroActual").text(numeroActual);
    }
    //Función para actualizar el puntaje en pantalla
    function actualizarPuntos() {
        $("#puntos").text("PUNTUACIÓN: " + puntos);
    }

    //Función para reproducir sonidos
    function reproducirSonido(isCorrect) {
        const audio = new Audio(isCorrect ? "/fx/correcto.mp3" : "/fx/incorrecto.mp3");
        audio.play();
    }

    //Función para validar respuesta del usuario
    function validarRespuesta(respuesta) {
        const divisiblepor3 = numeroActual % 3 === 0;
        const divisiblepor5 = numeroActual % 5 === 0;
        if (respuesta === "Fizz" && divisiblepor3 && !divisiblepor5) {
            resultado("¡Correcto!", true);
        } else if (respuesta === "Buzz" && divisiblepor5 && !divisiblepor3) {
            resultado("¡Correcto!", true);
        } else if (respuesta === "FizzBuzz" && divisiblepor3 && divisiblepor5) {
            resultado("¡Correcto!", true);
        } else if (respuesta === "Nope" && !divisiblepor3 && !divisiblepor5) {
            resultado("¡Correcto!", true)
        } else { resultado("INCORRECTO! Haz un mejor cálculo mental...", false) }

        if (puntos >= 0) {
            //Desactivar botones para evitar múltiples clicks
            $("button").prop("disabled", true);

            //Reactivarlos después de 500ms
            setTimeout(() => $("button").prop("disabled", false), 500);

            numeroActual++; $("button").prop("disabled", true); // Desactiva todos los botones
            setTimeout(() => $("button").prop("disabled", false), 500); // Los reactiva después de 500ms

            actualizarNumero();
        }
    }

    //Función para mostrar resultados y actualizar el puntaje
    function resultado(message, isCorrect) {
        const resultados = $("#resultados");
        resultados.text(message);
        resultados.removeClass("text-green-500 text-red-500");
        resultados.addClass(isCorrect ? "text-green-500" : "text-red-500");

        //Agregando animación al mensaje
        resultados.addClass("animate-bounce");
        setTimeout(() => resultados.removeClass("animate-bounce"), 500);

        //Reprodir sonido
        reproducirSonido(isCorrect);

        //Actualizar el puntaje
        if (isCorrect) {
            puntos++;
            $("#calculo").text("+1").removeClass("text-red-500").addClass("text-green-500");
        } else {
            puntos--;
            $("#calculo").text("-1").removeClass("text-green-500").addClass("text-red-500");
        };
        actualizarPuntos();

        //FINALIZAR el juego si los puntos son NEGATIVOS
        if (puntos < 0) {
            mostrarGameOver();
        }
    }

    //Pantalla de GAME OVER
    function mostrarGameOver() {
        //ocultar los elementos del juego
        $("#juego").hide();

        //mostrar pantalla de reinicio
        $("#pantallaGameOver").show();
    }

    //Función para reiniciar el juego
    function reiniciarJuego() {
        numeroActual = 1;
        puntos = 0;
        actualizarNumero();
        actualizarPuntos();
        $("#resultados").text("");
        $("#calculo").text("");

        // Ocultar la pantalla de reinicio y mostrar el juego
        $("#pantallaGameOver").hide();
        $("#juego").show();
    }

    //ACCIONES DEL USUARIO
    $("#botonFizz").click(() => validarRespuesta("Fizz"));
    $("#botonBuzz").click(() => validarRespuesta("Buzz"));
    $("#botonFizzBuzz").click(() => validarRespuesta("FizzBuzz"));
    $("#botonNope").click(() => validarRespuesta("Nope"));

    //BOTON para reiniciar el juego
    $("#reiniciar").click(reiniciarJuego);

    //Inicialización del juego
    actualizarNumero();
    actualizarPuntos();
});