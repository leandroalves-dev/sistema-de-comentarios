const msgAlert = document.querySelector('.alert');
const form = document.querySelector('#formId');
const inputName = document.querySelector('#nome');
const inputMsg = document.querySelector('#msg');
const commentsContainer = document.querySelector('.comments-container');
const gridCommentsTitle = document.querySelector('.grid-comments h2');

let nome = '';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let name = inputName.value;
    let msg = inputMsg.value;

    if( name !== '' && msg !== '' ){
        displayComments(name, msg);
        displayAlert('Comentário efetuado com sucesso!', 'sucess');
    }else{
        displayAlert('Prencha os campos!', 'danger');
    }

    inputName.value= '';
    inputMsg.value = '';
})

const displayAlert = (text, style) => {
    msgAlert.textContent = text;
    msgAlert.classList.add(`alert-${style}`);
    
    setTimeout(() => {
        msgAlert.textContent = '';
        msgAlert.classList.remove(`alert-${style}`);
    },1200);
}

const displayComments = (name, msg) => {
    const contentGrid = document.querySelector('.content-grid');   
    const element = commentsContainer.cloneNode('true');
    element.classList.remove('hide');
    const nome = element.querySelector('.name');
    const data = element.querySelector('.date');
    const comentario = element.querySelector('.comments');

    const date = new Date();
    const dateActual = date.toLocaleDateString();
    const hour = date.toLocaleTimeString('pt-BR');

    nome.textContent = name;
    data.textContent = `${dateActual} - ${hour}`;
    comentario.textContent = msg; 
    
    contentGrid.appendChild(element);
    gridCommentsTitle.classList.remove('hide');
    
    qtdaTotalComments();
}

const responderComentario = (btn) => {
    const respostaDiv = btn.parentNode.nextElementSibling;    
    respostaDiv.style.display = respostaDiv.style.display === "none" ? "block" : "none";    
}

const adicionarResposta = (btn) => {
    
    const respostaDiv = btn.parentNode.parentNode;
    const responseName = respostaDiv.querySelector("input").value;
    const responseComments = respostaDiv.querySelector("textarea").value;
    const date = new Date();
    const dateActual = date.toLocaleDateString();
    const hour = date.toLocaleTimeString('pt-BR');
  
    if (responseName === "" || responseComments === "") {
        displayAlert('Prencha os campos!', 'danger');
        return;
    }
    
    anonimo(responseName)

    let responseHtml = `
        <div class="image">
            <img src="./images/img-2.jpg" />
        </div>
        <div class="content">
            <div class="users">
                <span class="name">${nome}</span>
                <span class="date">${dateActual} - ${hour}</span>
            </div>
            <div class="comments">${responseComments}</div>
        </div>
    `;

    let responseContainer = respostaDiv.parentNode.querySelector(".response");
    
    if (!responseContainer) {
        responseContainer = document.createElement("div");
        responseContainer.className = "response-container";
        respostaDiv.parentNode.appendChild(responseContainer);
    }

    responseContainer.innerHTML += responseHtml;
   
    respostaDiv.querySelector("input").value = "";
    respostaDiv.querySelector("textarea").value = "";
    respostaDiv.style.display = "none"; 
    const checkbox = respostaDiv.querySelector('input[type=checkbox]');
    checkbox.checked = false  
}

const anonimo = (responseName) => {
    
    let anonimo = document.querySelector('#anonimo');

    if( anonimo.checked === true ){        
        nome = 'Anônimo';
    }else{
        nome = responseName;
    }
}

function deleteComments(e){
    const btnExclude = e.closest('.comments-container');

    Swal.fire({
        title: 'Excluir comentário?',
        text: "Você excluirá seu comentário!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#08b3dd',
        cancelButtonColor: '#333',
        confirmButtonText: 'Sim, deletar!'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: "Deletado",
                text: 'Seu comentário foi deletado com sucesso!'
            }).then( () => {
                btnExclude.remove();
                qtdaTotalComments();
            });  
        } 
    });

   
}

const qtdaTotalComments = () => {
    const commentsContainer = document.querySelectorAll('.content-grid .comments-container');
    const qtda = document.querySelector('.qtda');

    commentsContainer.forEach( (el, index) => {
        qtda.textContent = index + 1;
    });
    
    if( commentsContainer.length === 0 ){
        gridCommentsTitle.classList.add('hide');    
    }
}

