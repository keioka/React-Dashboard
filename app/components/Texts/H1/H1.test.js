import { shallow } from 'enzyme';

import H1 from './H1';

describe('H1', () => {
  it('should render children', () => {
    const component = shallow(<H1 debug>hello</H1>);
    expect(component.contains('hello')).toEqual(true);
  });
});
