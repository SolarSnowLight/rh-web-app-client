import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { empty } from 'src/types/empty';

// toast.configure();

export const useMessageToastify = () => {
    return useCallback((text: string | empty, type: string | empty) => {
        if (text) {
            if (type === "info") {
                toast.info(text);
            } else if (type === "success") {
                toast.success(text);
            } else if (type === "warning") {
                toast.warn(text);
            } else if (type === "error") {
                toast.error(text);
            } else if (type === "dark") {
                toast.dark(text);
            } else {
                toast(text);
            }
        }
    }, []);
}