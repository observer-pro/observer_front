import { taskMode } from "../utils/all-tasks.js";

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
        this.server = "ws://84.38.181.252";
        this.pluginUrl =
            "https://github.com/Hybusa/observer_java/blob/Singleton_refactor/build/distributions/Observer%20App-1.2.5.zip";
        this.taskNumber = localStorage.getItem("TASK_NUMBER")
            ? localStorage.getItem("TASK_NUMBER")
            : 1;
        this.isNotion = isNotion;
        this.notionError = false;
        this.taskCountMode = taskMode;
    }
}

const context = new Context(true, false, true, null, false, []);

export default context;
