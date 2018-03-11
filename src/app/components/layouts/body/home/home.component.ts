import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { PATH_IMAGES } from '../../../../constants/urls';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public companyDetails: any;
  public pathImages: string;

  constructor(
    private companyService: CompanyService
  ) { }

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
