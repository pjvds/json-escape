# json-escape

This GitHub Action escapescounts the number of the characters in the files that
match the pattern and comments it on the pull request.

## Inputs

### `value`

**Required** The string value to escape.

### `repeat`

**Optional** (`true|false|number`) The number of times to repeat the escaping.
Default `false`.

## Outputs

### `value`

The escaped string value.

## Example Usage

```yaml
jobs:
  json-escape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: pjvds/json-escape@v1.0.0
        with:
          value: 'Hello World! 🌍'

      # prints: Hello World! \\uD83D\\uDC4F
      - run: echo ${{ steps.json-escape.outputs.value }}
```
