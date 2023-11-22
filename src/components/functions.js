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
