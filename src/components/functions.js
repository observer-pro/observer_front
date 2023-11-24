const addZero = (num) => (String(num).length < 2 ? `0${num}` : num);

export const getDateTime = (hh, mm, ss) => {
    return `${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`;
};
export const saveScrolledCode = () => {
    const codeElement = document.querySelector("#code code");

    codeElement?.addEventListener("scroll", () => {
        window.localStorage.setItem("SCROLLED_CODE", codeElement.scrollTop);
    });
};
export const getScrolledCode = () => {
    const codeElement = document.querySelector("#code code");
    const scrollTop = +window.localStorage.getItem("SCROLLED_CODE");

    if (scrollTop) {
        codeElement.scrollTop = scrollTop;
    } else {
        codeElement.scrollTop = 0;
    }
};
export const saveScrolledFiletree = () => {
    const filetreeElement = document.querySelector("#filetree");

    filetreeElement?.addEventListener("scroll", () => {
        window.localStorage.setItem(
            "SCROLLED_FILETREE",
            filetreeElement.scrollTop,
        );
    });
};
export const getScrolledFiletree = () => {
    const filetreeElement = document.querySelector("#filetree");
    const scrollTop = +window.localStorage.getItem("SCROLLED_FILETREE");

    if (filetreeElement) {
        if (scrollTop) {
            filetreeElement.scrollTop = scrollTop;
        } else {
            filetreeElement.scrollTop = 0;
        }
    }
};
export const getScrolledChat = () => {
    const chatElement = document.querySelector("#chat");

    if (chatElement) {
        chatElement.scrollTop = 9999999999;
    }
};
