let addFeatBtn;
let tuduList;
let itemBlock;
let bodyBlock;

// elem
let addFeatTitleInput; // 輸入名稱的input內容 (feat)
let addFeatMemoInput; // 輸入Memo的input內容(feat)
let addItemTypeRadios; // 輸入種類的radio
let addTypeBtn; // 新增種類的按鈕
let addTuduInput; // 新增待辦事項的Input內容 (tuduItem)
let addTuduHidden; // 新增待辦事項的數值內容 (tuduItem)
let checkAddTudu; // 新增待辦事項的按鈕(於group中)
let editTuduInput; // 編輯群組或待辦input內容
let editTuduHidden; // 編輯群組或待辦的隱藏內容傳輸class用
let addInTitleInput; // 群組中新增的title
let addInInfoInput; // 群組中新增的memo
let addInHidden; // 群組中新增的隱藏內容
let checkAddInItemBtn; // 群組中新增按下確認的
let addInItemTypeRadios; // 群組中選擇的radio
let editMemoTitleInput; // memo的標題輸入
let editMemoInput; // memo的複製內容輸入
let editMemoBtn; // memo的新增按鈕
let editMemoHidden; // 編輯memo時的隱藏欄位
let editNameBtn; // 編輯名稱的內容
let delItemHidden; // 刪除的對象指定內容
let delItemBtn; // 刪除的按鈕
let settingModalTitle; // 設定的modal內容
let editPageInput; // 編輯分頁名稱用的內容
let editPageBtn; // 編輯分頁名稱確認按鈕
let editPageHidden; // 編輯分頁名稱內容
let delPageItemBtn; // 刪除分頁確定按鈕
let delPageItemHidden; // 刪除分頁隱藏內容

// dropdown
let addFeatDropdownMenu;

let pageGroup; // 分頁群組
let pageItemGroup; // 分頁分組的內容
let pagePlus; // 分頁的新增按鈕
let addPageButton; // 分頁的新增確定按鈕
let addPageInput; // 分頁的名稱輸入

const typeList = {
    group: 'group',
    tuduItem: 'tuduItem',
    memoItem: 'memoItem',
}

// modal
let addFeatModal; // 新增群組或是TuduItem的modal
let addTuduItemModel; // 由群組新增TuduItem的modal
let addInItemModal; // 群組內新增用的modal
let editNameModal; // 編輯名稱時用的modal
let editMemoModal; // 編輯memo用的modal
let delItemModal; // 刪除時的modal
let addPageModal; // 分頁用的modal
let editPageModal; // 分頁編輯用的modal
let delPageModal; // 分頁刪除用的modal

let allUserData = [];
let userChooseData = [];

let firstOpen = true;

/** 清除使用者的資料 **/
function cleanUserData() {
    userChooseData = [];
}

let choosePageId = -1;

/**
 * 建立群組或是待辦元件的function
 // * @param {number} obj.action 0 = 'create' = 畫面建立時 , 1 = 'join' 後續加入時使用
 * @param {number} obj.type 要加入的對象type 0 = 群組  1 = 待辦
 * @param {string} obj.id  要建立的id
 * @param {string} obj.title 要建立的title
 * @param {number} obj.inSort 在列表中的排序順序
 * @param {number} obj.outSort 在列表中的排序順序
 * @param {boolean} obj.save save 建立時是否要儲存
 */
function addFeatData(obj) {
    // type, id, title, save = false
    const save = obj.save;
    if (save === false) return;
    const type = Object.hasOwn(obj, 'type') ? obj.type : null;
    const id = Object.hasOwn(obj, 'id') ? obj.id : null;
    const title = Object.hasOwn(obj, 'title') ? obj.title : null;
    const memo = Object.hasOwn(obj, 'memo') ? obj.memo : null;
    const outSort = Object.hasOwn(obj, 'outSort') ? obj.outSort : null;
    const inSort = Object.hasOwn(obj, 'inSort') ? obj.inSort : null;

    const updateData = {};
    switch (type) {
        case 0: // group
            updateData.type = 0;
            updateData.id = id;
            updateData.targetId = -1;
            updateData.title = title;
            updateData.outSort = outSort;
            updateData.inSort = inSort;
            break;
        case 1: // tudu
            updateData.type = 1;
            updateData.id = id;
            updateData.targetId = -1;
            updateData.title = title;
            updateData.time = '99:99';
            updateData.outSort = outSort;
            updateData.inSort = inSort;
            break;
        case 2: // memo
            updateData.type = 2;
            updateData.id = id;
            updateData.targetId = -1;
            updateData.title = title;
            updateData.memo = memo
            updateData.outSort = outSort;
            updateData.inSort = inSort;
            break;
    }
    userChooseData.push(updateData);
}

/**
 * 將資料放進Group中
 * @param {String}  obj.targetId 若指定則將此tudu放入置群組中
 * @param {String}  obj.id 此tuduitem id
 * @param {number}  obj.type 此tuduitem type 1 = 待辦
 * @param {String}  obj.title 標題
 * @param {String}  obj.time 如有記憶時間
 * @param {String}  obj.checked 是否已完成 目前僅建立需求 都會是無
 * @param {String}  obj.meme memo
 * @param {String}  obj.inSort 在列表中 如果於群組中就是群組中的index
 * @param {String}  obj.outSort 在列表中 如果是最外層的順序就是index
 * @param {String | undefined}  obj.memo 備註 目前還不需要 但僅記錄用
 * @param {String}  obj.save 是否存檔
 */
function pushGroupData(obj) {
    // action, targetId, id, type, title, time, memo = null,checked save = false
    const save = obj.save;
    if (save === false) return;
    const targetId = Object.hasOwn(obj, 'targetId') ? obj.targetId : 'null';
    const type = Object.hasOwn(obj, 'type') ? obj.type : 'null';
    const id = Object.hasOwn(obj, 'id') ? obj.id : 'null';
    const title = Object.hasOwn(obj, 'title') ? obj.title : 'null';
    const time = Object.hasOwn(obj, 'time') ? obj.time : 'null';
    const checked = Object.hasOwn(obj, 'checked') ? obj.checked : false;
    const memo = Object.hasOwn(obj, 'memo') ? obj.memo : 'null';
    const inSort = Object.hasOwn(obj, 'inSort') ? obj.inSort : 'null';
    const outSort = Object.hasOwn(obj, 'outSort') ? obj.outSort : 'null';

    const item = {}
    switch (type) {
        case 1:
            item.type = 1;
            item.id = id;
            item.title = title;
            item.time = time;
            item.checked = checked;
            item.targetId = targetId;
            item.inSort = inSort;
            item.outSort = outSort;
            break;
        case 2:
            item.type = 2;
            item.id = id;
            item.title = title;
            item.memo = memo;
            item.targetId = targetId;
            item.outSort = outSort;
            item.inSort = inSort;
            break;
        default:
            break
    }
    userChooseData.push(item);
}

