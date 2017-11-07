//adicionar item



let buttonEnviar = document.querySelector('.enviar');


buttonEnviar.addEventListener('click', enviarServidor)

let buttonVar = null



function enviarServidor() {

	buttonVar++

	let tituloInput = document.querySelector('#input-titulo').value;

	let notaInput = document.querySelector('#input-nota').value;


	let palavrasChaveInput = document.querySelectorAll("[name=palavras-chave]:checked")
	let palavrasChaveSel = [];

	for (let i = 0; i < palavrasChaveInput.length; i++) {

		palavrasChaveSel.push(palavrasChaveInput[i].value)

	}

	let lembrete = {
		'titulo': tituloInput,
		'nota': notaInput,
		'palavraschave': palavrasChaveSel
	}


	let lembreteStringfy = JSON.stringify(lembrete);
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {

		if (xhttp.readyState == 4) {

			exibirnatela3()


		}


	}


	xhttp.open('POST', 'http://rest.learncode.academy/api/jeffersoncosta/prova-2111', true);
	xhttp.setRequestHeader("Content-Type", "application/json");

	xhttp.send(lembreteStringfy);

	console.log(lembreteStringfy)




}


function exibirnatela3() {

	let notasParsed2 = null


	let xhttp3 = new XMLHttpRequest();
	xhttp3.onreadystatechange = function () {

		if (xhttp3.readyState == 4) {

			notasParsed2 = JSON.parse(xhttp3.responseText)
			exibirNaTela(notasParsed2)
			accordeon()
		}
	}


	xhttp3.open('GET', 'http://rest.learncode.academy/api/jeffersoncosta/prova-2111', true);

	xhttp3.send();

}



//accordeon





function accordeon() {
	let titulosAccordeon = document.querySelectorAll('.titulo');
	let notaTexAccordeon = document.querySelectorAll('.nota-text');

	for (let x = 0; x < titulosAccordeon.length; x++) {

		titulosAccordeon[x].addEventListener('click', function () {

			if (notaTexAccordeon[x].classList.contains('nota-text-aberto')) {

				notaTexAccordeon[x].classList.remove('nota-text-aberto')

				notaTexAccordeon[x].style.maxHeight = "";
			} else {

				notaTexAccordeon[x].classList.add('nota-text-aberto');



			}




		})

	}

}



// exibir



let notasParsed = null


let xhttp1 = new XMLHttpRequest();
xhttp1.onreadystatechange = function () {

	if (xhttp1.readyState == 4) {

		notasParsed = JSON.parse(xhttp1.responseText)
		console.log(notasParsed)
		exibirNaTela(notasParsed)
		accordeon()
	}
}


xhttp1.open('GET', 'http://rest.learncode.academy/api/jeffersoncosta/prova-2111', true);

xhttp1.send();




function exibirNaTela(notes) {

	if (buttonVar != null) {

		exibirnatela2(notes[notes.length - 1].titulo, notes[notes.length - 1].nota, notes[notes.length - 1].palavraschave)

	} else {

		for (let i = 0; i < notes.length; i++) {


			exibirnatela2(notes[i].titulo, notes[i].nota, notes[i].palavraschave)


		}

	}



}

function exibirnatela2(ti, nota, palv) {
	let accordeon = document.querySelector('.accordeon');

	let accordeonElemento = document.createElement('div');

	let tituloElemento = document.createElement('div');

	let notaElemento = document.createElement('div');

	let paChaveElemento = document.createElement('div');

	let tituloElemento2 = document.createTextNode(ti);
	let notaElemento2 = document.createTextNode(nota);
	let paChaveElemento2 = document.createTextNode(palv)


	tituloElemento.appendChild(tituloElemento2);
	notaElemento.appendChild(notaElemento2)
	notaElemento.appendChild(paChaveElemento)
	paChaveElemento.appendChild(paChaveElemento2)


	accordeonElemento.appendChild(tituloElemento);
	accordeonElemento.appendChild(notaElemento);

	accordeon.appendChild(accordeonElemento);

	tituloElemento.classList.add('titulo');
	notaElemento.classList.add('nota-text');
	paChaveElemento.classList.add('pa-chave');
	accordeonElemento.classList.add('accordeon-e');

}
