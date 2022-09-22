$(document).ready(function() {

    $("#finish-j").click(function() {
        $(window).attr('location','https://tutorialdeep.com/knowhow/get-current-page-url-jquery/');
        $.ajax({
            type: "POST",
            url: "/cad_juridica",
            data: {
                'nome_proprietario': $("#nome_proprietario").val(),
                'telefone_proprietario': $('#celular')
            },
            success:function(res){
                res.redirect('/')
            }
        });
    });

});