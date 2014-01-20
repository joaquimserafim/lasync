# lasync

An simple and tiny async library.



##Usage

####series

      var lasync = require('lasync');
    
      function a (cb) {
        setTimeout(function () {
          return cb(null);
        }, 3000);
      }
    
      function b (cb) {
        setTimeout(function () {
          return cb(null, 'Hello World');
        }, 2500);
      }
    
      function c (cb) {
        return cb(null, 1);
      }
      
      lasync.series([a, b, c], function (err, results) {
          if (err) throw err;
          console.log(results);
      });