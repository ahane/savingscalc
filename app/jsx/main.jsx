/** @jsx React.DOM */
/*jshint indent: 2, node: true, nomen: true, browser: true*/
/*global React */
'use strict';

var products;
var app = require('./app.jsx');
var productRequest = $.getJSON('./data/prod_data.json', function( data ) {
  //console.log( "success" );
  products = data.products;
  })
  .done(function() {
        React.renderComponent(
	  	/* jshint ignore:start */
	  	<app products={products}/>,
	  	document.getElementById('app')
	  	/* jshint ignore:end */
		);
  })
  .fail(function() {
    console.log( "error loading JSON" );
  })
  .always(function() {

  });
