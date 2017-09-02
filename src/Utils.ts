export function elem(tag, parent?, inner?, classes?, id?) {
    const node = document.createElement(tag);
    if (parent) {
        parent.appendChild(node);
    }
    if (inner) {
        node.innerHTML = inner;
    }
    if (classes) {
        if (Array.isArray(classes)) {
            classes.forEach((cl) => {
                node.classList.add(cl);
            });
        } else {
            node.classList.add(classes);
        }
    }
    if (id) {
        node.id = id;
    }
    return node;
}