export class Ingredient {
  id: number;
  name: string;
  amount: number;
  recipeId: number;
  constructor(name: string, amount: number, recipeId: number) {
    this.id = 0;
    this.name = name;
    this.amount = amount;
    this.recipeId = recipeId;
  }
}
