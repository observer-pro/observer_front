class Context {
    constructor(
        isStart,
        isOnline,
        isShowingTask,
        hostName,
        currentAddress,
        isSent,
        allMessages,
        isNotion
    ) {
        this.isStart = isStart;
        this.isOnline = isOnline;
        this.isShowingTask = isShowingTask;
        this.hostName = hostName;
        this.currentAddress = currentAddress;
        this.isSent = isSent;
        this.allMessages = allMessages;
        this.server = "wss://server.observer-app.pro";
        this.pluginUrl =
            "https://github.com/Hybusa/observer_java/blob/feature/build/distributions/observer_java-1.0-SNAPSHOT.zip";
        this.taskNumber = localStorage.getItem("FILLED_TASK") ? +localStorage.getItem("FILLED_TASK"): 1;
        this.taskContent = JSON.parse(localStorage.getItem("ACTIVE_TASK")) ? JSON.parse(localStorage.getItem("ACTIVE_TASK")) : {
            visit: false,
            content: ""
        }
        this.isNotion = isNotion;
    }
}

export default Context;
