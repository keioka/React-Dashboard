import SidebarLeft from '@components/Sidebars/SidebarLeft';
import ListPosts from './ListPosts';
import withPostContainer from '@containers/PostContainer';

describe('<ListPosts />', () => {
  it('should render loding if its props "isLoading" true', () => {
    // const connectedComponent = withPostContainer(ListPosts);
    // store.dispatch({ type: '@POST/FETCH_REQUEST' });
    // const component = shallow(
    //   <connectedComponent />
    // );
    // expect(component.contains('<div>Loading...</div>')).toEqual(true);
  });
});
