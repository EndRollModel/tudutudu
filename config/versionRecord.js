const versionRecord = {
    '0.1.4-beta.1':{
      state: 'beta',
      date: '2024/01/09',
      info: '修復了群組內無法正常建立子項目的錯誤\r修改了memo的名稱為剪貼簿\r新增了主題顏色選擇功能\r後續的版號將正規化',
    },
    '0.1.3.8':{
        state: 'beta',
        date: '2023/12/19',
        info: '新增了一種新的MEMO類別, 修正了0.1.3.7的拖曳後如果刪除物件會錯誤的問題, 修正了一個字體會無法正確選擇的錯誤',
    },
    '0.1.3.7':{
      state: 'beta',
      date: '2023/12/16',
      info: '新增拖曳功能 修正產生物件時的順序可能會錯誤的問題',
    },
    "0.1.3.6":{
        state: 'beta',
        date : "2023/12/5",
        info : "修改齒輪點擊模式 將設定分開為多個功能「字型設定, 取消全部已選擇, 關於程式」 新增置頂功能"
    },
    "0.1.3.5":{
        state: 'beta',
        date : "2023/12/1",
        info : "修正顯示後 若有刪除項目後重啟存檔會讀取錯亂造成改名或是刪除會錯誤的問題 修正了開啟讀取圖片會無法正常顯示 看起來很卡的錯誤"
    }
}

module.exports = versionRecord;