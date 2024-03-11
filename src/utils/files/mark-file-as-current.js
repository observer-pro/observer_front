export const markFileAsCurrent = (file, store) => {
    store.files?.map((storeFile) => {
        if (storeFile?.filename === file?.filename) {
            storeFile.isActive = true;
            storeFile.isChanged = false;
        } else {
            storeFile.isActive = false;
        }
    });

    return store.files;
};
