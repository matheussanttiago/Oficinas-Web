$(document).ready(function() {

    $("#finish-j").click(function() {
        $.ajax({
            type: "POST",
            url: "/cad_juridica",
            data: {
                'nome_proprietario': $("#nome_proprietario").val(),
                'telefone_proprietario': $('#celular')
            },
            success: function (){
                $('.pop-up').css('display', 'flex')
                window.location.href = '/add-oficina'
            }
        });
    });

});