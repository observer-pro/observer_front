import store from "../store/store.js";
import hljs from "../services/highlight.js";

export const turnOnHighlightJs = (codeElement) => {
    if (store.users[store.active_user_id]?.current_path) {
        hljs.highlightAll(codeElement);
    }
};
