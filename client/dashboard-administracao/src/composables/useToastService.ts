import type { ToastMessageOptions } from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export const useToastService = () => {
    const toast = useToast();
    return {
        add: (msg: ToastMessageOptions) => toast.add(msg)
    };
};



// type Severity = "success" | "info" | "warn" | "error" | "secondary" | "contrast" | undefined;

// const showToast = (sev: Severity, sum: string, det: string) => { 
//     const toastService = useToastService();
//     toastService.add({ severity: sev , summary: sum, detail: det, life: 3000 }); 
// };
