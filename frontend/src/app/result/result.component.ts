import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  title = 'Your personality is awesome !!!';
  introValue = 0;
  extroValue = 0;
  @Input() answers: Question[] = [];

  ngOnInit(): void {
    this.compute();
  }

  compute() {
    this.answers.forEach(q => {
      q.option.filter(a => a.selected).forEach((o) => {
        if (o.load < 0) {
          this.introValue += o.load;
        } else {
          this.extroValue += o.load;
        }
      });
    });
    const total = Math.abs(this.introValue) + this.extroValue;
    this.introValue = Math.abs(this.introValue) * 100 / total;
    this.extroValue = this.extroValue * 100 / total;
  }
}