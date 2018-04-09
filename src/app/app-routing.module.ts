import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './recipes/recipe-list/recipe-form/recipe-form.component';
import { RecipeIngredientFormComponent } from './recipes/recipe-ingredient/recipe-ingredient.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      {
        path: 'add', component: RecipeFormComponent, children: [
          { path: ':id', component: RecipeFormComponent }
        ]
      },
      { path: 'ingredients', component: RecipeIngredientFormComponent},
      { path: ':id', component: RecipeDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
