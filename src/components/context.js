class Context {
    constructor(isStart, isOnline, isShowingTask) {
        this.isStart = isStart;
        this.isOnline = isOnline;
        this.isShowingTask = isShowingTask;
        this.server = "http://5.53.125.76:5000/";
        this.pluginUrl =
            "https://github.com/Hybusa/observer_java/blob/feature/build/distributions/observer_java-1.0-SNAPSHOT.zip";
    }
}

export default Context;
