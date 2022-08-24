// SCRIPT PARA A ADIÇÃO DE FOTOS DA OFICINA
let input_foto = document.getElementById('add-img')
var num_fotos = document.querySelectorAll("figure");
var imgContainer = []
// input_foto.addEventListener('change', (event) => {
$("#add-img").on("change", function () {

    // FUNÇÃO PARA MOSTRAR NUMERO DE FOTOS SELECIONADAS
    // var numFiles = $(this).get(0).files.length
    // alert(numFiles);

    // console.log(input_foto.files)
    // console.log(num_falta)
    var num_falta = 6 - imgContainer.length
    if ($("#add-img")[0].files.length > 6 || $("#add-img")[0].files.length > num_falta) {

        alert("Você pode adicionar somente até 6 fotos");

    } else {

        for (let i of input_foto.files) {

            let reader = new FileReader();
            // console.log(num_fotos.length); // quantidade de fotos

            reader.onload = () => {
                let img = document.createElement('img');
                // console.log(num_fotos)

                if (imgContainer.length <= 5) {
                    imgContainer.push(input_foto.files[0]);
                    // console.log(imgContainer.length)
                    num_falta = 6 - imgContainer.length
                    // let num_falta = (6 - num_fotos.length)
                    // console.log(num_fotos.length)
                    console.log(imgContainer.length);

                    let close_btn = document.createElement('img');
                    close_btn.setAttribute('src', 'img/close-btn.svg');
                    // SCRIPT PARA REMOVER FOTO
                    close_btn.addEventListener('click', function () {
                        close_btn.parentNode.remove(this);
                        imgContainer.splice(imgContainer.indexOf(this), 1);
                        console.log(imgContainer.length);
                    });

                    close_btn.classList.add('close_btn')

                    let figure = document.createElement('figure');

                    img.setAttribute('src', reader.result);

                    figure.insertBefore(img, null);
                    figure.insertBefore(close_btn, null);

                    document.getElementById('box_preview_fotos').appendChild(figure)
                    figure.classList.add('preview_fotos')

                } else {

                    alert("Você pode adicionar somente até 6 fotos");

                }
            };
            reader.readAsDataURL(i);
        }
    }
});