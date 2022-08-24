$(document).ready(function () {
    $("#check_menu").click(function () {
        $("#modal_box").slideToggle();
        // $("#modal_box").css('position', 'relative');
        if(window.innerWidth < 590){
            setTimeout(hideTopo, 100);
            function hideTopo() {
                $("#topo_pesquisa").hide();
                $("#topo").hide();
            }
            $('body').css('overflow', 'hidden')
    
            if (!$('#check_menu').is(':checked')) {
                setTimeout(showTopo, 280);
                function showTopo() {
                    $("#topo_pesquisa").show();
                    $("#topo").show();
                }
                $('body').css('overflow', 'auto')
    
            }
        }
    })
    $(".hamburger").click(function () {
        // $("#line2").css('display', 'none')
    })
    $('.filtro').click(function () {
        $("#container_filtro").css('display', 'flex');
        $('#modal').show();
        $('body').css('overflow', 'hidden');
    })
    $('#modal').click(function () {
        $("#container_filtro").hide();
        $('#modal').hide();
        $('body').css('overflow', 'auto');
    })


    $(".opcao-filtro").click(function () {
        $(this).css('background', '#FF8500');
        $(this).css('color', '#FFF');

        $(this).siblings().css('background', '#FFF');
        $(this).siblings().css('color', '#FF8500');
    })

    $(".opcao-avaliacao").click(function () {
        $(this).css('background', '#FF8500');
        $(this).css('color', '#FFF');
        $(this).children('img').attr('src', './img/star_oficina_icon.svg');

        $(this).siblings().css('background', '#FFF');
        $(this).siblings().css('color', '#FF8500');
        $(this).siblings().children('img').attr('src', './img/star.svg');
    })

})