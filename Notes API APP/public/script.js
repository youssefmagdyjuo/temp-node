let notes = [];
let button = document.getElementById('btn');
let title = document.getElementById('title');
let content = document.getElementById('content');
let all_notes = document.getElementById('all_notes');
let error = document.getElementById('error');

// submit function
button.addEventListener('click', async (e) => {
    e.preventDefault();
    const newNote = {
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
        error.textContent = `${err.response?.data?.message }`;
    }
});

// get notes
const getNotes = async () => {
    try {
        const { data } = await axios.get('/api/notes');
        notes = data;
        renderTable();
    } catch (error) {
        all_notes.innerHTML = `<div style="color:red;">Can't Fetch Data</div>`;
    }
};

function renderTable() {
    all_notes.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
        </tr>
    `;
    renderNotes();
}

function renderNotes() {
    notes.forEach(note => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${note.id}</td>
            <td>${note.title}</td>
            <td>${note.content}</td>
            <td>
                <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
            </td>
        `;
        all_notes.appendChild(row);
    });
}

getNotes();
