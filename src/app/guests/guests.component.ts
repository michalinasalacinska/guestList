import { Component, OnInit, Input } from '@angular/core';
import { ItemModel } from '../dataModels/itemModel';
import { ListModel } from '../dataModels/listModel';

interface IItemElement {
  model: ItemModel;
  editable: boolean;
  hover: boolean;
}

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {
  @Input() typeObj: ListModel;

  items: IItemElement[] = [];

  add = false;
  newElement = '';
  currentDate = new Date();

  constructor() {}

  remove(item: IItemElement) {
    item.model.destroy();
    this.items = this.items.filter(el => el.model.id !== item.model.id);
  }

  save(item: IItemElement) {
    item.model.save();
    setTimeout(() => (item.editable = false));
  }

  editType(item: IItemElement) {
    item.model.save();
  }

  editable(item: IItemElement, e: KeyboardEvent) {
    if (e.keyCode === 13) return;
    item.editable = true;
  }

  uneditable(item: IItemElement) {
    setTimeout(() => {
      item.editable = false;
    }, 400);
  }

  async saveNew() {
    let arr = this.newElement.split(', ');

    for (let e of arr) {
      const found = this.items.find(el => el.model.content === e);
      if (found) continue;
      let model = await ItemModel.createNew(this.typeObj, e);
      this.items.push({ model, editable: false, hover: false });
    }

    this.add = false;
    this.newElement = '';
  }

  cancelNew() {
    this.add = false;
    this.newElement = '';
  }

  async ngOnInit() {
    const elements = await ItemModel.getByType(this.typeObj);
    this.items = elements
      .map(model => {
        return { model, editable: false, hover: false };
      })
      .sort((a, b) => {
        return a.model.content.localeCompare(b.model.content);
      });
  }
}
