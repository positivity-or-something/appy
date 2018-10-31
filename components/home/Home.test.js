const {testa, testb, testc, testd}  = require('./Test')

test('toggles modal', () => {
  expect(testa(1, 1)).toBe(2);
});

it('works', () => {
  expect(1).toBe(1);
});

test('toggles modal', () => {
  expect(testb(1)).toBe(2);
});

test('toggles modal', () => {
  expect(testb(3)).toBe(4);
});

test('toggles modal', () => {
  expect(testb(4)).toBe(5);
});

test('toggles modal', () => {
  expect(testb(5)).toBe(6);
});

test('toggles modal', () => {
  expect(testb(6)).toBe(7);
});

test('toggles modal', () => {
  expect(testb(7)).toBe(8);
});

test('toggles modal', () => {
  expect(testb(8)).toBe(9);
});

test('toggles modal', () => {
  expect(testb(10)).toBe(11);
});

test('toggles modal', () => {
  expect(testb(12)).toBe(13);
});

test('toggles modal', () => {
  expect(testb(14)).toBe(15);
});

test('toggles modal', () => {
  expect(testc('Logan')).toBe(true);
});

test('toggles modal', () => {
  expect(testc('Ash')).toBe(false);
});

test('toggles modal', () => {
  expect(testd()).toBe('testing');
});