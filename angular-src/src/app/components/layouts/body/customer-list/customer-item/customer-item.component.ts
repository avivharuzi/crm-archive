import { Component, OnInit, Input } from '@angular/core';
import { PATH_IMAGES } from '../../../../../constants/urls';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent implements OnInit {
  @Input()
  public customer: any;

  public pathImages: string;

  constructor() { }

  ngOnInit() {
    this.pathImages = PATH_IMAGES;
  }

}
