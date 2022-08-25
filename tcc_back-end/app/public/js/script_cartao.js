$(document).ready(function () {
    $('#next-step').click(function () {

        if(!$("#opcao-paypal").is(':checked') && !$("#opcao-google").is(':checked')
        && !$("#opcao-apple").is(':checked') && !$("#opcao-samsung").is(':checked')
        && !$("#opcao-cartao").is(':checked')){
            alert('Você precisa selecionar uma opção para continuar')
        } else {
            if (window.innerWidth < 839) {
                $('#plano').show();
                $('#sec-forma_pgmt').hide();
            } else {
                $('#plano').show();
                $('#next-step').hide();
                $('.voltar_alterar').hide();
                $('.btn_alterar').hide();
                $('.btn_alterar').hide();
                $('.titulo-pgmt').hide();
            }
        }
    });
    $('.btn_add_cartao').click(function () {
        if (window.innerWidth < 839) {
            $('#cartao_section1').show();
            $('#sec-forma_pgmt').hide();
        } else {
            $('#cartao_section1').show();
            $('#modal').show();
        }

        // $('#next-step').hide();        
    });
    $('.voltar_alterar').click(function () {
        $('#plano').hide();
        $('#sec-forma_pgmt').show();
    })
    $('.voltar').click(function () {
        $('#cartao_section1').hide();
        $('#modal').hide();
        $('#sec-forma_pgmt').show();
    })


    // if($("#opcao-paypal").is(':checked')){
    //     $('#forma-escolhida').text('Paypal');
    //     $('#img-escolhida').attr('src', './img/logos_paypal.svg');
    // }
    // if($("#opcao-google").is(':checked')){
    //     $('#forma-escolhida').text('Google Pay');
    //     $('#img-escolhida').attr('src', './img/logo_google-pay.svg');
    // }
    // if($("#opcao-apple").is(':checked')){
    //     $('#forma-escolhida').text('Apple Pay');
    //     $('#img-escolhida').attr('src', './img/logo_apple-pay.svg');
    // }
    // if($("#opcao-samsung").is(':checked')){
    //     $('#forma-escolhida').text('Samsung Pay');
    //     $('#img-escolhida').attr('src', './img/logo_samsung-pay.svg');
    // }
    // if($("#opcao-cartao").is(':checked')){
    //     $('#forma-escolhida').text('**** **** **** 0007');
    //     $('#img-escolhida').attr('src', './img/logos_mastercard.svg');
    // }

    $("#opcao-paypal").click(function(){
        $('#forma-escolhida').text('Paypal');
        $('#img-escolhida').attr('src', './img/logos_paypal.svg');
    })

    $("#opcao-google").click(function(){
        $('#forma-escolhida').text('Google Pay');
        $('#img-escolhida').attr('src', './img/logo_google-pay.svg');
    })

    $("#opcao-apple").click(function(){
        $('#forma-escolhida').text('Apple Pay');
        $('#img-escolhida').attr('src', './img/logo_apple-pay.svg');
    })

    $("#opcao-samsung").click(function(){
        $('#forma-escolhida').text('Samsung Pay');
        $('#img-escolhida').attr('src', './img/logo_samsung-pay.svg');
    })

    $("#opcao-cartao").click(function(){
        $('#forma-escolhida').text('**** **** **** 0007');
        $('#img-escolhida').attr('src', './img/logos_mastercard.svg');
    })
});