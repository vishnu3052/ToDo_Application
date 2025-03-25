const taskInput=document.querySelector(".task-input input");
filters=document.querySelectorAll(".filters span");
clearAll=document.querySelector(".clear-btn");
taskBox=document.querySelector(".task-box");

let editId;
let isEditedTask=false;
let todos=JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn =>{
    btn.addEventListener("click",()=>{
        let activeFilter = document.querySelector("span.active");
        if (activeFilter) {
            activeFilter.classList.remove("active");
        }
        btn.classList.add("active");
        showTodo(btn.id);

    });
});
function showTodo(filter){
    let li="";
    if(todos){
    todos.forEach((todo,id) => {
        let isCompleted=todo.status=="completed" ? "checked" : "";
        if(filter==todo.status || filter=="all"){
            li+= `<li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}">
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick="editTask(${id},'${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
        }
    });
        //console.log(id,todo);
    }
    
    taskBox.innerHTML=li || `<span>You don't have any task here</span>`;
}
showTodo("all");

function showMenu(selectedTask){
    let taskMenu=selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click",e =>{
        if(e.target.tagName !="I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    })
}
function editTask(taskId,taskName){
    //console.log(taskId,taskName)
    editId=taskId;
    isEditedTask=true;
    taskInput.value=taskName
}
function deleteTask(deleteId){
    //console.log(deleteId)
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");

}
clearAll.addEventListener("click",()=>{
    todos.splice(0,todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all");
});
function updateStatus(selectedTask){
    //console.log(selectedTask)
    let taskName=selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status="completed";
    }
    else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status="pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));
}

taskInput.addEventListener("keyup",e=>{
    let userTask=taskInput.value.trim();
    if(e.key=="Enter" && userTask){
        //let todos=JSON.parse(localStorage.getItem("todo-list"));
        if(!isEditedTask){
            if(!todos){
                todos=[];
            }
            let taskInfo={name:userTask,status:"pending"};
            todos.push(taskInfo);
        }
        else{
            isEditedTask=false;
            todos[editId].name=userTask;
        }
        taskInput.value="";
        
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
});
