import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Blank from '@/views/blank'

describe('Blank.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Blank, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
