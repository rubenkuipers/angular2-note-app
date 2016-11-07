import { Angular2NoteAppPage } from './app.po';

describe('angular2-note-app App', function() {
  let page: Angular2NoteAppPage;

  beforeEach(() => {
    page = new Angular2NoteAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
