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