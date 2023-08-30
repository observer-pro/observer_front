class Tree {
    constructor(name, files) {
        this.name = name;
        this.files = files;
    }
}

export const getFiletree = (files) => {
    const tree = new Tree("root", []);

    files.forEach((file) => {
        const filePath = file.filename.split("/");

        if (filePath.length < 2) {
            tree.files.push({
                name: filePath[0],
                type: "file",
                level: 1,
            });
            return;
        }

        for (let i = 0; i < filePath.length - 1; i++) {
            tree.files.push({
                name: filePath[i],
                type: "dir",
                level: i + 1,
            });
            tree[filePath[i]] = {
                files: [],
            };
        }

        tree[filePath[filePath.length - 2]].files.push({
            name: filePath[filePath.length - 1],
            type: "file",
            level: filePath.length,
        });
    });

    return tree;
};
