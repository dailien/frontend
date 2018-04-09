import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipesResponse } from '../recipes/recipe.response.model';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) { }


  getRecipes() {
    this.http.get('http://localhost:8082/api/recipe/all')
      .map(
        (response: Response) => {
          const recipesResponse: RecipesResponse = response.json();
          const recipes = recipesResponse.recipes;
          for (const recipe of recipesResponse.recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
  addRecipe(recipe: Recipe) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://localhost:8082/api/recipe/post', JSON.stringify(recipe), options)
      .map((response: Response) => <any>response.json());
  }
  editRecipe(recipe: Recipe) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions();
    options.headers = headers;
    return this.http.put('http://localhost:8082/api/recipe/update', JSON.stringify(recipe), options)
      .map((response: Response) => <any>response.json());
  }
  getIngredients() {
    return this.http.get('http://localhost:8082/api/ingredient/all')
      .map(
        (response: Response) => <any> response.json()
      );
  }
}
