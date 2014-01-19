module.exports = async;

function async (tasks, cb) {
  
  if (!Array.isArray(tasks))
    throw new Error('Uncaught Error: first parameter must be a Array with the tasks to run!');

  if (typeof cb !== 'function')
    throw new Error('Uncaught Error: second parameter must be a callback!');

  // Async task
  function runTasks (fn, cb) {
    fn(function cb_fn (err, res) {
      cb(err, res);
    });
  }

  var results = [];

  function series (fn) {
    if (fn) {
      runTasks(fn, function cb_async (err, result) {
        results.push(result);
        return series(tasks.shift());
      });
    } else {
      return cb(null, results);
    }
  }

  series(tasks.shift());
}