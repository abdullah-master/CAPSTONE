$(document).ready(function() {
    // Handle state selection
    $('#state').change(function() {
        const state = $(this).val();
        if (state) {
            $.get(`/get_districts/${state}`, function(districts) {
                let options = '<option value="">Select District</option>';
                districts.forEach(district => {
                    options += `<option value="${district}">${district}</option>`;
                });
                $('#district').html(options);
                $('#market').html('<option value="">Select Market</option>');
            });
        }
    });

    // Handle district selection
    $('#district').change(function() {
        const district = $(this).val();
        if (district) {
            $.get(`/get_markets/${district}`, function(markets) {
                let options = '<option value="">Select Market</option>';
                markets.forEach(market => {
                    options += `<option value="${market}">${market}</option>`;
                });
                $('#market').html(options);
            });
        }
    });

    // Handle commodity selection
    $('#commodity').change(function() {
        const commodity = $(this).val();
        if (commodity) {
            $.get(`/get_varieties/${commodity}`, function(varieties) {
                let options = '<option value="">Select Variety</option>';
                varieties.forEach(variety => {
                    options += `<option value="${variety}">${variety}</option>`;
                });
                $('#variety').html(options);
            });
        }
    });

    $('#prediction-form').on('submit', function(e) {
        e.preventDefault();
        
        const modal = $('#predictionModal');
        const overlay = $('#modalOverlay');
        modal.find('#prediction-value').html('<div class="spinner-border text-success" role="status"></div>');
        overlay.show();
        modal.show();

        const date = new Date($('#arrival_date').val());
        const formData = {
            State: $('#state').val(),
            District: $('#district').val(),
            Market: $('#market').val(),
            Commodity: $('#commodity').val(),
            Variety: $('#variety').val(),
            Grade: $('#grade').val(),
            Year: date.getFullYear(),
            Month: date.getMonth() + 1,
            DayOfWeek: date.getDay()
        };

        $.ajax({
            url: '/predict',
            type: 'POST',
            data: formData,
            success: function(response) {
                if (response.error) {
                    modal.find('#prediction-value').html(`<div class="alert alert-danger">${response.error}</div>`);
                } else {
                    const predictedPrice = parseFloat(response.prediction);
                    const lowerRange = Math.floor((predictedPrice - 50) / 100) * 100;
                    const upperRange = Math.ceil((predictedPrice + 50) / 100) * 100;
                    modal.find('#prediction-value').html(`
                        <div class="price-range">₹${lowerRange.toLocaleString()} - ₹${upperRange.toLocaleString()}</div>
                    `);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                modal.find('#prediction-value').html(`<div class="alert alert-danger">Error: ${textStatus}</div>`);
            }
        });
    });
});

function closeModal() {
    $('#predictionModal').hide();
    $('#modalOverlay').hide();
}

document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chatMessages');
    
    // Initialize chat state
    const chatWidget = document.getElementById('chatWidget');
    const chatIcon = document.getElementById('chat-icon');
    chatWidget.style.display = 'none';
    chatIcon.style.display = 'flex';

    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);
});

function initChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatIcon = document.getElementById('chat-icon');
    chatWidget.style.display = 'flex';
    chatIcon.style.display = 'none';
    scrollToBottom();
    document.getElementById('message-input').focus();
}

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatIcon = document.getElementById('chat-icon');
    chatWidget.style.display = 'none';
    chatIcon.style.display = 'flex';
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    const chatMessages = document.getElementById('chatMessages');
    const loadingIndicator = document.querySelector('.chat-loading');

    if (!message) return;

    // Add user message
    appendMessage(message, 'user-message');
    messageInput.value = '';

    // Show loading animation
    loadingIndicator.style.display = 'block';
    scrollToBottom();

    // Send to server
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        loadingIndicator.style.display = 'none';
        appendMessage(data.response, 'bot-message');
        scrollToBottom();
    })
    .catch(error => {
        loadingIndicator.style.display = 'none';
        appendMessage('Sorry, there was an error processing your request.', 'bot-message error');
        scrollToBottom();
    });
}

function appendMessage(text, className) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = className;
    
    // Convert URLs to clickable links
    const linkedText = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    messageDiv.innerHTML = linkedText;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    const chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight;
}