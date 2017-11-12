const { h, render } = require('preact');
const App = require('./components/app');
const getStore = require('./store');

const div = document.getElementById('app')
const renderApp = store => render(h(App, { store }), div, div.lastChild);

getStore(renderApp);
div.classList.remove('loading');

if (module.hot) { module.hot.accept() }
