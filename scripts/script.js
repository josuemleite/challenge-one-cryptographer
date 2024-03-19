var textInput = document.getElementById('text__input');
var textOutput = document.getElementById('output');

var isDesktop = window.matchMedia('(min-width: 1440px)').matches;

function removeAccentsAndSpecialChars(text) {
    return text.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9 ]/g, '');
}

textInput.addEventListener('input', function() {
    this.value = removeAccentsAndSpecialChars(this.value.toLowerCase());
});

window.onload = function() {
    var textInput = document.getElementById('text__input');

    textInput.onfocus = function() {
        this.placeholder = '';
    };

    textInput.onblur = function() {
        if (this.value === '') {
            this.placeholder = 'Digite seu texto';
        }
    };
};

var outputDiv = document.getElementById('output');

function encrypt() {
    var text = textInput.value;

    if (text.trim() === '') {
        outputDiv.classList.remove('modified');
        if (isDesktop) {
            return textOutput.innerHTML = '<img id="not__found" src="./assets/not_found.png" alt="Imagem de erro: não encontrado"><h2>Nenhuma mensagem encontrada</h2><p>Digite um texto que você deseja criptografar ou descriptografar.</p>';
        } else {
            return textOutput.innerHTML = '<h2>Nenhuma mensagem encontrada</h2><p>Digite um texto que você deseja criptografar ou descriptografar.</p>';
        }
    }
  
    var encryptedText = text.replace(/e/g, 'enter')
                            .replace(/i/g, 'imes')
                            .replace(/a/g, 'ai')
                            .replace(/o/g, 'ober')
                            .replace(/u/g, 'ufat');
                            
    textOutput.innerHTML = '<textarea id="encryptedText" readonly>' + encryptedText + '</textarea><button type="button" id="copyToClipboardButton" onclick="copyToClipboard()">Copiar</button>';
    outputDiv.classList.add('modified');
}

function decrypt() {
    var text = textInput.value;

    if (text.trim() === '') {
        outputDiv.classList.remove('modified');
        if (isDesktop) {
            return textOutput.innerHTML = '<img id="not__found" src="./assets/not_found.png" alt="Imagem de erro: não encontrado"><h2>Nenhuma mensagem encontrada</h2><p>Digite um texto que você deseja criptografar ou descriptografar.</p>';
        } else {
            return textOutput.innerHTML = '<h2>Nenhuma mensagem encontrada</h2><p>Digite um texto que você deseja criptografar ou descriptografar.</p>';
        }
    }

    var decryptedText = text.replace(/enter/g, 'e')
                            .replace(/imes/g, 'i')
                            .replace(/ai/g, 'a')
                            .replace(/ober/g, 'o')
                            .replace(/ufat/g, 'u');

    textOutput.innerHTML = '<textarea id="decryptedText" readonly>' + decryptedText + '</textarea><button type="button" id="copyToClipboardButton" onclick="copyToClipboard()">Copiar</button>';
    outputDiv.classList.add('modified');
}

function copyToClipboard() {
    var text = document.getElementById('encryptedText') || document.getElementById('decryptedText');
    if (text) {
        navigator.clipboard.writeText(text.value);
    }
}