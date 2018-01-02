// @flow
import { StringUtils } from '@signavio/effektif-commons/lib/utils'

const RESERVED_WORDS = [
  'abstract',
  'arguments',
  'boolean',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'class*',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'double',
  'else',
  'enum',
  'enum*',
  'eval',
  'export',
  'export*',
  'extends',
  'extends*',
  'false',
  'final',
  'finally',
  'float',
  'for',
  'function',
  'goto',
  'if',
  'implements',
  'import',
  'import*',
  'in',
  'instanceof',
  'int',
  'interface',
  'let',
  'long',
  'native',
  'new',
  'null',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'short',
  'static',
  'super',
  'super*',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'volatile',
  'while',
  'with',
  'yield',
]

function replaceReservedWord(name: string): string {
  if (name && RESERVED_WORDS.indexOf(name.toLowerCase()) > -1) {
    return `_${name}`
  }

  return name
}

export function generateScriptName(
  usedNames: Array<string>,
  variableName: string
): string {
  return replaceReservedWord(StringUtils.keyify(variableName, usedNames))
}



// WEBPACK FOOTER //
// ./src/activities/views/activities/scripttask/utils.js