var test = require('tape');

var lasync = require('../');

function a (cb) {
  if (!cb || typeof cb !== 'function') cb = function () {};
  setTimeout(function () {
    return cb(null);
  }, 3000);
}

function b (cb) {
  if (!cb || typeof cb !== 'function') cb = function () {};
  setTimeout(function () {
    return cb(null, 'Hello World');
  }, 2500);
}

function c (cb) {
  if (!cb) cb = function () {};
  return cb(null, 1);
}

test('lasync - series', function (t) {
  t.plan(1);

  lasync.series([a, b, c], function (err, results) {
    if (err) t.fail(err);
    t.ok(results, '"' + results.join(', ') + '"');
  });
});

test('lasync - parallel', function (t) {
  t.plan(1);

  lasync.parallel([a, b, c], function (err, results) {
    if (err) t.fail(err);
    t.ok(results, '"' + results.join(', ') + '"');
  });
});