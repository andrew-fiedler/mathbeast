/*
  This fires up the application.
  It loads the router and calles the initialize method.
*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/appView'
], function($, _, Backbone,appView) {


    return {
        initialize: function() {
            var myApp = new appView()
        }
    };
});