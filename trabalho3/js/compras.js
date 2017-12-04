// sair 

$("#button-sair").click(sairLogout)

$(document).ready(function () {
    $('.modal').modal();
});


function sairLogout() {

    localStorage.removeItem('userData');
    window.location.replace("index.html")


}

if (localStorage.userData != undefined && localStorage.userData != null && localStorage.comprasData != undefined && localStorage.comprasData != null) {


    atualizarNav()
    mostrarListaCompras()
    atualizarMinhasCompras()

} else {

    window.location.replace("index.html")

    $("#tap-target12").hide()

    $("#button-sair").hide()
    $("#button-carrinho-compras").hide()
    $("#button-minhas-compras").hide()

}


function atualizarNav() {
    $("#button-entrar").hide()
    $("#button-cadastrar").hide();

    $("#tap-target12").show()
    $("#button-sair").show();
    $("#button-carrinho-compras").show()
    $("#button-minhas-compras").show()

}


function mostrarListaCompras() {
    let precoTotal = 0


    let data = JSON.parse(localStorage.comprasData)


    for (i = 0; i < data.length; i++) {
        let precoDesse = data[i].preco * data[i].quantidade

        precoTotal = precoDesse + precoTotal
        console.log(precoTotal);
        let template = document.getElementById("produto-carrinho-template").textContent;

        let html = Mustache.render(template, data[i]);

        let produtoElemento = document.createElement("div");

        produtoElemento.classList.add("card-tap-target", "z-depth-1");
        produtoElemento.innerHTML = html

        document.querySelector(".lista-elementos").appendChild(produtoElemento)

        $(".card-tap-target").animate({
            opacity: "1"


        }, 300)

    }

    $("#preco-total").text("TOTAL: R$" + precoTotal)

    localStorage.TotalPrice = precoTotal;
}


$("#finalizar-compra    ").click(finalizarCompra)


function finalizarCompra() {

    let dataData = Date()

    let dataParse = JSON.parse(localStorage.comprasData)

    let userParse = JSON.parse(localStorage.userData)

    let idParse = JSON.parse(localStorage.idUsuario)

    console.log(dataParse)
    console.log(userParse)


    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/jefferson/loja5/',
        success: function (data) {
            let ultimoId = null;
            console.log(data)
            if (data.length == 0) {

                ultimoId = 0

                enviarCompra(ultimoId)

            } else {
                ultimoId = parseInt(data[data.length - 1].idCompra) + 1
                enviarCompra(ultimoId)

            }

        }
    });


    function enviarCompra(id) {
        let listaComprasFeitas = localStorage.comprasData
        let precoTotal = localStorage.TotalPrice;
        $.ajax({
            type: 'POST',
            url: 'http://rest.learncode.academy/api/jefferson/loja5/',
            data: {
                idCompra: id,
                listaCompras: listaComprasFeitas,
                total: precoTotal,
                hora: dataData
            },
            success: function (data) {

                enviarCompraUser(id)
            }
        });


    }

    function enviarCompraUser(idCompra) {

        let listaComprasFeitas = []

        if (userParse.comprasFeitas == undefined) {

            listaComprasFeitas = []

            listaComprasFeitas.push(idCompra)

        } else {

            listaComprasFeitas = userParse.comprasFeitas
            listaComprasFeitas.push(idCompra)
        }

        console.log(userParse.comprasFeitas)


        $.ajax({
            type: 'PUT',
            data: {
                idUser: userParse.idUser,
                email: userParse.email,
                senha: userParse.senha,
                comprasFeitas: listaComprasFeitas
            },
            url: 'http://rest.learncode.academy/api/jefferson/users2/' + idParse,
            success: function () {
                console.log("Deu certo!")

                let data = {
                    idUser: userParse.idUser,
                    email: userParse.email,
                    senha: userParse.senha,
                    comprasFeitas: listaComprasFeitas
                }

                localStorage.userData = JSON.stringify(data)
                esvaziarLista()
                atualizarMinhasCompras()
                $("#button-minhas-compras").addClass("pulse-2")
            }
        });


        function esvaziarLista() {

            M.toast({
                html: 'Compra Efetuada com sucesso :)',
                classes: 'toast-cadastrar-success'
            })

            $(".lista-elementos").empty()

            let h5 = "<h5> Sua lista de compras está vazia </h5>"

            $(".lista-elementos").append(h5);


            localStorage.removeItem('comprasData')

            $("#finalizar-compra").hide()
            $("#preco-total").hide()


        }


    }

}

$("#button-minhas-compras").click(function () {
    $("#button-minhas-compras").removeClass("pulse-2")
})

function atualizarMinhasCompras() {

    let userParse = JSON.parse(localStorage.userData)
    let h4Modal = "<h4>Minhas Compras</h4>"
    let h5Modal = "<h5 class='center-align texto-nao-realizou'>Minhas Compras</h5>"

    $("#modal-content-minhas-compras").empty()
    $("#modal-content-minhas-compras").append(h4Modal)
    $("#modal-content-minhas-compras").append(h5Modal)


    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/jefferson/loja5/',
        success: function (data) {

            for (let i = 0; i < userParse.comprasFeitas.length; i++) {

                for (let y = 0; y < data.length; y++) {

                    if (userParse.comprasFeitas[i] == data[y].idCompra) {

                        exibirCompras(data[y].listaCompras, data[y].hora, data[y])



                    }
                    console.log('veri')

                }


            }


        }
    });



    function exibirCompras(lista, hora, compratot) {
        $(".texto-nao-realizou").hide()
        let listaParse = JSON.parse(lista)
        for (let i = 0; i < listaParse.length; i++) {


            console.log(listaParse[i])


            let template = document.getElementById("produto-carrinho-template").textContent;

            let html = Mustache.render(template, listaParse[i]);

            let produtoElemento = document.createElement("div");

            produtoElemento.classList.add("card-tap-target", "z-depth-1");
            produtoElemento.innerHTML = html

            document.querySelector("#modal-content-minhas-compras").appendChild(produtoElemento)



        }


        let template = document.getElementById("minhas-compras-1").textContent;

        let html = Mustache.render(template, compratot);

        let produtoElemento = document.createElement("div");

        produtoElemento.classList.add("divider-minhascompras")
        produtoElemento.innerHTML = html

        document.querySelector("#modal-content-minhas-compras").appendChild(produtoElemento)



    }






}
