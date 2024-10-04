export interface IJoke {
  id: string;
  joke: string;
}

export interface ISearchResponse {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: IJoke[];
  search_term: string;
  status: number;
  total_jokes: number;
  total_pages: number;
}
