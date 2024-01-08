import socket from "../components/socket.js";
import { appElement, context } from "../main.js";
import { renderApp } from "../render.js";

export const initNotion = () => {
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
            context.isNotion = null
            renderApp(appElement, context);
            socket.emit('steps/import', {"url" : notionUrl});
            console.log("Отправлен запрос steps/import. Отправлены данные:\n", {"url" : notionUrl}); 
        } 
    })
}

socket.on('alerts', (alert) => {
    if(alert.type === "ERROR" && alert.message.startsWith('Could not extract domain and page_id from url')){
        console.error(alert);
        context.notionError = true
        renderApp(appElement, context)
        context.isNotion = true;
    } else {
        context.isNotion = true;
        renderApp(appElement,context);
    }
})

socket.on("steps/load", (data) => {
    data.map(task => {
        task.visit = true
    })
    console.log("Запрос steps/load. Получены данные:\n", {"url" : data}); 

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
        "theory" : {
            visit: false,
        },
    }
    data.forEach((task) => {
        validData[task.name] = task
    })

    context.taskContent = {
        visit: true,
        content: validData[context.taskNumber].content
    }

    localStorage.setItem('ACTIVE_TASK', JSON.stringify({
        visit: true,
        content: validData[context.taskNumber].content
    }))



    localStorage.setItem('ALL_TASK', JSON.stringify({
        ...JSON.parse(localStorage.getItem('ALL_TASK')),
        ...validData
    }))

    renderApp(appElement, context);

})    