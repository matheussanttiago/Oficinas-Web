// SCRIPT DAS ESTRELAS DE AVALIAÇÃO
let stars = document.querySelectorAll('.star-icon');
let estrelas = document.querySelector('.avaliacao') 
estrelas.addEventListener('click', function (e) {
    let classStar = e.target.classList;
    if (!classStar.contains('ativo')) {
        stars.forEach(function (star) {
            star.classList.remove('ativo');
        });
        classStar.add('ativo');
        let valor_estrela = e.target.getAttribute('data-avaliacao')
        console.log(valor_estrela);
    }
});

// SCRIPT DO CONTADOR DE CARACTERES NO TEXTAREA
function contaCaracteres(campo_passado){
    var limite = 300;
    var campo = campo_passado.value.length;
    var maxlength = document.getElementById('comentar').setAttribute("maxlength", limite);
    var limiteCrt = document.getElementById('limite-crt');
    limiteCrt.innerHTML = campo + '/' + limite;
};

// SCRIPT PARA FAZER A IMAGEM QUE O USUARIO ESCOLHER APARECER NA TELA
let espaco_foto = document.getElementById('quadrado')
let input_foto = document.getElementById('add-img')
let teste = document.getElementById('teste')
espaco_foto.addEventListener('click', function(){
    input_foto.click()
});
input_foto.addEventListener('change', (event) => {
    let reader = new FileReader();
    reader.onload = () => {
        espaco_foto.style.backgroundImage = 'url("' + reader.result + '")';
        espaco_foto.style.backgroundRepeat = 'no-repeat';
        espaco_foto.style.backgroundPosition = 'center center';
        espaco_foto.style.backgroundSize = 'cover';
        document.getElementById('addinput').innerHTML = 'Trocar Imagem'
    };
    reader.readAsDataURL(input_foto.files[0]);
});


// ---------------------------- JQUERY ---------------------------- 
$(document).ready(function(){
    $('#check_menu').click(function(){
        $('#topo').toggle();
    });
});