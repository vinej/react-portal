import React, { Component } from 'react'

class SearchTool extends Component {
  render() {
    return (
      <span id="asearchtool">
        <i className="fa fa-search rp-search-tool"/>
        <input id="bsearchtool" placeholder="search what" type='text' className='rp-search-after'/>
      </span>
    )
  }
}
export default SearchTool;
