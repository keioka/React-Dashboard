import SidebarLeft from '@components/Sidebars/SidebarLeft';
import Main from './Main';

const history = createHistory();
describe('<Main />', () => {
  let component;
  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
      </Provider>,
    );
  });
  it('should render <SidebarLeft />', () => {
    expect(component.find(SidebarLeft)).toHaveLength(1);
  });

  it('should render footer', () => {
    expect(component.find('footer')).toHaveLength(1);
  });
});
