// const Copy = value => render("p", value);

// const Title = render("h1", "Hello World!");

// const Tabs = tabs => {
//   const CurrentTabNode = render("div", tabs[0]);

//   const Menu = render(
//     "div",
//     tabs.map((_, key) => {
//       return render("button", `Tab ${key}`, {
//         onClick: () => {
//           render(CurrentTabNode, tabs[key]);
//         }
//       });
//     })
//   );

//   return [Menu, CurrentTabNode];
// };

// const Carousel = items => {
//   const slides = items.map(item => {
//     return render("div", item, {
//       class: "carousel__item"
//     });
//   });

//   const track = render("div", slides, {
//     class: "carousel__track"
//   });

//   const reRenderTrack = index => {
//     render(track, slides, {
//       class: "carousel__track",
//       style: `transform: translateX(-${index * 100}%)`
//     });
//   };

//   let index = 0;
//   return render("div", track, {
//     class: "carousel",
//     onClick: () => {
//       index = ++index % (items.length - 1);
//       reRenderTrack(index);
//     }
//   });
// };

// const Shop = () => {
//   const el = render("div");

//   fetch("https://j-parre.myshopify.com/products.json")
//     .then(d => d.json())
//     .then(({ products }) => {
//       const items = products.map(product => {
//         return render("div", [render("p", product.title)]);
//       });

//       render(el, items);
//     });

//   return el;
// };

// const App = render("div", [
//   Title,
//   Copy("Wow it works 123"),
//   render("p", "nice one"),
//   Tabs([render("p", "Tab 1"), render("p", "Tab 2"), render("p", "Tab 3")]),
//   Carousel(
//     Array.from(Array(10)).map((_, key) => {
//       return render("img", null, {
//         src: `https://picsum.photos/500/300?${key}`
//       });
//     })
//   ),
//   Shop()
// ]);

const Wow = () => {
  return createNode('h2')('Nice one!');
};

const Form = () => {
  return createNode('form')([
    createNode('input'),
    createNode('input'),
    createNode('input'),
    createNode('input'),
    createNode('button')('nice', { type: 'submit' }),
    createNode(null)(Wow())
  ]);
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

const App = createNode('div')([Test, Test, Test, Test, Test, Test]);

const main = document.getElementById('main');
createNode(main)(App);
