import { shallow } from 'enzyme';
import Label from './Label';

describe('Label', () => {
  it('should render children', () => {
    const component = shallow(<Label debug>email</Label>);
    expect(component.contains('email')).toEqual(true);
  });
});
