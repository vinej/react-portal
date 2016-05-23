import { observable } from 'mobx';

export default class CrudStore {
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
		records.unshit();
    this.setCurrentPage();
	}

	update(record) {
    const idx = this.records.findIndex( (r) => r._id === record._id );
    this.records[idx] = record;
    this.setCurrentPage();

		//for(var i = 0; i < records.length; i++) {
		//	if (records[i]._id == record._id) {
    //    records[i] = record;
    //    break; //Stop this loop, we found it!
    // }
	}

	delete(record) {
    const idx = this.records.findIndex( (r) => r._id === record._id );
    this.records.splice(idx,1);
    this.setCurrentPage();

		//for(var i = 0; i < records.length; i++) {
    // if (records[i]._id == record._id) {
    //    records.splice(i,1);
    //    this.setCurrentPage();
    //    break; //Stop this loop, we found it!
    // }
	}

	setCurrentPage() {
		this.page = this.records.slice(this.pageStart,this.pageEnd);
		console.log(this.page);
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
