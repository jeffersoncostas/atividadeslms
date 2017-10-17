//FUNCTIONS

//modal

function modal() {
	contentModal1.style.display = 'block';
	contentModal1.style.animationName = '';


	document.getElementById('modal').className = 'deslizar-direita';
	document.getElementById('bg-fixo').style.display = 'block';
	document.getElementById('body').style.overflow = 'hidden';
}

function closeModal() {

	if (contentModal1.style.display == 'none') {
		document.getElementById('modal').className = 'deslizar-esquerda3';
		document.getElementById('bg-fixo').style.display = 'none';

		document.getElementById('body').style.overflow = 'auto';
		voltarModal.style.display = 'none';

	} else {
		document.getElementById('modal').className = 'deslizar-esquerda';
		document.getElementById('bg-fixo').style.display = 'none';
		document.getElementById('body').style.overflow = 'auto';
		voltarModal.style.display = 'none';
	}




}



//modal-sem-conta-popup

function semContaPopUp() {

	semConta.style.animationName = 'deslizar-cima';
	popUpP.style.animationName = 'aparecer';

}

function byeContaPopUp() {

	semConta.style.animationName = 'deslizar-baixo';
	popUpP.style.animationName = 'desaparecer';


}


//bar-search

function focarPesquisa() {


	for (let j = 0; j < pesquisaIcon.length; j++) {

		pesquisaIcon[j].className = 'busc-hover busc';


	}

	searchGeral.className = 'busc busc-hover search-geral search-geral-hover';
	searchGps.className = 'busc busc-hover search-gps search-gps-hover';

}

function fecharPesquisa() {


	for (let x = 0; x < pesquisaIcon.length; x++) {

		pesquisaIcon[x].className = 'busc';


	}
	searchGeral.className = 'busc search-geral ';
	searchGps.className = 'busc  search-gps ';
}


//expandir-cadastro
function expandirCadastro() {
	function displayNone() {
		contentModal1.style.display = 'none';
		voltarModal.style.animationName = 'aparecer';
		contentModal2.style.animationName = 'aparecer';


	}
	contentModal2.style.display = 'block'
	voltarModal.style.display = 'block';
	modalEmSi.style.width = '40%';
	contentModal1.style.animationName = 'desaparecer';
	setTimeout(displayNone, 700);

}


function posteIdeia() {

	if (divComecar.style.animationName == 'comece-aqui') {
		divComecar.style.animationName = 'comece-aqui-2'

	} else {
		divComecar.style.animationName = 'comece-aqui'

	}

}

// postar ideia max height 

let começar = document.querySelector('.botao-comecar');
let divComecar = document.querySelector('.comece-aqui');

começar.addEventListener('click', posteIdeia)



//modal-sem-conta-popup

let semContaLink = document.querySelector('.sem-conta');
let semConta = document.querySelector('.sem-conta-popup');
let popUpP = document.querySelector('.pop-up-text')


semContaLink.addEventListener("mouseenter", semContaPopUp);
semContaLink.addEventListener("mouseleave", byeContaPopUp);



//bar-search

let pesquisaBar = document.querySelector('.centro');
let pesquisaIcon = document.querySelectorAll('.busc');
let searchGeral = document.querySelector('.search-geral');
let searchGps = document.querySelector('.search-gps');

for (let b = 0; b < pesquisaIcon.length; b++) {

	pesquisaIcon[b].addEventListener("mouseover", focarPesquisa);

}

pesquisaBar.addEventListener("mouseleave", fecharPesquisa);




//abrir-cadastro 1
let voltarModal = document.querySelector('.voltar-modal');
let contentModal1 = document.querySelector('.content-modal');
let contentModal2 = document.querySelector('.content-modal-2');

let modalEmSi = document.querySelector('#modal');

semContaLink.addEventListener("click", expandirCadastro)







$(function () {
	// This will select everything with the class smoothScroll
	// This should prevent problems with carousel, scrollspy, etc...
	$('.smoothScroll').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000); // The number here represents the speed of the scroll in milliseconds
				return false;
			}
		}
	});
});

// Change the speed to whatever you want
// Personally i think 1000 is too much
// Try 800 or below, it seems not too much but it will make a difference
