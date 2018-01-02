// @flow
import { map } from 'lodash'

/**
 * Removes inputs from activities of the specified type which have the specified key.
 * NOTE: This helper still uses backbone.
 */
export default function removeInputsWithKey(
  workflow: Object,
  activityType: string,
  inputKey: string
): void {
  if (!workflow || !activityType || !inputKey) {
    throw new Error('Missing paramters to remove inputs.')
  }
  workflow.get('activities').each(activity => {
    const type = activity.get('type')
    if (type.id === activityType) {
      const inputs = activity.get('inputs')
      if (inputs) {
        inputs.unset(inputKey)
      }
    }
  })
}



// WEBPACK FOOTER //
// ./src/processes/utils/removeInputsWithKey.js