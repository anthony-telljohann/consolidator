export default function shouldBeFulfilled () {
  it(`should be fulfilled`, async function () {
    this.context.should.be.fulfilled()
  })
  it(`should be fulfilled with undefined`, async function () {
    this.context.should.be.fulfilledWith(undefined)
  })
}
