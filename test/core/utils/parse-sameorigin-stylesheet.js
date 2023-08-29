describe('axe.utils.parseSameOriginStylesheet', function () {
  'use strict';

  var stylesForPage;
  var styleSheets = {
    emptyStyleTag: {
      id: 'emptyStyleTag',
      text: ''
    },
    styleTagWithOneImport: {
      id: 'styleTagWithOneImport',
      text: '@import "../integration/full/preload-cssom/base.css";'
    },
    inlineStyle: {
      id: 'inlineStyle',
      text: '.inline-css { font-weight:normal; }'
    }
  };
  var dynamicDoc;
  var convertDataToStylesheet;

  beforeEach(function () {
    dynamicDoc = document.implementation.createHTMLDocument(
      'Dynamic document for testing axe.utils.parseSameOriginStylesheet'
    );
    convertDataToStylesheet = axe.utils.getStyleSheetFactory(dynamicDoc);
  });

  afterEach(function (done) {
    dynamicDoc = undefined;
    convertDataToStylesheet = undefined;
    axe.testUtils.removeStyleSheets(stylesForPage).then(function () {
      done();
      stylesForPage = undefined;
    });
  });

  it('returns empty results when given sheet has no cssRules', function (done) {
    // add style that has no styles
    stylesForPage = [styleSheets.emptyStyleTag];

    axe.testUtils.addStyleSheets(stylesForPage).then(function () {
      // get recently added sheet
      var sheet = Array.from(document.styleSheets).filter(function (sheet) {
        return sheet.ownerNode.id === styleSheets.emptyStyleTag.id;
      })[0];
      // parse sheet
      var options = {
        rootNode: document,
        shadowId: undefined,
        convertDataToStylesheet: convertDataToStylesheet
      };
      var priority = [1, 0];
      var importedUrls = [];
      var isCrossOriginRequest = false;
      axe.utils
        .parseSameOriginStylesheet(
          sheet,
          options,
          priority,
          importedUrls,
          false
        )
        .then(function (data) {
          assert.isDefined(data);
          assert.isDefined(data.sheet);
          assert.equal(data.isCrossOrigin, isCrossOriginRequest);
          assert.deepEqual(data.priority, priority);
          assert.property(data.sheet, 'cssRules');
          assert.isTrue(data.sheet.cssRules.length === 0);
          done();
        });
    });
  });

  it('returns @import rule specified in the stylesheet', function (done) {
    // add style that has @import style
    stylesForPage = [styleSheets.styleTagWithOneImport];

    axe.testUtils.addStyleSheets(stylesForPage).then(function () {
      // get recently added sheet
      var sheet = Array.from(document.styleSheets).filter(function (sheet) {
        return sheet.ownerNode.id === styleSheets.styleTagWithOneImport.id;
      })[0];
      // parse sheet
      var options = {
        rootNode: document,
        shadowId: undefined,
        convertDataToStylesheet: convertDataToStylesheet
      };
      var priority = [1, 0];
      var importedUrls = [];
      var isCrossOriginRequest = false;
      axe.utils
        .parseSameOriginStylesheet(
          sheet,
          options,
          priority,
          importedUrls,
          false
        )
        .then(function (data) {
          assert.isDefined(data);

          var parsedImportData = data[0];
          assert.isDefined(parsedImportData.sheet);
          assert.equal(parsedImportData.isCrossOrigin, isCrossOriginRequest);
          // as @import is a style with in @imported sheet, an additional priority is appended.
          assert.deepEqual(parsedImportData.priority, [1, 0, 0]);
          assert.property(parsedImportData.sheet, 'cssRules');
          assert.isAtLeast(parsedImportData.sheet.cssRules.length, 1);
          axe.testUtils.assertStylesheet(
            parsedImportData.sheet,
            '.style-from-base-css',
            '.style-from-base-css {font-size: 100%; }'
          );
          done();
        });
    });
  });

  it('returns inline style specified in the stylesheet', function (done) {
    // add style that has @import style
    stylesForPage = [styleSheets.inlineStyle];

    axe.testUtils.addStyleSheets(stylesForPage).then(function () {
      // get recently added sheet
      var sheet = Array.from(document.styleSheets).filter(function (sheet) {
        return sheet.ownerNode.id === styleSheets.inlineStyle.id;
      })[0];
      // parse sheet
      var options = {
        rootNode: document,
        shadowId: undefined,
        convertDataToStylesheet: convertDataToStylesheet
      };
      var priority = [1, 0];
      var importedUrls = [];
      var isCrossOriginRequest = false;
      axe.utils
        .parseSameOriginStylesheet(
          sheet,
          options,
          priority,
          importedUrls,
          false
        )
        .then(function (data) {
          assert.isDefined(data);
          assert.isDefined(data.sheet);
          assert.equal(data.isCrossOrigin, isCrossOriginRequest);
          assert.deepEqual(data.priority, [1, 0]);
          assert.property(data.sheet, 'cssRules');
          assert.isAtLeast(data.sheet.cssRules.length, 1);
          axe.testUtils.assertStylesheet(
            data.sheet,
            '.inline-css',
            '.inline-css { font-weight:normal; }'
          );
          done();
        });
    });
  });

  /**
   * Note:
   * Only single workflow of resolving either the `@import` or `inline` styles can be tested here.
   * Multiple resolutions from a given stylesheet containing a combination of styles are test as integration tests.
   * See: `/tests/full/integration/preload-cssom.html`
   */
});
