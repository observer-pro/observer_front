export const deleteFilesInFolder = (files, removedFile) => {
    const result = [];

    files.forEach((file) => {
        const filenameInArr = file.filename.split("/");

        filenameInArr.pop();

        const comparingName = filenameInArr.join("/");

        if (comparingName !== removedFile.filename) {
            result.push(file);
        }
    });

    return result;
};
