class Tree {
    constructor(dirs, files) {
        this.dirs = dirs;
        this.files = files;
    }
}

export const getFiletree = (files) => {
    const tree = new Tree([], []);

    files.forEach((file) => {
        const path = file.filename.slice(1).split("/");

        if (path.length === 1) {
            const newFile = {
                name: path[0],
                type: "file",
                level: 1,
                isActive: false,
                status: file.status,
                content: file.content,
            };

            tree.files.push(newFile);
            return;
        }

        for (let i = 0; i < path.length - 1; i++) {
            if (!tree.dirs.includes(path[i])) {
                tree.dirs.push(path[i]);
                tree.files.push({
                    name: path[i],
                    type: "folder",
                    level: i + 1,
                });
                tree[path[i]] = {
                    files: [],
                };
            }
        }

        const newFile = {
            name: path[path.length - 1],
            type: "file",
            level: path.length,
            isActive: false,
            status: file.status,
            content: file.content,
        };

        tree[path[path.length - 2]].files.push(newFile);
    });

    return tree;
};

export const removeExtraFiles = (files, set) => {
    const result = [];
    const lastFile = files[files.length - 1];

    for (let i = 0; i < files.length - 1; i++) {
        if (
            files[i].filename !== lastFile.filename &&
            files[i].status !== "REMOVED"
        ) {
            result.push(files[i]);
        }
    }

    if (lastFile.status !== "REMOVED") {
        result.push(lastFile);
    }

    set(result);
};
