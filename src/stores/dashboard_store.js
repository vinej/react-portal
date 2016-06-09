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
      var component = <Dashboard title={ dashboard.title } id={ dashboard._id } />
      dispatch(tabbarShow(component, dashboard.title))
    })
  }

  removeWidget(dashboardId, widgetId) {
    const idx = this.records.findIndex( (r) => r._id === dashboardId );
    const indexWidget = this.records[idx].widgets.findIndex( (r) => r._id === widgetId );
    this.records[idx].widgets.splice(indexWidget,1);
    dispatch(crudUpdate(this, this.records[idx]))
  }

  getDashboard(dashboardId) {
    const idx = this.records.findIndex( (r) => r._id === dashboardId );
    return this.records[idx]
  }

  getWidgets(dashboardId) {
    const idx = this.records.findIndex( (r) => r._id === dashboardId );
    return this.records[idx].widgets
  }

  getWidgetsLayout(dashboardId) {
    const idx = this.records.findIndex( (r) => r._id === dashboardId );
    var layout = []
    this.records[idx].widgets.forEach( (w) =>  layout.push( { _id:w._id, i: w.i, x: w.x, y: w.y, w: w.w, h: w.h, name: w.name } ) )
    return layout
  }
}
export let dashboardStore = new DashboardStore()
