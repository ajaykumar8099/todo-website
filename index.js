let itemsContainer = document.getElementById("itemsContainer");
let userInput = document.getElementById("userInput");
let saveButton = document.getElementById("saveButton");

function getTodoListFromLocalStorage() {
    let stringifiedlist = localStorage.getItem("todoList");
    let parsedList = JSON.parse(stringifiedlist);
    if (parsedList === null) {
        return []
    } else {
        return parsedList;
    }
}
let todoList = getTodoListFromLocalStorage()
saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
let todoCount = todoList.length;

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked")
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    })
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.ischecked === true) {
        todoObject.ischecked = false
    } else {
        todoObject.ischecked = true
    }
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "lable" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let listContainer = document.createElement("li");
    listContainer.classList.add("d-flex", "flex-row", "list-container");
    listContainer.id = todoId;
    itemsContainer.appendChild(listContainer);

    let inputCheckBox = document.createElement("input");
    inputCheckBox.type = "checkbox";
    inputCheckBox.id = checkboxId;
    inputCheckBox.classList.add("checkbox-input");
    inputCheckBox.checked = todo.ischecked;
    inputCheckBox.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId)
    }
    listContainer.appendChild(inputCheckBox)

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row", "shadow");
    listContainer.appendChild(labelContainer);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.classList.add("label-text")
    labelEl.textContent = todo.text;
    labelEl.id = labelId;
    if (todo.ischecked === true) {
        labelEl.classList.add("checked")
    }
    labelContainer.appendChild(labelEl);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("li");
    deleteIcon.classList.add("delete-icon", "far", "fa-trash-alt", "shadow");
    deleteIcon.onclick = function() {
        deleteTodo(todoId)
    }
    deleteContainer.appendChild(deleteIcon)
}

function addButton() {
    let userValue = userInput.value;
    if (userValue === "") {
        alert("Enter Valid Input");
        return;
    }

    todoCount = todoCount + 1;
    let newTodo = {
        text: userValue,
        uniqueNo: todoCount,
        ischecked: false
    }
    todoList.push(newTodo)
    createAndAppendTodo(newTodo);
    userInput.value = "";
}

function deleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    itemsContainer.removeChild(todoElement)
    let deleteIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    })
    todoList.splice(deleteIndex, 1)
}


for (let todo of todoList) {
    createAndAppendTodo(todo)
}