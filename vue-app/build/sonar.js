const config = require('../config');

var sonarqubeScanner = require('sonarqube-scanner');

  sonarqubeScanner({
    serverUrl : config.test.sonar.serverUrl,
    token : config.test.sonar.token,
    options : {
      "sonar.javascript.lcov.reportPaths":"test/unit/coverage/lcov.info",
		  "sonar.sources":"src/",
		  "sonar.tests":"test/",
      "sonar.exclusions":"src/locales/**, src/router/**, src/store/**, src/util/**, src/main.js"
    }
  }, function(args) {
  	console.log('args');
  });
