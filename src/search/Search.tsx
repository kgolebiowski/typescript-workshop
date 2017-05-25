import * as React from 'react';
import {Component} from 'react';

import {TrackSearch} from './trackSearch';
import {TrackList} from './TrackList';
import {Pagination} from './Pagination';
import {Track} from './trackSearch';

interface SearchState {
  query: string;
  results: Track[];
}

export class Search extends Component<{},SearchState>  {
  searchTracks = new TrackSearch();

  constructor() {
    super();

    this.state = {
      query: '',
      results: [],
    };

    this.queryChanged = this.queryChanged.bind(this);
    this.isDirectionHidden = this.isDirectionHidden.bind(this);
  }

  componentDidMount() {
    this.updateResults(this.state.query);
  }

  queryChanged(event) {
    const query = event.target.value;
    this.setState({query});
    this.updateResults(query);
  }

  async updateResults(query: string, direction?: number) {
    if (query) {
      const data = await this.searchTracks.search(query, direction);
      const results = data.tracks.items;

      this.setState(
        (state) => state.query === query ? {results} : {}
      );
    } else {
      this.setState({results: []});
    }
  }

  isDirectionHidden(direction: number): boolean {
    if (!this.state.query) {
      return true;
    }

    return !this.searchTracks.hasDirection(direction);
  }

  render() {
    return (
      <div className='container'>
        <header className="app-header">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={this.state.query}
            onChange={this.queryChanged}
          />
        </header>
        <TrackList tracks={this.state.results}/>
        <Pagination
          onNext={() => this.updateResults(this.state.query, 1)}
          onPrevious={() => this.updateResults(this.state.query, -1)}
          hideNext={this.isDirectionHidden(1)}
          hidePrevious={this.isDirectionHidden(-1)}
        />
      </div>
    );
  }
}
