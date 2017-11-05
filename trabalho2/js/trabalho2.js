// logar local storage id



function aparecerMensageiro() {
	let HeaderMensageiro = document.querySelector('.header-mensageiro')
	let corpoMensageiro = document.querySelector('.corpo-mensageiro')

	HeaderMensageiro.style.animationName = 'header';
	corpoMensageiro.style.display = 'block';

}




function logar() {
	let campoIDx = document.querySelector('#campoid').value;
	console.log(campoIDx);
	campoID2.style.animationName = '';

	if (campoIDx == idUsuario) {
		localStorage.idLogin = 'jeffinho';
		console.log('entrei if')
		closeModalLogin()
		alterarBotaoLogin()
		aparecerMensageiro()
		requisicoes()



	} else {
		function animationNone() {
			campoID2.style.animationName = ''
		}
		campoID2.style.animationName = 'errar-id';

		setTimeout(animationNone, 2000)
	}
}

let idUsuario = 'jeffinho';

let campoID2 = document.querySelector('#campoid');
let botaoEntrar2 = document.querySelector('.botao-entrar')



botaoEntrar2.addEventListener('click', logar)





// TODAS AS REQUISIÇÕES
let xhttp = [new XMLHttpRequest(), new XMLHttpRequest()]
let grupos_parsed = null;
let conversas_parsed = null;


let confirmarXhttp = 0;

function gruposParsed() {
	grupos_parsed = JSON.parse(xhttp[0].responseText);
	console.log(grupos_parsed);

	for (let i = 0; i < grupos_parsed.length; i++) {
		addGrupo(grupos_parsed[i].groupName, grupos_parsed[i].groupFoto, grupos_parsed[i].groupId);
	}

}

function conversasParsed() {
	conversas_parsed = JSON.parse(xhttp[1].responseText);

	console.log(conversas_parsed);

	mostrarasConversas()
}

function requisicoes() {

	for (let i = 0; i < xhttp.length; i++) {

		xhttp[i].onreadystatechange = function () {
			if (xhttp[i].readyState == 4) {
				confirmarXhttp = confirmarXhttp + 1
				console.log(confirmarXhttp)

				if (confirmarXhttp == 2) {
					gruposParsed()
					conversasParsed()

				}
			}
		}

	}

	xhttp[0].open('GET', 'http://rest.learncode.academy/api/jeffersoncosta/nome-grupos', true);
	xhttp[0].send();



	xhttp[1].open('GET', 'http://rest.learncode.academy/api/jeffersoncosta/conversas', true);
	xhttp[1].send();
}








//EXIBIR OS GRUPOS NA LISTA DE AMIGOS

let listaAmigos = document.querySelector(".lista-amigos");

function addGrupo(groupName, linkFoto, groupId) {

	let divGrupos = document.createElement('div');

	let divImagemGrupo = document.createElement('div');

	let imagemGrupo = document.createElement('img');

	let divNomeGrupo = document.createElement('div');

	let spanNomeGrupo = document.createElement('span');

	let nameGrupo = document.createTextNode(groupName);


	imagemGrupo.src = linkFoto
	divImagemGrupo.appendChild(imagemGrupo);

	divNomeGrupo.appendChild(spanNomeGrupo);
	spanNomeGrupo.appendChild(nameGrupo);



	divGrupos.appendChild(divImagemGrupo);
	divGrupos.appendChild(divNomeGrupo);

	listaAmigos.appendChild(divGrupos);

	spanNomeGrupo.className = 'span-nome';
	divImagemGrupo.className = 'imagem-amigo';
	divNomeGrupo.className = 'nome-amigo';
	divGrupos.className = 'amigos amigos-surgir';
	divGrupos.id = groupId;

	console.log('adicionou grupo novo')
}



//EXIBIR AS CONVERSAS DOS GRUPOS 



let todasMensages = document.querySelector('.todas-mensagens')

