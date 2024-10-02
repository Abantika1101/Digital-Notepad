const notepad = document.getElementById('notepad');

// Insert Emoji Function
document.querySelectorAll('.emoji-btn').forEach(button => {
    button.addEventListener('click', function () {
        const emoji = button.textContent; // Get the emoji text
        insertAtCaret(emoji); // Call function to insert emoji
    });
});

function insertAtCaret(emoji) {
    notepad.focus(); // Ensure the notepad is focused
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // Create a new text node with the emoji and insert it into the range
    const textNode = document.createTextNode(emoji);
    range.insertNode(textNode);
    
    // Move the caret after the inserted emoji
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
}

// Pen Color Change
document.getElementById('penColor').addEventListener('change', function () {
    const color = this.value;
    notepad.focus(); // Ensure notepad is focused
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
});

// Front cover navigation and loading saved notes
document.getElementById('startBtn').addEventListener('click', function () {
    document.getElementById('front-cover').style.display = 'none';
    document.getElementById('notebook').style.display = 'block';
    notepad.innerHTML = ""; // Load a new blank page
});

// Save content to localStorage
document.getElementById('saveButton').addEventListener('click', function () {
    localStorage.setItem('notes', notepad.innerHTML); // Save content in localStorage
    showSaveMessage(); // Show save confirmation popup

    // Clear the notepad after saving
    notepad.innerHTML = ""; // Clear the content of the notepad
});

// Show Save Message
function showSaveMessage() {
    const saveMessage = document.createElement('div');
    saveMessage.className = 'save-message';
    saveMessage.textContent = '❤️ Your thoughts are saved! ❤️';

    // Add the popup to the document
    document.getElementById('notebook').appendChild(saveMessage);

    // Display the popup
    saveMessage.style.display = 'block';

    // Hide the message after 2 seconds
    setTimeout(() => {
        saveMessage.style.display = 'none';
        saveMessage.remove(); // Remove the element after hiding
    }, 2000); // 2000 milliseconds = 2 seconds
}
