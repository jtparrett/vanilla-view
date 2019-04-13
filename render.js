(function() {
  const appendChild = (element, child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      const textNode = document.createTextNode(child);
      return element.appendChild(textNode);
    }

    if (child instanceof Node) {
      return element.appendChild(child);
    }

    if (typeof child === 'function') {
      return element.appendChild(child());
    }
  };

  const appendChildren = (element, children) => {
    if (Array.isArray(children)) {
      return children.map(child => {
        return appendChildren(element, child);
      });
    }

    return appendChild(element, children);
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

  window.createNode = node => {
    const element = createRoot(node);

    const render = (children, props) => {
      if (!node) {
        // Hack for fragments
        return appendChildren({ appendChild: e => e }, children);
      }

      element.innerHTML = '';

      if (children !== undefined) {
        appendChildren(element, children);
      }

      if (props) {
        assignProps(element, props);
      }

      return element;
    };

    return render;
  };
})();
