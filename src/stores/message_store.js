import { observable } from 'mobx';

export var messageStore = {
  @observable message : '',
  @observable error : ''
}