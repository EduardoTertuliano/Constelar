// WhatsApp Widget JavaScript
class WhatsAppWidget {
    constructor() {
        this.isFormVisible = false;
        this.init();
    }

    init() {
        this.createWidget();
        this.bindEvents();
        this.populateActivities();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'whatsapp-widget';
        widget.innerHTML = `
            <div class="whatsapp-form" id="whatsappForm">
                <div class="whatsapp-header">
                    <h3>Fale Conosco</h3>
                    <button class="close-button" id="closeForm">&times;</button>
                </div>
                <div class="whatsapp-body">
                    <form id="whatsappContactForm">
                        <div class="form-group">
                            <label for="userName">Digite seu nome:</label>
                            <input type="text" id="userName" name="userName" required placeholder="Seu nome completo">
                        </div>
                        <div class="form-group">
                            <label for="userActivity">Qual atividade você deseja informação?</label>
                            <select id="userActivity" name="userActivity" required>
                                <option value="">Selecione uma atividade</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="userMessage">Qual sua mensagem?</label>
                            <textarea id="userMessage" name="userMessage" required placeholder="Digite sua mensagem aqui..."></textarea>
                        </div>
                        <button type="submit" class="send-button">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                            Enviar no WhatsApp
                        </button>
                    </form>
                </div>
            </div>
            <button class="whatsapp-button pulse" id="whatsappButton">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                </svg>
            </button>
        `;

        document.body.appendChild(widget);
    }

    populateActivities() {
        const activities = [
            'Curso de Reiki',
            'Experiência FreshBiz Game',
            'Liderança para Novos Líderes',
            'Mandala Terapêutica Dragonlight',
            'Jornada da Alma - Jogo Maha Lilah',
            'Perfil Comportamental DISC',
            'Dragon Coaching',
            'Astrologia',
            'Mapa Natal',
            'Revolução Solar e Tendências Anuais',
            'Análise Vocacional Astrológica',
            'Jogo da Transformação',
            'Informações Gerais',
            'Outros'
        ];

        const select = document.getElementById('userActivity');
        activities.forEach(activity => {
            const option = document.createElement('option');
            option.value = activity;
            option.textContent = activity;
            select.appendChild(option);
        });
    }

    bindEvents() {
        const whatsappButton = document.getElementById('whatsappButton');
        const whatsappForm = document.getElementById('whatsappForm');
        const closeButton = document.getElementById('closeForm');
        const contactForm = document.getElementById('whatsappContactForm');

        whatsappButton.addEventListener('click', () => {
            this.toggleForm();
        });

        closeButton.addEventListener('click', () => {
            this.hideForm();
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendToWhatsApp();
        });

        // Fechar ao clicar fora do formulário
        document.addEventListener('click', (e) => {
            if (this.isFormVisible && 
                !whatsappForm.contains(e.target) && 
                !whatsappButton.contains(e.target)) {
                this.hideForm();
            }
        });

        // Parar animação pulse após primeiro clique
        whatsappButton.addEventListener('click', () => {
            whatsappButton.classList.remove('pulse');
        }, { once: true });
    }

    toggleForm() {
        if (this.isFormVisible) {
            this.hideForm();
        } else {
            this.showForm();
        }
    }

    showForm() {
        const form = document.getElementById('whatsappForm');
        form.classList.add('active');
        this.isFormVisible = true;
    }

    hideForm() {
        const form = document.getElementById('whatsappForm');
        form.classList.remove('active');
        this.isFormVisible = false;
    }

    sendToWhatsApp() {
        const userName = document.getElementById('userName').value;
        const userActivity = document.getElementById('userActivity').value;
        const userMessage = document.getElementById('userMessage').value;

        if (!userName || !userActivity || !userMessage) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Número do WhatsApp da Constelar (substitua pelo número real)
        const phoneNumber = '5511964771973'; // Formato: código do país + DDD + número

        // Montar a mensagem
        const message = `Olá! Meu nome é ${userName}.

Tenho interesse em: ${userActivity}

Mensagem: ${userMessage}

Enviado através do site da Constelar.`;

        // Codificar a mensagem para URL
        const encodedMessage = encodeURIComponent(message);

        // Criar o link do WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Abrir o WhatsApp
        window.open(whatsappUrl, '_blank');

        // Limpar o formulário
        document.getElementById('whatsappContactForm').reset();

        // Fechar o formulário
        this.hideForm();

        // Mostrar mensagem de sucesso
        this.showSuccessMessage();
    }

    showSuccessMessage() {
        // Criar elemento de sucesso temporário
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #25D366;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
            z-index: 10000;
            font-family: 'Roboto', sans-serif;
            font-size: 14px;
            animation: slideInRight 0.3s ease;
        `;
        successDiv.textContent = 'Redirecionando para o WhatsApp...';

        document.body.appendChild(successDiv);

        // Remover após 3 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// Inicializar o widget quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new WhatsAppWidget();
});

// Adicionar CSS de animação dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