/**
 * 讀取資料建立畫面上元素的方法
 * @return {Promise<void>}
 */
async function createUserElem() {
    if (userChooseData.length === 0) return;
    userChooseData
        .filter(e => e.outSort !== -1)
        .sort((a, b) => a.outSort - b.outSort)
        .forEach((data) => {
            switch (data.type) {
                case 0:
                    addGroupItem(data.title, data.id);
                    break;
                case 1:
                    addTuduItem(-1, data.title, data.id, data.checked, data.time);
                    break;
                case 2:
                    addMemoItem(-1, data.id, data.title, data.memo)
                    break;
            }
        })
    userChooseData
        .filter(e => e.inSort !== -1)
        .sort((a, b) => a.inSort - b.inSort)
        .forEach((data) => {
            switch (data.type) {
                case 1:
                    addTuduItem(data.targetId, data.title, data.id, data.checked, data.time);
                    break;
                case 2:
                    addMemoItem(data.targetId, data.id, data.title, data.memo)
                    break;
            }
        })
}


/**
 * 取得分頁資料的內容
 */
function loadPageData() {
    (async () => {
        bodyBlock = document.querySelector('.body-block');
        // 讀取userData
        const loadUserData = await window.userFeat.loadUserData();
        if (firstOpen) allUserData = loadUserData; // 取得所有資料
        allUserData.sort((a, b) => a.sort - b.sort)
        cleanUserData(); // 清除使用者資料
        const selectedIndex = allUserData.findIndex((p) => p.selected === true)
        choosePageId = allUserData[selectedIndex].pageId;
        if (allUserData.length > 0) {
            const getPageIdIndex = allUserData.findIndex((p) => p.pageId === choosePageId)
            userChooseData.push(...allUserData[getPageIdIndex].pageData)
        }
        firstOpen = false

        // page-select-group
        pageItemGroup = document.querySelector('.page-item-group');
        if (allUserData.length !== pageItemGroup.children.length) {
            if (allUserData.length < pageItemGroup.children.length) {
                // 刪除了分頁的狀況
                pageItemGroup.innerHTML = '';
            }
            // 若所有資料與 目前畫面上數量不符代表尚未讀取 讀取該內容
            allUserData.forEach((page) => {
                const pageItem = document.createElement('div');
                pageItem.className = 'page-item';
                pageItem.textContent = page.pageName;
                pageItem.setAttribute('id', page.pageId)
                if (page.selected) {
                    pageItem.classList.add('page-selected')
                }
                pageItem.addEventListener('click', pageSelectEnv);
                pageItem.addEventListener('contextmenu', pageDropdownEnv)
                pageItemGroup.append(pageItem)
            })
        }
        pagePlus = document.querySelector('.page-plus');
        addPageModal = new bootstrap.Modal(document.getElementById('addPageModal'))
        pagePlus.addEventListener('click', () => {
            addPageModal.show();
        });
        addPageButton = document.getElementById('addPageBtn');
        addPageInput = document.getElementById('addPageInput');
        addPageButton.addEventListener('click', () => {
            if (addPageInput.value.trim() === '') {
                addPageInput.placeholder = '內容不能為空白'
            } else {
                addPageItem(addPageInput.value);
                addPageInput.value = '';
                addPageModal.hide();
            }
        });
        // modal
        addFeatModal = new bootstrap.Modal(document.getElementById('addFeatModal'));
        addTuduItemModel = new bootstrap.Modal(document.getElementById('addTuduItem'));
        editNameModal = new bootstrap.Modal(document.getElementById('editName'));
        editMemoModal = new bootstrap.Modal(document.getElementById('editMemoModal'));
        delItemModal = new bootstrap.Modal(document.getElementById('delItemModal'));
        addInItemModal = new bootstrap.Modal(document.getElementById('addInItemModal'));

        editPageModal = new bootstrap.Modal(document.getElementById('editPageModal'))
        delPageModal = new bootstrap.Modal(document.getElementById('delPageModal'))

        addFeatBtn = document.getElementById('addFeatBtn');
        tuduList = document.getElementById('tudulist');
        itemBlock = document.getElementsByClassName('item-block');
        const itemBlockElem = document.querySelector(`.item-block`)
        itemBlockElem.innerHTML = '';
        /**
         * 背景滑鼠按鍵事件偵測
         */
        // bodyBlock.addEventListener('mouseup', async (ev) => {
        //     ev.preventDefault();
        //     if (ev.button === 2) {
        //         const allDropdowns = document.querySelectorAll('.dropdown-menu');
        //         allDropdowns.forEach(item => {
        //             if (item !== addFeatDropdownMenu) {
        //                 item.style.display = 'none';
        //             }
        //         });
        //
        //         const dropAddItem = document.getElementById('DropAddItem')
        //         dropAddItem.addEventListener('click', function(e){
        //             addFeatModal.show()
        //         })
        //
        //         // 設置顯示的位置
        //         addFeatDropdownMenu.style.left = ev.clientX + 'px';
        //         addFeatDropdownMenu.style.top = ev.clientY + 'px';
        //
        //         // 顯示 dropdown
        //         addFeatDropdownMenu.style.display = 'block';
        //
        //         // 點擊其他地方時隱藏 dropdown
        //         document.addEventListener('click', function hideDropdown() {
        //             addFeatDropdownMenu.style.display = 'none';
        //             document.removeEventListener('click', hideDropdown);
        //         });
        //     }
        // })

        addFeatDropdownMenu = document.getElementById('addFeatDropDown');
        // 由最外層按下的按鈕新增的事件
        // modal 新增群組按鈕
        // modal tudu新增按鈕
        // modal 新增按鈕(改為radio選擇)
        addFeatTitleInput = document.getElementById('addFeatTitleInput');
        addFeatMemoInput = document.getElementById('addFeatMemoInput');
        addFeatMemoInput.style.display = 'none';
        addItemTypeRadios = document.querySelectorAll('input[name="addItemTypeRadio"]');
        addItemTypeRadios.forEach(function (radio) {
            radio.addEventListener('change', () => {
                switch (radio.value) {
                    case typeList.group:
                        addFeatMemoInput.style.display = 'none';
                        break;
                    case typeList.tuduItem:
                        addFeatMemoInput.style.display = 'none';
                        break;
                    case typeList.memoItem:
                        addFeatMemoInput.style.display = 'flex';
                        break;
                }
            })
        })
        addTypeBtn = document.getElementById('addTypeBtn');
        addTypeBtn.addEventListener('click', () => {
            addItemTypeRadios.forEach(function (radio) {
                if (radio.checked) {
                    let addItem = false;
                    switch (radio.value) {
                        case typeList.group:
                            if (addFeatTitleInput.value.trim() === '') {
                                addFeatTitleInput.placeholder = '內容不能為空白'
                                return;
                            }
                            addGroupItem(addFeatTitleInput.value, null, true);
                            addFeatTitleInput.value = ''; // 清除
                            addItem = true;
                            break;
                        case typeList.tuduItem:
                            if (addFeatTitleInput.value.trim() === '') {
                                addFeatTitleInput.placeholder = '內容不能為空白'
                                return;
                            }
                            addTuduItem(-1, addFeatTitleInput.value, null, false, null, true);
                            addFeatTitleInput.value = ''; // 清除
                            addItem = true;
                            break;
                        case typeList.memoItem:
                            if (addFeatTitleInput.value.trim() === '') {
                                addFeatTitleInput.placeholder = '內容不能為空白'
                                return;
                            }
                            if (addFeatMemoInput.value.trim() === '') {
                                addFeatMemoInput.placeholder = '內容不能為空白'
                                return;
                            }
                            addMemoItem(-1, null, addFeatTitleInput.value, addFeatMemoInput.value, true);
                            addFeatTitleInput.value = ''; // 清除
                            addFeatMemoInput.value = ''; // 清除
                            addItem = true;
                            break;
                    }
                    if (addItem) {
                        updateUserData();
                        addFeatModal.hide();
                    }
                }
            })
        })

        // 由群組新增按鈕事件
        // 新增 tudu
        addTuduInput = document.getElementById('addTuduInput')
        addTuduHidden = document.getElementById('addTuduHidden');
        checkAddTudu = document.getElementById('checkAddTudu');
        checkAddTudu.addEventListener('click', () => {
            if (addTuduInput.value.trim() === '') {
                addTuduInput.placeholder = '內容不能為空白'
                return;
            }
            addTuduItem(addTuduHidden.getAttribute('boxId'), addTuduInput.value, null, false, null, true);
            addTuduInput.value = ''; // 清除
            updateUserData();
            addTuduItemModel.hide();
        })
        addInHidden = document.getElementById('addInHidden')
        addInTitleInput = document.getElementById('addInTitleInput')
        addInInfoInput = document.getElementById('addInInfoInput')
        addInInfoInput.style.display = 'none';
        checkAddInItemBtn = document.getElementById('checkAddInItemBtn');
        addInItemTypeRadios = document.querySelectorAll(`[name='addInItemTypeRadio']`)
        addInItemTypeRadios.forEach((radio) => {
            radio.addEventListener('change', () => {
                switch (radio.value) {
                    case typeList.tuduItem:
                        addInInfoInput.style.display = 'none';
                        break;
                    case typeList.memoItem:
                        addInInfoInput.style.display = 'flex';
                        break;
                }
            })
        })
        checkAddInItemBtn.addEventListener('click', (ev) => {
            addInItemTypeRadios.forEach((radio) => {
                if (radio.checked) {
                    if (addInTitleInput.value.trim() === '') {
                        addInTitleInput.placeholder = '內容不能為空白'
                        return;
                    }
                    switch (radio.value) {
                        case typeList.tuduItem:
                            addTuduItem(addInHidden.getAttribute('boxId'), addInTitleInput.value, null, false, null, true);
                            addInTitleInput.value = ''; // 清除
                            break;
                        case typeList.memoItem:
                            if (addInInfoInput.value.trim() === '') {
                                addInInfoInput.placeholder = '內容不能為空白'
                                return;
                            }
                            addMemoItem(addInHidden.getAttribute('boxId'), null, addInTitleInput.value, addInInfoInput.value, true)
                            addInTitleInput.value = '';
                            addInInfoInput.value = '';
                            break;
                    }
                    updateUserData();
                    addInItemModal.hide();
                }
            })
        })

        // 編輯名稱 edit
        editTuduInput = document.getElementById('editTuduInput');
        editTuduHidden = document.getElementById('editTuduHidden');
        editNameBtn = document.getElementById('editNameBtn');
        editNameBtn.addEventListener('click', () => {
            if (editTuduInput.value.trim() === '') {
                editTuduInput.placeholder = '內容不能為空白'
                return;
            }
            editItemName(editTuduHidden.getAttribute('target'), editTuduHidden.getAttribute('parentItem'), editTuduInput.value);
            editTuduHidden.removeAttribute('target');
            editTuduHidden.removeAttribute('parentItem');
            editNameModal.hide();
        });
        //
        editMemoHidden = document.getElementById('editMemoHidden');
        editMemoTitleInput = document.getElementById('editMemoTitleInput')
        editMemoInput = document.getElementById('editMemoInput')
        editMemoBtn = document.getElementById('editMemoBtn')
        editMemoBtn.addEventListener('click', () => {
            editItemName(editMemoHidden.getAttribute('target'), editMemoHidden.getAttribute('parentItem'), editMemoTitleInput.value, editMemoInput.value);
            editMemoModal.hide();
        })
        // 刪除 del
        delItemHidden = document.getElementById('delItemHidden')
        delItemBtn = document.getElementById('delItemBtn');
        delItemBtn.addEventListener('click', () => {
            delItem(document.getElementById('delItemHidden').getAttribute('target'));
            delItemModal.hide();
        })
        // 分頁編輯
        editPageHidden = document.getElementById('editPageHidden');
        editPageInput = document.getElementById('editPageInput');
        editPageBtn = document.getElementById('editPageBtn');
        editPageBtn.addEventListener('click', () => {
            editPageName(document.getElementById('editPageHidden').value);
        })
        // 分頁刪除
        delPageItemBtn = document.getElementById('delPageItemBtn');
        delPageItemHidden = document.getElementById('delPageItemHidden');
        delPageItemBtn.addEventListener('click', () => {
            delPageItem(document.getElementById('delPageItemHidden').getAttribute('target'));
        })
        await createUserElem();
        // 拖曳元件
        // group不能放入group內
        // tuduItem可以放到group內或是拉到itemBlock中
        creatSortable(itemBlock[0], 'itemBlock', 'itemBlock');
        creatPageSortable(pageItemGroup);
        updateUserData();
    })()
}

