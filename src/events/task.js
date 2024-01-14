import { allTasks } from "../components/all_tasks.js";
import { initQuill } from "../components/quill.js";
import socket from "../components/socket.js";
import { appElement, context } from "../main.js";
import { renderApp } from "../render.js";



export const initOpeningTask = () => {
    const showTaskElement = document.getElementById("show-task");


    showTaskElement?.addEventListener("click", () => {
        if (context.isShowingTask){
            context.isShowingTask = false;
            renderApp(appElement, context);
        } else {
            context.isShowingTask = true;
            context.activeUserId = null;
            context.room.users.map((user) => (user.isActive = false));
            renderApp(appElement, context);
        }

    });
};

export const initSendingTask = () => {
    const areaElement = document.getElementById("task-area");
    const sendTaskElement = document.getElementById("send-task");
    const worksBtnElement = document.querySelectorAll(".task__work")
    let lastActive
    const editor = initQuill(areaElement);

    areaElement?.addEventListener("click", () => {
        if (context.isSent) {
            context.isSent = false;
            renderApp(appElement, context);
        }
    });

    worksBtnElement?.forEach( btn => {
        if(btn.checked) {
            lastActive = btn.value !== "Теория" ? btn.value : "theory"
        }
        
        editor.container.firstChild.innerHTML = allTasks[lastActive]?.content || ""

        btn?.addEventListener('click', () => {
            if(lastActive === btn.value) {
                return;
            }
            context.taskNumber = btn.value !== "Теория" ? btn.value : "theory"
            localStorage.setItem('TASK_NUMBER', context.taskNumber)

            if(!(allTasks[lastActive].visit) && editor.getContents()) {
                allTasks[lastActive].content = editor.container.firstChild.innerHTML
                allTasks[lastActive].visit = true
            } 
            renderApp(appElement, context);
        })
    })

    sendTaskElement?.addEventListener("click", () => {
        const validData = []

        let flag
        for (let task in allTasks){
            allTasks[task].visit === true ? flag = true : ""
        }

        if (flag) {
            if(editor.getText()?.length > 0){
                allTasks[lastActive].content = editor.container.firstChild.innerHTML;
                allTasks[lastActive].visit = true;
            }
            for(let task in allTasks){
                if(allTasks[task].visit && allTasks[task]?.content !== "<p><br></p>" ){
                    validData.push({
                        "name": `${task === "theory" ? "theory": task}`,
                        "content": `${allTasks[task].content ? allTasks[task].content : ""}`,
                        "type": `${task === "theory" ? "theory": "exercise"}`,
                        "language": "html",
                    })
                }
            }
            
            

            if (validData?.length > 0){
                console.log("Отправлен запрос steps/all. Отправлены данные:\n", validData);
                context.isSent = true;
                socket.emit("steps/all", validData);
            }

            renderApp(appElement, context);

        } else if (editor.getText()?.length > 0){
            const task = [{
                "name": `${lastActive === "theory" ? "theory": lastActive}`,
                "content": editor.container.firstChild.innerHTML,
                "type": `${lastActive  === "theory" ? "theory": "exercise"}`,
                "language": "html",
            }]
            context.isSent = true;

            console.log("Отправлен запрос steps/all. Отправлены данные:\n", task);
            socket.emit("steps/all", task);
            
            renderApp(appElement, context);
        } 
    });
};


