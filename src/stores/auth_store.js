import { observable } from 'mobx';

export var authStore = {
	@observable email : "",
	@observable name : "",
	@observable authenticated : false,
	@observable errorMessage : ''
}

export var authFormStore = {
	@observable email : "",
	@observable name : "",
	@observable password : "",
	@observable passwordConfirm : ""
}
