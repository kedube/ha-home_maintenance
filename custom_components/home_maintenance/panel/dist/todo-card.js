var Pt=Object.defineProperty;var Nt=Object.getOwnPropertyDescriptor;var f=(o,t,e,i)=>{for(var r=i>1?void 0:i?Nt(t,e):t,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&Pt(t,e,r),r};var W=globalThis,q=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol(),at=new WeakMap,N=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=at.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&at.set(e,t))}return t}toString(){return this.cssText}},ct=o=>new N(typeof o=="string"?o:o+"",void 0,Q),Y=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,r,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[s+1],o[0]);return new N(e,o,Q)},lt=(o,t)=>{if(q)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),r=W.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,o.appendChild(i)}},K=q?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ct(e)})(o):o;var{is:Ot,defineProperty:Rt,getOwnPropertyDescriptor:Ut,getOwnPropertyNames:It,getOwnPropertySymbols:Mt,getPrototypeOf:Ht}=Object,x=globalThis,ut=x.trustedTypes,Ft=ut?ut.emptyScript:"",Lt=x.reactiveElementPolyfillSupport,O=(o,t)=>o,R={toAttribute(o,t){switch(t){case Boolean:o=o?Ft:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},B=(o,t)=>!Ot(o,t),dt={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:B};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),x.litPropertyMetadata??(x.litPropertyMetadata=new WeakMap);var v=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Rt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){let{get:r,set:s}=Ut(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){let l=r?.call(this);s?.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let t=Ht(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let e=this.properties,i=[...It(e),...Mt(e)];for(let r of i)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let r of i)e.unshift(K(r))}else t!==void 0&&e.push(K(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){let s=(i.converter?.toAttribute!==void 0?i.converter:R).toAttribute(e,i.type);this._$Em=t,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){let i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let s=i.getPropertyOptions(r),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:R;this._$Em=r;let l=n.fromAttribute(e,s.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(t!==void 0){let n=this.constructor;if(r===!1&&(s=this[t]),i??(i=n.getPropertyOptions(t)),!((i.hasChanged??B)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),s!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[r,s]of i){let{wrapped:n}=s,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,s,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[O("elementProperties")]=new Map,v[O("finalized")]=new Map,Lt?.({ReactiveElement:v}),(x.reactiveElementVersions??(x.reactiveElementVersions=[])).push("2.1.2");var I=globalThis,mt=o=>o,V=I.trustedTypes,pt=V?V.createPolicy("lit-html",{createHTML:o=>o}):void 0,yt="$lit$",w=`lit$${Math.random().toFixed(9).slice(2)}$`,bt="?"+w,zt=`<${bt}>`,E=document,M=()=>E.createComment(""),H=o=>o===null||typeof o!="object"&&typeof o!="function",rt=Array.isArray,jt=o=>rt(o)||typeof o?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ht=/-->/g,gt=/>/g,A=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,_t=/"/g,xt=/^(?:script|style|textarea|title)$/i,ot=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),p=ot(1),ee=ot(2),ie=ot(3),T=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),vt=new WeakMap,S=E.createTreeWalker(E,129);function wt(o,t){if(!rt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return pt!==void 0?pt.createHTML(t):t}var Wt=(o,t)=>{let e=o.length-1,i=[],r,s=t===2?"<svg>":t===3?"<math>":"",n=U;for(let l=0;l<e;l++){let c=o[l],m,a,d=-1,g=0;for(;g<c.length&&(n.lastIndex=g,a=n.exec(c),a!==null);)g=n.lastIndex,n===U?a[1]==="!--"?n=ht:a[1]!==void 0?n=gt:a[2]!==void 0?(xt.test(a[2])&&(r=RegExp("</"+a[2],"g")),n=A):a[3]!==void 0&&(n=A):n===A?a[0]===">"?(n=r??U,d=-1):a[1]===void 0?d=-2:(d=n.lastIndex-a[2].length,m=a[1],n=a[3]===void 0?A:a[3]==='"'?_t:ft):n===_t||n===ft?n=A:n===ht||n===gt?n=U:(n=A,r=void 0);let _=n===A&&o[l+1].startsWith("/>")?" ":"";s+=n===U?c+zt:d>=0?(i.push(m),c.slice(0,d)+yt+c.slice(d)+w+_):c+w+(d===-2?l:_)}return[wt(o,s+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},F=class o{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,n=0,l=t.length-1,c=this.parts,[m,a]=Wt(t,e);if(this.el=o.createElement(m,i),S.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(r=S.nextNode())!==null&&c.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(let d of r.getAttributeNames())if(d.endsWith(yt)){let g=a[n++],_=r.getAttribute(d).split(w),k=/([.?@])?(.*)/.exec(g);c.push({type:1,index:s,name:k[2],strings:_,ctor:k[1]==="."?X:k[1]==="?"?tt:k[1]==="@"?et:P}),r.removeAttribute(d)}else d.startsWith(w)&&(c.push({type:6,index:s}),r.removeAttribute(d));if(xt.test(r.tagName)){let d=r.textContent.split(w),g=d.length-1;if(g>0){r.textContent=V?V.emptyScript:"";for(let _=0;_<g;_++)r.append(d[_],M()),S.nextNode(),c.push({type:2,index:++s});r.append(d[g],M())}}}else if(r.nodeType===8)if(r.data===bt)c.push({type:2,index:s});else{let d=-1;for(;(d=r.data.indexOf(w,d+1))!==-1;)c.push({type:7,index:s}),d+=w.length-1}s++}}static createElement(t,e){let i=E.createElement("template");return i.innerHTML=t,i}};function D(o,t,e=o,i){if(t===T)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl,s=H(t)?void 0:t._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(o),r._$AT(o,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=r:e._$Cl=r),r!==void 0&&(t=D(o,r._$AS(o,t.values),r,i)),t}var Z=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??E).importNode(e,!0);S.currentNode=r;let s=S.nextNode(),n=0,l=0,c=i[0];for(;c!==void 0;){if(n===c.index){let m;c.type===2?m=new L(s,s.nextSibling,this,t):c.type===1?m=new c.ctor(s,c.name,c.strings,this,t):c.type===6&&(m=new it(s,this,t)),this._$AV.push(m),c=i[++l]}n!==c?.index&&(s=S.nextNode(),n++)}return S.currentNode=E,r}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},L=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),H(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):jt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(E.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=F.createElement(wt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{let s=new Z(r,this),n=s.u(this.options);s.p(e),this.T(n),this._$AH=s}}_$AC(t){let e=vt.get(t.strings);return e===void 0&&vt.set(t.strings,e=new F(t)),e}k(t){rt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,r=0;for(let s of t)r===e.length?e.push(i=new o(this.O(M()),this.O(M()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=mt(t).nextSibling;mt(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(t,e=this,i,r){let s=this.strings,n=!1;if(s===void 0)t=D(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else{let l=t,c,m;for(t=s[0],c=0;c<s.length-1;c++)m=D(this,l[i+c],e,c),m===T&&(m=this._$AH[c]),n||(n=!H(m)||m!==this._$AH[c]),m===u?t=u:t!==u&&(t+=(m??"")+s[c+1]),this._$AH[c]=m}n&&!r&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},X=class extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},tt=class extends P{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},et=class extends P{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=D(this,t,e,0)??u)===T)return;let i=this._$AH,r=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==u&&(i===u||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},it=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}};var qt=I.litHtmlPolyfillSupport;qt?.(F,L),(I.litHtmlVersions??(I.litHtmlVersions=[])).push("3.3.3");var $t=(o,t,e)=>{let i=e?.renderBefore??t,r=i._$litPart$;if(r===void 0){let s=e?.renderBefore??null;i._$litPart$=r=new L(t.insertBefore(M(),s),s,void 0,e??{})}return r._$AI(o),r};var z=globalThis,y=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};y._$litElement$=!0,y.finalized=!0,z.litElementHydrateSupport?.({LitElement:y});var Bt=z.litElementPolyfillSupport;Bt?.({LitElement:y});(z.litElementVersions??(z.litElementVersions=[])).push("4.2.2");var Vt={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:B},Gt=(o=Vt,t,e)=>{let{kind:i,metadata:r}=e,s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(e.name,o),i==="accessor"){let{name:n}=e;return{set(l){let c=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,c,o,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(i==="setter"){let{name:n}=e;return function(l){let c=this[n];t.call(this,l),this.requestUpdate(n,c,o,!0,l)}}throw Error("Unsupported decorator location: "+i)};function j(o){return(t,e)=>typeof e=="object"?Gt(o,t,e):((i,r,s)=>{let n=r.hasOwnProperty(s);return r.constructor.createProperty(s,i),n?Object.getOwnPropertyDescriptor(r,s):void 0})(o,t,e)}function b(o){return j({...o,state:!0,attribute:!1})}var kt,At;var st=function(o,t){return Qt(t).format(o)},Qt=function(o){return new Intl.DateTimeFormat(o.language,{year:"numeric",month:"numeric",day:"numeric"})};(function(o){o.language="language",o.system="system",o.comma_decimal="comma_decimal",o.decimal_comma="decimal_comma",o.space_comma="space_comma",o.none="none"})(kt||(kt={})),(function(o){o.language="language",o.system="system",o.am_pm="12",o.twenty_four="24"})(At||(At={}));var St=o=>o.callWS({type:"home_maintenance/get_tasks"});var Et=(o,t)=>o.callWS({type:"home_maintenance/remove_task",task_id:t}),Tt=(o,t)=>o.callWS({type:"home_maintenance/complete_task",task_id:t});var Ct=o=>o.callWS({type:"home_maintenance/get_groups"});var Dt=(o,t)=>o.connection.subscribeMessage(t,{type:"home_maintenance/subscribe_updates"});var C={title:"Home Maintenance",due_soon_days:14,max_items:0,show_search:!0},Yt=300,h=class extends y{constructor(){super(...arguments);this._config=C;this._tasks=[];this._groups=[];this._completing=new Set;this._expandedTasks=new Set;this._searchQuery="";this._groupFilter="";this._initialized=!1}setConfig(e){this._config={...C,...e}}static getConfigElement(){return document.createElement("home-maintenance-todo-card-editor")}static getStubConfig(){return{title:"Home Maintenance",due_soon_days:14}}getCardSize(){return 3+this._tasks.length}disconnectedCallback(){super.disconnectedCallback(),this._reloadTimer!==void 0&&clearTimeout(this._reloadTimer),this._unsubscribe?.(),this._unsubscribe=void 0,this._initialized=!1}updated(){this.hass&&!this._initialized&&(this._initialized=!0,this._initialize())}async _initialize(){await this._loadData();try{this._unsubscribe=await Dt(this.hass,()=>this._scheduleReload())}catch(e){console.error("Failed to subscribe to task updates:",e)}}_scheduleReload(){this._reloadTimer!==void 0&&clearTimeout(this._reloadTimer),this._reloadTimer=setTimeout(()=>{this._reloadTimer=void 0,this._loadData()},Yt)}async _loadData(){if(this.hass)try{let[e,i]=await Promise.all([St(this.hass),Ct(this.hass)]);this._tasks=e,this._groups=i}catch{}}_computeTask(e){let i=new Date;i.setHours(0,0,0,0);let r=this._config.due_soon_days??C.due_soon_days,s=(e.trigger_type??"time")==="time",n=null,l=null;s&&e.next_due&&(n=new Date(e.next_due),n.setHours(0,0,0,0),l=Math.ceil((n.getTime()-i.getTime())/(1e3*60*60*24)));let c;e.due?c="overdue":l!==null&&l<=r?c="due_soon":c="upcoming";let m=!1;if(e.last_performed){let[a]=e.last_performed.split("T"),[d,g,_]=a.split("-").map(Number),k=new Date(d,g-1,_);k.setHours(0,0,0,0),m=k.getTime()===i.getTime()}return{raw:e,nextDue:n,daysUntilDue:l,status:c,completedToday:m}}get _filteredTasks(){let e=this._tasks.map(r=>this._computeTask(r));if(this._searchQuery.trim()){let r=this._searchQuery.toLowerCase();e=e.filter(s=>s.raw.title.toLowerCase().includes(r)||s.raw.description&&s.raw.description.toLowerCase().includes(r)||s.raw.group_id&&s.raw.group_id.toLowerCase().includes(r))}let i=this._config.group?.trim()||this._groupFilter;return i&&(e=e.filter(r=>(r.raw.group_id?.trim()||"")===i)),e}_formatDaysLabel(e){let i=e.raw;if((i.trigger_type??"time")!=="time")return`${i.progress_current??0} / ${i.progress_target??0}`;let r=e.daysUntilDue;if(r===null)return"";if(r===0)return"Due today";if(r<0){let s=Math.abs(r);return s===1?"1 day overdue":`${s} days overdue`}return r===1?"Due in 1 day":`${r} days left`}_formatDate(e){return e?st(e,this.hass.locale):""}_formatStoredDate(e){let[i]=e.split("T"),[r,s,n]=i.split("-").map(Number);return st(new Date(r,s-1,n),this.hass.locale)}_getIntervalLabel(e){let i=e.trigger_type??"time";if(i==="count")return`Every ${e.count_threshold} uses`;if(i==="runtime")return`Every ${e.runtime_threshold} runtime`;let r=e.interval_value,s=e.interval_type,n=r===1?s.slice(0,-1):s;return`${r} ${n.charAt(0).toUpperCase()+n.slice(1)}`}async _completeTask(e){if(this._completing.has(e.id)||!confirm(`Mark "${e.title}" as complete?`))return;let i=new Set(this._completing);i.add(e.id),this._completing=i;try{await Tt(this.hass,e.id),await this._loadData()}catch(s){console.error("Failed to complete task:",s)}let r=new Set(this._completing);r.delete(e.id),this._completing=r}async _removeTask(e){if(confirm("Remove this task?"))try{await Et(this.hass,e),await this._loadData()}catch(i){console.error("Failed to remove task:",i)}}_toggleExpand(e){let i=new Set(this._expandedTasks);i.has(e)?i.delete(e):i.add(e),this._expandedTasks=i}_openPanel(){window.location.href="/home-maintenance"}render(){if(!this.hass)return p``;let e=this._filteredTasks,i=this._config.max_items??0,r=this._config.show_search??!0,s=(a,d)=>a.nextDue&&d.nextDue?a.nextDue.getTime()-d.nextDue.getTime():a.nextDue?-1:d.nextDue?1:a.raw.title.localeCompare(d.raw.title),n=[...e.filter(a=>a.status==="overdue").sort(s),...e.filter(a=>a.status==="due_soon").sort(s),...e.filter(a=>a.status==="upcoming").sort(s)];i>0&&(n=n.slice(0,i));let l=n.filter(a=>a.status==="overdue"),c=n.filter(a=>a.status==="due_soon"),m=n.filter(a=>a.status==="upcoming");return p`
            <ha-card>
                ${this._config.title?p`
                    <div class="card-header">
                        <span class="title">${this._config.title}</span>
                        <ha-icon-button
                            class="panel-link"
                            @click=${this._openPanel}
                            title="Open full panel"
                        >
                            <ha-icon icon="mdi:open-in-new"></ha-icon>
                        </ha-icon-button>
                    </div>
                `:u}

                ${r?p`
                    <div class="filter-bar">
                        <div class="search-box">
                            <ha-icon icon="mdi:magnify" class="search-icon"></ha-icon>
                            <input
                                type="text"
                                .value=${this._searchQuery}
                                @input=${a=>this._searchQuery=a.target.value}
                                placeholder="Search tasks..."
                            />
                            ${this._searchQuery?p`
                                <ha-icon-button @click=${()=>this._searchQuery=""}>
                                    <ha-icon icon="mdi:close"></ha-icon>
                                </ha-icon-button>
                            `:u}
                        </div>
                        ${this._groups.length>0&&!this._config.group?.trim()?p`
                            <select
                                class="group-filter"
                                .value=${this._groupFilter}
                                @change=${a=>this._groupFilter=a.target.value}
                            >
                                <option value="">All groups</option>
                                ${this._groups.map(a=>p`
                                    <option value=${a} ?selected=${this._groupFilter===a}>${a}</option>
                                `)}
                            </select>
                        `:u}
                    </div>
                `:u}

                <div class="task-list">
                    ${l.length>0?p`
                        <div class="group-header group-overdue">
                            <span class="group-dot dot-overdue"></span>
                            OVERDUE
                            <span class="group-count">(${l.length})</span>
                        </div>
                        ${l.map(a=>this._renderTaskCard(a))}
                    `:u}

                    ${c.length>0?p`
                        <div class="group-header group-due-soon">
                            <span class="group-dot dot-due-soon"></span>
                            DUE SOON
                            <span class="group-count">(${c.length})</span>
                        </div>
                        ${c.map(a=>this._renderTaskCard(a))}
                    `:u}

                    ${m.length>0?p`
                        <div class="group-header group-upcoming">
                            <span class="group-dot dot-upcoming"></span>
                            UPCOMING
                            <span class="group-count">(${m.length})</span>
                        </div>
                        ${m.map(a=>this._renderTaskCard(a))}
                    `:u}

                    ${n.length===0?p`
                        <div class="empty">No tasks found</div>
                    `:u}
                </div>
            </ha-card>
        `}_renderTaskCard(e){let i=e.raw,r=this._expandedTasks.has(i.id),s=this._completing.has(i.id),n=(i.trigger_type??"time")==="time";return p`
            <div class="task-card ${e.status} ${s?"completing":""} ${e.completedToday?"done-today":""}">
                <div class="task-card-main" @click=${()=>this._toggleExpand(i.id)}>
                    <div class="task-left">
                        ${e.completedToday?p`
                            <ha-icon class="task-icon done-check" icon="mdi:check-circle"></ha-icon>
                        `:i.icon?p`<ha-icon class="task-icon" .icon=${i.icon}></ha-icon>`:u}
                        <div class="task-info">
                            <div class="task-title">${i.title}${e.completedToday?p`<span class="done-badge">Done</span>`:u}</div>
                            <div class="task-meta">
                                <span class="task-interval">${this._getIntervalLabel(i)}</span>
                                ${i.group_id?p`
                                    <span class="task-group">${i.group_id}</span>
                                `:u}
                            </div>
                        </div>
                    </div>
                    <div class="task-right">
                        <div class="task-due-info">
                            ${n?p`
                                <span class="due-date">${this._formatDate(e.nextDue)}</span>
                            `:u}
                            <span class="due-days ${e.status}">${this._formatDaysLabel(e)}</span>
                        </div>
                        <div class="task-actions">
                            <ha-icon-button
                                @click=${l=>{l.stopPropagation(),this._completeTask(i)}}
                                title="Complete"
                                ?disabled=${s}
                            >
                                <ha-icon icon="mdi:check-circle-outline"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${l=>{l.stopPropagation(),this._openPanel()}}
                                title="Edit in panel"
                            >
                                <ha-icon icon="mdi:pencil"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${l=>{l.stopPropagation(),this._removeTask(i.id)}}
                                title="Remove"
                            >
                                <ha-icon icon="mdi:delete"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${l=>{l.stopPropagation(),this._toggleExpand(i.id)}}
                            >
                                <ha-icon icon=${r?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                            </ha-icon-button>
                        </div>
                    </div>
                </div>

                ${r?p`
                    <div class="task-expanded">
                        ${i.description?p`
                            <div class="task-section">
                                <div class="section-label">Description</div>
                                <div class="section-content notes-content">${i.description}</div>
                            </div>
                        `:u}

                        <div class="task-section">
                            <div class="section-label">Last Performed</div>
                            <div class="section-content">
                                ${i.last_performed?this._formatStoredDate(i.last_performed):"-"}
                            </div>
                        </div>

                        ${n?u:p`
                            <div class="task-section">
                                <div class="section-label">Progress</div>
                                <div class="section-content">
                                    ${i.progress_current??0} / ${i.progress_target??0}
                                </div>
                            </div>
                        `}
                    </div>
                `:u}
            </div>
        `}};h.styles=Y`
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
    `,f([j({attribute:!1})],h.prototype,"hass",2),f([b()],h.prototype,"_config",2),f([b()],h.prototype,"_tasks",2),f([b()],h.prototype,"_groups",2),f([b()],h.prototype,"_completing",2),f([b()],h.prototype,"_expandedTasks",2),f([b()],h.prototype,"_searchQuery",2),f([b()],h.prototype,"_groupFilter",2);var $=class $ extends y{constructor(){super(...arguments);this._config=C;this._computeLabel=e=>$._labels[e.name]??e.name}setConfig(e){this._config={...C,...e}}_valueChanged(e){e.stopPropagation(),this._config={...C,...this._config,...e.detail.value},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return p`
            <ha-form
                .hass=${this.hass}
                .data=${{...C,...this._config}}
                .schema=${$._schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${e=>this._valueChanged(e)}
            ></ha-form>
        `}};$._schema=[{name:"title",selector:{text:{}}},{name:"due_soon_days",selector:{number:{min:0,mode:"box"}}},{name:"max_items",selector:{number:{min:0,mode:"box"}}},{name:"group",selector:{text:{}}},{name:"show_search",selector:{boolean:{}}}],$._labels={title:"Title",due_soon_days:"Due Soon Days (threshold)",max_items:"Max Items (0 = no limit)",group:"Group (show only this group's tasks)",show_search:"Show Search Bar"},f([j({attribute:!1})],$.prototype,"hass",2),f([b()],$.prototype,"_config",2);var nt=$;customElements.get("home-maintenance-todo-card")||customElements.define("home-maintenance-todo-card",h);customElements.get("home-maintenance-todo-card-editor")||customElements.define("home-maintenance-todo-card-editor",nt);window.customCards=window.customCards||[];window.customCards.push({type:"home-maintenance-todo-card",name:"Home Maintenance Todo",description:"A dashboard card mirroring the Home Maintenance panel: overdue / due soon / upcoming tasks with quick actions and expandable details",preview:!0});
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
