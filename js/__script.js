const mensagem = document.querySelector('#msg');
const form = document.querySelector('#formId');
const contentGrid = document.querySelector('.content-grid');
const gridComments = document.querySelector('.grid-comments');
const msgAlert = document.querySelector('.alert');
const btnSend = document.querySelector('#btn-send');
const btnSendAnswer = document.querySelector('#answer');



form.addEventListener('submit', function(e){
    e.preventDefault();
    
    const value = mensagem.value;
    const id = new Date().getTime().toString();
    let img = ['./images/img-1.jpg', './images/img-2.jpg', './images/img-3.jpg', './images/img-4.jpg', './images/img-5.jpg'];
    let random = Math.floor(Math.random() * img.length + 1);
    
    if( value !== '' ){
        
        const element = document.createElement('article');
        element.classList.add('grid');
        element.setAttribute('data-id', id);

        element.innerHTML = `
            <div class="image">
                <img src="./images/img-${random}.jpg" id="img" />       
            </div>
            <div class="content">
                <div class="comments">
                    ${value}
                </div>
                <div class="answer">
                    <button class="link-answer">Responder</button>
                    <button class="link-exclude">Excluir</button>
                </div>
            </div>
        `;

        const linkAnswer = element.querySelector('.link-answer');
        const linkExclude = element.querySelector('.link-exclude');
        linkAnswer.addEventListener('click', answerComments);
        linkExclude.addEventListener('click', deleteComments);

        contentGrid.appendChild(element);
        gridComments.classList.add('active');
        displayAlert('Comentário enviado com sucesso!', 'sucess');
       
    }else{
        displayAlert('Preencha o comentário!', 'danger');
    }
}); 

function answerComments(e){

    let element = e.currentTarget.parentElement.parentElement.parentElement;
    debugger
    //btnSend.classList.add('inative');
    //btnSendAnswer.classList.add('active');
    window.scrollTo(0, 0);
    
    
    // btnSendAnswer.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     console.log(element)
    //     debugger

    //     const value = mensagem.value;
    //     const id = new Date().getTime().toString();
    //     const newElement = document.createElement('section');
    //     newElement.classList.add('new-grid');
    //     newElement.setAttribute('data-id', id);
    
    //     newElement.innerHTML = `
    //         <div class="image">
    //             <img src="./images/img-1.jpg" id="img" />       
    //         </div>
    //         <div class="content">
    //             <div class="comments">
    //                 ${value}
    //             </div>
    //             <div class="answer">
    //                 <button class="link-answer">Responder</button>
    //                 <button class="link-exclude">Excluir</button>
    //             </div>
    //         </div>
    //     `;
        
    //     element.after(newElement);
    //     btnSend.classList.remove('inative');
    //     btnSendAnswer.classList.remove('active');
    //     displayAlert('Resposta enviada com sucesso!', 'sucess');
    // });        
}

function displayAlert(text, style){
    msgAlert.textContent = text;
    msgAlert.classList.add(`alert-${style}`);

    setTimeout( () => {
        msgAlert.textContent = '';
        msgAlert.classList.remove(`alert-${style}`);
    },1200);
}

function deleteComments(e){
    const element = e.currentTarget.parentElement.parentElement.parentElement;
    const id = e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
    
    contentGrid.removeChild(element);
    if(contentGrid.children.length === 0){
        gridComments.classList.remove('active');
    }
    displayAlert('Comentário removido com sucesso','sucess');
}