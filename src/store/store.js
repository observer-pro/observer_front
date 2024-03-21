const serverFromLS = localStorage.getItem("SERVER");
const roomIdFromLS = localStorage.getItem("ROOM_ID");
const hostIdFromLS = localStorage.getItem("HOST_ID");

class Store {
    is_first_loading = true;
    server = serverFromLS ? serverFromLS : "";
    room_id = roomIdFromLS ? +roomIdFromLS : null;
    host_id = hostIdFromLS ? +hostIdFromLS : null;
    host_name = "Host";
    editor = null;
    active_user_id = null;
    users = {};
    files = [];
}

const store = new Store();

export default store;
