const regeneratorRuntime = require('regenerator-runtime');
import axe from 'axe-core';

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

describe('Evaluate axe-core violations', () => {
  it('html file has no axe violations', done => {
    // exclude tests that are incompatible
    const config = {
      rules: {
        'color-contrast': { enabled: false },
        'link-in-text-block': { enabled: false }
      }
    };

    document.documentElement.lang = 'en';
    document.documentElement.innerHTML = html.toString();

    axe.run(config, async (err, { violations }) => {
      if (err) console.log('err: ', err);

      if (violations.length === 0) {
        console.log(
          'Congrats! Keep up the good work, you have 0 known violations!'
        );
      } else {
        violations.forEach(axeViolation => {
          console.log('-------');
          const whereItFailed = axeViolation.nodes[0].html;
          // const failureSummary = axeViolation.nodes[0].failureSummary;

          const { description, help, helpUrl } = axeViolation;

          console.log(
            'TEST DESCRIPTION: ',
            description,
            '\nISSUE: ',
            help,
            '\nMORE INFO: ',
            helpUrl,
            '\nWHERE IT FAILED: ',
            whereItFailed
            // '\nhow to fix: ', failureSummary
          );
        });
      }

      expect(err).toBe(null);
      expect(violations).toHaveLength(0);
      done();
    });
  });
});
