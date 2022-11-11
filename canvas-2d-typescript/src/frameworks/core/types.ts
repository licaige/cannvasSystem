export type Dictionary<T> = {
    [key: string]: T;
};

export type ArrayLike<T> = {
    [key: number]: T;
    length: number;
};

export type ImageLike = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;

export type TextVerticalAlign = 'top' | 'middle' | 'bottom';

export type TxtAlgin = 'left' | 'center' | 'right';
