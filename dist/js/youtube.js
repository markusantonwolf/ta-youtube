"use strict";function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_unsupportedIterableToArray(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,o=new Array(e);r<e;r++)o[r]=t[r];return o}function _iterableToArrayLimit(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],o=!0,a=!1,i=void 0;try{for(var n,u=t[Symbol.iterator]();!(o=(n=u.next()).done)&&(r.push(n.value),!e||r.length!==e);o=!0);}catch(t){a=!0,i=t}finally{try{o||null==u.return||u.return()}finally{if(a)throw i}}return r}}function _arrayWithHoles(t){if(Array.isArray(t))return t}function youtube(){return{active:!1,url:"",hash:"",default:{base_url:"https://www.youtube-nocookie.com/embed/",remember:!0,autoplay:!1,start_at:"",button:"button"},init:function(t,e){var r=this;if(void 0!==e)for(var o=0,a=Object.entries(e);o<a.length;o++){var i=_slicedToArray(a[o],2),n=i[0],u=i[1];this.default[n]=u}this.url=this.default.base_url+t,this.hash=this.hashCode(window.location.href)+"_"+this.hashCode(this.url),"true"===localStorage.getItem("youtube_"+this.hash)&&this.default.remember?(this.active=!0,this.default.autoplay&&(this.url+="?autoplay=1")):this.url+="?autoplay=1",void 0!==this.$refs[this.default.button]&&(this.setButtonHeight(),window.addEventListener("resize",(function(){r.setButtonHeight()})))},show:function(){this.active=!0,this.default.remember&&localStorage.setItem("youtube_"+this.hash,"true")},setButtonHeight:function(){var t=this.$refs[this.default.button].offsetHeight;this.$el.style.setProperty("--buttonHeight","".concat(t,"px"))},hashCode:function(t){var e,r=0;for(e=0;e<t.length;e++)r=(r<<5)-r+t.charCodeAt(e),r|=0;return r}}}