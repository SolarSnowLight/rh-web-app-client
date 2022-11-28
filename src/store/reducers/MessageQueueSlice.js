import { createSlice } from "@reduxjs/toolkit";

/* Base state for current slice */
const initialState = {
    queue: []
};

/* Create a new clice for user API */
export const messageQueueSlice = createSlice({
    name: "message_queue_slice",
    initialState,
    reducers: {
        addMessage(state, action) {
            if (action.payload) {
                const prev = JSON.parse(JSON.stringify(state.queue));
                prev.push(action.payload);

                state.queue = prev;
            }
        },
        
        removeMessage(state, action) {
            const data = JSON.parse(JSON.stringify(state.queue));
            const index = data.findIndex((value) => {
                return value.uuid === action.payload
            });

            if (index >= 0) {
                data.splice(index, 1);
            }

            state.queue = data;
        }
    },
});

export default messageQueueSlice.reducer;