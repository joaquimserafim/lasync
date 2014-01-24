# lasync

An simple and tiny async library.

<a href="https://nodei.co/npm/lasync/"><img src="https://nodei.co/npm/lasync.png"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/lasync.png?branch=master)](https://travis-ci.org/joaquimserafim/lasync)

##Usage

####series

	lasync.series([array of functions], callback(err, results))
    
    // results is an array
      
      // CODE
      
      var lasync = require('lasync');
    
      function a (cb) {
        console.log('run function "a"');
        setTimeout(function () {
          return cb(null);
        }, 3000);
      }
    
      function b (cb) {
        console.log('run function "b"');
        setTimeout(function () {
          return cb(null, 'Hello World');
        }, 2500);
      }
    
      function c (cb) {
        console.log('run function "c"');
        return cb(null, 1);
      }
      
      lasync.series([a, b, c], function (err, results) {
          if (err) throw err;
          console.log(results);
      });
      

####parallel

	lasync.parallel([array of functions], callback(err, results))
    
    // results is an array
    
    
    // CODE

    var lasync = require('lasync');
    
    
    // the same functions for example
    function a (cb) {
    	console.log('run function "a"');
        setTimeout(function () {
          return cb(null);
        }, 3000);
    }
    
    function b (cb) {
        console.log('run function "b"');
        setTimeout(function () {
          return cb(null, 'Hello World');
        }, 2500);
    }
    
    function c (cb) {
        console.log('run function "c"');
        return cb(null, 1);
    }
    
    lasync.parallel([a, b, c], function (err, results) {
      if (err) throw err;
      console.log(results);
    });