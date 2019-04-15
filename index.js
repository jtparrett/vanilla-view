const Wow = () => {
  return createNode('h2', null, 'Nice one!');
};

const Form = () => {
  return createNode(
    'form',
    {
      onSubmit: e => {
        e.preventDefault();
        console.log(e.target);
      }
    },
    createNode('input', { type: 'password' }),
    createNode('input'),
    createNode('input'),
    createNode('input'),
    createNode('button', { type: 'submit' }, 'nice'),
    createNode(Wow),
    createNode(NewTing)
  );
};

const ShowCount = ({ count }) => createNode('h1', null, `Count: ${count}`);

const Test = () => {
  let count = 0;

  return render => {
    const onClick = () => {
      count = count + 1;
      render();
    };

    return createNode('div', { onClick }, createNode(ShowCount, { count }));
  };
};

const NewTing = () => {
  let state = 0;

  return render => {
    const onClick = () => {
      state = state + 1;
      render();
    };

    return state > 10 ? createNode(Form) : createNode('h2', { onClick }, state);
  };
};

const Ting = props => {
  let count = 0;

  return render => {
    const onClick = () => {
      count = count + 1;
      render();
    };

    return createNode('h1', { onClick }, `Fragment test! ${count}`);
  };
};

const Child = ({ onClick, state }) => {
  return [
    createNode('h2', { onClick }, `Child Test ${state}`),
    createNode('h2', { onClick }, `Child Test 2 ${state}`)
  ];
};

const ChildTest = () => {
  let state = 1;

  return render => {
    const onClick = () => {
      state = state + 1;
      render();
    };

    return createNode('div', null, createNode(Child, { onClick, state }));
  };
};

const App = () =>
  createNode(
    'div',
    null,
    createNode(Test),
    createNode(Test),
    createNode(Test),
    createNode(Ting),
    createNode(Test),
    createNode(Test),
    createNode(Test),
    createNode(Test),
    createNode(Form),
    createNode(NewTing),
    createNode(Ting),
    createNode(ChildTest)
  );

const main = document.getElementById('main');
createNode(main, null, createNode(App));
