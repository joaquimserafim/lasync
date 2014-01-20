# lasync

An simple and tiny async library.



##Usage

####series

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
      
      lasync.parallel([a, b, c], function (err, results) {
          if (err) throw err;
          console.log(results);
      });