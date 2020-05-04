"use strict";function ownKeys(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(a),!0).forEach(function(t){_defineProperty(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function _defineProperty(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(t,e):void 0}}function _iterableToArray(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}var utils=function(){var B={root:$("#modal"),dialog:$("#modal-dialog"),title:$("#modal-title"),btn:"",closeBtn:$("#modal-title + .close"),body:$("#modal-body"),footer:$("#modal-footer"),data:{},action:function(){},show:function(){},shown:function(){},hide:function(){},hidden:function(){},loading:function(t,e){var a=0<arguments.length&&void 0!==t?t:'<i class="fas fa-sync fa-spin mr-2"></i>Memproses...',n=!(1<arguments.length&&void 0!==e)||e;!1===a?($("#modal-btn").html(B.btn).prop("disabled",!1),$('[data-dismiss="modal"]').prop("disabled",!1)):($("#modal-btn").html(a).prop("disabled",!0),$('[data-dismiss="modal"]').prop("disabled",!0),n&&B.error(!1))},error:function(t,e){var a=0<arguments.length&&void 0!==t&&t,n=!(1<arguments.length&&void 0!==e)||e;!1===a?$("#modal-error").hide():($("#modal-error").html('<div class="px-3 py-2"><i class="fas fa-exclamation-triangle mr-2"></i>'.concat(a,"</div>")).slideDown(),n&&B.loading(!1))}};return B.root.modal("hide").on("show.bs.modal",function(t){B.closeBtn.prop("disabled",!1),$('[data-toggle="tooltip"]').tooltip("hide"),$.fn.selectpicker&&B.root.find(".selectpicker").selectpicker("render"),$.fn.scrollbar&&B.root.find(".scrollbar-outer").scrollbar(),B.show()}).on("shown.bs.modal",function(t){B.shown()}).on("hide.bs.modal",function(t){B.hide()}).on("hidden.bs.modal",function(t){B.hidden()}),{modal:{init:function(t){var e=t.title,a=void 0===e?"":e,n=t.body,i=t.btnLabel,o=void 0===i?"Ok":i,s=t.btnClass,l=void 0===s?"btn-info":s,r=t.btnDisabled,d=void 0!==r&&r,c=t.btnCloseLabel,u=void 0===c?"Batal":c,m=t.btnCloseClass,f=void 0===m?"btn-info btn-border":m,p=t.data,g=void 0===p?{}:p,b=t.dialogClass,h=void 0===b?"":b,y=t.backdrop,v=void 0===y||y,k=t.action,w=void 0===k?null:k,L=t.show,_=void 0===L?null:L,E=t.shown,x=void 0===E?null:E,S=t.hide,I=void 0===S?null:S,T=t.hidden,A=void 0===T?null:T;B.data=g,B.btn=o,B.action="function"==typeof w?w:function(){},B.show="function"==typeof _?_:function(){},B.shown="function"==typeof x?x:function(){},B.hide="function"==typeof I?I:function(){},B.hidden="function"==typeof A?A:function(){};var j='data-dismiss="modal"';return"string"==typeof w?j='onclick="'.concat(w,'"'):"function"==typeof w&&(j='onclick="utils.modal.action()"'),B.dialog.attr("class","modal-dialog").addClass(h),B.title.html(a),B.body.html(n),B.footer.html('\n\t\t\t<button type="button" class="btn '.concat(f,'" data-dismiss="modal">').concat(u,'</button>\n\t\t\t<button type="button" id="modal-btn" ').concat(j,' class="btn ').concat(l,'" ').concat(d?"disabled":"",">").concat(o,"</button>\n\t\t")),B.root.data("bs.modal")._config.backdrop=v,B.error(),B.root.modal("show").trigger("show.bs.modal")},data:function(){return B.data},action:function(){return B.action()},hide:function(){B.root.modal("hide")},loading:B.loading,error:B.error}}}(),dbg=function(t,e){var a=0<arguments.length&&void 0!==t?t:"!",n=1<arguments.length&&void 0!==e&&e;"undefined"!=typeof DEV&&DEV&&(!1===n?console.info(a):console.info("%c"+a,"color: ".concat("number"==typeof n?["#00ff7f","#6495ed","#ff0","#fa8072","#ffa500","#f00"][n]:n)))};$(function(){console.log("© Muhammad Afifudin, 2020"),console.log("%cVersion: "+$('script[src*="assets/js"]').prop("src").split("?v=")[1],"color: #6495ed"),$("body").tooltip({selector:'[data-toggle="tooltip"]',html:!0})}),$.fn.modal.Constructor.prototype._enforceFocus=function(){},$.fn.notifyDefaults&&$.notifyDefaults({placement:{from:"bottom"},animate:{enter:"animated fadeInUp",exit:"animated fadeOutDown"}}),document.addEventListener("DOMContentLoaded",function(){var c={body:document.getElementsByTagName("body")[0],search:document.getElementById("search"),search_tooltip:$("#search-form-tooltip"),result_loading:document.getElementById("result-loading"),result_summary:document.getElementById("result-summary"),result_table:document.getElementById("result-table"),result_table_body:document.getElementById("result-table-body")},u=[],m=!0,i="json";dbg("Requesting zipped ".concat(i,"...\nassets/").concat(i,"/")+FILE,2),new JSZip.external.Promise(function(a,n){JSZipUtils.getBinaryContent("assets/".concat(i,"/").concat(FILE,".zip"),function(t,e){t?n(t):a(e)})}).then(JSZip.loadAsync).then(function(t){return dbg(t),t.file("".concat(FILE,".").concat(i)).async("string")}).then(function(t){dbg("Success read ".concat(FILE,".").concat(i),0),u=JSON.parse(t);var a=_toConsumableArray(new Set(u.map(function(t){return t.fid.length})));u.forEach(function(e){e.lv=a.findIndex(function(t){return t===e.fid.length}),e.last=e.lv===a.length-1}),dbg(u),document.getElementById("loading").style.display="none",document.getElementById("search-form-wrapper-outer").className="search-form-wrapper-outer animated animated-1s bounceIn",document.getElementById("explore-wrapper").className="explore-wrapper animated animated-1s bounceInUp";var e=new URL(location.href).searchParams;e.get("q")?(c.search.value=e.get("q"),document.getElementById("search-btn").click(),m=!1):e.get("explore")?document.getElementById("explore-btn").click():c.search.focus()},function(t){console.error(t),document.getElementById("loading").innerHTML='<div class="animated animated-1s swing"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div><div class="animated fast fadeInUp delay-1s fz-14 fw-4 mt-45 px-a"><div class="fz-20">Silakan coba refresh halaman ini.</div>Jika masih terjadi masalah, hubungi Admin (<span class="text-warning">muhammad.afifudin@bps.go.id</span>)</div>',document.getElementsByTagName("header")[0].className="header bg-danger-gradient pb-6"});var f={cat:[],stopword:!0,dark:!1};"undefined"!=typeof Storage&&localStorage.getItem("spk-dark")&&(c.body.classList.add("dark-mode"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#202124"),f.dark=!0);var p=new Mark(c.result_table_body);c.search.addEventListener("keypress",function(t){c.search_tooltip.tooltip("hide"),13===t.which&&n(c.search.value)},!1),c.search.addEventListener("blur",function(){c.search_tooltip.tooltip("hide")},!1),document.getElementById("search-btn").addEventListener("click",function(){n(c.search.value)},!1);var n=function(a){var n=["di","ia","ke","se","ada","apa","dan","hal","ini","itu","kan","lah","mau","nah","per","pun","sub","tak","agak","agar","akan","asal","atas","atau","bagi","baik","beri","bila","buat","cara","cuma","dari","demi","dulu","guna","ikut","jadi","jauh","jika","juga","kala","kini","kira","lagi","lama","maka","mana","mula","naik","oleh","pada","para","pula","saat","saja","sama","sana","satu","sela","sini","soal","tadi","tapi","tiap","tiba","usai","yang","bagai","bahwa","biasa","dalam","dapat","hanya","ialah","macam","masih","meski","namun","suatu","tidak","untuk","yaitu","adalah","antara","berupa","dengan","kepada","sampai","kelompok","kategori","golongan","subgolongan"],t=_toConsumableArray(new Set(a.trim().toLowerCase().replace(/,/g," ").replace(/\"(\w+) (\w+)\"/g,"$1+$2").split(/[\s,]+/))).filter(function(t){return t.length}),l=_toConsumableArray(t),r=[],d=1===l.length&&/^\d{2,10}$/.test(l[0]);if(!d&&f.stopword){t.forEach(function(t){for(var e=0,a=n.length;e<a;e++)if(n[e].includes(t)){r.push(n[e].replace(t,'<u class="fw-7">'.concat(t,"</u>")));break}});var e=n.join(",");l=t.filter(function(t){return!e.includes(t)})}l=l.map(function(t){return t.replace(/\+/g," ")}),dbg("Search: "+a,0),dbg({keysUnfiltered:t,keys:l,keysExcluded:r}),(t.filter(function(t){return 2<t.length}).length||1<t.filter(function(t){return 1<t.length}).length||3<t.length)&&f.stopword&&t.length===r.length?(c.result_summary.innerHTML='<div class="text-danger text-center pt-45 pt-sm-5 pl-md-55"><div class="mb-4 fz-72 fz-sm-80"><div class="icon-stack-file-times animated animated-1s swing"><div></div></div></div>Kata kunci terlalu umum<div class="mt-15 text-muted fz-12 font-italic">Kata kunci yang terlalu umum tidak diikutkan dalam pencarian: '.concat(r.join(", "),'<br>Anda dapat mengubah pengaturan ini pada menu pengaturan<i class="icon-settings ml-15"></i></div></div>'),setTimeout(function(){c.search_tooltip.tooltip("show")},c.body.classList.contains("search-active")?200:600),c.result_summary.style.display="",c.result_loading.style.display="none",c.result_table.style.display="none",c.body.classList.add("search-active"),$("#result").slideDown()):l.filter(function(t){return 2<t.length}).length||1<l.filter(function(t){return 1<t.length}).length||3<l.length||d?(dbg("Good keyword :)",1),setTimeout(function(){var i=$.extend(!0,[],u),o=[];if(1<l.length&&l.every(function(t){return/^\d{2,7}$/.test(t)})&&(l=[l.join("")],d=!0),d){var s=i.find(function(t){return t.id==l[0]});s&&function(){for(var e=s.parent_fid,t=[],a=i.filter(function(t){return t.parent_fid===s.fid});e;){var n=i.find(function(t){return t.fid===e});t.unshift(n),e=n.parent_fid}o=[].concat(t,[_objectSpread({},s,{displayed:!0})],_toConsumableArray(a.map(function(t){return _objectSpread({},t,{last:!0})}))),f.cat.length&&(o=o.filter(function(e){return f.cat.some(function(t){return e.fid.startsWith(t)})}))}()}else i.reverse().forEach(function(n){var e=(n.title+n.desc).toLowerCase();if(l.every(function(t){return e.includes(t)})){var t=o.find(function(t){return t.fid===n.fid});t?t.displayed=!0:function(){o.push(_objectSpread({},n,{displayed:!0,last:!0}));for(var e=n.parent_fid,t=[];e;){var a=i.find(function(t){return t.fid===e});t.unshift(a),e=a.parent_fid}o=o.concat(t)}()}}),o.length&&(o=o.filter(function(e,t,a){return t===a.findIndex(function(t){return t.fid===e.fid})}),f.cat.length&&(o=o.filter(function(e){return f.cat.some(function(t){return e.fid.startsWith(t)})})),o.sort(function(t,e){return t.fid<e.fid?-1:1}));function t(t){return'<b class="fw-6">'.concat(t,"</b>")}if(o.length){var e=o.map(function(t){return'\n\t\t\t\t\t\t\t<tr data-lv="'.concat(t.lv,'" data-fid="').concat(t.fid,'"\n\t\t\t\t\t\t\t\tclass="').concat(t.desc.length?"desc":""," ").concat(t.displayed?"desc-exp":"mini"," ").concat(t.last||t.hidden?"":t.collapsed?"toggle":"toggle toggle-exp",'"\n\t\t\t\t\t\t\t\t').concat(t.hidden?'style="display:none"':"",">\n\t\t\t\t\t\t\t\t<td><div>").concat(t.parent_id,"<b>").concat(t.id.substr(t.parent_id.length)||t.fid,'</b></div></td>\n\t\t\t\t\t\t\t\t<td><div class="desc-toggle">').concat(t.title,'</div><span class="desc-container">').concat(g(t.desc,t.id),"</span></td>\n\t\t\t\t\t\t\t</tr>")}).join("");r=r.length?'<div class="mt-15 text-muted fz-12 font-italic">Sebagian kata kunci yang terlalu umum tidak diikutkan dalam pencarian: '.concat(r.join(", "),'<br>Anda dapat mengubah pengaturan ini pada menu pengaturan<i class="icon-settings ml-15"></i></div>'):"",c.search.blur(),c.result_summary.innerHTML=d?'<div>Menampilkan hasil pencarian dengan kode <span class="text-info">'.concat(t(a),"</span></div>"):'<div class="text-info">Menemukan '.concat(t(o.filter(function(t){return t.displayed}).length)," hasil.").concat(r,"</div>"),c.result_table_body.innerHTML=e,c.result_table.style.display="",d||l.forEach(function(t){return p.mark(t,{separateWordSearch:!1})}),document.querySelectorAll(".copy-btn").forEach(function(t){new ClipboardJS(t,{text:function(){return location.origin+location.pathname+"?q="+t.dataset.text}}),t.addEventListener("click",function(){t.innerHTML='<i class="fas fa-check mr-2"></i>Tautan berhasil disalin',t.classList.add("btn-success"),t.classList.remove("btn-outline-warning"),setTimeout(function(){t.innerHTML='<i class="fas fa-share-alt mr-2"></i>Bagikan',t.classList.add("btn-outline-warning"),t.classList.remove("btn-success")},2e3)},!1)}),m&&(c.result_loading.nextElementSibling.style.display="")}else c.result_summary.innerHTML='<div class="text-danger text-center pt-45 pt-sm-5 pl-md-55"><div class="mb-4 fz-72 fz-sm-80"><div class="icon-stack-file-times animated animated-1s swing"><div></div></div></div>Tidak ada hasil untuk pencarian '.concat(t(a),"</div>");c.result_loading.style.display="none",c.result_summary.style.display=""},c.body.classList.contains("search-active")?200:600),c.result_table.style.display="none",c.result_summary.style.display="none",c.result_loading.style.display="",c.result_loading.nextElementSibling.style.display="none",c.body.classList.add("search-active"),$("#result").slideDown(),c.search_tooltip.tooltip("hide")):(a&&(dbg("Bad keyword :(",1),c.search_tooltip.tooltip("show")),c.search.focus())};document.getElementById("setting-btn").addEventListener("click",function(){c.search_tooltip.tooltip("hide");var e=f.cat,t=f.stopword,a=f.dark;utils.modal.init({title:"Pengaturan",body:'\n\t\t\t\t\t<div class="fw-6 mb-2">Cari pada kategori:</div>\n\t\t\t\t\t<div class="selectpicker-in-modal selectpicker-no-hscroll">\n\t\t\t\t\t\t<select id="setting-cat" class="selectpicker" title="Semua Kategori" data-width="100%" data-live-search="true" multiple>'.concat(u.filter(function(t){return""===t.id}).map(function(t){return'<option value="'.concat(t.fid,'" data-subtext="(').concat(t.title,')"').concat(e.includes(t.fid)?" selected":"",">").concat(t.fid,"</option>")}).join(""),'</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="fw-6 mb-2 mt-4">Kata umum atau <i>stopwords</i>:</div>\n\t\t\t\t\t<div class="custom-control custom-switch">\n\t\t\t\t\t\t<input type="checkbox" class="custom-control-input" id="stopword-toggle"').concat(t?" checked":"",'>\n\t\t\t\t\t\t<label class="custom-control-label cur-p d-block" for="stopword-toggle">Abaikan kata kunci umum<div class="fz-12 fw-3">(Kata-kata umum seperti "yang", "dan", "dalam", "dari", dan lain-lain akan dikeluarkan dalam pencarian)</div></label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="mx--3 mt-3 mb--3 py-3 border-top" id="dark-mode-wrapper">\n\t\t\t\t\t\t<div class="px-3">\n\t\t\t\t\t\t\t<div class="fw-6 mb-2">Tampilan:</div>\n\t\t\t\t\t\t\t<div class="custom-control custom-switch">\n\t\t\t\t\t\t\t\t<input type="checkbox" class="custom-control-input" id="dark-mode-toggle"').concat(a?" checked":"",'>\n\t\t\t\t\t\t\t\t<label class="custom-control-label cur-p d-block" for="dark-mode-toggle">Mode gelap</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t'),btnLabel:"Simpan",show:function(){document.getElementById("dark-mode-toggle").addEventListener("change",function(t){this.checked?(c.body.classList.add("dark-mode"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#202124")):(c.body.classList.remove("dark-mode"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#F8D800"))},!1)},action:function(){!function(t){var e=0<arguments.length&&void 0!==t&&t;f=e||{cat:[],stopword:!0,dark:!1},document.getElementById("setting-btn").classList[0===f.cat.length&&f.stopword?"remove":"add"]("text-info")}({cat:$("#setting-cat").val(),stopword:document.getElementById("stopword-toggle").checked,dark:document.getElementById("dark-mode-toggle").checked}),utils.modal.hide(),dbg(f)},hide:function(){f.dark?(c.body.classList.add("dark-mode"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#202124"),"undefined"!=typeof Storage&&localStorage.setItem("spk-dark",1)):(c.body.classList.remove("dark-mode"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#F8D800"),"undefined"!=typeof Storage&&localStorage.removeItem("spk-dark")),""===c.result_summary.style.display&&n(c.search.value)}})},!1),document.getElementById("explore-btn").addEventListener("click",function(){c.search.value="",c.result_summary.style.display="none",c.result_table.style.display="none",c.result_loading.style.display="",c.result_loading.nextElementSibling.style.display="none",c.search_tooltip.tooltip("hide"),setTimeout(function(){c.result_table_body.innerHTML=u.filter(function(t){return""===t.id}).map(function(t){return'<tr data-lv="0" class="toggle toggle-explore desc" data-fid="'.concat(t.fid,'"><td><div>').concat(t.fid,'</div></td><td><div class="desc-toggle">').concat(t.title,'</div><span class="desc-container">').concat(g(t.desc),"</span></td></tr>")}).join(""),c.result_loading.style.display="none",m&&(c.result_loading.nextElementSibling.style.display=""),c.result_table.style.display=""},c.body.classList.contains("search-active")?200:600),c.body.classList.add("search-active"),$("#result").slideDown()},!1),c.result_table_body.addEventListener("click",function(t){for(var a=t.target;a&&a!=this&&(!a.matches("a[data-id]")&&!a.matches(".desc-container"));a=a.parentNode){if(a.matches("td:last-child")){a.parentNode.classList.contains("desc")&&a.parentNode.classList.toggle("desc-exp");break}if(a.matches("td:first-child")&&"break"===function(){var t=a.parentNode,e=t.dataset;return dbg(e),t.classList.contains("toggle-exp")?(document.querySelectorAll('[data-fid^="'.concat(e.fid,'"]')).forEach(function(t){t.classList.remove("toggle-exp","desc-exp"),t.style.display="none"}),t.style.display=""):t.classList.contains("toggle-explore")?(t.classList.remove("toggle-explore","desc-exp"),t.classList.add("toggle-exp"),t.outerHTML+=u.filter(function(t){return t.parent_fid===e.fid}).map(function(t){return'\n\t\t\t\t\t\t\t<tr data-lv="'.concat(t.lv,'" data-fid="').concat(t.fid,'"\n\t\t\t\t\t\t\t\tclass="').concat(t.last?"":"toggle toggle-explore"," ").concat(t.desc.length?"desc":"",'">\n\t\t\t\t\t\t\t\t<td>').concat(t.parent_id,"<b>").concat(t.id.substr(t.parent_id.length),'</b></td>\n\t\t\t\t\t\t\t\t<td><div class="desc-toggle">').concat(t.title,'</div><span class="desc-container">').concat(g(t.desc,t.id),"</span></td>\n\t\t\t\t\t\t\t</tr>")}).join(""),document.querySelectorAll(".copy-btn").forEach(function(t){new ClipboardJS(t,{text:function(){return location.origin+location.pathname+"?q="+t.dataset.text}}),t.addEventListener("click",function(){t.innerHTML='<i class="fas fa-check mr-2"></i>Tautan berhasil disalin',t.classList.add("btn-success"),t.classList.remove("btn-outline-warning"),setTimeout(function(){t.innerHTML='<i class="fas fa-share-alt mr-2"></i>Bagikan',t.classList.add("btn-outline-warning"),t.classList.remove("btn-success")},2e3)},!1)})):t.classList.contains("toggle")&&(document.querySelectorAll('[data-fid^="'.concat(e.fid,'"][data-lv="').concat(Number(e.lv)+1,'"]')).forEach(function(t){t.style.display=""}),t.classList.remove("desc-exp"),t.classList.add("toggle-exp")),"break"}())break}},!1);var g=function(t,e){var a=1<arguments.length&&void 0!==e?e:"";return t?(1<(t.match(/\D\s+-\s+\D/g)||[]).length&&0<(t.match(/yaitu:|adalah:|meliputi:/g)||[]).length&&(t=t.replace(/(\D)\s+-\s+(\D)/g,"$1<br>•&nbsp;&nbsp; $2")),t.replace(/yaitu \:/g,"yaitu:").replace(/adalah \:/g,"adalah:").replace(/meliputi \:/g,"meliputi:").replace(/(CATATAN|Catatan)\s?\:/g,"<br>$1:").replace(/\s+(CATATAN|Catatan)/g,".<br>$1").replace(/ -\s?\t/g,"<br>•&nbsp;&nbsp; ").replace(/( \w\) )/g,'<br><span class="text-gray">$1</span>&nbsp;').replace(/(\d{3,9})/g,'<a href="javascript:void(0)" data-id="$1">$1</a>').replace(/(\<br\>)+/g,"<br>")+(a?'<a href="javascript:void(0)" class="btn btn-outline-warning copy-btn" data-text="'.concat(a,'"><i class="fas fa-link mr-15"></i>Bagikan</a>'):"")):""};c.body.addEventListener("click",function(t){for(var a=t.target;a&&a!=this;a=a.parentNode){if(a.matches("a[data-id]"))if("break"===function(){var e=a.dataset.id,t=u.find(function(t){return t.id===e});return dbg(e,0),t?utils.modal.init({title:e,body:'\n\t\t\t\t\t\t<div class="fw-7 mb-25">'.concat(t.title,'</div>\n\t\t\t\t\t\t<div class="fz-12">').concat(g(t.desc),"</div>\n\t\t\t\t\t"),dialogClass:"modal-lg",btnCloseLabel:"Tutup",btnLabel:'<i class="fas fa-share-alt mr-2"></i>Bagikan',show:function(){new ClipboardJS("#modal-btn",{text:function(){return location.origin+location.pathname+"?q="+e}})},action:function(){document.getElementById("modal-btn").innerHTML='<i class="fas fa-check mr-2"></i>Tautan berhasil disalin',document.getElementById("modal-btn").classList.add("btn-success"),document.getElementById("modal-btn").classList.remove("btn-info"),setTimeout(function(){document.getElementById("modal-btn").innerHTML='<i class="fas fa-share-alt mr-2"></i>Bagikan',document.getElementById("modal-btn").classList.add("btn-info"),document.getElementById("modal-btn").classList.remove("btn-success")},2e3)}}):utils.modal.init({title:e,body:'\n\t\t\t\t\t\t<div class="d-flex justify-content-center flex-wrap">\n\t\t\t\t\t\t\t<div class="mb-4 fz-72 fz-sm-80"><div class="icon-stack-file-times animated animated-1s swing"><div></div></div></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="w-100 text-danger text-center mt--2">Sistem tidak dapat menemukan kode <span class="fw-7">0123</span></div>\n\t\t\t\t\t',dialogClass:"modal-sm",btnCloseLabel:"Tutup",btnClass:"d-none"}),"break"}())break}},!1),c.search_tooltip.tooltip({title:"Gunakan kata kunci yang lebih spesifik",trigger:"manual",placement:"bottom"}),document.getElementById("about-btn").addEventListener("click",function(){utils.modal.init({dialogClass:"modal-sm",title:"Tentang",body:'\n\t\t\t\t<div class="mb-3"><span class="fw-7">Sistem Pencarian Kode Klasifikasi</span> (<i>unofficial</i>) merupakan aplikasi berbasis website (WebApp) yang dapat dimanfaatkan untuk pencarian kode berbagai jenis klasifikasi statistik seperti <span class="text-info">KBLI</span>, <span class="text-info">KBJI</span>, dan <span class="text-info">KBKI</span>.</div>\n\t\t\t\t<div>WebApp ini dikembangkan oleh <span class="fw-6">Muhammad Afifudin</span> — Staf IPDS BPS Kabupaten Kayong Utara. WebApp ini memiliki fitur pencarian klasifikasi dengan memasukkan kata kunci ataupun kode klasifikasi. Terdapat juga fitur eksplorasi yang memungkinkan pengguna melihat hierarki klasifikasi.</div>',btnCloseLabel:"Tutup",btnClass:"d-none"})},!1),document.getElementById("nav-guide-dismiss").addEventListener("click",function(){m=!1,c.result_loading.nextElementSibling.firstElementChild.classList.add("animated","fadeOutLeft"),setTimeout(function(){$("#result-loading+div").slideUp()},100)},!1),document.addEventListener("keypress",function(t){t.target!==c.search&&"f"===t.key.toLocaleLowerCase()&&c.search.select()})});
//# sourceMappingURL=main.js.map
