export default function shouldBeFulfilled() {
  it(`should be fulfilled`, async function() {
    return this.context().should.be.fulfilled()
  })
  it(`should be fulfilled with undefined`, async function() {
    return this.context().should.be.fulfilledWith(undefined)
  })
}
