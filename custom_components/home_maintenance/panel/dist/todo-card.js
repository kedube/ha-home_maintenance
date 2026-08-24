var St=Object.defineProperty;var Ii=Object.getOwnPropertyDescriptor;var z=(e,t)=>{for(var i in t)St(e,i,{get:t[i],enumerable:!0})};var E=(e,t,i,r)=>{for(var a=r>1?void 0:r?Ii(t,i):t,n=e.length-1,o;n>=0;n--)(o=e[n])&&(a=(r?o(t,i,a):o(a))||a);return r&&a&&St(t,i,a),a};var Ce=globalThis,Ne=Ce.ShadowRoot&&(Ce.ShadyCSS===void 0||Ce.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ve=Symbol(),At=new WeakMap,le=class{constructor(t,i,r){if(this._$cssResult$=!0,r!==Ve)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o,i=this.t;if(Ne&&t===void 0){let r=i!==void 0&&i.length===1;r&&(t=At.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&At.set(i,t))}return t}toString(){return this.cssText}},kt=e=>new le(typeof e=="string"?e:e+"",void 0,Ve),N=(e,...t)=>{let i=e.length===1?e[0]:t.reduce((r,a,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[n+1],e[0]);return new le(i,e,Ve)},Ct=(e,t)=>{if(Ne)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(let i of t){let r=document.createElement("style"),a=Ce.litNonce;a!==void 0&&r.setAttribute("nonce",a),r.textContent=i.cssText,e.appendChild(r)}},We=Ne?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(let r of t.cssRules)i+=r.cssText;return kt(i)})(e):e;var{is:Li,defineProperty:Oi,getOwnPropertyDescriptor:Ri,getOwnPropertyNames:Bi,getOwnPropertySymbols:$i,getPrototypeOf:Mi}=Object,P=globalThis,Nt=P.trustedTypes,Ui=Nt?Nt.emptyScript:"",ji=P.reactiveElementPolyfillSupport,ce=(e,t)=>e,ue={toAttribute(e,t){switch(t){case Boolean:e=e?Ui:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},He=(e,t)=>!Li(e,t),Ht={attribute:!0,type:String,converter:ue,reflect:!1,useDefault:!1,hasChanged:He};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),P.litPropertyMetadata??(P.litPropertyMetadata=new WeakMap);var H=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Ht){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){let r=Symbol(),a=this.getPropertyDescriptor(t,r,i);a!==void 0&&Oi(this.prototype,t,a)}}static getPropertyDescriptor(t,i,r){let{get:a,set:n}=Ri(this.prototype,t)??{get(){return this[i]},set(o){this[i]=o}};return{get:a,set(o){let s=a?.call(this);n?.call(this,o),this.requestUpdate(t,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ht}static _$Ei(){if(this.hasOwnProperty(ce("elementProperties")))return;let t=Mi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ce("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ce("properties"))){let i=this.properties,r=[...Bi(i),...$i(i)];for(let a of r)this.createProperty(a,i[a])}let t=this[Symbol.metadata];if(t!==null){let i=litPropertyMetadata.get(t);if(i!==void 0)for(let[r,a]of i)this.elementProperties.set(r,a)}this._$Eh=new Map;for(let[i,r]of this.elementProperties){let a=this._$Eu(i,r);a!==void 0&&this._$Eh.set(a,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let i=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let a of r)i.unshift(We(a))}else t!==void 0&&i.push(We(t));return i}static _$Eu(t,i){let r=i.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,i=this.constructor.elementProperties;for(let r of i.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ct(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,r){this._$AK(t,r)}_$ET(t,i){let r=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,r);if(a!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:ue).toAttribute(i,r.type);this._$Em=t,n==null?this.removeAttribute(a):this.setAttribute(a,n),this._$Em=null}}_$AK(t,i){let r=this.constructor,a=r._$Eh.get(t);if(a!==void 0&&this._$Em!==a){let n=r.getPropertyOptions(a),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ue;this._$Em=a;let s=o.fromAttribute(i,n.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(t,i,r,a=!1,n){if(t!==void 0){let o=this.constructor;if(a===!1&&(n=this[t]),r??(r=o.getPropertyOptions(t)),!((r.hasChanged??He)(n,i)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,i,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:r,reflect:a,wrapped:n},o){r&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??i??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(i=void 0),this._$AL.set(t,i)),a===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[a,n]of this._$Ep)this[a]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[a,n]of r){let{wrapped:o}=n,s=this[a];o!==!0||this._$AL.has(a)||s===void 0||this.C(a,void 0,n,s)}}let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(i)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(t){}firstUpdated(t){}};H.elementStyles=[],H.shadowRootOptions={mode:"open"},H[ce("elementProperties")]=new Map,H[ce("finalized")]=new Map,ji?.({ReactiveElement:H}),(P.reactiveElementVersions??(P.reactiveElementVersions=[])).push("2.1.2");var he=globalThis,Dt=e=>e,De=he.trustedTypes,zt=De?De.createPolicy("lit-html",{createHTML:e=>e}):void 0,Bt="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,$t="?"+I,Gi=`<${$t}>`,X=document,pe=()=>X.createComment(""),me=e=>e===null||typeof e!="object"&&typeof e!="function",Ke=Array.isArray,Fi=e=>Ke(e)||typeof e?.[Symbol.iterator]=="function",qe=`[ 	
\f\r]`,de=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pt=/-->/g,It=/>/g,W=RegExp(`>|${qe}(?:([^\\s"'>=/]+)(${qe}*=${qe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Lt=/'/g,Ot=/"/g,Mt=/^(?:script|style|textarea|title)$/i,et=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),v=et(1),qa=et(2),Xa=et(3),Z=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Rt=new WeakMap,q=X.createTreeWalker(X,129);function Ut(e,t){if(!Ke(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return zt!==void 0?zt.createHTML(t):t}var Vi=(e,t)=>{let i=e.length-1,r=[],a,n=t===2?"<svg>":t===3?"<math>":"",o=de;for(let s=0;s<i;s++){let l=e[s],u,d,c=-1,h=0;for(;h<l.length&&(o.lastIndex=h,d=o.exec(l),d!==null);)h=o.lastIndex,o===de?d[1]==="!--"?o=Pt:d[1]!==void 0?o=It:d[2]!==void 0?(Mt.test(d[2])&&(a=RegExp("</"+d[2],"g")),o=W):d[3]!==void 0&&(o=W):o===W?d[0]===">"?(o=a??de,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,u=d[1],o=d[3]===void 0?W:d[3]==='"'?Ot:Lt):o===Ot||o===Lt?o=W:o===Pt||o===It?o=de:(o=W,a=void 0);let y=o===W&&e[s+1].startsWith("/>")?" ":"";n+=o===de?l+Gi:c>=0?(r.push(u),l.slice(0,c)+Bt+l.slice(c)+I+y):l+I+(c===-2?s:y)}return[Ut(e,n+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ge=class e{constructor({strings:t,_$litType$:i},r){let a;this.parts=[];let n=0,o=0,s=t.length-1,l=this.parts,[u,d]=Vi(t,i);if(this.el=e.createElement(u,r),q.currentNode=this.el.content,i===2||i===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(a=q.nextNode())!==null&&l.length<s;){if(a.nodeType===1){if(a.hasAttributes())for(let c of a.getAttributeNames())if(c.endsWith(Bt)){let h=d[o++],y=a.getAttribute(c).split(I),x=/([.?@])?(.*)/.exec(h);l.push({type:1,index:n,name:x[2],strings:y,ctor:x[1]==="."?Ze:x[1]==="?"?Je:x[1]==="@"?Ye:ie}),a.removeAttribute(c)}else c.startsWith(I)&&(l.push({type:6,index:n}),a.removeAttribute(c));if(Mt.test(a.tagName)){let c=a.textContent.split(I),h=c.length-1;if(h>0){a.textContent=De?De.emptyScript:"";for(let y=0;y<h;y++)a.append(c[y],pe()),q.nextNode(),l.push({type:2,index:++n});a.append(c[h],pe())}}}else if(a.nodeType===8)if(a.data===$t)l.push({type:2,index:n});else{let c=-1;for(;(c=a.data.indexOf(I,c+1))!==-1;)l.push({type:7,index:n}),c+=I.length-1}n++}}static createElement(t,i){let r=X.createElement("template");return r.innerHTML=t,r}};function te(e,t,i=e,r){if(t===Z)return t;let a=r!==void 0?i._$Co?.[r]:i._$Cl,n=me(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),n===void 0?a=void 0:(a=new n(e),a._$AT(e,i,r)),r!==void 0?(i._$Co??(i._$Co=[]))[r]=a:i._$Cl=a),a!==void 0&&(t=te(e,a._$AS(e,t.values),a,r)),t}var Xe=class{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:i},parts:r}=this._$AD,a=(t?.creationScope??X).importNode(i,!0);q.currentNode=a;let n=q.nextNode(),o=0,s=0,l=r[0];for(;l!==void 0;){if(o===l.index){let u;l.type===2?u=new fe(n,n.nextSibling,this,t):l.type===1?u=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(u=new Qe(n,this,t)),this._$AV.push(u),l=r[++s]}o!==l?.index&&(n=q.nextNode(),o++)}return q.currentNode=X,a}p(t){let i=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,i),i+=r.strings.length-2):r._$AI(t[i])),i++}},fe=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,r,a){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=te(this,t,i),me(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==Z&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Fi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&me(this._$AH)?this._$AA.nextSibling.data=t:this.T(X.createTextNode(t)),this._$AH=t}$(t){let{values:i,_$litType$:r}=t,a=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ge.createElement(Ut(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(i);else{let n=new Xe(a,this),o=n.u(this.options);n.p(i),this.T(o),this._$AH=n}}_$AC(t){let i=Rt.get(t.strings);return i===void 0&&Rt.set(t.strings,i=new ge(t)),i}k(t){Ke(this._$AH)||(this._$AH=[],this._$AR());let i=this._$AH,r,a=0;for(let n of t)a===i.length?i.push(r=new e(this.O(pe()),this.O(pe()),this,this.options)):r=i[a],r._$AI(n),a++;a<i.length&&(this._$AR(r&&r._$AB.nextSibling,a),i.length=a)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){let r=Dt(t).nextSibling;Dt(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ie=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,r,a,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=i,this._$AM=a,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=p}_$AI(t,i=this,r,a){let n=this.strings,o=!1;if(n===void 0)t=te(this,t,i,0),o=!me(t)||t!==this._$AH&&t!==Z,o&&(this._$AH=t);else{let s=t,l,u;for(t=n[0],l=0;l<n.length-1;l++)u=te(this,s[r+l],i,l),u===Z&&(u=this._$AH[l]),o||(o=!me(u)||u!==this._$AH[l]),u===p?t=p:t!==p&&(t+=(u??"")+n[l+1]),this._$AH[l]=u}o&&!a&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ze=class extends ie{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},Je=class extends ie{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},Ye=class extends ie{constructor(t,i,r,a,n){super(t,i,r,a,n),this.type=5}_$AI(t,i=this){if((t=te(this,t,i,0)??p)===Z)return;let r=this._$AH,a=t===p&&r!==p||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==p&&(r===p||a);a&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Qe=class{constructor(t,i,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){te(this,t)}};var Wi=he.litHtmlPolyfillSupport;Wi?.(ge,fe),(he.litHtmlVersions??(he.litHtmlVersions=[])).push("3.3.3");var jt=(e,t,i)=>{let r=i?.renderBefore??t,a=r._$litPart$;if(a===void 0){let n=i?.renderBefore??null;r._$litPart$=a=new fe(t.insertBefore(pe(),n),n,void 0,i??{})}return a._$AI(e),a};var _e=globalThis,S=class extends H{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;let t=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=t.firstChild),t}update(t){let i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=jt(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}};S._$litElement$=!0,S.finalized=!0,_e.litElementHydrateSupport?.({LitElement:S});var qi=_e.litElementPolyfillSupport;qi?.({LitElement:S});(_e.litElementVersions??(_e.litElementVersions=[])).push("4.2.2");var Xi={attribute:!0,type:String,converter:ue,reflect:!1,hasChanged:He},Zi=(e=Xi,t,i)=>{let{kind:r,metadata:a}=i,n=globalThis.litPropertyMetadata.get(a);if(n===void 0&&globalThis.litPropertyMetadata.set(a,n=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),r==="accessor"){let{name:o}=i;return{set(s){let l=t.get.call(this);t.set.call(this,s),this.requestUpdate(o,l,e,!0,s)},init(s){return s!==void 0&&this.C(o,void 0,e,s),s}}}if(r==="setter"){let{name:o}=i;return function(s){let l=this[o];t.call(this,s),this.requestUpdate(o,l,e,!0,s)}}throw Error("Unsupported decorator location: "+r)};function ve(e){return(t,i)=>typeof i=="object"?Zi(e,t,i):((r,a,n)=>{let o=a.hasOwnProperty(n);return a.constructor.createProperty(n,r),o?Object.getOwnPropertyDescriptor(a,n):void 0})(e,t,i)}function A(e){return ve({...e,state:!0,attribute:!1})}var J=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);function ze(e,t){return(i,r,a)=>{let n=o=>o.renderRoot?.querySelector(e)??null;if(t){let{get:o,set:s}=typeof r=="object"?i:a??(()=>{let l=Symbol();return{get(){return this[l]},set(u){this[l]=u}}})();return J(i,r,{get(){let l=o.call(this);return l===void 0&&(l=n(this),(l!==null||this.hasUpdated)&&s.call(this,l)),l}})}return J(i,r,{get(){return n(this)}})}}var Gt,Ft;var ye=function(e,t){return Ji(t).format(e)},Ji=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"numeric",day:"numeric"})};(function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"})(Gt||(Gt={})),(function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"})(Ft||(Ft={}));var Vt=function(e,t,i,r){r=r||{},i=i??{};var a=new Event(t,{bubbles:r.bubbles===void 0||r.bubbles,cancelable:!!r.cancelable,composed:r.composed===void 0||r.composed});return a.detail=i,e.dispatchEvent(a),a};var tt={};z(tt,{card:()=>tr,common:()=>Yi,default:()=>ar,intervals:()=>Qi,notifications:()=>er,panel:()=>ir,templates:()=>rr,trigger_types:()=>Ki});var Yi={loading:"Loading...",none:"None",no_tasks:"No tasks found.",ungrouped:"Ungrouped",cancel:"Cancel",invalid_date:"Invalid date entered."},Qi={day:"Day",days:"Days",week:"Week",weeks:"Weeks",month:"Month",months:"Months",year:"Year",years:"Years",every_uses:"Every {value} uses",every_runtime:"Every {value} runtime"},Ki={time:"Time-based",date:"Fixed date",count:"Count-based",runtime:"Runtime-based"},er={when:{due:"Due",overdue:"Overdue",due_and_overdue:"Due and overdue"}},tr={add_task:{added:'"{title}" added.'},todo:{due_today:"Due today",days_overdue:"{count, plural, one {1 day overdue} other {# days overdue}}",days_left:"{count, plural, one {Due in 1 day} other {# days left}}",search:"Search tasks...",all_groups:"All groups",overdue:"Overdue",due_soon:"Due soon",upcoming:"Upcoming",no_tasks:"No tasks found",done:"Done",description:"Description",last_performed:"Last Performed",progress:"Progress",history:"History",open_panel:"Open full panel",complete:"Complete",edit:"Edit in panel",remove:"Remove"}},ir={cards:{new:{title:"Create New Task",fields:{title:{heading:"Task Title"},interval_value:{heading:"Interval"},interval_type:{heading:"Interval Type"},last_performed:{heading:"Last Performed",helper:"Leave blank to use today"},anchor_date:{heading:"Anchor date",helper:"The schedule repeats from this fixed date"},tag:{heading:"Tag"},icon:{heading:"Icon"},label:{heading:"Label(s)"},area:{heading:"Area"},description:{heading:"Description"},trigger_type:{heading:"Trigger type"},count_entity_id:{heading:"Counted entity"},count_threshold:{heading:"Count threshold"},runtime_entity_id:{heading:"Runtime sensor"},runtime_threshold:{heading:"Runtime threshold"},group_id:{heading:"Group",helper:"Pick a group or type a new name"},notifications_enabled:{heading:"Enable notifications"},notification_target:{heading:"Notify service",helper:"Leave empty to use notify.notify"},notify_when:{heading:"Notify when"},notify_days_before_due:{heading:"Days before due",helper:"Optional due-soon reminder offset"},notification_time:{heading:"Time of day",helper:"When automatic notifications are sent"},notification_url:{heading:"Open URL",helper:"Optional URL for the notification's Open action"},active_months:{heading:"Active months",helper:"Seasonal tasks are only due in these months (empty = year-round)"}},sections:{optional:"Optional settings",notifications:"Notifications"},actions:{add_task:"Add Task"},alerts:{required:"Please fill all fields",error:"Error adding task. See console for details."}},current:{title:"Current Tasks",next:"Next Due",actions:{edit:"Edit",move:"Move to group",remove:"Remove"},alerts:{complete_success:'"{title}" marked complete. The next due date was recalculated.',complete_error:"Failed to mark task complete. See console for details.",remove_error:"Failed to remove the task. See console for details."},filter:{search:"Search tasks...",templates:"Browse templates",export:"Export CSV",clear:"Clear filters"}},groups:{title:"Groups",fields:{new_group:{heading:"New group"}},actions:{create:"Create",rename:"Rename",delete:"Delete",save:"Save",cancel:"Cancel"},empty:"No groups yet. Create one to organize your tasks.",confirm_delete:'Delete group "{title}"? Its tasks move to Ungrouped.',alerts:{error:"Failed to create the group. Check the browser console and Home Assistant logs.",exists:'Group "{title}" already exists.',rename_error:"Failed to rename the group. See console for details.",delete_error:"Failed to delete the group. See console for details."},confirm_delete_title:"Delete Group"}},dialog:{edit_task:{title:"Edit Task",fields:{interval_value:{heading:"Interval"},interval_type:{heading:"Interval Type"},last_performed:{heading:"Last Performed",helper:"Leave blank to use today"},anchor_date:{heading:"Anchor date",helper:"The schedule repeats from this fixed date"},tag:{heading:"Tag"},icon:{heading:"Icon"},label:{heading:"Label(s)"},area:{heading:"Area"},trigger_type:{heading:"Trigger type"},count_entity_id:{heading:"Counted entity"},count_threshold:{heading:"Count threshold"},runtime_entity_id:{heading:"Runtime sensor"},runtime_threshold:{heading:"Runtime threshold"},title:{heading:"Title"},description:{heading:"Description"},group_id:{heading:"Group",helper:"Pick a group or type a new name"},notifications_enabled:{heading:"Enable notifications"},notification_target:{heading:"Notify service",helper:"Leave empty to use notify.notify"},notify_when:{heading:"Notify when"},notify_days_before_due:{heading:"Days before due",helper:"Optional due-soon reminder offset"},notification_time:{heading:"Time of day",helper:"When automatic notifications are sent"},notification_url:{heading:"Open URL",helper:"Optional URL for the notification's Open action"},active_months:{heading:"Active months",helper:"Seasonal tasks are only due in these months (empty = year-round)"}},sections:{optional:"Optional settings",notifications:"Notifications",history:"History"},actions:{cancel:"Cancel",save:"Save",test_notification:"Send test notification"},alerts:{error:"Failed to save changes. See console for details.",test_error:"Failed to send the test notification. See console for details."}},move_task:{title:"Move task",fields:{group_id:{heading:"Group"}},actions:{cancel:"Cancel",move:"Move"}},confirm_complete:{title:"Mark Task Complete",message:'Mark "{title}" as complete? Last performed will be reset to today and the next due date will be recalculated based on the {interval} interval.',message_progress:'Mark "{title}" as complete? Progress ({interval}) will start over.',note_label:"Note (optional)",actions:{confirm:"Mark Complete"}},confirm_remove:{title:"Remove Task",message:'Remove "{title}"? This cannot be undone.',actions:{confirm:"Remove"}},templates:{title:"Task Templates",search:"Search templates...",import_csv:"Import from CSV",choose_csv:"Choose CSV file",csv_hint:"Columns: title (required), description, interval_value, interval_type, last_performed (YYYY-MM-DD), icon, group_id",csv_empty:"No importable rows found in the file.",no_matches:"No templates match your search.",import_count:"{count, plural, one {Import 1 task} other {Import # tasks}}",imported:"{count, plural, one {1 task imported.} other {# tasks imported.}}",import_failed:"Failed to import: {titles}",preview:{title:"Title",interval:"Interval",last_performed:"Last performed",group:"Group"}}}},rr={categories:{hvac:"HVAC",plumbing:"Plumbing",electrical:"Electrical",appliances:"Appliances",interior:"Interior",exterior:"Exterior",yard:"Yard & garden",safety:"Safety",vehicles:"Vehicles"}},ar={common:Yi,intervals:Qi,trigger_types:Ki,notifications:er,card:tr,panel:ir,templates:rr};var it={};z(it,{card:()=>cr,common:()=>nr,default:()=>hr,intervals:()=>or,notifications:()=>lr,panel:()=>ur,templates:()=>dr,trigger_types:()=>sr});var nr={loading:"Wird geladen...",none:"Keine",no_tasks:"Keine Aufgaben gefunden.",ungrouped:"Ohne Gruppe",cancel:"Abbrechen",invalid_date:"Ung\xFCltiges Datum eingegeben."},or={day:"Tag",days:"Tage",week:"Woche",weeks:"Wochen",month:"Monat",months:"Monate",year:"Jahr",years:"Jahre",every_uses:"Alle {value} Nutzungen",every_runtime:"Alle {value} Laufzeit"},sr={time:"Zeitbasiert",date:"Festes Datum",count:"Z\xE4hlerbasiert",runtime:"Laufzeitbasiert"},lr={when:{due:"F\xE4llig",overdue:"\xDCberf\xE4llig",due_and_overdue:"F\xE4llig und \xFCberf\xE4llig"}},cr={add_task:{added:'"{title}" wurde hinzugef\xFCgt.'},todo:{due_today:"Heute f\xE4llig",days_overdue:"{count, plural, one {1 Tag \xFCberf\xE4llig} other {# Tage \xFCberf\xE4llig}}",days_left:"{count, plural, one {F\xE4llig in 1 Tag} other {Noch # Tage}}",search:"Aufgaben suchen...",all_groups:"Alle Gruppen",overdue:"\xDCberf\xE4llig",due_soon:"Bald f\xE4llig",upcoming:"Anstehend",no_tasks:"Keine Aufgaben gefunden",done:"Erledigt",description:"Beschreibung",last_performed:"Zuletzt durchgef\xFChrt",progress:"Fortschritt",history:"Verlauf",open_panel:"Vollst\xE4ndiges Panel \xF6ffnen",complete:"Abschlie\xDFen",edit:"Im Panel bearbeiten",remove:"Entfernen"}},ur={cards:{new:{title:"Neue Aufgabe erstellen",fields:{title:{heading:"Aufgabentitel"},interval_value:{heading:"Intervall"},interval_type:{heading:"Intervalltyp"},last_performed:{heading:"Zuletzt durchgef\xFChrt",helper:"Leer lassen, um heutiges Datum zu verwenden"},anchor_date:{heading:"Ankerdatum",helper:"Der Zeitplan wiederholt sich ab diesem festen Datum"},tag:{heading:"Tag"},icon:{heading:"Symbol"},label:{heading:"Bezeichnung(en)"},area:{heading:"Bereich"},trigger_type:{heading:"Ausl\xF6ser-Typ"},count_entity_id:{heading:"Gez\xE4hlte Entit\xE4t"},count_threshold:{heading:"Z\xE4hl-Schwellwert"},runtime_entity_id:{heading:"Laufzeit-Sensor"},runtime_threshold:{heading:"Laufzeit-Schwellwert"},description:{heading:"Beschreibung"},group_id:{heading:"Gruppe",helper:"Gruppe w\xE4hlen oder neuen Namen eingeben"},notifications_enabled:{heading:"Benachrichtigungen aktivieren"},notification_target:{heading:"Benachrichtigungsdienst",helper:"Leer lassen, um notify.notify zu verwenden"},notify_when:{heading:"Benachrichtigen bei"},notify_days_before_due:{heading:"Tage vor F\xE4lligkeit",helper:"Optionale Vorab-Erinnerung"},notification_time:{heading:"Uhrzeit",helper:"Wann automatische Benachrichtigungen gesendet werden"},notification_url:{heading:"URL \xF6ffnen",helper:"Optionale URL f\xFCr die Aktion \u201E\xD6ffnen\u201C der Benachrichtigung"},active_months:{heading:"Aktive Monate",helper:"Saisonale Aufgaben sind nur in diesen Monaten f\xE4llig (leer = ganzj\xE4hrig)"}},sections:{optional:"Optionale Einstellungen",notifications:"Benachrichtigungen"},actions:{add_task:"Aufgabe hinzuf\xFCgen"},alerts:{required:"Bitte alle Felder ausf\xFCllen",error:"Fehler beim Hinzuf\xFCgen der Aufgabe. Siehe Konsole f\xFCr Details."}},current:{title:"Aktuelle Aufgaben",next:"N\xE4chste F\xE4lligkeit",actions:{edit:"Bearbeiten",move:"In Gruppe verschieben",remove:"Entfernen"},alerts:{complete_success:'"{title}" wurde als erledigt markiert. Das n\xE4chste F\xE4lligkeitsdatum wurde neu berechnet.',complete_error:"Aufgabe konnte nicht als erledigt markiert werden. Details siehe Konsole.",remove_error:"Aufgabe konnte nicht entfernt werden. Details in der Konsole."},filter:{search:"Aufgaben durchsuchen...",templates:"Vorlagen durchsuchen",export:"CSV exportieren",clear:"Filter zur\xFCcksetzen"}},groups:{title:"Gruppen",fields:{new_group:{heading:"Neue Gruppe"}},actions:{create:"Erstellen",rename:"Umbenennen",delete:"L\xF6schen",save:"Speichern",cancel:"Abbrechen"},empty:"Noch keine Gruppen. Erstellen Sie eine, um Aufgaben zu organisieren.",confirm_delete:'Gruppe "{title}" l\xF6schen? Ihre Aufgaben werden in "Ohne Gruppe" verschoben.',alerts:{error:"Gruppe konnte nicht erstellt werden. Pr\xFCfen Sie die Browserkonsole und die Home-Assistant-Protokolle.",exists:'Gruppe "{title}" existiert bereits.',rename_error:"Gruppe konnte nicht umbenannt werden. Details in der Konsole.",delete_error:"Gruppe konnte nicht gel\xF6scht werden. Details in der Konsole."},confirm_delete_title:"Gruppe l\xF6schen"}},dialog:{edit_task:{title:"Aufgabe bearbeiten",fields:{interval_value:{heading:"Intervall"},interval_type:{heading:"Intervalltyp"},last_performed:{heading:"Zuletzt durchgef\xFChrt",helper:"Leer lassen, um heutiges Datum zu verwenden"},anchor_date:{heading:"Ankerdatum",helper:"Der Zeitplan wiederholt sich ab diesem festen Datum"},tag:{heading:"Tag"},icon:{heading:"Symbol"},label:{heading:"Bezeichnung(en)"},area:{heading:"Bereich"},trigger_type:{heading:"Ausl\xF6ser-Typ"},count_entity_id:{heading:"Gez\xE4hlte Entit\xE4t"},count_threshold:{heading:"Z\xE4hl-Schwellwert"},runtime_entity_id:{heading:"Laufzeit-Sensor"},runtime_threshold:{heading:"Laufzeit-Schwellwert"},title:{heading:"Titel"},description:{heading:"Beschreibung"},group_id:{heading:"Gruppe",helper:"Gruppe w\xE4hlen oder neuen Namen eingeben"},notifications_enabled:{heading:"Benachrichtigungen aktivieren"},notification_target:{heading:"Benachrichtigungsdienst",helper:"Leer lassen, um notify.notify zu verwenden"},notify_when:{heading:"Benachrichtigen bei"},notify_days_before_due:{heading:"Tage vor F\xE4lligkeit",helper:"Optionale Vorab-Erinnerung"},notification_time:{heading:"Uhrzeit",helper:"Wann automatische Benachrichtigungen gesendet werden"},notification_url:{heading:"URL \xF6ffnen",helper:"Optionale URL f\xFCr die Aktion \u201E\xD6ffnen\u201C der Benachrichtigung"},active_months:{heading:"Aktive Monate",helper:"Saisonale Aufgaben sind nur in diesen Monaten f\xE4llig (leer = ganzj\xE4hrig)"}},sections:{optional:"Optionale Einstellungen",notifications:"Benachrichtigungen",history:"Verlauf"},actions:{cancel:"Abbrechen",save:"Speichern",test_notification:"Testbenachrichtigung senden"},alerts:{error:"\xC4nderungen konnten nicht gespeichert werden. Details in der Konsole.",test_error:"Testbenachrichtigung konnte nicht gesendet werden. Details in der Konsole."}},move_task:{title:"Aufgabe verschieben",fields:{group_id:{heading:"Gruppe"}},actions:{cancel:"Abbrechen",move:"Verschieben"}},confirm_complete:{title:"Aufgabe als erledigt markieren",message:'"{title}" als erledigt markieren? Zuletzt durchgef\xFChrt wird auf heute zur\xFCckgesetzt und das n\xE4chste F\xE4lligkeitsdatum wird basierend auf dem Intervall von {interval} neu berechnet.',message_progress:'"{title}" als erledigt markieren? Der Fortschritt ({interval}) beginnt von vorn.',note_label:"Notiz (optional)",actions:{confirm:"Als erledigt markieren"}},confirm_remove:{title:"Aufgabe entfernen",message:'"{title}" entfernen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.',actions:{confirm:"Entfernen"}},templates:{title:"Aufgabenvorlagen",search:"Vorlagen durchsuchen...",import_csv:"Aus CSV importieren",choose_csv:"CSV-Datei ausw\xE4hlen",csv_hint:"Spalten: title (erforderlich), description, interval_value, interval_type, last_performed (JJJJ-MM-TT), icon, group_id",csv_empty:"Keine importierbaren Zeilen in der Datei gefunden.",no_matches:"Keine Vorlagen entsprechen deiner Suche.",import_count:"{count, plural, one {1 Aufgabe importieren} other {# Aufgaben importieren}}",imported:"{count, plural, one {1 Aufgabe importiert.} other {# Aufgaben importiert.}}",import_failed:"Import fehlgeschlagen: {titles}",preview:{title:"Titel",interval:"Intervall",last_performed:"Zuletzt erledigt",group:"Gruppe"}}}},dr={categories:{hvac:"Heizung & Klima",plumbing:"Sanit\xE4r",electrical:"Elektrik",appliances:"Haushaltsger\xE4te",interior:"Innenbereich",exterior:"Au\xDFenbereich",yard:"Garten",safety:"Sicherheit",vehicles:"Fahrzeuge"}},hr={common:nr,intervals:or,trigger_types:sr,notifications:lr,card:cr,panel:ur,templates:dr};var rt={};z(rt,{card:()=>_r,common:()=>pr,default:()=>br,intervals:()=>mr,notifications:()=>fr,panel:()=>vr,templates:()=>yr,trigger_types:()=>gr});var pr={loading:"Cargando...",none:"Ninguno",no_tasks:"No se encontraron tareas.",ungrouped:"Sin grupo",cancel:"Cancelar",invalid_date:"La fecha introducida no es v\xE1lida."},mr={day:"D\xEDa",days:"D\xEDas",week:"Semana",weeks:"Semanas",month:"Mes",months:"Meses",year:"A\xF1o",years:"A\xF1os",every_uses:"Cada {value} usos",every_runtime:"Cada {value} de funcionamiento"},gr={time:"Basado en tiempo",date:"Fecha fija",count:"Basado en conteo",runtime:"Basado en tiempo de funcionamiento"},fr={when:{due:"Al vencer",overdue:"Con retraso",due_and_overdue:"Al vencer y con retraso"}},_r={add_task:{added:'Se a\xF1adi\xF3 "{title}".'},todo:{due_today:"Vence hoy",days_overdue:"{count, plural, one {1 d\xEDa de retraso} other {# d\xEDas de retraso}}",days_left:"{count, plural, one {Vence en 1 d\xEDa} other {Quedan # d\xEDas}}",search:"Buscar tareas...",all_groups:"Todos los grupos",overdue:"Atrasadas",due_soon:"Vencen pronto",upcoming:"Pr\xF3ximas",no_tasks:"No se encontraron tareas",done:"Hecho",description:"Descripci\xF3n",last_performed:"\xDAltima realizaci\xF3n",progress:"Progreso",history:"Historial",open_panel:"Abrir el panel completo",complete:"Completar",edit:"Editar en el panel",remove:"Eliminar"}},vr={cards:{new:{title:"Crear nueva tarea",fields:{title:{heading:"T\xEDtulo de la tarea"},interval_value:{heading:"Intervalo"},interval_type:{heading:"Tipo de intervalo"},last_performed:{heading:"\xDAltima realizaci\xF3n",helper:"Deja en blanco para usar hoy"},anchor_date:{heading:"Fecha de anclaje",helper:"La programaci\xF3n se repite a partir de esta fecha fija"},tag:{heading:"Tag"},icon:{heading:"Icono"},label:{heading:"Etiqueta(s)"},area:{heading:"\xC1rea"},description:{heading:"Descripci\xF3n"},trigger_type:{heading:"Tipo de disparador"},count_entity_id:{heading:"Entidad contada"},count_threshold:{heading:"Umbral de conteo"},runtime_entity_id:{heading:"Sensor de tiempo de funcionamiento"},runtime_threshold:{heading:"Umbral de tiempo de funcionamiento"},group_id:{heading:"Grupo",helper:"Elige un grupo o escribe un nombre nuevo"},notifications_enabled:{heading:"Activar notificaciones"},notification_target:{heading:"Servicio de notificaci\xF3n",helper:"Deja vac\xEDo para usar notify.notify"},notify_when:{heading:"Notificar cuando"},notify_days_before_due:{heading:"D\xEDas antes del vencimiento",helper:"Desfase opcional del recordatorio de vencimiento pr\xF3ximo"},notification_time:{heading:"Hora del d\xEDa",helper:"Cu\xE1ndo se env\xEDan las notificaciones autom\xE1ticas"},notification_url:{heading:"URL para abrir",helper:"URL opcional para la acci\xF3n Abrir de la notificaci\xF3n"},active_months:{heading:"Meses activos",helper:"Las tareas de temporada solo vencen en estos meses (vac\xEDo = todo el a\xF1o)"}},sections:{optional:"Ajustes opcionales",notifications:"Notificaciones"},actions:{add_task:"A\xF1adir tarea"},alerts:{required:"Completa todos los campos",error:"Error al a\xF1adir la tarea. Consulta la consola para m\xE1s detalles."}},current:{title:"Tareas actuales",next:"Pr\xF3ximo vencimiento",actions:{edit:"Editar",move:"Mover a un grupo",remove:"Eliminar"},alerts:{complete_success:'"{title}" marcada como completada. Se recalcul\xF3 la pr\xF3xima fecha de vencimiento.',complete_error:"No se pudo marcar la tarea como completada. Consulta la consola para m\xE1s detalles.",remove_error:"No se pudo eliminar la tarea. Consulta la consola para m\xE1s detalles."},filter:{search:"Buscar tareas...",templates:"Explorar plantillas",export:"Exportar CSV",clear:"Borrar filtros"}},groups:{title:"Grupos",fields:{new_group:{heading:"Nuevo grupo"}},actions:{create:"Crear",rename:"Renombrar",delete:"Eliminar",save:"Guardar",cancel:"Cancelar"},empty:"A\xFAn no hay grupos. Crea uno para organizar tus tareas.",confirm_delete:'\xBFEliminar el grupo "{title}"? Sus tareas se mover\xE1n a Sin grupo.',alerts:{error:"No se pudo crear el grupo. Revisa la consola del navegador y los registros de Home Assistant.",exists:'El grupo "{title}" ya existe.',rename_error:"No se pudo renombrar el grupo. Consulta la consola para m\xE1s detalles.",delete_error:"No se pudo eliminar el grupo. Consulta la consola para m\xE1s detalles."},confirm_delete_title:"Eliminar grupo"}},dialog:{edit_task:{title:"Editar tarea",fields:{interval_value:{heading:"Intervalo"},interval_type:{heading:"Tipo de intervalo"},last_performed:{heading:"\xDAltima realizaci\xF3n",helper:"Deja en blanco para usar hoy"},anchor_date:{heading:"Fecha de anclaje",helper:"La programaci\xF3n se repite a partir de esta fecha fija"},tag:{heading:"Tag"},icon:{heading:"Icono"},label:{heading:"Etiqueta(s)"},area:{heading:"\xC1rea"},trigger_type:{heading:"Tipo de disparador"},count_entity_id:{heading:"Entidad contada"},count_threshold:{heading:"Umbral de conteo"},runtime_entity_id:{heading:"Sensor de tiempo de funcionamiento"},runtime_threshold:{heading:"Umbral de tiempo de funcionamiento"},title:{heading:"T\xEDtulo"},description:{heading:"Descripci\xF3n"},group_id:{heading:"Grupo",helper:"Elige un grupo o escribe un nombre nuevo"},notifications_enabled:{heading:"Activar notificaciones"},notification_target:{heading:"Servicio de notificaci\xF3n",helper:"Deja vac\xEDo para usar notify.notify"},notify_when:{heading:"Notificar cuando"},notify_days_before_due:{heading:"D\xEDas antes del vencimiento",helper:"Desfase opcional del recordatorio de vencimiento pr\xF3ximo"},notification_time:{heading:"Hora del d\xEDa",helper:"Cu\xE1ndo se env\xEDan las notificaciones autom\xE1ticas"},notification_url:{heading:"URL para abrir",helper:"URL opcional para la acci\xF3n Abrir de la notificaci\xF3n"},active_months:{heading:"Meses activos",helper:"Las tareas de temporada solo vencen en estos meses (vac\xEDo = todo el a\xF1o)"}},sections:{optional:"Ajustes opcionales",notifications:"Notificaciones",history:"Historial"},actions:{cancel:"Cancelar",save:"Guardar",test_notification:"Enviar notificaci\xF3n de prueba"},alerts:{error:"No se pudieron guardar los cambios. Consulta la consola para m\xE1s detalles.",test_error:"No se pudo enviar la notificaci\xF3n de prueba. Consulta la consola para m\xE1s detalles."}},move_task:{title:"Mover tarea",fields:{group_id:{heading:"Grupo"}},actions:{cancel:"Cancelar",move:"Mover"}},confirm_complete:{title:"Marcar tarea como completada",message:'\xBFMarcar "{title}" como completada? La \xFAltima realizaci\xF3n se restablecer\xE1 a hoy y la pr\xF3xima fecha de vencimiento se recalcular\xE1 seg\xFAn el intervalo de {interval}.',message_progress:'\xBFMarcar "{title}" como completada? El progreso ({interval}) comenzar\xE1 de nuevo.',note_label:"Nota (opcional)",actions:{confirm:"Marcar como completada"}},confirm_remove:{title:"Eliminar tarea",message:'\xBFEliminar "{title}"? Esta acci\xF3n no se puede deshacer.',actions:{confirm:"Eliminar"}},templates:{title:"Plantillas de tareas",search:"Buscar plantillas...",import_csv:"Importar desde CSV",choose_csv:"Elegir archivo CSV",csv_hint:"Columnas: title (obligatoria), description, interval_value, interval_type, last_performed (AAAA-MM-DD), icon, group_id",csv_empty:"No se encontraron filas importables en el archivo.",no_matches:"Ninguna plantilla coincide con tu b\xFAsqueda.",import_count:"{count, plural, one {Importar 1 tarea} other {Importar # tareas}}",imported:"{count, plural, one {1 tarea importada.} other {# tareas importadas.}}",import_failed:"Error al importar: {titles}",preview:{title:"T\xEDtulo",interval:"Intervalo",last_performed:"\xDAltima realizaci\xF3n",group:"Grupo"}}}},yr={categories:{hvac:"Climatizaci\xF3n",plumbing:"Fontaner\xEDa",electrical:"Electricidad",appliances:"Electrodom\xE9sticos",interior:"Interior",exterior:"Exterior",yard:"Jard\xEDn",safety:"Seguridad",vehicles:"Veh\xEDculos"}},br={common:pr,intervals:mr,trigger_types:gr,notifications:fr,card:_r,panel:vr,templates:yr};var at={};z(at,{card:()=>Sr,common:()=>xr,default:()=>Cr,intervals:()=>wr,notifications:()=>Tr,panel:()=>Ar,templates:()=>kr,trigger_types:()=>Er});var xr={loading:"Chargement...",none:"Aucun",no_tasks:"Aucune t\xE2che trouv\xE9e.",ungrouped:"Sans groupe",cancel:"Annuler",invalid_date:"Date saisie non valide."},wr={day:"Jour",days:"Jours",week:"Semaine",weeks:"Semaines",month:"Mois",months:"Mois",year:"Ann\xE9e",years:"Ann\xE9es",every_uses:"Toutes les {value} utilisations",every_runtime:"Tous les {value} de fonctionnement"},Er={time:"Bas\xE9 sur le temps",date:"Date fixe",count:"Bas\xE9 sur un compteur",runtime:"Bas\xE9 sur le fonctionnement"},Tr={when:{due:"\xC0 \xE9ch\xE9ance",overdue:"En retard",due_and_overdue:"\xC0 \xE9ch\xE9ance et en retard"}},Sr={add_task:{added:'"{title}" ajout\xE9e.'},todo:{due_today:"\xC9ch\xE9ance aujourd'hui",days_overdue:"{count, plural, one {1 jour de retard} other {# jours de retard}}",days_left:"{count, plural, one {\xC9ch\xE9ance dans 1 jour} other {# jours restants}}",search:"Rechercher des t\xE2ches...",all_groups:"Tous les groupes",overdue:"En retard",due_soon:"\xC9ch\xE9ance proche",upcoming:"\xC0 venir",no_tasks:"Aucune t\xE2che trouv\xE9e",done:"Termin\xE9",description:"Description",last_performed:"Derni\xE8re ex\xE9cution",progress:"Progression",history:"Historique",open_panel:"Ouvrir le panneau complet",complete:"Terminer",edit:"Modifier dans le panneau",remove:"Supprimer"}},Ar={cards:{new:{title:"Cr\xE9er une nouvelle t\xE2che",fields:{title:{heading:"Titre de la t\xE2che"},interval_value:{heading:"Intervalle"},interval_type:{heading:"Type d'intervalle"},last_performed:{heading:"Derni\xE8re ex\xE9cution",helper:"Laissez vide pour utiliser aujourd'hui"},anchor_date:{heading:"Date d'ancrage",helper:"Le planning se r\xE9p\xE8te \xE0 partir de cette date fixe"},tag:{heading:"Tag"},icon:{heading:"Ic\xF4ne"},label:{heading:"Libell\xE9(s)"},area:{heading:"Pi\xE8ce"},description:{heading:"Description"},trigger_type:{heading:"Type de d\xE9clencheur"},count_entity_id:{heading:"Entit\xE9 compt\xE9e"},count_threshold:{heading:"Seuil de comptage"},runtime_entity_id:{heading:"Capteur de fonctionnement"},runtime_threshold:{heading:"Seuil de fonctionnement"},group_id:{heading:"Groupe",helper:"Choisissez un groupe ou saisissez un nouveau nom"},notifications_enabled:{heading:"Activer les notifications"},notification_target:{heading:"Service de notification",helper:"Laissez vide pour utiliser notify.notify"},notify_when:{heading:"Notifier quand"},notify_days_before_due:{heading:"Jours avant l'\xE9ch\xE9ance",helper:"D\xE9calage facultatif du rappel d'\xE9ch\xE9ance proche"},notification_time:{heading:"Heure de la journ\xE9e",helper:"Heure d'envoi des notifications automatiques"},notification_url:{heading:"URL \xE0 ouvrir",helper:"URL facultative pour l'action Ouvrir de la notification"},active_months:{heading:"Mois actifs",helper:"Les t\xE2ches saisonni\xE8res ne sont dues que pendant ces mois (vide = toute l'ann\xE9e)"}},sections:{optional:"Param\xE8tres facultatifs",notifications:"Notifications"},actions:{add_task:"Ajouter la t\xE2che"},alerts:{required:"Veuillez remplir tous les champs",error:"Erreur lors de l'ajout de la t\xE2che. Consultez la console pour plus de d\xE9tails."}},current:{title:"T\xE2ches actuelles",next:"Prochaine \xE9ch\xE9ance",actions:{edit:"Modifier",move:"D\xE9placer vers un groupe",remove:"Supprimer"},alerts:{complete_success:'"{title}" marqu\xE9e comme termin\xE9e. La prochaine \xE9ch\xE9ance a \xE9t\xE9 recalcul\xE9e.',complete_error:"Impossible de marquer la t\xE2che comme termin\xE9e. Consultez la console pour plus de d\xE9tails.",remove_error:"Impossible de supprimer la t\xE2che. Consultez la console pour plus de d\xE9tails."},filter:{search:"Rechercher des t\xE2ches...",templates:"Parcourir les mod\xE8les",export:"Exporter en CSV",clear:"Effacer les filtres"}},groups:{title:"Groupes",fields:{new_group:{heading:"Nouveau groupe"}},actions:{create:"Cr\xE9er",rename:"Renommer",delete:"Supprimer",save:"Enregistrer",cancel:"Annuler"},empty:"Aucun groupe pour le moment. Cr\xE9ez-en un pour organiser vos t\xE2ches.",confirm_delete:'Supprimer le groupe "{title}" ? Ses t\xE2ches seront d\xE9plac\xE9es vers Sans groupe.',alerts:{error:"Impossible de cr\xE9er le groupe. V\xE9rifiez la console du navigateur et les journaux de Home Assistant.",exists:'Le groupe "{title}" existe d\xE9j\xE0.',rename_error:"Impossible de renommer le groupe. Consultez la console pour plus de d\xE9tails.",delete_error:"Impossible de supprimer le groupe. Consultez la console pour plus de d\xE9tails."},confirm_delete_title:"Supprimer le groupe"}},dialog:{edit_task:{title:"Modifier la t\xE2che",fields:{interval_value:{heading:"Intervalle"},interval_type:{heading:"Type d'intervalle"},last_performed:{heading:"Derni\xE8re ex\xE9cution",helper:"Laissez vide pour utiliser aujourd'hui"},anchor_date:{heading:"Date d'ancrage",helper:"Le planning se r\xE9p\xE8te \xE0 partir de cette date fixe"},tag:{heading:"Tag"},icon:{heading:"Ic\xF4ne"},label:{heading:"Libell\xE9(s)"},area:{heading:"Pi\xE8ce"},trigger_type:{heading:"Type de d\xE9clencheur"},count_entity_id:{heading:"Entit\xE9 compt\xE9e"},count_threshold:{heading:"Seuil de comptage"},runtime_entity_id:{heading:"Capteur de fonctionnement"},runtime_threshold:{heading:"Seuil de fonctionnement"},title:{heading:"Titre"},description:{heading:"Description"},group_id:{heading:"Groupe",helper:"Choisissez un groupe ou saisissez un nouveau nom"},notifications_enabled:{heading:"Activer les notifications"},notification_target:{heading:"Service de notification",helper:"Laissez vide pour utiliser notify.notify"},notify_when:{heading:"Notifier quand"},notify_days_before_due:{heading:"Jours avant l'\xE9ch\xE9ance",helper:"D\xE9calage facultatif du rappel d'\xE9ch\xE9ance proche"},notification_time:{heading:"Heure de la journ\xE9e",helper:"Heure d'envoi des notifications automatiques"},notification_url:{heading:"URL \xE0 ouvrir",helper:"URL facultative pour l'action Ouvrir de la notification"},active_months:{heading:"Mois actifs",helper:"Les t\xE2ches saisonni\xE8res ne sont dues que pendant ces mois (vide = toute l'ann\xE9e)"}},sections:{optional:"Param\xE8tres facultatifs",notifications:"Notifications",history:"Historique"},actions:{cancel:"Annuler",save:"Enregistrer",test_notification:"Envoyer une notification de test"},alerts:{error:"Impossible d'enregistrer les modifications. Consultez la console pour plus de d\xE9tails.",test_error:"Impossible d'envoyer la notification de test. Consultez la console pour plus de d\xE9tails."}},move_task:{title:"D\xE9placer la t\xE2che",fields:{group_id:{heading:"Groupe"}},actions:{cancel:"Annuler",move:"D\xE9placer"}},confirm_complete:{title:"Marquer la t\xE2che comme termin\xE9e",message:`Marquer "{title}" comme termin\xE9e ? La derni\xE8re ex\xE9cution sera r\xE9initialis\xE9e \xE0 aujourd'hui et la prochaine \xE9ch\xE9ance sera recalcul\xE9e en fonction de l'intervalle {interval}.`,message_progress:'Marquer "{title}" comme termin\xE9e ? La progression ({interval}) repartira de z\xE9ro.',note_label:"Note (facultatif)",actions:{confirm:"Marquer comme termin\xE9e"}},confirm_remove:{title:"Supprimer la t\xE2che",message:'Supprimer "{title}" ? Cette action est irr\xE9versible.',actions:{confirm:"Supprimer"}},templates:{title:"Mod\xE8les de t\xE2ches",search:"Rechercher des mod\xE8les...",import_csv:"Importer depuis un CSV",choose_csv:"Choisir un fichier CSV",csv_hint:"Colonnes : title (obligatoire), description, interval_value, interval_type, last_performed (AAAA-MM-JJ), icon, group_id",csv_empty:"Aucune ligne importable trouv\xE9e dans le fichier.",no_matches:"Aucun mod\xE8le ne correspond \xE0 votre recherche.",import_count:"{count, plural, one {Importer 1 t\xE2che} other {Importer # t\xE2ches}}",imported:"{count, plural, one {1 t\xE2che import\xE9e.} other {# t\xE2ches import\xE9es.}}",import_failed:"\xC9chec de l'importation : {titles}",preview:{title:"Titre",interval:"Intervalle",last_performed:"Derni\xE8re ex\xE9cution",group:"Groupe"}}}},kr={categories:{hvac:"CVC",plumbing:"Plomberie",electrical:"\xC9lectricit\xE9",appliances:"\xC9lectrom\xE9nager",interior:"Int\xE9rieur",exterior:"Ext\xE9rieur",yard:"Jardin",safety:"S\xE9curit\xE9",vehicles:"V\xE9hicules"}},Cr={common:xr,intervals:wr,trigger_types:Er,notifications:Tr,card:Sr,panel:Ar,templates:kr};var nt={};z(nt,{card:()=>Pr,common:()=>Nr,default:()=>Or,intervals:()=>Hr,notifications:()=>zr,panel:()=>Ir,templates:()=>Lr,trigger_types:()=>Dr});var Nr={loading:"Caricamento...",none:"Nessuno",no_tasks:"Nessuna attivit\xE0 trovata.",ungrouped:"Senza gruppo",cancel:"Annulla",invalid_date:"Data inserita non valida."},Hr={day:"Giorno",days:"Giorni",week:"Settimana",weeks:"Settimane",month:"Mese",months:"Mesi",year:"Anno",years:"Anni",every_uses:"Ogni {value} utilizzi",every_runtime:"Ogni {value} di funzionamento"},Dr={time:"Basato sul tempo",date:"Data fissa",count:"Basato sul conteggio",runtime:"Basato sul tempo di funzionamento"},zr={when:{due:"In scadenza",overdue:"Scadute",due_and_overdue:"In scadenza e scadute"}},Pr={add_task:{added:'"{title}" aggiunta.'},todo:{due_today:"Scade oggi",days_overdue:"{count, plural, one {1 giorno di ritardo} other {# giorni di ritardo}}",days_left:"{count, plural, one {Scade tra 1 giorno} other {# giorni rimanenti}}",search:"Cerca attivit\xE0...",all_groups:"Tutti i gruppi",overdue:"Scadute",due_soon:"In scadenza",upcoming:"In arrivo",no_tasks:"Nessuna attivit\xE0 trovata",done:"Completate",description:"Descrizione",last_performed:"Ultima esecuzione",progress:"Avanzamento",history:"Cronologia",open_panel:"Apri pannello completo",complete:"Completa",edit:"Modifica nel pannello",remove:"Rimuovi"}},Ir={cards:{new:{title:"Crea nuova attivit\xE0",fields:{title:{heading:"Titolo attivit\xE0"},interval_value:{heading:"Intervallo"},interval_type:{heading:"Tipo di intervallo"},last_performed:{heading:"Ultima esecuzione",helper:"Lascia vuoto per usare oggi"},anchor_date:{heading:"Data di riferimento",helper:"La pianificazione si ripete a partire da questa data fissa"},tag:{heading:"Tag"},icon:{heading:"Icona"},label:{heading:"Etichetta/e"},area:{heading:"Area"},description:{heading:"Descrizione"},trigger_type:{heading:"Tipo di attivazione"},count_entity_id:{heading:"Entit\xE0 conteggiata"},count_threshold:{heading:"Soglia di conteggio"},runtime_entity_id:{heading:"Sensore tempo di funzionamento"},runtime_threshold:{heading:"Soglia tempo di funzionamento"},group_id:{heading:"Gruppo",helper:"Scegli un gruppo o digita un nuovo nome"},notifications_enabled:{heading:"Abilita notifiche"},notification_target:{heading:"Servizio di notifica",helper:"Lascia vuoto per usare notify.notify"},notify_when:{heading:"Notifica quando"},notify_days_before_due:{heading:"Giorni prima della scadenza",helper:"Anticipo facoltativo per il promemoria di scadenza imminente"},notification_time:{heading:"Ora del giorno",helper:"Quando vengono inviate le notifiche automatiche"},notification_url:{heading:"URL da aprire",helper:"URL facoltativo per l'azione Apri della notifica"},active_months:{heading:"Mesi attivi",helper:"Le attivit\xE0 stagionali scadono solo in questi mesi (vuoto = tutto l'anno)"}},sections:{optional:"Impostazioni facoltative",notifications:"Notifiche"},actions:{add_task:"Aggiungi attivit\xE0"},alerts:{required:"Compila tutti i campi",error:"Errore durante l'aggiunta dell'attivit\xE0. Vedi la console per i dettagli."}},current:{title:"Attivit\xE0 correnti",next:"Prossima scadenza",actions:{edit:"Modifica",move:"Sposta nel gruppo",remove:"Rimuovi"},alerts:{complete_success:'"{title}" contrassegnata come completata. La prossima scadenza \xE8 stata ricalcolata.',complete_error:"Impossibile contrassegnare l'attivit\xE0 come completata. Vedi la console per i dettagli.",remove_error:"Impossibile rimuovere l'attivit\xE0. Vedi la console per i dettagli."},filter:{search:"Cerca attivit\xE0...",templates:"Sfoglia modelli",export:"Esporta CSV",clear:"Cancella filtri"}},groups:{title:"Gruppi",fields:{new_group:{heading:"Nuovo gruppo"}},actions:{create:"Crea",rename:"Rinomina",delete:"Elimina",save:"Salva",cancel:"Annulla"},empty:"Nessun gruppo ancora. Creane uno per organizzare le tue attivit\xE0.",confirm_delete:'Eliminare il gruppo "{title}"? Le sue attivit\xE0 passeranno a Senza gruppo.',alerts:{error:"Impossibile creare il gruppo. Controlla la console del browser e i log di Home Assistant.",exists:'Il gruppo "{title}" esiste gi\xE0.',rename_error:"Impossibile rinominare il gruppo. Vedi la console per i dettagli.",delete_error:"Impossibile eliminare il gruppo. Vedi la console per i dettagli."},confirm_delete_title:"Elimina gruppo"}},dialog:{edit_task:{title:"Modifica attivit\xE0",fields:{interval_value:{heading:"Intervallo"},interval_type:{heading:"Tipo di intervallo"},last_performed:{heading:"Ultima esecuzione",helper:"Lascia vuoto per usare oggi"},anchor_date:{heading:"Data di riferimento",helper:"La pianificazione si ripete a partire da questa data fissa"},tag:{heading:"Tag"},icon:{heading:"Icona"},label:{heading:"Etichetta/e"},area:{heading:"Area"},trigger_type:{heading:"Tipo di attivazione"},count_entity_id:{heading:"Entit\xE0 conteggiata"},count_threshold:{heading:"Soglia di conteggio"},runtime_entity_id:{heading:"Sensore tempo di funzionamento"},runtime_threshold:{heading:"Soglia tempo di funzionamento"},title:{heading:"Titolo"},description:{heading:"Descrizione"},group_id:{heading:"Gruppo",helper:"Scegli un gruppo o digita un nuovo nome"},notifications_enabled:{heading:"Abilita notifiche"},notification_target:{heading:"Servizio di notifica",helper:"Lascia vuoto per usare notify.notify"},notify_when:{heading:"Notifica quando"},notify_days_before_due:{heading:"Giorni prima della scadenza",helper:"Anticipo facoltativo per il promemoria di scadenza imminente"},notification_time:{heading:"Ora del giorno",helper:"Quando vengono inviate le notifiche automatiche"},notification_url:{heading:"URL da aprire",helper:"URL facoltativo per l'azione Apri della notifica"},active_months:{heading:"Mesi attivi",helper:"Le attivit\xE0 stagionali scadono solo in questi mesi (vuoto = tutto l'anno)"}},sections:{optional:"Impostazioni facoltative",notifications:"Notifiche",history:"Cronologia"},actions:{cancel:"Annulla",save:"Salva",test_notification:"Invia notifica di prova"},alerts:{error:"Impossibile salvare le modifiche. Vedi la console per i dettagli.",test_error:"Impossibile inviare la notifica di prova. Vedi la console per i dettagli."}},move_task:{title:"Sposta attivit\xE0",fields:{group_id:{heading:"Gruppo"}},actions:{cancel:"Annulla",move:"Sposta"}},confirm_complete:{title:"Contrassegna attivit\xE0 come completata",message:`Contrassegnare "{title}" come completata? L'ultima esecuzione sar\xE0 reimpostata a oggi e la prossima scadenza sar\xE0 ricalcolata in base all'intervallo {interval}.`,message_progress:`Contrassegnare "{title}" come completata? L'avanzamento ({interval}) ripartir\xE0 da zero.`,note_label:"Nota (facoltativa)",actions:{confirm:"Contrassegna come completata"}},confirm_remove:{title:"Rimuovi attivit\xE0",message:`Rimuovere "{title}"? L'operazione non pu\xF2 essere annullata.`,actions:{confirm:"Rimuovi"}},templates:{title:"Modelli di attivit\xE0",search:"Cerca modelli...",import_csv:"Importa da CSV",choose_csv:"Scegli file CSV",csv_hint:"Colonne: title (obbligatoria), description, interval_value, interval_type, last_performed (AAAA-MM-GG), icon, group_id",csv_empty:"Nessuna riga importabile trovata nel file.",no_matches:"Nessun modello corrisponde alla ricerca.",import_count:"{count, plural, one {Importa 1 attivit\xE0} other {Importa # attivit\xE0}}",imported:"{count, plural, one {1 attivit\xE0 importata.} other {# attivit\xE0 importate.}}",import_failed:"Importazione non riuscita: {titles}",preview:{title:"Titolo",interval:"Intervallo",last_performed:"Ultima esecuzione",group:"Gruppo"}}}},Lr={categories:{hvac:"Climatizzazione",plumbing:"Idraulica",electrical:"Impianto elettrico",appliances:"Elettrodomestici",interior:"Interni",exterior:"Esterni",yard:"Giardino",safety:"Sicurezza",vehicles:"Veicoli"}},Or={common:Nr,intervals:Hr,trigger_types:Dr,notifications:zr,card:Pr,panel:Ir,templates:Lr};var ot={};z(ot,{card:()=>Ur,common:()=>Rr,default:()=>Fr,intervals:()=>Br,notifications:()=>Mr,panel:()=>jr,templates:()=>Gr,trigger_types:()=>$r});var Rr={loading:"Laden...",none:"Geen",no_tasks:"Geen taken gevonden.",ungrouped:"Niet gegroepeerd",cancel:"Annuleren",invalid_date:"Ongeldige datum ingevoerd."},Br={day:"Dag",days:"Dagen",week:"Week",weeks:"Weken",month:"Maand",months:"Maanden",year:"Jaar",years:"Jaren",every_uses:"Om de {value} gebruiksbeurten",every_runtime:"Om de {value} draaitijd"},$r={time:"Op basis van tijd",date:"Vaste datum",count:"Op basis van aantal",runtime:"Op basis van draaitijd"},Mr={when:{due:"Op vervaldatum",overdue:"Achterstallig",due_and_overdue:"Op vervaldatum en achterstallig"}},Ur={add_task:{added:'"{title}" toegevoegd.'},todo:{due_today:"Vervalt vandaag",days_overdue:"{count, plural, one {1 dag achterstallig} other {# dagen achterstallig}}",days_left:"{count, plural, one {Vervalt over 1 dag} other {Nog # dagen}}",search:"Taken zoeken...",all_groups:"Alle groepen",overdue:"Achterstallig",due_soon:"Vervalt binnenkort",upcoming:"Aankomend",no_tasks:"Geen taken gevonden",done:"Voltooid",description:"Beschrijving",last_performed:"Laatst uitgevoerd",progress:"Voortgang",history:"Geschiedenis",open_panel:"Volledig paneel openen",complete:"Voltooien",edit:"Bewerken in paneel",remove:"Verwijderen"}},jr={cards:{new:{title:"Nieuwe taak aanmaken",fields:{title:{heading:"Taaktitel"},interval_value:{heading:"Interval"},interval_type:{heading:"Intervaltype"},last_performed:{heading:"Laatst uitgevoerd",helper:"Laat leeg om vandaag te gebruiken"},anchor_date:{heading:"Ankerdatum",helper:"Het schema herhaalt zich vanaf deze vaste datum"},tag:{heading:"Tag"},icon:{heading:"Pictogram"},label:{heading:"Label(s)"},area:{heading:"Ruimte"},description:{heading:"Beschrijving"},trigger_type:{heading:"Triggertype"},count_entity_id:{heading:"Getelde entiteit"},count_threshold:{heading:"Teldrempel"},runtime_entity_id:{heading:"Draaitijdsensor"},runtime_threshold:{heading:"Draaitijddrempel"},group_id:{heading:"Groep",helper:"Kies een groep of typ een nieuwe naam"},notifications_enabled:{heading:"Meldingen inschakelen"},notification_target:{heading:"Meldingsservice",helper:"Laat leeg om notify.notify te gebruiken"},notify_when:{heading:"Melden wanneer"},notify_days_before_due:{heading:"Dagen v\xF3\xF3r vervaldatum",helper:"Optionele vooruitlooptijd voor de herinnering"},notification_time:{heading:"Tijdstip",helper:"Wanneer automatische meldingen worden verzonden"},notification_url:{heading:"URL openen",helper:"Optionele URL voor de Open-actie van de melding"},active_months:{heading:"Actieve maanden",helper:"Seizoenstaken zijn alleen in deze maanden verschuldigd (leeg = het hele jaar)"}},sections:{optional:"Optionele instellingen",notifications:"Meldingen"},actions:{add_task:"Taak toevoegen"},alerts:{required:"Vul alle velden in",error:"Fout bij het toevoegen van de taak. Zie de console voor details."}},current:{title:"Huidige taken",next:"Volgende vervaldatum",actions:{edit:"Bewerken",move:"Verplaatsen naar groep",remove:"Verwijderen"},alerts:{complete_success:'"{title}" gemarkeerd als voltooid. De volgende vervaldatum is opnieuw berekend.',complete_error:"Kan de taak niet als voltooid markeren. Zie de console voor details.",remove_error:"Kan de taak niet verwijderen. Zie de console voor details."},filter:{search:"Taken zoeken...",templates:"Sjablonen bekijken",export:"CSV exporteren",clear:"Filters wissen"}},groups:{title:"Groepen",fields:{new_group:{heading:"Nieuwe groep"}},actions:{create:"Aanmaken",rename:"Hernoemen",delete:"Verwijderen",save:"Opslaan",cancel:"Annuleren"},empty:"Nog geen groepen. Maak er een aan om je taken te organiseren.",confirm_delete:'Groep "{title}" verwijderen? De taken worden verplaatst naar Niet gegroepeerd.',alerts:{error:"Kan de groep niet aanmaken. Controleer de browserconsole en de Home Assistant-logboeken.",exists:'Groep "{title}" bestaat al.',rename_error:"Kan de groep niet hernoemen. Zie de console voor details.",delete_error:"Kan de groep niet verwijderen. Zie de console voor details."},confirm_delete_title:"Groep verwijderen"}},dialog:{edit_task:{title:"Taak bewerken",fields:{interval_value:{heading:"Interval"},interval_type:{heading:"Intervaltype"},last_performed:{heading:"Laatst uitgevoerd",helper:"Laat leeg om vandaag te gebruiken"},anchor_date:{heading:"Ankerdatum",helper:"Het schema herhaalt zich vanaf deze vaste datum"},tag:{heading:"Tag"},icon:{heading:"Pictogram"},label:{heading:"Label(s)"},area:{heading:"Ruimte"},trigger_type:{heading:"Triggertype"},count_entity_id:{heading:"Getelde entiteit"},count_threshold:{heading:"Teldrempel"},runtime_entity_id:{heading:"Draaitijdsensor"},runtime_threshold:{heading:"Draaitijddrempel"},title:{heading:"Titel"},description:{heading:"Beschrijving"},group_id:{heading:"Groep",helper:"Kies een groep of typ een nieuwe naam"},notifications_enabled:{heading:"Meldingen inschakelen"},notification_target:{heading:"Meldingsservice",helper:"Laat leeg om notify.notify te gebruiken"},notify_when:{heading:"Melden wanneer"},notify_days_before_due:{heading:"Dagen v\xF3\xF3r vervaldatum",helper:"Optionele vooruitlooptijd voor de herinnering"},notification_time:{heading:"Tijdstip",helper:"Wanneer automatische meldingen worden verzonden"},notification_url:{heading:"URL openen",helper:"Optionele URL voor de Open-actie van de melding"},active_months:{heading:"Actieve maanden",helper:"Seizoenstaken zijn alleen in deze maanden verschuldigd (leeg = het hele jaar)"}},sections:{optional:"Optionele instellingen",notifications:"Meldingen",history:"Geschiedenis"},actions:{cancel:"Annuleren",save:"Opslaan",test_notification:"Testmelding verzenden"},alerts:{error:"Kan de wijzigingen niet opslaan. Zie de console voor details.",test_error:"Kan de testmelding niet verzenden. Zie de console voor details."}},move_task:{title:"Taak verplaatsen",fields:{group_id:{heading:"Groep"}},actions:{cancel:"Annuleren",move:"Verplaatsen"}},confirm_complete:{title:"Taak als voltooid markeren",message:'"{title}" als voltooid markeren? Laatst uitgevoerd wordt teruggezet naar vandaag en de volgende vervaldatum wordt opnieuw berekend op basis van het interval {interval}.',message_progress:'"{title}" als voltooid markeren? De voortgang ({interval}) begint opnieuw.',note_label:"Notitie (optioneel)",actions:{confirm:"Als voltooid markeren"}},confirm_remove:{title:"Taak verwijderen",message:'"{title}" verwijderen? Dit kan niet ongedaan worden gemaakt.',actions:{confirm:"Verwijderen"}},templates:{title:"Taaksjablonen",search:"Sjablonen zoeken...",import_csv:"Importeren uit CSV",choose_csv:"CSV-bestand kiezen",csv_hint:"Kolommen: title (verplicht), description, interval_value, interval_type, last_performed (JJJJ-MM-DD), icon, group_id",csv_empty:"Geen importeerbare rijen gevonden in het bestand.",no_matches:"Geen sjablonen gevonden voor je zoekopdracht.",import_count:"{count, plural, one {1 taak importeren} other {# taken importeren}}",imported:"{count, plural, one {1 taak ge\xEFmporteerd.} other {# taken ge\xEFmporteerd.}}",import_failed:"Importeren mislukt: {titles}",preview:{title:"Titel",interval:"Interval",last_performed:"Laatst uitgevoerd",group:"Groep"}}}},Gr={categories:{hvac:"Verwarming & airco",plumbing:"Sanitair",electrical:"Elektra",appliances:"Apparaten",interior:"Binnen",exterior:"Buiten",yard:"Tuin",safety:"Veiligheid",vehicles:"Voertuigen"}},Fr={common:Rr,intervals:Br,trigger_types:$r,notifications:Mr,card:Ur,panel:jr,templates:Gr};var st={};z(st,{card:()=>Zr,common:()=>Vr,default:()=>Qr,intervals:()=>Wr,notifications:()=>Xr,panel:()=>Jr,templates:()=>Yr,trigger_types:()=>qr});var Vr={loading:"\u0141adowanie...",none:"Brak",no_tasks:"Nie znaleziono zada\u0144.",ungrouped:"Bez grupy",cancel:"Anuluj",invalid_date:"Wprowadzono nieprawid\u0142ow\u0105 dat\u0119."},Wr={day:"Dzie\u0144",days:"Dni",week:"Tydzie\u0144",weeks:"Tygodnie",month:"Miesi\u0105c",months:"Miesi\u0105ce",year:"Rok",years:"Lata",every_uses:"Co {value} u\u017Cy\u0107",every_runtime:"Co {value} czasu pracy"},qr={time:"Na podstawie czasu",date:"Sta\u0142a data",count:"Na podstawie liczby u\u017Cy\u0107",runtime:"Na podstawie czasu pracy"},Xr={when:{due:"Termin",overdue:"Po terminie",due_and_overdue:"Termin i po terminie"}},Zr={add_task:{added:'Dodano "{title}".'},todo:{due_today:"Termin dzisiaj",days_overdue:"{count, plural, one {1 dzie\u0144 po terminie} few {# dni po terminie} many {# dni po terminie} other {# dnia po terminie}}",days_left:"{count, plural, one {Termin za 1 dzie\u0144} few {Zosta\u0142y # dni} many {Zosta\u0142o # dni} other {Zosta\u0142o # dnia}}",search:"Szukaj zada\u0144...",all_groups:"Wszystkie grupy",overdue:"Po terminie",due_soon:"Wkr\xF3tce termin",upcoming:"Nadchodz\u0105ce",no_tasks:"Nie znaleziono zada\u0144",done:"Wykonane",description:"Opis",last_performed:"Ostatnio wykonane",progress:"Post\u0119p",history:"Historia",open_panel:"Otw\xF3rz pe\u0142ny panel",complete:"Wykonane",edit:"Edytuj w panelu",remove:"Usu\u0144"}},Jr={cards:{new:{title:"Utw\xF3rz nowe zadanie",fields:{title:{heading:"Tytu\u0142 zadania"},interval_value:{heading:"Interwa\u0142"},interval_type:{heading:"Typ interwa\u0142u"},last_performed:{heading:"Ostatnio wykonane",helper:"Pozostaw puste, aby u\u017Cy\u0107 dzisiejszej daty"},anchor_date:{heading:"Data odniesienia",helper:"Harmonogram powtarza si\u0119 od tej sta\u0142ej daty"},tag:{heading:"Tag"},icon:{heading:"Ikona"},label:{heading:"Etykieta(-y)"},area:{heading:"Obszar"},description:{heading:"Opis"},trigger_type:{heading:"Typ wyzwalacza"},count_entity_id:{heading:"Zliczana encja"},count_threshold:{heading:"Pr\xF3g liczby u\u017Cy\u0107"},runtime_entity_id:{heading:"Czujnik czasu pracy"},runtime_threshold:{heading:"Pr\xF3g czasu pracy"},group_id:{heading:"Grupa",helper:"Wybierz grup\u0119 lub wpisz now\u0105 nazw\u0119"},notifications_enabled:{heading:"W\u0142\u0105cz powiadomienia"},notification_target:{heading:"Us\u0142uga powiadomie\u0144",helper:"Pozostaw puste, aby u\u017Cy\u0107 notify.notify"},notify_when:{heading:"Powiadamiaj, gdy"},notify_days_before_due:{heading:"Dni przed terminem",helper:"Opcjonalne wyprzedzenie przypomnienia o zbli\u017Caj\u0105cym si\u0119 terminie"},notification_time:{heading:"Pora dnia",helper:"Kiedy wysy\u0142ane s\u0105 automatyczne powiadomienia"},notification_url:{heading:"Adres URL do otwarcia",helper:"Opcjonalny adres URL dla akcji Otw\xF3rz w powiadomieniu"},active_months:{heading:"Aktywne miesi\u0105ce",helper:"Zadania sezonowe s\u0105 wymagane tylko w tych miesi\u0105cach (puste = ca\u0142y rok)"}},sections:{optional:"Ustawienia opcjonalne",notifications:"Powiadomienia"},actions:{add_task:"Dodaj zadanie"},alerts:{required:"Wype\u0142nij wszystkie pola",error:"B\u0142\u0105d podczas dodawania zadania. Szczeg\xF3\u0142y w konsoli."}},current:{title:"Bie\u017C\u0105ce zadania",next:"Nast\u0119pny termin",actions:{edit:"Edytuj",move:"Przenie\u015B do grupy",remove:"Usu\u0144"},alerts:{complete_success:'"{title}" oznaczono jako wykonane. Nast\u0119pny termin zosta\u0142 przeliczony.',complete_error:"Nie uda\u0142o si\u0119 oznaczy\u0107 zadania jako wykonane. Szczeg\xF3\u0142y w konsoli.",remove_error:"Nie uda\u0142o si\u0119 usun\u0105\u0107 zadania. Szczeg\xF3\u0142y w konsoli."},filter:{search:"Szukaj zada\u0144...",templates:"Przegl\u0105daj szablony",export:"Eksportuj CSV",clear:"Wyczy\u015B\u0107 filtry"}},groups:{title:"Grupy",fields:{new_group:{heading:"Nowa grupa"}},actions:{create:"Utw\xF3rz",rename:"Zmie\u0144 nazw\u0119",delete:"Usu\u0144",save:"Zapisz",cancel:"Anuluj"},empty:"Brak grup. Utw\xF3rz grup\u0119, aby uporz\u0105dkowa\u0107 zadania.",confirm_delete:'Usun\u0105\u0107 grup\u0119 "{title}"? Jej zadania trafi\u0105 do kategorii Bez grupy.',alerts:{error:"Nie uda\u0142o si\u0119 utworzy\u0107 grupy. Sprawd\u017A konsol\u0119 przegl\u0105darki i logi Home Assistant.",exists:'Grupa "{title}" ju\u017C istnieje.',rename_error:"Nie uda\u0142o si\u0119 zmieni\u0107 nazwy grupy. Szczeg\xF3\u0142y w konsoli.",delete_error:"Nie uda\u0142o si\u0119 usun\u0105\u0107 grupy. Szczeg\xF3\u0142y w konsoli."},confirm_delete_title:"Usu\u0144 grup\u0119"}},dialog:{edit_task:{title:"Edytuj zadanie",fields:{interval_value:{heading:"Interwa\u0142"},interval_type:{heading:"Typ interwa\u0142u"},last_performed:{heading:"Ostatnio wykonane",helper:"Pozostaw puste, aby u\u017Cy\u0107 dzisiejszej daty"},anchor_date:{heading:"Data odniesienia",helper:"Harmonogram powtarza si\u0119 od tej sta\u0142ej daty"},tag:{heading:"Tag"},icon:{heading:"Ikona"},label:{heading:"Etykieta(-y)"},area:{heading:"Obszar"},trigger_type:{heading:"Typ wyzwalacza"},count_entity_id:{heading:"Zliczana encja"},count_threshold:{heading:"Pr\xF3g liczby u\u017Cy\u0107"},runtime_entity_id:{heading:"Czujnik czasu pracy"},runtime_threshold:{heading:"Pr\xF3g czasu pracy"},title:{heading:"Tytu\u0142"},description:{heading:"Opis"},group_id:{heading:"Grupa",helper:"Wybierz grup\u0119 lub wpisz now\u0105 nazw\u0119"},notifications_enabled:{heading:"W\u0142\u0105cz powiadomienia"},notification_target:{heading:"Us\u0142uga powiadomie\u0144",helper:"Pozostaw puste, aby u\u017Cy\u0107 notify.notify"},notify_when:{heading:"Powiadamiaj, gdy"},notify_days_before_due:{heading:"Dni przed terminem",helper:"Opcjonalne wyprzedzenie przypomnienia o zbli\u017Caj\u0105cym si\u0119 terminie"},notification_time:{heading:"Pora dnia",helper:"Kiedy wysy\u0142ane s\u0105 automatyczne powiadomienia"},notification_url:{heading:"Adres URL do otwarcia",helper:"Opcjonalny adres URL dla akcji Otw\xF3rz w powiadomieniu"},active_months:{heading:"Aktywne miesi\u0105ce",helper:"Zadania sezonowe s\u0105 wymagane tylko w tych miesi\u0105cach (puste = ca\u0142y rok)"}},sections:{optional:"Ustawienia opcjonalne",notifications:"Powiadomienia",history:"Historia"},actions:{cancel:"Anuluj",save:"Zapisz",test_notification:"Wy\u015Blij powiadomienie testowe"},alerts:{error:"Nie uda\u0142o si\u0119 zapisa\u0107 zmian. Szczeg\xF3\u0142y w konsoli.",test_error:"Nie uda\u0142o si\u0119 wys\u0142a\u0107 powiadomienia testowego. Szczeg\xF3\u0142y w konsoli."}},move_task:{title:"Przenie\u015B zadanie",fields:{group_id:{heading:"Grupa"}},actions:{cancel:"Anuluj",move:"Przenie\u015B"}},confirm_complete:{title:"Oznacz zadanie jako wykonane",message:'Oznaczy\u0107 "{title}" jako wykonane? Data ostatniego wykonania zostanie ustawiona na dzi\u015B, a nast\u0119pny termin zostanie przeliczony na podstawie interwa\u0142u {interval}.',message_progress:'Oznaczy\u0107 "{title}" jako wykonane? Post\u0119p ({interval}) zacznie si\u0119 od nowa.',note_label:"Notatka (opcjonalnie)",actions:{confirm:"Oznacz jako wykonane"}},confirm_remove:{title:"Usu\u0144 zadanie",message:'Usun\u0105\u0107 "{title}"? Tej operacji nie mo\u017Cna cofn\u0105\u0107.',actions:{confirm:"Usu\u0144"}},templates:{title:"Szablony zada\u0144",search:"Szukaj szablon\xF3w...",import_csv:"Importuj z CSV",choose_csv:"Wybierz plik CSV",csv_hint:"Kolumny: title (wymagana), description, interval_value, interval_type, last_performed (RRRR-MM-DD), icon, group_id",csv_empty:"Nie znaleziono wierszy do zaimportowania.",no_matches:"\u017Baden szablon nie pasuje do wyszukiwania.",import_count:"{count, plural, one {Importuj 1 zadanie} few {Importuj # zadania} many {Importuj # zada\u0144} other {Importuj # zadania}}",imported:"{count, plural, one {Zaimportowano 1 zadanie.} few {Zaimportowano # zadania.} many {Zaimportowano # zada\u0144.} other {Zaimportowano # zadania.}}",import_failed:"Nie uda\u0142o si\u0119 zaimportowa\u0107: {titles}",preview:{title:"Tytu\u0142",interval:"Interwa\u0142",last_performed:"Ostatnio wykonano",group:"Grupa"}}}},Yr={categories:{hvac:"Ogrzewanie i klimatyzacja",plumbing:"Hydraulika",electrical:"Elektryka",appliances:"Sprz\u0119t AGD",interior:"Wn\u0119trze",exterior:"Na zewn\u0105trz",yard:"Ogr\xF3d",safety:"Bezpiecze\u0144stwo",vehicles:"Pojazdy"}},Qr={common:Vr,intervals:Wr,trigger_types:qr,notifications:Xr,card:Zr,panel:Jr,templates:Yr};var lt={};z(lt,{card:()=>ra,common:()=>Kr,default:()=>oa,intervals:()=>ea,notifications:()=>ia,panel:()=>aa,templates:()=>na,trigger_types:()=>ta});var Kr={loading:"Carregando...",none:"Nenhum",no_tasks:"Nenhuma tarefa encontrada.",ungrouped:"Sem grupo",cancel:"Cancelar",invalid_date:"Data inv\xE1lida."},ea={day:"Dia",days:"Dias",week:"Semana",weeks:"Semanas",month:"M\xEAs",months:"Meses",year:"Ano",years:"Anos",every_uses:"A cada {value} usos",every_runtime:"A cada {value} de tempo de uso"},ta={time:"Por tempo",date:"Data fixa",count:"Por contagem",runtime:"Por tempo de uso"},ia={when:{due:"No vencimento",overdue:"Em atraso",due_and_overdue:"No vencimento e em atraso"}},ra={add_task:{added:'"{title}" adicionada.'},todo:{due_today:"Vence hoje",days_overdue:"{count, plural, one {1 dia de atraso} other {# dias de atraso}}",days_left:"{count, plural, one {Vence em 1 dia} other {Faltam # dias}}",search:"Pesquisar tarefas...",all_groups:"Todos os grupos",overdue:"Atrasadas",due_soon:"Vence em breve",upcoming:"Pr\xF3ximas",no_tasks:"Nenhuma tarefa encontrada",done:"Conclu\xEDdas",description:"Descri\xE7\xE3o",last_performed:"\xDAltima execu\xE7\xE3o",progress:"Progresso",history:"Hist\xF3rico",open_panel:"Abrir painel completo",complete:"Concluir",edit:"Editar no painel",remove:"Remover"}},aa={cards:{new:{title:"Criar nova tarefa",fields:{title:{heading:"T\xEDtulo da tarefa"},interval_value:{heading:"Intervalo"},interval_type:{heading:"Tipo de intervalo"},last_performed:{heading:"\xDAltima execu\xE7\xE3o",helper:"Deixe em branco para usar hoje"},anchor_date:{heading:"Data de refer\xEAncia",helper:"O agendamento se repete a partir desta data fixa"},tag:{heading:"Tag"},icon:{heading:"\xCDcone"},label:{heading:"Etiqueta(s)"},area:{heading:"\xC1rea"},description:{heading:"Descri\xE7\xE3o"},trigger_type:{heading:"Tipo de gatilho"},count_entity_id:{heading:"Entidade contada"},count_threshold:{heading:"Limite de contagem"},runtime_entity_id:{heading:"Sensor de tempo de uso"},runtime_threshold:{heading:"Limite de tempo de uso"},group_id:{heading:"Grupo",helper:"Escolha um grupo ou digite um novo nome"},notifications_enabled:{heading:"Ativar notifica\xE7\xF5es"},notification_target:{heading:"Servi\xE7o de notifica\xE7\xE3o",helper:"Deixe em branco para usar notify.notify"},notify_when:{heading:"Notificar quando"},notify_days_before_due:{heading:"Dias antes do vencimento",helper:"Anteced\xEAncia opcional do lembrete de vencimento"},notification_time:{heading:"Hor\xE1rio do dia",helper:"Quando as notifica\xE7\xF5es autom\xE1ticas s\xE3o enviadas"},notification_url:{heading:"URL para abrir",helper:"URL opcional para a a\xE7\xE3o Abrir da notifica\xE7\xE3o"},active_months:{heading:"Meses ativos",helper:"Tarefas sazonais s\xF3 vencem nesses meses (vazio = o ano todo)"}},sections:{optional:"Configura\xE7\xF5es opcionais",notifications:"Notifica\xE7\xF5es"},actions:{add_task:"Adicionar tarefa"},alerts:{required:"Preencha todos os campos",error:"Erro ao adicionar a tarefa. Veja o console para detalhes."}},current:{title:"Tarefas atuais",next:"Pr\xF3ximo vencimento",actions:{edit:"Editar",move:"Mover para grupo",remove:"Remover"},alerts:{complete_success:'"{title}" marcada como conclu\xEDda. O pr\xF3ximo vencimento foi recalculado.',complete_error:"Falha ao marcar a tarefa como conclu\xEDda. Veja o console para detalhes.",remove_error:"Falha ao remover a tarefa. Veja o console para detalhes."},filter:{search:"Pesquisar tarefas...",templates:"Explorar modelos",export:"Exportar CSV",clear:"Limpar filtros"}},groups:{title:"Grupos",fields:{new_group:{heading:"Novo grupo"}},actions:{create:"Criar",rename:"Renomear",delete:"Excluir",save:"Salvar",cancel:"Cancelar"},empty:"Nenhum grupo ainda. Crie um para organizar suas tarefas.",confirm_delete:'Excluir o grupo "{title}"? Suas tarefas ir\xE3o para Sem grupo.',alerts:{error:"Falha ao criar o grupo. Verifique o console do navegador e os logs do Home Assistant.",exists:'O grupo "{title}" j\xE1 existe.',rename_error:"Falha ao renomear o grupo. Veja o console para detalhes.",delete_error:"Falha ao excluir o grupo. Veja o console para detalhes."},confirm_delete_title:"Excluir grupo"}},dialog:{edit_task:{title:"Editar tarefa",fields:{interval_value:{heading:"Intervalo"},interval_type:{heading:"Tipo de intervalo"},last_performed:{heading:"\xDAltima execu\xE7\xE3o",helper:"Deixe em branco para usar hoje"},anchor_date:{heading:"Data de refer\xEAncia",helper:"O agendamento se repete a partir desta data fixa"},tag:{heading:"Tag"},icon:{heading:"\xCDcone"},label:{heading:"Etiqueta(s)"},area:{heading:"\xC1rea"},trigger_type:{heading:"Tipo de gatilho"},count_entity_id:{heading:"Entidade contada"},count_threshold:{heading:"Limite de contagem"},runtime_entity_id:{heading:"Sensor de tempo de uso"},runtime_threshold:{heading:"Limite de tempo de uso"},title:{heading:"T\xEDtulo"},description:{heading:"Descri\xE7\xE3o"},group_id:{heading:"Grupo",helper:"Escolha um grupo ou digite um novo nome"},notifications_enabled:{heading:"Ativar notifica\xE7\xF5es"},notification_target:{heading:"Servi\xE7o de notifica\xE7\xE3o",helper:"Deixe em branco para usar notify.notify"},notify_when:{heading:"Notificar quando"},notify_days_before_due:{heading:"Dias antes do vencimento",helper:"Anteced\xEAncia opcional do lembrete de vencimento"},notification_time:{heading:"Hor\xE1rio do dia",helper:"Quando as notifica\xE7\xF5es autom\xE1ticas s\xE3o enviadas"},notification_url:{heading:"URL para abrir",helper:"URL opcional para a a\xE7\xE3o Abrir da notifica\xE7\xE3o"},active_months:{heading:"Meses ativos",helper:"Tarefas sazonais s\xF3 vencem nesses meses (vazio = o ano todo)"}},sections:{optional:"Configura\xE7\xF5es opcionais",notifications:"Notifica\xE7\xF5es",history:"Hist\xF3rico"},actions:{cancel:"Cancelar",save:"Salvar",test_notification:"Enviar notifica\xE7\xE3o de teste"},alerts:{error:"Falha ao salvar as altera\xE7\xF5es. Veja o console para detalhes.",test_error:"Falha ao enviar a notifica\xE7\xE3o de teste. Veja o console para detalhes."}},move_task:{title:"Mover tarefa",fields:{group_id:{heading:"Grupo"}},actions:{cancel:"Cancelar",move:"Mover"}},confirm_complete:{title:"Marcar tarefa como conclu\xEDda",message:'Marcar "{title}" como conclu\xEDda? A \xFAltima execu\xE7\xE3o ser\xE1 redefinida para hoje e o pr\xF3ximo vencimento ser\xE1 recalculado com base no intervalo de {interval}.',message_progress:'Marcar "{title}" como conclu\xEDda? O progresso ({interval}) recome\xE7ar\xE1 do zero.',note_label:"Nota (opcional)",actions:{confirm:"Marcar como conclu\xEDda"}},confirm_remove:{title:"Remover tarefa",message:'Remover "{title}"? Isso n\xE3o pode ser desfeito.',actions:{confirm:"Remover"}},templates:{title:"Modelos de tarefas",search:"Pesquisar modelos...",import_csv:"Importar de CSV",choose_csv:"Escolher arquivo CSV",csv_hint:"Colunas: title (obrigat\xF3ria), description, interval_value, interval_type, last_performed (AAAA-MM-DD), icon, group_id",csv_empty:"Nenhuma linha import\xE1vel encontrada no arquivo.",no_matches:"Nenhum modelo corresponde \xE0 sua pesquisa.",import_count:"{count, plural, one {Importar 1 tarefa} other {Importar # tarefas}}",imported:"{count, plural, one {1 tarefa importada.} other {# tarefas importadas.}}",import_failed:"Falha ao importar: {titles}",preview:{title:"T\xEDtulo",interval:"Intervalo",last_performed:"\xDAltima execu\xE7\xE3o",group:"Grupo"}}}},na={categories:{hvac:"Climatiza\xE7\xE3o",plumbing:"Hidr\xE1ulica",electrical:"El\xE9trica",appliances:"Eletrodom\xE9sticos",interior:"Interior",exterior:"Exterior",yard:"Jardim",safety:"Seguran\xE7a",vehicles:"Ve\xEDculos"}},oa={common:Kr,intervals:ea,trigger_types:ta,notifications:ia,card:ra,panel:aa,templates:na};var ct=function(e,t){return ct=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(i,r){i.__proto__=r}||function(i,r){for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(i[a]=r[a])},ct(e,t)};function be(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");ct(e,t);function i(){this.constructor=e}e.prototype=t===null?Object.create(t):(i.prototype=t.prototype,new i)}var f=function(){return f=Object.assign||function(t){for(var i,r=1,a=arguments.length;r<a;r++){i=arguments[r];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},f.apply(this,arguments)};function Pe(e,t,i){if(i||arguments.length===2)for(var r=0,a=t.length,n;r<a;r++)(n||!(r in t))&&(n||(n=Array.prototype.slice.call(t,0,r)),n[r]=t[r]);return e.concat(n||Array.prototype.slice.call(t))}var m;(function(e){e[e.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",e[e.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",e[e.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",e[e.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",e[e.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",e[e.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",e[e.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",e[e.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",e[e.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",e[e.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",e[e.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",e[e.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",e[e.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",e[e.INVALID_TAG=23]="INVALID_TAG",e[e.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",e[e.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",e[e.UNCLOSED_TAG=27]="UNCLOSED_TAG"})(m||(m={}));var b;(function(e){e[e.literal=0]="literal",e[e.argument=1]="argument",e[e.number=2]="number",e[e.date=3]="date",e[e.time=4]="time",e[e.select=5]="select",e[e.plural=6]="plural",e[e.pound=7]="pound",e[e.tag=8]="tag"})(b||(b={}));var Y;(function(e){e[e.number=0]="number",e[e.dateTime=1]="dateTime"})(Y||(Y={}));function ut(e){return e.type===b.literal}function Wt(e){return e.type===b.argument}function Ie(e){return e.type===b.number}function Le(e){return e.type===b.date}function Oe(e){return e.type===b.time}function Re(e){return e.type===b.select}function Be(e){return e.type===b.plural}function qt(e){return e.type===b.pound}function $e(e){return e.type===b.tag}function Me(e){return!!(e&&typeof e=="object"&&e.type===Y.number)}function xe(e){return!!(e&&typeof e=="object"&&e.type===Y.dateTime)}var dt=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;var sa=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function Xt(e){var t={};return e.replace(sa,function(i){var r=i.length;switch(i[0]){case"G":t.era=r===4?"long":r===5?"narrow":"short";break;case"y":t.year=r===2?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":t.month=["numeric","2-digit","short","long","narrow"][r-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":t.day=["numeric","2-digit"][r-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":t.weekday=r===4?"short":r===5?"narrow":"short";break;case"e":if(r<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][r-4];break;case"c":if(r<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][r-4];break;case"a":t.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":t.hourCycle="h12",t.hour=["numeric","2-digit"][r-1];break;case"H":t.hourCycle="h23",t.hour=["numeric","2-digit"][r-1];break;case"K":t.hourCycle="h11",t.hour=["numeric","2-digit"][r-1];break;case"k":t.hourCycle="h24",t.hour=["numeric","2-digit"][r-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":t.minute=["numeric","2-digit"][r-1];break;case"s":t.second=["numeric","2-digit"][r-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":t.timeZoneName=r<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""}),t}var Zt=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;function Kt(e){if(e.length===0)throw new Error("Number skeleton cannot be empty");for(var t=e.split(Zt).filter(function(h){return h.length>0}),i=[],r=0,a=t;r<a.length;r++){var n=a[r],o=n.split("/");if(o.length===0)throw new Error("Invalid number skeleton");for(var s=o[0],l=o.slice(1),u=0,d=l;u<d.length;u++){var c=d[u];if(c.length===0)throw new Error("Invalid number skeleton")}i.push({stem:s,options:l})}return i}function la(e){return e.replace(/^(.*?)-/,"")}var Jt=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,ei=/^(@+)?(\+|#+)?[rs]?$/g,ca=/(\*)(0+)|(#+)(0+)|(0+)/g,ti=/^(0+)$/;function Yt(e){var t={};return e[e.length-1]==="r"?t.roundingPriority="morePrecision":e[e.length-1]==="s"&&(t.roundingPriority="lessPrecision"),e.replace(ei,function(i,r,a){return typeof a!="string"?(t.minimumSignificantDigits=r.length,t.maximumSignificantDigits=r.length):a==="+"?t.minimumSignificantDigits=r.length:r[0]==="#"?t.maximumSignificantDigits=r.length:(t.minimumSignificantDigits=r.length,t.maximumSignificantDigits=r.length+(typeof a=="string"?a.length:0)),""}),t}function ii(e){switch(e){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function ua(e){var t;if(e[0]==="E"&&e[1]==="E"?(t={notation:"engineering"},e=e.slice(2)):e[0]==="E"&&(t={notation:"scientific"},e=e.slice(1)),t){var i=e.slice(0,2);if(i==="+!"?(t.signDisplay="always",e=e.slice(2)):i==="+?"&&(t.signDisplay="exceptZero",e=e.slice(2)),!ti.test(e))throw new Error("Malformed concise eng/scientific notation");t.minimumIntegerDigits=e.length}return t}function Qt(e){var t={},i=ii(e);return i||t}function ri(e){for(var t={},i=0,r=e;i<r.length;i++){var a=r[i];switch(a.stem){case"percent":case"%":t.style="percent";continue;case"%x100":t.style="percent",t.scale=100;continue;case"currency":t.style="currency",t.currency=a.options[0];continue;case"group-off":case",_":t.useGrouping=!1;continue;case"precision-integer":case".":t.maximumFractionDigits=0;continue;case"measure-unit":case"unit":t.style="unit",t.unit=la(a.options[0]);continue;case"compact-short":case"K":t.notation="compact",t.compactDisplay="short";continue;case"compact-long":case"KK":t.notation="compact",t.compactDisplay="long";continue;case"scientific":t=f(f(f({},t),{notation:"scientific"}),a.options.reduce(function(l,u){return f(f({},l),Qt(u))},{}));continue;case"engineering":t=f(f(f({},t),{notation:"engineering"}),a.options.reduce(function(l,u){return f(f({},l),Qt(u))},{}));continue;case"notation-simple":t.notation="standard";continue;case"unit-width-narrow":t.currencyDisplay="narrowSymbol",t.unitDisplay="narrow";continue;case"unit-width-short":t.currencyDisplay="code",t.unitDisplay="short";continue;case"unit-width-full-name":t.currencyDisplay="name",t.unitDisplay="long";continue;case"unit-width-iso-code":t.currencyDisplay="symbol";continue;case"scale":t.scale=parseFloat(a.options[0]);continue;case"integer-width":if(a.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");a.options[0].replace(ca,function(l,u,d,c,h,y){if(u)t.minimumIntegerDigits=d.length;else{if(c&&h)throw new Error("We currently do not support maximum integer digits");if(y)throw new Error("We currently do not support exact integer digits")}return""});continue}if(ti.test(a.stem)){t.minimumIntegerDigits=a.stem.length;continue}if(Jt.test(a.stem)){if(a.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");a.stem.replace(Jt,function(l,u,d,c,h,y){return d==="*"?t.minimumFractionDigits=u.length:c&&c[0]==="#"?t.maximumFractionDigits=c.length:h&&y?(t.minimumFractionDigits=h.length,t.maximumFractionDigits=h.length+y.length):(t.minimumFractionDigits=u.length,t.maximumFractionDigits=u.length),""});var n=a.options[0];n==="w"?t=f(f({},t),{trailingZeroDisplay:"stripIfInteger"}):n&&(t=f(f({},t),Yt(n)));continue}if(ei.test(a.stem)){t=f(f({},t),Yt(a.stem));continue}var o=ii(a.stem);o&&(t=f(f({},t),o));var s=ua(a.stem);s&&(t=f(f({},t),s))}return t}var we={AX:["H"],BQ:["H"],CP:["H"],CZ:["H"],DK:["H"],FI:["H"],ID:["H"],IS:["H"],ML:["H"],NE:["H"],RU:["H"],SE:["H"],SJ:["H"],SK:["H"],AS:["h","H"],BT:["h","H"],DJ:["h","H"],ER:["h","H"],GH:["h","H"],IN:["h","H"],LS:["h","H"],PG:["h","H"],PW:["h","H"],SO:["h","H"],TO:["h","H"],VU:["h","H"],WS:["h","H"],"001":["H","h"],AL:["h","H","hB"],TD:["h","H","hB"],"ca-ES":["H","h","hB"],CF:["H","h","hB"],CM:["H","h","hB"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],LU:["H","h","hB"],NP:["H","h","hB"],PF:["H","h","hB"],SC:["H","h","hB"],SM:["H","h","hB"],SN:["H","h","hB"],TF:["H","h","hB"],VA:["H","h","hB"],CY:["h","H","hb","hB"],GR:["h","H","hb","hB"],CO:["h","H","hB","hb"],DO:["h","H","hB","hb"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],NA:["h","H","hB","hb"],PA:["h","H","hB","hb"],PR:["h","H","hB","hb"],VE:["h","H","hB","hb"],AC:["H","h","hb","hB"],AI:["H","h","hb","hB"],BW:["H","h","hb","hB"],BZ:["H","h","hb","hB"],CC:["H","h","hb","hB"],CK:["H","h","hb","hB"],CX:["H","h","hb","hB"],DG:["H","h","hb","hB"],FK:["H","h","hb","hB"],GB:["H","h","hb","hB"],GG:["H","h","hb","hB"],GI:["H","h","hb","hB"],IE:["H","h","hb","hB"],IM:["H","h","hb","hB"],IO:["H","h","hb","hB"],JE:["H","h","hb","hB"],LT:["H","h","hb","hB"],MK:["H","h","hb","hB"],MN:["H","h","hb","hB"],MS:["H","h","hb","hB"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],PN:["H","h","hb","hB"],SH:["H","h","hb","hB"],SX:["H","h","hb","hB"],TA:["H","h","hb","hB"],ZA:["H","h","hb","hB"],"af-ZA":["H","h","hB","hb"],AR:["H","h","hB","hb"],CL:["H","h","hB","hb"],CR:["H","h","hB","hb"],CU:["H","h","hB","hb"],EA:["H","h","hB","hb"],"es-BO":["H","h","hB","hb"],"es-BR":["H","h","hB","hb"],"es-EC":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"es-PE":["H","h","hB","hb"],GT:["H","h","hB","hb"],HN:["H","h","hB","hb"],IC:["H","h","hB","hb"],KG:["H","h","hB","hb"],KM:["H","h","hB","hb"],LK:["H","h","hB","hb"],MA:["H","h","hB","hb"],MX:["H","h","hB","hb"],NI:["H","h","hB","hb"],PY:["H","h","hB","hb"],SV:["H","h","hB","hb"],UY:["H","h","hB","hb"],JP:["H","h","K"],AD:["H","hB"],AM:["H","hB"],AO:["H","hB"],AT:["H","hB"],AW:["H","hB"],BE:["H","hB"],BF:["H","hB"],BJ:["H","hB"],BL:["H","hB"],BR:["H","hB"],CG:["H","hB"],CI:["H","hB"],CV:["H","hB"],DE:["H","hB"],EE:["H","hB"],FR:["H","hB"],GA:["H","hB"],GF:["H","hB"],GN:["H","hB"],GP:["H","hB"],GW:["H","hB"],HR:["H","hB"],IL:["H","hB"],IT:["H","hB"],KZ:["H","hB"],MC:["H","hB"],MD:["H","hB"],MF:["H","hB"],MQ:["H","hB"],MZ:["H","hB"],NC:["H","hB"],NL:["H","hB"],PM:["H","hB"],PT:["H","hB"],RE:["H","hB"],RO:["H","hB"],SI:["H","hB"],SR:["H","hB"],ST:["H","hB"],TG:["H","hB"],TR:["H","hB"],WF:["H","hB"],YT:["H","hB"],BD:["h","hB","H"],PK:["h","hB","H"],AZ:["H","hB","h"],BA:["H","hB","h"],BG:["H","hB","h"],CH:["H","hB","h"],GE:["H","hB","h"],LI:["H","hB","h"],ME:["H","hB","h"],RS:["H","hB","h"],UA:["H","hB","h"],UZ:["H","hB","h"],XK:["H","hB","h"],AG:["h","hb","H","hB"],AU:["h","hb","H","hB"],BB:["h","hb","H","hB"],BM:["h","hb","H","hB"],BS:["h","hb","H","hB"],CA:["h","hb","H","hB"],DM:["h","hb","H","hB"],"en-001":["h","hb","H","hB"],FJ:["h","hb","H","hB"],FM:["h","hb","H","hB"],GD:["h","hb","H","hB"],GM:["h","hb","H","hB"],GU:["h","hb","H","hB"],GY:["h","hb","H","hB"],JM:["h","hb","H","hB"],KI:["h","hb","H","hB"],KN:["h","hb","H","hB"],KY:["h","hb","H","hB"],LC:["h","hb","H","hB"],LR:["h","hb","H","hB"],MH:["h","hb","H","hB"],MP:["h","hb","H","hB"],MW:["h","hb","H","hB"],NZ:["h","hb","H","hB"],SB:["h","hb","H","hB"],SG:["h","hb","H","hB"],SL:["h","hb","H","hB"],SS:["h","hb","H","hB"],SZ:["h","hb","H","hB"],TC:["h","hb","H","hB"],TT:["h","hb","H","hB"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],VC:["h","hb","H","hB"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],ZM:["h","hb","H","hB"],BO:["H","hB","h","hb"],EC:["H","hB","h","hb"],ES:["H","hB","h","hb"],GQ:["H","hB","h","hb"],PE:["H","hB","h","hb"],AE:["h","hB","hb","H"],"ar-001":["h","hB","hb","H"],BH:["h","hB","hb","H"],DZ:["h","hB","hb","H"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],HK:["h","hB","hb","H"],IQ:["h","hB","hb","H"],JO:["h","hB","hb","H"],KW:["h","hB","hb","H"],LB:["h","hB","hb","H"],LY:["h","hB","hb","H"],MO:["h","hB","hb","H"],MR:["h","hB","hb","H"],OM:["h","hB","hb","H"],PH:["h","hB","hb","H"],PS:["h","hB","hb","H"],QA:["h","hB","hb","H"],SA:["h","hB","hb","H"],SD:["h","hB","hb","H"],SY:["h","hB","hb","H"],TN:["h","hB","hb","H"],YE:["h","hB","hb","H"],AF:["H","hb","hB","h"],LA:["H","hb","hB","h"],CN:["H","hB","hb","h"],LV:["H","hB","hb","h"],TL:["H","hB","hb","h"],"zu-ZA":["H","hB","hb","h"],CD:["hB","H"],IR:["hB","H"],"hi-IN":["hB","h","H"],"kn-IN":["hB","h","H"],"ml-IN":["hB","h","H"],"te-IN":["hB","h","H"],KH:["hB","h","H","hb"],"ta-IN":["hB","h","hb","H"],BN:["hb","hB","h","H"],MY:["hb","hB","h","H"],ET:["hB","hb","h","H"],"gu-IN":["hB","hb","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],TW:["hB","hb","h","H"],KE:["hB","hb","H","h"],MM:["hB","hb","H","h"],TZ:["hB","hb","H","h"],UG:["hB","hb","H","h"]};function ai(e,t){for(var i="",r=0;r<e.length;r++){var a=e.charAt(r);if(a==="j"){for(var n=0;r+1<e.length&&e.charAt(r+1)===a;)n++,r++;var o=1+(n&1),s=n<2?1:3+(n>>1),l="a",u=da(t);for((u=="H"||u=="k")&&(s=0);s-- >0;)i+=l;for(;o-- >0;)i=u+i}else a==="J"?i+="H":i+=a}return i}function da(e){var t=e.hourCycle;if(t===void 0&&e.hourCycles&&e.hourCycles.length&&(t=e.hourCycles[0]),t)switch(t){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}var i=e.language,r;i!=="root"&&(r=e.maximize().region);var a=we[r||""]||we[i||""]||we["".concat(i,"-001")]||we["001"];return a[0]}var ht,ha=new RegExp("^".concat(dt.source,"*")),pa=new RegExp("".concat(dt.source,"*$"));function _(e,t){return{start:e,end:t}}var ma=!!String.prototype.startsWith,ga=!!String.fromCodePoint,fa=!!Object.fromEntries,_a=!!String.prototype.codePointAt,va=!!String.prototype.trimStart,ya=!!String.prototype.trimEnd,ba=!!Number.isSafeInteger,xa=ba?Number.isSafeInteger:function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e&&Math.abs(e)<=9007199254740991},mt=!0;try{ni=ci("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu"),mt=((ht=ni.exec("a"))===null||ht===void 0?void 0:ht[0])==="a"}catch{mt=!1}var ni,oi=ma?function(t,i,r){return t.startsWith(i,r)}:function(t,i,r){return t.slice(r,r+i.length)===i},gt=ga?String.fromCodePoint:function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];for(var r="",a=t.length,n=0,o;a>n;){if(o=t[n++],o>1114111)throw RangeError(o+" is not a valid code point");r+=o<65536?String.fromCharCode(o):String.fromCharCode(((o-=65536)>>10)+55296,o%1024+56320)}return r},si=fa?Object.fromEntries:function(t){for(var i={},r=0,a=t;r<a.length;r++){var n=a[r],o=n[0],s=n[1];i[o]=s}return i},li=_a?function(t,i){return t.codePointAt(i)}:function(t,i){var r=t.length;if(!(i<0||i>=r)){var a=t.charCodeAt(i),n;return a<55296||a>56319||i+1===r||(n=t.charCodeAt(i+1))<56320||n>57343?a:(a-55296<<10)+(n-56320)+65536}},wa=va?function(t){return t.trimStart()}:function(t){return t.replace(ha,"")},Ea=ya?function(t){return t.trimEnd()}:function(t){return t.replace(pa,"")};function ci(e,t){return new RegExp(e,t)}var ft;mt?(pt=ci("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu"),ft=function(t,i){var r;pt.lastIndex=i;var a=pt.exec(t);return(r=a[1])!==null&&r!==void 0?r:""}):ft=function(t,i){for(var r=[];;){var a=li(t,i);if(a===void 0||di(a)||Aa(a))break;r.push(a),i+=a>=65536?2:1}return gt.apply(void 0,r)};var pt,ui=(function(){function e(t,i){i===void 0&&(i={}),this.message=t,this.position={offset:0,line:1,column:1},this.ignoreTag=!!i.ignoreTag,this.locale=i.locale,this.requiresOtherClause=!!i.requiresOtherClause,this.shouldParseSkeletons=!!i.shouldParseSkeletons}return e.prototype.parse=function(){if(this.offset()!==0)throw Error("parser can only be used once");return this.parseMessage(0,"",!1)},e.prototype.parseMessage=function(t,i,r){for(var a=[];!this.isEOF();){var n=this.char();if(n===123){var o=this.parseArgument(t,r);if(o.err)return o;a.push(o.val)}else{if(n===125&&t>0)break;if(n===35&&(i==="plural"||i==="selectordinal")){var s=this.clonePosition();this.bump(),a.push({type:b.pound,location:_(s,this.clonePosition())})}else if(n===60&&!this.ignoreTag&&this.peek()===47){if(r)break;return this.error(m.UNMATCHED_CLOSING_TAG,_(this.clonePosition(),this.clonePosition()))}else if(n===60&&!this.ignoreTag&&_t(this.peek()||0)){var o=this.parseTag(t,i);if(o.err)return o;a.push(o.val)}else{var o=this.parseLiteral(t,i);if(o.err)return o;a.push(o.val)}}}return{val:a,err:null}},e.prototype.parseTag=function(t,i){var r=this.clonePosition();this.bump();var a=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:b.literal,value:"<".concat(a,"/>"),location:_(r,this.clonePosition())},err:null};if(this.bumpIf(">")){var n=this.parseMessage(t+1,i,!0);if(n.err)return n;var o=n.val,s=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!_t(this.char()))return this.error(m.INVALID_TAG,_(s,this.clonePosition()));var l=this.clonePosition(),u=this.parseTagName();return a!==u?this.error(m.UNMATCHED_CLOSING_TAG,_(l,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:b.tag,value:a,children:o,location:_(r,this.clonePosition())},err:null}:this.error(m.INVALID_TAG,_(s,this.clonePosition())))}else return this.error(m.UNCLOSED_TAG,_(r,this.clonePosition()))}else return this.error(m.INVALID_TAG,_(r,this.clonePosition()))},e.prototype.parseTagName=function(){var t=this.offset();for(this.bump();!this.isEOF()&&Sa(this.char());)this.bump();return this.message.slice(t,this.offset())},e.prototype.parseLiteral=function(t,i){for(var r=this.clonePosition(),a="";;){var n=this.tryParseQuote(i);if(n){a+=n;continue}var o=this.tryParseUnquoted(t,i);if(o){a+=o;continue}var s=this.tryParseLeftAngleBracket();if(s){a+=s;continue}break}var l=_(r,this.clonePosition());return{val:{type:b.literal,value:a,location:l},err:null}},e.prototype.tryParseLeftAngleBracket=function(){return!this.isEOF()&&this.char()===60&&(this.ignoreTag||!Ta(this.peek()||0))?(this.bump(),"<"):null},e.prototype.tryParseQuote=function(t){if(this.isEOF()||this.char()!==39)return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if(t==="plural"||t==="selectordinal")break;return null;default:return null}this.bump();var i=[this.char()];for(this.bump();!this.isEOF();){var r=this.char();if(r===39)if(this.peek()===39)i.push(39),this.bump();else{this.bump();break}else i.push(r);this.bump()}return gt.apply(void 0,i)},e.prototype.tryParseUnquoted=function(t,i){if(this.isEOF())return null;var r=this.char();return r===60||r===123||r===35&&(i==="plural"||i==="selectordinal")||r===125&&t>0?null:(this.bump(),gt(r))},e.prototype.parseArgument=function(t,i){var r=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(m.EXPECT_ARGUMENT_CLOSING_BRACE,_(r,this.clonePosition()));if(this.char()===125)return this.bump(),this.error(m.EMPTY_ARGUMENT,_(r,this.clonePosition()));var a=this.parseIdentifierIfPossible().value;if(!a)return this.error(m.MALFORMED_ARGUMENT,_(r,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(m.EXPECT_ARGUMENT_CLOSING_BRACE,_(r,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:b.argument,value:a,location:_(r,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(m.EXPECT_ARGUMENT_CLOSING_BRACE,_(r,this.clonePosition())):this.parseArgumentOptions(t,i,a,r);default:return this.error(m.MALFORMED_ARGUMENT,_(r,this.clonePosition()))}},e.prototype.parseIdentifierIfPossible=function(){var t=this.clonePosition(),i=this.offset(),r=ft(this.message,i),a=i+r.length;this.bumpTo(a);var n=this.clonePosition(),o=_(t,n);return{value:r,location:o}},e.prototype.parseArgumentOptions=function(t,i,r,a){var n,o=this.clonePosition(),s=this.parseIdentifierIfPossible().value,l=this.clonePosition();switch(s){case"":return this.error(m.EXPECT_ARGUMENT_TYPE,_(o,l));case"number":case"date":case"time":{this.bumpSpace();var u=null;if(this.bumpIf(",")){this.bumpSpace();var d=this.clonePosition(),c=this.parseSimpleArgStyleIfPossible();if(c.err)return c;var h=Ea(c.val);if(h.length===0)return this.error(m.EXPECT_ARGUMENT_STYLE,_(this.clonePosition(),this.clonePosition()));var y=_(d,this.clonePosition());u={style:h,styleLocation:y}}var x=this.tryParseArgumentClose(a);if(x.err)return x;var k=_(a,this.clonePosition());if(u&&oi(u?.style,"::",0)){var F=wa(u.style.slice(2));if(s==="number"){var c=this.parseNumberSkeletonFromString(F,u.styleLocation);return c.err?c:{val:{type:b.number,value:r,location:k,style:c.val},err:null}}else{if(F.length===0)return this.error(m.EXPECT_DATE_TIME_SKELETON,k);var oe=F;this.locale&&(oe=ai(F,this.locale));var h={type:Y.dateTime,pattern:oe,location:u.styleLocation,parsedOptions:this.shouldParseSkeletons?Xt(oe):{}},ee=s==="date"?b.date:b.time;return{val:{type:ee,value:r,location:k,style:h},err:null}}}return{val:{type:s==="number"?b.number:s==="date"?b.date:b.time,value:r,location:k,style:(n=u?.style)!==null&&n!==void 0?n:null},err:null}}case"plural":case"selectordinal":case"select":{var C=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(m.EXPECT_SELECT_ARGUMENT_OPTIONS,_(C,f({},C)));this.bumpSpace();var se=this.parseIdentifierIfPossible(),V=0;if(s!=="select"&&se.value==="offset"){if(!this.bumpIf(":"))return this.error(m.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,_(this.clonePosition(),this.clonePosition()));this.bumpSpace();var c=this.tryParseDecimalInteger(m.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,m.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);if(c.err)return c;this.bumpSpace(),se=this.parseIdentifierIfPossible(),V=c.val}var ke=this.tryParsePluralOrSelectOptions(t,s,i,se);if(ke.err)return ke;var x=this.tryParseArgumentClose(a);if(x.err)return x;var Tt=_(a,this.clonePosition());return s==="select"?{val:{type:b.select,value:r,options:si(ke.val),location:Tt},err:null}:{val:{type:b.plural,value:r,options:si(ke.val),offset:V,pluralType:s==="plural"?"cardinal":"ordinal",location:Tt},err:null}}default:return this.error(m.INVALID_ARGUMENT_TYPE,_(o,l))}},e.prototype.tryParseArgumentClose=function(t){return this.isEOF()||this.char()!==125?this.error(m.EXPECT_ARGUMENT_CLOSING_BRACE,_(t,this.clonePosition())):(this.bump(),{val:!0,err:null})},e.prototype.parseSimpleArgStyleIfPossible=function(){for(var t=0,i=this.clonePosition();!this.isEOF();){var r=this.char();switch(r){case 39:{this.bump();var a=this.clonePosition();if(!this.bumpUntil("'"))return this.error(m.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,_(a,this.clonePosition()));this.bump();break}case 123:{t+=1,this.bump();break}case 125:{if(t>0)t-=1;else return{val:this.message.slice(i.offset,this.offset()),err:null};break}default:this.bump();break}}return{val:this.message.slice(i.offset,this.offset()),err:null}},e.prototype.parseNumberSkeletonFromString=function(t,i){var r=[];try{r=Kt(t)}catch{return this.error(m.INVALID_NUMBER_SKELETON,i)}return{val:{type:Y.number,tokens:r,location:i,parsedOptions:this.shouldParseSkeletons?ri(r):{}},err:null}},e.prototype.tryParsePluralOrSelectOptions=function(t,i,r,a){for(var n,o=!1,s=[],l=new Set,u=a.value,d=a.location;;){if(u.length===0){var c=this.clonePosition();if(i!=="select"&&this.bumpIf("=")){var h=this.tryParseDecimalInteger(m.EXPECT_PLURAL_ARGUMENT_SELECTOR,m.INVALID_PLURAL_ARGUMENT_SELECTOR);if(h.err)return h;d=_(c,this.clonePosition()),u=this.message.slice(c.offset,this.offset())}else break}if(l.has(u))return this.error(i==="select"?m.DUPLICATE_SELECT_ARGUMENT_SELECTOR:m.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,d);u==="other"&&(o=!0),this.bumpSpace();var y=this.clonePosition();if(!this.bumpIf("{"))return this.error(i==="select"?m.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:m.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,_(this.clonePosition(),this.clonePosition()));var x=this.parseMessage(t+1,i,r);if(x.err)return x;var k=this.tryParseArgumentClose(y);if(k.err)return k;s.push([u,{value:x.val,location:_(y,this.clonePosition())}]),l.add(u),this.bumpSpace(),n=this.parseIdentifierIfPossible(),u=n.value,d=n.location}return s.length===0?this.error(i==="select"?m.EXPECT_SELECT_ARGUMENT_SELECTOR:m.EXPECT_PLURAL_ARGUMENT_SELECTOR,_(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!o?this.error(m.MISSING_OTHER_CLAUSE,_(this.clonePosition(),this.clonePosition())):{val:s,err:null}},e.prototype.tryParseDecimalInteger=function(t,i){var r=1,a=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(r=-1);for(var n=!1,o=0;!this.isEOF();){var s=this.char();if(s>=48&&s<=57)n=!0,o=o*10+(s-48),this.bump();else break}var l=_(a,this.clonePosition());return n?(o*=r,xa(o)?{val:o,err:null}:this.error(i,l)):this.error(t,l)},e.prototype.offset=function(){return this.position.offset},e.prototype.isEOF=function(){return this.offset()===this.message.length},e.prototype.clonePosition=function(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}},e.prototype.char=function(){var t=this.position.offset;if(t>=this.message.length)throw Error("out of bound");var i=li(this.message,t);if(i===void 0)throw Error("Offset ".concat(t," is at invalid UTF-16 code unit boundary"));return i},e.prototype.error=function(t,i){return{val:null,err:{kind:t,message:this.message,location:i}}},e.prototype.bump=function(){if(!this.isEOF()){var t=this.char();t===10?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=t<65536?1:2)}},e.prototype.bumpIf=function(t){if(oi(this.message,t,this.offset())){for(var i=0;i<t.length;i++)this.bump();return!0}return!1},e.prototype.bumpUntil=function(t){var i=this.offset(),r=this.message.indexOf(t,i);return r>=0?(this.bumpTo(r),!0):(this.bumpTo(this.message.length),!1)},e.prototype.bumpTo=function(t){if(this.offset()>t)throw Error("targetOffset ".concat(t," must be greater than or equal to the current offset ").concat(this.offset()));for(t=Math.min(t,this.message.length);;){var i=this.offset();if(i===t)break;if(i>t)throw Error("targetOffset ".concat(t," is at invalid UTF-16 code unit boundary"));if(this.bump(),this.isEOF())break}},e.prototype.bumpSpace=function(){for(;!this.isEOF()&&di(this.char());)this.bump()},e.prototype.peek=function(){if(this.isEOF())return null;var t=this.char(),i=this.offset(),r=this.message.charCodeAt(i+(t>=65536?2:1));return r??null},e})();function _t(e){return e>=97&&e<=122||e>=65&&e<=90}function Ta(e){return _t(e)||e===47}function Sa(e){return e===45||e===46||e>=48&&e<=57||e===95||e>=97&&e<=122||e>=65&&e<=90||e==183||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=893||e>=895&&e<=8191||e>=8204&&e<=8205||e>=8255&&e<=8256||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}function di(e){return e>=9&&e<=13||e===32||e===133||e>=8206&&e<=8207||e===8232||e===8233}function Aa(e){return e>=33&&e<=35||e===36||e>=37&&e<=39||e===40||e===41||e===42||e===43||e===44||e===45||e>=46&&e<=47||e>=58&&e<=59||e>=60&&e<=62||e>=63&&e<=64||e===91||e===92||e===93||e===94||e===96||e===123||e===124||e===125||e===126||e===161||e>=162&&e<=165||e===166||e===167||e===169||e===171||e===172||e===174||e===176||e===177||e===182||e===187||e===191||e===215||e===247||e>=8208&&e<=8213||e>=8214&&e<=8215||e===8216||e===8217||e===8218||e>=8219&&e<=8220||e===8221||e===8222||e===8223||e>=8224&&e<=8231||e>=8240&&e<=8248||e===8249||e===8250||e>=8251&&e<=8254||e>=8257&&e<=8259||e===8260||e===8261||e===8262||e>=8263&&e<=8273||e===8274||e===8275||e>=8277&&e<=8286||e>=8592&&e<=8596||e>=8597&&e<=8601||e>=8602&&e<=8603||e>=8604&&e<=8607||e===8608||e>=8609&&e<=8610||e===8611||e>=8612&&e<=8613||e===8614||e>=8615&&e<=8621||e===8622||e>=8623&&e<=8653||e>=8654&&e<=8655||e>=8656&&e<=8657||e===8658||e===8659||e===8660||e>=8661&&e<=8691||e>=8692&&e<=8959||e>=8960&&e<=8967||e===8968||e===8969||e===8970||e===8971||e>=8972&&e<=8991||e>=8992&&e<=8993||e>=8994&&e<=9e3||e===9001||e===9002||e>=9003&&e<=9083||e===9084||e>=9085&&e<=9114||e>=9115&&e<=9139||e>=9140&&e<=9179||e>=9180&&e<=9185||e>=9186&&e<=9254||e>=9255&&e<=9279||e>=9280&&e<=9290||e>=9291&&e<=9311||e>=9472&&e<=9654||e===9655||e>=9656&&e<=9664||e===9665||e>=9666&&e<=9719||e>=9720&&e<=9727||e>=9728&&e<=9838||e===9839||e>=9840&&e<=10087||e===10088||e===10089||e===10090||e===10091||e===10092||e===10093||e===10094||e===10095||e===10096||e===10097||e===10098||e===10099||e===10100||e===10101||e>=10132&&e<=10175||e>=10176&&e<=10180||e===10181||e===10182||e>=10183&&e<=10213||e===10214||e===10215||e===10216||e===10217||e===10218||e===10219||e===10220||e===10221||e===10222||e===10223||e>=10224&&e<=10239||e>=10240&&e<=10495||e>=10496&&e<=10626||e===10627||e===10628||e===10629||e===10630||e===10631||e===10632||e===10633||e===10634||e===10635||e===10636||e===10637||e===10638||e===10639||e===10640||e===10641||e===10642||e===10643||e===10644||e===10645||e===10646||e===10647||e===10648||e>=10649&&e<=10711||e===10712||e===10713||e===10714||e===10715||e>=10716&&e<=10747||e===10748||e===10749||e>=10750&&e<=11007||e>=11008&&e<=11055||e>=11056&&e<=11076||e>=11077&&e<=11078||e>=11079&&e<=11084||e>=11085&&e<=11123||e>=11124&&e<=11125||e>=11126&&e<=11157||e===11158||e>=11159&&e<=11263||e>=11776&&e<=11777||e===11778||e===11779||e===11780||e===11781||e>=11782&&e<=11784||e===11785||e===11786||e===11787||e===11788||e===11789||e>=11790&&e<=11798||e===11799||e>=11800&&e<=11801||e===11802||e===11803||e===11804||e===11805||e>=11806&&e<=11807||e===11808||e===11809||e===11810||e===11811||e===11812||e===11813||e===11814||e===11815||e===11816||e===11817||e>=11818&&e<=11822||e===11823||e>=11824&&e<=11833||e>=11834&&e<=11835||e>=11836&&e<=11839||e===11840||e===11841||e===11842||e>=11843&&e<=11855||e>=11856&&e<=11857||e===11858||e>=11859&&e<=11903||e>=12289&&e<=12291||e===12296||e===12297||e===12298||e===12299||e===12300||e===12301||e===12302||e===12303||e===12304||e===12305||e>=12306&&e<=12307||e===12308||e===12309||e===12310||e===12311||e===12312||e===12313||e===12314||e===12315||e===12316||e===12317||e>=12318&&e<=12319||e===12320||e===12336||e===64830||e===64831||e>=65093&&e<=65094}function vt(e){e.forEach(function(t){if(delete t.location,Re(t)||Be(t))for(var i in t.options)delete t.options[i].location,vt(t.options[i].value);else Ie(t)&&Me(t.style)||(Le(t)||Oe(t))&&xe(t.style)?delete t.style.location:$e(t)&&vt(t.children)})}function hi(e,t){t===void 0&&(t={}),t=f({shouldParseSkeletons:!0,requiresOtherClause:!0},t);var i=new ui(e,t).parse();if(i.err){var r=SyntaxError(m[i.err.kind]);throw r.location=i.err.location,r.originalMessage=i.err.message,r}return t?.captureLocation||vt(i.val),i.val}function Ee(e,t){var i=t&&t.cache?t.cache:za,r=t&&t.serializer?t.serializer:Da,a=t&&t.strategy?t.strategy:Ca;return a(e,{cache:i,serializer:r})}function ka(e){return e==null||typeof e=="number"||typeof e=="boolean"}function pi(e,t,i,r){var a=ka(r)?r:i(r),n=t.get(a);return typeof n>"u"&&(n=e.call(this,r),t.set(a,n)),n}function mi(e,t,i){var r=Array.prototype.slice.call(arguments,3),a=i(r),n=t.get(a);return typeof n>"u"&&(n=e.apply(this,r),t.set(a,n)),n}function yt(e,t,i,r,a){return i.bind(t,e,r,a)}function Ca(e,t){var i=e.length===1?pi:mi;return yt(e,this,i,t.cache.create(),t.serializer)}function Na(e,t){return yt(e,this,mi,t.cache.create(),t.serializer)}function Ha(e,t){return yt(e,this,pi,t.cache.create(),t.serializer)}var Da=function(){return JSON.stringify(arguments)};function bt(){this.cache=Object.create(null)}bt.prototype.get=function(e){return this.cache[e]};bt.prototype.set=function(e,t){this.cache[e]=t};var za={create:function(){return new bt}},Ue={variadic:Na,monadic:Ha};var Q;(function(e){e.MISSING_VALUE="MISSING_VALUE",e.INVALID_VALUE="INVALID_VALUE",e.MISSING_INTL_API="MISSING_INTL_API"})(Q||(Q={}));var Te=(function(e){be(t,e);function t(i,r,a){var n=e.call(this,i)||this;return n.code=r,n.originalMessage=a,n}return t.prototype.toString=function(){return"[formatjs Error: ".concat(this.code,"] ").concat(this.message)},t})(Error);var xt=(function(e){be(t,e);function t(i,r,a,n){return e.call(this,'Invalid values for "'.concat(i,'": "').concat(r,'". Options are "').concat(Object.keys(a).join('", "'),'"'),Q.INVALID_VALUE,n)||this}return t})(Te);var gi=(function(e){be(t,e);function t(i,r,a){return e.call(this,'Value for "'.concat(i,'" must be of type ').concat(r),Q.INVALID_VALUE,a)||this}return t})(Te);var fi=(function(e){be(t,e);function t(i,r){return e.call(this,'The intl string context variable "'.concat(i,'" was not provided to the string "').concat(r,'"'),Q.MISSING_VALUE,r)||this}return t})(Te);var w;(function(e){e[e.literal=0]="literal",e[e.object=1]="object"})(w||(w={}));function Pa(e){return e.length<2?e:e.reduce(function(t,i){var r=t[t.length-1];return!r||r.type!==w.literal||i.type!==w.literal?t.push(i):r.value+=i.value,t},[])}function Ia(e){return typeof e=="function"}function Se(e,t,i,r,a,n,o){if(e.length===1&&ut(e[0]))return[{type:w.literal,value:e[0].value}];for(var s=[],l=0,u=e;l<u.length;l++){var d=u[l];if(ut(d)){s.push({type:w.literal,value:d.value});continue}if(qt(d)){typeof n=="number"&&s.push({type:w.literal,value:i.getNumberFormat(t).format(n)});continue}var c=d.value;if(!(a&&c in a))throw new fi(c,o);var h=a[c];if(Wt(d)){(!h||typeof h=="string"||typeof h=="number")&&(h=typeof h=="string"||typeof h=="number"?String(h):""),s.push({type:typeof h=="string"?w.literal:w.object,value:h});continue}if(Le(d)){var y=typeof d.style=="string"?r.date[d.style]:xe(d.style)?d.style.parsedOptions:void 0;s.push({type:w.literal,value:i.getDateTimeFormat(t,y).format(h)});continue}if(Oe(d)){var y=typeof d.style=="string"?r.time[d.style]:xe(d.style)?d.style.parsedOptions:r.time.medium;s.push({type:w.literal,value:i.getDateTimeFormat(t,y).format(h)});continue}if(Ie(d)){var y=typeof d.style=="string"?r.number[d.style]:Me(d.style)?d.style.parsedOptions:void 0;y&&y.scale&&(h=h*(y.scale||1)),s.push({type:w.literal,value:i.getNumberFormat(t,y).format(h)});continue}if($e(d)){var x=d.children,k=d.value,F=a[k];if(!Ia(F))throw new gi(k,"function",o);var oe=Se(x,t,i,r,a,n),ee=F(oe.map(function(V){return V.value}));Array.isArray(ee)||(ee=[ee]),s.push.apply(s,ee.map(function(V){return{type:typeof V=="string"?w.literal:w.object,value:V}}))}if(Re(d)){var C=d.options[h]||d.options.other;if(!C)throw new xt(d.value,h,Object.keys(d.options),o);s.push.apply(s,Se(C.value,t,i,r,a));continue}if(Be(d)){var C=d.options["=".concat(h)];if(!C){if(!Intl.PluralRules)throw new Te(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`,Q.MISSING_INTL_API,o);var se=i.getPluralRules(t,{type:d.pluralType}).select(h-(d.offset||0));C=d.options[se]||d.options.other}if(!C)throw new xt(d.value,h,Object.keys(d.options),o);s.push.apply(s,Se(C.value,t,i,r,a,h-(d.offset||0)));continue}}return Pa(s)}function La(e,t){return t?f(f(f({},e||{}),t||{}),Object.keys(e).reduce(function(i,r){return i[r]=f(f({},e[r]),t[r]||{}),i},{})):e}function Oa(e,t){return t?Object.keys(e).reduce(function(i,r){return i[r]=La(e[r],t[r]),i},f({},e)):e}function wt(e){return{create:function(){return{get:function(t){return e[t]},set:function(t,i){e[t]=i}}}}}function Ra(e){return e===void 0&&(e={number:{},dateTime:{},pluralRules:{}}),{getNumberFormat:Ee(function(){for(var t,i=[],r=0;r<arguments.length;r++)i[r]=arguments[r];return new((t=Intl.NumberFormat).bind.apply(t,Pe([void 0],i,!1)))},{cache:wt(e.number),strategy:Ue.variadic}),getDateTimeFormat:Ee(function(){for(var t,i=[],r=0;r<arguments.length;r++)i[r]=arguments[r];return new((t=Intl.DateTimeFormat).bind.apply(t,Pe([void 0],i,!1)))},{cache:wt(e.dateTime),strategy:Ue.variadic}),getPluralRules:Ee(function(){for(var t,i=[],r=0;r<arguments.length;r++)i[r]=arguments[r];return new((t=Intl.PluralRules).bind.apply(t,Pe([void 0],i,!1)))},{cache:wt(e.pluralRules),strategy:Ue.variadic})}}var _i=(function(){function e(t,i,r,a){var n=this;if(i===void 0&&(i=e.defaultLocale),this.formatterCache={number:{},dateTime:{},pluralRules:{}},this.format=function(o){var s=n.formatToParts(o);if(s.length===1)return s[0].value;var l=s.reduce(function(u,d){return!u.length||d.type!==w.literal||typeof u[u.length-1]!="string"?u.push(d.value):u[u.length-1]+=d.value,u},[]);return l.length<=1?l[0]||"":l},this.formatToParts=function(o){return Se(n.ast,n.locales,n.formatters,n.formats,o,void 0,n.message)},this.resolvedOptions=function(){return{locale:n.resolvedLocale.toString()}},this.getAst=function(){return n.ast},this.locales=i,this.resolvedLocale=e.resolveLocale(i),typeof t=="string"){if(this.message=t,!e.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");this.ast=e.__parse(t,{ignoreTag:a?.ignoreTag,locale:this.resolvedLocale})}else this.ast=t;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=Oa(e.formats,r),this.formatters=a&&a.formatters||Ra(this.formatterCache)}return Object.defineProperty(e,"defaultLocale",{get:function(){return e.memoizedDefaultLocale||(e.memoizedDefaultLocale=new Intl.NumberFormat().resolvedOptions().locale),e.memoizedDefaultLocale},enumerable:!1,configurable:!0}),e.memoizedDefaultLocale=null,e.resolveLocale=function(t){var i=Intl.NumberFormat.supportedLocalesOf(t);return i.length>0?new Intl.Locale(i[0]):new Intl.Locale(typeof t=="string"?t:t[0])},e.__parse=hi,e.formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},e})();var vi=_i;var D={en:tt,de:it,es:rt,fr:at,it:nt,nl:ot,pl:st,"pt-BR":lt};function Ba(e){let t=e.replace(/['"]+/g,"");if(D[t])return D[t];let i=t.split("-")[0];if(D[i])return D[i];let r=Object.keys(D).find(a=>a.startsWith(i+"-"));return r?D[r]:D.en}function g(e,t,...i){var r;try{r=e.split(".").reduce((n,o)=>n[o],Ba(t))}catch{r=e.split(".").reduce((o,s)=>o[s],D.en)}if(r===void 0&&(r=e.split(".").reduce((n,o)=>n[o],D.en)),!i.length)return r;let a={};for(let n=0;n<i.length;n+=2){let o=i[n];o=o.replace(/^{([^}]+)?}$/,"$1"),a[o]=i[n+1]}try{return new vi(r,t).format(a)}catch(n){return"Translation "+n}}var yi=async()=>{await customElements.whenDefined("partial-panel-resolver"),await document.createElement("partial-panel-resolver")._getRoutes([{component_name:"config",url_path:"a"}])?.routes?.a?.load?.(),await customElements.whenDefined("ha-panel-config");let i=document.createElement("ha-panel-config");await i?.routerOptions?.routes?.dashboard?.load?.(),await i?.routerOptions?.routes?.general?.load?.(),await i?.routerOptions?.routes?.entities?.load?.(),await i?.routerOptions?.routes?.labels?.load?.(),await customElements.whenDefined("ha-config-dashboard")};var re=e=>{let[t]=e.split("T"),[i,r,a]=t.split("-").map(Number);return new Date(i,r-1,a)},ae=e=>{let t=e.trigger_type??"time";return t==="time"||t==="date"},Ae=e=>`${e.progress_current??0} / ${e.progress_target??0}`,$a=(e,t,i)=>{let r=e===1?t.slice(0,-1):t;return`${e} ${g(`intervals.${r}`,i)}`},Ge=(e,t)=>{let i=e.trigger_type??"time";return i==="count"?g("intervals.every_uses",t,"{value}",String(e.count_threshold??0)):i==="runtime"?g("intervals.every_runtime",t,"{value}",String(e.runtime_threshold??0)):$a(e.interval_value,e.interval_type,t)},bi=(e,t,i)=>{let r=i?new Date(i):new Date;r.setHours(0,0,0,0);let a=null,n=null;ae(e)&&e.next_due&&(a=re(e.next_due),n=Math.round((a.getTime()-r.getTime())/(1e3*60*60*24)));let o;e.due?o="overdue":n!==null&&n<=t?o="due_soon":o="upcoming";let s=!1;return e.last_performed&&(s=re(e.last_performed).getTime()===r.getTime()),{nextDue:a,daysUntilDue:n,status:o,completedToday:s}},xi=(e,t,i)=>{if(!ae(t))return Ae(t);let r=e.daysUntilDue;return r===null?"":r===0?g("card.todo.due_today",i):r<0?g("card.todo.days_overdue",i,"{count}",Math.abs(r)):g("card.todo.days_left",i,"{count}",r)};var je=class{constructor(t,i){this._fn=t;this._ms=i}schedule(){this.cancel(),this._timer=setTimeout(()=>{this._timer=void 0,this._fn()},this._ms)}cancel(){this._timer!==void 0&&clearTimeout(this._timer),this._timer=void 0}};var wi=e=>customElements.get("ha-dialog-footer")?v`<ha-dialog-footer slot="footer">${e}</ha-dialog-footer>`:e,Ei=(e,t,i)=>e?.length?v`
        <ul class="history-list">
            ${e.slice(-t).reverse().map(r=>v`
                <li>
                    ${ye(re(r.performed),i)}${r.note?v` — <span class="history-note">${r.note}</span>`:p}
                </li>
            `)}
        </ul>
    `:p,Ti=N`
    .history-list {
        margin: 0;
        padding-left: 18px;
        font-size: 14px;
    }

    /* Wrap a long (uncapped) history list so the dialog doesn't grow. */
    .history-scroll {
        max-height: 180px;
        overflow-y: auto;
    }

    .history-list li {
        margin: 2px 0;
    }

    .history-note {
        color: var(--secondary-text-color);
    }
`;var Si=e=>e.callWS({type:"home_maintenance/get_tasks"});var Ai=(e,t)=>e.callWS({type:"home_maintenance/remove_task",task_id:t}),ki=(e,t,i)=>e.callWS({type:"home_maintenance/complete_task",task_id:t,...i?{note:i}:{}});var Ci=e=>e.callWS({type:"home_maintenance/get_groups"});var Ni=(e,t)=>e.connection.subscribeMessage(t,{type:"home_maintenance/subscribe_updates"});var Fe=(e,t)=>{Vt(e,"hass-notification",{message:t})};var Ma=(e,t)=>{let i=e.language,r=ae(t),a=r?Ge(t,i):Ae(t);return{heading:g("panel.dialog.confirm_complete.title",i),message:g(r?"panel.dialog.confirm_complete.message":"panel.dialog.confirm_complete.message_progress",i,"{title}",t.title,"{interval}",a),confirmLabel:g("panel.dialog.confirm_complete.actions.confirm",i),cancelLabel:g("common.cancel",i),input:{label:g("panel.dialog.confirm_complete.note_label",i)},onConfirm:()=>{}}},Hi=(e,t,i,r,a=n=>n())=>{let n=i.language;t?.open({...Ma(i,r),onConfirm:o=>a(async()=>{try{await ki(i,r.id,o),Fe(e,g("panel.cards.current.alerts.complete_success",n,"{title}",r.title))}catch(s){console.error("Failed to complete task:",s),Fe(e,g("panel.cards.current.alerts.complete_error",n))}})})},Di=(e,t,i,r,a)=>{let n=i.language;t?.open({heading:g("panel.dialog.confirm_remove.title",n),message:g("panel.dialog.confirm_remove.message",n,"{title}",r?.title??""),confirmLabel:g("panel.dialog.confirm_remove.actions.confirm",n),cancelLabel:g("common.cancel",n),destructive:!0,onConfirm:async()=>{try{await Ai(i,a)}catch(o){console.error("Failed to remove task:",o),Fe(e,g("panel.cards.current.alerts.remove_error",n))}}})};var zi=N`
    :host {
        color: var(--primary-text-color);
        background: var(--lovelace-background, var(--primary-background-color));
    }

    .header {
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color, white);
        border-bottom: var(--app-header-border-bottom, none);
    }

    .toolbar {
        height: var(--header-height);
        display: flex;
        align-items: center;
        font-size: 20px;
        padding: 0 16px;
        font-weight: 400;
        box-sizing: border-box;
    }

    .main-title {
        margin: 0 0 0 24px;
        line-height: 20px;
        flex-grow: 1;
    }

    .version {
        font-size: 14px;
        font-weight: 500;
        color: rgba(var(--rgb-text-primary-color), 0.9);
    }

    .view {
        height: calc(100vh - 65px);
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px 16px;
        box-sizing: border-box;
    }

    ha-card {
        display: block;
        margin: 5px;
    }

    .card-new,
    .card-current {
        width: 100%;
        max-width: 1100px;
        margin: 5px 0;
    }

    /* Main fields and the Add Task button share one line; the button wraps
       below (right-aligned) when the fields need the full width. */
    .basic-row {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 12px;
    }

    .basic-row .add-button {
        flex-shrink: 0;
        /* Vertically center the button on the input row (below field labels). */
        margin-top: 30px;
        margin-left: auto;
    }

    ha-expansion-panel {
        --input-fill-color: none;
    }

    .extras-panel{
        margin-bottom: 14px;
    }

    .warning {
        --mdc-theme-primary: var(--error-color);
        color: var(--primary-text-color);
    }

    .group-section {
        margin-bottom: 16px;
    }

    .group-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 4px;
        border-bottom: 1px solid var(--divider-color);
        margin-bottom: 8px;
    }

    .group-title {
        font-weight: 600;
    }

    .group-count {
        font-size: 12px;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color);
        border-radius: 999px;
        padding: 2px 8px;
    }

    .group-management-row {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 10px;
        flex-wrap: wrap;
    }

    .group-management-row ha-selector {
        min-width: 180px;
        flex: 1;
        text-align: left;
    }

    .group-list-row ha-selector {
        flex: 1;
    }

    .group-list {
        border-top: 1px solid var(--divider-color);
        padding-top: 8px;
        margin-top: 8px;
    }

    .group-list-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        min-height: 36px;
        border-bottom: 1px solid var(--divider-color);
    }

    .group-list-row .group-actions {
        display: flex;
        align-items: center;
        flex-shrink: 0;
    }

    .secondary {
        color: var(--secondary-text-color);
    }

    ha-dialog {
        --mdc-dialog-min-width: 600px;
    }

    @media (max-width: 600px) {
        ha-dialog {
        --mdc-dialog-min-width: auto;
        }
    }
`;var Pi=500;var ne=class extends S{constructor(){super(...arguments);this._opts=null}open(i){this._opts=i}_close(){this._opts=null}_handleConfirm(){let i=this._opts?.onConfirm,r=this._input?.value.trim()||void 0;this._close(),i?.(r)}_renderButtons(){return v`
            <ha-button
                data-dialog="close"
                appearance="plain"
                slot="secondaryAction"
                @click=${this._close}
            >
                ${this._opts.cancelLabel}
            </ha-button>
            <ha-button
                slot="primaryAction"
                class="${this._opts.destructive?"warning":""}"
                @click=${this._handleConfirm}
            >
                ${this._opts.confirmLabel}
            </ha-button>
        `}render(){return this._opts?v`
            <ha-dialog
                open
                heading="${this._opts.heading}"
                @closed=${this._close}
            >
                <p>${this._opts.message}</p>

                ${this._opts.input?v`
                    <label class="confirm-input-label">
                        ${this._opts.input.label}
                        <input
                            class="confirm-input"
                            type="text"
                            maxlength=${Pi}
                            placeholder=${this._opts.input.placeholder??""}
                        />
                    </label>
                `:p}

                ${wi(this._renderButtons())}
            </ha-dialog>
        `:v``}};ne.styles=[zi,N`
        .confirm-input-label {
            display: block;
            font-size: 12px;
            font-weight: 500;
            color: var(--secondary-text-color);
        }

        .confirm-input {
            display: block;
            width: 100%;
            box-sizing: border-box;
            margin-top: 4px;
            padding: 8px 10px;
            font-size: 14px;
            color: var(--primary-text-color);
            background: var(--secondary-background-color);
            border: 1px solid var(--divider-color);
            border-radius: 8px;
            outline: none;
        }
    `],E([A()],ne.prototype,"_opts",2),E([ze(".confirm-input")],ne.prototype,"_input",2);customElements.get("hm-confirm-dialog")||customElements.define("hm-confirm-dialog",ne);var K={title:"Home Maintenance",due_soon_days:14,max_items:0,show_search:!0},Ua=300,T=class extends S{constructor(){super(...arguments);this._config=K;this._tasks=[];this._groups=[];this._completing=new Set;this._expandedTasks=new Set;this._searchQuery="";this._groupFilter="";this._reload=new je(()=>this._loadData(),Ua);this._initialized=!1}setConfig(i){this._config={...K,...i}}static getConfigElement(){return document.createElement("home-maintenance-todo-card-editor")}static getStubConfig(){return{title:"Home Maintenance",due_soon_days:14}}getCardSize(){return 3+this._tasks.length}disconnectedCallback(){super.disconnectedCallback(),this._reload.cancel(),this._unsubscribe?.(),this._unsubscribe=void 0,this._initialized=!1}updated(){this.hass&&!this._initialized&&(this._initialized=!0,this._initialize())}async _initialize(){await yi(),await this._loadData();try{this._unsubscribe=await Ni(this.hass,()=>this._reload.schedule())}catch(i){console.error("Failed to subscribe to task updates:",i)}}async _loadData(){if(this.hass)try{let[i,r]=await Promise.all([Si(this.hass),Ci(this.hass)]);this._tasks=i,this._groups=r}catch{}}_computeTask(i){let r=this._config.due_soon_days??K.due_soon_days;return{raw:i,...bi(i,r)}}get _filteredTasks(){let i=this._tasks.map(a=>this._computeTask(a));if(this._searchQuery.trim()){let a=this._searchQuery.toLowerCase();i=i.filter(n=>n.raw.title.toLowerCase().includes(a)||n.raw.description&&n.raw.description.toLowerCase().includes(a)||n.raw.group_id&&n.raw.group_id.toLowerCase().includes(a))}let r=this._config.group?.trim()||this._groupFilter;return r&&(i=i.filter(a=>(a.raw.group_id?.trim()||"")===r)),i}_formatDaysLabel(i){return xi(i,i.raw,this.hass.language)}_formatDate(i){return i?ye(i,this.hass.locale):""}_formatStoredDate(i){return ye(re(i),this.hass.locale)}_completeTask(i){this._completing.has(i.id)||Hi(this,this._confirmDialog,this.hass,i,async r=>{this._completing=new Set(this._completing).add(i.id);try{await r()}finally{let a=new Set(this._completing);a.delete(i.id),this._completing=a}})}_removeTask(i){let r=this._tasks.find(a=>a.id===i);Di(this,this._confirmDialog,this.hass,r,i)}_toggleExpand(i){let r=new Set(this._expandedTasks);r.has(i)?r.delete(i):r.add(i),this._expandedTasks=r}_openPanel(){window.location.href="/home-maintenance"}render(){if(!this.hass)return v``;let i=this.hass.language,r=this._filteredTasks,a=this._config.max_items??0,n=this._config.show_search??!0,o=(c,h)=>c.nextDue&&h.nextDue?c.nextDue.getTime()-h.nextDue.getTime():c.nextDue?-1:h.nextDue?1:c.raw.title.localeCompare(h.raw.title),s=[...r.filter(c=>c.status==="overdue").sort(o),...r.filter(c=>c.status==="due_soon").sort(o),...r.filter(c=>c.status==="upcoming").sort(o)];a>0&&(s=s.slice(0,a));let l=s.filter(c=>c.status==="overdue"),u=s.filter(c=>c.status==="due_soon"),d=s.filter(c=>c.status==="upcoming");return v`
            <ha-card>
                ${this._config.title?v`
                    <div class="card-header">
                        <span class="title">${this._config.title}</span>
                        <ha-icon-button
                            class="panel-link"
                            @click=${this._openPanel}
                            title=${g("card.todo.open_panel",i)}
                        >
                            <ha-icon icon="mdi:open-in-new"></ha-icon>
                        </ha-icon-button>
                    </div>
                `:p}

                ${n?v`
                    <div class="filter-bar">
                        <div class="search-box">
                            <ha-icon icon="mdi:magnify" class="search-icon"></ha-icon>
                            <input
                                type="text"
                                .value=${this._searchQuery}
                                @input=${c=>this._searchQuery=c.target.value}
                                placeholder=${g("card.todo.search",i)}
                            />
                            ${this._searchQuery?v`
                                <ha-icon-button @click=${()=>this._searchQuery=""}>
                                    <ha-icon icon="mdi:close"></ha-icon>
                                </ha-icon-button>
                            `:p}
                        </div>
                        ${this._groups.length>0&&!this._config.group?.trim()?v`
                            <select
                                class="group-filter"
                                .value=${this._groupFilter}
                                @change=${c=>this._groupFilter=c.target.value}
                            >
                                <option value="">${g("card.todo.all_groups",i)}</option>
                                ${this._groups.map(c=>v`
                                    <option value=${c} ?selected=${this._groupFilter===c}>${c}</option>
                                `)}
                            </select>
                        `:p}
                    </div>
                `:p}

                <div class="task-list">
                    ${l.length>0?v`
                        <div class="group-header group-overdue">
                            <span class="group-dot dot-overdue"></span>
                            ${g("card.todo.overdue",i)}
                            <span class="group-count">(${l.length})</span>
                        </div>
                        ${l.map(c=>this._renderTaskCard(c))}
                    `:p}

                    ${u.length>0?v`
                        <div class="group-header group-due-soon">
                            <span class="group-dot dot-due-soon"></span>
                            ${g("card.todo.due_soon",i)}
                            <span class="group-count">(${u.length})</span>
                        </div>
                        ${u.map(c=>this._renderTaskCard(c))}
                    `:p}

                    ${d.length>0?v`
                        <div class="group-header group-upcoming">
                            <span class="group-dot dot-upcoming"></span>
                            ${g("card.todo.upcoming",i)}
                            <span class="group-count">(${d.length})</span>
                        </div>
                        ${d.map(c=>this._renderTaskCard(c))}
                    `:p}

                    ${s.length===0?v`
                        <div class="empty">${g("card.todo.no_tasks",i)}</div>
                    `:p}
                </div>
            </ha-card>

            <hm-confirm-dialog></hm-confirm-dialog>
        `}_renderTaskCard(i){let r=i.raw,a=this.hass.language,n=this._expandedTasks.has(r.id),o=this._completing.has(r.id),s=ae(r);return v`
            <div class="task-card ${i.status} ${o?"completing":""} ${i.completedToday?"done-today":""}">
                <div class="task-card-main" @click=${()=>this._toggleExpand(r.id)}>
                    <div class="task-left">
                        ${i.completedToday?v`
                            <ha-icon class="task-icon done-check" icon="mdi:check-circle"></ha-icon>
                        `:r.icon?v`<ha-icon class="task-icon" .icon=${r.icon}></ha-icon>`:p}
                        <div class="task-info">
                            <div class="task-title">${r.title}${i.completedToday?v`<span class="done-badge">${g("card.todo.done",a)}</span>`:p}</div>
                            <div class="task-meta">
                                <span class="task-interval">${Ge(r,this.hass.language)}</span>
                                ${r.group_id?v`
                                    <span class="task-group">${r.group_id}</span>
                                `:p}
                            </div>
                        </div>
                    </div>
                    <div class="task-right">
                        <div class="task-due-info">
                            ${s?v`
                                <span class="due-date">${this._formatDate(i.nextDue)}</span>
                            `:p}
                            <span class="due-days ${i.status}">${this._formatDaysLabel(i)}</span>
                        </div>
                        <div class="task-actions">
                            <ha-icon-button
                                @click=${l=>{l.stopPropagation(),this._completeTask(r)}}
                                title=${g("card.todo.complete",a)}
                                ?disabled=${o}
                            >
                                <ha-icon icon="mdi:check-circle-outline"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${l=>{l.stopPropagation(),this._openPanel()}}
                                title=${g("card.todo.edit",a)}
                            >
                                <ha-icon icon="mdi:pencil"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${l=>{l.stopPropagation(),this._removeTask(r.id)}}
                                title=${g("card.todo.remove",a)}
                            >
                                <ha-icon icon="mdi:delete"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${l=>{l.stopPropagation(),this._toggleExpand(r.id)}}
                            >
                                <ha-icon icon=${n?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                            </ha-icon-button>
                        </div>
                    </div>
                </div>

                ${n?v`
                    <div class="task-expanded">
                        ${r.description?v`
                            <div class="task-section">
                                <div class="section-label">${g("card.todo.description",a)}</div>
                                <div class="section-content notes-content">${r.description}</div>
                            </div>
                        `:p}

                        <div class="task-section">
                            <div class="section-label">${g("card.todo.last_performed",a)}</div>
                            <div class="section-content">
                                ${r.last_performed?this._formatStoredDate(r.last_performed):"-"}
                            </div>
                        </div>

                        ${s?p:v`
                            <div class="task-section">
                                <div class="section-label">${g("card.todo.progress",a)}</div>
                                <div class="section-content">
                                    ${Ae(r)}
                                </div>
                            </div>
                        `}

                        ${r.history?.length?v`
                            <div class="task-section">
                                <div class="section-label">${g("card.todo.history",a)}</div>
                                <div class="section-content">
                                    ${Ei(r.history,3,this.hass.locale)}
                                </div>
                            </div>
                        `:p}
                    </div>
                `:p}
            </div>
        `}};T.styles=[Ti,N`
        :host {
            --todo-overdue: var(--error-color, #db4437);
            --todo-due-soon: var(--warning-color, #ffa726);
            --todo-upcoming: var(--success-color, #43a047);
        }

        ha-card {
            overflow: hidden;
        }

        /* Header */
        .card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 8px 0 16px;
        }

        .card-header .title {
            font-size: 18px;
            font-weight: 500;
            color: var(--primary-text-color);
        }

        .panel-link {
            --mdc-icon-button-size: 36px;
            color: var(--secondary-text-color);
        }

        /* Filter bar */
        .filter-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px 0;
            flex-wrap: wrap;
        }

        .search-box {
            display: flex;
            align-items: center;
            flex: 1;
            min-width: 150px;
            background: var(--secondary-background-color);
            border: 1px solid var(--divider-color);
            border-radius: 8px;
            padding: 4px 10px;
        }

        .search-icon {
            color: var(--secondary-text-color);
            margin-right: 6px;
            --mdc-icon-size: 20px;
            flex-shrink: 0;
        }

        .search-box input {
            border: none;
            outline: none;
            background: transparent;
            color: var(--primary-text-color);
            font-size: 14px;
            flex: 1;
            padding: 6px 0;
        }

        .search-box input::placeholder {
            color: var(--secondary-text-color);
        }

        .search-box ha-icon-button {
            --mdc-icon-button-size: 28px;
            color: var(--secondary-text-color);
        }

        .group-filter {
            background: var(--secondary-background-color);
            border: 1px solid var(--divider-color);
            border-radius: 8px;
            padding: 8px 10px;
            color: var(--primary-text-color);
            font-size: 13px;
        }

        /* Task list */
        .task-list {
            padding: 8px 0 12px;
        }

        /* Status group headers */
        .group-header {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            padding: 12px 16px 6px;
        }

        .group-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            flex-shrink: 0;
        }

        .dot-overdue { background: var(--todo-overdue); }
        .dot-due-soon { background: var(--todo-due-soon); }
        .dot-upcoming { background: var(--todo-upcoming); }

        .group-overdue { color: var(--todo-overdue); }
        .group-due-soon { color: var(--todo-due-soon); }
        .group-upcoming { color: var(--todo-upcoming); }

        .group-count {
            font-weight: 400;
            opacity: 0.7;
        }

        /* Task cards */
        .task-card {
            background: var(--card-background-color, var(--ha-card-background, white));
            border-radius: 12px;
            margin: 6px 12px;
            border-left: 4px solid transparent;
            box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0,0,0,0.14));
            overflow: hidden;
            transition: box-shadow 0.2s ease, opacity 0.3s ease;
        }

        .task-card:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .task-card.overdue { border-left-color: var(--todo-overdue); }
        .task-card.due_soon { border-left-color: var(--todo-due-soon); }
        .task-card.upcoming { border-left-color: var(--todo-upcoming); }

        .task-card.completing { opacity: 0.4; }

        .task-card.done-today {
            opacity: 0.55;
            border-left-color: var(--secondary-text-color) !important;
        }

        .task-card.done-today .task-title {
            text-decoration: line-through;
            color: var(--secondary-text-color);
        }

        .done-check {
            color: var(--todo-upcoming) !important;
        }

        .done-badge {
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            background: var(--todo-upcoming);
            color: var(--text-primary-color, white);
            border-radius: 4px;
            padding: 1px 6px;
            margin-left: 8px;
            text-decoration: none;
            display: inline-block;
            vertical-align: middle;
            letter-spacing: 0.3px;
        }

        .task-card-main {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 6px 10px 14px;
            cursor: pointer;
            gap: 8px;
        }

        .task-left {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
            min-width: 0;
        }

        .task-icon {
            flex-shrink: 0;
            color: var(--secondary-text-color);
            --mdc-icon-size: 24px;
        }

        .task-info {
            min-width: 0;
            flex: 1;
        }

        .task-title {
            font-size: 15px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .task-meta {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            color: var(--secondary-text-color);
            margin-top: 2px;
        }

        .task-group {
            background: var(--primary-color);
            color: var(--text-primary-color, white);
            border-radius: 10px;
            padding: 1px 8px;
            font-size: 11px;
            font-weight: 500;
        }

        .task-right {
            display: flex;
            align-items: center;
            gap: 6px;
            flex-shrink: 0;
        }

        .task-due-info {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            white-space: nowrap;
        }

        .due-date {
            font-size: 13px;
            color: var(--secondary-text-color);
        }

        .due-days {
            font-size: 12px;
            font-weight: 600;
        }

        .due-days.overdue { color: var(--todo-overdue); }
        .due-days.due_soon { color: var(--todo-due-soon); }
        .due-days.upcoming { color: var(--todo-upcoming); }

        .task-actions {
            display: flex;
            align-items: center;
        }

        .task-actions ha-icon-button {
            --mdc-icon-button-size: 34px;
            color: var(--secondary-text-color);
        }

        /* Expanded section */
        .task-expanded {
            padding: 0 14px 14px;
            border-top: 1px solid var(--divider-color);
        }

        .task-section {
            margin-top: 10px;
        }

        .section-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            color: var(--secondary-text-color);
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }

        .section-content {
            font-size: 14px;
        }

        .notes-content {
            white-space: pre-wrap;
            background: var(--secondary-background-color);
            border-radius: 8px;
            padding: 8px 12px;
        }

        /* Empty state */
        .empty {
            text-align: center;
            padding: 32px 16px;
            color: var(--secondary-text-color);
            font-size: 14px;
        }

        /* Responsive */
        @media (max-width: 600px) {
            .task-card-main {
                flex-wrap: wrap;
            }

            .task-right {
                width: 100%;
                justify-content: space-between;
            }

            .task-actions ha-icon-button {
                --mdc-icon-button-size: 30px;
            }

            .filter-bar {
                flex-direction: column;
                align-items: stretch;
            }

            .search-box {
                min-width: unset;
            }
        }
    `],E([ve({attribute:!1})],T.prototype,"hass",2),E([A()],T.prototype,"_config",2),E([A()],T.prototype,"_tasks",2),E([A()],T.prototype,"_groups",2),E([A()],T.prototype,"_completing",2),E([A()],T.prototype,"_expandedTasks",2),E([A()],T.prototype,"_searchQuery",2),E([A()],T.prototype,"_groupFilter",2),E([ze("hm-confirm-dialog")],T.prototype,"_confirmDialog",2);var G=class G extends S{constructor(){super(...arguments);this._config=K;this._computeLabel=i=>G._labels[i.name]??i.name}setConfig(i){this._config={...K,...i}}_valueChanged(i){i.stopPropagation(),this._config={...K,...this._config,...i.detail.value},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return v`
            <ha-form
                .hass=${this.hass}
                .data=${{...K,...this._config}}
                .schema=${G._schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${i=>this._valueChanged(i)}
            ></ha-form>
        `}};G._schema=[{name:"title",selector:{text:{}}},{name:"due_soon_days",selector:{number:{min:0,mode:"box"}}},{name:"max_items",selector:{number:{min:0,mode:"box"}}},{name:"group",selector:{text:{}}},{name:"show_search",selector:{boolean:{}}}],G._labels={title:"Title",due_soon_days:"Due Soon Days (threshold)",max_items:"Max Items (0 = no limit)",group:"Group (show only this group's tasks)",show_search:"Show Search Bar"},E([ve({attribute:!1})],G.prototype,"hass",2),E([A()],G.prototype,"_config",2);var Et=G;customElements.get("home-maintenance-todo-card")||customElements.define("home-maintenance-todo-card",T);customElements.get("home-maintenance-todo-card-editor")||customElements.define("home-maintenance-todo-card-editor",Et);window.customCards=window.customCards||[];window.customCards.push({type:"home-maintenance-todo-card",name:"Home Maintenance Todo",description:"A dashboard card mirroring the Home Maintenance panel: overdue / due soon / upcoming tasks with quick actions and expandable details",preview:!0});
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
