export interface Dictionary {
    [key: string]: string | any;
}

export interface Location {
    id: number;
    name: string;
    lat: number;
    lng: number;
}