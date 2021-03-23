import { expectType } from 'tsd'
import { sum, multiply } from './math'

expectType<number>(sum([1, 2, 3]))
expectType<number>(multiply([1, 2, 3]))
