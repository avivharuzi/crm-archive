import { Component, OnInit, Input , AfterContentChecked } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.scss']
})
export class ErrorFormComponent implements OnInit , AfterContentChecked {
  @Input()
  public control: FormControl;

  public errors: string[];

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    this.errors = new Array<string>();

    for (const key in this.control.errors) {
      if (this.control.dirty && this.control.invalid) {
        this.errors.push(this.control.errors[key]);
      }
    }
  }
}
