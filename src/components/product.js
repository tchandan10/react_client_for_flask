import React, {Component} from 'react'
class Product extends React.Component {
  render() {
    return <div className="col-md-3 col-sm-6">
    <div className="product-grid3">
        <div className="product-image3">
        {this.props.category}
            <span className="product-new-label">New</span>
        </div>
        <div className="product-content">
            <h3 className="title"><a href="#">{this.props.model}</a></h3>
            <div className="price">
              {this.props.price}
                <span>{this.props.mrp}</span>
            </div>
            
        </div>
    </div>
</div>;
  }
}


export default Product