/**
 * 進入後讀取一次主頁面的內容
 */
document.addEventListener('DOMContentLoaded', function () {
    loadPageData();
})

/**
 * 加入sortable
 * @param obj
 * @param groupName
 * @param typeName
 */
function creatSortable(obj, groupName, typeName) {
    const sortable = new Sortable(obj, {
        group: groupName,
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        handle: '[data-bs-toggle="dropdown"]',
        onMove: function (evt, originalEvent) {
            // Example: https://jsbin.com/nawahef/edit?js,output
            if (evt.dragged.classList.contains('item-box') &&
                (evt.related.parentElement.classList.contains('collapse') ||
                    evt.related.parentElement.classList.contains('item-box'))) {
                // group不可被放入至group中
                return false;
            }
        },
        onEnd: function (evt) {
            if (evt.from.className !== evt.to.className) {
                // 跨class移動 不存在有沒有移動Index的問題 一律有移動
                if (evt.to.className === 'item-block') {
                    // 內層至外層
                    const fromClass = evt.from.className.replace(/ /g, '.')
                    Object.values(document.querySelector(`.${fromClass}`).children).forEach((elem, index) => {
                        // from : collapse : inSort
                        const dataIndex = userChooseData.findIndex(e => e.id === elem.id)
                        userChooseData[dataIndex].inSort = index;
                        userChooseData[dataIndex].outSort = -1;
                    })
                    Object.values(document.querySelector(`.item-block`).children).forEach((elem, index) => {
                        // to : item-block : outSort
                        const dataIndex = userChooseData.findIndex(e => e.id === elem.id)
                        userChooseData[dataIndex].outSort = index;
                        userChooseData[dataIndex].inSort = -1;
                        if (userChooseData[dataIndex].targetId !== -1) {
                            // 拉出去的物件會有targetId 所以清空
                            userChooseData[dataIndex].targetId = -1
                        }
                    })
                } else {
                    // 外層至內層
                    Object.values(document.querySelector(`.item-block`).children).forEach((elem, index) => {
                        // from : item-block : outSort
                        const dataIndex = userChooseData.findIndex(e => e.id === elem.id)
                        userChooseData[dataIndex].outSort = index;
                        userChooseData[dataIndex].inSort = -1;
                    })
                    const fromClass = evt.to.className.replace(/ /g, '.')
                    Object.values(document.querySelector(`.${fromClass}`).children).forEach((elem, index) => {
                        // to : collapse : inSort
                        const dataIndex = userChooseData.findIndex(e => e.id === elem.id)
                        userChooseData[dataIndex].inSort = index
                        userChooseData[dataIndex].outSort = -1
                        if (userChooseData[dataIndex].targetId === -1) {
                            // 拉進來的物件會沒有collapse的容器id 所以要補上id給他
                            const match = evt.to.className.match(/collapse-block-(\d+)/);
                            const number = match ? match[1] : null;
                            userChooseData[dataIndex].targetId = `itemBoxId${number}`
                        }
                    })
                }
                updateUserData();
            } else {
                // 同一個class內移動
                if (evt.oldIndex !== evt.newIndex) {
                    // 不同一個index表示有移動 需要紀錄否則不用
                    switch (true) {
                        case evt.to.className === 'item-block':
                            // 所有網頁的位置元素直接記錄下來
                            Object.values(document.querySelector('.item-block').children).forEach((elem, index) => {
                                const dataIndex = userChooseData.findIndex(e => e.id === elem.id)
                                userChooseData[dataIndex].outSort = index;
                            })
                            break;
                        case evt.to.classList.contains('collapse'):
                            const className = evt.to.className.replace(/ /g, '.')
                            Object.values(document.querySelector(`.${className}`).children).forEach((elem, index) => {
                                const dataIndex = userChooseData.findIndex(e => e.id === elem.id);
                                userChooseData[dataIndex].inSort = index
                            })
                            break;
                    }
                    updateUserData();
                }
            }
        },
    })
}

