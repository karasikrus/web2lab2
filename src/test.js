import renderer from "react-test-renderer";
import React from "react";
import jest from 'jest-mock';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import {shallowToJson} from "enzyme-to-json";

import {DeleteCity} from './components/DeleteCity'


test("should render", () => {
    const component = renderer.create(<DeleteCity/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

