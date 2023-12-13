class Tree {
    constructor(dirs, files) {
        this.dirs = dirs;
        this.files = files;
    }
}

export const getFiletree = (files) => {
    const tree = new Tree([], []);

    files.forEach((file) => {
        const path = file.filename.split("/");

        if (path.length === 1) {
            const newFile = {
                name: path[0],
                type: "file",
                level: 1,
                isActive: false,
                status: file.status,
                content: file.content,
                path: file.filename,
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
            path: file.filename,
        };

        tree[path[path.length - 2]].files.push(newFile);
    });

    tree.files.sort((a, b) => a.name - b.name);
    tree.dirs.sort((a, b) => a.name - b.name);

    return tree;
};
