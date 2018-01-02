// @flow
import { StringUtils } from '@signavio/effektif-commons/lib/utils'

export default function provideId(): string {
  let secondsSinceUnixEpoch = Math.floor(new Date().getTime() / 1000)

  return secondsSinceUnixEpoch.toString(36) + StringUtils.randomString()
}



// WEBPACK FOOTER //
// ./packages/workflows-app/src/variables/utils/provideId.js