export const sortStoreFiles = (store) => {
    const names = [...store.files.map((file) => file.filename)];
    const result = [];

    names.sort();
    names.forEach((name) => {
        store.files?.forEach((file) => {
            if (name === file.filename) {
                result.push(file);
            }
        });
    });

    return result;
};
