export const getScrolledChat = () => {
    const chatElement = document.getElementById("chat");

    if (chatElement) {
        chatElement.scrollTop = 9999999999999;
    }
};
