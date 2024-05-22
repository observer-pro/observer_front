import Quill from "quill";
import hljs from "highlight.js";

export const initQuill = (element) => {
    if (element) {
        let toolbarOptions = [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ list: "bullet" }],
            [{ align: [] }],
            ["code-block"],
        ];

        const options = {
            modules: {
                syntax: {
                    highlight: (text) => hljs.highlightAuto(text).value,
                }, // Include syntax module
                toolbar: toolbarOptions,
                clipboard: {
                    matchers: [],
                },
            },
            theme: "snow",
        };

        const editor = new Quill(element, options);

        return editor;
    }
};
