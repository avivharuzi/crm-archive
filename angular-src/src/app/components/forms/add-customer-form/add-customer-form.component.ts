import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.scss']
})
export class AddCustomerFormComponent implements OnInit {
  public customers: any;
  public newCustomer: string;
  public messageForm: any;
  public typeMessage: string;

  @Output()
  public customerSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private companyService: CompanyService
  ) {
    this.customers = null;
    this.newCustomer = null;
    this.messageForm = null;
    this.typeMessage = null;
  }

  ngOnInit() {
    this.getCountriesWithoutCurrent();
  }

  getCountriesWithoutCurrent(): void {
    this.companyService.getCompaniesWithoutCurrent().subscribe((res: any) => {
      this.customers = res;
    });
  }

  addCustomer(): void {
    if (this.newCustomer) {
      this.companyService.setCompanyCustomer(this.newCustomer).subscribe((res: any) => {
        this.messageForm = res.message;
        this.typeMessage = 'success';
        this.customerSuccess.emit();
      }, (err) => {
        this.messageForm = err.errors;
        this.typeMessage = 'danger';
      });
    } else {
      this.messageForm = 'You need to choose customer';
      this.typeMessage = 'danger';
    }
  }
}
