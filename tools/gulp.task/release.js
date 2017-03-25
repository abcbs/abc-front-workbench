import release from '../develop/release';

module.exports = function(gulp, plugins) {
    return function(done) {
        let buildProcess=release;
        buildProcess()
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
