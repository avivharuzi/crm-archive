import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PATH_IMAGES } from '../../../../constants/urls';
import { RecipeService } from '../../../../services/recipe/recipe.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  public customerDetails: any;
  public customerName: string;
  public pathImages: string;
  public recipes: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public companyService: CompanyService,
    private recipeService: RecipeService
  ) {
    this.customerDetails = null;
    this.recipes = null;
    this.pathImages = PATH_IMAGES;
  }

  ngOnInit() {
    this.checkCustomer();
  }

  checkCustomer(): void {
    this.activatedRoute.params.subscribe(params => this.customerName = params.name);
    this.companyService.getCompanyCustomerDetails(this.customerName).subscribe((res: any) => {
      if (res) {
        this.customerDetails = res;
        this.getRecipes();
      } else {
        this.router.navigate(['/']);
      }
    }, err => {
      this.router.navigate(['/']);
    });
  }

  getRecipes(): void {
    this.recipeService.getRecipesForCustomer(this.customerDetails._id).subscribe((res: any) => {
      this.recipes = res;
    }, (err) => {
      console.log(err);
    });
  }

  addRecipe(newRecipe: any): void {
    this.recipes.push(newRecipe);
  }
}
