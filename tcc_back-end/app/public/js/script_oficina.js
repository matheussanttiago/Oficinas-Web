$(document).ready(function(){
    $('#positivas_av').click(function(){
        $('#positivas_av').css('border-bottom', '2px solid var(--cor-principal)');
        $('#negativas_av').css('border-bottom', '1px solid #5E5E5E');
        $('#todas_av').css('border-bottom', '1px solid #5E5E5E');

        $('#box_avaliacoes').hide();
        $('#box_avaliacoes-pos').show();
        $('#box_avaliacoes-neg').hide();
    });
    $('#negativas_av').click(function(){
        $('#negativas_av').css('border-bottom', '2px solid var(--cor-principal)');
        $('#positivas_av').css('border-bottom', '1px solid #5E5E5E');
        $('#todas_av').css('border-bottom', '1px solid #5E5E5E');

        $('#box_avaliacoes').hide();
        $('#box_avaliacoes-pos').hide();
        $('#box_avaliacoes-neg').show();
    });
    $('#todas_av').click(function(){
        $('#todas_av').css('border-bottom', '2px solid var(--cor-principal)');
        $('#negativas_av').css('border-bottom', '1px solid #5E5E5E');
        $('#positivas_av').css('border-bottom', '1px solid #5E5E5E');
        
        $('#box_avaliacoes').show();
        $('#box_avaliacoes-pos').hide();
        $('#box_avaliacoes-neg').hide();
    });
})

