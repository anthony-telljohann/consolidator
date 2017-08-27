import should from 'should'
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

import * as consolidator from 'consolidator'

const SHOULD_BE_A_STRING = 'foo'
const SHOULD_BE_DEFINED = 'foo'
const SHOULD_NOT_BE_EMPTY = 'foo'

const SHOULD_INCLUDE_SHOULD_BE_A_STRING = new RegExp(SHOULD_BE_A_STRING)
const SHOULD_INCLUDE_SHOULD_BE_DEFINED = new RegExp(SHOULD_BE_DEFINED)
const SHOULD_INCLUDE_SHOULD_NOT_BE_EMPTY = new RegExp(SHOULD_NOT_BE_EMPTY)

describe(`consolidator`, () => {
  it(`should consolidate`, async () => {
    consolidator.should.have.property('consolidate')
  })

  describe(`consolidating`, () => {
    beforeEach(`unspecify destination`, user.unspecifyDestination)
    beforeEach(`unspecify sources`, user.unspecifySources)
    beforeEach(
      `unset pre-consolidated destination file`,
      system.unsetPreConsolidatedDestinationFile
    )
    beforeEach(
      `unset pre-consolidated source files`,
      system.unsetPreConsolidatedSourceFiles
    )
    beforeEach(
      `unset pre-consolidated destination file`,
      system.unsetPreConsolidatedDestinationFile
    )
    beforeEach(
      `unset pre-consolidated source files`,
      system.unsetPreConsolidatedSourceFiles
    )
    beforeEach(
      `system remove destination directory ${DESTINATION_DIRECTORY}`,
      system.removeDestinationDirectory
    )
    beforeEach(
      `system remove sources directory ${SOURCES_DIRECTORY}`,
      system.removeSourcesDirectory
    )

    describe(`user specifies sources as a non-empty string (${SOURCE_FILES})`, () => {
      beforeEach(`user specify sources as ${SOURCE_FILES}`, () =>
        user.specifySources(SOURCE_FILES)
      )

      describe(`user specifies destination as a non-empty string (${DESTINATION_FILE})`, async () => {
        beforeEach(`user specify destination as ${DESTINATION_FILE}`, () =>
          user.specifyDestination(DESTINATION_FILE)
        )

        describe(`system has source files`, () => {
          describe(`source files are not empty`, async () => {
            beforeEach(
              `system create random source files in ${SOURCES_DIRECTORY}`,
              system.createRandomSourceFiles
            )

            describe(`system has no destination file`, () => {
              beforeEach(
                `system remove destination directory ${DESTINATION_DIRECTORY}`,
                system.removeDestinationDirectory
              )

              describe(`then consolidating`, async () => {
                setup()
                it(`should create a destination file`, async () => {
                  postConsolidatedFiles.destination.should.exist
                })

                it(`should remove all source files`, async () => {
                  should.not.exist(postConsolidatedFiles.sources)
                })

                describe(`destination file`, async () => {
                  it(`should be a string`, async () => {
                    postConsolidatedFiles.destination.should.be.a.String
                  })
                  it(`should not be empty`, async () => {
                    postConsolidatedFiles.destination.should.not.be.empty
                  })
                  it(`should include every source file`, async () => {
                    preConsolidatedFiles.sources.every(sourceFile => {
                      postConsolidatedFiles.destination.should.containEql(
                        sourceFile
                      )
                    })
                  })
                })
              })
            })

            describe(`system has a destination file`, async () => {
              describe(`destination file is empty`, async () => {
                beforeEach(
                  `system create empty destination file in ${DESTINATION_DIRECTORY}`,
                  system.createEmptyDestinationFile
                )

                describe(`then consolidating`, async () => {
                  setup()
                  it(`should create a destination file`, async () => {
                    postConsolidatedFiles.destination.should.exist
                  })

                  it(`should remove all source files`, async () => {
                    should.not.exist(postConsolidatedFiles.sources)
                  })

                  describe(`destination file`, async () => {
                    it(`should be a string`, async () => {
                      postConsolidatedFiles.destination.should.be.a.String
                    })
                    it(`should not be empty`, async () => {
                      postConsolidatedFiles.destination.should.not.be.empty
                    })
                    it(`should include every source file`, async () => {
                      preConsolidatedFiles.sources.every(sourceFile => {
                        postConsolidatedFiles.destination.should.containEql(
                          sourceFile
                        )
                      })
                    })
                  })
                })
              })

              describe(`destination file is not empty`, async () => {
                beforeEach(
                  `system create random destination file in ${DESTINATION_DIRECTORY}`,
                  system.createRandomDestinationFile
                )

                describe(`then consolidating`, async () => {
                  setup()
                  it(`should create a destination file`, async () => {
                    postConsolidatedFiles.destination.should.exist
                  })

                  it(`should remove all source files`, async () => {
                    should(null).not.be.ok()
                    // postConsolidatedFiles.sources.should.not.exist
                  })

                  describe(`destination file`, async () => {
                    it(`should be a string`, async () => {
                      postConsolidatedFiles.destination.should.be.a.String
                    })
                    it(`should not be empty`, async () => {
                      postConsolidatedFiles.destination.should.not.be.empty
                    })
                    it(`should include every source file`, async () => {
                      preConsolidatedFiles.sources.every(sourceFile => {
                        postConsolidatedFiles.destination.should.containEql(
                          sourceFile
                        )
                      })
                    })
                    it(`should not include pre-consolidated destination file`, async () => {
                      postConsolidatedFiles.destination.should.not.containEql(
                        preConsolidatedFiles.destination
                      )
                    })
                  })
                })
              })
            })
          })
          describe(`source files are empty`, async () => {
            beforeEach(
              `system create empty source files in ${SOURCES_DIRECTORY}`,
              system.createEmptySourceFiles
            )

            describe(`system has no destination file`, async () => {
              beforeEach(
                `system remove destination directory ${DESTINATION_DIRECTORY}`,
                system.removeDestinationDirectory
              )

              describe(`then consolidating`, async () => {
                setup()

                it(`should remove existing destination file`, async () => {
                  should.not.exist(postConsolidatedFiles.destination)
                })

                it(`should remove all source files`, async () => {
                  should.not.exist(postConsolidatedFiles.sources)
                })
              })
            })

            describe(`system has a destination file`, async () => {
              describe(`destination file is empty`, async () => {
                beforeEach(
                  `system create empty destination file in ${DESTINATION_DIRECTORY}`,
                  system.createEmptyDestinationFile
                )

                describe(`then consolidating`, async () => {
                  setup()
                  it(`should remove existing destination file`, async () => {
                    should.not.exist(postConsolidatedFiles.destination)
                  })

                  it(`should remove all source files`, async () => {
                    should.not.exist(postConsolidatedFiles.sources)
                  })
                })
              })

              describe(`destination file is not empty`, async () => {
                beforeEach(
                  `system create random destination file in ${DESTINATION_DIRECTORY}`,
                  system.createRandomDestinationFile
                )

                describe(`then consolidating`, async () => {
                  setup()

                  it(`should remove existing destination file`, async () => {
                    should.not.exist(postConsolidatedFiles.destination)
                  })

                  it(`should remove all source files`, async () => {
                    should.not.exist(postConsolidatedFiles.sources)
                  })
                })
              })
            })
          })

          describe(`system has no destination file`, async () => {
            beforeEach(
              `system remove destination directory ${DESTINATION_DIRECTORY}`,
              system.removeDestinationDirectory
            )

            describe(`then consolidating`, async () => {
              setup()
              it(`should not manipulate destination file`, async () => {
                should.equal(
                  postConsolidatedFiles.destination,
                  preConsolidatedFiles.destination
                )
              })

              it(`should not manipulate sources file`, async () => {
                should.equal(
                  postConsolidatedFiles.sources,
                  preConsolidatedFiles.sources
                )
              })
            })
          })
        })

        describe(`system has no source files`, async () => {
          beforeEach(
            `system remove sources directory ${SOURCES_DIRECTORY}`,
            system.removeSourcesDirectory
          )
          describe(`system has no destination file`, async () => {
            beforeEach(
              `system remove destination directory ${DESTINATION_DIRECTORY}`,
              system.removeDestinationDirectory
            )

            describe(`then consolidating`, async () => {
              setup()
              it(`should remove existing destination file`, async () => {
                should.not.exist(postConsolidatedFiles.destination)
              })

              it(`should not manipulate sources file`, async () => {
                should.equal(
                  postConsolidatedFiles.sources,
                  preConsolidatedFiles.sources
                )
              })

              // describe(`destination file`, async () => {
              //   it(`should be a string`, async () => {
              //     postConsolidatedFiles.destination.should.be.a('string')
              //   })
              // })
            })
          })

          describe(`system has a destination file`, async () => {
            describe(`destination file is empty`, async () => {
              beforeEach(
                `system create empty destination file in ${DESTINATION_DIRECTORY}`,
                system.createEmptyDestinationFile
              )

              describe(`then consolidating`, async () => {
                setup()
                it(`should remove existing destination file`, async () => {
                  should.not.exist(postConsolidatedFiles.destination)
                })

                it(`should not manipulate sources file`, async () => {
                  should.equal(
                    postConsolidatedFiles.sources,
                    preConsolidatedFiles.sources
                  )
                })
              })
            })

            describe(`destination file is not empty`, async () => {
              beforeEach(
                `system create random destination file in ${DESTINATION_DIRECTORY}`,
                system.createRandomDestinationFile
              )

              describe(`then consolidating`, async () => {
                setup()
                it(`should remove existing destination file`, async () => {
                  should.not.exist(postConsolidatedFiles.destination)
                })

                it(`should not manipulate sources file`, async () => {
                  should.equal(
                    postConsolidatedFiles.sources,
                    preConsolidatedFiles.sources
                  )
                })
              })
            })
          })
        })
      })

      describe(`user specifies destination as an empty string ('')`, async () => {
        beforeEach(`user specify destination as ''`, () =>
          user.specifyDestination(EMPTY_STRING)
        )

        it(`should be rejected with TypeError 'destination ${SHOULD_NOT_BE_EMPTY}'`, async () => {
          consolidator
            .consolidate(parameters.sources, parameters.destination)
            .should.be.rejectedWith(
              TypeError,
              SHOULD_INCLUDE_SHOULD_NOT_BE_EMPTY
            )
        })
      })

      describe(`user specifies destination as number (${NUMBER})`, async () => {
        beforeEach(`user specify destination as ${NUMBER}`, () =>
          user.specifyDestination(NUMBER)
        )

        it(`should be rejected with TypeError 'destination ${SHOULD_BE_A_STRING}'`, async () => {
          consolidator
            .consolidate(parameters.sources, parameters.destination)
            .should.be.rejectedWith(
              TypeError,
              SHOULD_INCLUDE_SHOULD_BE_A_STRING
            )
        })
      })

      describe(`user specifies destination as undefined (${UNDEFINED})`, async () => {
        beforeEach(`user specify destination as ${UNDEFINED}`, () =>
          user.specifyDestination(UNDEFINED)
        )

        it(`should be rejected with TypeError 'destination ${SHOULD_BE_DEFINED}'`, async () => {
          consolidator
            .consolidate(parameters.sources, parameters.destination)
            .should.be.rejectedWith(TypeError, SHOULD_INCLUDE_SHOULD_BE_DEFINED)
        })
      })
    })

    describe(`user specifies sources as an empty string ('')`, async () => {
      beforeEach(`user specify sources as ''`, () =>
        user.specifySources(EMPTY_STRING)
      )

      it(`should be rejected with TypeError 'sources ${SHOULD_NOT_BE_EMPTY}'`, async () => {
        consolidator
          .consolidate(parameters.sources, parameters.destination)
          .should.be.rejectedWith(TypeError, SHOULD_INCLUDE_SHOULD_NOT_BE_EMPTY)
      })
    })

    describe(`user specifies sources as number (${NUMBER})`, async () => {
      beforeEach(`user specify sources as ${NUMBER}`, () =>
        user.specifySources(NUMBER)
      )

      it(`should be rejected with TypeError 'sources ${SHOULD_BE_A_STRING}'`, async () => {
        consolidator
          .consolidate(parameters.sources, parameters.destination)
          .should.be.rejectedWith(TypeError, SHOULD_INCLUDE_SHOULD_BE_A_STRING)
      })
    })

    describe(`user specifies sources as undefined (${UNDEFINED})`, async () => {
      beforeEach(`user specify sources as undefined`, () =>
        user.specifySources(UNDEFINED)
      )

      it(`should be rejected with TypeError 'sources ${SHOULD_BE_DEFINED}'`, async () => {
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
    system.readPreConsolidatedDestinationFile
  )
  beforeEach(
    `read post-consolidated source files`,
    system.readPreConsolidatedSourceFiles
  )
  beforeEach(`consolidate`, function(done) {
    consolidator
      .consolidate(parameters.sources, parameters.destination)
      .then(function() {
        done()
      })
  })
  beforeEach(
    `read post-consolidated destination file`,
    system.readPostConsolidatedDestinationFile
  )
  beforeEach(
    `read post-consolidated source files`,
    system.readPostConsolidatedSourceFiles
  )
}
