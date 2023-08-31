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
            tree.files.push({
                name: path[0],
                type: "file",
                level: 1,
                isActive: false,
                status: file.status,
                content: file.content,
            });
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

        tree[path[path.length - 2]].files.push({
            name: path[path.length - 1],
            type: "file",
            level: path.length,
            isActive: false,
            status: file.status,
            content: file.content,
        });
    });

    return tree;
};
