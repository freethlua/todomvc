const { div, form, input, label, button } = require('hyperchain/preact')({ style: require('./index.styl'), tagClass: true });

module.exports = ({ store }) => {

  const header = div.header('todos');

  const checkAll = div([
    input({
      id: 'checkAll',
      type: 'checkbox',
      checked: store.tasks.length && !store.tasks.some(task => !task.completed),
      onchange: e => store.tasks = store.tasks.map(task => Object.assign({}, task, {
        completed: e.target.checked
      }))
    }),
    label({ for: 'checkAll' }),
  ]);

  const newTaskInput = form.newTaskInput({
    onsubmit: e => {
      e.preventDefault();
      store.tasks.push({ text: e.target.querySelector('input').value });
    }
  }, [input({
    value: '',
    placeholder: 'What needs to be done?',
  })]);

  const tasksList = store.tasks.map((task, i) => div.taskWrapper({
    class: [
      task.completed && 'completed',
      task.editing && 'editing',
    ].filter(Boolean).join(' '),
  }, [
    div.checkbox([
      input({
        id: 'task-' + i,
        type: 'checkbox',
        checked: task.completed,
        onchange: e => task.completed = e.target.checked
      }),
      label({ for: 'task-' + i }),
    ]),
    div.task(task.editing
      ? form.editing({
        onsubmit: e => {
          e.preventDefault();
          Object.assign(task, {
            text: e.target.querySelector('input').value,
            editing: false,
          });
        },
      }, [input({
        value: task.text,
        ref: input => input && setTimeout(() => input.focus()),
        onblur: (e) => Object.assign(task, {
          text: e.target.value,
          editing: false,
        }),
      })])
      : div.text({
        ondblclick: () => task.editing = true
      }, task.text)),
    button.remove({ onclick: () => store.tasks.splice(i, 1) }, ['x']),
  ]));

  const itemsLeft = div.itemsLeft(`${store.tasks.filter(task=>!task.completed).length} items left`);

  const clearCompleted = div({
    class: !store.tasks.some(task => task.completed) ? 'hidden' : ''
  }, [button.clearCompleted({
    onclick: () => store.tasks = store.tasks.filter(task => !task.completed)
  }, ['Clear completed'])]);

  const toggleView = div.toggleView('all,active,completed'.split(/,/g).map(view => div({
    class: store.view === view ? 'active' : '',
  }, [
    input({
      type: 'radio',
      name: 'toggle-view',
      value: view,
      id: 'toggle-view-' + view,
      onclick: () => store.view = view,
      checked: (store.view && store.view === view) || view === 'all',
    }),
    label({ for: 'toggle-view-' + view }, [view])
  ])));

  const footer = div.footer([
    itemsLeft,
    toggleView,
    clearCompleted
  ]);

  return div.container({ class: 'view-' + (store.view || 'all') }, [
    div.heading(header),
    div.tasks([
      div.header([
        div.checkAll(checkAll),
        div.input(newTaskInput),
      ]),
      div.taskList(tasksList),
    ]),
    div.footer(footer),
  ])
};
