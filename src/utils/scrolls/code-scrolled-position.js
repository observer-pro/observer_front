import store from "../../store/store.js";

export const setCodeScrolledPosition = (codeElement) => {
    codeElement?.addEventListener("scroll", () => {
        const { users, active_user_id } = store;

        users[active_user_id].scroll_code_position = codeElement.scrollTop;
    });
};

export const getCodeScrolledPosition = (codeElement) => {
    if (codeElement) {
        const { users, active_user_id } = store;

        codeElement.scrollTop = users[active_user_id].scroll_code_position;
    }
};
