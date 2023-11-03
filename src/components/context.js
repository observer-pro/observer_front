class Context {
    constructor(
        isStart,
        isOnline,
        isShowingTask,
        hostName,
        currentAddress,
        isSent,
    ) {
        this.isStart = isStart;
        this.isOnline = isOnline;
        this.isShowingTask = isShowingTask;
        this.hostName = hostName;
        this.currentAddress = currentAddress;
        this.isSent = isSent;
        this.server = "wss://server.observer-app.pro";
        this.pluginUrl =
            "https://github.com/Hybusa/observer_java/blob/feature/build/distributions/observer_java-1.0-SNAPSHOT.zip";
    }
}

export default Context;
