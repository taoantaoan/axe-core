import * as axe from '../../axe';

var context: any = document;
var $fixture = [document];
var options = { iframes: false, selectors: false, elementRef: false };

axe.run(context, {}, (error: Error, results: axe.AxeResults) => {
  if (error) {
    console.log(error);
  }
  console.log(results.passes.length);
  console.log(results.incomplete.length);
  console.log(results.inapplicable.length);
  console.log(results.violations.length);
  console.log(results.violations[0].nodes[0].failureSummary);
});
axe.run().then(function (done: any) {
  done();
});
// additional configuration options
axe.run(context, options, (error: Error, results: axe.AxeResults) => {
  console.log(error || results.passes.length);
});
// axe.run include/exclude
axe.run(
  { include: [['#id1'], ['#id2']] },
  {},
  (error: Error, results: axe.AxeResults) => {
    console.log(error || results);
  }
);
export async function runAsync() {
  await axe.run('main'); // Single selector
  await axe.run(['main']); // Array of one selector
  await axe.run([['main']]); // Selecting in the outer frame
  // @ts-expect-error // Shadow DOM selectors must be at least 2 items long
  await axe.run([[['main']]]);
  await axe.run([[['#app', 'main']]]); // Selecting in the outer frame

  await axe.run(document.querySelector('main'));
  await axe.run(document.querySelectorAll('main'));
  // axe.run with frameContext context
  await axe.run({ fromShadowDom: ['#app', '#main', '#inner'] });
  // @ts-expect-error // Must be two long:
  await axe.run({ fromShadowDom: ['#app'] });
  // @ts-expect-error // Must be two long:
  await axe.run({ fromFrames: ['#app'] });
  // axe.run with fromFrames context
  await axe.run({
    fromFrames: ['#frame', { fromShadowDom: ['#app', '#main'] }]
  });
  // Mixed type array
  await axe.run([
    'main',
    document.head,
    { fromShadowDom: ['#app', '#header', '#search'] },
    { fromFrames: ['#frame', '#main'] }
  ]);
  // Combined fromFrames & fromContext
  await axe.run({
    include: { fromShadowDom: ['#frame', '#main'] },
    exclude: [
      'footer',
      document.head,
      { fromFrames: ['#frame', { fromShadowDom: ['#app', '#main'] }] }
    ]
  });
}

let ctxt: axe.ContextObject;
// @ts-expect-error
ctxt = {};
ctxt = { exclude: ['foo'] };
ctxt.include = ['bard'];
ctxt = { include: ['foo'] };
ctxt.exclude = ['bar'];

let serialContext: axe.SerialContextObject;
// @ts-expect-error
serialContext = {};
serialContext = { exclude: ['foo'] };
serialContext.include = ['bard'];
serialContext = { include: ['foo'] };
serialContext.exclude = ['bar'];

axe.run(
  { exclude: [$fixture[0]] },
  {},
  (error: Error, results: axe.AxeResults) => {
    console.log(error || results);
  }
);

export async function frameContextTypes() {
  let { frameContext, frameSelector } = axe.utils.getFrameContexts()[0];
  await axe.run(frameContext);
  await axe.runPartial(frameContext, {});
  axe.utils.shadowSelect(frameSelector);
}

export async function serialContextType() {
  // @ts-expect-error
  const exclude: axe.SerialSelector = document.body;
  // @ts-expect-error
  const include: axe.SerialSelectorList = [document.body];

  let serialContext: axe.SerialContextObject;
  // @ts-expect-error
  serialContext = {}; // At lease one of the props is required
  serialContext = { include, exclude };
  serialContext = { include };
  serialContext = { exclude };
  await axe.runPartial(serialContext, {});
}

export async function customReporters() {
  type MyReport = { issues: any[] };
  let report: MyReport;

  report = await axe.run<MyReport>();
  report = await axe.run<MyReport>(document);
  report = await axe.run<MyReport>({});
  report = await axe.run<MyReport>(document, {});
  axe.run<MyReport>((_, results) => (report = results));
  axe.run<MyReport>(document, (_, results) => (report = results));
  axe.run<MyReport>({}, (_, results) => (report = results));
  axe.run<MyReport>(document, {}, (_, results) => (report = results));
}

