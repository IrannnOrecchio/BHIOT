// script.js

// Este arquivo JavaScript pode ser usado para adicionar interatividade ao seu site.
// No momento, as imagens fornecidas não indicam a necessidade de JavaScript complexo,
// mas aqui estão algumas ideias de funcionalidades que você pode adicionar:

document.addEventListener('DOMContentLoaded', () => {
    // Exemplo: Adicionar um efeito de "scroll-to-top" para um botão futuro
    const scrollToTopButton = document.getElementById('scrollToTop');
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) { // Mostra o botão após rolar 200px
                scrollToTopButton.classList.remove('hidden');
            } else {
                scrollToTopButton.classList.add('hidden');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Rola suavemente para o topo
            });
        });
    }

    // Exemplo: Validação básica de formulário antes do envio
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Previne o envio padrão do formulário para que o JS possa lidar com ele
            event.preventDefault();

            // Você pode adicionar lógicas de validação aqui
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                // Em vez de alert(), usaremos um elemento de mensagem na página
                displayMessage('Por favor, preencha todos os campos do formulário.', 'error');
                return; // Impede o envio se os campos estiverem vazios
            }

            // Validação de e-mail simples (você pode usar uma regex mais robusta)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                displayMessage('Por favor, insira um e-mail válido.', 'error');
                return;
            }

            // Se a validação passar, você pode simular o envio do formulário
            // ou enviar os dados para um backend (necessitaria de mais código)
            displayMessage('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'success');

            // Limpa o formulário após o "envio"
            contactForm.reset();

            // Em um ambiente real, você faria uma requisição fetch/XMLHttpRequest aqui:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    displayMessage('Mensagem enviada com sucesso!', 'success');
                    contactForm.reset();
                } else {
                    displayMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                displayMessage('Ocorreu um erro na conexão. Tente novamente mais tarde.', 'error');
            });
            */
        });
    }

    /**
     * Função para exibir mensagens na UI (substituindo alert())
     * @param {string} message - A mensagem a ser exibida.
     * @param {string} type - O tipo de mensagem ('success' ou 'error').
     */
    function displayMessage(message, type) {
        let messageBox = document.getElementById('messageBox');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.id = 'messageBox';
            // Adiciona estilos básicos para a caixa de mensagem
            messageBox.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 15px 25px;
                border-radius: 8px;
                color: white;
                font-weight: bold;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
            `;
            document.body.appendChild(messageBox);
        }

        messageBox.textContent = message;
        if (type === 'success') {
            messageBox.style.backgroundColor = '#4CAF50'; // Verde para sucesso
        } else if (type === 'error') {
            messageBox.style.backgroundColor = '#F44336'; // Vermelho para erro
        }

        messageBox.style.opacity = 1; // Faz a mensagem aparecer

        // Faz a mensagem desaparecer após 3 segundos
        setTimeout(() => {
            messageBox.style.opacity = 0;
        }, 3000);
    }
});

