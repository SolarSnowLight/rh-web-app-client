/* Libraries */
import { useEffect } from 'react';

/* Hooks */
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import messageQueueAction from 'src/store/actions/MessageQueueAction';

/* High-Order Component for message output */
const WithToastify = (View) => {
    const Component = () => {
        const messageQueueSelector = useAppSelector(state => state.messageQueueReducer);
        const dispatch = useAppDispatch();
        const messageToastify = useMessageToastify();

        useEffect(() => {
            if(messageQueueSelector.queue.length > 0){
                const message = messageQueueSelector.queue[0];
                messageToastify(message.data.message, message.type);

                dispatch(messageQueueAction.removeMessage(message.uuid));
            }
        }, [messageQueueSelector]);
        
        return (
            <View />
        )
    }

    return Component;
}

export default WithToastify;