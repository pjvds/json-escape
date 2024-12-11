import * as core from '@actions/core'
import jsesc from 'jsesc'

function getRepeatCount(repeat: string | null): number {
  if (!repeat || repeat === 'false') {
    return 1
  }

  if (repeat === 'true') {
    return 2
  }

  const count = parseInt(repeat, 10)
  if (isNaN(count)) {
    throw new Error(`Invalid repeat value: ${repeat}`)
  }

  return count
}

/**
 * The main function for the action.
 * @returns {<void>} Resolves when the action is complete.
 */
export function run(): void {
  try {
    const value = core.getInput('value')
    const repeat = core.getInput('repeat')

    const count = getRepeatCount(repeat)
    if (count < 1) {
      throw new Error(`Invalid repeat count: ${count}`)
    }

    for (let i = 0; i < count; i++) {
      core.info(`Escaping value:\n${value}`)

      const escaped = jsesc(value)
      core.info(`Escaped value:\n${escaped}`)

      core.setOutput('value', escaped)
    }
  } catch (caught) {
    if (caught instanceof Error) {
      core.setFailed(caught.message)
    } else {
      core.setFailed(String(caught))
    }
  }
}
