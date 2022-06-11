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