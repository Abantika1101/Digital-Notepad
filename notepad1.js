let currentPage = 1;
const totalPages = 250;
const notes = new Array(totalPages).fill("");
const notepad = document.getElementById('notepad');
const pageNum = document.getElementById('pageNum');

// Insert Emoji Function
document.querySelectorAll('.emoji-btn').forEach(button => {
    button.addEventListener('click', function () {
        const emoji = button.textContent;
        insertAtCaret(emoji);
    });
});

function insertAtCaret(emoji) {
    notepad.focus(); // Make sure the notepad has focus before inserting emoji
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
    notepad.focus(); // Ensure notepad is focused to apply color
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
});

// Front cover navigation
document.getElementById('startBtn').addEventListener('click', function () {
    document.getElementById('front-cover').style.display = 'none';
    document.getElementById('notebook').style.display = 'block';
    loadPage();
});

// Load the content for the current page
function loadPage() {
    notepad.innerHTML = notes[currentPage - 1] || "";
    pageNum.textContent = `Page: ${currentPage} of ${totalPages}`;
}

// Save the content of the current page
notepad.addEventListener('input', function () {
    notes[currentPage - 1] = notepad.innerHTML;
});

// Save Confirmation Message
document.getElementById('saveButton').addEventListener('click', function () {
    notes[currentPage - 1] = notepad.innerHTML;
    alert('❤️ Your thoughts are saved! ❤️');
});

// Page Navigation
document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        loadPage();
    }
});

document.getElementById('nextPage').addEventListener('click', function () {
    if (currentPage < totalPages) {
        currentPage++;
        loadPage();
    }
});
// ==== Add this part to handle the save popup functionality ====
// Create a function to show the save popup
function showSaveMessage() {
    const saveMessage = document.createElement('div');
    saveMessage.className = 'save-message';
    saveMessage.textContent = '❤️ Your thoughts are saved! ❤️';

    // Add the popup to the document
    document.getElementById('notebook').appendChild(saveMessage);

    // Display the popup
    saveMessage.style.display = 'block';

    // Use setTimeout to hide the message after 2 seconds
    setTimeout(() => {
        saveMessage.style.display = 'none';
        saveMessage.remove(); // Remove the element after hiding
    }, 2000); // 2000 milliseconds = 2 seconds
}

// Save Confirmation Message
document.getElementById('saveButton').addEventListener('click', function () {
    notes[currentPage - 1] = notepad.innerHTML;
    showSaveMessage(); // Call the function to show the message
});