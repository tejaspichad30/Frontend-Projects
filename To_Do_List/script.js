const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
const deleteAllBtn = document.getElementById('deleteAll');

const todos = JSON.parse(localStorage.getItem('todos')) || [];
if (todos.length) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

deleteAllBtn.addEventListener('click', () => {
    todosUL.innerHTML = '';
    updateLS();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerText = todoText;

        // Toggle completed
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        // Remove on right-click
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        // Edit on double-click
        todoEl.addEventListener('dblclick', () => {
            const newText = prompt('Edit your todo:', todoEl.innerText);
            if (newText) {
                todoEl.innerText = newText;
                updateLS();
            }
        });

        todosUL.appendChild(todoEl);
        input.value = '';
        updateLS();
    }
}

function updateLS() {
    const todos = [];
    document.querySelectorAll('li').forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
