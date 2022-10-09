$(document).ready(function(){
    $('#telefone').mask('(00) 0000-0000');
    $('.phone-mask').mask('(00) 0000-00009');
    $('.phone-mask').blur(function(event){
        if($(this).val().length == 15){
            $('.phone-mask').mask('(00) 00000-0009')
        } else {
            $('.phone-mask').mask('(00) 0000-0009')
        }
    })
    $('#cep').mask('00000-000');
    $('#cnpj_oficina').mask('00.000.000/0000-00');
    $('#cpf').mask('000.000.000-00');
    $('#valor_produto').mask('999.999,00', {reverse: true}) //num 9 = opcional / 0 = obrigatório

    $('#input-cartao').mask('0000  0000  0000  0000');
    $('#num_cartao').mask('****  ****  ****  0000');
})