import test from 'ava'
import _ from 'lodash/fp'

import BN from '../../lib/bn'
import BillMath from '../../lib/bill_math'

const cartridges = [
  {denomination: BN(5), count: 3},
  {denomination: BN(10), count: 3}
]

const cartridges2 = [
  {denomination: BN(20), count: 3},
  {denomination: BN(50), count: 4}
]

function convert (a) {
  if (!a) return a
  const convert = r => _.isNumber(r) ? r : r.toNumber()
  return _.map(_.mapValues(convert), a)
}

test('t1', t => {
  t.deepEqual(convert(BillMath.makeChange(cartridges, BN(15))), [
    {denomination: 5, count: 1},
    {denomination: 10, count: 1}
  ])
})

test('t2', t => {
  t.falsy(convert(BillMath.makeChange(cartridges, BN(3))))
})

test('t3', t => {
  t.falsy(convert(BillMath.makeChange(cartridges, BN(7))))
})

test('t4', t => {
  t.falsy(convert(BillMath.makeChange(cartridges, BN(17))))
})

test('t5', t => {
  t.falsy(convert(BillMath.makeChange(cartridges, BN(50))))
})

test('t6', t => {
  t.deepEqual(convert(BillMath.makeChange(cartridges, BN(40))), [
    {denomination: 5, count: 2},
    {denomination: 10, count: 3}
  ])
})

test('t6', t => {
  t.deepEqual(convert(BillMath.makeChange(cartridges, BN(20))), [
    {denomination: 10, count: 2}
  ])
})

test('t7', t => {
  t.deepEqual(convert(BillMath.makeChange(cartridges2, BN(60))), [
    {denomination: 20, count: 3}
  ])
})
