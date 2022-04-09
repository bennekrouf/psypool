import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Question, State, StateEnum, Option } from '../model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../api/questions.service'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  homePageTitle: string = 'Welcome on Teamway psy app';
  title: string = this.homePageTitle;

  stateEnum: typeof StateEnum = StateEnum;
  StateEnum = StateEnum;
  state: State = {
    value: StateEnum.MENU
  }

  questions: Question[] = [];
  count: number = 0;
  startable: boolean = false;
  
  currentQuestion: Question = this.questions[0];
  questionPublicIndex: any;
  @Output() newTitleEvent = new EventEmitter<string>();

  constructor(
    private location: Location,
    private router: Router,
    private questionService: QuestionsService,
    private activatedRoute: ActivatedRoute) {
    router: Router
   }

  ngOnInit(): void {
    this.questionService.count()
      .subscribe(result => {
        this.count = result.count;
        this.startable = true;
      })
  }

  setState(newState: StateEnum) {
    this.state.value = newState;
  }

  selectedOption(question: Question) : Option {
    return question.option.filter(o => o.selected)[0];
  }

  start() {
    this.questionService.getQuestionById(1)
      .subscribe(firstQuestion => {
        this.setState(StateEnum.PLAYING);
        this.questions.push(firstQuestion);
        this.currentQuestion = firstQuestion;
        this.changeTitle('Keep telling about yourself !');
        this.questionPublicIndex = 1;
        this.redirectTo(this.questionPublicIndex);
      });
  }

  back() {
    window.location.reload();
  }

  changeTitle(newTitle: string) {
    this.title = newTitle ? newTitle : this.homePageTitle;
  }

  redirectTo(id: number) {
    const url = this.router.createUrlTree([], { relativeTo: this.activatedRoute, queryParams: { question: id } }).toString()
    this.location.go(url);
  }

  onSelect(option: Option) {
    this.currentQuestion.option = this.currentQuestion.option.map((o) => {
      o.selected = !!(o.value === option.value);
      return o;
    });
  }

  next() {
    this.questionPublicIndex += 1;
    if (this.questionPublicIndex > this.count) { // END
      this.setState(StateEnum.END);
      this.location.go('/result');
    } else {
      if (this.questions.find(q => q.id === this.questionPublicIndex)) { // Question already in the history, the user is doing back/next
        this.currentQuestion = this.questions[this.questionPublicIndex - 1];
        this.redirectTo(this.questionPublicIndex);
      } else { // New question to load
        this.questionService.getQuestionById(this.questionPublicIndex)
          .subscribe(nextQuestion => {
            this.currentQuestion = nextQuestion;
            this.questions.push(nextQuestion);
            this.redirectTo(this.questionPublicIndex);
          });
      }
    }
  }

  previous() {
    if (this.questionPublicIndex > 1) {
      this.questionPublicIndex -= 1;
      this.currentQuestion = this.questions[this.questionPublicIndex - 1];
      this.redirectTo(this.questionPublicIndex);
    }
  }
}