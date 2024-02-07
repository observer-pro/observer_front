export const getFileByPath = (path, store) => {
    const result = store.files.find((file) => path === file.filename);

    return result;
};
