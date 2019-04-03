import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { ListModel } from '../dataModels/listModel';
import { ItemModel } from '../dataModels/itemModel';
import { Utils } from '../utils';

interface IList {
  model: ListModel;
  editable: boolean;
  showToast: boolean;
  show: string;
}

@Component({
  selector: 'app-lists-container',
  templateUrl: './lists-container.component.html',
  styleUrls: ['./lists-container.component.scss']
})
export class ListsContainerComponent implements OnInit {
  currentDate = new Date();
  add = false;
  newElement = '';
  currentUser = null;

  items: IList[];

  constructor() {}

  async saveNew() {
    let model = await ListModel.createNew(this.newElement);

    this.items.push({
      model: model,
      editable: false,
      showToast: false,
      show: 'show'
    });

    this.add = false;
    this.newElement = '';
  }

  editType(item: IList) {
    item.model.save();
  }

  remove(item: IList) {
    item.model.destroy();
    this.items = this.items.filter(el => el.model.id !== item.model.id);
  }

  show(item: IList) {
    item.editable = !item.editable;
    if (item.editable) item.show = 'hide';
    else item.show = 'show';
  }

  async generate(item: IList) {
    let elements = await ItemModel.getByType(item.model);
    let elementsArr = elements.map(e => e.content);
    Utils.copyToClipboard(elementsArr.join(', '));

    item.showToast = true;

    setTimeout(() => {
      item.showToast = false;
    }, 1800);
  }

  async ngOnInit() {
    const lists = await ListModel.getAll();
    this.items = lists.map(model => {
      return { model, editable: false, showToast: false, show: 'show' };
    });

    this.currentUser = Parse.User.current().id;
  }
}
