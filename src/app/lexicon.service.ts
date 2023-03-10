import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LexiconService {

  constructor(private http: HttpClient) { }

  uri = 'https://localhost:7104';

  getLexicon() {
    return this.http.get(`${this.uri}/api/lexicon`);
  }

  getWordFromLexicon(word: string) {
    return this.http.get(`${this.uri}/api/lexicon/${word}`)
  }

  addWordToLexicon(newWord: string, newScore: string) {
    const request = {
      "Word": newWord,
      "SentimentScore": newScore
    }
    return this.http.post(`${this.uri}/api/lexicon`, request);
  }

  uptateWordInLexicon(oldWordUpdate: string, newWordUpdate: string, newScoreUpdate: string) {
    const request = {
      "OldWord": oldWordUpdate,
      "NewWord": newWordUpdate,
      "NewSentimentScore": newScoreUpdate
    }
    return this.http.put(`${this.uri}/api/lexicon/update/word`, request);
  }

  deleteWordInLexicon(wordToDelete: string) {
    return this.http.delete(`${this.uri}/api/lexicon/delete/word/${wordToDelete}`);
  }

}
