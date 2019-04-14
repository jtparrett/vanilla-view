const Wow = () => {
  return createNode('h2', null, 'Nice one!');
};

const Form = () =>
  createNode(
    'form',
    {
      onSubmit: e => {
        e.preventDefault();
        console.log(e.target);
      }
    },
    createNode('input'),
    createNode('input'),
    createNode('input'),
    createNode('input'),
    createNode('button', { type: 'submit' }, 'nice'),
    Wow,
    NewTing
  );

const ShowCount = ({ count }) => createNode('h1', null, `Count: ${count}`);

const Test = () => {
  let count = 0;

  return render => {
    const onClick = () => {
      count = count + 1;
      render();
    };

    return createNode('div', { onClick }, ShowCount({ count }));
  };
};

const NewTing = () => {
  let state = 0;

  return render => {
    const onClick = () => {
      state = state + 1;
      render();
    };

    return state > 10 ? Form() : createNode('h2', { onClick }, state);
  };
};

const Ting = () => {
  let count = 0;

  return render => {
    const onClick = () => {
      count = count + 1;
      render();
    };

    return createNode('h1', { onClick }, `Fragment test! ${count}`);
  };
};

const App = createNode(
  'div',
  null,
  Test,
  Test,
  Test,
  Test,
  Test,
  Test,
  Test,
  Form,
  NewTing,
  Ting
);

const main = document.getElementById('main');
createNode(main, null, App);
