window.addEventListener('load', function () {
    var food = document.querySelector('.food');
    var startBtn = document.querySelector('#startBtn');
    var stopBtn = document.querySelector('#stopBtn');
    var addipt = document.querySelector('#addipt');
    var addBtn = document.querySelector('#addBtn');
    var lchBtn = document.querySelector('#lchBtn');
    var snkBtn = document.querySelector('#snkBtn');
    var delBtn = document.querySelector('#delBtn');
    var delipt = document.querySelector('#delipt');
    var delSlt = document.querySelector('#delSlt');
    var fList = document.querySelector('#fList');

    var isStart = false

    // 食物数组初始值
    var lunch = ['混沌', '粉', '茄子', '辣椒炒肉'];
    var snacks = ['面', '馄饨', '饺子', '粉'];
    var arr = lunch;
    var foodArr = 'lunch';

    // 食物类型选择按钮
    snkBtn.addEventListener('click', function () {
        food.innerHTML = '正餐吃啥';
        initFood(snacks, 'snacks');
    });
    lchBtn.addEventListener('click', function () {
        food.innerHTML = '早餐吃啥';
        initFood(lunch, 'lunch');
    });

    // 选择食物类型
    function initFood(ftype, tname) {
        foodArr = tname;
        if (!localStorage.getItem(foodArr)) {
            arr = ftype;
        } else {
            arr = localStorage.getItem(foodArr).split(',');
        }
        if(fList.style.display === 'block') {
            getfoodList()
        }
    }

    // 添加食物模块
    addipt.addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
            addFoods();
        }
    });
    addBtn.addEventListener('click', function () {
        addFoods();
    });
    function addFoods() {
        if (!localStorage.getItem(foodArr)) {
            localStorage.setItem(foodArr, arr);
        }
        if (addipt.value === '') {
            alert('输入要吃的啊，不输怎么给你摇');
        } else {
            const foodList = localStorage.getItem(foodArr).split(',');
            const hasFood = foodList.find(v => v === addipt.value)
            if(hasFood) {
                alert('列表里已经存在该食物')
                return false
            }
            foodList.push(addipt.value)
            localStorage.setItem(foodArr, foodList);
            addipt.value = '';
            if(fList.style.display === 'block') {
                getfoodList()
            }
        }
    }

    // 主体显示部分
    function container() {
        // 若浏览器本地存储中没有该键值对，则把初始值写入本地存储中
        if (!localStorage.getItem(foodArr)) {
            localStorage.setItem(foodArr, arr);
        }
        // 从本地存储中获取数据
        var newArr = localStorage.getItem(foodArr);
        var fName = newArr.split(',');
        var index = getRandom(0, fName.length - 1);
        food.innerHTML = fName[index];
    }
    // 获取随机数
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // 开始和停止按钮
    startBtn.addEventListener('click', function () {
        if (isStart) return false
        isStart = true
        var timer = setInterval(container, 40);
        stopBtn.addEventListener('click', function () {
            isStart = false
            clearInterval(timer);
        });
    });

    // 删除部分食物模块
    function selectStart() {
        getfoodList()
        delSlt.style.transform = 'rotate(225deg)';
        fList.style.display = 'block';
        getfood(fList.childNodes)
    }

    function selectEnd() {
        delSlt.style.transform = 'rotate(45deg)';
        fList.style.display = 'none';
    }

    // delipt.addEventListener('blur', selectEnd)

    function getfood(nodes) {
        nodes.forEach(item => {
            item.addEventListener('click', () => {
                delipt.value = item.innerText
                selectEnd()
            })
        })
    }

    function getfoodList() {
        if (!localStorage.getItem(foodArr)) {
            localStorage.setItem(foodArr, arr);
        }
        const delArr = localStorage.getItem(foodArr).split(',');
        fList.innerHTML = ''
        delArr.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item
            fList.appendChild(li);
        })

    }

    delipt.addEventListener('focus', selectStart);
    delSlt.addEventListener('click', () => {
        if(fList.style.display === 'block') {
            selectEnd()
        } else {
            selectStart()
        }
    })
    delBtn.addEventListener('click', () => {
        if (delipt.value === '') {
            alert('请输入要删除的食物');
            return false
        }
        if(!localStorage.getItem(foodArr)) {
            alert('没东西可删了');
            return false
        }
        const delArr = localStorage.getItem(foodArr).split(',');
        const hasFood = delArr.find(v => v === delipt.value)
        if(!hasFood) {
            alert('列表里没有该食物')
            return false
        }
        const newList = delArr.filter(v => v !== delipt.value)
        delipt.value = ''
        localStorage.setItem(foodArr, newList)

        alert('删除成功')
    })

});