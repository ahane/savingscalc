/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */

'use strict';
module.exports = React.createClass({
  
  getInitialState: function () {
    var products = this.props.products;
    products.forEach((function (p){
      p.count = 0;
    }));

    return({"products": products});
  },

  addProductCount: function (p, c) {
    //the passed p is an element of products, so we simply "refresh" the state
    p.count = parseInt(p.count) + parseInt(c);
    this.setState({"products": this.state.products});
  },

  resetProductCount: function (p) {
    p.count = 0
    this.setState({"products": this.state.products});
  },

  render: function () {
	return (
      /* jshint ignore:start */
      <div>
        
        <p className="lead">Bindenrechner</p>
        <ProductInput products={this.props.products} handleInput={this.addProductCount} />
        <SelectedProductsList selectedProducts={this.state.products} deleteItem={this.resetProductCount}/>
        <OutputArea />
      </div>
      /* jshint ignore:end */
	);
  }
});

var OutputArea = React.createClass({
  render: function () {
    return (
      /* jshint ignore: start */
      <div>
        <YearCountInput />
        <OutputField field="Müll" />
        <OutputField field="Geld" />
        <OutputField field="KLM Binden" />
      </div>
      /* jshint ignore: end */
    );
  }
});
var YearCountInput = React.createClass({
  render: function () {
    return (
      /* jshint ignore: start */
      <div>
        In
        <input type="number" min="0" />
        Jahren hätten sie gespaart:
      </div>
      /* jshint ignore: end */
    );
  }
});

var OutputField = React.createClass({
  render: function () {
    return (
      /* jshint ignore: start */
      <span>{this.props.field}</span>
      /* jshint ignore: end */
    );
  }
})



var SelectedProductsList = React.createClass({
  render: function () {
    var selectedProducts = this.props.selectedProducts.filter(function (p) {return (parseInt(p.count) > 0) });
    var handleDelete = this.props.deleteItem;
    return (
      /* jshint ignore:start */
      <ul className="list-group">
      {selectedProducts.map(
        function (p){
          return (<SelectedProduct product={p} handleDelete={handleDelete}/>);
        }
      )}
      </ul>
      /* jshint ignore:end */
      );
  }
});

var SelectedProduct = React.createClass({
  deleteThis: function () {
    var product = this.props.product;
    this.props.handleDelete(product);
  },
  render: function () {
    var product = this.props.product;
    var handleDelete = this.props.handleDelete;
    return (
      /* jshint ignore:start */
      <li className="list-group-item">{product.count} - {product.name} <ProductDeleteButton deleteThis={this.deleteThis}/></li>
      /* jshint ignore:end */
    );
  }
});

var ProductDeleteButton = React.createClass({
  render: function () {
    var deleteThis = this.props.deleteThis;
    return (
      /* jshint ignore:start */
      <span onClick={deleteThis}>X</span>
      /* jshint ignore:end */
    );
  }
});

var ProductInput = React.createClass({
  getInitialState: function () {
    return ({"count": 0, "current": this.props.products[0]});
  },

  setCurrentProduct: function (p) {
    this.setState({"count": this.state.count, "current": p});
  }, 

  setCount: function (c) {
    this.setState({"count": c, "current": this.state.current});
  },

  addToSelected: function () {
    this.props.handleInput(this.state.current, this.state.count);
  },

  render: function () {
    return (
        /* jshint ignore:start */
        <div>
        <CountInputField value={this.state.count} handleChange={this.setCount} />
        <ProductSelector products={this.props.products} current={this.state.current} handleChange={this.setCurrentProduct}/>
        <AddProductButton handleClick={this.addToSelected}/>
        </div>
        
        /* jshint ignore:end */
        );
  }
});

var ProductOption = React.createClass({
  //one option of the product choice dropdown menu
  setCurrentToThis: function () {
    this.props.handleChange(this.props.product);
  },
  render: function () {
    var product = this.props.product;
    return (
      /* jshint ignore:start */
      <li className="btn" onClick={this.setCurrentToThis}>{product.name}</li>
      /* jshint ignore:end */
    );
  }
});

var ProductSelector = React.createClass({
  //a dropdownmenu for chosing one product

  render: function () {
    var products = this.props.products;
    var current = this.props.current;
    var handleChange = this.props.handleChange;
    return (
      /* jshint ignore:start */
        <div className="btn-group">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
          {current.name}
        <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" role="menu">
          {products.map(function (p) {
            return ( <ProductOption product={p} handleChange={handleChange}/> );
          })}
        </ul>
      </div>
      /* jshint ignore:end */
    );
  }
});

var CountInputField = React.createClass({
  //the input field for entering the number to add of the current product
  changeCount: function () {
    //var value = this.props.value;
    var value = this.refs.countInput.getDOMNode().value;
    this.props.handleChange(value);
  },
  render: function () {
    var value = this.props.value;

    return (
      /* jshint ignore:start */
        
          <input
          type="number"
          min="0"
          value = {value}
          ref ="countInput"
          onChange = {this.changeCount}
          className="" />
        
        
      /* jshint ignore:end */
    );
  }
});

var AddProductButton = React.createClass({
  //adds the current selection to the productlist
  handleClick: function () {
    console.log('hoo');
    this.props.handleClick();
  },
  render: function () {

    return (
      /* jshint ignore:start */
      <button 
        type="button"
        className="btn"
        onClick={this.handleClick}
        >
        <span className="glyphicon glyphicon-plus"></span>
      </button>
      /* jshint ignore:end */
    );
  }
});
