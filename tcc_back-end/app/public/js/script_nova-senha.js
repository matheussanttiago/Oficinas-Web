var iconSenha = document.getElementById('icon-mostrar-senha')
var senha = document.getElementById('password')

iconSenha.addEventListener('click', function(){
    if(senha.type === 'password'){
        senha.type = 'text'
        iconSenha.src = 'img/esconder-senha.svg'
    } else {
        senha.type = 'password'
        iconSenha.src = 'img/mostrar-senha.svg'

    }
})

var iconSenhaR = document.getElementById('icon-mostrar-senha-r')
var senhaR = document.getElementById('password-r')

iconSenhaR.addEventListener('click', function(){
    if(senhaR.type === 'password'){
        senhaR.type = 'text'
        iconSenhaR.src = 'img/esconder-senha.svg'
    } else {
        senhaR.type = 'password'
        iconSenhaR.src = 'img/mostrar-senha.svg'

    }
})