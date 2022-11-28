/* Libraries */
import { v4 as uuidv4 } from 'uuid';

/* Context */
import { messageQueueSlice } from "../reducers/MessageQueueSlice";

/* DTO */
import ApiResponseDto from 'src/dtos/api.response-dto';

const addMessage = (response, type, message: string | undefined | null = null) => async (dispatch) => {
    if (response || message) {
        dispatch(messageQueueSlice.actions.addMessage({
            ...(new ApiResponseDto({
                uuid: uuidv4(),
                data: {
                    message: (message) ? message : response.data.message
                },
                status: (response) ? response.status : 200,
                type: type,
                created_at: (new Date()).toUTCString()
            }))
        }));
    }
}

const removeMessage = (uuid) => async (dispatch) => {
    dispatch(messageQueueSlice.actions.removeMessage(uuid));
}

const errorMessage = (e) => async (dispatch) => {
    if (e?.response?.data?.message) {
        dispatch(messageQueueSlice.actions.addMessage({
            ...(new ApiResponseDto({
                uuid: uuidv4(),
                data: {
                    message: e.response.data.message
                },
                status: (e?.response?.status)? e?.response?.status : 400,
                type: "error",
                created_at: (new Date()).toUTCString()
            }))
        }));
    } else {
        console.log(e);
        dispatch(messageQueueSlice.actions.addMessage({
            ...(new ApiResponseDto({
                uuid: uuidv4(),
                data: {
                    message: e.message
                },
                status: 400,
                type: "error",
                created_at: (new Date()).toUTCString()
            }))
        }));
    }
}

const messageQueueAction = {
    removeMessage,
    addMessage,
    errorMessage,
};

export default messageQueueAction;
