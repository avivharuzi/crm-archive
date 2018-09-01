import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validator } from '../../../models/validator.model';
import { ValidationService } from '../../../services/validation/validation.service';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  public recipeForm: FormGroup;
  public messageForm: any;
  public typeMessage: string;
  public loading: boolean;

  @Input()
  public customerId: any;

  @Output()
  public recipeSuccess: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public validationService: ValidationService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.createRecipeForm();
    this.messageForm = null;
    this.typeMessage = null;
  }

  createRecipeForm(): void {
    const title = new FormControl('', [
      Validator.required('Title')
    ]);

    const subtitle = new FormControl('', [
      Validator.required('subtitle')
    ]);

    const price = new FormControl('', [
      Validator.required('Price')
    ]);

    const discount = new FormControl('', [
      Validator.required('Discount')
    ]);

    const currency = new FormControl('ILS', [
      Validator.required('Cuurency')
    ]);

    const payment = new FormControl('cash', [
      Validator.required('Payment')
    ]);

    this.recipeForm = new FormGroup({
      title,
      subtitle,
      price,
      discount,
      currency,
      payment
    });
  }

  setRecipeForm(): void {
    this.validationService.dirtyAllInputs(this.recipeForm);

    if (this.recipeForm.valid) {
      this.loading = true;

      const recipe: Recipe = new Recipe(
        this.recipeForm.get('title').value,
        this.recipeForm.get('subtitle').value,
        this.recipeForm.get('price').value,
        this.recipeForm.get('discount').value,
        this.recipeForm.get('currency').value,
        this.recipeForm.get('payment').value,
        this.customerId
      );

      this.recipeService.setRecipe(recipe).subscribe((res: any) => {
        this.typeMessage = 'success';
        this.messageForm = res.message;
        this.recipeForm.reset();
        this.recipeSuccess.emit(res.data);
        this.loading = false;
      }, (err) => {
        this.typeMessage = 'danger';
        this.messageForm = err.errors;
        this.loading = false;
      });
    }
  }
}
