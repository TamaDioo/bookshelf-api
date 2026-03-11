describe('Pengujian Logika Bookshelf API', () => {
  test('Book should "finished" when readPage equal with pageCount', () => {
    const pageCount = 100;
    const readPage = 100;
    const finished = pageCount === readPage;
    expect(finished).toBe(true);
  });

  test('Book should not "finished" when readPage is less than pageCount', () => {
    const pageCount = 100;
    const readPage = 50;
    const finished = pageCount === readPage;
    expect(finished).toBe(false);
  });
});
