"use strict";

var discrepances = require('discrepances');
var someone = require('../someone.js');
someone.bindToPrototypeIn(Array);

describe("simple", function(){
    [
        {array: [0,2,4], fun: function(x){ return x; }, expect: 2},
        {array: [0,false,null], fun: function(x){ return x; }, expect: false},
    ].forEach(function(fixture){
        it("fixture: "+fixture.array, function(){
            discrepances.showAndThrow(fixture.array.someone(fixture.fun), fixture.expect);
        });
    });
});

describe("multiargs", function(){
    [
        {this:null, args: [function(x){ return x; }], expect: TypeError("Array.prototype.someone called on null or undefined")},
        {this:['no fun'], args: [], expect: TypeError()},
        {this:['a', 'b', 'c'], args: [function(x){ return this[x];}, {c:42}], expect: 42},
    ].forEach(function(fixture){
        it("fixture: "+fixture.this, function(){
            var obt;
            try{
                obt=Array.prototype.someone.apply(fixture.this, fixture.args);
            }catch(err){
                obt=err;
            }
            discrepances.showAndThrow(obt, fixture.expect);
        });
    });
});

describe("install", function(){
    it("detects no error", function(){
        try{
            Someone.bindToPrototypeIn();
            throw new Error("expect to throw error");
        }catch(err){
            console.log('ok');
        }
    });
});