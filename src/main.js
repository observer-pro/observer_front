"use strict";

import "./css/main.css";
import context from "./store/context.js";
import { render } from "./render.js";
import { connect, disconnect } from "./components/connection/connection.js";
import { updateRoom } from "./components/room/update-room.js";
import { rehostRoomAfterRefresh } from "./components/room/rehost-room.js";
import { sendCode } from "./components/sharing/send-code.js";
import { updateCode } from "./components/sharing/update-code.js";
import { receiveMessage } from "./components/message/receive-message.js";
import { getAllMessages } from "./components/message/get-all-messages.js";
import { receiveSteps } from "./components/tasks/receive-steps.js";
import { getAllSteps } from "./components/tasks/get-all-steps.js";
import { loadSteps } from "./components/tasks/load-steps.js";
import { getAlerts } from "./components/tasks/get-alerts.js";

export const codeElement = document.querySelector("code");

render(context);
connect();
disconnect();
updateRoom();
rehostRoomAfterRefresh();
sendCode();
updateCode();
receiveMessage();
getAllMessages();
receiveSteps();
getAllSteps();
loadSteps();
getAlerts();
