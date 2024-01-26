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
            alert("Текст скопирован в буфер обмена");

            clipboard.destroy();
        });
        clipboard.on("error", () => {
            alert("Ошибка копирования");

            clipboard.destroy();
        });
    });
};
