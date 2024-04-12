import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item/item.component';
import { ItemService } from './item.service';
import { Item } from './item';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  CommonModule, ItemComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ui';
  componentTitle = "My To Do List ";
  items: Item[] = [];
  filter: "all" | "active" | "done" = "all";

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadItems();
  }

  async loadItems() {
    this.items = await this.itemService.getAllItems();
  }

  async addItem(name: string) {
    await this.itemService.addItem(name);
    this.loadItems(); // Refresh the items list
  }

  async remove(item: Item) {
    await this.itemService.removeItem(item.id);
    this.loadItems(); // Refresh the items list
  }
}