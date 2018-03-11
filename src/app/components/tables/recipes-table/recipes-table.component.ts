import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipes-table',
  templateUrl: './recipes-table.component.html',
  styleUrls: ['./recipes-table.component.scss']
})
export class RecipesTableComponent implements OnInit {
  @Input()
  public recipes: any;

  constructor() { }

  ngOnInit() {
  }
}
