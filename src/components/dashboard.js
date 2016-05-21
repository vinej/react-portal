import React, { Component } from 'react';
import ReactGridLayout from 'react-grid-layout';
import Users from './users';
import Widget from './widget';

class Dashboard extends Component {

	render() {
		var layout = [
    	  	{i: 'a', x: 0, y: 0, w: 7, h: 21},
    	  	{i: 'b', x: 1, y: 0, w: 3, h: 3},
      		{i: 'c', x: 4, y: 0, w: 2, h: 2}
	    ];

		return (
			<ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={20} width={1400}>
        		<div key={'a'} className="widget">
              <Widget title="Users" onRefresh={ () => alert('refresh 3') }>
                <Users />
              </Widget>
            </div>
        		<div key={'b'} className="widget">
              <Widget  title="Test2">
                <div >b</div>
              </Widget>
              </div>
        		<div key={'c'} className="widget">
              <Widget  title="test3">
              </Widget>
              </div>
      		</ReactGridLayout>
      	);
	}
}
export default Dashboard;