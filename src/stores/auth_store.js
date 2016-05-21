import { observable } from 'mobx';

export var authStore = {
	@observable email : "",
	@observable name : "",
	@observable authenticated : false,
	@observable errorMessage : '',
	@observable message : ''
}

export var authFormStore = {
	@observable email : "",
	@observable name : "",
	@observable password : "",
	@observable passwordConfirm : "",

	@observable emailError : "",
	@observable nameError : "",
	@observable passwordError : "",
	@observable passwordConformError : ""
}
