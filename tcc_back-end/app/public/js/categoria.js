$(document).ready(function(){
    let selecionado = false
    $('.line-checkbox').click(function(){
        $(this).css('background-color', '#FF8500')
        selecionado = true
    })
    if(selecionado == true){
        $('.line-checkbox').click(function(){
            alert('teste')
        })
    }
})