import store from "../../store/store.js";
import context from "../../store/context.js";
import { renderApp } from "../../render/render-app.js";

export const handleOpenTaskEditor = () => {
    const showTaskElement = document.getElementById("show-task");

    showTaskElement?.addEventListener("click", () => {
        store.active_user_id = null;

        for (let user in store.users) {
            store.users[user].isActive = false;
        }

        context.isShowingTask = true;
        context.activeUserId = store.active_user_id;
        context.room = {
            id: store.room_id,
            users: Object.values(store.users),
        };

        renderApp(context, ["open-task-editor", "update-user-panel"]);
    });
};
