import {gits} from '../../tools/brench';

module.exports = function(gulp, plugins) {
    return function(done) {
        gits();
    };
};
