console.log("Welcome to app.js");

let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");

    let notesObj;

    // Initialize notesObj
    if (notes === null || notes === "null") {
        notesObj = [];
    } else {
        try {
            notesObj = JSON.parse(notes);
            if (!Array.isArray(notesObj)) {
                notesObj = [];
            }
        } catch (e) {
            notesObj = [];
        }
    }

    // Add the new note
    if (addTxt.value.trim() !== "") {
        notesObj.push(addTxt.value.trim());
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        // console.log(notesObj);
        showNotes();
    }
});

function showNotes() {
    let notes = localStorage.getItem("notes");  // <-- FIXED: get notes here
    let notesObj;

    if (notes === null || notes === "null") {
        notesObj = [];
    } else {
        try {
            notesObj = JSON.parse(notes);
            if (!Array.isArray(notesObj)) {
                notesObj = [];
            }
        } catch (e) {
            notesObj = [];
        }
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <button class="btn btn-primary" onclick="deleteNote(${index})">Delete Note</button>
            </div>
        </div>`;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length !== 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<p>No notes to show.</p>`;
    }
}

// Optional: Call showNotes initially to show existing notes on load
showNotes();

// Optional: Delete note function
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// search

let search = document.getElementById('searchTxt');

search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase(); // Get the search input
    let noteCards = document.getElementsByClassName('noteCard'); // All note cards

    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase(); // Convert card text to lowercase
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
});



