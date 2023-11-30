import { initQuill } from "../components/quill.js";
import socket from "../components/socket.js";
import { appElement, context } from "../main.js";
import { renderApp } from "../render.js";



export const initOpeningTask = () => {
    const showTaskElement = document.querySelector("#show-task");


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
    const areaElement = document.querySelector("#task-area");
    const sendTaskElement = document.querySelector("#send-task");
    const worksBtnElement = document.querySelectorAll(".task__work")
    let lastActive
    const editor = initQuill(areaElement);
    

    if(context.taskContent.visit){
        editor?.setContents(context.taskContent.content);
    }

    if (editor) {
        editor.data = window.localStorage.getItem("task");
    }

    areaElement?.addEventListener("click", () => {
        if (context.isSent) {
            context.isSent = false;

            renderApp(appElement, context);
        }
    });

    areaElement?.addEventListener("input", () => {
        localStorage?.setItem("TASK", JSON.stringify(editor.getContents()));
    });

    worksBtnElement?.forEach(btn => {
        if(btn.checked) {
            lastActive = btn.value
        }
    })

    worksBtnElement?.forEach( btn => {
        btn?.addEventListener('click', () => {
            if(lastActive === btn.value) return
            let data
            if (localStorage.getItem("ALL_TASK")){
                data = JSON.parse(localStorage.getItem("ALL_TASK"))
            } else {
                data = {
                    1: {
                        visit: false,
                    },
                    2: {
                        visit: false,
                    },
                    3: {
                        visit: false,
                    },
                    4: {
                        visit: false,
                    },
                    5: {
                        visit: false,
                    },
                    6: {
                        visit: false,
                    },
                    7: {
                        visit: false,
                    },
                    8: {
                        visit: false,
                    },
                    "Теория" : {
                        visit: false,
                    },
                }
                localStorage.setItem("ALL_TASK", JSON.stringify(data))
            }
            context.taskContent = false
            context.taskNumber = btn.value
            data[lastActive].visit = false
            localStorage.setItem("ACTIVE_TASK", JSON.stringify(data[context.taskNumber]))

            if(!(data[lastActive].visit) && localStorage.getItem("TASK")) {
                data[lastActive].content = editor.getContents()
                data[lastActive].contentText = editor.getText()
                data[lastActive].visit = true
                localStorage.setItem("ALL_TASK", JSON.stringify(data))
            } else if (data[context.taskNumber].visit){
                context.taskContent = data[context.taskNumber]
            }
            localStorage.setItem('FILLED_TASK', context.taskNumber)
            renderApp(appElement, context)
            localStorage.removeItem("TASK")
        })
    })

    sendTaskElement?.addEventListener("click", () => {
        const data = JSON.parse(localStorage.getItem("ALL_TASK"))
        const validData = []

        let flag
        for (let task in data){
            data[task].visit === true ? flag = true : ""
        }

        if (flag) {
            if(localStorage.getItem("TASK")){
                console.log(lastActive);
                data[lastActive].content = JSON.parse(localStorage.getItem("TASK"));
                data[lastActive].visit = true;
            }
            for(let task in data){
                if(data[task].contentText){
                    validData.push({
                        "name": `${task === "Теория" ? "theory": task}`,
                        "content": `${data[task].contentText ? data[task].contentText : ""}`,
                        "type": `${task === "Теория" ? "theory": "exercise"}`,
                        "language": "html",
                    })
                }
            }
            
            context.isSent = true;
            

            console.log("Отправлен запрос steps/all. Отправлены данные:");
            console.log(validData);

            socket.emit("steps/all", validData);

            renderApp(appElement, context);

        } else if (localStorage.getItem("TASK")?.length > 0){
            const task = {
                "name": `${lastActive === "Теория" ? "theory": lastActive}`,
                "content": localStorage.getItem("TASK"),
                "type": `${lastActive === "Теория" ? "theory": "exercise"}`,
                "language": "html",
            }
            context.isSent = true;
            context.taskNumber = 1

            console.log("Отправлен запрос steps/all. Отправлены данные:", task);
            socket.emit("steps/all", task);
            
            renderApp(appElement, context);
        }
    });
};
