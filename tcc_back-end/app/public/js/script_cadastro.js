


$(document).ready(function () {
    $(".juridica").click(function () {
        $('.fisica').css('border-bottom', '1px solid #A9A9A9');
        $('.juridica').css('border-bottom', '2px solid #FF8500');

        $(".cad_visitante").css("display", 'none');
        $(".cad_proprietario").css("display", 'block');
    });
    $(".fisica").click(function () {
        $('.fisica').css('border-bottom', '2px solid #FF8500');
        $('.juridica').css('border-bottom', '1px solid #A9A9A9');

        $(".cad_proprietario").css("display", 'none');
        $(".cad_visitante").css("display", 'block');
    });

    // $('#add-img').click(function() {
    //     let input_foto = document.getElementById('add-img')
    //     let reader = new FileReader();
    //     reader.onload = () => {
    //         input_foto.src = reader.result;
    //         // $("#botao_troca_imagem").remove();
    //     };
    //     reader.readAsDataURL(input_foto.files[0]);

    // });
    // alert(reader.result)


    let espaco_fotoFisico = document.getElementById('foto_padrao_perfil-f')
    let input_fotoFisico = document.getElementById('add-img-f')
    // let teste = document.getElementById('teste')
    espaco_fotoFisico.addEventListener('click', function () {
        input_fotoFisico.click()
    });
    input_fotoFisico.addEventListener('change', (event) => {
        let reader = new FileReader();
        reader.onload = () => {
            espaco_fotoFisico.src = reader.result;
            // espaco_fotoFisico.style.width = '140px'
            // espaco_fotoFisico.style.height = '140px'
            espaco_fotoFisico.classList.add('img-escolhida')
            espaco_fotoFisico.style.borderRadius = '50%'
        };
        reader.readAsDataURL(input_fotoFisico.files[0]);
    });

    let espaco_fotoJuridico = document.getElementById('foto_padrao_perfil-j')
    let input_fotoJuridico = document.getElementById('add-img-j')
    // let teste = document.getElementById('teste')
    espaco_fotoJuridico.addEventListener('click', function () {
        input_fotoJuridico.click()
    });
    input_fotoJuridico.addEventListener('change', (event) => {
        let reader = new FileReader();
        reader.onload = () => {
            espaco_fotoJuridico.src = reader.result;
            // espaco_foto.style.width = '140px'
            // espaco_foto.style.height = '140px'
            espaco_fotoJuridico.classList.add('img-escolhida')
            espaco_fotoJuridico.style.borderRadius = '50%'
        };
        reader.readAsDataURL(input_fotoJuridico.files[0]);
    });


})