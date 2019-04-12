(function() {
  const appendChild = (element, child) => {
    if (typeof child === "string" || typeof child === "number") {
      const textNode = document.createTextNode(child);
      return element.appendChild(textNode);
    }

    if (child instanceof Node) {
      return element.appendChild(child);
    }
  };

  const appendChildren = (element, children) => {
    if (Array.isArray(children)) {
      return children.forEach(child => {
        appendChildren(element, child);
      });
    }

    appendChild(element, children);
  };

  const createRoot = node => {
    if (node instanceof Node) {
      return node;
    }

    return document.createElement(node);
  };

  const assignProps = (element, props) => {
    Object.entries(props).forEach(([key, value]) => {
      if (key.indexOf("on") === 0) {
        const [_, event] = key.toLowerCase().split("on");
        return element.addEventListener(event, value);
      }

      element.setAttribute(key, value);
    });
  };

  window.render = (node, children, props) => {
    const element = createRoot(node);
    element.innerHTML = "";

    if (children !== undefined) {
      appendChildren(element, children);
    }

    if (props) {
      assignProps(element, props);
    }

    return element;
  };
})();
