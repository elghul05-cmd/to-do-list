const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");

// تحميل المهام عند فتح الصفحة
window.onload = loadTasks;

function addTask(){
  const taskText = taskInput.value.trim();
  if(taskText === "") return;

  const task = { text: taskText, completed: false };
  addTaskToDOM(task);
  saveTask(task);

  taskInput.value = "";
}

// إضافة عنصر للـ DOM
function addTaskToDOM(task){
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${task.text}</span>
    <div class="task-actions">
      <button class="done">✔</button>
      <button class="delete">✖</button>
    </div>
  `;

  if(task.completed) li.classList.add("completed");

  // زرار انهاء المهمة
  li.querySelector(".done").addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTasks();
  });

  // زرار حذف المهمة
  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
    updateTasks();
  });

  taskList.appendChild(li);
}

// حفظ مهمة في LocalStorage
function saveTask(task){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// تحديث القائمة كلها بعد أي تعديل
function updateTasks(){
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// تحميل المهام المخزنة
function loadTasks(){
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task));
}
