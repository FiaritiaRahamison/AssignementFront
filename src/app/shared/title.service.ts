// title.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSource = new BehaviorSubject<string>('Assignment App');
  currentTitle = this.titleSource.asObservable();

  constructor() { }

  changeTitle(title: string) {
    this.titleSource.next(title);
  }
}
