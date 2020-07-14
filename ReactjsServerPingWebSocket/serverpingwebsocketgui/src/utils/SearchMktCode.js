import TrieSearch from "trie-search";

class SearchMktCode {
  constructor(dict) {
    this.tries = new TrieSearch();
    this.tries.addFromObject(dict);
  }

  getSearchItems(key) {
    return this.tries.get(key);
  }
}

export { SearchMktCode };
