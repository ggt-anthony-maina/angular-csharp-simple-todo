import { Injectable } from '@angular/core';
import { Item } from './item';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

 
  private getAllItemsUrl = 'https://localhost:7099/api/TodoItems'; // Assuming your backend URL is 'http://localhost:3000' and the endpoint is '/items'
  private getItemByIdUrl = 'https://localhost:7099/api/TodoItems'; // Assuming your backend URL is 'http://localhost:3000' and the endpoint is '/items'
  private updateItemUrl = 'https://localhost:7099/api/TodoItems'; // Assuming your backend URL is 'http://localhost:3000' and the endpoint is '/items'
  private postItemUrl = 'https://localhost:7099/api/TodoItems'; // Assuming your backend URL is 'http://localhost:3000' and the endpoint is '/items'
  private deleteItemUrl = 'https://localhost:7099/api/TodoItems'; // Assuming your backend URL is 'http://localhost:3000' and the endpoint is '/items'
  
  filter: "all" | "active" | "done" = "all";
  
  allItems = [
    { description: "eat", done: true },
    { description: "sleep", done: false },
    { description: "play", done: false },
    { description: "laugh", done: false },
  ]
  async getAllItems(): Promise<Item[]> {
    try {
      // const data = await fetch(this.getAllItemsUrl)
      const response = await fetch(this.getAllItemsUrl, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ name, isComplete: false })
      })
      return await response.json()
      // return await data.json()   ?? [];
      // return await this.http.get<Item[]>(this.apiUrl).toPromise();
    } catch (error) {
      console.error('Error fetching items:', error);
      return [];
    }
  }

  async getItemById(id: number): Promise<Item | undefined> {
    try {
      const data = await fetch(`${this.getItemById}/${id}`)
      return await data.json() ?? {};
      // const url = `${this.apiUrl}/${id}`;
      // return await this.http.get<Item>(url).toPromise();
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);
      return {} as Item;
    }
  }

  async addItem(name: string): Promise<Item> {
    try {
      const response = await fetch(this.postItemUrl, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, isComplete: false })
      })
      return await response.json()
      // return await this.http.post<Item>(this.apiUrl, { description, done: false }).toPromise();
    } catch (error) {
      console.error('Error adding item:', error);
      return {} as Item;
    }
  }

  async updateItem(item: Item): Promise<Item> {
    try {
      const url = `${this.updateItemUrl}/${item.id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: item.name, isComplete: item.isComplete })
    });
    return await response.json();
      // const url = `${this.apiUrl}/${item.id}`;
      // return await this.http.put<Item>(url, item).toPromise();
    } catch (error) {
      console.error(`Error updating item with ID ${item.id}:`, error);
      return {} as Item;
    }
  }

  async removeItem(id: number): Promise<void> {
    try {
      const url = `${this.deleteItemUrl}/${id}`;
      await fetch(url, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
    }
  }
}
