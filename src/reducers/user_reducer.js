import * as t from '../types/user_types';

export default function(state = {}, action) {

	console.log(action.type);
	if (!action.type.startsWith("user_")) { return state; }

	// user use one store by widget
	const store = action.store;

	switch(action.type) {
		case t.USER_DELETE:
			store.delete(action.payload);
			break;
		case t.USER_PREVIOUS_PAGE:
			store.previousPage();
			break;
		case t.USER_NEXT_PAGE:
			store.nextPage();
			break;
		case t.USER_SET_ALL:
			store.setAll(action.payload);
			break;    
		case t.USER_ERROR:
			store.setError(action.payload);
			break;    
	}
	return state;
}
