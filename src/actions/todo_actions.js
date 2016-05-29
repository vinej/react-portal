export function todoEditForm(store,todo, omponent) {
  return  {
    type: t.TODO_EDIT_FORM,
    store: store,
    payload:  { todo, 
  };
}
