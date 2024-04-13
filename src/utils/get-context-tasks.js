export const getContextTasks = (store) => {
    const result = [];

    for (let key in store.tasks) {
        const task = {
            name: key,
            is_active: false,
        };

        if (key === store.active_task) {
            task.is_active = true;
        }

        result.push(task);
    }

    return result;
};
