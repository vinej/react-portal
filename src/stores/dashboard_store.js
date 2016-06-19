import React, { Component } from 'react'
import { observable, action } from 'mobx'
import CrudStore from './crud_store';
import { tabbarStore } from './tabbar_store'
import { registerStore } from './register_store';
import { dashboardService } from '../services/dashboard_service'
import { dispatch } from '../helpers/dispatcher'
import { crudUpdate, crudAdd, crudDelete } from '../actions/crud_actions'
import { tabbarShow, tabbarSelect, tabbarClose } from '../actions/tabbar_actions'
import Dashboard from '../components/dashboard/dashboard'
import DashboardModel from '../models/dashboard_model'

// need to import all available widgets that can be included into a dashboard
import UsersWidget from '../components/widgets/users_widget'
import TodosWidget from '../components/widgets/todos_widget'
import AgGridWidget from '../components/widgets/aggrid_widget'

export default class DashboardStore extends CrudStore {
  constructor() {
    super();
    this.service = dashboardService;
    this.name = 'dashboard';
    this.refCount = 0
  }

  showAllUserDashboard() {
    console.log("show all")
    this.records.forEach( (dashboard, idx) => {
      if (dashboard.isHidden === false) {
        var component = <Dashboard title={ dashboard.title } id={ dashboard._id } />
        dispatch(tabbarShow(component, dashboard._id, dashboard.title, 'dashboard'))
      }
    })
  }

  showLastDashboard() {
    const dashboard = this.records[this.records.length - 1]
    var component = <Dashboard title={ dashboard.title } id={ dashboard._id } />
    dispatch(tabbarShow(component, dashboard._id, dashboard.title, 'dashboard'))
  }

  showDashboard(dashboardId) {
    const idx = this.records.findIndex( (r) => r._id === dashboardId );
    if (idx > -1) {
      const dashboard = this.records[idx]
      dashboard.isHidden = false
      dispatch(crudUpdate(this, dashboard))
      var component = <Dashboard title={ dashboard.title } id={ dashboard._id } />
      dispatch(tabbarShow(component, dashboard._id, dashboard.title, 'dashboard'))
    }
  }

  removeWidget(dashboardId, widgetId) {
    const idx = this.records.findIndex( (r) => r._id === dashboardId );
    const indexWidget = this.records[idx].widgets.findIndex( (r) => r.i === widgetId );
    this.records[idx].widgets.splice(indexWidget,1);
    dispatch(crudUpdate(this, this.records[idx]))
  }

  createWidget(name) {
    this.refCount = this.refCount - 1
    return {
      i: 'ref'+this.refCount, x: 0, y: 0, w: 4, h: 21, name: name
    }
  }

  addDashboard(dashboardName) {
    dispatch(crudAdd(this, DashboardModel.create(dashboardName)))
  }

  deleteDashboard() {
    const dashboardId = tabbarStore.getCurrentComponentId()
    const idx = this.records.findIndex( (r) => r._id === dashboardId )
    dispatch(crudDelete(this, this.records[idx]))
    dispatch(tabbarClose(dashboardId))
  }

  hideDashboard(dashboardId) {
    const idx = this.records.findIndex( (r) => r._id === dashboardId )
    if (idx > -1) {
      this.records[idx].isHidden = true
      dispatch(crudUpdate(this, this.records[idx]))
    }
  }

  renameDashboard(dashboardName) {
    const dashboardId = tabbarStore.getCurrentComponentId()
    const idx = this.records.findIndex( (r) => r._id === dashboardId )
    if (idx > -1) {
      this.records[idx].title = dashboardName;
      dispatch(crudUpdate(this, this.records[idx]))
    }
  }

  addWidget(widgetName) {
    const dashboardId = tabbarStore.getCurrentComponentId()
    const idx = this.records.findIndex( (r) => r._id === dashboardId )
    this.records[idx].widgets.push(this.createWidget(widgetName));
    dispatch(crudUpdate(this, this.records[idx]))
  }

  getDashboardTitle() {
    const dashboardId = tabbarStore.getCurrentComponentId()
    const idx = this.records.findIndex( (r) => r._id === dashboardId );
    return this.records[idx].title
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
    if (idx > -1) {
      var layouts = []
      if (this.records[idx].widgets) {
        this.records[idx].widgets.forEach( (w) =>  layouts.push( { i: w.i, x: w.x, y: w.y, w: w.w, h: w.h, name: w.name } ) )
      }
      return layouts
    } else {
      return []
    }
  }

  static getFormManageDimension() {
    return {
      width: '50%',
      height: '500px',
      left: '50%',
      top: '100px'
    }
  }
}
export let dashboardStore = new DashboardStore()


export function getWidgetComponent(name, dashboardId, widgetId) {
  switch (name) {
    case 'TodosWidget':
      return <TodosWidget dashboardId={ dashboardId } id={ widgetId } />
    case 'UsersWidget':
      return <UsersWidget dashboardId={ dashboardId } id={ widgetId } />
    case 'AgGridWidget':
      return <AgGridWidget dashboardId={ dashboardId } id={ widgetId } />
  }
}
