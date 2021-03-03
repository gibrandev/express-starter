const { exec } = require('child_process');
describe('Our application', function() {
    it('Code quality check', function(done) {
        exec('npx jshint --verbose controllers middlewares models', (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                done(new Error(err));
                return;
            }
          
            done();
        });
    });
});