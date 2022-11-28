export const MainServerURL = "http://localhost:5000";
export const MessengerServerURL = 'http://localhost:5001';

/* Константы API для работы с сервером (общие константы) */
const MainApi = {
    main_server: MainServerURL,
    messenger_server: MessengerServerURL,

    // ngrok addresses
    ngrok_main_server: '...',
    ngrok_messenger_server: '...'
};

export default MainApi;