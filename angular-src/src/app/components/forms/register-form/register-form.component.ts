import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryService } from '../../../services/country/country.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Company } from '../../../models/company.model';
import { Validator } from '../../../models/validator.model';
import { CompanyService } from '../../../services/company/company.service';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  public countries: any[];
  public registerForm: FormGroup;
  public countryImage: any;
  public companyImage: File;
  public registerMessage: any;
  public typeMessage: string;
  public loading: boolean;

  @ViewChild('fileImage')
  public fileImage: any;

  constructor(
    private countryService: CountryService,
    private companyService: CompanyService,
    public validationService: ValidationService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.createRegisterForm();
    this.getCountries();
    this.registerMessage = null;
    this.typeMessage = null;
  }

  createRegisterForm() {
    const name = new FormControl('', [
      Validator.required('Country name')
    ]);

    const number = new FormControl('', [
      Validator.required('Company number')
    ]);

    const username = new FormControl('', [
      Validator.required('Username')
    ]);

    const password = new FormControl('', [
      Validator.required('Password')
    ]);

    const country = new FormControl('', [
      Validator.required('Contry')
    ]);

    const city = new FormControl('', [
      Validator.required('City')
    ]);

    const street = new FormControl('', [
      Validator.required('Street')
    ]);

    this.registerForm = new FormGroup({
      name,
      number,
      username,
      password,
      country,
      city,
      street
    });
  }

  getCountries() {
    this.countryService.getCountries().subscribe((res: any) => {
      this.countries = res;
      this.registerForm.get('country').setValue(this.countries[0].name);
    }, (err) => {
      console.log(err);
    });
  }

  changeCompanyImage(event) {
    let fileList: FileList = event.target.files;
    this.companyImage = fileList[0];
  }

  setRegisterForm(): void {
    this.validationService.dirtyAllInputs(this.registerForm);

    if (!this.companyImage) {
      this.registerMessage = 'You need to choose company image';
      this.typeMessage = 'danger';
      return;
    }

    if (this.registerForm.valid) {
      this.loading = true;

      let countryName: any = this.registerForm.get('country').value;

      this.countryService.getCountryByName(countryName).subscribe((res: any) => {
        this.countryImage = res.flag;

        const company: Company = new Company(
          this.registerForm.get('name').value,
          this.registerForm.get('number').value,
          this.companyImage,
          this.registerForm.get('username').value,
          this.registerForm.get('password').value,
          countryName,
          this.countryImage,
          this.registerForm.get('city').value,
          this.registerForm.get('street').value
        );

        this.setCompany(company);
      });
    }
  }

  setCompany(company: Company) {
    this.companyService.setCompany(company).subscribe((res: any) => {
      this.registerMessage = res.message;
      this.typeMessage = 'success';
      this.registerForm.reset();
      this.resetCompanyImage();
      this.loading = false;
    }, (err) => {
      this.registerMessage = err;
      this.typeMessage = 'danger';
      this.loading = false;
    });
  }

  resetCompanyImage(): void {
    this.companyImage = null;
    this.fileImage.nativeElement.value = '';
  }
}
