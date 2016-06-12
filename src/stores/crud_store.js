import { observable, action } from 'mobx';

export default class CrudStore {
  constructor() {
    this.key = -1 // key for new records
    this.name = 'need_to_be_set_by_extend_class';
    this.service = null;  // need to be set by the extend class
                          // it's use by the base action to know
                          // witch service to call
  }

  @observable records = [];
  @observable error = '';

  @action
  setAll(records) {
    this.records = records;
  }

  @action
  add(record) {
    this.records.push(record);
  }

  @action
  update(record) {
    const idx = this.records.findIndex( (r) => r._id === record._id );
    this.records[idx] = record;
  }

  @action
  delete(record) {
    const idx = this.records.findIndex( (r) => r._id === record._id );
    this.records.splice(idx,1);
  }

  setError(error) {
    if (typeof error === 'object') {
      this.error = error["error"];
    } else {
      this.error = error;
    }
  }
}
