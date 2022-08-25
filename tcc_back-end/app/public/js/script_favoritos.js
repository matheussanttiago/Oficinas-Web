


$(document).ready(function(){
    $(".oficinas").click(function(){
        $('.produtos').css('border-bottom', '1px solid #A9A9A9');
        $('.servicos').css('border-bottom', '1px solid #A9A9A9');
        $('.oficinas').css('border-bottom', '2px solid #FF8500');

        $("#oficinas").css("display", 'block');
        $("#servicos").css("display", 'none');
        $("#produtos").css("display", 'none');
    });
    $(".produtos").click(function(){
        $('.oficinas').css('border-bottom', '1px solid #A9A9A9');
        $('.servicos').css('border-bottom', '1px solid #A9A9A9');
        $('.produtos').css('border-bottom', '2px solid #FF8500');

        $("#produtos").css("display", 'block');
        $("#servicos").css("display", 'none');
        $("#oficinas").css("display", 'none');
    });
    $(".servicos").click(function(){
        $('.produtos').css('border-bottom', '1px solid #A9A9A9');
        $('.oficinas').css('border-bottom', '1px solid #A9A9A9');
        $('.servicos').css('border-bottom', '2px solid #FF8500');

        $("#servicos").css("display", 'block');
        $("#oficinas").css("display", 'none');
        $("#produtos").css("display", 'none');
    });
})