/**
 * 建立分頁滑動
 * @param obj
 */
function creatPageSortable(obj) {
    const sortable = new Sortable(obj, {
        group: "pageGroup",
        animation: 150,
        swapThreshold: 0.65,
        onEnd: function (evt) {
            // const allPage = document.querySelector('.page-item-group').children;
            const allPage = Array.from(pageItemGroup.children);
            for (let i = 0; i < allPage.length; i++) {
                const pageId = allPage[i].getAttribute('id');
                const findPageIdIndex = allUserData.findIndex((e) => e.pageId.toString() === pageId.toString());
                allUserData[findPageIdIndex].sort = i;
                updateUserData()
            }
        }
    })
}

/**
 * 選項被勾選
 * @param targetId
 * @param checked
 * @param time
 */
function updateItemChecked(targetId, checked, time) {
    const targetIndex = userChooseData.findIndex(e => e.id === targetId);
    userChooseData[targetIndex].checked = checked;
    userChooseData[targetIndex].time = time;
    updateUserData();
}

/**
 * 編輯物件的名稱
 * @param target
 * @param parent
 * @param title
 * @param memo
 */
function editItemName(target, parent, title, memo = null) {
    const targetItem = document.querySelector(`${target}`);
    targetItem.textContent = title;
    const itemIndex = userChooseData.findIndex(e => e.id === parent.replace(/[#.]/g, ''));
    userChooseData[itemIndex].title = title;
    if (memo != null) {
        userChooseData[itemIndex].memo = memo
    }
    updateUserData();
}

/**
 * 刪除物件
 * @param target 刪除的對象
 */
function delItem(target) {
    const targetItem = document.querySelector(`${target}`);
    // 刪掉之前先檢查是在哪個區塊 讓區塊重新整理
    if (targetItem.parentElement.className === 'item-block') {
        // 重新整理外部的index
        Object.values(document.querySelector(`.item-block`).children).forEach((elem, index) => {
            // item-block : outSort
            const dataIndex = userChooseData.findIndex(e => e.id === elem.id)
            userChooseData[dataIndex].outSort = index;
            userChooseData[dataIndex].inSort = -1;
        })
    } else {
        // 內層結構
        const fromClass = targetItem.parentElement.className.replace(/ /g, '.')
        Object.values(document.querySelector(`.${fromClass}`).children).forEach((elem, index) => {
            // collapse : inSort
            const dataIndex = userChooseData.findIndex(e => e.id === elem.id)
            userChooseData[dataIndex].inSort = index
            userChooseData[dataIndex].outSort = -1
        })
    }
    targetItem.remove();
    const itemIndex = userChooseData.findIndex(e => e.id === target.replace(/[#.]/g, ''))
    userChooseData.splice(itemIndex, 1);
    updateUserData();
}

/**
 * 建立群組用的function
 * @param title {String}  group中顯示的title
 * @param id {String} 如果有id 就依照id建立
 * @param save {boolean} 是否存檔
 */
function addGroupItem(title = null, id = null, save = false) {
    if (title == null) {
        title = document.getElementById('addFeatName').value;
    }
    //add itemblock => item-box => tudu-g-item => collapse-switch &
    let itemIndex = 0;
    let notUse = false;
    while (!notUse) {
        if (document.querySelector(`#itemBoxId${itemIndex}`) === null) {
            const checkNoUse = userChooseData.findIndex(e => e.id === `itemBoxId${itemIndex}`) === -1
            if (checkNoUse) {
                notUse = true
            } else {
                itemIndex++;
            }
        } else {
            itemIndex++;
        }
    }
    if (id != null) {
        itemIndex = parseInt(id.replace('itemBoxId', ''))
    }

    // 最外圍的itemBox
    const itemBox = document.createElement('div');
    itemBox.className = `item-box`;
    itemBox.id = `itemBoxId${itemIndex}`
    // 內圈groupItem
    const groupItem = document.createElement('div');
    groupItem.className = 'tudu-g-item';
    // 展開的圖標區塊
    const collapseSwitchBox = document.createElement('div');
    collapseSwitchBox.className = 'collapse-switch-box';
    const collapseSwitch = document.createElement('img');
    collapseSwitch.src = './resource/img/chevron-right.svg';
    collapseSwitch.setAttribute('data-bs-toggle', 'collapse');
    collapseSwitch.setAttribute('data-bs-target', `.collapse-block-${itemIndex}`);
    collapseSwitch.setAttribute('aria-expanded', `true`);
    // 文字區
    const groupTitle = document.createElement('div');
    groupTitle.className = `tudu-g-title group-title-${itemIndex}`;
    groupTitle.textContent = title;
    // 選項內容
    const groupOption = document.createElement('div');
    groupOption.className = 'tudu-g-option';
    // 選項的圖片
    const optionImg = document.createElement('img');
    optionImg.className = 'tudu-item-option dropdown-toggle'
    optionImg.src = './resource/img/list.svg';
    optionImg.setAttribute('data-bs-toggle', 'dropdown')
    optionImg.setAttribute('data-bs-auto-close', 'true')
    optionImg.setAttribute('aria-expanded', 'false')
    // 選項的內容
    const optionsBlock = document.createElement('ul');
    optionsBlock.className = 'dropdown-menu';
    optionsBlock.setAttribute('aria-labelledby', 'defaultDropdown');
    const optionsAdd = document.createElement('li');
    optionsAdd.className = 'dropdown-item';
    optionsAdd.textContent = '新增';
    optionsAdd.addEventListener('click', () => {
        // addTuduHidden.setAttribute('boxIndex', `${itemIndex}`)
        // addTuduHidden.setAttribute('boxId', itemBox.id)
        // addTuduItemModel.show();
        addInHidden.setAttribute('boxId', itemBox.id);
        addInItemModal.show();
    })
    const optionsEdit = document.createElement('li');
    optionsEdit.className = 'dropdown-item';
    optionsEdit.textContent = '編輯名稱';
    optionsEdit.addEventListener('click', () => {
        document.getElementById('editTuduInput').value = groupTitle.textContent; // 把值設定上去
        document.getElementById('editTuduHidden').setAttribute('target', `.group-title-${itemIndex}`);
        document.getElementById('editTuduHidden').setAttribute('parentItem', `#${itemBox.id}`);
        // new bootstrap.Modal(document.getElementById('editName')).show()
        editNameModal.show();
    })
    const optionsSetting = document.createElement('li');
    optionsSetting.className = 'dropdown-item';
    optionsSetting.textContent = '設定';
    optionsSetting.addEventListener('click', () => {
    })
    const optionsDel = document.createElement('li');
    optionsDel.className = 'dropdown-item';
    optionsDel.textContent = '刪除';
    optionsDel.addEventListener('click', () => {
        document.getElementById('delTitleText').textContent = `確定要刪除「${groupTitle.textContent}」嗎？`
        document.getElementById('delItemHidden').setAttribute('target', `#${itemBox.id}`)
        delItemModal.show();
    })
    // 裝下方可摺疊的區塊
    const collapseBlock = document.createElement('div');
    collapseBlock.className = `collapse`;
    collapseBlock.classList.add(`collapse-block-${itemIndex}`);
    collapseBlock.addEventListener('show.bs.collapse', () => {
        collapseSwitchBox.classList.add('rotated-show');
        collapseSwitchBox.classList.remove('rotated-hide');
    });
    collapseBlock.addEventListener('hide.bs.collapse', () => {
        collapseSwitchBox.classList.add('rotated-hide');
        collapseSwitchBox.classList.remove('rotated-show');
    });

    // 將三個option先新增至選項內內
    optionsBlock.appendChild(optionsAdd);
    optionsBlock.appendChild(optionsEdit);
    // optionsBlock.appendChild(optionsSetting); 暫時還不需要這個
    optionsBlock.appendChild(optionsDel);
    groupOption.appendChild(optionsBlock);
    groupOption.appendChild(optionImg);
    //
    collapseSwitchBox.appendChild(collapseSwitch)
    // 添加捲軸 標題 更多按鈕
    groupItem.appendChild(collapseSwitchBox);
    groupItem.appendChild(groupTitle);
    groupItem.appendChild(groupOption);
    // 添加進box
    itemBox.appendChild(groupItem);
    itemBox.appendChild(collapseBlock);
    itemBlock[0].appendChild(itemBox);

    groupItem.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        groupOption.click();
    })

    const outSortIndex = itemBlock[0].childElementCount - 1;
    addFeatData({
        type: 0,
        save: save,
        id: itemBox.id,
        title: groupTitle.textContent,
        outSort: outSortIndex,
        inSort: -1,
    });
    creatSortable(collapseBlock, 'itemBlock', 'collapse')
}

/**
 * 建立TuduItem用的function
 * @param boxId {String | number} 如果在Group內 需傳入是在第幾個的Group內
 * @param title {String} title
 * @param objectId {String} 如果有id就依照此id建立
 * @param checked {boolean} 是否勾選
 * @param time {String} 是否有指定過時間
 * @param save {boolean} 是否要存檔
 */
async function addTuduItem(boxId = null, title, objectId = null, checked = false, time = '99:99', save = false) {
    let isGroup = (typeof boxId === 'string')

    let itemIndex = 0;
    let notUse = false;
    while (!notUse) {
        if (document.querySelector(`#tuduItemId${itemIndex}`) === null) {
            const checkNoUsed = userChooseData.findIndex(e => e.id === `tuduItemId${itemIndex}`) === -1;
            if (checkNoUsed) {
                notUse = true;
            } else {
                itemIndex++;
            }
        } else {
            itemIndex++;
        }
    }

    if (objectId !== null) {
        itemIndex = objectId.replace('tuduItemId', '');
    }

    const tuduItem = document.createElement('div');
    tuduItem.className = `tudu-item`;
    tuduItem.id = `tuduItemId${itemIndex}`
    if (isGroup) {
        // tuduItem.setAttribute('boxIndex', itemIndex.toString());
        tuduItem.setAttribute('boxId', boxId);
    }

    const tuduTitle = document.createElement('div')
    tuduTitle.textContent = title;
    tuduTitle.className = `tudu-item-title-${itemIndex}`;
    tuduTitle.id = `tudu-item-title-${itemIndex}`;

    const tuduTime = document.createElement('div');
    tuduTime.className = 'tudu-item-time';
    if (time === '99:99' || time == null) {
        tuduTime.style.color = 'transparent'
        tuduTime.textContent = '99:99'
    } else {
        tuduTime.style.color = 'red'
        tuduTime.textContent = time;
    }

    const tuduCheck = document.createElement('input');
    tuduCheck.type = 'checkbox';
    tuduCheck.className = 'tudu-item-check';
    if (checked) {
        tuduCheck.checked = true
    }
    tuduCheck.addEventListener('change', (e) => {
        (async () => {
            if (e.target.checked) {
                tuduTime.textContent = `${await window.timeFeat.timeFormat(Date.now())}`;
                tuduTime.style.color = 'red'
            } else {
                tuduTime.textContent = '99:99'
                tuduTime.style.color = 'transparent'
            }
            updateItemChecked(tuduItem.id, e.target.checked, tuduTime.textContent);
        })()
    })

    const tuduItemOption = document.createElement('div');
    tuduItemOption.className = 'tudu-item-option';
    const optionImg = document.createElement('img');
    optionImg.src = './resource/img/list.svg';
    optionImg.setAttribute('data-bs-toggle', 'dropdown')
    optionImg.setAttribute('data-bs-auto-close', 'true')
    optionImg.setAttribute('aria-expanded', 'false')
    const optionsBlock = document.createElement('ul');
    optionsBlock.className = 'dropdown-menu';
    optionsBlock.setAttribute('aria-labelledby', 'defaultDropdown');
    const optionsEdit = document.createElement('li');
    optionsEdit.className = 'dropdown-item';
    optionsEdit.textContent = '編輯名稱';
    optionsEdit.addEventListener('click', () => {
        document.getElementById('editTuduInput').value = tuduTitle.textContent; // 把值設定上去
        document.getElementById('editTuduHidden').setAttribute('target', `.tudu-item-title-${itemIndex}`);
        document.getElementById('editTuduHidden').setAttribute('parentItem', `#${tuduItem.id}`);
        // new bootstrap.Modal(document.getElementById('editName')).show()
        editNameModal.show();
    })
    const optionsDel = document.createElement('li');
    optionsDel.className = 'dropdown-item';
    optionsDel.textContent = '刪除';
    optionsDel.addEventListener('click', () => {
        document.getElementById('delTitleText').textContent = `確定要刪除「${tuduTitle.textContent}」嗎？`
        // document.getElementById('delItemHidden').setAttribute('target', `#tuduItemId${itemIndex}`)
        document.getElementById('delItemHidden').setAttribute('target', `#${tuduItem.id}`)
        delItemModal.show();
    })

    // 加入區塊
    optionsBlock.appendChild(optionsEdit);
    optionsBlock.appendChild(optionsDel);
    tuduItemOption.appendChild(optionsBlock);
    tuduItemOption.appendChild(optionImg);

    // 追加項目內的東西
    tuduItem.appendChild(tuduCheck);
    tuduItem.appendChild(tuduTitle);
    tuduItem.appendChild(tuduTime);
    tuduItem.appendChild(tuduItemOption);

    if (isGroup) {
        const boxIndex = boxId.replace(/itemBoxId/g, '')
        const collapseBlock = document.querySelector(`.collapse-block-${boxIndex}`)
        if (!collapseBlock.classList.contains('show')) {
            new bootstrap.Collapse(collapseBlock).show();
        }
        collapseBlock.appendChild(tuduItem)
        const inSortIndex = collapseBlock.children.length - 1
        pushGroupData({
            save: save,
            targetId: boxId,
            id: tuduItem.id,
            type: 1,
            title: tuduTitle.textContent,
            time: tuduTime.textContent,
            inSort: inSortIndex,
            outSort: -1,
        }); // 新增在群組中tuduItem的資料
    } else {
        itemBlock[0].appendChild(tuduItem);
        const outSortIndex = itemBlock[0].childElementCount - 1;
        addFeatData({
            save: save,
            targetId: -1,
            type: 1,
            id: tuduItem.id,
            title: tuduTitle.textContent,
            outSort: outSortIndex,
            inSort: -1,
        }); // 新增在外部的tuduItem資料
    }
}

/**
 * memo的item
 * @param boxId {String | number} 如果在Group內 需傳入是在第幾個的Group內
 * @param title {String} title
 * @param objectId {String} 如果有id就依照此id建立
 * @param memo {String} 需要複製的對象
 * @param save {boolean} 是否要存檔
 */
async function addMemoItem(boxId = null, objectId = null, title, memo = null, save = false) {
    let isGroup = (typeof boxId === 'string')
    let memoIdName = `memoItemId`

    let itemIndex = 0;
    let notUse = false;
    while (!notUse) {
        if (document.querySelector(`#${memoIdName}${itemIndex}`) === null) {
            const checkNoUsed = userChooseData.findIndex(e => e.id === `${memoIdName}${itemIndex}`) === -1;
            if (checkNoUsed) {
                notUse = true;
            } else {
                itemIndex++;
            }
        } else {
            itemIndex++;
        }
    }

    if (objectId !== null) {
        itemIndex = objectId.replace(memoIdName, '');
    }

    const memoItem = document.createElement('div');
    memoItem.className = `memo-item`;
    memoItem.setAttribute('data-bs-toggle', 'popover');
    memoItem.id = `${memoIdName}${itemIndex}`
    if (isGroup) {
        // tuduItem.setAttribute('boxIndex', itemIndex.toString());
        memoItem.setAttribute('boxId', boxId);
    }

    memoItem.addEventListener('mouseup', (ev) => {
        (async () => {
            ev.preventDefault();
            if (ev.button === 2) {
                const dataIndex = userChooseData.findIndex((item) => item.id === memoItem.id);
                await copyData(userChooseData[dataIndex].memo.toString());
            }
        })()
    })

    async function copyData(data) {
        await window.clipboardFunc.writeClipboard(data)
        const memePopover = new bootstrap.Popover(memoItem, {
            content: '已複製至剪貼簿',
            placement: 'auto',
        })
        memePopover.show();
        document.querySelectorAll('.popover-body').forEach((body) => {
            body.style.fontFamily = document.body.style.fontFamily
        });
        setTimeout(() => {
            memePopover.dispose();
        }, 1000);
    }

    const memoTitle = document.createElement('div')
    memoTitle.textContent = title;
    memoTitle.className = `memo-item-title-${itemIndex}`;
    memoTitle.id = `memo-item-title-${itemIndex}`;

    const memoInfo = document.createElement('div');
    memoInfo.style.display = 'none';
    memoInfo.setAttribute('memoInfo', memo);

    const memoSpan = document.createElement('div');
    memoSpan.className = 'memo-span'
    memoSpan.style.width = '15px';
    memoSpan.style.height = '1px';

    const memoItemOption = document.createElement('div');
    memoItemOption.className = 'memo-item-option';

    const optionImg = document.createElement('img');
    optionImg.src = './resource/img/list.svg';
    optionImg.setAttribute('data-bs-toggle', 'dropdown')
    optionImg.setAttribute('data-bs-auto-close', 'true')
    optionImg.setAttribute('aria-expanded', 'false')
    const optionsBlock = document.createElement('ul');
    optionsBlock.className = 'dropdown-menu';
    optionsBlock.setAttribute('aria-labelledby', 'defaultDropdown');
    const optionCopyTitle = document.createElement('li'); // 複製title
    optionCopyTitle.className = 'dropdown-item';
    optionCopyTitle.textContent = '複製標題至剪貼簿';
    optionCopyTitle.addEventListener('click', () => {
        (async () => {
            await window.clipboardFunc.writeClipboard(title.toString());
        })()
    })
    const optionsCopyInfo = document.createElement('li') // 複製內容
    optionsCopyInfo.className = 'dropdown-item';
    optionsCopyInfo.textContent = '複製內容至剪貼簿';
    optionsCopyInfo.addEventListener('click', () => {
        (async () => {
            await window.clipboardFunc.writeClipboard(memo.toString());
        })()
    })
    const optionsEdit = document.createElement('li');
    optionsEdit.className = 'dropdown-item';
    optionsEdit.textContent = '編輯';
    optionsEdit.addEventListener('click', (ev) => {
        document.getElementById('editMemoTitleInput').value = memoTitle.textContent; // 把值設定上去
        const memoDataIndex = userChooseData.findIndex((item) => item.id === memoItem.id);
        let memoData;
        if (memoDataIndex === -1) {
            memoData = memo
        } else {
            memoData = userChooseData[memoDataIndex].memo;
        }
        document.getElementById('editMemoInput').value = memoData; // 把值設定上去
        document.getElementById('editMemoHidden').setAttribute('parentItem', `#${memoItem.id}`);
        document.getElementById('editMemoHidden').setAttribute('target', `.memo-item-title-${itemIndex}`);
        editMemoModal.show();
    })
    const optionsDel = document.createElement('li');
    optionsDel.className = 'dropdown-item';
    optionsDel.textContent = '刪除';
    optionsDel.addEventListener('click', () => {
        document.getElementById('delTitleText').textContent = `確定要刪除「${memoTitle.textContent}」嗎？`
        document.getElementById('delItemHidden').setAttribute('target', `#${memoItem.id}`)
        delItemModal.show();
    })

    // 加入區塊
    optionsBlock.appendChild(optionCopyTitle);
    optionsBlock.appendChild(optionsCopyInfo);
    optionsBlock.appendChild(optionsEdit);
    optionsBlock.appendChild(optionsDel);
    memoItemOption.appendChild(optionsBlock);
    memoItemOption.appendChild(optionImg);

    // 追加項目內的東西
    memoItem.appendChild(memoSpan.cloneNode(true));
    memoItem.appendChild(memoTitle);
    // memoItem.appendChild(memoSpan.cloneNode(true));
    memoItem.appendChild(memoItemOption);

    if (isGroup) {
        const boxIndex = boxId.replace(/itemBoxId/g, '')
        const collapseBlock = document.querySelector(`.collapse-block-${boxIndex}`)
        if (!collapseBlock.classList.contains('show')) {
            new bootstrap.Collapse(collapseBlock).show();
        }
        collapseBlock.appendChild(memoItem)
        const inSortIndex = collapseBlock.children.length - 1;
        pushGroupData({
            save: save,
            targetId: boxId,
            id: memoItem.id,
            type: 2,
            title: memoTitle.textContent,
            memo: memo,
            inSort: inSortIndex,
            outSort: -1,
        }); // 新增在群組中tuduItem的資料
    } else {
        itemBlock[0].appendChild(memoItem);
        const outSortIndex = itemBlock[0].childElementCount - 1;
        addFeatData({
            save: save,
            targetId: -1,
            type: 2,
            id: memoItem.id,
            title: memoTitle.textContent,
            memo: memo,
            outSort: outSortIndex,
            inSort: -1,
        }); // 新增在外部的tuduItem資料
    }
}

/**
 * 新增分頁的內容
 * @param pageName
 */
function addPageItem(pageName) {
    let pageIndex = 0;
    let notUse = false;
    while (!notUse) {
        console.log(pageIndex)
        const checkNoUse = allUserData.findIndex(e => e.pageId === pageIndex) === -1
        if (checkNoUse) {
            notUse = true
        } else {
            pageIndex++;
        }
    }
    const pageItem = document.createElement('div');
    pageItem.className = 'page-item';
    pageItem.textContent = pageName;
    pageItem.setAttribute('id', pageIndex);
    pageItem.addEventListener('click', pageSelectEnv);
    pageItem.addEventListener('contextmenu', pageDropdownEnv);
    // 選項內容
    const newPage = {};
    newPage.pageId = pageIndex;
    newPage.pageName = pageName;
    newPage.sort = allUserData.length;
    newPage.pageData = [];
    newPage.selected = false;
    allUserData.push(newPage);
    pageItemGroup.append(pageItem);
    updateUserData();
}

/**
 * 選擇分頁時的動作
 * @param elem
 */
function pageSelectEnv(elem) {
    // const allPage = document.querySelector('.page-item-group').children;
    const allPage = Array.from(pageItemGroup.children);
    // 如果已經帶有被選擇的屬性 則不做任何事情
    if (!elem.target.classList.contains('page-selected')) {
        for (let i = 0; i < allPage.length; i++) {
            allPage[i].className = 'page-item';
            allUserData[i].selected = false;
        }
        elem.target.classList.add('page-selected');
        const pageId = parseInt(elem.target.getAttribute('id'));
        const findSelectId = allUserData.findIndex((e) => e.pageId === pageId)
        allUserData[findSelectId].selected = true;
        loadPageData(pageId);
    }
}

/**
 * 更換分頁名稱的動作
 */
function editPageName() {
    // 取得名稱
    const pageId = editPageHidden.getAttribute('target');
    // 更換列表中的名字
    const pageItems = Array.from(pageItemGroup.children);
    for (let i = 0; i < pageItems.length; i++) {
        if (pageItems[i].getAttribute('id') === pageId) {
            pageItems[i].textContent = editPageInput.value;
            editPageModal.hide()
        }
    }
    // 更換資料的內容
    allUserData.forEach((e) => {
        if (e.pageId === parseInt(pageId)) {
            e.pageName = editPageInput.value;
        }
    })
    editPageInput.value = '';
    // 儲存
    updateUserData();
}

/**
 * 分頁功能右鍵的事件處理
 * @param elem
 */
function pageDropdownEnv(elem) {
    elem.preventDefault();
    const contextMenu = document.getElementById('pageContentMenu')
    const dropEditItem = document.createElement('div');
    dropEditItem.className = 'dropdown-item'
    dropEditItem.textContent = '編輯名稱';
    dropEditItem.addEventListener('click', () => {
        editPageHidden.setAttribute('target', elem.target.getAttribute('id'));
        editPageModal.show();
    })
    const dropDelItem = document.createElement('div');
    dropDelItem.addEventListener('click', () => {
        delPageItemHidden.setAttribute('target', elem.target.getAttribute('id'));
        delPageModal.show()
    });
    document.getElementById('delPageTitleText').textContent = `確定要刪除分頁\n「${elem.target.textContent}」？`;
    dropDelItem.className = 'dropdown-item'
    dropDelItem.textContent = '刪除';
    contextMenu.innerHTML = ''; // 禁止重複加入先清空
    contextMenu.append(dropEditItem);
    contextMenu.append(dropDelItem);
    // 計算選單應該出現的位置
    contextMenu.style.display = 'block';
    const clickX = elem.clientX;
    const clickY = elem.clientY;
    const menuHeight = contextMenu.offsetHeight;
    const menuWidth = contextMenu.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    if (clickY + menuHeight > windowHeight) {
        contextMenu.style.top = `${clickY - menuHeight}px`;
    } else {
        contextMenu.style.top = `${clickY}px`;
    }
    // 判斷是否需要向左彈出
    if (clickX + menuWidth > windowWidth) {
        contextMenu.style.left = `${clickX - menuWidth}px`;
    } else {
        contextMenu.style.left = `${clickX}px`;
    }
    document.addEventListener('click', () => {
        // 點擊其他地方隱藏選單
        contextMenu.style.display = 'none';
    });
}

/**
 * 刪除分頁事件
 * @param pageId
 */
function delPageItem(pageId) {
    // 刪除時必須注意是否該內容被選擇 若是 則選擇刪除後的第一個內容為被選擇對象 重新讀取內容
    const pageIndex = allUserData.findIndex((p) => p.pageId === parseInt(pageId));
    if (allUserData[pageIndex].selected === true) {
        if (pageIndex === 0) {
            allUserData[1].selected = true;
        } else {
            allUserData[0].selected = true;
        }
    }
    allUserData.splice(pageIndex, 1);
    loadPageData();
    delPageModal.hide();
}

/**
 * 儲存資料一次
 */
function updateUserData() {
    // userChooseData, choosePageId
    allUserData.forEach((userData, i) => {
        if (userData.pageId.toString() === choosePageId.toString()) {
            allUserData[i].pageData = userChooseData;
        }
    })
    window.userFeat.saveUserData(allUserData);
}

/**
 * 0.1.5棄用此方法
 * 此方法僅對應0.1.3.7版本以前的資料
 * @deprecated
 * 需要加上排列順序
 * @param {array}data
 */
function resetData(data) {
    let checkIsReset = data.some(e => Object.hasOwn(e, 'outSort') || Object.hasOwn(e, 'inSort'))
    if (checkIsReset === true) return data;
    let groupList = []; // 整理所有的列表
    let outSortIndex = 0; //
    data.forEach((elem, i) => {
        switch (elem.type) {
            case 0:
                // 如果是群組 將id加入群組 並且增加外部index
                data[i].outSort = outSortIndex;
                data[i].inSort = -1;
                groupList.push({id: elem.id, count: 0});
                outSortIndex++;
                break;
            case 1:
                if (elem.targetId === -1) {
                    data[i].outSort = outSortIndex
                    data[i].inSort = -1
                    outSortIndex++;
                } else {
                    const groupIndex = groupList.findIndex((e) => e.id === elem.targetId);
                    data[i].inSort = groupList[groupIndex].count;
                    data[i].outSort = -1;
                    groupList[groupIndex].count++;
                }
                break;
        }
    })
    window.userFeat.saveUserData(data); //更新資料後直接儲存一次
    return data;
}
