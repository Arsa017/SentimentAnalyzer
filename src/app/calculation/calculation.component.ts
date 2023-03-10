import { Component, OnInit } from '@angular/core';
import { LexiconService } from '../lexicon.service';
import { Lexicon } from '../models/Lexicon';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {

  constructor(private lexiconService: LexiconService) {

  }


  ngOnInit(): void {
    this.lexiconService.getLexicon().subscribe((resp: Lexicon[]) => {
      if (resp) {
        this.lexicon = resp;
      }
    })
  }

  lexicon: Lexicon[] = [];
  textArea: string = "";
  list: string[] = [];
  textAreaCalcValue: number;

  calculate() {
    this.textArea = this.textArea.trim();
    this.textAreaCalcValue = 0;

    if (this.textArea === '') {
      alert("Input text into text area before calculation!");
      return;
    }

    this.list = this.textArea.replace(/\s+/g, ' ').replace(/\./g, "").replace(/,/g, "").split(' ');

    this.list.forEach(l => {
      this.lexicon.forEach(lex => {
        if (lex.word === l) {
          // alert(lex.word);
          // alert(lex.sentimentScore);
          this.textAreaCalcValue += Number(lex.sentimentScore);
        }
      });
    });

    alert("Text area calculated sentimental score is: " + this.textAreaCalcValue.toFixed(2).toString());
  }

  wordsFromFile: string[] = [];
  fileCalcValue: number;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const fileContent: string = e.target.result;
        this.wordsFromFile = fileContent.replace(/\s+/g, ' ').replace(/\./g, "").replace(/,/g, "").split(' ');
        console.log(this.wordsFromFile);
      };

      reader.readAsText(file);
    }
  }

  calculateFromFile() {
    this.fileCalcValue = 0;
    if (this.wordsFromFile.length == 0) {
      alert("Choose file before calculation!");
      return;
    }

    this.wordsFromFile.forEach(w => {
      this.lexicon.forEach(lex => {
        if (lex.word === w) {
          // alert(lex.word);
          // alert(lex.sentimentScore);
          this.fileCalcValue += Number(lex.sentimentScore);
        }
      });
    });

    alert("Calculated file sentimental score is: " + this.fileCalcValue.toFixed(2).toString());
  }


}


/*
The book that I was reading yesterday was excellent.
It was raining that day so weather conditions were horrible to go outside.
I hope to complete it in next few days, because it is really nice to read.
*/
