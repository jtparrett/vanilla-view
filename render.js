(function() {
  const appendChild = (element, child, index) => {
    if (typeof child === 'string' || typeof child === 'number') {
      const textNode = document.createTextNode(child);
      return element.appendChild(textNode);
    }

    if (child instanceof Node) {
      return element.appendChild(child);
    }

    if (typeof child === 'function') {
      const render = () => {
        element.replaceChild(child(render), element.childNodes[index]);
      };
      return element.appendChild(child(render));
    }
  };

  const appendChildren = (element, children, prevIndex) => {
    let index = prevIndex || -1;
    if (Array.isArray(children)) {
      return children.map(child => {
        index++;
        return appendChildren(element, child, index);
      });
    }

    return appendChild(element, children, index);
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

  // Fragment Hack
  window.createFragment = () => {
    return children => {
      return appendChildren({ appendChild: e => e }, children);
    };
  };
})();
