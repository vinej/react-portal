import React, { Component } from 'react'
import CrudStore from './crud_store';
import { registerStore } from './register_store';
import { dashboardService } from '../services/dashboard_service'
import { dispatch } from '../helpers/dispatcher'
import { crudUpdate } from '../actions/crud_actions'
import { tabbarShow } from '../actions/tabbar_actions'
import Dashboard from '../components/dashboard/dashboard'

class DashboardStore extends CrudStore {
  constructor() {
    super();
    this.service = dashboardService;
    this.name = 'dashboard';
  }

  showAllUserDashboard() {
    this.records.forEach( (dashboard, idx) => {
      var component = <Dashboard name={ dashboard.title } idx={ idx } />
      dispatch(tabbarShow(component, dashboard.title))
    })

    // only to test many dashboards with the same widget, to be sure that
    // every component are independant
    console.log("dashboard 2")
    this.records.forEach( (dashboard, idx) => {
      var component = <Dashboard name={ dashboard.title } idx={ idx } />
      dispatch(tabbarShow(component, dashboard.title + "2"))
    })

    console.log("dashboard 3")
    this.records.forEach( (dashboard, idx) => {
      var component = <Dashboard name={ dashboard.title } idx={ idx } />
      dispatch(tabbarShow(component, dashboard.title + "3"))
    })

    console.log("dashboard 4")
    this.records.forEach( (dashboard, idx) => {
      var component = <Dashboard name={ dashboard.title + "4" } idx={ idx } />
      dispatch(tabbarShow(component, dashboard.title))
    })
  }

  removeWidget(idx, widget) {
    const indexWidget = this.records[idx].widgets.findIndex( (r) => r._id === widget._id );
    this.records[idx].widgets.splice(indexWidget,1);
    dispatch(crudUpdate(this))
  }

  getDashboard(idx) {
    return this.records[idx]
  }

  getWidgets(idx) {
    return this.records[idx].widgets
  }

  getWidgetsLayout(idx) {
    var layout = []
    this.records[idx].widgets.forEach( (w) =>  layout.push( { _id:w._id, i: w.i, x: w.x, y: w.y, w: w.w, h: w.h, name: w.name } ) )
    return layout
  }
}
export let dashboardStore = new DashboardStore()
