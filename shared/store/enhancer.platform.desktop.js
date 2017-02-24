// @flow
import DevTools from '../desktop/renderer/redux-dev-tools'
import {batchedSubscribe} from 'redux-batched-subscribe'
import {compose, applyMiddleware} from 'redux'
import {enableStoreLogging} from '../local-debug'
import {throttle} from 'lodash'

const debounceNotify = throttle(notify => notify(), 200)

export default function storeEnhancer (middleware: Array<any>): Function {
  if (enableStoreLogging) {
    return compose(applyMiddleware(...middleware), DevTools.instrument(), batchedSubscribe(debounceNotify))
  }

  return compose(applyMiddleware(...middleware), batchedSubscribe(debounceNotify))
}
