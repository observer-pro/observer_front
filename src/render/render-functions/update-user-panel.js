import user_panel from "../../templates/user_panel.pug";
import students from "../../templates/students.pug";
import { handleInvite } from "../../utils/handle-invite.js";

export const updateUserPanel = (context) => {
    const userPanelElement = document.getElementById("user-panel");

    if (userPanelElement) {
        userPanelElement.innerHTML = user_panel({ context });
        document.getElementById("students").innerHTML = students({
            context,
        });

        handleInvite();
    }
};
