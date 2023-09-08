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
                    status: file.status,
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

export const deleteDuplicates = (context, set) => {
    let prevName;
    let prevIndex;

    context.filetree.files.forEach((file, index) => {
        prevName = file.name;
        prevIndex = index;

        context.filetree.files.forEach((file) => {
            if (
                (file.status === "changed" || file.status === "removed") &&
                file.name === prevName
            ) {
                context.filetree.files.splice(prevIndex, 1);
            }
        });
    });
    context.filetree.dirs.forEach((dir) => {
        context.filetree[dir].files.forEach((file, index) => {
            prevName = file.name;
            prevIndex = index;

            context.filetree[dir].files.forEach((file) => {
                if (
                    (file.status === "changed" || file.status === "removed") &&
                    file.name === prevName
                ) {
                    context.filetree[dir].files.splice(prevIndex, 1);
                }
            });
        });
    });

    set(context.filetree);
};
