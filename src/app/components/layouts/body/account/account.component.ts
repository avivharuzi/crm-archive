import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { PATH_IMAGES } from '../../../../constants/urls';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public companyDetails: any;
  public pathImages: string;

  constructor(
    private companyService: CompanyService
  ) {
    this.companyDetails = null;
  }

  ngOnInit() {
    this.pathImages = PATH_IMAGES;
    this.getCompanyDetails();
  }

  getCompanyDetails(): void {
    this.companyService.getCompanyDetails().subscribe((res: any) => {
      this.companyDetails = res;
    });
  }
}
