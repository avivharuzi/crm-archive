import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  @Input()
  public type: string;
  @Input()
  public message: any;
  @Input()
  public class: any;

  constructor() { }

  ngOnInit() {
  }

  isArray(value: any): boolean {
    if (value instanceof Array) {
      return true;
    } else {
      return false;
    }
  }
}
