import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import TestUnit from '@/views/test/components/TestUnit'

describe('TestUnit.vue', () => {
  it('通过显示msg', () => {
    const msg = 'new message'
    const wrapper = shallowMount(TestUnit, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })

  it('通过显示number', () => {
    const number = 44
    const wrapper = shallowMount(TestUnit, {
      propsData: { number }
    })
    expect(wrapper.text()).to.include(number)
  })
})
