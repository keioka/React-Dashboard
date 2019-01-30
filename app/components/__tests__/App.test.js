import App from "../App";

describe('<App />', () => {
  it('should render MapMain', () => {
    const wrapper = shallow(
      <App />
    )

    expect(wrapper.find('MapMain')).toBeTruthy()
  });
})
