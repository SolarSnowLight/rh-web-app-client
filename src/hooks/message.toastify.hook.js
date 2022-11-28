import { useCallback } from 'react';
import { toast } from 'react-toastify';

// toast.configure();

export const useMessageToastify = () => {
    return useCallback((text, type) => {
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