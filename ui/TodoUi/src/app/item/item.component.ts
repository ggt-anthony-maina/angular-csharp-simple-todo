import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Item } from "../item";


@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="item">
  <input
    [id]="item.name"
    type="checkbox"
    (change)="item.isComplete = !item.isComplete"
    [checked]="item.isComplete" />
  <label [for]="item.name">{{item.name}}</label>

  <div class="btn-wrapper" *ngIf="!editable">
    <button class="btn" (click)="editable = !editable">Edit</button>
    <button class="btn btn-warn" (click)="remove.emit()">Delete</button>
  </div>

  <!-- This section shows only if user clicks Edit button -->
  <div *ngIf="editable">
    <input
      class="sm-text-input"
      placeholder="edit item"
      [value]="item.name"
      #editedItem
      (keyup.enter)="saveItem(editedItem.value)" />

    <div class="btn-wrapper">
      <button class="btn" (click)="editable = !editable">Cancel</button>
      <button class="btn btn-save" (click)="saveItem(editedItem.value)">
        Save
      </button>
    </div>
  </div>
</div>
  `,
  styleUrl: './item.component.css'
})
export class ItemComponent {
  editable = false;

  @Input() item!: Item;
  @Output() remove = new EventEmitter<Item>();

  saveItem(name: string) {
    if (!name) return;

    this.editable = false;
    this.item.name = name;
  }
}
