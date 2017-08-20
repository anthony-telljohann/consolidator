import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {
  DESTINATION_DIRECTORY,
  DESTINATION_FILE,
  EMPTY_STRING,
  NUMBER,
  SOURCE_FILES,
  SOURCES_DIRECTORY,
  UNDEFINED
} from './constants/index'
import { system, user } from './objects/index'
import {
  parameters,
  postConsolidatedFiles,
  preConsolidatedFiles
} from './variables/index'
import consolidator from '../lib/consolidator.js'

const SHOULD_BE_A_STRING = `should be a non-empty string`
const SHOULD_BE_DEFINED = `should be a non-empty string`
const SHOULD_NOT_BE_EMPTY = `should be a non-empty string`

chai.use(chaiAsPromised)

const should = chai.should()
const SHOULD_INCLUDE_SHOULD_BE_A_STRING = new RegExp(`should be string`)
const SHOULD_INCLUDE_SHOULD_BE_DEFINED = new RegExp(`should be string`)
const SHOULD_INCLUDE_SHOULD_NOT_BE_EMPTY = new RegExp(`should be string`)

describe(`consolidator`, () => {
  it(`should consolidate`, () => {
    consolidator.should.have.property('consolidate')
  })

  describe(`consolidate`, () => {
    it(`should be a function`, () => {
      consolidator.consolidate.should.be.a('function')
    })
    it(`should return a promise`, () => {
      consolidator.consolidate().should.be.a('promise')
    })
  })

  describe(`consolidating`, () => {
    beforeEach(`unspecify destination`, () => {
      user.unspecifyDestination()
    })
    beforeEach(`unspecify sources`, () => {
      user.unspecifySources()
    })
    beforeEach(`unset pre-consolidated destination file`, () => {
      system.unsetPreConsolidatedDestinationFile()
    })
    beforeEach(`unset pre-consolidated source files`, () => {
      system.unsetPreConsolidatedSourceFiles()
    })
    beforeEach(`unset pre-consolidated destination file`, () => {
      system.unsetPreConsolidatedDestinationFile()
    })
    beforeEach(`unset pre-consolidated source files`, () => {
      system.unsetPreConsolidatedSourceFiles()
    })
    beforeEach(
      `system remove destination directory ${DESTINATION_DIRECTORY}`,
      async () => await system.removeDestinationDirectory()
    )
    beforeEach(
      `system remove sources directory ${SOURCES_DIRECTORY}`,
      async () => await system.removeSourcesDirectory()
    )

    describe(`user specifies sources as a non-empty string (${SOURCE_FILES})`, () => {
      beforeEach(`user specify sources as ${SOURCE_FILES}`, () =>
        user.specifySources(SOURCE_FILES)
      )

      describe(`user specifies destination as a non-empty string (${DESTINATION_FILE})`, () => {
        beforeEach(`user specify destination as ${DESTINATION_FILE}`, () =>
          user.specifyDestination(DESTINATION_FILE)
        )

        describe(`system has source files`, () => {
          describe(`source files are not empty`, () => {
            beforeEach(
              `system create random source files in ${SOURCES_DIRECTORY}`,
              async () => await system.createRandomSourceFiles()
            )

            describe(`system has no destination file`, () => {
              beforeEach(
                `system remove destination directory ${DESTINATION_DIRECTORY}`,
                async () => await system.removeDestinationDirectory()
              )

              describe(`then consolidating`, () => {
                setup()
                it(`should create a destination file`, () => {
                  postConsolidatedFiles.destination.should.exist
                })

                it(`should remove all source files`, () => {
                  should.not.exist(postConsolidatedFiles.sources)
                })

                describe(`destination file`, () => {
                  it(`should be a string`, () => {
                    postConsolidatedFiles.destination.should.be.a('string')
                  })
                  it(`should not be empty`, () => {
                    postConsolidatedFiles.destination.should.not.be.empty
                  })
                  it(`should include every source file`, () => {
                    preConsolidatedFiles.sources.every(sourceFile => {
                      postConsolidatedFiles.destination.should.include(
                        sourceFile
                      )
                    })
                  })
                })
              })
            })

            describe(`system has a destination file`, () => {
              describe(`destination file is empty`, () => {
                beforeEach(
                  `system create empty destination file in ${DESTINATION_DIRECTORY}`,
                  async () => await system.createEmptyDestinationFile()
                )

                describe(`then consolidating`, () => {
                  setup()
                  it(`should create a destination file`, () => {
                    postConsolidatedFiles.destination.should.exist
                  })

                  it(`should remove all source files`, () => {
                    should.not.exist(postConsolidatedFiles.sources)
                  })

                  describe(`destination file`, () => {
                    it(`should be a string`, () => {
                      postConsolidatedFiles.destination.should.be.a('string')
                    })
                    it(`should not be empty`, () => {
                      postConsolidatedFiles.destination.should.not.be.empty
                    })
                    it(`should include every source file`, () => {
                      preConsolidatedFiles.sources.every(sourceFile => {
                        postConsolidatedFiles.destination.should.include(
                          sourceFile
                        )
                      })
                    })
                  })
                })
              })

              describe(`destination file is not empty`, () => {
                beforeEach(
                  `system create random destination file in ${DESTINATION_DIRECTORY}`,
                  async () => await system.createRandomDestinationFile()
                )

                describe(`then consolidating`, () => {
                  setup()
                  it(`should create a destination file`, () => {
                    postConsolidatedFiles.destination.should.exist
                  })

                  it(`should remove all source files`, () => {
                    should.not.exist(postConsolidatedFiles.sources)
                  })

                  describe(`destination file`, () => {
                    it(`should be a string`, () => {
                      postConsolidatedFiles.destination.should.be.a('string')
                    })
                    it(`should not be empty`, () => {
                      postConsolidatedFiles.destination.should.not.be.empty
                    })
                    it(`should include every source file`, () => {
                      preConsolidatedFiles.sources.every(sourceFile => {
                        postConsolidatedFiles.destination.should.include(
                          sourceFile
                        )
                      })
                    })
                    it(`should not include pre-consolidated destination file`, () => {
                      postConsolidatedFiles.destination.should.not.include(
                        preConsolidatedFiles.destination
                      )
                    })
                  })
                })
              })
            })
          })
          describe(`source files are empty`, () => {
            beforeEach(
              `system create empty source files in ${SOURCES_DIRECTORY}`,
              async () => await system.createEmptySourceFiles()
            )

            describe(`system has no destination file`, () => {
              beforeEach(
                `system remove destination directory ${DESTINATION_DIRECTORY}`,
                async () => await system.removeDestinationDirectory()
              )

              describe(`then consolidating`, () => {
                setup()

                it(`should remove existing destination file`, () => {
                  should.not.exist(postConsolidatedFiles.destination)
                })

                it(`should remove all source files`, () => {
                  should.not.exist(postConsolidatedFiles.sources)
                })
              })
            })

            describe(`system has a destination file`, () => {
              describe(`destination file is empty`, () => {
                beforeEach(
                  `system create empty destination file in ${DESTINATION_DIRECTORY}`,
                  async () => await system.createEmptyDestinationFile()
                )

                describe(`then consolidating`, () => {
                  setup()
                  it(`should remove existing destination file`, () => {
                    should.not.exist(postConsolidatedFiles.destination)
                  })

                  it(`should remove all source files`, () => {
                    should.not.exist(postConsolidatedFiles.sources)
                  })
                })
              })

              describe(`destination file is not empty`, () => {
                beforeEach(
                  `system create random destination file in ${DESTINATION_DIRECTORY}`,
                  async () => await system.createRandomDestinationFile()
                )

                describe(`then consolidating`, () => {
                  setup()

                  it(`should remove existing destination file`, () => {
                    should.not.exist(postConsolidatedFiles.destination)
                  })

                  it(`should remove all source files`, () => {
                    should.not.exist(postConsolidatedFiles.sources)
                  })
                })
              })
            })
          })

          describe(`system has no destination file`, () => {
            beforeEach(
              `system remove destination directory ${DESTINATION_DIRECTORY}`,
              async () => await system.removeDestinationDirectory()
            )

            describe(`then consolidating`, () => {
              setup()
              it(`should not manipulate destination file`, () => {
                should.equal(
                  postConsolidatedFiles.destination,
                  preConsolidatedFiles.destination
                )
              })

              it(`should not manipulate sources file`, () => {
                should.equal(
                  postConsolidatedFiles.sources,
                  preConsolidatedFiles.sources
                )
              })
            })
          })
        })

        describe(`system has no source files`, () => {
          beforeEach(
            `system remove sources directory ${SOURCES_DIRECTORY}`,
            async () => await system.removeSourcesDirectory()
          )
          describe(`system has no destination file`, () => {
            beforeEach(
              `system remove destination directory ${DESTINATION_DIRECTORY}`,
              async () => await system.removeDestinationDirectory()
            )

            describe(`then consolidating`, () => {
              setup()
              it(`should not manipulate destination file`, () => {
                should.equal(
                  postConsolidatedFiles.destination,
                  preConsolidatedFiles.destination
                )
              })

              it(`should not manipulate sources file`, () => {
                should.equal(
                  postConsolidatedFiles.sources,
                  preConsolidatedFiles.sources
                )
              })

              // describe(`destination file`, () => {
              //   it(`should be a string`, () => {
              //     postConsolidatedFiles.destination.should.be.a('string')
              //   })
              // })
            })
          })

          describe(`system has a destination file`, () => {
            describe(`destination file is empty`, () => {
              beforeEach(
                `system create empty destination file in ${DESTINATION_DIRECTORY}`,
                async () => await system.createEmptyDestinationFile()
              )

              describe(`then consolidating`, () => {
                setup()

                it(`should remove existing destination file`, () => {
                  should.not.exist(postConsolidatedFiles.destination)
                })

                it(`should remove all source files`, () => {
                  should.not.exist(postConsolidatedFiles.sources)
                })
              })
            })

            describe(`destination file is not empty`, () => {
              beforeEach(
                `system create random destination file in ${DESTINATION_DIRECTORY}`,
                async () => await system.createRandomDestinationFile()
              )

              describe(`then consolidating`, () => {
                setup()
                it(`should remove existing destination file`, () => {
                  should.not.exist(postConsolidatedFiles.destination)
                })

                it(`should remove all source files`, () => {
                  should.not.exist(postConsolidatedFiles.sources)
                })
              })
            })
          })
        })
      })

      describe(`user specifies destination as an empty string ('')`, () => {
        beforeEach(`user specify destination as ''`, () =>
          user.specifyDestination(EMPTY_STRING)
        )

        it(`should be rejected with TypeError 'destination ${SHOULD_NOT_BE_EMPTY}'`, () => {
          consolidator
            .consolidate(parameters.sources, parameters.destination)
            .should.be.rejectedWith(
              TypeError,
              SHOULD_INCLUDE_SHOULD_NOT_BE_EMPTY
            )
        })
      })

      describe(`user specifies destination as number (${NUMBER})`, () => {
        beforeEach(`user specify destination as ${NUMBER}`, () =>
          user.specifyDestination(NUMBER)
        )

        it(`should be rejected with TypeError 'destination ${SHOULD_BE_A_STRING}'`, () => {
          consolidator
            .consolidate(parameters.sources, parameters.destination)
            .should.be.rejectedWith(
              TypeError,
              SHOULD_INCLUDE_SHOULD_BE_A_STRING
            )
        })
      })

      describe(`user specifies destination as undefined (${UNDEFINED})`, () => {
        beforeEach(`user specify destination as ${UNDEFINED}`, () =>
          user.specifyDestination(UNDEFINED)
        )

        it(`should be rejected with TypeError 'destination ${SHOULD_BE_DEFINED}'`, () => {
          consolidator
            .consolidate(parameters.sources, parameters.destination)
            .should.be.rejectedWith(TypeError, SHOULD_INCLUDE_SHOULD_BE_DEFINED)
        })
      })
    })

    describe(`user specifies sources as an empty string ('')`, () => {
      beforeEach(`user specify sources as ''`, () =>
        user.specifySources(EMPTY_STRING)
      )

      it(`should be rejected with TypeError 'sources ${SHOULD_NOT_BE_EMPTY}'`, () => {
        consolidator
          .consolidate(parameters.sources, parameters.destination)
          .should.be.rejectedWith(TypeError, SHOULD_INCLUDE_SHOULD_NOT_BE_EMPTY)
      })
    })

    describe(`user specifies sources as number (${NUMBER})`, () => {
      beforeEach(`user specify sources as ${NUMBER}`, () =>
        user.specifySources(NUMBER)
      )

      it(`should be rejected with TypeError 'sources ${SHOULD_BE_A_STRING}'`, () => {
        consolidator
          .consolidate(parameters.sources, parameters.destination)
          .should.be.rejectedWith(TypeError, SHOULD_INCLUDE_SHOULD_BE_A_STRING)
      })
    })

    describe(`user specifies sources as undefined (${UNDEFINED})`, () => {
      beforeEach(`user specify sources as undefined`, () =>
        user.specifySources(UNDEFINED)
      )

      it(`should be rejected with TypeError 'sources ${SHOULD_BE_DEFINED}'`, () => {
        consolidator
          .consolidate(parameters.sources, parameters.destination)
          .should.be.rejectedWith(TypeError, SHOULD_INCLUDE_SHOULD_BE_DEFINED)
      })
    })

    afterEach(`remove destination directory`, system.removeDestinationDirectory)
    afterEach(`remove sources directory`, system.removeSourcesDirectory)
  })
})

function setup() {
  beforeEach(
    `read post-consolidated destination file`,
    async () => await system.readPreConsolidatedDestinationFile()
  )
  beforeEach(
    `read post-consolidated source files`,
    async () => await system.readPreConsolidatedSourceFiles()
  )
  beforeEach(
    `consolidate`,
    async () =>
      await consolidator.consolidate(parameters.sources, parameters.destination)
  )
  beforeEach(
    `read post-consolidated destination file`,
    async () => await system.readPostConsolidatedDestinationFile()
  )
  beforeEach(
    `read post-consolidated source files`,
    async () => await system.readPostConsolidatedSourceFiles()
  )
}
