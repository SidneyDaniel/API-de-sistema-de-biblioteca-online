export interface MenuItems {
    separator?: boolean;
    label?: string;
    items?: Array<{
        label: string;
        icon: string;
        path: string;
        command?: () => void;
    }>;
}

export interface UserInfo {
    email: string;
    name: string;
}