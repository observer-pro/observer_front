import socket from "../components/socket.js";
import { context, appElement, codeElement } from "../main.js";
import { renderApp } from "../render.js";
import hljs from "../components/hljs.js";
import { user_storeage } from "../components/user-storeage.js";

const goStepsData = (userId, allSteps) => {
    const data = {
        user_id: userId,
        steps: allSteps,
    };

    socket.emit("steps/status/to_client", data);

    console.log("Отправлен сигнал steps/status/to_client. Отправлены данные:");
    console.log(data);
};

export const getStepsStatus = () => {
    socket.on("steps/status/to_mentor", (data) => {
        console.log("Выполнен запрос steps/status/to_mentor. Получены данные:");
        console.log(data);

        context.room.users.forEach((user) => {
            if (user.id === data.user_id) {
                user.steps = data.steps;
                user_storeage[user.id].steps = Object.values(data.steps);
            }
        });

        if (context.activeUserId) {
            context.currentSteps = data.steps;
        }

        renderApp(appElement, context);

        if (context.code) {
            hljs.highlightAll(codeElement);
        }
    });
};

export const initSendingSteps = () => {
    const acceptElements = document.querySelectorAll(".accept");
    const completeElements = document.querySelectorAll(".complete");
    const returnElements = document.querySelectorAll(".return");
    const activeUserId = +localStorage.getItem("ACTIVE_USER_ID");
    const steps = {};

    acceptElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();

            const number = element.dataset.number;

            steps[number] = "ACCEPTED";

            context.room.users.forEach((user) => {
                if (user.id === activeUserId) {
                    user.steps[number] = "ACCEPTED";
                }
            });

            goStepsData(activeUserId, steps);

            socket.emit("steps/table", {});
        });
    });
    returnElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();

            const number = element.dataset.number;

            steps[number] = "NONE";

            context.room.users.forEach((user) => {
                if (user.id === activeUserId) {
                    user.steps[number] = "NONE";
                }
            });

            goStepsData(activeUserId, steps);

            socket.emit("steps/table", {});
        });
    });
    completeElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();

            const number = element.dataset.number;

            steps[number] = "NONE";
        
            context.room.users.forEach((user) => {
                if (user.id === activeUserId) {
                    user.steps[number] = "NONE";
                }
            });

            goStepsData(activeUserId, steps);

            socket.emit("steps/table", {});
        });
    });
};

export const getChangedSteps = () => {
    socket.on("steps/table", (data) => {
        console.log("Получен сигнал steps/table. Данные:");
        console.log(data);

        context.activeUserId = +localStorage.getItem("ACTIVE_USER_ID");
        context.stepsTable = data;

        context.stepsTable.forEach((step) => {
            if (context.activeUserId === step.user_id) {
                user_storeage[step.user_id].steps = Object.values(step.steps);
                context.currentSteps = step.steps;
            }
        });

        renderApp(appElement, context);

        if (context.code) {
            hljs.highlightAll(codeElement);
        }
    });
};

export const getAlerts = () => {
    socket.on('alerts', (alerts) => {
        alert(`${alerts.type}: ${alerts.message}`)
    if(alerts.type === "ERROR" && alerts.message.startsWith('Could not extract domain and page_id from url')){
        console.error(alerts);
        context.notionError = true
        renderApp(appElement, context)
        context.isNotion = true;
    } else {
        context.isNotion = true;
        renderApp(appElement,context);
    }
    })
}

export const stepsLoad = () => {
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
}