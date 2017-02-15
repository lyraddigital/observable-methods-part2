import { ObservableMethodsPart2Page } from './app.po';

describe('observable-methods-part2 App', function() {
  let page: ObservableMethodsPart2Page;

  beforeEach(() => {
    page = new ObservableMethodsPart2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
