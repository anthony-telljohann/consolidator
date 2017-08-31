export default {
  shouldBeAFunction,
  shouldBeFulfilled,
  shouldBeRejected
}

function shouldBeAFunction() {
  it(`should be a function`, async function() {
    this.context.should.be.a.Function()
  })
}

function shouldBeFulfilled() {
  it(`should be fulfilled`, async function() {
    this.context.should.be.fulfilled()
  })
  it(`should be fulfilled with undefined`, async function() {
    this.context.should.be.fulfilledWith(undefined)
  })
}

function shouldBeRejected(message) {
  it(`should be rejected`, async function() {
    this.context.should.be.rejected()
  })
  it(`should be rejected with TypeError`, async function() {
    this.context.should.be.rejectedWith(TypeError)
  })
  it(`should be rejected with "${message}"`, async function() {
    this.context.should.be.rejectedWith(message)
  })
}
