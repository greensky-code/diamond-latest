import { browser, element, by } from 'protractor';

describe('App Component', function() {
  /*
  // TODO Manual Finishing: Replace the following with the actual menu text and page title.
  it('Should Navigate to Page1', function() {
      browser.get('http://localhost:3000/dashboard');
      element(by.css('.dropdown-toggle')).click();
      element(by.partialLinkText('Menu 1')).click();
      let page_title = element(by.css('.page-title')).getText();
      expect(page_title).toEqual('Page 2 Title');
  });

  it('Should Navigate to Page2', function() {
      browser.get('http://localhost:3000/dashboard');
      element(by.css('.dropdown-toggle')).click();
      element(by.partialLinkText('Menu 2')).click();
      let page_title = element(by.css('.page-title')).getText();
      expect(page_title).toEqual('Page 3 Title');
  });

  it('Should Navigate to Page3', function() {
      browser.get('http://localhost:3000/dashboard');
      element(by.css('.dropdown-toggle')).click();
      element(by.partialLinkText('Menu 3')).click();
      let page_title = element(by.css('.page-title')).getText();
      expect(page_title).toEqual('Page 3 Title');
  });
  */

  it('Should Navigate to Report', function() {
      browser.get('http://localhost:3000/dashboard');
      element(by.partialLinkText('Reports')).click();
      let page_title = element(by.css('h1')).getText();
      expect(page_title).toEqual('Reports');
  });

});