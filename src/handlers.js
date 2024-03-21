import { createRoom } from "./components/room/create-room";
import { closeRoom } from "./components/room/close-room";
import { rehostRoom } from "./components/room/rehost-room";
import { openTask } from "./components/tasks/open-task";
import { clickUser } from "./components/sharing/select-user";
import { clickFile } from "./components/sharing/select-file";
import { toggleMessageForm } from "./components/message/toggle-form";
import { sendSteps } from "./components/tasks/send-steps";

export const handlers = {
    room_create: createRoom,
    room_close: closeRoom,
    room_rehost: rehostRoom,
    open_task: openTask,
    click_user: clickUser,
    click_file: clickFile,
    toggle_message_form: toggleMessageForm,
    send_steps: sendSteps,
};
