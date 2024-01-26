const removeDuplicates = (files) => {
    const filesJson = [...new Set(files.map((file) => JSON.stringify(file)))];
    const result = filesJson.map((file) => JSON.parse(file));

    return result;
};

export const getNewFiles = (files, newFiles) => {
    const uniquieNewFiles = removeDuplicates(newFiles);
    const result = {
        files: [],
        names: [],
    };

    files?.forEach((file) => {
        let isSame = false;

        uniquieNewFiles.forEach((newFile) => {
            if (newFile.filename === file.filename) {
                isSame = true;
            }
        });

        if (!isSame) {
            result.files.push(file);
        }
    });

    uniquieNewFiles.forEach((newFile) => {
        if (newFile.status !== "REMOVED") {
            result.files.push(newFile);
            result.names.push(newFile.filename);
        }
    });

    return result;
};
