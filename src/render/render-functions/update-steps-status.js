import messages_steps from "../../templates/messages_steps.pug";

export const updateStepsStatus = (context) => {
    const messagesStepsElement = document.getElementById("messages-steps");

    if (messagesStepsElement) {
        messagesStepsElement.innerHTML = messages_steps({
            context,
        });
    }
};
