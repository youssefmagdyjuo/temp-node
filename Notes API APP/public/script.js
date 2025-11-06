let notes = [];
let button = document.getElementById('btn');
let title = document.getElementById('title');
let content = document.getElementById('content');
let all_notes = document.getElementById('all_notes');
let error = document.getElementById('error');
let currentId = null;

// submit function
button.addEventListener('click', async (e) => {
    e.preventDefault();
    error.textContent = ""; // reset error message

    let newNote
    // add note 
    if (button.textContent == 'Submit') {
        await addNote()
    }
    // edit note 
    else if (button.textContent == 'Update') {
        await updateNote(currentId)
        button.textContent = 'Submit'
        currentId = null;
    }
    title.value = "";
    content.value = "";
    renderTable();
});

// Fetch all notes
const getNotes = async () => {
    try {
        const { data } = await axios.get('/api/notes');
        notes = data;
        renderTable();
    } catch (error) {
        all_notes.innerHTML = `<div style="color:red;">Can't Fetch Data</div>`;
    }
};

// Add new note
addNote = async () => {
    newNote = {
        title: title.value,
        content: content.value
    };
    try {
        const { data } = await axios.post('/api/notes', newNote);
        notes.push(data.data);
        renderTable();
        title.value = "";
        content.value = "";
    } catch (err) {
        error.textContent = `${err.response?.data?.message}`;
    }
}

// Update existing note
const editNote = (id) => {
    const note = notes.find(n => n._id == id)
    title.value = note.title
    content.value = note.content
    button.textContent = 'Update'
    currentId = id
}
const updateNote = async (id) => {
    const updatedNote = {
        title: title.value,
        content: content.value
    }
    try {
        const { data } = await axios.put(`/api/notes/${id}`, updatedNote)
        const newNotes = notes.map(note => {
            if (note._id == id) {
                note.title = data.data.title
                note.content = data.data.content
            }
            return note
        })
        notes = newNotes
    } catch (error) {
        console.log(error);
    }
    getNotes();
}
// Delete note
async function deleteNote(id) {
    try {
        const response = await axios.delete(`/api/notes/${id}`);
        const data = response.data;
        if (data.success) {
            alert("Note deleted successfully!");
            getNotes();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error deleting note:", error);
        alert("Failed to delete note.");
    }
}
function renderTable() {
    all_notes.innerHTML = `
        <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
        </tr>
    `;
    renderNotes();
}
// Render notes table
function renderNotes() {
    notes.forEach(note => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${note.title}</td>
            <td>${note.content}</td>
            <td>
                <button class="edit-btn" onclick="editNote('${note._id}')">Edit</button>
                <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
            </td>
        `;
        all_notes.appendChild(row);
    });
}
// Initialize

getNotes();
