/* Copyright 2012 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

console.log("popup");
/*
var url = location.search.match(/[&?]file=([^&]+)/i);
if (url) {
  url = decodeURIComponent(url[1]);
  document.body.textContent = url;
  // Set cursor to end of the content-editable section.
  window.getSelection().selectAllChildren(document.body);
  window.getSelection().collapseToEnd();

  // TODO: 在这里（popup.html+popup.js）里加一个按钮，用来“手动开始记录这个pdf的阅读进度”。
}*/

window.addEventListener("load", popupOnLoad);

function popupOnLoad(){
  document.getElementById("optionsUpload").addEventListener("click", turnToUpload);
  document.getElementById("optionsDownload").addEventListener("click", turnToDownload);
  document.getElementById("optionsButton").addEventListener("click", turnToOptions);
  showTodayReport();
}
function turnToDownload(){
  var a = document.createElement('a');          // 创建一个a节点插入的document
  var event = new MouseEvent('click')           // 模拟鼠标click点击事件
  a.download = 'beautifulGirl'                  // 设置a节点的download属性值
  a.href = 'chrome-extension://kflfdambahhmoghmalngnehlhlccbohm/pageAction/ReadmeS3.png';                                 // 将图片的src赋值给a节点的href
  a.dispatchEvent(event)                        // 触发鼠标点击事件                
}
function turnToUpload() {

    var file = document.getElementById('optionsUpload').files

    // console.log(file);

    var reader = new FileReader();

    // console.log(reader);

    reader.readAsText(file, 'utf-8');

    reader.onload = function () {
        console.log( reader.result);
    }
}
function turnToOptions(){
  chrome.tabs.create({url: "chrome://extensions/?options=gnpijndnjicgjlnfkkcfjdphbfaocgjm"});
}

function showTodayReport() {
  let box = document.getElementById("todayBookList");
  let today = load("rmBooksToday");
  let total = 0;
  for (let i in today.history){
    let book = today.history[i];
    let div = document.createElement("div");
    div.setAttribute("class", "bookToday");
    div.innerText = book.title + " : " + book.pages + "p";
    box.appendChild(div);
    total += book.pages;
  }
  let totalbox = document.getElementById("todayReportTotal");
  totalbox.innerText = "Total : " + total + "p";
}