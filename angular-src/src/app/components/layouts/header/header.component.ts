import { PATH_IMAGES } from '../../../constants/urls';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public companyDetails: any;
  public pathImages: string;

  constructor(
    private authService: AuthService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.pathImages = PATH_IMAGES;
    this.getCompanyDetails();
  }

  logout(): void {
    this.authService.logout();
  }

  getCompanyDetails(): void {
    this.companyService.getCompanyDetails().subscribe((res: any) => {
      this.companyDetails = res;
    });
  }
}
