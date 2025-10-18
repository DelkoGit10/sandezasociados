// Widget del Chatbot Ana para Sandez & Asociados
(function() {
    'use strict';
    
    // Verificar si ya está cargado
    if (document.getElementById('ana-chat-button')) {
        console.log('⚠️ Chatbot Ana ya está cargado');
        return;
    }
    
    // Cargar Tailwind CSS si no está cargado
    if (!document.querySelector('script[src*="tailwindcss"]')) {
        const tailwindScript = document.createElement('script');
        tailwindScript.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(tailwindScript);
    }
    
    // Inyectar estilos
    const styles = document.createElement('style');
    styles.textContent = `
        :root {
            --ana-color-primary: #D4AF37;
            --ana-color-accent: #B8962E;
        }
        
        #ana-chat-window {
            position: fixed;
            bottom: 6rem;
            right: 1rem;
            z-index: 10000;
            width: 90vw;
            max-width: 350px;
            height: 70vh;
            max-height: 600px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            transform: scale(0);
            transform-origin: bottom right;
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
            opacity: 0;
            background: white;
            border-radius: 0.5rem;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        
        #ana-chat-window.open {
            transform: scale(1);
            opacity: 1;
        }
        
        #ana-chat-button {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            z-index: 10001;
            width: 4rem;
            height: 4rem;
            background-color: var(--ana-color-primary);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: background-color 0.2s;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
        }
        
        #ana-chat-button:hover {
            background-color: var(--ana-color-accent);
        }
        
        .ana-message-user {
            background-color: var(--ana-color-primary);
            color: white;
            border-bottom-right-radius: 0;
            max-width: 85%;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            font-size: 0.875rem;
        }
        
        .ana-message-ai {
            background-color: #E5E7EB;
            color: #1F2937;
            border-bottom-left-radius: 0;
            max-width: 85%;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            font-size: 0.875rem;
        }
        
        .ana-loader {
            border: 4px solid #F3F4F6;
            border-top: 4px solid var(--ana-color-primary);
            border-radius: 50%;
            width: 1.5rem;
            height: 1.5rem;
            animation: ana-spin 1s linear infinite;
        }
        
        @keyframes ana-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        #ana-chat-log {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            background: #F9FAFB;
        }
        
        #ana-chat-log::-webkit-scrollbar {
            width: 6px;
        }
        
        #ana-chat-log::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        #ana-chat-log::-webkit-scrollbar-thumb {
            background: var(--ana-color-primary);
            border-radius: 3px;
        }
    `;
    document.head.appendChild(styles);
    
    // Crear HTML del chatbot
    const chatHTML = `
        <button id="ana-chat-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
            </svg>
        </button>
        
        <div id="ana-chat-window">
            <div style="background-color: var(--ana-color-primary); color: white; padding: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h3 style="font-weight: bold; font-size: 1.125rem; margin: 0;">Asistente Ana</h3>
                    <p style="font-size: 0.75rem; opacity: 0.8; margin: 0;">Sandez & Asociados | Online 24/7</p>
                </div>
                <button id="ana-close-button" style="background: none; border: none; color: white; cursor: pointer; padding: 0.25rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <div id="ana-chat-log"></div>
            
            <div style="padding: 0.75rem; border-top: 1px solid #E5E7EB; background: white;">
                <div id="ana-loader-container" style="display: none; padding: 0.5rem; text-align: center;">
                    <div style="display: inline-flex; align-items: center; gap: 0.75rem;">
                        <div class="ana-loader"></div>
                        <span style="font-size: 0.875rem; color: var(--ana-color-primary);">Ana está pensando...</span>
                    </div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <input
                        type="text"
                        id="ana-chat-input"
                        placeholder="Escribe tu consulta..."
                        style="flex: 1; padding: 0.75rem; border: 1px solid #D1D5DB; border-radius: 0.5rem; font-size: 0.875rem; outline: none;"
                    />
                    <button
                        id="ana-send-button"
                        style="background-color: var(--ana-color-primary); color: white; padding: 0.75rem; border-radius: 0.5rem; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;"
                        title="Enviar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
                <p style="font-size: 0.75rem; color: #9CA3AF; margin-top: 0.5rem; text-align: center;">Ana te asistirá con información sobre Sandez & Asociados.</p>
            </div>
        </div>
    `;
    
    // Agregar al DOM
    const container = document.createElement('div');
    container.innerHTML = chatHTML;
    document.body.appendChild(container);
    
    // Configuración de la API
    const apiKey = "AIzaSyAQnLZyYw5nDKqCPe8kg0lYezY-xKBrI4U";
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";
    
    // Funciones del chatbot
    function markdownToHtml(markdown) {
        return markdown
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
    }
    
    function addMessage(text, isUser) {
        const chatLog = document.getElementById('ana-chat-log');
        const messageDiv = document.createElement('div');
        messageDiv.style.display = 'flex';
        messageDiv.style.justifyContent = isUser ? 'flex-end' : 'flex-start';
        messageDiv.style.marginBottom = '1rem';
        
        const bubble = document.createElement('div');
        bubble.className = isUser ? 'ana-message-user' : 'ana-message-ai';
        bubble.innerHTML = markdownToHtml(text);
        
        messageDiv.appendChild(bubble);
        chatLog.appendChild(messageDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    }
    
    async function sendMessage(userInput) {
        const chatInput = document.getElementById('ana-chat-input');
        const sendButton = document.getElementById('ana-send-button');
        const loader = document.getElementById('ana-loader-container');
        
        const systemPrompt = `Eres Ana, asistente virtual de Sandez & Asociados, estudio jurídico con más de 15 años de experiencia en Corrientes Capital, Argentina.

INFORMACIÓN:
- Fundadora: Dra. Norma Beatriz Sandez
- Ubicación: Ñaembe 2850, Piso 1, Oficina 4, Corrientes Capital
- WhatsApp: +54 9 379 439-2030, +54 9 379 404-9204, +54 9 379 415-6372
- Email: dranormasandez@gmail.com
- Horario: Lunes a Viernes 7:30-12:00 / 18:00-21:00

SERVICIOS: Derecho de Familia, Laboral, Accidentes de Tránsito, Inmobiliario, Civil, Comercial, Penal, Sucesorio, Administración de Consorcio, Gestoría, Previsional, Proceso Ejecutivo.

Sé cálida, empática y profesional. Responde en español.`;
        
        loader.style.display = 'block';
        chatInput.disabled = true;
        sendButton.disabled = true;
        
        try {
            const response = await fetch(`${apiUrl}?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userInput }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] },
                    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
                })
            });
            
            const data = await response.json();
            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                "Lo siento, no pude procesar tu consulta. Contáctanos al WhatsApp +54 9 379 439-2030.";
            
            addMessage(aiResponse, false);
        } catch (error) {
            console.error('Error:', error);
            addMessage("Error de conexión. Por favor, intenta nuevamente o contáctanos al WhatsApp +54 9 379 439-2030.", false);
        } finally {
            loader.style.display = 'none';
            chatInput.disabled = false;
            sendButton.disabled = false;
            chatInput.focus();
        }
    }
    
    // Event listeners
    const chatButton = document.getElementById('ana-chat-button');
    const chatWindow = document.getElementById('ana-chat-window');
    const closeButton = document.getElementById('ana-close-button');
    const chatInput = document.getElementById('ana-chat-input');
    const sendButton = document.getElementById('ana-send-button');
    
    chatButton.addEventListener('click', () => {
        const isOpen = chatWindow.classList.toggle('open');
        chatButton.innerHTML = isOpen ?
            '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>' :
            '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" /></svg>';
        if (isOpen) chatInput.focus();
    });
    
    closeButton.addEventListener('click', () => {
        chatWindow.classList.remove('open');
        chatButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" /></svg>';
    });
    
    const handleSend = () => {
        const text = chatInput.value.trim();
        if (!text) return;
        addMessage(text, true);
        sendMessage(text);
        chatInput.value = '';
    };
    
    sendButton.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    });
    
    // Mensaje de bienvenida
    setTimeout(() => {
        addMessage('¡Hola! Soy Ana, tu asistente virtual 24/7 de Sandez & Asociados. ¿En qué puedo ayudarte hoy?', false);
    }, 500);
    
    console.log('🤖 Chatbot Ana cargado exitosamente');
})();
