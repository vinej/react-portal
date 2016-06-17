import React, { Component } from 'react'

class SearchTool extends Component {
  render() {
    return (
      <span id="asearchtool">
        <i className="fa fa-search search-tool"/>
        <input id="bsearchtool" placeholder="search what" type='text' className='search-after'/>
      </span>
    )
  }
}
export default SearchTool;
