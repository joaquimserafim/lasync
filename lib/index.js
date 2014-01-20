

module.exports.series = series;

function series (tasks, done) {
  if (!Array.isArray(tasks))
    throw new Error('Uncaught Error: first parameter must be a Array with the tasks to run!');

  if (typeof done !== 'function')
    throw new Error('Uncaught Error: second parameter must be a callback!');

  var results = [];

  // Async task
  function runTasks (fn, cb) {
    fn(function cb_fn (err, res) {
      cb(err, res);
    });
  }

  // run tasks
  function run (fn) {
    if (fn) {
      runTasks(fn, function cb_async (err, result) {
        results.push(result);
        return run(tasks.shift());
      });
    } else {
      return done(null, results);
    }
  }

  run(tasks.shift());
}


module.exports.parallel = parallel;

function parallel (tasks, done) {
  if (!Array.isArray(tasks))
    throw new Error('Uncaught Error: first parameter must be a Array with the tasks to run!');

  if (typeof done !== 'function')
    throw new Error('Uncaught Error: second parameter must be a callback!');

  var results = [];

  function runTasks (fn, cb) {
    fn(function cb_fn (err, res) {
      cb(err, res);
    });
  }

  tasks.forEach(function (task) {
    runTasks(task, function (err, result) {
      results.push(result);
      if (tasks.length === results.length) return done(null, results);
    });
  });
}