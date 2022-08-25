'use strict';

// API PARA O CEP
const limparFormulario = (endereco) => {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}


const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async () => {
    limparFormulario();
    document.getElementById('box-inputs_end').style.display = 'flex'
    const cep = document.getElementById('cep').value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!';
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP incorreto!';
    }

}

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep);




// SCRIPT PARA A ADIÇÃO DE FOTOS DA OFICINA
let input_foto = document.getElementById('add-img')
var num_fotos = document.querySelectorAll("figure");
var imgContainer = []
// input_foto.addEventListener('change', (event) => {
$("#add-img").on("change", function () {

    // FUNÇÃO PARA MOSTRAR NUMERO DE FOTOS SELECIONADAS
    // var numFiles = $(this).get(0).files.length
    // alert(numFiles);

    // console.log(input_foto.files)
    // console.log(num_falta)
    var num_falta = 6 - imgContainer.length
    if ($("#add-img")[0].files.length > 6 || $("#add-img")[0].files.length > num_falta) {

        alert("Você pode adicionar somente até 6 fotos");

    } else {

        for (let i of input_foto.files) {

            let reader = new FileReader();
            // console.log(num_fotos.length); // quantidade de fotos

            reader.onload = () => {
                let img = document.createElement('img');
                // console.log(num_fotos)

                if (imgContainer.length <= 5) {
                    imgContainer.push(input_foto.files[0]);
                    // console.log(imgContainer.length)
                    num_falta = 6 - imgContainer.length
                    // let num_falta = (6 - num_fotos.length)
                    // console.log(num_fotos.length)
                    console.log(imgContainer.length);

                    let close_btn = document.createElement('img');
                    close_btn.setAttribute('src', 'img/close-btn.svg');
                    // SCRIPT PARA REMOVER FOTO
                    close_btn.addEventListener('click', function () {
                        close_btn.parentNode.remove(this);
                        imgContainer.splice(imgContainer.indexOf(this), 1);
                        console.log(imgContainer.length);
                    });

                    close_btn.classList.add('close_btn')

                    let figure = document.createElement('figure');

                    img.setAttribute('src', reader.result);

                    figure.insertBefore(img, null);
                    figure.insertBefore(close_btn, null);

                    document.getElementById('box_preview_fotos').appendChild(figure)
                    figure.classList.add('preview_fotos')

                } else {

                    alert("Você pode adicionar somente até 6 fotos");

                }
            };
            reader.readAsDataURL(i);
        }
    }
});

// SCRIPT PARA PREVIEW DA FOTO DE PERFIL
let espaco_foto = document.getElementById('foto_padrao_perfil')
let input_foto_perfil = document.getElementById('add-img-p')
// let teste = document.getElementById('teste')
espaco_foto.addEventListener('click', function () {
    input_foto_perfil.click()
});
input_foto_perfil.addEventListener('change', (event) => {
    let reader = new FileReader();
    reader.onload = () => {
        espaco_foto.src = reader.result;
        // espaco_foto.style.width = '140px'
        // espaco_foto.style.height = '140px'
        espaco_foto.classList.add('img-escolhida')
        espaco_foto.style.borderRadius = '50%'
    };
    reader.readAsDataURL(input_foto_perfil.files[0]);
});