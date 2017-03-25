import runServerES6 from '../../tools/brench/run-server-es6';

module.exports = function(gulp, plugins) {
    return function(done) {
        let buildProcess=runServerES6();
        buildProcess
            .catch(err => {
                if (err.stack) {
                    console.error(err.stack.red);
                } else {
                    console.error(err.toString().red);
                }
                process.exit(1);
            });
    };
};
