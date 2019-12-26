import renderer from "react-test-renderer";
import React from "react";
import {configure, shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16';

import DeleteCity from './components/DeleteCity'

configure({adapter: new Adapter()});

test("should render DeleteCity", () => {
    const tree = shallow(<DeleteCity />)
    expect(toJson(tree)).toMatchSnapshot()
});
test("should render AddCity", () => {
    const tree = shallow(<DeleteCity />)
    expect(toJson(tree)).toMatchSnapshot()
});

