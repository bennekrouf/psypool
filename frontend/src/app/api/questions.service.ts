import { Injectable } from '@angular/core';
import { Question } from '../model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/questions/${id}`);
  }

  count(): Observable<any> {
    return this.http.get(`${this.baseUrl}/questions/count`);
  }
}
