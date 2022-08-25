$(document).ready(function(){
    $('#tipo_moto').click(function(){
        $('#ofc_motos').css('display', 'block');
        $('#ofc_carros').css('display', 'none');
        $('#ofc_bikes').css('display', 'none');
    })
    $('#tipo_carro').click(function(){
        $('#ofc_carros').css('display', 'block');
        $('#ofc_motos').css('display', 'none');
        $('#ofc_bikes').css('display', 'none');
    })
    $('#tipo_bike').click(function(){
        $('#ofc_bikes').css('display', 'block');
        $('#ofc_motos').css('display', 'none');
        $('#ofc_carros').css('display', 'none');
    })

    $('.tipos_veiculos').click(function(){
        $(this).css('background-color', '#FF8500');
        $(this).siblings().css('background-color', 'rgba(51, 51, 51, 0.8)');
    })
 });

