import * as t from '../types/todo_types';

export default function(state = {}, action) {

	if (!action.type.startsWith("todo_")) { return state; }

		// user use one store by widget
	const store = action.store;
	switch(action.type) {
		case t.TODO_ADD:
			store.add(action.payload);
			break;
		case t.TODO_DELETE:
			store.delete(action.payload);
			break;
		case t.TODO_UPDATE:
			store.update(action.payload);
			break;
		case t.TODO_NEXT_PAGE:
			store.nextPage();
			break;
		case t.TODO_PREVIOUS_PAGE:
			store.previousPage();
			break;
		case t.TODO_SET_ALL:
			store.setAll(action.payload);
			break;
		case t.TODO_VALIDATE:
			break;
	}
	return state;
}