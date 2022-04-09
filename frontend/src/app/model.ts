export interface Option {
    load: number;
    selected: boolean;
    value: string;
}

export interface Question {
    id: number;
    text: string;
    option: Option[];
}

export enum StateEnum {
    MENU,
    PLAYING,
    END,
}

export interface State {
    value: StateEnum;
}
