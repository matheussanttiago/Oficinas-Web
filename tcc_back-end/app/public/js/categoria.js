$(document).ready(function(){
    // let selecionado = false
    // $('.line-checkbox').click(function(){
    //     $(this).css('background-color', '#FF8500')
    //     selecionado = true
    // })
    // if(selecionado == true){
    //     $('.line-checkbox').click(function(){
    //         alert('teste')
    //     })
    // }
    // alert('oi')
    // console.log()
    $("#carro").click(function(){
        if($('#carro').is(':checked')){
            $('#cat-carro').css('background-color', '#FF8500');
        } else {
            $('#cat-carro').css('background-color', 'rgba(51, 51, 51, 0.8)');      
        }
    })
    $("#moto").click(function(){
        if($('#moto').is(':checked')){
            $('#cat-moto').css('background-color', '#FF8500');
        } else {
            $('#cat-moto').css('background-color', 'rgba(51, 51, 51, 0.8)');      
        }
    })
    $("#van").click(function(){
        if($('#van').is(':checked')){
            $('#cat-van').css('background-color', '#FF8500');
        } else {
            $('#cat-van').css('background-color', 'rgba(51, 51, 51, 0.8)');      
        }
    })
    $("#caminhao").click(function(){
        if($('#caminhao').is(':checked')){
            $('#cat-caminhao').css('background-color', '#FF8500');
        } else {
            $('#cat-caminhao').css('background-color', 'rgba(51, 51, 51, 0.8)');      
        }
    })
    $("#bicicleta").click(function(){
        if($('#bicicleta').is(':checked')){
            $('#cat-bicicleta').css('background-color', '#FF8500');
        } else {
            $('#cat-bicicleta').css('background-color', 'rgba(51, 51, 51, 0.8)');      
        }
    })
})