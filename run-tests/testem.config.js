const path = require('path');

module.exports = {
  browser_args: {
    Chrome: [
      '--auto-open-devtools-for-tabs'
    ]
  },
  cwd: path.join(`${__dirname}/..`),
  launch_in_dev: ['Chrome'],
  launch_in_ci: ['Chrome'],
  parallel: -1,
  serve_files: null, // set programatically 
  test_page: null, // set programatically
}
