import * as Parse from 'parse';
import { ListModel } from './listModel';

//data model for single item
const NAME = 'ListElements';

export class ItemModel extends Parse.Object {
  constructor(params?: any) {
    super(NAME, params);
  }

  get content(): string {
    return this.get('content');
  }

  set content(content: string) {
    this.set('content', content);
  }

  get user(): Parse.User {
    return this.get('user');
  }

  set user(user: Parse.User) {
    this.set('user', user);
  }

  get type(): ListModel {
    return this.get('type');
  }

  set type(type: ListModel) {
    this.set('type', type);
  }

  static getAll() {
    const q = new Parse.Query(ItemModel);
    q.include('user');
    return q.find();
  }

  static getByType(typeObj: ListModel) {
    const q = new Parse.Query(ItemModel);
    q.include('user');
    q.equalTo('type', typeObj);
    return q.find();
  }

  static async createNew(type: ListModel, content: string) {
    const newList = new ItemModel();
    newList.type = type;
    newList.user = Parse.User.current();
    newList.content = content;
    await newList.save();
    return newList;
  }
}

Parse.Object.registerSubclass(NAME, ItemModel);
