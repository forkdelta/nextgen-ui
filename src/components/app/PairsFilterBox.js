import React, { Component } from 'react';

class PairsFilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {filterText: ''};
    this.onStateChange = this.onStateChange.bind(this);
    this.onFilterChange = (e) => {this.onStateChange('filterText', e.target.value)};
    this.renderChildren = this.renderChildren.bind(this);
    this.getFilteredPairs = this.getFilteredPairs.bind(this);
  }

  onStateChange(key, value) {
    this.setState({[key]: value});
  }

  getFilteredPairs(pairs) {
    const ret = {};
    const filterText = this.state.filterText.toLowerCase();

    if(filterText.length === 0) return pairs;

    const pairKeys = Object.keys(pairs);
    pairKeys.forEach((key) => {
      const pair = pairs[key];

      if(pair.addr.toLowerCase().includes(filterText) || pair.name.toLowerCase().includes(filterText)) {
        ret[key] = pair;
      }
    });

    return ret;
  }

  renderChildren() {
    const filteredPairs = this.getFilteredPairs(this.props.pairs);

    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        pairs: filteredPairs
      });
    });
  }

  render() {
    return (
      <div>
        <input type="search" value={this.state.filterText} style={{width: '100%'}}
          placeholder="Filter by token (ETH) or contract address (0x0...)" onChange={this.onFilterChange}/>
        <div>
          {this.renderChildren()}
        </div>
      </div>
    );
  }
}

export default PairsFilterBox;
