import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../../services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: any;

  constructor(
    private recipeService: RecipeService
  ) {
    this.recipes = null;
  }

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes(): void {
    this.recipeService.getRecipesForCompany().subscribe((res: any) => {
      this.recipes = res;
    }, (err) => {
      console.log(err);
    });
  }
}
