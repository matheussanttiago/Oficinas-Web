$(document).ready(function(){
    $('#tipo_moto').click(function(){
        $('#tipo_moto').css('background-color', '#FF8500');
        $('#tipo_carro').css('background-color', 'rgba(51, 51, 51, 0.8)');
        $('#tipo_bike').css('background-color', 'rgba(51, 51, 51, 0.8)');

        $('#ofc_motos').css('display', 'flex');
        $('#ofc_carros').css('display', 'none');
        $('#ofc_bikes').css('display', 'none');
    })
    $('#tipo_carro').click(function(){
        $('#tipo_carro').css('background-color', '#FF8500');
        $('#tipo_moto').css('background-color', 'rgba(51, 51, 51, 0.8)');
        $('#tipo_bike').css('background-color', 'rgba(51, 51, 51, 0.8)');
        
        $('#ofc_carros').css('display', 'flex');
        $('#ofc_motos').css('display', 'none');
        $('#ofc_bikes').css('display', 'none');
    })
    $('#tipo_bike').click(function(){
        $('#tipo_bike').css('background-color', '#FF8500');
        $('#tipo_carro').css('background-color', 'rgba(51, 51, 51, 0.8)');
        $('#tipo_moto').css('background-color', 'rgba(51, 51, 51, 0.8)');

        $('#ofc_bikes').css('display', 'flex');
        $('#ofc_motos').css('display', 'none');
        $('#ofc_carros').css('display', 'none');
    })
 });