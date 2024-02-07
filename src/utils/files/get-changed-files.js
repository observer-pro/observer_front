export const getChangedFiles = (store) => {
    store?.files.map((file) => {
        if (
            store.users[store.active_user_id].latest_updated_paths.includes(
                file.filename,
            ) &&
            !file.isActive
        ) {
            file.isChanged = true;
        }
    });

    return store?.files;
};
