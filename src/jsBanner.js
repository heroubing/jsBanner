function jsBanner (arr) {
    // 动态传入图片数组
    let imagesArr = arr;
    let length = imagesArr.length;
    // let imagesArr = ['../images/image-1.jpg', '../images/image-2.jpg', '../images/image-3.jpg', '../images/image-4.jpg'];
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
    let container = document.createElement('div');
    document.body.appendChild(container);
    addClassName(container, 'container');
    // 存放图片
    let image_div = document.createElement('div');
    image_div.id = 'images';
    container.appendChild(image_div);
    let image_ul = document.createElement('ul');
    image_ul.style.width=`${length*800}px`;
    image_div.appendChild(image_ul);
    for (let i = 0; i < length; i++) {
        let imageLi = document.createElement('li');
        image_ul.appendChild(imageLi);
        imageLi.innerHTML = '<img src="' + imagesArr[i] + '" ' + 'alt="轮播图片" />';
    }
    // 导航圆点
    let nav_div = document.createElement('div');
    nav_div.id = 'nav';
    container.appendChild(nav_div);
    let nav_ul = document.createElement('ul');
    nav_div.appendChild(nav_ul);
    for (let i = 0; i < length; i++) {
        let nav_li = document.createElement('li');
        nav_ul.appendChild(nav_li);
        nav_li.innerHTML = '<a>' + (i+1) + '</a>';
    }
    nav_ul.childNodes[0].childNodes[0].className = 'current';
    // 翻页< >
    let previous = document.createElement('div');
    previous.id = 'previous';
    container.appendChild(previous);
    previous.innerHTML = '&lt;';
    let next = document.createElement('div');
    next.id = 'next';
    container.appendChild(next);
    next.innerHTML = '&gt;';

    let index = 1; // 默认初始状态下展示第一张图片
    let animateTimer; // 定义动画定时器
    let timer; // 定义自动轮播定时器

    play(); // 开启自动轮播

    // 点击上一个按钮，ul数组整体右移
    previous.onclick = function () {
        init(index);
        index -= 1;
        if (index < 1) {
            index = length;
        }
        animate(800); // 添加右移移动过渡动画
        btnShow(index); // 定位当前图片显示圆点
    };

    // 点击下一个按钮，ul数组整体左移
    next.onclick = function () {
        init(index);
        index += 1;
        if (index > length) {
            index = 1;
        }
        animate(-800); // 添加左移移动过渡动画
        btnShow(index); // 定位当前图片显示圆点
    };

    // 显示当前圆点
    function btnShow (currentIndex) {
        let navList = nav_div.children[0];
        for (let i = 0; i < navList.children.length; i++) {
            navList.children[i].children[0].className = 'hidden';
        }
        navList.children[currentIndex - 1].children[0].className = 'current';
    }

    // 添加移动动画
    function animate (offset) {
        let leftValue = parseInt(image_ul.offsetLeft) + offset;
        if (leftValue > 0) {
            animation(-(length-1)*800);
        } else if (leftValue < -(length-1)*800) {
            animation(0);
        } else {
            animation(leftValue);
        }
    }

    // 动画过渡效果
    function animation (offset) {
        clearInterval(animateTimer);
        animateTimer = setInterval(function () {
            image_ul.style.left = image_ul.offsetLeft + (offset - image_ul.offsetLeft) / 10 + 'px';

            if (image_ul.offsetLeft - offset < 10 && image_ul.offsetLeft - offset > -10) {
                image_ul.style.left = offset + 'px';
                clearInterval(animateTimer);
                play();
            }
        }, 20);
    }

    // 自动轮播，设置每隔2秒调用next.onclick()方法，即每2秒播放一张图片
    function play () {
        timer = setInterval(function () {
            next.onclick();
        }, 2000);
    }

    // 初始化定时器及ul初始位置
    function init (current_Index) {
        clearInterval(timer);
        clearInterval(animateTimer);
        let current = (current_Index - 1) * 800;
        image_ul.style.left = -current + 'px';
    }

    // 鼠标滑过圆点标签定位到当前图片
    for (let i = 0; i < nav_ul.children.length; i++) {
        nav_ul.children[i].index = i;
        nav_ul.children[i].onmouseover = function () {
            index = this.index + 1;
            init(index);
            btnShow(index);
        };
        // 鼠标移出圆点自动继续播放
        nav_ul.children[i].onmouseout = function () {
            play();
        };
    }
}
exports.jsBanner = jsBanner;
