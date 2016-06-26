import React, { Component } from 'react';
import { FormattedDate, FormattedRelative } from 'react-intl'

class Footer extends Component {
  constructor() {
    super()
  }

  render() {
    const now = (new Date()).getTime() 
    return (
      <div>
        <div className="kna-grid-2 rp-footer">
          <div> 
            <span style={{ float: 'left'}}>React Portal version 0.6</span>
          </div>
          <div>
            <span style={{ float: 'right'}}> : <FormattedRelative value={now}/></span>
            <span style={{ float: 'right'}}>&nbsp;&nbsp;</span>
            <span style={{ float: 'right'}}><FormattedDate value={now}/></span>
          </div>
        </div>
      </div>
    );
  }
}
export default Footer;