// additional configuration options
axe.run(context, options, (error: Error, results: axe.AxeResults) => {
  console.log(error || results.passes.length);
});
var tagConfigRunOnly: axe.RunOnly = {
  type: 'tag',
  values: ['wcag2a']
};
var tagConfig = {
  runOnly: tagConfigRunOnly
};
axe.run(context, tagConfig, (error: Error, results: axe.AxeResults) => {
  console.log(error || results);
});
axe.run(
  context,
  {
    runOnly: {
      type: 'tags',
      values: ['wcag2a', 'wcag2aa']
    } as axe.RunOnly
  },
  (error: Error, results: axe.AxeResults) => {
    console.log(error || results);
  }
);
axe.run(
  context,
  {
    runOnly: ['wcag2a', 'wcag2aa']
  },
  (error: Error, results: axe.AxeResults) => {
    console.log(error || results);
  }
);
axe.run(
  context,
  {
    runOnly: ['color-contrast', 'heading-order']
  },
  (error: Error, results: axe.AxeResults) => {
    console.log(error || results);
  }
);

var someRulesConfig = {
  rules: {
    'color-contrast': { enabled: false },
    'heading-order': { enabled: true }
  }
};
axe.run(context, someRulesConfig, (error: Error, results: axe.AxeResults) => {
  console.log(error || results);
});

// just context
axe.run(context).then(function (done: any) {
  done();
});
// just options
axe.run(options).then(function (done: any) {
  done();
});
// just callback
axe.run((error: Error, results: axe.AxeResults) => {
  console.log(error || results);
});
// context and callback
axe.run(context, (error: Error, results: axe.AxeResults) => {
  console.log(error || results);
});
// options and callback
axe.run(options, (error: Error, results: axe.AxeResults) => {
  console.log(error || results);
});
// context and options
axe.run(context, options).then(function (done: any) {
  done();
});
// context, options, and callback
axe.run(context, options, (error: Error, results: axe.AxeResults) => {
  console.log(error || results);
});

// axe.configure
var spec: axe.Spec = {
  branding: {
    brand: 'foo',
    application: 'bar'
  },
  reporter: 'v1',
  checks: [
    {
      id: 'custom-check',
      evaluate: function () {
        return true;
      },
      metadata: {
        impact: 'minor',
        messages: {
          pass: 'yes',
          fail: 'nope',
          incomplete: {
            maybe: 'maybe',
            or: 'maybe not'
          }
        }
      }
    }
  ],
  standards: {
    ...axe.utils.getStandards(),
    ariaRoles: {
      'custom-role': {
        type: 'widget',
        requiredAttrs: ['aria-label']
      }
    },
    ariaAttrs: {
      'custom-attr': {
        type: 'boolean'
      }
    },
    htmlElms: {
      'custom-elm': {
        contentTypes: ['flow'],
        allowedRoles: false
      }
    },
    cssColors: {
      customColor: [0, 1, 2, 3]
    }
  },
  rules: [
    {
      id: 'custom-rule',
      any: ['custom-check'],
      metadata: {
        description: 'custom rule',
        help: 'different help',
        helpUrl: 'https://example.com',
        tags: ['custom']
      }
    }
  ]
};
axe.configure(spec);

var source = axe.source;
var version = axe.version;

axe.reset();

axe.getRules(['wcag2aa']);
typeof axe.getRules() === 'object';

const rules = axe.getRules();
rules.forEach(rule => {
  rule.ruleId.substr(1234);
});

axe.configure({
  locale: {
    checks: {
      foo: {
        fail: 'failure',
        pass: 'success',
        incomplete: {
          foo: 'nar'
        }
      }
    }
  }
});

axe.configure({
  locale: {
    lang: 'foo',
    rules: {
      foo: {
        description: 'desc',
        help: 'help'
      }
    },
    checks: {
      foo: {
        pass: 'pass',
        fail: 'fail',
        incomplete: {
          foo: 'bar'
        }
      }
    }
  }
});

// Reporters
let fooReporter = (
  results: axe.RawResult[],
  options: axe.RunOptions,
  cb: (out: 'foo') => void
) => {
  cb('foo');
};

axe.addReporter<'foo'>('foo', fooReporter, true);
axe.configure({ reporter: fooReporter });
fooReporter = axe.getReporter<'foo'>('foo');
const hasFoo: boolean = axe.hasReporter('foo');

// setup & teardown
axe.setup();
axe.setup(document);
axe.setup(document.createElement('div'));
axe.teardown();

// Plugins
var pluginSrc: axe.AxePlugin = {
  id: 'doStuff',
  run: (data: any, callback: Function) => {
    callback();
  },
  commands: [
    {
      id: 'run-doStuff',
      callback: (data: any, callback: Function) => {
        axe.plugins['doStuff'].run(data, callback);
      }
    }
  ]
};
axe.registerPlugin(pluginSrc);
axe.cleanup();
