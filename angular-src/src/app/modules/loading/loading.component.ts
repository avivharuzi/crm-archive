import { Component, OnInit, Input } from '@angular/core';
import { LOADING_GIF_PATH } from '../../constants/urls';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input()
  public loading: boolean;

  @Input()
  public size: number;

  @Input()
  public background: string;

  @Input()
  public gif: string;

  constructor() {
    this.gif = LOADING_GIF_PATH;
  }

  ngOnInit() {
    this.checkSize();
  }

  checkSize(): void {
    if (!this.size) {
      this.size = 100;
    }
  }
}
