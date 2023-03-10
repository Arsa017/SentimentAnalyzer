import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LexiconService } from '../lexicon.service';
import { Lexicon } from '../models/Lexicon';

@Component({
  selector: 'app-lexicon',
  templateUrl: './lexicon.component.html',
  styleUrls: ['./lexicon.component.css']
})
export class LexiconComponent implements OnInit {

  constructor(private lexiconService: LexiconService) { }

  ngOnInit(): void {
    this.lexiconService.getLexicon().subscribe((res: Lexicon[])=> {
      if (res != null) {
        this.lexicon = res;
        this.origiLexicon = res;
      }
    })
  }

  lexicon: Lexicon[] = [];
  origiLexicon: Lexicon[] = [];
  filterVal: string = "";
  negativeLexicon: Lexicon[] = [];
  positiveLexicon: Lexicon[] = [];

  wordToFind: string = "";
  foundedWord: Lexicon = new Lexicon();

  newWord: string = "";
  newScore: string = "";

  filter() {
    this.lexicon = this.origiLexicon;

    if (this.filterVal == "") {
      return;
    }

    if (this.filterVal == "all") {
      return;
    }

    // samo negativne reci
    if (this.filterVal == "negative") {
      this.negativeLexicon = []; // reset negativeLexicon array
      this.lexicon.forEach(l => {
        if (l.sentimentScore < 0){
          this.negativeLexicon.push(l);
        }
      });
      this.lexicon = this.negativeLexicon;
    }

    // samo pozitivne reci
    if (this.filterVal == "positive") {
      this.positiveLexicon = []; // reset positiveLexicon array
      this.lexicon.forEach(l => {
        if(l.sentimentScore >= 0) {
          this.positiveLexicon.push(l);
        }
      });
      this.lexicon = this.positiveLexicon;
    }

  }

  find() {

    if (this.wordToFind == "") {
      alert("Enter the word!");
      return;
    }

    this.lexiconService.getWordFromLexicon(this.wordToFind).subscribe((resp: Lexicon) => {
        if (resp != null) {
          this.foundedWord = resp;
        }
    }, (error: HttpErrorResponse) => {
      alert("The requested word does not exist in lexicon!");
      console.log(error);
    });
  }

  addWord() {
    this.newWord = this.newWord.trim().replace(/\s+/g, '');
    this.newScore= this.newScore.trim().replace(/\s+/g, '');

    if (this.newWord === '' || this.newScore === '') {
      alert("Enter new word and sentiment score!");
      return;
    }

    this.lexiconService.addWordToLexicon(this.newWord, this.newScore).subscribe(() => {
      // alert("New word added to the lexicon!");
      this.lexiconService.getLexicon().subscribe((res: Lexicon[])=> {
        if (res != null) {
          this.lexicon = res;
          this.origiLexicon = res;
        }
      })
    }, (error: HttpErrorResponse) => {
      alert("Error occurred while adding new word!");
      console.log(error);
    });

    this.newWord = "";
    this.newScore = "";
  }

  oldWordUpdate: string = "";
  newWordUpdate: string = "";
  newScoreUpdate: string = "";

  updateWord() {
    this.newWordUpdate = this.newWordUpdate.trim();
    this.newScoreUpdate= this.newScoreUpdate.trim();

    if (this.oldWordUpdate === '' || this.newWordUpdate === '' || this.newScoreUpdate === '')
    {
      alert("Enter correct values!");
      return;
    }

    this.lexiconService.uptateWordInLexicon(this.oldWordUpdate, this.newWordUpdate, this.newScoreUpdate).subscribe(() => {
      // alert("Word succesfully updated in the lexicon!");
      this.lexiconService.getLexicon().subscribe((res: Lexicon[])=> {
        if (res != null) {
          this.lexicon = res;
          this.origiLexicon = res;
        }
      }, (error: HttpErrorResponse) => {
        alert("Error occured while updating word!");
        console.log(error);
      })
    })
  }

  deleteWord: string = "";

  delete() {
    if (this.deleteWord === '') {
      alert("Choose word to delete!");
      return;
    }

    this.lexiconService.deleteWordInLexicon(this.deleteWord).subscribe(() => {
      // alert("Word successfully deleted!");
      this.lexiconService.getLexicon().subscribe((res: Lexicon[]) => {
        if (res != null) {
          this.lexicon = res;
          this.origiLexicon = res;
        }
      }, (error: HttpErrorResponse) => {
        alert("Error occured while deleting word!");
        console.log(error);
      }
    )})

  }

}
