import { B.Luntly.Ng4Page } from './app.po';

describe('b.luntly.ng4 App', () => {
  let page: B.Luntly.Ng4Page;

  beforeEach(() => {
    page = new B.Luntly.Ng4Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
