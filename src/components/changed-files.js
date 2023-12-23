export const getChangedFile = (context, filenames) => {
    context.filetree?.files.forEach((file) => {
        if (filenames.includes(file.name)) {
            file.isChanged = true;
        }
    });
    context.filetree?.dirs.forEach((dir) => {
        context.filetree[dir].files.forEach((file) => {
            if (filenames.includes(file.name)) {
                file.isChanged = true;
            }
        });
    });
};
