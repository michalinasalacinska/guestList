import * as Parse from 'parse';
import { ItemModel } from './itemModel';
//data model for lists
const NAME = 'Lists';

export class ListModel extends Parse.Object {

  constructor(params?: any) {
    super(NAME, params);
  }

  get type(): string {
    return this.get('type')
  }

  set type(type: string) {
    this.set('type', type)
  }

  get user(): Parse.User {
    return this.get('user')
  }

  set user(user: Parse.User) {
    this.set('user', user)
  }

  static getAll() {
      const q = new Parse.Query(ListModel);
      return q.find();
  }

  static async createNew(type: string) {
    const newList = new ListModel();
    newList.type = type;
    newList.user = Parse.User.current();
    await newList.save();
    return newList;
  }

}

Parse.Object.registerSubclass(NAME, ListModel);