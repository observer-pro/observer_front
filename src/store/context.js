class Context {
    constructor(
        isStart,
        isOnline,
        isShowingTask,
        currentAddress,
        isSent,
        allMessages,
        isNotion,
    ) {
        this.isStart = isStart;
        this.isOnline = isOnline;
        this.isShowingTask = isShowingTask;
        this.currentAddress = currentAddress;
        this.isSent = isSent;
        this.allMessages = allMessages;
        this.server = "ws://80.249.150.171";
        this.pluginUrl =
            "https://github.com/Hybusa/observer_java/blob/Singleton_refactor/build/distributions/Observer%20App-1.2.5.zip";
        this.tasks = [
            {
                name: 1,
                is_active: true,
            },
            {
                name: 2,
                is_active: false,
            },
            {
                name: 3,
                is_active: false,
            },
            {
                name: 4,
                is_active: false,
            },
            {
                name: 5,
                is_active: false,
            },
            {
                name: 6,
                is_active: false,
            },
            {
                name: 7,
                is_active: false,
            },
            {
                name: 8,
                is_active: false,
            },
            {
                name: "theory",
                is_active: false,
            },
        ];
        this.isNotion = isNotion;
        this.notionError = false;
    }
}

const context = new Context(true, false, true, null, false, []);

export default context;
