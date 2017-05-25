import {buildUrl} from '../utils/urls';

const baseUrl = `https://api.spotify.com/v1/search`;

interface SpotifyObject {
  id: string;
  type: string;
  name: string;
}

interface Image {
  height: number;
  width: number;
  url: string;
}

interface Album extends SpotifyObject {
  album_type: string;
  images: Image[];
}

export interface Track extends SpotifyObject {
  preview_url: string;
  album: Album;
  artists: Artist[];
}

interface Artist extends SpotifyObject { }

interface SpotifyPagination {
  items: SpotifyObject[];
  next: string;
  previous: string;
}

interface Tracks extends SpotifyPagination {
  items: Track[];
}

interface SearchData {
  tracks: Tracks;
}

export class TrackSearch {
  nextUrl;
  previousUrl;

  async search(query:string, direction:number): Promise<SearchData> {
    let url;

    if (direction) {
      const directionUrl = this.paginationUrl(direction);

      if (!directionUrl) {
        throw new Error(
          'SpotifySearch: No direction url to query. ' +
          'You must call search without direction for the first time.'
        );
      }

      url = directionUrl;
    } else {
      url = buildUrl(baseUrl, {
        q: query,
        type: 'track',
        limit: 12,
      });
    }

    const response = await fetch(url);
    const data = await response.json();

    this.nextUrl = data.tracks.next;
    this.previousUrl = data.tracks.previous;

    return data;
  }

  hasDirection(direction) {
    return !!this.paginationUrl(direction);
  }

  paginationUrl(direction) {
    switch (direction) {
      case 1:
        return this.nextUrl;
      case -1:
        return this.previousUrl;
    }
  }
}