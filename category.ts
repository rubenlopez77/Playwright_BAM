import { expect, Page, Locator } from '@playwright/test';


export enum Category {
  Phones = 'Phones',
  Laptops = 'Laptops',
  Monitors = 'Monitors'
}

export class Categories {
  private readonly page: Page;
  private readonly catElement: Locator;
  private readonly  items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catElement = this.page.locator('.list-group');
    this.items = this.catElement.locator('.list-group-item');
 
  
  }
  public async goCategory(cat: Category): Promise<void> {

    await this.catElement.locator(`:has-text("${cat}")`).click();

   // Switch 
    switch (cat) {
      case Category.Monitors:
        
      //blah blah

      break;
      case Category.Phones:
        
      break;  
      case Category.Laptops:
     
      break;
      default:
        throw new Error(`Categoría no implementada: ${cat}`);
    }

  }


      /// <summary>           
    /// Obtiene el número de categorías disponibles
    /// </summary>
  private async getCategoryCount(): Promise<number> {
    return (await this.items.count())-1;
  }

  private async getCategoryNames(): Promise<string[]> {

  return (await this.items.allTextContents()).slice(1); // Ignora el primer elemento (el título)


  }

    /// <summary>           
    /// Valida que las categorías sean las esperadas
    /// </summary>  
  public async validateCategories(): Promise<void> {


    const count = await this.getCategoryCount();
    expect(count).toBe(3);

    const names = await this.getCategoryNames();
    expect(names).toEqual(['Phones', 'Laptops', 'Monitors']);
  }
}