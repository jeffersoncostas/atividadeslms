  $(document).ready(function () {
      $('.modal').modal();
  });


  $(document).ready(function () {
      $('.tap-target').featureDiscovery();
  });



  $("#button-carrinho-compras").click(abrirCarrinho)

  function abrirCarrinho() {
      $('.tap-target').featureDiscovery('open');


  }




  if (localStorage.userData != undefined && localStorage.userData != null) {

      exibirProdutosLogado()

      atualizarNav()
      atualizarMinhasCompras()

  } else {
      $("#button-sair").hide()
      $("#button-carrinho-compras").hide()
      $("#button-minhas-compras").hide()
      $("#tap-target12").hide()

      exibirProdutosNLogado()
  }


  function atualizarNav() {
      $("#button-entrar").hide()
      $("#button-cadastrar").hide();


      $("#tap-target12").show()

      $("#button-sair").show();
      $("#button-carrinho-compras").show()
      $("#button-minhas-compras").show()

  }



  function exibirProdutosLogado() {

      $.ajax({
          type: 'GET',
          url: 'http://rest.learncode.academy/api/jefferson/loja2',
          success: function (data) {
              $(".lista-elementos").empty()
              for (let i = 0; i < data.length; i++) {

                  let template = document.getElementById("produto-template").textContent;

                  let html = Mustache.render(template, data[i]);

                  let produtoElemento = document.createElement("div");

                  produtoElemento.classList.add("col", "card-produtos");
                  produtoElemento.innerHTML = html

                  document.querySelector(".lista-elementos").appendChild(produtoElemento)

                  $(".card-produtos").animate({
                      opacity: "1"


                  }, 300)
                  document.querySelector("#quantidade-produto").value = 1

                  let iddoproduto = '#' + data[i].idProduto

                  let idRange1 = "#" + "quantidade" + data[i].idProduto
                  console.log(idRange1)
                  let idRange = document.querySelector(idRange1).value = 1


                  $(iddoproduto).click(maiscarrinho)

                  function maiscarrinho() {

                      adicionarCrr(idRange1, data[i].idProduto, data[i].imagemProduto, data[i].nomeProduto, data[i].preco)
                  }



              }



          }
      });

      function adicionarCrr(idRange1, id, imagem, nome, preco) {
          let idRange = document.querySelector(idRange1).value

          exibirnoCarrinho()

          function exibirnoCarrinho() {

              let qtd = idRange;

              let objetoProduto = {
                  idProduto: id,
                  imagemProduto: imagem,
                  nomeProduto: nome,
                  preco: preco,
                  quantidade: qtd
              }

              carrinhoDeCompras.push(objetoProduto)
              console.log(carrinhoDeCompras)
              aparecerNoCarrinho()

              $("#button-carrinho-compras").removeClass("blue darken-4")
              $("#button-carrinho-compras").addClass("yellow darken-3")
              $("#button-carrinho-compras").addClass("pulse")
          }


      }

  }

  function exibirProdutosNLogado() {
      $.ajax({
          type: 'GET',
          url: 'http://rest.learncode.academy/api/jefferson/loja2',
          success: function (data) {

              for (let i = 0; i < data.length; i++) {

                  let template = document.getElementById("produto-template-2").textContent;

                  let html = Mustache.render(template, data[i]);

                  let produtoElemento = document.createElement("div");

                  produtoElemento.classList.add("col", "card-produtos");
                  produtoElemento.innerHTML = html

                  document.querySelector(".lista-elementos").appendChild(produtoElemento)

                  $(".card-produtos").animate({
                      opacity: "1"


                  }, 300)

              }



          }
      });
  }



  // cadastrar
  $("#cadastrar-se").click(cadastrar)


  // sair 

  $("#button-sair").click(sairLogout)


  // entrar

  $("#button-entrar-login").click(entrar)

  function entrar() {
      let email = document.querySelector("#email-login").value;
      let password = document.querySelector("#password-login").value;

      $.ajax({
          type: 'GET',
          url: 'http://rest.learncode.academy/api/jefferson/users2',
          success: function (data) {
              let saberLogou = null;
              let x = 0;
              for (let i = 0; i < data.length; i++) {


                  if (email == data[i].email && password == data[i].senha) {

                      saberLogou = 1


                      break
                  } else {}

                  x++

              }

              if (saberLogou == 1) {

                  console.log("logou")

                  entrouLogou(data[x])
                  console.log(data[x])
              } else {

                  M.toast({
                      html: 'E-mail ou senha inválidos',
                      classes: 'toast-cadastrar'
                  })
              }



          }
      });




      function entrouLogou(data) {
          M.toast({
              html: 'Entrou com sucesso!',
              classes: 'toast-cadastrar-success'
          })

          localStorage.idUsuario = JSON.stringify(data.id)
          localStorage.userData = JSON.stringify(data)
          $(".lista-elementos").empty()
          exibirProdutosLogado()
          atualizarNav()
          $('.modal').modal('close');


      }

  }


  function sairLogout() {

      localStorage.removeItem('userData');
      location.reload()


  }

  function cadastrar() {
      console.log("entrei")
      let email = document.querySelector("#email-cadastrar").value.trim()
      let password = document.querySelector("#password-cadastrar").value.trim()
      console.log(email)


      if (email.length >= 7 && email.includes("@") && email.includes(".com") && password.length >= 6) {


          saberEmail()


      } else {
          M.toast({
              html: 'Email ou senha inválidos.',
              classes: 'toast-cadastrar'
          })
      }

      function saberEmail() {

          $.ajax({
              type: 'GET',
              url: 'http://rest.learncode.academy/api/jefferson/users2',
              success: function (data) {
                  let existe = null
                  let idUltimo = parseInt(data[data.length - 1].idUser)

                  for (let i = 0; i < data.length; i++) {


                      if (email == data[i].email) {
                          console.log("existe")
                          existe = 1;
                          M.toast({
                              html: 'E-mail já existente',
                              classes: 'toast-cadastrar'
                          })

                          break

                      } else {}



                  }
                  if (existe == null) {

                      cadastrarPost(idUltimo + 1)

                  }


              }
          });
      }



      function cadastrarPost(id) {

          $.ajax({
              type: 'POST',
              url: 'http://rest.learncode.academy/api/jefferson/users2',
              data: {
                  idUser: id,
                  email: email,
                  senha: password,
                  comprasFeitas: [""]
              },
              success: function (data) {

                  localStorage.idUsuario = JSON.stringify(data.id)
                  console.log(data)
                  localStorage.userData = JSON.stringify(data);
                  M.toast({
                      html: 'Cadastro efetuado com sucesso',
                      classes: 'toast-cadastrar-success'
                  });

                  document.querySelector("#email-cadastrar").value = ""
                  document.querySelector("#password-cadastrar").value = ""
                  $('.modal').modal('close');
                  exibirProdutosLogado()
                  atualizarNav()
                  $('.modal').modal('close');
              }
          });

      }


  }


  // adicionar ao carrinho

  let carrinhoDeCompras = []
  $("#comprar-button").hide()

  function aparecerNoCarrinho() {
      $("#comprar-button").show()

      let data = carrinhoDeCompras;

      $(".content-lista-carrinho").empty()

      let precoTotal = 0;

      for (i = 0; i < data.length; i++) {
          let precoDesse = data[i].preco * data[i].quantidade

          precoTotal = precoDesse + precoTotal
          console.log(precoTotal);
          let template = document.getElementById("produto-carrinho-template").textContent;

          let html = Mustache.render(template, data[i]);

          let produtoElemento = document.createElement("div");

          produtoElemento.classList.add("card-tap-target");
          produtoElemento.innerHTML = html

          document.querySelector(".content-lista-carrinho").appendChild(produtoElemento)

          $(".card-tap-target").animate({
              opacity: "1"


          }, 300)

      }

      $("#preco-total").text("TOTAL: R$" + precoTotal)

      localStorage.comprasData = JSON.stringify(carrinhoDeCompras)

  }


  $("#comprar-button").click(comprarItens)

  function comprarItens() {

      window.location.assign("compras.html")

  }





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
