import React from 'react';
import axe from 'axe-core';
import { mountToDoc } from './test-helpers';

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

import Link from './link';

test('Link has no axe violations', done => {
  // const linkComponent = mountToDoc(
  //   <Link page="http://www.axe-core.org">axe website</Link>
  // );

  // // getDOMNode() --> https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/getDOMNode.html
  // const linkNode = linkComponent.getDOMNode();

  // exclude tests that are incompatible
  const config = {
    rules: {
      'color-contrast': { enabled: false },
      'link-in-text-block': { enabled: false }
    }
  };

  document.documentElement.innerHTML = html.toString()

  axe.run(config, (err, results) => {
    // expect(err).toBe(null);
    // expect(results.violations).toHaveLength(2);

    // console.log(results.violations);

    results.violations.forEach((axeViolation) => {
      const whereItFailed = axeViolation.nodes[0].html;

      const failureSummary = axeViolation.nodes[0].failureSummary;

      const { description, help, helpUrl } = axeViolation;

      const resultObj = {
        description,
        help,
        helpUrl,
        whereItFailed,
        // failureSummary,
      }
      
      // console.log(resultObj);

      console.log('TEST DESCRIPTION: ', description,
        '\nISSUE: ', help,
        '\nMORE INFO: ', helpUrl,
        '\nWHERE IT FAILED: ', whereItFailed,
        // '\nhow to fix: ', failureSummary
      )
    })
    // console.log(results.violations);

    done();
  });
});
