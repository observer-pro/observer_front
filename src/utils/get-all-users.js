export const getAllUsers = (data) => {
    const users = [...data.users];
    const result = {};

    users.forEach((user) => {
        result[user.id] = {
            id: user.id,
            name: user.name,
            isActive: false,
            role: user.role,
            messages: [],
            current_path: "",
            messages_unread: 0,
            scroll_code_position: 0,
            scroll_tree_position: 0,
            latest_updated_paths: [],
            steps: [],
            is_first_click: true,
            is_got_steps: false,
        };
    });

    return result;
};
