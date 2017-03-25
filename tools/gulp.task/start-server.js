import {startServer} from '../../tools/brench';

module.exports = function(gulp, plugins) {
    return function(done) {
        let buildProcess=startServer();
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
