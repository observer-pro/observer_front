import { taskMode } from "./all_tasks";

class Context {
    constructor(
        isStart,
        isOnline,
        isShowingTask,
        hostName,
        currentAddress,
        isSent,
        allMessages,
        isNotion,
        taskCountMode
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
        this.taskNumber = localStorage.getItem("TASK_NUMBER") ? localStorage.getItem("TASK_NUMBER") : 1;
        this.isNotion = isNotion;
        this.notionError = false
        this.taskCountMode = taskMode;
    }
}

export default Context;
