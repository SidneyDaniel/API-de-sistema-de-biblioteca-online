import type { ToastMessageOptions } from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export const useToastService = () => {
    const toast = useToast();
    return {
        add: (msg: ToastMessageOptions) => toast.add(msg)
    };
};
