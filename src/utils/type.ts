export interface Painting {
    authorId: string;
    created: string;
    id: number;
    imageUrl: string;
    locationId: number;
    name: string;
}

export interface Author {
    id: number;
    name: string;
}

export interface Location {
    id: number;
    location: string;
}
