/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import { RunOptions, RunTarget } from 'github-action-ts-run-api'
import { run } from '../src/main'

const examples = [
  ['hello world', 'hello world'],
  ['hello\nworld', 'hello\\nworld'],
  ['hello\\nworld', 'hello\\\\nworld'],
  ['hello "world"', 'hello \\"world\\"'],
  ['hello "world"', 'hello \\"world\\"'],
  ['♥ Bücher', '\\u2665 B\\xFCcher'],
  ['foo 𝌆 bar 💩 baz', 'foo \\uD834\\uDF06 bar \\uD83D\\uDCA9 baz'],
  [
    'This is a "test" string with special characters: \n, \t and an emoji 🚀',
    'This is a \\"test\\" string with special characters: \\n, \\t and an emoji \\uD83D\\uDE80'
  ]
]

it.each(examples)('should escape input "%s" to "%s"', (input, expected) => {
  const target = RunTarget.syncFn(run)
  const options = RunOptions.create().setInputs({ value: input })

  const result = target.run(options)

  expect(result.isSuccess).toBe(true)
  expect(result.durationMs).toBeLessThan(500)
  expect(result.commands.outputs).toHaveProperty('value')
  expect(result.commands.outputs.value).toBe(expected)
  expect(result.runnerWarnings.length).toBe(0)
})
