const { h } = require('preact');
const { shallow, deep } = require('preact-render-spy');
const chain = require('chain-free');
const td = require('testdouble');
const Component = require('.');

describe('basic', () => {
  let component;
  beforeEach(() => component = shallow(h(Component, { store: { tasks: [] } })));
  it('snapshot', () => expect(component.output()).toMatchSnapshot());
});

describe('User interaction', () => {
  it('Adds a task', () => {
    const store = { tasks: [] };
    const component = deep(h(Component, { store }))
    const form = component.find('.newTaskInput')
    const text = 'test'
    const chained = chain(() => () => {}, { value: () => text });
    form.simulate('submit', chained);
    expect(store).toMatchObject({ tasks: [{ text }] })
  });
  it('Deletes a task', () => {
    const store = { tasks: [{ text: 'test' }] };
    const component = deep(h(Component, { store }))
    const remove = component.find('.remove')
    remove.simulate('click');
    expect(store).toMatchObject({ tasks: [] })
  });
  it('Marks a task as checked', () => {
    const store = { tasks: [{ text: 'test' }] };
    const component = deep(h(Component, { store }))
    const checkbox = component.find('.checkbox').find('input');
    checkbox.simulate('change', { target: { checked: true } });
    expect(store).toMatchObject({ tasks: [{ text: 'test', completed: true }] });
  });
  it('Marks all tasks as checked', () => {
    const store = { tasks: [{ text: 'test' }] };
    const component = deep(h(Component, { store }))
    const checkAll = component.find('#checkAll');
    checkAll.simulate('change', { target: { checked: true } });
    expect(store).toMatchObject({ tasks: [{ text: 'test', completed: true }] });
  });
  it('Double click makes task editable', () => {
    const store = { tasks: [{ text: 'test' }] };
    const component = deep(h(Component, { store }))
    const taskUneditableBox = component
      .find('.taskWrapper')
      .find('.task')
      .find('.text');
    // console.log(`taskUneditableBox:`, taskUneditableBox);
    taskUneditableBox.simulate('dblclick');
    expect(store).toMatchObject({ tasks: [{ text: 'test', editing: true }] });
  });
  it('Double click makes task editable', () => {
    const store = { tasks: [{ text: 'test' }] };
    const component = deep(h(Component, { store }))
    const taskUneditableBox = component
      .find('.taskWrapper')
      .find('.task')
      .find('.text');
    // console.log(`taskUneditableBox:`, taskUneditableBox);
    taskUneditableBox.simulate('dblclick');
    expect(store).toMatchObject({ tasks: [{ text: 'test', editing: true }] });
  });
});