function mostrarConversas2(nome, mensagem) {
	let mensagemRecebida = document.createElement('div');
	let fotoMensagem = document.createElement('div');
	let imagemMensagem = document.createElement('img');
	let nameAndMsg = document.createElement('div');
	let nomeMensagem = document.createElement('div');
	let mensagemEmSi = document.createElement('div');

	let nomeMensagemText = document.createTextNode(nome);
	let mensagemEmSi2 = document.createTextNode(mensagem);



	imagemMensagem.src = 'img/user.png';
	fotoMensagem.appendChild(imagemMensagem);


	nomeMensagem.appendChild(nomeMensagemText);
	mensagemEmSi.appendChild(mensagemEmSi2);
	nameAndMsg.appendChild(nomeMensagem)
	nameAndMsg.appendChild(mensagemEmSi);

	mensagemRecebida.appendChild(fotoMensagem)
	mensagemRecebida.appendChild(nameAndMsg);
	todasMensages.appendChild(mensagemRecebida);


	console.log('entrei no mostrarconveras2');
	mensagemRecebida.className = 'mensagem-recebida';
	fotoMensagem.className = 'foto-mensagem';
	nameAndMsg.className = 'name-and-msg';
	nomeMensagem.className = 'nome-mensagem';
	mensagemEmSi.className = 'mensagem-emsi';


}






function mostrarConversas(idt, nomeHeaderdosgrupos) {

	console.log('entrei no mostrarConversas()')
	console.log(idt)

	if (conversaAtiva != idt) {

		console.log('entrei no !=idt')

		while (todasMensages.firstChild) {
			todasMensages.removeChild(todasMensages.firstChild)
		};
		nomeHeader.innerHTML = nomeHeaderdosgrupos;
		campoEscreverMsg.style.display = 'block';
		botaoEnviarMsg.style.display = 'block';
		botaoEnviarMsg.id = 'm1' + idt


		for (let y = 0; y < conversas_parsed.length; y++) {
			if (conversas_parsed[y].groupId == idt) {
				console.log('entrei no if do mostrarconversas()')
				conversaAtiva = idt;

				mostrarConversas2(conversas_parsed[y].userName, conversas_parsed[y].mensagem)

			} else {
				conversaAtiva = null;
			}
		}


	} else {

		console.log('conversa já aberta')

	}



}



let conversaAtiva = null;
let nomeHeader = null;
let nomedosGrupos = null;
let nomedosGruposHeader = null;

function mostrarasConversas() {
	console.log('entrei mostrar as conversas')
	nomedosGrupos = document.querySelectorAll('.amigos');

	nomedosGruposHeader = document.querySelectorAll('.span-nome');

	nomeHeader = document.querySelector('.name-person')




	if (nomedosGrupos != null) {

		for (let i = 0; i < nomedosGrupos.length; i++) {


			nomedosGrupos[i].addEventListener("click", function () {
				mostrarConversas(nomedosGrupos[i].id, nomedosGruposHeader[i].innerHTML);
			})

		}

		console.log("entrei no if(nomedosgrupos != null)")

	} else {
		console.log('ainda é null')
	}



}



//Enviar mensagem 




function enviarMensagem() {
	botaoEnviarMsg = document.querySelector('.enviar-mensagem');
	let idEnviar = botaoEnviarMsg.id
	let idSlice = idEnviar.slice(2, idEnviar.length);

	let mensagemEscrita = campoEscreverMsg.value

	let mensagemEnviada = {
		'userName': 'Eu',
		'mensagem': mensagemEscrita,
		'groupId': idSlice
	};

	let mensagemEnviadaStringify = JSON.stringify(mensagemEnviada);


	let xhttpSend = new XMLHttpRequest();
	xhttpSend.onreadystatechange = function () {
		if (xhttpSend.readyState == 4) {

		}
	}



	xhttpSend.open("POST", "http://rest.learncode.academy/api/jeffersoncosta/conversas", true);

	xhttpSend.setRequestHeader("Content-Type", "application/json");

	xhttpSend.send(mensagemEnviadaStringify);


	console.log(mensagemEnviada);
	campoEscreverMsg.value = '';

	//	atualizar mensagem sem atualizar página
	function aparecerAsMensagens() {

		conversas_parsed = JSON.parse(xhttpAparecerMsgEnviada.responseText);
		let conversas_parsed2 = conversas_parsed[conversas_parsed.length - 1]

		console.log(conversas_parsed2);

		mostrarConversas2(conversas_parsed2.userName, conversas_parsed2.mensagem)


	}


	let xhttpAparecerMsgEnviada = new XMLHttpRequest();

	xhttpAparecerMsgEnviada.onreadystatechange = function () {
		if (xhttpAparecerMsgEnviada.readyState == 4) {

			aparecerAsMensagens()


		}
	}

	xhttpAparecerMsgEnviada.open('GET', 'http://rest.learncode.academy/api/jeffersoncosta/conversas', true);
	xhttpAparecerMsgEnviada.send();






}


let botaoEnviarMsg = document.querySelector('.enviar-mensagem');
let campoEscreverMsg = document.querySelector('#type-mensagens');


console.log(botaoEnviarMsg);


