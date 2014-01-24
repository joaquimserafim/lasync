var test = require('tape');

var lasync = require('../');

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
  return cb(null, 123);
}

lasync.series([
  function (cb) {
    test('lasync - series', function (t) {
      t.plan(1);

      lasync.series([a, b, c], function (err, results) {
        if (err) t.fail(err);
        t.ok(results, '"' + results.join(', ') + '"');
        cb();
      });

    });
  }, 
  function (cb) {
    test('lasync - parallel', function (t) {
      t.plan(1);

      setTimeout(function () {
        lasync.parallel([a, b, c], function (err, results) {
          if (err) t.fail(err);
          t.ok(results, '"' + results.join(', ') + '"');
          cb();
        });
      }, 1500);

    });
  },
  function (cb) {
    test('lasync - series with error', function (t) {
      t.plan(2);

      setTimeout(function () {
        lasync.series([
          function (callback) {
            return callback(null, 'ok');
          },
          function (callback) {
            // flow will end here
            return callback('this is a error!!!!');
          },
          function (callback) {
            return callback(null, 'will not execute');
          }
        ], function (err, results) {
          if (err) t.ok(err, err);

          t.equal(results, undefined, 'will return "undefined"');
          cb();
        });
      }, 1500);

    });
  }], 
  function (err, results) {
    //empty
});
