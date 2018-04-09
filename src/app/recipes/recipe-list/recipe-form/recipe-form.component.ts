import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { FormGroup, FormBuilder, FormArray, AbstractControl, Validators } from '@angular/forms';
import { DataStorageService } from 'app/shared/data-storage.service';
import { Ingredient } from '../../../shared/ingredient.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  @ViewChild('amountInput') inputAmount: ElementRef;
  @ViewChild('nameInput') inputName: ElementRef;
  recipe = new Recipe('', '', '', []);
  ingredientsList: Ingredient[] = [];
  recipeForm: FormGroup;
  iName = '';
  iAmount = 0;
  buttonSaveText = 'Guardar';
  isEdit = false;  
  hasErrorIngredient = false;
  constructor(private fBuilder: FormBuilder,
    private dataSourceService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService) {
    if (this.route.snapshot.children.length > 0) {
      if (this.route.snapshot.children[0].params['id'] !== null && this.route.snapshot.children[0].params['id'] !== undefined) {
        this.recipe = this.recipeService.getRecipe(+this.route.snapshot.children[0].params['id']);
        this.ingredientsList = this.recipe.ingredients;
        this.recipe.ingredients = [];
        this.buttonSaveText = 'Editar';
        this.isEdit = true;
      }
    }

    this.recipeForm = this.fBuilder.group(this.recipe);
    this.recipeForm.setControl('ingredients', this.fBuilder.array(this.ingredientsList));
    this.recipeForm.get('name').setValidators(Validators.required);
  }

  get ingredients(): FormArray {
    return (this.recipeForm.get('ingredients') as FormArray);
  }

  addIngredient() {
    if (this.inputName.nativeElement.value !== '' && this.inputAmount.nativeElement.value !== 0) {
      const ingred = new Ingredient(this.inputName.nativeElement.value as string,
        this.inputAmount.nativeElement.value as number,
        this.recipe.id);
      this.ingredients.push(this.fBuilder.group(ingred));
      this.hasErrorIngredient = false;
    }
  }
  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
    this.hasErrorIngredient = this.ingredients.length === 0;
  }
  ngOnInit() {
  }

  save() {
    const recipeAux = this.recipeForm.value;
    if (this.recipeForm.valid) {
      if (this.recipeForm.value.ingredients.length > 0) {
        if (!this.isEdit) {
          this.dataSourceService.addRecipe(recipeAux).subscribe(res => {
            this.router.navigate(['/recipes']);
            this.dataSourceService.getRecipes();
          });
        } else {
          this.dataSourceService.editRecipe(recipeAux).subscribe(res => {
            this.router.navigate(['/recipes']);
            this.dataSourceService.getRecipes();
          });
        }
      } else {
        this.hasErrorIngredient = true;
      }
    }

  }
}
