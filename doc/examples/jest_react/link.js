import React from 'react';

export default class Link extends React.Component {
  render() {
    return (
    
    // <a href={this.props.page || '#'}>{this.props.children}</a>;
    
    <div>
        <h1> Hello World</h1>
        <h1> This should be an error </h1>
        <input type="text"></input>
        {/* // I find this next idea very IMGtimidating */}
        <img src="https://www.cesarsway.com/wp-content/uploads/2015/06/puppy-checklist.png" alt=""></img>
        <button className="gabi"></button>
        <div>this is a div</div>
    </div>
    
    )
  }
}
