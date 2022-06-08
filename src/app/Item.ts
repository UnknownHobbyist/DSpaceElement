export interface Item {
    id:           string;
    uuid:         string;
    name:         string;
    handle:       string;
    metadata:     { [key: string]: Metadatum[] };
    inArchive:    boolean;
    discoverable: boolean;
    withdrawn:    boolean;
    lastModified: Date;
    entityType:   null;
    type:         Type;
    _links:       ItemLinks;
}

export interface ItemLinks {
    bundles:           Self;
    mappedCollections: Self;
    owningCollection:  Self;
    relationships:     Self;
    version:           Self;
    templateItemOf:    Self;
    thumbnail:         Self;
    self:              Self;
}

export interface Self {
    href: string;
}

export interface Metadatum {
    value:      null | string;
    language:   Language | null;
    authority:  null;
    confidence: number;
    place:      number;
}

export enum Language {
    Empty = "",
    En = "en",
}

export enum Type {
    Item = "item",
}
