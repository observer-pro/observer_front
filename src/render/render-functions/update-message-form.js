import messages_top from "../../templates/messages_top.pug";
import messages_form from "../../templates/messages_form.pug";
import { handleToggleForm } from "../../components/message/toggle-form.js";
import { handleSendMessage } from "../../components/message/send-message.js";
import { getScrolledChat } from "../../utils/scrolls/get-scrolled-chat.js";

export const updateMessageForm = (context) => {
    const messagesTopElement = document.getElementById("messages-top");
    const messagesFormElement = document.getElementById("messages-form");

    if (messagesTopElement) {
        messagesTopElement.innerHTML = messages_top({ context });

        handleToggleForm();
    }

    if (messagesFormElement) {
        messagesFormElement.innerHTML = messages_form({ context });

        handleSendMessage();
        getScrolledChat();
    }
};