botaoEnviarMsg.addEventListener('click', enviarMensagem);






//Adicionar Grupp

function criarGrupo() {
	let campoNomedoGrupo = document.querySelector('#nome-do-grupo').value;
	let campoIddoGrupo = document.querySelector('#id-do-grupo').value
	let campoLinkFoto = document.querySelector('#foto-do-grupo').value

	let grupoCriado = {
		'groupName': campoNomedoGrupo,
		'groupFoto': campoLinkFoto,
		'groupId': campoIddoGrupo
	};


	let grupoCriadoStringfy = JSON.stringify(grupoCriado);
	let xhttpSendGrupo = new XMLHttpRequest();
	xhttpSendGrupo.onreadystatechange = function () {
		if (xhttpSendGrupo.readyState == 4) {

		}
	}



	xhttpSendGrupo.open("POST", "http://rest.learncode.academy/api/jeffersoncosta/nome-grupos", true);

	xhttpSendGrupo.setRequestHeader("Content-Type", "application/json");

	xhttpSendGrupo.send(grupoCriadoStringfy);

	//	atualizar lista de grupos sem recarregar pagina

	function gruposParsed2() {
		grupos_parsed = JSON.parse(xhttpReceiveGroups.responseText);

		grupos_parsed2 = grupos_parsed[grupos_parsed.length - 1]
		console.log(grupos_parsed2);


		addGrupo(grupos_parsed2.groupName, grupos_parsed2.groupFoto, grupos_parsed2.groupId);


	}

	let xhttpReceiveGroups = new XMLHttpRequest();

	xhttpReceiveGroups.onreadystatechange = function () {
		if (xhttpReceiveGroups.readyState == 4) {

			gruposParsed2()


		}
	}


	xhttpReceiveGroups.open('GET', 'http://rest.learncode.academy/api/jeffersoncosta/nome-grupos', true);
	xhttpReceiveGroups.send();

}



let botaoAddGrupo = document.querySelector('.add-grupo')


botaoAddGrupo.addEventListener('click', criarGrupo)

//fechar e abrir o modal de add grupo
function fecharAddGrupo() {

	modalAddGrupo.className = 'modal-addgrupo-anim';


}

function abrirAddGrupo() {

	if (modalAddGrupo.className == 'modal-addgrupo') {
		fecharAddGrupo()
	} else {
		modalAddGrupo.className = 'modal-addgrupo';
	}



}

let buttonAddGrupo = document.querySelector('.adicionar-grupo');

let modalAddGrupo = document.querySelector('.modal-addgrupo-anim');

buttonAddGrupo.addEventListener("click", abrirAddGrupo);





//abrir modal de login 

function abrirModalLogin() {
	if (botaoEntrarr.innerHTML == 'Logout') {

		logout()
	} else {
		modalLogin.style.display = 'flex';
		modalLoginBg.style.display = 'block';
		console.log('entrou modal');
	}



}

function closeModalLogin() {
	function displayNone() {
		modalLoginBg.style.display = 'none';
		modalLogin.style.display = 'none';
		modalLogin.style.animationName = '';

	}


	modalLogin.style.animationName = 'fechar-modal';


	setTimeout(displayNone, 700)
}
let botaoEntrarr = document.querySelector('.entrar')
let botaoAbrirModal = document.querySelector('.logar');
let modalLogin = document.querySelector('.modal-login');
let modalLoginBg = document.querySelector('.modal-background')

botaoAbrirModal.addEventListener('click', abrirModalLogin)
modalLoginBg.addEventListener('click', closeModalLogin)



// login com localstorage
function alterarBotaoLogin() {


	botaoEntrarr.innerHTML = 'Logout'



}


if (localStorage.idLogin == 'jeffinho') {

	aparecerMensageiro()
	alterarBotaoLogin()
	requisicoes()


} else {}


//logout
function alterarBotaoLogin2() {

	botaoEntrarr.innerHTML = 'Entrar';
}

function logout() {
	let HeaderMensageiro = document.querySelector('.header-mensageiro')
	let corpoMensageiro = document.querySelector('.corpo-mensageiro')

	localStorage.idLogin = null;
	alterarBotaoLogin2()

	function displayNone() {
		corpoMensageiro.style.display = 'none'
		corpoMensageiro.style.animationName = ''
	}

	corpoMensageiro.style.animationName = 'corpomensageiro-out'
	HeaderMensageiro.style.animationName = 'header-out'
	nomeHeader.innerHTML = ''

	setTimeout(displayNone, 1500)




}
