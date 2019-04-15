(function() {
  const getNextId = (() => {
    let baseId = 0;

    return () => {
      return baseId++;
    };
  })();

  const [getById, setToId] = (() => {
    const index = {};

    const get = id => {
      return index[id];
    };

    const set = (id, node) => {
      return (index[id] = node);
    };

    return [get, set];
  })();

  const createChild = child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return document.createTextNode(child);
    }

    if (child instanceof Node) {
      return child;
    }
  };

  const createRenderer = (element, children, id) => {
    const render = () => {
      const child = createChild(children(render));
      element.replaceChild(child, getById(id));
      setToId(id, child);
    };

    return render;
  };

  const appendChildren = (element, children) => {
    if (Array.isArray(children)) {
      return children.map(child => {
        return appendChildren(element, child);
      });
    }

    if (typeof children === 'function') {
      const id = getNextId();
      const render = createRenderer(element, children, id);
      const child = createChild(children(render));
      setToId(id, child);

      return appendChildren(element, child);
    }

    const node = createChild(children);
    return element.appendChild(node);
  };

  const createRoot = node => {
    if (node instanceof Node) {
      return node;
    }

    return document.createElement(node);
  };

  const assignStyles = (element, styles) => {
    Object.entries(styles).forEach(([attribute, value]) => {
      element.style[attribute] = value;
    });
  };

  const assignProps = (element, props) => {
    Object.entries(props).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();

      if (!(lowerKey in element)) {
        console.warn(
          `"${key}" is not a valid property of "${element.tagName.toLowerCase()}".`,
          element
        );
      }

      if (lowerKey.indexOf('on') === 0) {
        const [_, event] = lowerKey.split('on');
        element.addEventListener(event, value);
        return;
      }

      if (lowerKey === 'style') {
        assignStyles(element, value);
        return;
      }

      element.setAttribute(lowerKey, value);
    });
  };

  const createNode = (node, props, ...children) => {
    if (typeof node === 'function') {
      return node({ children, ...props });
    }

    const element = createRoot(node);

    element.innerHTML = '';

    if (children !== undefined) {
      appendChildren(element, children);
    }

    if (props) {
      assignProps(element, props);
    }

    return element;
  };

  const Fragment = ({ children }) => children;

  window.createNode = createNode;
  window.Fragment = Fragment;
})();
