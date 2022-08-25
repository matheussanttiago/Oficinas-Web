$(document).ready(function () {
    $('#contatoSms').click(function () {
        $('#contatoSms').css('border', 'solid 3px #FF8500');
        $('#contatoEmail').css('border', 'solid 3px #D7D7D7');
    });
    $('#contatoEmail').click(function () {
        $('#contatoEmail').css('border', 'solid 3px #FF8500');
        $('#contatoSms').css('border', 'solid 3px #D7D7D7');
    });

    $(".inputs_v").keyup(function () {
        if (this.value.length == this.maxLength) {
            $(this).next('.inputs_v').focus();
        }
    });
})

// function toggleButton() {
//     const input1 = document.querySelector('#input1').value;
//     const input2 = document.querySelector('#input2').value;
//     const input3 = document.querySelector('#input3').value;
//     const input4 = document.querySelector('#input4').value;

//     if (input1 && input2 && input3 && input4) {
//         document.querySelector('#verificar').disabled = false;
//         alert('oi')
//         return
//     }
//     document.querySelector('#verificar').disabled = true;
// }