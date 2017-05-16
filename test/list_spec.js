const path = require('path');
const fs = require('fs');
const should = require('should');
const checkExternalLinks = require('./utils/external-link-checker');

describe('Awesome list', function() {

    describe('links', function() {

        it('should all be valid', function(done) {
            // Each link will be tested over http which
            // can take quite a while.
            this.timeout(15000);

            const listPath = path.resolve(__dirname, '../readme.md');

            fs.readFile(listPath, 'utf8', function(err, markdown) {
                if (err) return done(err);

                checkExternalLinks(markdown, function(err, results) {
                    if (err) return done(err);
                    
                    results.forEach(function(result) {
                        result.statusCode.should.equal(200);
                        result.status.should.equal('alive');
                    });

                    done();
                });
            });
        });
    });
});