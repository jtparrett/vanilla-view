const withState = (propName, updaterName, initialState) => Component => () => {
  let state = initialState;

  const renderer = createNode('div');

  const render = () =>
    renderer(
      Component({
        [propName]: state,
        [updaterName]: updater
      })
    );

  const updater = value => {
    state = value;
    render();
  };

  return render();
};

const Foo = ({ setCount, count }) => {
  return createNode('p')(count, {
    onClick: () => {
      setCount(count + 1);
    }
  });
};

const Thing = withState('count', 'setCount', 0)(Foo);

const Wow = () => {
  return createNode('h2')('Nice one!');
};

const Form = () => {
  return createNode('form')(
    [
      createNode('input')(),
      createNode('input')(),
      createNode('input')(),
      createNode('input')(),
      createNode('button')('nice', { type: 'submit' }),
      Wow
    ],
    {
      onSubmit: e => {
        e.preventDefault();
        console.log(e.target);
      }
    }
  );
};

const ShowCount = ({ count }) => {
  return createNode('h1')(`Count: ${count}`);
};

const Test = () => {
  let count = 0;
  const renderer = createNode('div');

  const render = () => renderer(child({ count }));

  const onClick = () => {
    count = count + 1;
    render();

    if (count > 10) {
      renderer(Form);
    }
  };

  const child = props => {
    return createNode('div')(ShowCount(props), {
      onClick
    });
  };

  return render();
};

let state = 0;
const NewTing = render => {
  const onClick = () => {
    state = state + 1;
    render();
  };

  return state > 10 ? Form() : createNode('h2')(state, { onClick });
};

let wow = 0;
const Ting = render => {
  const onClick = () => {
    wow = wow + 1;
    render();
  };

  return createFragment()(
    createNode('h1')(`shit head! ${wow}`, {
      onClick
    })
  );
};

const App = createNode('div')([
  Test,
  Test,
  Test,
  Test,
  Test,
  Test,
  Thing,
  Test,
  Form,
  NewTing,
  Ting
]);

const main = document.getElementById('main');
createNode(main)(App);
