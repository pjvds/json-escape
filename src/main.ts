import * as core from '@actions/core'
import jsesc from 'jsesc'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const value = core.getInput('value')
    const escaped = jsesc(value)

    core.setOutput('escaped', escaped)
  } catch (caught) {
    if (caught instanceof Error) {
      core.setFailed(caught.message)
    } else {
      core.setFailed(`${caught}`)
    }
  }
}
