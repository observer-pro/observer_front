import user_panel from "../../templates/user_panel.pug";
import students from "../../templates/students.pug";
import { handleRehostRoom } from "../../components/room/rehost-room.js";
import { handleInvite } from "../../utils/handle-invite.js";
import { handleCloseRoom } from "../../components/room/close-room.js";
import { handleSelectUser } from "../../components/sharing/select-user.js";
import { handleOpenTaskEditor } from "../../components/tasks/open-task-editor.js";

export const updateUserPanel = (context) => {
    const userPanelElement = document.getElementById("user-panel");

    if (userPanelElement) {
        userPanelElement.innerHTML = user_panel({ context });
        document.getElementById("students").innerHTML = students({
            context,
        });

        handleRehostRoom();
        handleInvite();
        handleCloseRoom();
        handleSelectUser();
        handleOpenTaskEditor();
    }
};
