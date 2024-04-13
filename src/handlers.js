import { createRoom } from "./components/room/create-room.js";
import { closeRoom } from "./components/room/close-room.js";
import { rehostRoom } from "./components/room/rehost-room.js";
import { openTask } from "./components/tasks/open-task.js";
import { clickUser } from "./components/sharing/select-user.js";
import { clickFile } from "./components/sharing/select-file.js";
import { toggleMessageForm } from "./components/message/toggle-form.js";
import { sendSteps } from "./components/tasks/send-steps.js";
import { selectTaskNumber } from "./components/tasks/select-task-number.js";
import { sendTasks } from "./components/tasks/send-tasks.js";

export const handlers = {
    room_create: createRoom,
    room_close: closeRoom,
    room_rehost: rehostRoom,
    open_task: openTask,
    click_user: clickUser,
    click_file: clickFile,
    toggle_message_form: toggleMessageForm,
    send_steps: sendSteps,
    select_task_number: selectTaskNumber,
    send_tasks: sendTasks,
};
