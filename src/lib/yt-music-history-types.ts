export type MusicHistoryItem = {
  id: string;
  title: string | null;
  itemType: string | null;
  artists: string[];
  album: string | null;
  duration: string | null;
  thumbnails: string[];
  day: string | null;
};

export type MusicHistoryData = {
  items: MusicHistoryItem[];
  total: number;
};
