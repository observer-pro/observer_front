import store from "../store/store.js";

export const setFiletreeScrolledPosition = (filetreeElement) => {
    filetreeElement?.addEventListener("scroll", () => {
        const { users, active_user_id } = store;

        users[active_user_id].scroll_tree_position = filetreeElement.scrollTop;
    });
};

export const getFiletreeScrolledPosition = (filetreeElement) => {
    const { users, active_user_id } = store;

    if (filetreeElement) {
        filetreeElement.scrollTop = users[active_user_id].scroll_tree_position;
    }
};
