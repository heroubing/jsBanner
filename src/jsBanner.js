(function () {
    // 为元素添加className
    function addClassName (element, value) {
        if (!element.className) {
            element.className = value;
        } else {
            let newClassName = element.className;
            newClassName = newClassName + ' ' + value;
            element.className = newClassName;
        }
    }
    // 最外层div
    let container = document.createElement('div');
    document.body.appendChild(container);
    addClassName(container, 'container');
    // images，存放图片
    let images = document.createElement('div');
    images.id = 'images';
    container.appendChild(images);
}());