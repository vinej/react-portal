import { observable, action } from 'mobx';

export default class PageStore {
  constructor() {
    this.key = -1 // key for new records
    this.name = 'need_to_be_set_by_extend_class';
    this.service = null;  // need to be set by the extend class
                          // it's use by the base action to know
                          // witch service to call
  }

  @observable page = [];
  @observable error = '';
  
  records = [];
  pageStart = 0;
  pageEnd = 10;
  pageSize = 10;

  @action
  setAll(records) {
    this.records = records;
    this.setCurrentPage();
  }

  @action
  add(record) {
    this.records.push(record);
    if (this.pageEnd < this.pageSize) {
      this.pageEnd = this.pageEnd + 1
    }
    this.setCurrentPage();
  }

  @action
  update(record) {
    const idx = this.records.findIndex( (r) => r._id === record._id );
    this.records[idx] = record;
    this.setCurrentPage();
  }

  @action
  delete(record) {
    const idx = this.records.findIndex( (r) => r._id === record._id );
    this.records.splice(idx,1);
    this.setCurrentPage();
  }

  setCurrentPage() {
    this.page = this.records.slice(this.pageStart,this.pageEnd);
  }

  @action
  nextPage() {
    if (this.pageEnd < this.records.length) {
        this.pageStart = this.pageStart + this.pageSize;
        this.pageEnd = this.pageEnd + this.pageSize;
        this.setCurrentPage();
    }
  }

  @action
  previousPage() {
    if (this.pageStart > 0) {
      this.pageStart = Math.max(this.pageStart - this.pageSize,0);
      this.pageEnd = Math.max(this.pageEnd - this.pageSize, this.pageStart + this.pageSize);
      this.setCurrentPage();
    }
  }

  @action
  firstPage() {
    if (this.pageStart > 0) {
      this.pageStart = 0;
      this.pageEnd = this.pageSize;
      this.setCurrentPage();
    }
  }

  @action
  lastPage() {
    if (this.pageEnd < this.records.length) {
      this.pageEnd = this.records.length;
      this.pageStart = this.pageEnd - this.pageSize;
      this.setCurrentPage();
    }
  }

  setError(error) {
    if (typeof error === 'object') {
      this.error = error["error"];
    } else {
      this.error = error;
    }
  }
}
