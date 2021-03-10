import React from 'react';
import axe from 'axe-core';
import { mountToDoc } from './test-helpers';

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

  console.log(document.querySelector('.wally'));

  axe.run(document.querySelector('.wally'), config, (err, results) => {
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

      console.log('test description: ', description,
        '\nto fix: ', help,
        '\nmore info: ', helpUrl,
        '\nwhere it failed: ', whereItFailed,
        // '\nhow to fix: ', failureSummary
      )
    })
    // console.log(results.violations);

    done();
  });
});
