import { SampleManagerPage } from './app.po';

describe('sample-manager App', () => {
  let page: SampleManagerPage;

  beforeEach(() => {
    page = new SampleManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
