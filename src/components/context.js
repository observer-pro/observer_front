class Context {
    constructor(isStart, isOnline) {
        this.isStart = isStart;
        this.isOnline = isOnline;
    }
}

export const getContext = () => {
    const contextJson = window.localStorage.getItem("context");

    if (contextJson) {
        return JSON.parse(contextJson);
    } else {
        return new Context(true, false);
    }
};
