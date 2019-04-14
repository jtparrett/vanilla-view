(function() {
  const createChild = child => {
    if (typeof child === 'string' || typeof child === 'number') {
      return document.createTextNode(child);
    }

    if (child instanceof Node) {
      return child;
    }
  };

  const createRenderer = (element, children, index) => {
    const render = () => {
      const node = createChild(children(render));
      element.replaceChild(node, element.childNodes[index]);
    };

    return render;
  };

  const appendChildren = (element, children, prevIndex) => {
    let index = prevIndex || 0;

    if (Array.isArray(children)) {
      return children.map((child, i) => {
        return appendChildren(element, child, index + i);
      });
    }

    if (typeof children === 'function') {
      const render = createRenderer(element, children, index);
      return appendChildren(element, children(render), index);
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

  const assignProps = (element, props) => {
    Object.entries(props).forEach(([key, value]) => {
      if (key.indexOf('on') === 0) {
        const [_, event] = key.toLowerCase().split('on');
        return element.addEventListener(event, value);
      }

      element.setAttribute(key, value);
    });
  };

  window.createNode = (node, props, ...children) => {
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
})();
