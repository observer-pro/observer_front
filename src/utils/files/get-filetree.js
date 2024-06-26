class Tree {
    constructor() {
        this.nodes = {
            children: {},
        };
    }

    createFile(file, name) {
        const newFile = {
            name: name,
            type: "file",
            isActive: file.isActive || false,
            status: file.status,
            content: file.content,
            path: file.filename,
            isChanged: file.isChanged || false,
        };

        return newFile;
    }

    pushNode(file) {
        const path = file.filename.split("/");
        const filename = path[path.length - 1];
        const node = this.createFile(file, filename);

        if (path.length === 1) {
            this.nodes.children[filename] = node;
        } else {
            let parent = this.nodes;

            path.pop();
            path.forEach((folder) => {
                if (parent.children && parent.children[folder]) {
                    parent = parent.children[folder];
                } else if (file.status !== "REMOVED") {
                    const newNode = {
                        type: "folder",
                        name: folder,
                        children: {},
                    };

                    parent.children[folder] = newNode;
                    parent = newNode;
                }
            });

            if (parent.children) {
                parent.children[filename] = node;
            }
        }
    }
}

export const getFiletree = (files) => {
    const tree = new Tree();

    files.forEach((file) => {
        tree.pushNode(file);
    });

    return tree;
};
