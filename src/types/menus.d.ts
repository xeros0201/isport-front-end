declare global {

    export interface MenuItem {
        label: string;
        path: string;
    }

    export type Menu = MenuItem[];

}

export {};