const regeneratorRuntime = require("regenerator-runtime");
import axe from 'axe-core';

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

// describe('Run axe-core accessibility tests', () => {

  test('html file has no axe violations', (done) => {
  
    // exclude tests that are incompatible
    const config = {    
      rules: {
        'color-contrast': { enabled: false },
        'link-in-text-block': { enabled: false }
      }
    };
  
    document.documentElement.innerHTML = html.toString();
    // [x] prints out the following
    console.log(document.documentElement.innerHTML);
    // jest.setTimeout(50000)
  
    axe.run(config, async (err, { violations }) => {
      // if (err) console.log(err);
      // [x] prints out the following
      console.log('violations.length:', violations.length, 'err: ', err);
      console.log('-----------------------------------------------------line31-----------------------------------------------');
      expect(err).toBe(null);
      expect(violations).toHaveLength(0);
      console.log('-----------------------------------------------------line34-----------------------------------------------');
      done();
      // expect(1).toEqual(2);
  
      // console.log(results.violations);
      // results.violations.forEach((axeViolation) => {
      //   console.log('-----------------------------------------------------line36-----------------------------------------------');
      //   const whereItFailed = axeViolation.nodes[0].html;
  
      //   // [x] prints out the following
      //   const failureSummary = axeViolation.nodes[0].failureSummary;
  
      //   const { description, help, helpUrl } = axeViolation;
  
      //   const resultObj = {
      //     description,
      //     help,
      //     helpUrl,
      //     whereItFailed,
      //     // failureSummary,
      //   }
        
      //   // console.log(resultObj);
  
      //   console.log('TEST DESCRIPTION: ', description,
      //     '\nISSUE: ', help,
      //     '\nMORE INFO: ', helpUrl,
      //     '\nWHERE IT FAILED: ', whereItFailed,
      //     // '\nhow to fix: ', failureSummary
      //   )
      // })
      // console.log(results.violations);
      
    });
  });
  

// })



