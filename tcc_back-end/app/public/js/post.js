$(document).ready(function() {

    $("#finish-j").click(function() {
        $.ajax({
            type: "POST",
            url: "/cad_juridica",
            data: {
                'nome_proprietario': $("#nome_proprietario").val(),
                'telefone_proprietario': $('#celular')
            },
            success: window.location.href = 'http://localhost:3000'
        });
    });

});