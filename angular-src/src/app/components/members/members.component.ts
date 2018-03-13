import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
