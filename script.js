class TodoApp {
  constructor() {
    this.tasks = [];
  }
  addTask(task) {
    this.tasks.push(task);
  }
  deleteTask(task) {
    this.tasks.forEach((t, i) => {
      if (t === task) {
        this.tasks.slice(i);
      }
    });
  }
  toggleCheck(task) {
    this.tasks.forEach((t, i) => {
      if (t === task) {
        this.tasks[i].checked = !this.tasks[i].checked;
      }
    });
  }
}

let todoApp = new TodoApp();

class Task {
  constructor(content, checked = false) {
    this.content = content;
    this.checked = checked;
  }
}

const form = document.querySelector("#form");
const todoInput = document.querySelector("#taskInput");
const ul = document.querySelector("#tasks");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let content = todoInput.value;
  if (content) {
    let task = new Task(content);
    todoApp.addTask(task);
    createLi(task);
  }
});

function createLi(task) {
  let li = document.createElement('li');
  li.textContent = task.content;
  ul.appendChild(li);

  let delButton = renderButtons("deleteIcon.svg");
  let doneButton = renderButtons("doneIcon.svg");

  li.appendChild(delButton);
  li.appendChild(doneButton);

  delButton.addEventListener('click', function (el) {
    let li = el.target.parentElement.parentElement;
    todoApp.tasks.forEach((t, i) => {
      if (t === task && li.textContent === todoApp.tasks[i].content) {
        li.parentElement.removeChild(li);
        todoApp.deleteTask(task);
      }
    });
  });

  doneButton.addEventListener('click', function (el) {
    let li = el.target.parentElement.parentElement;
    todoApp.tasks.forEach((t, i) => {
      if (t === task && li.textContent === todoApp.tasks[i].content) {
        todoApp.toggleCheck(task);
        if (task.checked) {
          li.style.textDecoration = "line-through";
          li.style.backgroundColor = "#82ff7bad";
        } else {
          li.style.textDecoration = "none";
          li.style.backgroundColor = "#fff";
        }
      }
    });
  });
}

function renderButtons(src) {
  let btn = document.createElement('button');
  let img = document.createElement('img');
  img.src = src
  btn.appendChild(img);
  return btn;
}
