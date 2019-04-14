const Wow = () => {
  return createNode('h2', 'Nice one!');
};

const Form = () =>
  createNode(
    'form',
    [
      createNode('input'),
      createNode('input'),
      createNode('input'),
      createNode('input'),
      createNode('button', 'nice', { type: 'submit' }),
      Wow
    ],
    {
      onSubmit: e => {
        e.preventDefault();
        console.log(e.target);
      }
    }
  );

const ShowCount = ({ count }) => createNode('h1', `Count: ${count}`);

const Test = () => {
  let count = 0;

  return render => {
    const onClick = () => {
      count = count + 1;
      render();
    };

    return createNode('div', ShowCount({ count }), {
      onClick
    });
  };
};

const NewTing = () => {
  let state = 0;

  return render => {
    const onClick = () => {
      state = state + 1;
      render();
    };

    return state > 10 ? Form() : createNode('h2', state, { onClick });
  };
};

const Ting = () => {
  let count = 0;

  return render => {
    const onClick = () => {
      count = count + 1;
      render();
    };

    return createFragment(
      createNode('h1', `Fragment test! ${count}`, {
        onClick
      })
    );
  };
};

const App = createNode('div', [
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
]);

const main = document.getElementById('main');
createNode(main, App);
