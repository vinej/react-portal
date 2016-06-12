class WidgetStore {
    
    constructor() {
      this.records = [
        { _id: '12', name : "TodosWidget",  title : "Todos" },
        { _id: '22', name : "UsersWidget", title : "Users"},
        { _id: '32', name : "HelpsWidget", title : "Helps"}
      ]
    }

    getWidgets() {
      return this.records
    }
}
export let widgetStore = new WidgetStore()

