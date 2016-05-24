class RegisterStore {
  constructor() {
    this.stores = [];
  }

  add( store ) {
    this.stores.push(store);
    return store;
  }

  remove( store ) {
    const idx = this.stores.findIndex( (s) => s ===  store);
    this.stores.splice(idx,1);
  }

  /**
   * Get all the store with the specific name
   * @param  {[type]} storeName [description]
   * @return {[type]}           [description]
   */
  getAll( storeName ) {
    return this.stores.filter( (store) =>  store.name === storeName);
  }
}
export let registerStore = new RegisterStore();