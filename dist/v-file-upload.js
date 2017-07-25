(function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VFileUpload=t():e.VFileUpload=t()})(this,function(){return function(e){function t(n){if(s[n])return s[n].exports;var r=s[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var s={};return t.m=e,t.c=s,t.i=function(e){return e},t.d=function(e,s,n){t.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p=".",t(t.s=7)}([function(e,t,s){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}(),i=function(){function e(t){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};n(this,e),this.url=t,this.headers=s,this.onProgress=r}return r(e,[{key:"uploadFiles",value:function(e){var t=this;return this._prepareFiles(e),new Promise(function(e,s){t.__uploadFile(0,e,s)})}},{key:"__uploadFile",value:function(e,t,s){var n=this;if(!this.files[e]){return this.files.find(function(e){return"error"===e.status})?s(this.files):t(this.files)}return"success"==this.files[e].status?this.__uploadFile(++e,t,s):this._uploadFile(this.files[e]).then(function(r){n.__uploadFile(++e,t,s)}).catch(function(){n.__uploadFile(++e,t,s)})}},{key:"_uploadFile",value:function(e){var t=this,s=new XMLHttpRequest;s.responseType="json",s.open("POST",this.url,!0),this._setXhrHeaders(s),s.upload.addEventListener("progress",function(s){t._onProgress(s,e)},!1);var n=new Promise(function(t,n){s.onload=function(r){return e.progress=0,s.status>=200&&s.status<400?(e.response=r.target.response,e.status="success",t(r)):(e.status="error",n(r))},s.onerror=function(t){return e.status="error",e.progress=0,n(t)}}),r=new FormData;return r.append("file",e),e.status="loading",s.send(r),n}},{key:"_setXhrHeaders",value:function(e){var t=this;Object.keys(this.headers).forEach(function(s){return e.setRequestHeader(s,t.headers[s])})}},{key:"_prepareFiles",value:function(e){if(this.files=[],e){for(var t=0;t<e.length;t++){var s=e[t];s.status||(s.status="waiting"),this.files.push(s)}this._setTotalSize()}}},{key:"_setTotalSize",value:function(){var e=this;this.totalLoaded=0,this.totalSize=0,this.files.forEach(function(t){e.totalSize+=t.size})}},{key:"_onProgress",value:function(e,t){t.progress||(t.progress=t.loaded=0);var s=parseInt(100*e.loaded/e.total);if(this.totalLoaded+=e.loaded-t.loaded,t.loaded=e.loaded,s>t.progress){t.progress=s;var n=100*this.totalLoaded/this.totalSize;this.onProgress(this.files?{progress:n,files:this.files}:t)}}}]),e}();t.default=i},function(e,t,s){var n=s(4),r=s(0);n.install=function(e){return e.component("file-upload",n)},n.version="1.0.4",e.exports={FileUpload:n,FileUploadService:r}},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(0);t.default={props:{url:{type:String,required:!0},thumbUrl:{type:Function,required:!0},accept:{type:String,default:".png,.jpg"},multiple:{type:Boolean,default:!0},headers:{type:Object,default:function(){return{}}},btnLabel:{type:String,default:"Select a file"},btnErrorLabel:{type:String,default:"Erro ao enviar arquivos, tentar novamente?"},btnUploadingLabel:{type:String,default:"Uploading files"}},data:function(){return{progress:0,status:"waiting",anexos:[]}},computed:{uploading:function(){return this.progress>0},progressStyle:function(){return{width:this.progress+"%",display:this.uploading?"block":"none"}},inputWrapperStyle:function(){return{opacity:this.uploading?"0.7":"1"}}},methods:{onChangeInputFile:function(e){var t=e.target.files||e.dataTransfer.files;t.length&&this.upload(t)},upload:function(e){var t=this;this.progress=.1,this.status="loading",new n.default(this.url,this.headers,this.onProgress).uploadFiles(e).then(function(e){t.onChangeAnexos(),t.$emit("success",e),t.status="success",t.progress=0}).catch(function(e){t.status="error",t.$emit("error",e),t.progress=0})},onProgress:function(e){var t=this;this.progress=e.progress,this.$emit("progress",this.progress),this.anexos.splice(0,this.anexos.length),e.files.forEach(function(e){return t.anexos.push(e)})},itemProgressStyle:function(e){return{width:(e.progress||0)+"%",display:"loading"==e.status?"block":"none"}},progressSpinStyle:function(e){return{display:["waiting","loading"].indexOf(e.status)>-1?"block":"none"}},removeAnexo:function(e){this.anexos.splice(this.anexos.indexOf(e),1),this.onChangeAnexos()},onChangeAnexos:function(){this.$emit("change",this.anexos)}},created:function(){window.c=this}}},function(e,t){},function(e,t,s){s(3);var n=s(5)(s(2),s(6),null,null);e.exports=n.exports},function(e,t){e.exports=function(e,t,s,n){var r,i=e=e||{},o=typeof e.default;"object"!==o&&"function"!==o||(r=e,i=e.default);var a="function"==typeof i?i.options:i;if(t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns),s&&(a._scopeId=s),n){var l=a.computed||(a.computed={});Object.keys(n).forEach(function(e){var t=n[e];l[e]=function(){return t}})}return{esModule:r,exports:i,options:a}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"file-upload"},[e.anexos.length>0?s("div",{staticClass:"thumb-preview"},e._l(e.anexos,function(t){return s("div",{staticClass:"thumb-preview-item"},[s("div",{staticClass:"progress-spin",style:e.progressSpinStyle(t)},[e._v("◌")]),s("div",{staticClass:"progress",style:e.itemProgressStyle(t)}),"success"==t.status?s("label",{staticClass:"red",on:{click:function(s){e.removeAnexo(t)}}},[e._v("×")]):e._e(),s("img",{attrs:{src:e.thumbUrl(t)}})])})):e._e(),"error"==e.status?s("div",{staticClass:"input-wrapper",staticStyle:{"background-color":"#d9534f"}},[s("label",{staticClass:"file-upload-label",on:{click:function(t){e.upload(e.anexos)}}},[s("span",{staticClass:"file-upload-icon fa-spin"},[e._v("×")]),s("div",[e._v(e._s(e.btnErrorLabel))])])]):s("div",{staticClass:"input-wrapper",style:e.inputWrapperStyle},[s("input",{attrs:{id:"file-upload-input",type:"file",name:"file",accept:e.accept,multiple:e.multiple,disabled:e.uploading},on:{change:e.onChangeInputFile}}),s("label",{staticClass:"file-upload-label",attrs:{for:"file-upload-input"}},[s("span",{staticClass:"file-upload-icon fu-spin",class:{"file-upload-icon-pulse":e.uploading}},[e._v("⇪")]),s("div",[e._v(e._s(e.uploading?e.btnUploadingLabel:e.btnLabel))])]),s("div",{staticClass:"file-upload-progress",style:e.progressStyle})])])},staticRenderFns:[]}},function(e,t,s){e.exports=s(1)}])});