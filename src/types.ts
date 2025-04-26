export interface Photo {
  id: string;
  name: string;
  url: string;
  orientation: "portrait" | "landscape" | "square";
  dateAdded: number;
}

export interface Album {
  id: string;
  name: string;
  photos: Photo[];
  dateCreated: number;
}
