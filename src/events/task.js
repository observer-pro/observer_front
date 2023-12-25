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

    initNotion(editor)
    
    const lsContent = JSON.parse(localStorage.getItem("ACTIVE_TASK"))?.content
    // editor?.setContents(lsContent);
    if (editor && lsContent !== "" && lsContent !== undefined) {
        editor.container.firstChild.innerHTML = ""
        editor.container.firstChild.innerHTML = lsContent
    }



    areaElement?.addEventListener("click", () => {
        if (context.isSent) {
            context.isSent = false;
            renderApp(appElement, context);
        }
    });



    worksBtnElement?.forEach( btn => {
        if(btn.checked) {
            lastActive = btn.value
        }
        btn?.addEventListener('click', () => {
            if(lastActive === btn.value) {
                return;
            }
            let data
            if (localStorage.getItem("ALL_TASK")){
                data = JSON.parse(localStorage.getItem("ALL_TASK"))
            } else {
                // Вынести в контекст
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
            // Понять что это
            context.taskContent = false
            context.taskNumber = btn.value
            data[lastActive].visit = false
            localStorage.setItem("ACTIVE_TASK", JSON.stringify(data[context.taskNumber]))

            if(!(data[lastActive].visit) && editor.getContents()) {
                data[lastActive].content = editor.container.firstChild.innerHTML
                data[lastActive].visit = true
                localStorage.setItem("ALL_TASK", JSON.stringify(data))
            } else if (data[context.taskNumber].visit){
                context.taskContent = data[context.taskNumber]
            }
            localStorage.setItem('FILLED_TASK', context.taskNumber)
            renderApp(appElement, context);
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
            if(editor.getText()?.length > 0){
                data[lastActive].content = editor.container.firstChild.innerHTML;
                data[lastActive].visit = true;
                localStorage.setItem("ACTIVE_TASK", JSON.stringify({
                    ...JSON.parse(localStorage.getItem("ACTIVE_TASK")),
                    content: editor.container.firstChild.innerHTML,
                    visit: true
            }))
            }
            for(let task in data){
                if(data[task].visit && data[task]?.content !== "<p><br></p>" ){
                    validData.push({
                        "name": `${task === "Теория" ? "theory": task}`,
                        "content": `${data[task].content ? data[task].content : ""}`,
                        "type": `${task === "Теория" ? "theory": "exercise"}`,
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
                "name": `${lastActive === "Теория" ? "theory": lastActive}`,
                "content": editor.container.firstChild.innerHTML,
                "type": `${lastActive  === "Теория" ? "theory": "exercise"}`,
                "language": "html",
            }]
            context.isSent = true;

            console.log("Отправлен запрос steps/all. Отправлены данные:\n", task);
            socket.emit("steps/all", task);
            
            renderApp(appElement, context);
        } 
    });
};


export const initNotion = (editor) => {
    const input = document.getElementById('notion-input');
    const btn = document.getElementById('notion-btn');

    input?.addEventListener('click', () => {
        if (context.isNotion === true){
            context.isNotion = false
            context.notionError = false
            renderApp(appElement, context)
        }
    })
    
    btn?.addEventListener('click', () => {
        const notionUrl = input.value;
        if (notionUrl.length > 0){
            context.isNotion = true;
            renderApp(appElement, context);
            socket.emit('steps/import', {"url" : notionUrl});
            console.log("Отправлен запрос steps/import. Отправлены данные:\n", {"url" : notionUrl}); 
        } 
        
    })

    socket.on('error', (messege) => {
        console.error(messege);
        context.notionError = true
        renderApp(appElement, context)
    })
    
    socket.on("steps/load", (data) => {
        data.map(task => {
            task.visit = true
        })
        console.log(data);

        context.taskNumber = 1

        localStorage.setItem('FILLED_TASK', 1)
        context.taskContent = {
            visit: true,
            content: data[0].content
        }

        localStorage.setItem('ACTIVE_TASK', JSON.stringify({
            visit: true,
            content: data[0].content
        }))

        let validData = {
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
        data.forEach((task) => {
            validData[task.name] = task
        })


        localStorage.setItem('ALL_TASK', JSON.stringify({
            ...JSON.parse(localStorage.getItem('ALL_TASK')),
            ...validData
        }))

        renderApp(appElement, context);

    })    


    socket.on("error", (data) => {
        console.log(data);
    })  
   
}