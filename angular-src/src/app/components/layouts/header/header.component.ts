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
  public isNavOpen: boolean;

  constructor(
    private authService: AuthService,
    private companyService: CompanyService
  ) {
    this.isNavOpen = false;
  }

  ngOnInit() {
    this.pathImages = PATH_IMAGES;
    this.getCompanyDetails();
  }

  toggleNavMobile() {
    this.isNavOpen = this.isNavOpen ? false : true;
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
