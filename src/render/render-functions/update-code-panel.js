import code_panel from "../../templates/code_panel.pug";
import { handleSelectFile } from "../../components/sharing/select-file.js";
import { turnOnHighlightJs } from "../../utils/turn-on-hljs.js";
import {
    setFiletreeScrolledPosition,
    getFiletreeScrolledPosition,
} from "../../utils/scrolls/filetree-scrolled-position.js";
import {
    setCodeScrolledPosition,
    getCodeScrolledPosition,
} from "../../utils/scrolls/code-scrolled-position.js";

export const updateCodePanel = (context) => {
    const codePanelElement = document.getElementById("code-panel");

    if (codePanelElement) {
        codePanelElement.innerHTML = code_panel({ context });

        const filetreeElement = document.getElementById("filetree");
        const codeElement = document.getElementById("code");

        handleSelectFile();
        turnOnHighlightJs(codeElement);
        setFiletreeScrolledPosition(filetreeElement);
        getFiletreeScrolledPosition(filetreeElement);
        setCodeScrolledPosition(codeElement);
        getCodeScrolledPosition(codeElement);
    }
};
