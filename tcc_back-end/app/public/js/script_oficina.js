$(document).ready(function(){
    $('#positivas_av').click(function(){
        $('#positivas_av').css('border-bottom', '2px solid var(--cor-principal)');
        $('#negativas_av').css('border-bottom', '1px solid #5E5E5E');
        $('#todas_av').css('border-bottom', '1px solid #5E5E5E');
    });
    $('#negativas_av').click(function(){
        $('#negativas_av').css('border-bottom', '2px solid var(--cor-principal)');
        $('#positivas_av').css('border-bottom', '1px solid #5E5E5E');
        $('#todas_av').css('border-bottom', '1px solid #5E5E5E');
    });
    $('#todas_av').click(function(){
        $('#todas_av').css('border-bottom', '2px solid var(--cor-principal)');
        $('#negativas_av').css('border-bottom', '1px solid #5E5E5E');
        $('#positivas_av').css('border-bottom', '1px solid #5E5E5E');
    });
})