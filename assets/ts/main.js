"use strict";
let popup = document.getElementById('pop');
let updateIndex = -1;
document.getElementById('add-btn')?.addEventListener('click', () => {
    updateIndex = -1;
    let modalTitle = document.querySelector('#pop p');
    if (modalTitle)
        modalTitle.textContent = 'Create New Task';
    let subBtn = document.getElementById('sub-btn');
    if (subBtn)
        subBtn.innerHTML = '<i class="fa-solid fa-plus text-xs"></i> Add Task';
    let tname = document.querySelector('[placeholder="What needs to be done?"]');
    let preyorty = document.querySelector('#preyorty');
    let date = document.querySelector('#date');
    let descr = document.querySelector('[placeholder="Add more details about this task..."]');
    clearend(tname, preyorty, date, descr);
    popup?.classList.remove('hidden');
});
document.getElementById('exit')?.addEventListener('click', () => {
    popup?.classList.add('hidden');
    let tname = document.querySelector('[placeholder="What needs to be done?"]');
    let preyorty = document.querySelector('#preyorty');
    let date = document.querySelector('#date');
    let descr = document.querySelector('[placeholder="Add more details about this task..."]');
    clearend(tname, preyorty, date, descr);
});
document.getElementById('cancel-btn')?.addEventListener('click', () => {
    popup?.classList.add('hidden');
    let tname = document.querySelector('[placeholder="What needs to be done?"]');
    let preyorty = document.querySelector('#preyorty');
    let date = document.querySelector('#date');
    let descr = document.querySelector('[placeholder="Add more details about this task..."]');
    clearend(tname, preyorty, date, descr);
});
let titleInput = document.querySelector('[placeholder="What needs to be done?"]');
titleInput?.addEventListener('input', () => {
    if (titleInput?.value.trim()) {
        titleInput.classList.remove('border-red-500');
        titleInput.classList.add('border-gray-200');
        document.getElementById('title-error')?.classList.add('hidden');
    }
});
let dateInp = document.querySelector('#date');
dateInp?.addEventListener('input', () => {
    dateInp?.classList.remove('border-red-500');
    dateInp?.classList.add('border-gray-200');
    document.getElementById('date-error')?.classList.add('hidden');
});
let descInput = document.querySelector('[placeholder="Add more details about this task..."]');
descInput?.addEventListener('input', () => {
    let charCount = document.getElementById('char-count');
    if (charCount && descInput) {
        charCount.innerText = `${descInput.value.length}/500`;
    }
});
let submet = document.getElementById('sub-btn');
submet?.addEventListener('click', taskRend);
function taskRend() {
    let tname = document.querySelector('[placeholder="What needs to be done?"]');
    let title = tname?.value || '';
    let titleError = document.getElementById('title-error');
    if (!title.trim() || title.trim().length < 3) {
        tname?.classList.remove('border-gray-200');
        tname?.classList.add('border-red-500');
        if (titleError) {
            titleError.innerText = !title.trim() ? 'Task title is required' : 'Title must be at least 3 characters';
            titleError.classList.remove('hidden');
        }
        return;
    }
    tname?.classList.remove('border-red-500');
    tname?.classList.add('border-gray-200');
    titleError?.classList.add('hidden');
    let preyorty = document.querySelector('#preyorty');
    let procont = preyorty?.value || 'Medium';
    let date = document.querySelector('#date');
    let getdate = date?.value || '';
    let dateError = document.getElementById('date-error');
    if (getdate) {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let selectedDate = new Date(getdate);
        selectedDate.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            date?.classList.remove('border-gray-200');
            date?.classList.add('border-red-500');
            dateError?.classList.remove('hidden');
            return;
        }
    }
    date?.classList.remove('border-red-500');
    date?.classList.add('border-gray-200');
    dateError?.classList.add('hidden');
    let descr = document.querySelector('[placeholder="Add more details about this task..."]');
    let getDesc = descr?.value || '';
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (updateIndex >= 0 && updateIndex < tasks.length) {
        tasks[updateIndex].title = title;
        tasks[updateIndex].pre = procont;
        tasks[updateIndex].date = getdate;
        tasks[updateIndex].desc = getDesc;
        updateIndex = -1;
        let modalTitle = document.querySelector('#pop p');
        if (modalTitle)
            modalTitle.textContent = 'Create New Task';
        let subBtn = document.getElementById('sub-btn');
        if (subBtn)
            subBtn.innerHTML = '<i class="fa-solid fa-plus text-xs"></i> Add Task';
    }
    else {
        let newD = new Task(title, procont, getdate, getDesc);
        tasks.push(newD);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    cardD = tasks;
    gentask(cardD);
    popup?.classList.add('hidden');
    clearend(tname, preyorty, date, descr);
}
class Task {
    title;
    pre;
    date;
    desc;
    state;
    time;
    constructor(title, pre, date, desc, state = 'to-do', time = Date.now()) {
        this.title = title;
        this.pre = pre;
        this.date = date;
        this.desc = desc;
        this.state = state;
        this.time = time;
    }
}
function clearend(tname, preyorty, date, descr) {
    if (tname) {
        tname.value = '';
        tname.classList.remove('border-red-500');
        tname.classList.add('border-gray-200');
    }
    if (preyorty)
        preyorty.value = 'Medium';
    if (date) {
        date.value = '';
        date.classList.remove('border-red-500');
        date.classList.add('border-gray-200');
    }
    if (descr)
        descr.value = '';
    document.getElementById('title-error')?.classList.add('hidden');
    document.getElementById('date-error')?.classList.add('hidden');
    let charCount = document.getElementById('char-count');
    if (charCount)
        charCount.innerText = '0/500';
}
let cardD = JSON.parse(localStorage.getItem('tasks') || '[]');
function gentask(cont) {
    let boxTodo = '';
    let boxPro = '';
    let boxComp = '';
    let countTodo = 0;
    let countPro = 0;
    let countComp = 0;
    if (cont) {
        cont.forEach((e, index) => {
            let taskNum = `${index + 1}`.padStart(3, '0');
            let dotColor = e.state === 'in-progress' ? 'bg-amber-400' : e.state === 'completed' ? 'bg-emerald-500' : 'bg-[#CBD5E1]';
            let preColor = e.pre === 'Low' ? 'bg-blue-50 text-blue-500' : e.pre === 'High' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600';
            let dotPre = e.pre === 'Low' ? 'bg-blue-500' : e.pre === 'High' ? 'bg-red-500' : 'bg-amber-500';
            let diff = Date.now() - (e.time || Date.now());
            let mins = Math.floor(diff / 60000);
            let timeText = mins < 1 ? 'Just now' : mins < 60 ? `${mins}min ago` : Math.floor(mins / 60) < 24 ? `${Math.floor(mins / 60)}h ago` : `${Math.floor(mins / 1440)}days ago`;
            let dateHtml = '';
            let overdueBadge = '';
            if (e.date) {
                let d = new Date(e.date);
                let formattedDate = isNaN(d.getTime()) ? e.date : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                let today = new Date();
                today.setHours(0, 0, 0, 0);
                let taskDate = new Date(e.date);
                taskDate.setHours(0, 0, 0, 0);
                let isOverdue = taskDate < today && e.state !== 'completed';
                if (isOverdue) {
                    overdueBadge = `<span class="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full"><i class="fa-solid fa-triangle-exclamation me-1"></i>Overdue</span>`;
                }
                dateHtml = `
                    <div class="flex items-center gap-1 ${isOverdue ? 'text-red-500 font-semibold' : ''}">
                        <i class="fa-regular fa-calendar"></i>
                        <span>${formattedDate}</span>
                    </div>
                `;
            }
            if (e.state === 'completed') {
                overdueBadge = `<span class="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full"><i class="fa-solid fa-check me-1"></i>Done</span>`;
            }
            let buttonsHtml = '';
            if (e.state === 'to-do') {
                buttonsHtml = `
                    <button onclick="changeState(${index}, 'in-progress')" class="bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer">
                        <i class="fa-solid fa-play text-[10px]"></i> Start
                    </button>
                    <button onclick="changeState(${index}, 'completed')" class="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer">
                        <i class="fa-solid fa-check text-xs"></i> Complete
                    </button>
                `;
            }
            else if (e.state === 'in-progress') {
                buttonsHtml = `
                    <button onclick="changeState(${index}, 'to-do')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer">
                        <i class="fa-solid fa-arrow-rotate-left text-[10px]"></i> To Do
                    </button>
                    <button onclick="changeState(${index}, 'completed')" class="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer">
                        <i class="fa-solid fa-check text-xs"></i> Complete
                    </button>
                `;
            }
            else if (e.state === 'completed') {
                buttonsHtml = `
                    <button onclick="changeState(${index}, 'to-do')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer">
                        <i class="fa-solid fa-arrow-rotate-left text-[10px]"></i> To Do
                    </button>
                    <button onclick="changeState(${index}, 'in-progress')" class="bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer">
                        <i class="fa-solid fa-play text-[10px]"></i> Start
                    </button>
                `;
            }
            let cardBox = `                
                <div class="m-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center gap-1.5 text-xs text-[#A3B1C5] font-semibold">
                            <span class="w-2 h-2 rounded-full ${dotColor}"></span>
                            <span>#${taskNum}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <button onclick="editTask(${index})" class="text-gray-400 hover:text-indigo-600 p-1 cursor-pointer" title="Edit">
                                <i class="fa-solid fa-pen text-xs"></i>
                            </button>
                            <button onclick="deleteTask(${index})" class="text-gray-400 hover:text-red-500 p-1 cursor-pointer" title="Delete">
                                <i class="fa-solid fa-trash-can text-xs"></i>
                            </button>
                        </div>
                    </div>

                    <h3 class="text-lg font-bold text-[#1D293D] mb-1 ${e.state === 'completed' ? 'line-through text-slate-400' : ''}">${e.title ? e.title : ''}</h3>
                    ${e.desc ? `<p class="text-sm text-[#62748E] mb-3">${e.desc}</p>` : ''}

                    <div class="flex flex-wrap items-center gap-2 mb-3">
                        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 ${preColor} text-[11px] font-bold rounded-full">
                            <span class="w-1.5 h-1.5 rounded-full ${dotPre}"></span>
                            ${e.pre ? e.pre.toUpperCase() : ''} PRIORITY
                        </div>
                        ${overdueBadge}
                    </div>

                    <div class="flex items-center gap-3 text-xs text-[#A3B1C5] mb-3">
                        ${dateHtml}
                        <div class="flex items-center gap-1">
                            <i class="fa-regular fa-clock"></i>
                            <span>${timeText}</span>
                        </div>
                    </div>

                    <div class="border-t border-gray-100 pt-3 flex gap-2">
                        ${buttonsHtml}
                    </div>
                </div>`;
            if (e.state === 'to-do') {
                boxTodo += cardBox;
                countTodo++;
            }
            else if (e.state === 'in-progress') {
                boxPro += cardBox;
                countPro++;
            }
            else if (e.state === 'completed') {
                boxComp += cardBox;
                countComp++;
            }
        });
    }
    const cardToDo = document.getElementById('card-to-do');
    if (cardToDo)
        cardToDo.innerHTML = boxTodo;
    let todoCount = document.getElementById('todo-count');
    if (todoCount)
        todoCount.innerText = `${countTodo} tasks`;
    let noFile = document.getElementById('no-file');
    if (noFile) {
        if (countTodo === 0)
            noFile.classList.remove('hidden');
        else
            noFile.classList.add('hidden');
    }
    const proCard = document.getElementById('pro-card');
    if (proCard)
        proCard.innerHTML = boxPro;
    let proCount = document.getElementById('pro-count');
    if (proCount)
        proCount.innerText = `${countPro} tasks`;
    let noFileProgress = document.getElementById('no-file-progress');
    if (noFileProgress) {
        if (countPro === 0)
            noFileProgress.classList.remove('hidden');
        else
            noFileProgress.classList.add('hidden');
    }
    const compCard = document.getElementById('comp-card');
    if (compCard)
        compCard.innerHTML = boxComp;
    let compCount = document.getElementById('comp-count');
    if (compCount)
        compCount.innerText = `${countComp} tasks`;
    let noFileCompleted = document.getElementById('no-file-completed');
    if (noFileCompleted) {
        if (countComp === 0)
            noFileCompleted.classList.remove('hidden');
        else
            noFileCompleted.classList.add('hidden');
    }
}
function changeState(index, newState) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (tasks[index]) {
        tasks[index].state = newState;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        cardD = tasks;
        gentask(cardD);
    }
}
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    cardD = tasks;
    gentask(cardD);
}
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    if (!tasks[index])
        return;
    updateIndex = index;
    let tname = document.querySelector('[placeholder="What needs to be done?"]');
    let preyorty = document.querySelector('#preyorty');
    let date = document.querySelector('#date');
    let descr = document.querySelector('[placeholder="Add more details about this task..."]');
    if (tname)
        tname.value = tasks[index].title || '';
    if (preyorty)
        preyorty.value = tasks[index].pre || 'Medium';
    if (date)
        date.value = tasks[index].date || '';
    if (descr) {
        descr.value = tasks[index].desc || '';
        let charCount = document.getElementById('char-count');
        if (charCount)
            charCount.innerText = `${descr.value.length}/500`;
    }
    let modalTitle = document.querySelector('#pop p');
    if (modalTitle)
        modalTitle.textContent = 'Update Task';
    let subBtn = document.getElementById('sub-btn');
    if (subBtn)
        subBtn.innerHTML = '<i class="fa-solid fa-check text-xs"></i> Update Task';
    popup?.classList.remove('hidden');
}
window.changeState = changeState;
window.deleteTask = deleteTask;
window.editTask = editTask;
gentask(cardD);
//# sourceMappingURL=main.js.map