import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-ingredient',
  templateUrl: './recipe-ingredient.component.html',
  styleUrls: ['./recipe-ingredient.component.css']
})
export class RecipeIngredientFormComponent implements OnInit {
  ingredients: any;
  constructor(private dataStorage: DataStorageService) {
  }
  ngOnInit() {
    this.dataStorage.getIngredients().subscribe(res => {
      this.ingredients = res.ingredients;
    });
  }
}
