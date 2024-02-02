import store from "../store/store.js";
import hljs from "../services/highlight.js";
import { codeElement } from "../main.js";

export const turnOnHighlightJs = () => {
    if (store.users[store.active_user_id]?.current_path) {
        hljs.highlightAll(codeElement);
    }
};
