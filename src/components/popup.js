import React, { Component } from 'react';
import { observer } from "mobx-react";;
import { Link } from 'react-router';
import { popupStore } from '../stores/popup_store';

@observer
class Popup extends Component {

  constructor() {
    super()
    this.id = 'rp-popup-dragme'+popupStore.getStores().length.toString()
    this.state = { mousex : window.innerWidth / 2, mousey: 100 }
    this.move = false
    this.mousex = 0
    this.mousey = 0
    this.mousedown = this.mousedown.bind(this)
    this.mouseup = this.mouseup.bind(this)
    this.mousemove = this.mousemove.bind(this)
    this.init = this.init.bind(this)
  }

  init() { 
    var d = document.getElementById(this.id);
    d.onmousedown = this.mousedown; 
    d.onmouseup = this.mouseup;
    d.onmousemove = this.mousemove; 
  }

  isMouseCoordinateInsideHeader(e) {
    var targ; 
    if (!e) var e = window.event; 
    if (e.target) targ = e.target; 
    else if (e.srcElement) targ = e.srcElement; 
    if (targ.nodeType == 3) {// defeat Safari bug 
      targ = targ.parentNode;
    }
    return targ.className.includes('rp-popup-header')
  }

  mousedown(e) {
    if (!e) var e = window.event;

    if (!this.isMouseCoordinateInsideHeader(e)) { return }

    document.getElementById(this.id).style.color = 'red';
    this.move = true;
    this.mousex = e.clientX;
    this.mousey = e.clientY;
  }

  mouseup(e) {
    if (this.move) {
      if (!e) var e = window.event;
      document.getElementById(this.id).style.color = 'black';
      this.move = false;
    }
  }

  mousemove(e) { 
    if (this.move) {   
      if (!e) var e = window.event;
      this.ldivx = parseInt(this.ldivx) + parseInt(e.clientX) - parseInt(this.mousex); 
      this.ldivy = parseInt(this.ldivy) + parseInt(e.clientY) - parseInt(this.mousey);  
      this.mousex = e.clientX;
      this.mousey = e.clientY;
      var d = document.getElementById(this.id);    
      d.style.left = parseInt(this.ldivx) + 'px';   
      d.style.top = parseInt(this.ldivy) + 'px';
      this.setState=( { mousex: this.mousex, mousey: this.mousey } )
    }
  }

  componentDidMount() {
    this.init()
    this.ldivx = this.state.mousex
    this.ldivy= this.state.mousey
  }

  render() {
    return (
      <div className="rp-popup-behind" style={{ height: window.innerHeight - 80 }} >
        <div id={this.id} className="rp-popup" style={ { 
          display : this.props.store.display, 
          left : this.state.mousex,
          top : this.state.mousey } }>
          {this.props.children}
        </div>
      </div>
    )
  }
}
export default Popup;
