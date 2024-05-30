import ClipboardJS from "clipboard";

export const handleInvite = () => {
    const inviteElement = document.getElementById("invite");

    inviteElement?.addEventListener("click", (event) => {
        event.preventDefault();

        const clipboard = new ClipboardJS("#invite", {
            text: () => {
                return inviteElement.dataset.clipboardText;
            },
        });

        clipboard.on("success", () => {
            alert("The text has been copied");

            clipboard.destroy();
        });
        clipboard.on("error", () => {
            alert("Copy error");

            clipboard.destroy();
        });
    });
};
