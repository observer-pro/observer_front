import store from "../../store/store.js";

export const handleSetNewAddress = () => {
    const addressElement = document.getElementById("address");

    addressElement.value = store.server;
    addressElement.addEventListener("input", (event) => {
        localStorage.setItem("SERVER", event.target.value);
    });
};
