import { observable } from 'mobx';

export default class BaseStore {
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

  setAll(records) {
    this.records = records;
    this.setCurrentPage();
  }

  add(record) {
    this.records.push(record);
    if (this.pageEnd < this.pageSize) {
      this.pageEnd = this.pageEnd + 1
    }
    this.setCurrentPage();
  }

  update(record) {
    const idx = this.records.findIndex( (r) => r._id === record._id );
    this.records[idx] = record;
    this.setCurrentPage();
  }

  delete(record) {
    const idx = this.records.findIndex( (r) => r._id === record._id );
    this.records.splice(idx,1);
    this.setCurrentPage();
  }

  setCurrentPage() {
    this.page = this.records.slice(this.pageStart,this.pageEnd);
  }

  nextPage() {
    if (this.pageEnd < this.records.length - 1) {
        this.pageStart = this.pageStart + this.pageSize;
        this.pageEnd = this.pageEnd + this.pageSize;
        this.setCurrentPage();
    }
  }

  previousPage() {
    if (this.pageStart > 0) {
      this.pageStart = Math.max(this.pageStart - this.pageSize,0);
      this.pageEnd = Math.max(this.pageEnd - this.pageSize, this.pageStart + this.pageSize);
      this.setCurrentPage();
    }
  }

  firstPage() {
    if (this.pageStart > 0) {
      this.pageStart = 0;
      this.pageEnd = this.pageSize;
      this.setCurrentPage();
    }
  }

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
