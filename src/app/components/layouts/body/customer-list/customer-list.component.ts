import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  public customers: any;
  public searchCustomers: string;

  constructor(
    private companyService: CompanyService
  ) {
    this.customers = null;
    this.searchCustomers = '';
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.companyService.getCompanyCustomers().subscribe((res: any) => {
      this.customers = res;
    });
  }
}
