const serverFromLS = localStorage.getItem("SERVER");
const roomIdFromLS = localStorage.getItem("ROOM_ID");
const hostIdFromLS = localStorage.getItem("HOST_ID");

class Store {
    is_first_loading = true;
    server = serverFromLS ? serverFromLS : "";
    room_id = roomIdFromLS ? +roomIdFromLS : null;
    host_id = hostIdFromLS ? +hostIdFromLS : null;
    host_name = "Host";
    active_user_id = null;
    users = {};
    files = [];
    tasks = {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        theory: "",
    };
    active_task = 1;
}

const store = new Store();

export default store;
