export default function shouldBeAFunction() {
  it(`should be a function`, async function() {
    this.context.should.be.a.Function();
  });
}
