var ct=Object.defineProperty;var mr=Object.getOwnPropertyDescriptor;var ht=(e,t)=>{for(var r in t)ct(e,r,{get:t[r],enumerable:!0})};var w=(e,t,r,i)=>{for(var n=i>1?void 0:i?mr(t,r):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(i?a(t,r,n):a(n))||n);return i&&n&&ct(t,r,n),n};var ge=globalThis,_e=ge.ShadowRoot&&(ge.ShadyCSS===void 0||ge.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Be=Symbol(),dt=new WeakMap,Q=class{constructor(t,r,i){if(this._$cssResult$=!0,i!==Be)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o,r=this.t;if(_e&&t===void 0){let i=r!==void 0&&r.length===1;i&&(t=dt.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&dt.set(r,t))}return t}toString(){return this.cssText}},pt=e=>new Q(typeof e=="string"?e:e+"",void 0,Be),Y=(e,...t)=>{let r=e.length===1?e[0]:t.reduce((i,n,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[o+1],e[0]);return new Q(r,e,Be)},mt=(e,t)=>{if(_e)e.adoptedStyleSheets=t.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(let r of t){let i=document.createElement("style"),n=ge.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=r.cssText,e.appendChild(i)}},De=_e?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(let i of t.cssRules)r+=i.cssText;return pt(r)})(e):e;var{is:fr,defineProperty:gr,getOwnPropertyDescriptor:_r,getOwnPropertyNames:vr,getOwnPropertySymbols:br,getPrototypeOf:yr}=Object,H=globalThis,ft=H.trustedTypes,xr=ft?ft.emptyScript:"",Er=H.reactiveElementPolyfillSupport,J=(e,t)=>e,K={toAttribute(e,t){switch(t){case Boolean:e=e?xr:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},ve=(e,t)=>!fr(e,t),gt={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:ve};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),H.litPropertyMetadata??(H.litPropertyMetadata=new WeakMap);var P=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=gt){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){let i=Symbol(),n=this.getPropertyDescriptor(t,i,r);n!==void 0&&gr(this.prototype,t,n)}}static getPropertyDescriptor(t,r,i){let{get:n,set:o}=_r(this.prototype,t)??{get(){return this[r]},set(a){this[r]=a}};return{get:n,set(a){let s=n?.call(this);o?.call(this,a),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??gt}static _$Ei(){if(this.hasOwnProperty(J("elementProperties")))return;let t=yr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(J("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(J("properties"))){let r=this.properties,i=[...vr(r),...br(r)];for(let n of i)this.createProperty(n,r[n])}let t=this[Symbol.metadata];if(t!==null){let r=litPropertyMetadata.get(t);if(r!==void 0)for(let[i,n]of r)this.elementProperties.set(i,n)}this._$Eh=new Map;for(let[r,i]of this.elementProperties){let n=this._$Eu(r,i);n!==void 0&&this._$Eh.set(n,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let r=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let n of i)r.unshift(De(n))}else t!==void 0&&r.push(De(t));return r}static _$Eu(t,r){let i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,r=this.constructor.elementProperties;for(let i of r.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,r,i){this._$AK(t,i)}_$ET(t,r){let i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(n!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:K).toAttribute(r,i.type);this._$Em=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,r){let i=this.constructor,n=i._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let o=i.getPropertyOptions(n),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:K;this._$Em=n;let s=a.fromAttribute(r,o.type);this[n]=s??this._$Ej?.get(n)??s,this._$Em=null}}requestUpdate(t,r,i,n=!1,o){if(t!==void 0){let a=this.constructor;if(n===!1&&(o=this[t]),i??(i=a.getPropertyOptions(t)),!((i.hasChanged??ve)(o,r)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,r,{useDefault:i,reflect:n,wrapped:o},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??r??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(r=void 0),this._$AL.set(t,r)),n===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[n,o]of i){let{wrapped:a}=o,s=this[n];a!==!0||this._$AL.has(n)||s===void 0||this.C(n,void 0,o,s)}}let t=!1,r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(r)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(r)}willUpdate(t){}_$AE(t){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(r=>this._$ET(r,this[r]))),this._$EM()}updated(t){}firstUpdated(t){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[J("elementProperties")]=new Map,P[J("finalized")]=new Map,Er?.({ReactiveElement:P}),(H.reactiveElementVersions??(H.reactiveElementVersions=[])).push("2.1.2");var te=globalThis,_t=e=>e,be=te.trustedTypes,vt=be?be.createPolicy("lit-html",{createHTML:e=>e}):void 0,St="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,Tt="?"+N,wr=`<${Tt}>`,L=document,re=()=>L.createComment(""),ie=e=>e===null||typeof e!="object"&&typeof e!="function",Ue=Array.isArray,Sr=e=>Ue(e)||typeof e?.[Symbol.iterator]=="function",Ie=`[ 	
\f\r]`,ee=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,yt=/>/g,$=RegExp(`>|${Ie}(?:([^\\s"'>=/]+)(${Ie}*=${Ie}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,Et=/"/g,At=/^(?:script|style|textarea|title)$/i,Ge=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),_=Ge(1),ki=Ge(2),Ci=Ge(3),R=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),wt=new WeakMap,O=L.createTreeWalker(L,129);function kt(e,t){if(!Ue(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(t):t}var Tr=(e,t)=>{let r=e.length-1,i=[],n,o=t===2?"<svg>":t===3?"<math>":"",a=ee;for(let s=0;s<r;s++){let u=e[s],c,l,h=-1,d=0;for(;d<u.length&&(a.lastIndex=d,l=a.exec(u),l!==null);)d=a.lastIndex,a===ee?l[1]==="!--"?a=bt:l[1]!==void 0?a=yt:l[2]!==void 0?(At.test(l[2])&&(n=RegExp("</"+l[2],"g")),a=$):l[3]!==void 0&&(a=$):a===$?l[0]===">"?(a=n??ee,h=-1):l[1]===void 0?h=-2:(h=a.lastIndex-l[2].length,c=l[1],a=l[3]===void 0?$:l[3]==='"'?Et:xt):a===Et||a===xt?a=$:a===bt||a===yt?a=ee:(a=$,n=void 0);let v=a===$&&e[s+1].startsWith("/>")?" ":"";o+=a===ee?u+wr:h>=0?(i.push(c),u.slice(0,h)+St+u.slice(h)+N+v):u+N+(h===-2?s:v)}return[kt(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},ne=class e{constructor({strings:t,_$litType$:r},i){let n;this.parts=[];let o=0,a=0,s=t.length-1,u=this.parts,[c,l]=Tr(t,r);if(this.el=e.createElement(c,i),O.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=O.nextNode())!==null&&u.length<s;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(St)){let d=l[a++],v=n.getAttribute(h).split(N),y=/([.?@])?(.*)/.exec(d);u.push({type:1,index:o,name:y[2],strings:v,ctor:y[1]==="."?Oe:y[1]==="?"?Le:y[1]==="@"?Re:V}),n.removeAttribute(h)}else h.startsWith(N)&&(u.push({type:6,index:o}),n.removeAttribute(h));if(At.test(n.tagName)){let h=n.textContent.split(N),d=h.length-1;if(d>0){n.textContent=be?be.emptyScript:"";for(let v=0;v<d;v++)n.append(h[v],re()),O.nextNode(),u.push({type:2,index:++o});n.append(h[d],re())}}}else if(n.nodeType===8)if(n.data===Tt)u.push({type:2,index:o});else{let h=-1;for(;(h=n.data.indexOf(N,h+1))!==-1;)u.push({type:7,index:o}),h+=N.length-1}o++}}static createElement(t,r){let i=L.createElement("template");return i.innerHTML=t,i}};function z(e,t,r=e,i){if(t===R)return t;let n=i!==void 0?r._$Co?.[i]:r._$Cl,o=ie(t)?void 0:t._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(e),n._$AT(e,r,i)),i!==void 0?(r._$Co??(r._$Co=[]))[i]=n:r._$Cl=n),n!==void 0&&(t=z(e,n._$AS(e,t.values),n,i)),t}var $e=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:i}=this._$AD,n=(t?.creationScope??L).importNode(r,!0);O.currentNode=n;let o=O.nextNode(),a=0,s=0,u=i[0];for(;u!==void 0;){if(a===u.index){let c;u.type===2?c=new oe(o,o.nextSibling,this,t):u.type===1?c=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(c=new Me(o,this,t)),this._$AV.push(c),u=i[++s]}a!==u?.index&&(o=O.nextNode(),a++)}return O.currentNode=L,n}p(t){let r=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,r),r+=i.strings.length-2):i._$AI(t[r])),r++}},oe=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,i,n){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=z(this,t,r),ie(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Sr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&ie(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=ne.createElement(kt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(r);else{let o=new $e(n,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=wt.get(t.strings);return r===void 0&&wt.set(t.strings,r=new ne(t)),r}k(t){Ue(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,i,n=0;for(let o of t)n===r.length?r.push(i=new e(this.O(re()),this.O(re()),this,this.options)):i=r[n],i._$AI(o),n++;n<r.length&&(this._$AR(i&&i._$AB.nextSibling,n),r.length=n)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let i=_t(t).nextSibling;_t(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},V=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,i,n,o){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=r,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(t,r=this,i,n){let o=this.strings,a=!1;if(o===void 0)t=z(this,t,r,0),a=!ie(t)||t!==this._$AH&&t!==R,a&&(this._$AH=t);else{let s=t,u,c;for(t=o[0],u=0;u<o.length-1;u++)c=z(this,s[i+u],r,u),c===R&&(c=this._$AH[u]),a||(a=!ie(c)||c!==this._$AH[u]),c===m?t=m:t!==m&&(t+=(c??"")+o[u+1]),this._$AH[u]=c}a&&!n&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Oe=class extends V{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},Le=class extends V{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},Re=class extends V{constructor(t,r,i,n,o){super(t,r,i,n,o),this.type=5}_$AI(t,r=this){if((t=z(this,t,r,0)??m)===R)return;let i=this._$AH,n=t===m&&i!==m||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==m&&(i===m||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Me=class{constructor(t,r,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}};var Ar=te.litHtmlPolyfillSupport;Ar?.(ne,oe),(te.litHtmlVersions??(te.litHtmlVersions=[])).push("3.3.3");var Ct=(e,t,r)=>{let i=r?.renderBefore??t,n=i._$litPart$;if(n===void 0){let o=r?.renderBefore??null;i._$litPart$=n=new oe(t.insertBefore(re(),o),o,void 0,r??{})}return n._$AI(e),n};var ae=globalThis,T=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;let t=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=t.firstChild),t}update(t){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ct(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};T._$litElement$=!0,T.finalized=!0,ae.litElementHydrateSupport?.({LitElement:T});var kr=ae.litElementPolyfillSupport;kr?.({LitElement:T});(ae.litElementVersions??(ae.litElementVersions=[])).push("4.2.2");var Cr={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:ve},Pr=(e=Cr,t,r)=>{let{kind:i,metadata:n}=r,o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),i==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(r.name,e),i==="accessor"){let{name:a}=r;return{set(s){let u=t.get.call(this);t.set.call(this,s),this.requestUpdate(a,u,e,!0,s)},init(s){return s!==void 0&&this.C(a,void 0,e,s),s}}}if(i==="setter"){let{name:a}=r;return function(s){let u=this[a];t.call(this,s),this.requestUpdate(a,u,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};function se(e){return(t,r)=>typeof r=="object"?Pr(e,t,r):((i,n,o)=>{let a=n.hasOwnProperty(o);return n.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(n,o):void 0})(e,t,r)}function A(e){return se({...e,state:!0,attribute:!1})}var M=(e,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,r),r);function Pt(e,t){return(r,i,n)=>{let o=a=>a.renderRoot?.querySelector(e)??null;if(t){let{get:a,set:s}=typeof i=="object"?r:n??(()=>{let u=Symbol();return{get(){return this[u]},set(c){this[u]=c}}})();return M(r,i,{get(){let u=a.call(this);return u===void 0&&(u=o(this),(u!==null||this.hasUpdated)&&s.call(this,u)),u}})}return M(r,i,{get(){return o(this)}})}}var Ht,Nt;var Fe=function(e,t){return Hr(t).format(e)},Hr=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"numeric",day:"numeric"})};(function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"})(Ht||(Ht={})),(function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"})(Nt||(Nt={}));var Bt=function(e,t,r,i){i=i||{},r=r??{};var n=new Event(t,{bubbles:i.bubbles===void 0||i.bubbles,cancelable:!!i.cancelable,composed:i.composed===void 0||i.composed});return n.detail=r,e.dispatchEvent(n),n};var je={};ht(je,{card:()=>Ir,common:()=>Nr,default:()=>Or,intervals:()=>Br,panel:()=>$r,trigger_types:()=>Dr});var Nr={loading:"Loading...",none:"None",no_tasks:"No tasks found.",ungrouped:"Ungrouped",cancel:"Cancel",invalid_date:"Invalid date entered."},Br={day:"Day",days:"Days",week:"Week",weeks:"Weeks",month:"Month",months:"Months",every_uses:"Every {value} uses",every_runtime:"Every {value} runtime"},Dr={time:"Time-based",count:"Count-based",runtime:"Runtime-based"},Ir={add_task:{added:'"{title}" added.'}},$r={cards:{new:{title:"Create New Task",fields:{title:{heading:"Task Title"},interval_value:{heading:"Interval"},interval_type:{heading:"Interval Type"},last_performed:{heading:"Last Performed",helper:"Leave blank to use today"},tag:{heading:"Tag"},icon:{heading:"Icon"},label:{heading:"Label(s)"},area:{heading:"Area"},description:{heading:"Description"},trigger_type:{heading:"Trigger type"},count_entity_id:{heading:"Counted entity"},count_threshold:{heading:"Count threshold"},runtime_entity_id:{heading:"Runtime sensor"},runtime_threshold:{heading:"Runtime threshold"},group_id:{heading:"Group",helper:"Pick a group or type a new name"}},sections:{optional:"Optional settings"},actions:{add_task:"Add Task"},alerts:{required:"Please fill all fields",error:"Error adding task. See console for details."}},current:{title:"Current Tasks",no_items:"No tasks found.",every:"every",last:"Last",next:"Next Due",actions:{complete:"Complete",edit:"Edit",move:"Move to group",remove:"Remove"},confirm_remove:"Are you sure you want to remove this task?",alerts:{complete_success:'"{title}" marked complete. The next due date was recalculated.',complete_error:"Failed to mark task complete. See console for details.",remove_error:"Failed to remove the task. See console for details."}},groups:{title:"Groups",fields:{new_group:{heading:"New group"}},actions:{create:"Create",rename:"Rename",delete:"Delete",save:"Save",cancel:"Cancel"},empty:"No groups yet. Create one to organize your tasks.",confirm_delete:'Delete group "{title}"? Its tasks move to Ungrouped.',alerts:{error:"Failed to create the group. Check the browser console and Home Assistant logs.",exists:'Group "{title}" already exists.',rename_error:"Failed to rename the group. See console for details.",delete_error:"Failed to delete the group. See console for details."},confirm_delete_title:"Delete Group"}},dialog:{edit_task:{title:"Edit Task",fields:{interval_value:{heading:"Interval"},interval_type:{heading:"Interval Type"},last_performed:{heading:"Last Performed",helper:"Leave blank to use today"},tag:{heading:"Tag"},icon:{heading:"Icon"},label:{heading:"Label(s)"},area:{heading:"Area"},trigger_type:{heading:"Trigger type"},count_entity_id:{heading:"Counted entity"},count_threshold:{heading:"Count threshold"},runtime_entity_id:{heading:"Runtime sensor"},runtime_threshold:{heading:"Runtime threshold"},title:{heading:"Title"},description:{heading:"Description"},group_id:{heading:"Group",helper:"Pick a group or type a new name"}},sections:{optional:"Optional settings"},actions:{cancel:"Cancel",save:"Save"},alerts:{error:"Failed to save changes. See console for details."}},move_task:{title:"Move task",fields:{group_id:{heading:"Group"}},actions:{cancel:"Cancel",move:"Move"}},confirm_complete:{title:"Mark Task Complete",message:'Mark "{title}" as complete? Last performed will be reset to today and the next due date will be recalculated based on the {interval} interval.',message_progress:'Mark "{title}" as complete? Progress ({interval}) will start over.',actions:{cancel:"Cancel",confirm:"Mark Complete"}},confirm_remove:{title:"Remove Task",message:'Remove "{title}"? This cannot be undone.',actions:{confirm:"Remove"}}}},Or={common:Nr,intervals:Br,trigger_types:Dr,card:Ir,panel:$r};var ze={};ht(ze,{card:()=>Ur,common:()=>Lr,default:()=>Fr,intervals:()=>Rr,panel:()=>Gr,trigger_types:()=>Mr});var Lr={loading:"Wird geladen...",none:"Keine",no_tasks:"Keine Aufgaben gefunden.",ungrouped:"Ohne Gruppe",cancel:"Abbrechen",invalid_date:"Ung\xFCltiges Datum eingegeben."},Rr={day:"Tag",days:"Tage",week:"Woche",weeks:"Wochen",month:"Monat",months:"Monate",every_uses:"Alle {value} Nutzungen",every_runtime:"Alle {value} Laufzeit"},Mr={time:"Zeitbasiert",count:"Z\xE4hlerbasiert",runtime:"Laufzeitbasiert"},Ur={add_task:{added:'"{title}" wurde hinzugef\xFCgt.'}},Gr={cards:{new:{title:"Neue Aufgabe erstellen",fields:{title:{heading:"Aufgabentitel"},interval_value:{heading:"Intervall"},interval_type:{heading:"Intervalltyp"},last_performed:{heading:"Zuletzt durchgef\xFChrt",helper:"Leer lassen, um heutiges Datum zu verwenden"},tag:{heading:"Tag"},icon:{heading:"Symbol"},label:{heading:"Bezeichnung(en)"},area:{heading:"Bereich"},trigger_type:{heading:"Ausl\xF6ser-Typ"},count_entity_id:{heading:"Gez\xE4hlte Entit\xE4t"},count_threshold:{heading:"Z\xE4hl-Schwellwert"},runtime_entity_id:{heading:"Laufzeit-Sensor"},runtime_threshold:{heading:"Laufzeit-Schwellwert"},description:{heading:"Beschreibung"},group_id:{heading:"Gruppe",helper:"Gruppe w\xE4hlen oder neuen Namen eingeben"}},sections:{optional:"Optionale Einstellungen"},actions:{add_task:"Aufgabe hinzuf\xFCgen"},alerts:{required:"Bitte alle Felder ausf\xFCllen",error:"Fehler beim Hinzuf\xFCgen der Aufgabe. Siehe Konsole f\xFCr Details."}},current:{title:"Aktuelle Aufgaben",no_items:"Keine Aufgaben gefunden.",every:"alle",last:"Zuletzt",next:"N\xE4chste F\xE4lligkeit",actions:{complete:"Abschlie\xDFen",edit:"Bearbeiten",move:"In Gruppe verschieben",remove:"Entfernen"},confirm_remove:"Sind Sie sicher, dass Sie diese Aufgabe entfernen m\xF6chten?",alerts:{complete_success:'"{title}" wurde als erledigt markiert. Das n\xE4chste F\xE4lligkeitsdatum wurde neu berechnet.',complete_error:"Aufgabe konnte nicht als erledigt markiert werden. Details siehe Konsole.",remove_error:"Aufgabe konnte nicht entfernt werden. Details in der Konsole."}},groups:{title:"Gruppen",fields:{new_group:{heading:"Neue Gruppe"}},actions:{create:"Erstellen",rename:"Umbenennen",delete:"L\xF6schen",save:"Speichern",cancel:"Abbrechen"},empty:"Noch keine Gruppen. Erstellen Sie eine, um Aufgaben zu organisieren.",confirm_delete:'Gruppe "{title}" l\xF6schen? Ihre Aufgaben werden in "Ohne Gruppe" verschoben.',alerts:{error:"Gruppe konnte nicht erstellt werden. Pr\xFCfen Sie die Browserkonsole und die Home-Assistant-Protokolle.",exists:'Gruppe "{title}" existiert bereits.',rename_error:"Gruppe konnte nicht umbenannt werden. Details in der Konsole.",delete_error:"Gruppe konnte nicht gel\xF6scht werden. Details in der Konsole."},confirm_delete_title:"Gruppe l\xF6schen"}},dialog:{edit_task:{title:"Aufgabe bearbeiten",fields:{interval_value:{heading:"Intervall"},interval_type:{heading:"Intervalltyp"},last_performed:{heading:"Zuletzt durchgef\xFChrt",helper:"Leer lassen, um heutiges Datum zu verwenden"},tag:{heading:"Tag"},icon:{heading:"Symbol"},label:{heading:"Bezeichnung(en)"},area:{heading:"Bereich"},trigger_type:{heading:"Ausl\xF6ser-Typ"},count_entity_id:{heading:"Gez\xE4hlte Entit\xE4t"},count_threshold:{heading:"Z\xE4hl-Schwellwert"},runtime_entity_id:{heading:"Laufzeit-Sensor"},runtime_threshold:{heading:"Laufzeit-Schwellwert"},title:{heading:"Titel"},description:{heading:"Beschreibung"},group_id:{heading:"Gruppe",helper:"Gruppe w\xE4hlen oder neuen Namen eingeben"}},sections:{optional:"Optionale Einstellungen"},actions:{cancel:"Abbrechen",save:"Speichern"},alerts:{error:"\xC4nderungen konnten nicht gespeichert werden. Details in der Konsole."}},move_task:{title:"Aufgabe verschieben",fields:{group_id:{heading:"Gruppe"}},actions:{cancel:"Abbrechen",move:"Verschieben"}},confirm_complete:{title:"Aufgabe als erledigt markieren",message:'"{title}" als erledigt markieren? Zuletzt durchgef\xFChrt wird auf heute zur\xFCckgesetzt und das n\xE4chste F\xE4lligkeitsdatum wird basierend auf dem Intervall von {interval} neu berechnet.',message_progress:'"{title}" als erledigt markieren? Der Fortschritt ({interval}) beginnt von vorn.',actions:{cancel:"Abbrechen",confirm:"Als erledigt markieren"}},confirm_remove:{title:"Aufgabe entfernen",message:'"{title}" entfernen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.',actions:{confirm:"Entfernen"}}}},Fr={common:Lr,intervals:Rr,trigger_types:Mr,card:Ur,panel:Gr};var Ve=function(e,t){return Ve=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,i){r.__proto__=i}||function(r,i){for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r[n]=i[n])},Ve(e,t)};function le(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");Ve(e,t);function r(){this.constructor=e}e.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)}var f=function(){return f=Object.assign||function(t){for(var r,i=1,n=arguments.length;i<n;i++){r=arguments[i];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},f.apply(this,arguments)};function ye(e,t,r){if(r||arguments.length===2)for(var i=0,n=t.length,o;i<n;i++)(o||!(i in t))&&(o||(o=Array.prototype.slice.call(t,0,i)),o[i]=t[i]);return e.concat(o||Array.prototype.slice.call(t))}var p;(function(e){e[e.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",e[e.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",e[e.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",e[e.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",e[e.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",e[e.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",e[e.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",e[e.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",e[e.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",e[e.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",e[e.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",e[e.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",e[e.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",e[e.INVALID_TAG=23]="INVALID_TAG",e[e.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",e[e.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",e[e.UNCLOSED_TAG=27]="UNCLOSED_TAG"})(p||(p={}));var b;(function(e){e[e.literal=0]="literal",e[e.argument=1]="argument",e[e.number=2]="number",e[e.date=3]="date",e[e.time=4]="time",e[e.select=5]="select",e[e.plural=6]="plural",e[e.pound=7]="pound",e[e.tag=8]="tag"})(b||(b={}));var U;(function(e){e[e.number=0]="number",e[e.dateTime=1]="dateTime"})(U||(U={}));function We(e){return e.type===b.literal}function Dt(e){return e.type===b.argument}function xe(e){return e.type===b.number}function Ee(e){return e.type===b.date}function we(e){return e.type===b.time}function Se(e){return e.type===b.select}function Te(e){return e.type===b.plural}function It(e){return e.type===b.pound}function Ae(e){return e.type===b.tag}function ke(e){return!!(e&&typeof e=="object"&&e.type===U.number)}function ue(e){return!!(e&&typeof e=="object"&&e.type===U.dateTime)}var Xe=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;var jr=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function $t(e){var t={};return e.replace(jr,function(r){var i=r.length;switch(r[0]){case"G":t.era=i===4?"long":i===5?"narrow":"short";break;case"y":t.year=i===2?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":t.month=["numeric","2-digit","short","long","narrow"][i-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":t.day=["numeric","2-digit"][i-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":t.weekday=i===4?"short":i===5?"narrow":"short";break;case"e":if(i<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][i-4];break;case"c":if(i<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");t.weekday=["short","long","narrow","short"][i-4];break;case"a":t.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":t.hourCycle="h12",t.hour=["numeric","2-digit"][i-1];break;case"H":t.hourCycle="h23",t.hour=["numeric","2-digit"][i-1];break;case"K":t.hourCycle="h11",t.hour=["numeric","2-digit"][i-1];break;case"k":t.hourCycle="h24",t.hour=["numeric","2-digit"][i-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":t.minute=["numeric","2-digit"][i-1];break;case"s":t.second=["numeric","2-digit"][i-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":t.timeZoneName=i<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""}),t}var Ot=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;function Ut(e){if(e.length===0)throw new Error("Number skeleton cannot be empty");for(var t=e.split(Ot).filter(function(d){return d.length>0}),r=[],i=0,n=t;i<n.length;i++){var o=n[i],a=o.split("/");if(a.length===0)throw new Error("Invalid number skeleton");for(var s=a[0],u=a.slice(1),c=0,l=u;c<l.length;c++){var h=l[c];if(h.length===0)throw new Error("Invalid number skeleton")}r.push({stem:s,options:u})}return r}function zr(e){return e.replace(/^(.*?)-/,"")}var Lt=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,Gt=/^(@+)?(\+|#+)?[rs]?$/g,Vr=/(\*)(0+)|(#+)(0+)|(0+)/g,Ft=/^(0+)$/;function Rt(e){var t={};return e[e.length-1]==="r"?t.roundingPriority="morePrecision":e[e.length-1]==="s"&&(t.roundingPriority="lessPrecision"),e.replace(Gt,function(r,i,n){return typeof n!="string"?(t.minimumSignificantDigits=i.length,t.maximumSignificantDigits=i.length):n==="+"?t.minimumSignificantDigits=i.length:i[0]==="#"?t.maximumSignificantDigits=i.length:(t.minimumSignificantDigits=i.length,t.maximumSignificantDigits=i.length+(typeof n=="string"?n.length:0)),""}),t}function jt(e){switch(e){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function Wr(e){var t;if(e[0]==="E"&&e[1]==="E"?(t={notation:"engineering"},e=e.slice(2)):e[0]==="E"&&(t={notation:"scientific"},e=e.slice(1)),t){var r=e.slice(0,2);if(r==="+!"?(t.signDisplay="always",e=e.slice(2)):r==="+?"&&(t.signDisplay="exceptZero",e=e.slice(2)),!Ft.test(e))throw new Error("Malformed concise eng/scientific notation");t.minimumIntegerDigits=e.length}return t}function Mt(e){var t={},r=jt(e);return r||t}function zt(e){for(var t={},r=0,i=e;r<i.length;r++){var n=i[r];switch(n.stem){case"percent":case"%":t.style="percent";continue;case"%x100":t.style="percent",t.scale=100;continue;case"currency":t.style="currency",t.currency=n.options[0];continue;case"group-off":case",_":t.useGrouping=!1;continue;case"precision-integer":case".":t.maximumFractionDigits=0;continue;case"measure-unit":case"unit":t.style="unit",t.unit=zr(n.options[0]);continue;case"compact-short":case"K":t.notation="compact",t.compactDisplay="short";continue;case"compact-long":case"KK":t.notation="compact",t.compactDisplay="long";continue;case"scientific":t=f(f(f({},t),{notation:"scientific"}),n.options.reduce(function(u,c){return f(f({},u),Mt(c))},{}));continue;case"engineering":t=f(f(f({},t),{notation:"engineering"}),n.options.reduce(function(u,c){return f(f({},u),Mt(c))},{}));continue;case"notation-simple":t.notation="standard";continue;case"unit-width-narrow":t.currencyDisplay="narrowSymbol",t.unitDisplay="narrow";continue;case"unit-width-short":t.currencyDisplay="code",t.unitDisplay="short";continue;case"unit-width-full-name":t.currencyDisplay="name",t.unitDisplay="long";continue;case"unit-width-iso-code":t.currencyDisplay="symbol";continue;case"scale":t.scale=parseFloat(n.options[0]);continue;case"integer-width":if(n.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");n.options[0].replace(Vr,function(u,c,l,h,d,v){if(c)t.minimumIntegerDigits=l.length;else{if(h&&d)throw new Error("We currently do not support maximum integer digits");if(v)throw new Error("We currently do not support exact integer digits")}return""});continue}if(Ft.test(n.stem)){t.minimumIntegerDigits=n.stem.length;continue}if(Lt.test(n.stem)){if(n.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");n.stem.replace(Lt,function(u,c,l,h,d,v){return l==="*"?t.minimumFractionDigits=c.length:h&&h[0]==="#"?t.maximumFractionDigits=h.length:d&&v?(t.minimumFractionDigits=d.length,t.maximumFractionDigits=d.length+v.length):(t.minimumFractionDigits=c.length,t.maximumFractionDigits=c.length),""});var o=n.options[0];o==="w"?t=f(f({},t),{trailingZeroDisplay:"stripIfInteger"}):o&&(t=f(f({},t),Rt(o)));continue}if(Gt.test(n.stem)){t=f(f({},t),Rt(n.stem));continue}var a=jt(n.stem);a&&(t=f(f({},t),a));var s=Wr(n.stem);s&&(t=f(f({},t),s))}return t}var ce={AX:["H"],BQ:["H"],CP:["H"],CZ:["H"],DK:["H"],FI:["H"],ID:["H"],IS:["H"],ML:["H"],NE:["H"],RU:["H"],SE:["H"],SJ:["H"],SK:["H"],AS:["h","H"],BT:["h","H"],DJ:["h","H"],ER:["h","H"],GH:["h","H"],IN:["h","H"],LS:["h","H"],PG:["h","H"],PW:["h","H"],SO:["h","H"],TO:["h","H"],VU:["h","H"],WS:["h","H"],"001":["H","h"],AL:["h","H","hB"],TD:["h","H","hB"],"ca-ES":["H","h","hB"],CF:["H","h","hB"],CM:["H","h","hB"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],LU:["H","h","hB"],NP:["H","h","hB"],PF:["H","h","hB"],SC:["H","h","hB"],SM:["H","h","hB"],SN:["H","h","hB"],TF:["H","h","hB"],VA:["H","h","hB"],CY:["h","H","hb","hB"],GR:["h","H","hb","hB"],CO:["h","H","hB","hb"],DO:["h","H","hB","hb"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],NA:["h","H","hB","hb"],PA:["h","H","hB","hb"],PR:["h","H","hB","hb"],VE:["h","H","hB","hb"],AC:["H","h","hb","hB"],AI:["H","h","hb","hB"],BW:["H","h","hb","hB"],BZ:["H","h","hb","hB"],CC:["H","h","hb","hB"],CK:["H","h","hb","hB"],CX:["H","h","hb","hB"],DG:["H","h","hb","hB"],FK:["H","h","hb","hB"],GB:["H","h","hb","hB"],GG:["H","h","hb","hB"],GI:["H","h","hb","hB"],IE:["H","h","hb","hB"],IM:["H","h","hb","hB"],IO:["H","h","hb","hB"],JE:["H","h","hb","hB"],LT:["H","h","hb","hB"],MK:["H","h","hb","hB"],MN:["H","h","hb","hB"],MS:["H","h","hb","hB"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],PN:["H","h","hb","hB"],SH:["H","h","hb","hB"],SX:["H","h","hb","hB"],TA:["H","h","hb","hB"],ZA:["H","h","hb","hB"],"af-ZA":["H","h","hB","hb"],AR:["H","h","hB","hb"],CL:["H","h","hB","hb"],CR:["H","h","hB","hb"],CU:["H","h","hB","hb"],EA:["H","h","hB","hb"],"es-BO":["H","h","hB","hb"],"es-BR":["H","h","hB","hb"],"es-EC":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"es-PE":["H","h","hB","hb"],GT:["H","h","hB","hb"],HN:["H","h","hB","hb"],IC:["H","h","hB","hb"],KG:["H","h","hB","hb"],KM:["H","h","hB","hb"],LK:["H","h","hB","hb"],MA:["H","h","hB","hb"],MX:["H","h","hB","hb"],NI:["H","h","hB","hb"],PY:["H","h","hB","hb"],SV:["H","h","hB","hb"],UY:["H","h","hB","hb"],JP:["H","h","K"],AD:["H","hB"],AM:["H","hB"],AO:["H","hB"],AT:["H","hB"],AW:["H","hB"],BE:["H","hB"],BF:["H","hB"],BJ:["H","hB"],BL:["H","hB"],BR:["H","hB"],CG:["H","hB"],CI:["H","hB"],CV:["H","hB"],DE:["H","hB"],EE:["H","hB"],FR:["H","hB"],GA:["H","hB"],GF:["H","hB"],GN:["H","hB"],GP:["H","hB"],GW:["H","hB"],HR:["H","hB"],IL:["H","hB"],IT:["H","hB"],KZ:["H","hB"],MC:["H","hB"],MD:["H","hB"],MF:["H","hB"],MQ:["H","hB"],MZ:["H","hB"],NC:["H","hB"],NL:["H","hB"],PM:["H","hB"],PT:["H","hB"],RE:["H","hB"],RO:["H","hB"],SI:["H","hB"],SR:["H","hB"],ST:["H","hB"],TG:["H","hB"],TR:["H","hB"],WF:["H","hB"],YT:["H","hB"],BD:["h","hB","H"],PK:["h","hB","H"],AZ:["H","hB","h"],BA:["H","hB","h"],BG:["H","hB","h"],CH:["H","hB","h"],GE:["H","hB","h"],LI:["H","hB","h"],ME:["H","hB","h"],RS:["H","hB","h"],UA:["H","hB","h"],UZ:["H","hB","h"],XK:["H","hB","h"],AG:["h","hb","H","hB"],AU:["h","hb","H","hB"],BB:["h","hb","H","hB"],BM:["h","hb","H","hB"],BS:["h","hb","H","hB"],CA:["h","hb","H","hB"],DM:["h","hb","H","hB"],"en-001":["h","hb","H","hB"],FJ:["h","hb","H","hB"],FM:["h","hb","H","hB"],GD:["h","hb","H","hB"],GM:["h","hb","H","hB"],GU:["h","hb","H","hB"],GY:["h","hb","H","hB"],JM:["h","hb","H","hB"],KI:["h","hb","H","hB"],KN:["h","hb","H","hB"],KY:["h","hb","H","hB"],LC:["h","hb","H","hB"],LR:["h","hb","H","hB"],MH:["h","hb","H","hB"],MP:["h","hb","H","hB"],MW:["h","hb","H","hB"],NZ:["h","hb","H","hB"],SB:["h","hb","H","hB"],SG:["h","hb","H","hB"],SL:["h","hb","H","hB"],SS:["h","hb","H","hB"],SZ:["h","hb","H","hB"],TC:["h","hb","H","hB"],TT:["h","hb","H","hB"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],VC:["h","hb","H","hB"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],ZM:["h","hb","H","hB"],BO:["H","hB","h","hb"],EC:["H","hB","h","hb"],ES:["H","hB","h","hb"],GQ:["H","hB","h","hb"],PE:["H","hB","h","hb"],AE:["h","hB","hb","H"],"ar-001":["h","hB","hb","H"],BH:["h","hB","hb","H"],DZ:["h","hB","hb","H"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],HK:["h","hB","hb","H"],IQ:["h","hB","hb","H"],JO:["h","hB","hb","H"],KW:["h","hB","hb","H"],LB:["h","hB","hb","H"],LY:["h","hB","hb","H"],MO:["h","hB","hb","H"],MR:["h","hB","hb","H"],OM:["h","hB","hb","H"],PH:["h","hB","hb","H"],PS:["h","hB","hb","H"],QA:["h","hB","hb","H"],SA:["h","hB","hb","H"],SD:["h","hB","hb","H"],SY:["h","hB","hb","H"],TN:["h","hB","hb","H"],YE:["h","hB","hb","H"],AF:["H","hb","hB","h"],LA:["H","hb","hB","h"],CN:["H","hB","hb","h"],LV:["H","hB","hb","h"],TL:["H","hB","hb","h"],"zu-ZA":["H","hB","hb","h"],CD:["hB","H"],IR:["hB","H"],"hi-IN":["hB","h","H"],"kn-IN":["hB","h","H"],"ml-IN":["hB","h","H"],"te-IN":["hB","h","H"],KH:["hB","h","H","hb"],"ta-IN":["hB","h","hb","H"],BN:["hb","hB","h","H"],MY:["hb","hB","h","H"],ET:["hB","hb","h","H"],"gu-IN":["hB","hb","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],TW:["hB","hb","h","H"],KE:["hB","hb","H","h"],MM:["hB","hb","H","h"],TZ:["hB","hb","H","h"],UG:["hB","hb","H","h"]};function Vt(e,t){for(var r="",i=0;i<e.length;i++){var n=e.charAt(i);if(n==="j"){for(var o=0;i+1<e.length&&e.charAt(i+1)===n;)o++,i++;var a=1+(o&1),s=o<2?1:3+(o>>1),u="a",c=Xr(t);for((c=="H"||c=="k")&&(s=0);s-- >0;)r+=u;for(;a-- >0;)r=c+r}else n==="J"?r+="H":r+=n}return r}function Xr(e){var t=e.hourCycle;if(t===void 0&&e.hourCycles&&e.hourCycles.length&&(t=e.hourCycles[0]),t)switch(t){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}var r=e.language,i;r!=="root"&&(i=e.maximize().region);var n=ce[i||""]||ce[r||""]||ce["".concat(r,"-001")]||ce["001"];return n[0]}var qe,qr=new RegExp("^".concat(Xe.source,"*")),Zr=new RegExp("".concat(Xe.source,"*$"));function g(e,t){return{start:e,end:t}}var Qr=!!String.prototype.startsWith,Yr=!!String.fromCodePoint,Jr=!!Object.fromEntries,Kr=!!String.prototype.codePointAt,ei=!!String.prototype.trimStart,ti=!!String.prototype.trimEnd,ri=!!Number.isSafeInteger,ii=ri?Number.isSafeInteger:function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e&&Math.abs(e)<=9007199254740991},Qe=!0;try{Wt=Qt("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu"),Qe=((qe=Wt.exec("a"))===null||qe===void 0?void 0:qe[0])==="a"}catch{Qe=!1}var Wt,Xt=Qr?function(t,r,i){return t.startsWith(r,i)}:function(t,r,i){return t.slice(i,i+r.length)===r},Ye=Yr?String.fromCodePoint:function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];for(var i="",n=t.length,o=0,a;n>o;){if(a=t[o++],a>1114111)throw RangeError(a+" is not a valid code point");i+=a<65536?String.fromCharCode(a):String.fromCharCode(((a-=65536)>>10)+55296,a%1024+56320)}return i},qt=Jr?Object.fromEntries:function(t){for(var r={},i=0,n=t;i<n.length;i++){var o=n[i],a=o[0],s=o[1];r[a]=s}return r},Zt=Kr?function(t,r){return t.codePointAt(r)}:function(t,r){var i=t.length;if(!(r<0||r>=i)){var n=t.charCodeAt(r),o;return n<55296||n>56319||r+1===i||(o=t.charCodeAt(r+1))<56320||o>57343?n:(n-55296<<10)+(o-56320)+65536}},ni=ei?function(t){return t.trimStart()}:function(t){return t.replace(qr,"")},oi=ti?function(t){return t.trimEnd()}:function(t){return t.replace(Zr,"")};function Qt(e,t){return new RegExp(e,t)}var Je;Qe?(Ze=Qt("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu"),Je=function(t,r){var i;Ze.lastIndex=r;var n=Ze.exec(t);return(i=n[1])!==null&&i!==void 0?i:""}):Je=function(t,r){for(var i=[];;){var n=Zt(t,r);if(n===void 0||Jt(n)||li(n))break;i.push(n),r+=n>=65536?2:1}return Ye.apply(void 0,i)};var Ze,Yt=(function(){function e(t,r){r===void 0&&(r={}),this.message=t,this.position={offset:0,line:1,column:1},this.ignoreTag=!!r.ignoreTag,this.locale=r.locale,this.requiresOtherClause=!!r.requiresOtherClause,this.shouldParseSkeletons=!!r.shouldParseSkeletons}return e.prototype.parse=function(){if(this.offset()!==0)throw Error("parser can only be used once");return this.parseMessage(0,"",!1)},e.prototype.parseMessage=function(t,r,i){for(var n=[];!this.isEOF();){var o=this.char();if(o===123){var a=this.parseArgument(t,i);if(a.err)return a;n.push(a.val)}else{if(o===125&&t>0)break;if(o===35&&(r==="plural"||r==="selectordinal")){var s=this.clonePosition();this.bump(),n.push({type:b.pound,location:g(s,this.clonePosition())})}else if(o===60&&!this.ignoreTag&&this.peek()===47){if(i)break;return this.error(p.UNMATCHED_CLOSING_TAG,g(this.clonePosition(),this.clonePosition()))}else if(o===60&&!this.ignoreTag&&Ke(this.peek()||0)){var a=this.parseTag(t,r);if(a.err)return a;n.push(a.val)}else{var a=this.parseLiteral(t,r);if(a.err)return a;n.push(a.val)}}}return{val:n,err:null}},e.prototype.parseTag=function(t,r){var i=this.clonePosition();this.bump();var n=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:b.literal,value:"<".concat(n,"/>"),location:g(i,this.clonePosition())},err:null};if(this.bumpIf(">")){var o=this.parseMessage(t+1,r,!0);if(o.err)return o;var a=o.val,s=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!Ke(this.char()))return this.error(p.INVALID_TAG,g(s,this.clonePosition()));var u=this.clonePosition(),c=this.parseTagName();return n!==c?this.error(p.UNMATCHED_CLOSING_TAG,g(u,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:b.tag,value:n,children:a,location:g(i,this.clonePosition())},err:null}:this.error(p.INVALID_TAG,g(s,this.clonePosition())))}else return this.error(p.UNCLOSED_TAG,g(i,this.clonePosition()))}else return this.error(p.INVALID_TAG,g(i,this.clonePosition()))},e.prototype.parseTagName=function(){var t=this.offset();for(this.bump();!this.isEOF()&&si(this.char());)this.bump();return this.message.slice(t,this.offset())},e.prototype.parseLiteral=function(t,r){for(var i=this.clonePosition(),n="";;){var o=this.tryParseQuote(r);if(o){n+=o;continue}var a=this.tryParseUnquoted(t,r);if(a){n+=a;continue}var s=this.tryParseLeftAngleBracket();if(s){n+=s;continue}break}var u=g(i,this.clonePosition());return{val:{type:b.literal,value:n,location:u},err:null}},e.prototype.tryParseLeftAngleBracket=function(){return!this.isEOF()&&this.char()===60&&(this.ignoreTag||!ai(this.peek()||0))?(this.bump(),"<"):null},e.prototype.tryParseQuote=function(t){if(this.isEOF()||this.char()!==39)return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if(t==="plural"||t==="selectordinal")break;return null;default:return null}this.bump();var r=[this.char()];for(this.bump();!this.isEOF();){var i=this.char();if(i===39)if(this.peek()===39)r.push(39),this.bump();else{this.bump();break}else r.push(i);this.bump()}return Ye.apply(void 0,r)},e.prototype.tryParseUnquoted=function(t,r){if(this.isEOF())return null;var i=this.char();return i===60||i===123||i===35&&(r==="plural"||r==="selectordinal")||i===125&&t>0?null:(this.bump(),Ye(i))},e.prototype.parseArgument=function(t,r){var i=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(p.EXPECT_ARGUMENT_CLOSING_BRACE,g(i,this.clonePosition()));if(this.char()===125)return this.bump(),this.error(p.EMPTY_ARGUMENT,g(i,this.clonePosition()));var n=this.parseIdentifierIfPossible().value;if(!n)return this.error(p.MALFORMED_ARGUMENT,g(i,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(p.EXPECT_ARGUMENT_CLOSING_BRACE,g(i,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:b.argument,value:n,location:g(i,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(p.EXPECT_ARGUMENT_CLOSING_BRACE,g(i,this.clonePosition())):this.parseArgumentOptions(t,r,n,i);default:return this.error(p.MALFORMED_ARGUMENT,g(i,this.clonePosition()))}},e.prototype.parseIdentifierIfPossible=function(){var t=this.clonePosition(),r=this.offset(),i=Je(this.message,r),n=r+i.length;this.bumpTo(n);var o=this.clonePosition(),a=g(t,o);return{value:i,location:a}},e.prototype.parseArgumentOptions=function(t,r,i,n){var o,a=this.clonePosition(),s=this.parseIdentifierIfPossible().value,u=this.clonePosition();switch(s){case"":return this.error(p.EXPECT_ARGUMENT_TYPE,g(a,u));case"number":case"date":case"time":{this.bumpSpace();var c=null;if(this.bumpIf(",")){this.bumpSpace();var l=this.clonePosition(),h=this.parseSimpleArgStyleIfPossible();if(h.err)return h;var d=oi(h.val);if(d.length===0)return this.error(p.EXPECT_ARGUMENT_STYLE,g(this.clonePosition(),this.clonePosition()));var v=g(l,this.clonePosition());c={style:d,styleLocation:v}}var y=this.tryParseArgumentClose(n);if(y.err)return y;var k=g(n,this.clonePosition());if(c&&Xt(c?.style,"::",0)){var D=ni(c.style.slice(2));if(s==="number"){var h=this.parseNumberSkeletonFromString(D,c.styleLocation);return h.err?h:{val:{type:b.number,value:i,location:k,style:h.val},err:null}}else{if(D.length===0)return this.error(p.EXPECT_DATE_TIME_SKELETON,k);var q=D;this.locale&&(q=Vt(D,this.locale));var d={type:U.dateTime,pattern:q,location:c.styleLocation,parsedOptions:this.shouldParseSkeletons?$t(q):{}},j=s==="date"?b.date:b.time;return{val:{type:j,value:i,location:k,style:d},err:null}}}return{val:{type:s==="number"?b.number:s==="date"?b.date:b.time,value:i,location:k,style:(o=c?.style)!==null&&o!==void 0?o:null},err:null}}case"plural":case"selectordinal":case"select":{var C=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(p.EXPECT_SELECT_ARGUMENT_OPTIONS,g(C,f({},C)));this.bumpSpace();var Z=this.parseIdentifierIfPossible(),I=0;if(s!=="select"&&Z.value==="offset"){if(!this.bumpIf(":"))return this.error(p.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,g(this.clonePosition(),this.clonePosition()));this.bumpSpace();var h=this.tryParseDecimalInteger(p.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,p.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);if(h.err)return h;this.bumpSpace(),Z=this.parseIdentifierIfPossible(),I=h.val}var fe=this.tryParsePluralOrSelectOptions(t,s,r,Z);if(fe.err)return fe;var y=this.tryParseArgumentClose(n);if(y.err)return y;var ut=g(n,this.clonePosition());return s==="select"?{val:{type:b.select,value:i,options:qt(fe.val),location:ut},err:null}:{val:{type:b.plural,value:i,options:qt(fe.val),offset:I,pluralType:s==="plural"?"cardinal":"ordinal",location:ut},err:null}}default:return this.error(p.INVALID_ARGUMENT_TYPE,g(a,u))}},e.prototype.tryParseArgumentClose=function(t){return this.isEOF()||this.char()!==125?this.error(p.EXPECT_ARGUMENT_CLOSING_BRACE,g(t,this.clonePosition())):(this.bump(),{val:!0,err:null})},e.prototype.parseSimpleArgStyleIfPossible=function(){for(var t=0,r=this.clonePosition();!this.isEOF();){var i=this.char();switch(i){case 39:{this.bump();var n=this.clonePosition();if(!this.bumpUntil("'"))return this.error(p.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,g(n,this.clonePosition()));this.bump();break}case 123:{t+=1,this.bump();break}case 125:{if(t>0)t-=1;else return{val:this.message.slice(r.offset,this.offset()),err:null};break}default:this.bump();break}}return{val:this.message.slice(r.offset,this.offset()),err:null}},e.prototype.parseNumberSkeletonFromString=function(t,r){var i=[];try{i=Ut(t)}catch{return this.error(p.INVALID_NUMBER_SKELETON,r)}return{val:{type:U.number,tokens:i,location:r,parsedOptions:this.shouldParseSkeletons?zt(i):{}},err:null}},e.prototype.tryParsePluralOrSelectOptions=function(t,r,i,n){for(var o,a=!1,s=[],u=new Set,c=n.value,l=n.location;;){if(c.length===0){var h=this.clonePosition();if(r!=="select"&&this.bumpIf("=")){var d=this.tryParseDecimalInteger(p.EXPECT_PLURAL_ARGUMENT_SELECTOR,p.INVALID_PLURAL_ARGUMENT_SELECTOR);if(d.err)return d;l=g(h,this.clonePosition()),c=this.message.slice(h.offset,this.offset())}else break}if(u.has(c))return this.error(r==="select"?p.DUPLICATE_SELECT_ARGUMENT_SELECTOR:p.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,l);c==="other"&&(a=!0),this.bumpSpace();var v=this.clonePosition();if(!this.bumpIf("{"))return this.error(r==="select"?p.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:p.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,g(this.clonePosition(),this.clonePosition()));var y=this.parseMessage(t+1,r,i);if(y.err)return y;var k=this.tryParseArgumentClose(v);if(k.err)return k;s.push([c,{value:y.val,location:g(v,this.clonePosition())}]),u.add(c),this.bumpSpace(),o=this.parseIdentifierIfPossible(),c=o.value,l=o.location}return s.length===0?this.error(r==="select"?p.EXPECT_SELECT_ARGUMENT_SELECTOR:p.EXPECT_PLURAL_ARGUMENT_SELECTOR,g(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!a?this.error(p.MISSING_OTHER_CLAUSE,g(this.clonePosition(),this.clonePosition())):{val:s,err:null}},e.prototype.tryParseDecimalInteger=function(t,r){var i=1,n=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(i=-1);for(var o=!1,a=0;!this.isEOF();){var s=this.char();if(s>=48&&s<=57)o=!0,a=a*10+(s-48),this.bump();else break}var u=g(n,this.clonePosition());return o?(a*=i,ii(a)?{val:a,err:null}:this.error(r,u)):this.error(t,u)},e.prototype.offset=function(){return this.position.offset},e.prototype.isEOF=function(){return this.offset()===this.message.length},e.prototype.clonePosition=function(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}},e.prototype.char=function(){var t=this.position.offset;if(t>=this.message.length)throw Error("out of bound");var r=Zt(this.message,t);if(r===void 0)throw Error("Offset ".concat(t," is at invalid UTF-16 code unit boundary"));return r},e.prototype.error=function(t,r){return{val:null,err:{kind:t,message:this.message,location:r}}},e.prototype.bump=function(){if(!this.isEOF()){var t=this.char();t===10?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=t<65536?1:2)}},e.prototype.bumpIf=function(t){if(Xt(this.message,t,this.offset())){for(var r=0;r<t.length;r++)this.bump();return!0}return!1},e.prototype.bumpUntil=function(t){var r=this.offset(),i=this.message.indexOf(t,r);return i>=0?(this.bumpTo(i),!0):(this.bumpTo(this.message.length),!1)},e.prototype.bumpTo=function(t){if(this.offset()>t)throw Error("targetOffset ".concat(t," must be greater than or equal to the current offset ").concat(this.offset()));for(t=Math.min(t,this.message.length);;){var r=this.offset();if(r===t)break;if(r>t)throw Error("targetOffset ".concat(t," is at invalid UTF-16 code unit boundary"));if(this.bump(),this.isEOF())break}},e.prototype.bumpSpace=function(){for(;!this.isEOF()&&Jt(this.char());)this.bump()},e.prototype.peek=function(){if(this.isEOF())return null;var t=this.char(),r=this.offset(),i=this.message.charCodeAt(r+(t>=65536?2:1));return i??null},e})();function Ke(e){return e>=97&&e<=122||e>=65&&e<=90}function ai(e){return Ke(e)||e===47}function si(e){return e===45||e===46||e>=48&&e<=57||e===95||e>=97&&e<=122||e>=65&&e<=90||e==183||e>=192&&e<=214||e>=216&&e<=246||e>=248&&e<=893||e>=895&&e<=8191||e>=8204&&e<=8205||e>=8255&&e<=8256||e>=8304&&e<=8591||e>=11264&&e<=12271||e>=12289&&e<=55295||e>=63744&&e<=64975||e>=65008&&e<=65533||e>=65536&&e<=983039}function Jt(e){return e>=9&&e<=13||e===32||e===133||e>=8206&&e<=8207||e===8232||e===8233}function li(e){return e>=33&&e<=35||e===36||e>=37&&e<=39||e===40||e===41||e===42||e===43||e===44||e===45||e>=46&&e<=47||e>=58&&e<=59||e>=60&&e<=62||e>=63&&e<=64||e===91||e===92||e===93||e===94||e===96||e===123||e===124||e===125||e===126||e===161||e>=162&&e<=165||e===166||e===167||e===169||e===171||e===172||e===174||e===176||e===177||e===182||e===187||e===191||e===215||e===247||e>=8208&&e<=8213||e>=8214&&e<=8215||e===8216||e===8217||e===8218||e>=8219&&e<=8220||e===8221||e===8222||e===8223||e>=8224&&e<=8231||e>=8240&&e<=8248||e===8249||e===8250||e>=8251&&e<=8254||e>=8257&&e<=8259||e===8260||e===8261||e===8262||e>=8263&&e<=8273||e===8274||e===8275||e>=8277&&e<=8286||e>=8592&&e<=8596||e>=8597&&e<=8601||e>=8602&&e<=8603||e>=8604&&e<=8607||e===8608||e>=8609&&e<=8610||e===8611||e>=8612&&e<=8613||e===8614||e>=8615&&e<=8621||e===8622||e>=8623&&e<=8653||e>=8654&&e<=8655||e>=8656&&e<=8657||e===8658||e===8659||e===8660||e>=8661&&e<=8691||e>=8692&&e<=8959||e>=8960&&e<=8967||e===8968||e===8969||e===8970||e===8971||e>=8972&&e<=8991||e>=8992&&e<=8993||e>=8994&&e<=9e3||e===9001||e===9002||e>=9003&&e<=9083||e===9084||e>=9085&&e<=9114||e>=9115&&e<=9139||e>=9140&&e<=9179||e>=9180&&e<=9185||e>=9186&&e<=9254||e>=9255&&e<=9279||e>=9280&&e<=9290||e>=9291&&e<=9311||e>=9472&&e<=9654||e===9655||e>=9656&&e<=9664||e===9665||e>=9666&&e<=9719||e>=9720&&e<=9727||e>=9728&&e<=9838||e===9839||e>=9840&&e<=10087||e===10088||e===10089||e===10090||e===10091||e===10092||e===10093||e===10094||e===10095||e===10096||e===10097||e===10098||e===10099||e===10100||e===10101||e>=10132&&e<=10175||e>=10176&&e<=10180||e===10181||e===10182||e>=10183&&e<=10213||e===10214||e===10215||e===10216||e===10217||e===10218||e===10219||e===10220||e===10221||e===10222||e===10223||e>=10224&&e<=10239||e>=10240&&e<=10495||e>=10496&&e<=10626||e===10627||e===10628||e===10629||e===10630||e===10631||e===10632||e===10633||e===10634||e===10635||e===10636||e===10637||e===10638||e===10639||e===10640||e===10641||e===10642||e===10643||e===10644||e===10645||e===10646||e===10647||e===10648||e>=10649&&e<=10711||e===10712||e===10713||e===10714||e===10715||e>=10716&&e<=10747||e===10748||e===10749||e>=10750&&e<=11007||e>=11008&&e<=11055||e>=11056&&e<=11076||e>=11077&&e<=11078||e>=11079&&e<=11084||e>=11085&&e<=11123||e>=11124&&e<=11125||e>=11126&&e<=11157||e===11158||e>=11159&&e<=11263||e>=11776&&e<=11777||e===11778||e===11779||e===11780||e===11781||e>=11782&&e<=11784||e===11785||e===11786||e===11787||e===11788||e===11789||e>=11790&&e<=11798||e===11799||e>=11800&&e<=11801||e===11802||e===11803||e===11804||e===11805||e>=11806&&e<=11807||e===11808||e===11809||e===11810||e===11811||e===11812||e===11813||e===11814||e===11815||e===11816||e===11817||e>=11818&&e<=11822||e===11823||e>=11824&&e<=11833||e>=11834&&e<=11835||e>=11836&&e<=11839||e===11840||e===11841||e===11842||e>=11843&&e<=11855||e>=11856&&e<=11857||e===11858||e>=11859&&e<=11903||e>=12289&&e<=12291||e===12296||e===12297||e===12298||e===12299||e===12300||e===12301||e===12302||e===12303||e===12304||e===12305||e>=12306&&e<=12307||e===12308||e===12309||e===12310||e===12311||e===12312||e===12313||e===12314||e===12315||e===12316||e===12317||e>=12318&&e<=12319||e===12320||e===12336||e===64830||e===64831||e>=65093&&e<=65094}function et(e){e.forEach(function(t){if(delete t.location,Se(t)||Te(t))for(var r in t.options)delete t.options[r].location,et(t.options[r].value);else xe(t)&&ke(t.style)||(Ee(t)||we(t))&&ue(t.style)?delete t.style.location:Ae(t)&&et(t.children)})}function Kt(e,t){t===void 0&&(t={}),t=f({shouldParseSkeletons:!0,requiresOtherClause:!0},t);var r=new Yt(e,t).parse();if(r.err){var i=SyntaxError(p[r.err.kind]);throw i.location=r.err.location,i.originalMessage=r.err.message,i}return t?.captureLocation||et(r.val),r.val}function he(e,t){var r=t&&t.cache?t.cache:mi,i=t&&t.serializer?t.serializer:pi,n=t&&t.strategy?t.strategy:ci;return n(e,{cache:r,serializer:i})}function ui(e){return e==null||typeof e=="number"||typeof e=="boolean"}function er(e,t,r,i){var n=ui(i)?i:r(i),o=t.get(n);return typeof o>"u"&&(o=e.call(this,i),t.set(n,o)),o}function tr(e,t,r){var i=Array.prototype.slice.call(arguments,3),n=r(i),o=t.get(n);return typeof o>"u"&&(o=e.apply(this,i),t.set(n,o)),o}function tt(e,t,r,i,n){return r.bind(t,e,i,n)}function ci(e,t){var r=e.length===1?er:tr;return tt(e,this,r,t.cache.create(),t.serializer)}function hi(e,t){return tt(e,this,tr,t.cache.create(),t.serializer)}function di(e,t){return tt(e,this,er,t.cache.create(),t.serializer)}var pi=function(){return JSON.stringify(arguments)};function rt(){this.cache=Object.create(null)}rt.prototype.get=function(e){return this.cache[e]};rt.prototype.set=function(e,t){this.cache[e]=t};var mi={create:function(){return new rt}},Ce={variadic:hi,monadic:di};var G;(function(e){e.MISSING_VALUE="MISSING_VALUE",e.INVALID_VALUE="INVALID_VALUE",e.MISSING_INTL_API="MISSING_INTL_API"})(G||(G={}));var de=(function(e){le(t,e);function t(r,i,n){var o=e.call(this,r)||this;return o.code=i,o.originalMessage=n,o}return t.prototype.toString=function(){return"[formatjs Error: ".concat(this.code,"] ").concat(this.message)},t})(Error);var it=(function(e){le(t,e);function t(r,i,n,o){return e.call(this,'Invalid values for "'.concat(r,'": "').concat(i,'". Options are "').concat(Object.keys(n).join('", "'),'"'),G.INVALID_VALUE,o)||this}return t})(de);var rr=(function(e){le(t,e);function t(r,i,n){return e.call(this,'Value for "'.concat(r,'" must be of type ').concat(i),G.INVALID_VALUE,n)||this}return t})(de);var ir=(function(e){le(t,e);function t(r,i){return e.call(this,'The intl string context variable "'.concat(r,'" was not provided to the string "').concat(i,'"'),G.MISSING_VALUE,i)||this}return t})(de);var x;(function(e){e[e.literal=0]="literal",e[e.object=1]="object"})(x||(x={}));function fi(e){return e.length<2?e:e.reduce(function(t,r){var i=t[t.length-1];return!i||i.type!==x.literal||r.type!==x.literal?t.push(r):i.value+=r.value,t},[])}function gi(e){return typeof e=="function"}function pe(e,t,r,i,n,o,a){if(e.length===1&&We(e[0]))return[{type:x.literal,value:e[0].value}];for(var s=[],u=0,c=e;u<c.length;u++){var l=c[u];if(We(l)){s.push({type:x.literal,value:l.value});continue}if(It(l)){typeof o=="number"&&s.push({type:x.literal,value:r.getNumberFormat(t).format(o)});continue}var h=l.value;if(!(n&&h in n))throw new ir(h,a);var d=n[h];if(Dt(l)){(!d||typeof d=="string"||typeof d=="number")&&(d=typeof d=="string"||typeof d=="number"?String(d):""),s.push({type:typeof d=="string"?x.literal:x.object,value:d});continue}if(Ee(l)){var v=typeof l.style=="string"?i.date[l.style]:ue(l.style)?l.style.parsedOptions:void 0;s.push({type:x.literal,value:r.getDateTimeFormat(t,v).format(d)});continue}if(we(l)){var v=typeof l.style=="string"?i.time[l.style]:ue(l.style)?l.style.parsedOptions:i.time.medium;s.push({type:x.literal,value:r.getDateTimeFormat(t,v).format(d)});continue}if(xe(l)){var v=typeof l.style=="string"?i.number[l.style]:ke(l.style)?l.style.parsedOptions:void 0;v&&v.scale&&(d=d*(v.scale||1)),s.push({type:x.literal,value:r.getNumberFormat(t,v).format(d)});continue}if(Ae(l)){var y=l.children,k=l.value,D=n[k];if(!gi(D))throw new rr(k,"function",a);var q=pe(y,t,r,i,n,o),j=D(q.map(function(I){return I.value}));Array.isArray(j)||(j=[j]),s.push.apply(s,j.map(function(I){return{type:typeof I=="string"?x.literal:x.object,value:I}}))}if(Se(l)){var C=l.options[d]||l.options.other;if(!C)throw new it(l.value,d,Object.keys(l.options),a);s.push.apply(s,pe(C.value,t,r,i,n));continue}if(Te(l)){var C=l.options["=".concat(d)];if(!C){if(!Intl.PluralRules)throw new de(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`,G.MISSING_INTL_API,a);var Z=r.getPluralRules(t,{type:l.pluralType}).select(d-(l.offset||0));C=l.options[Z]||l.options.other}if(!C)throw new it(l.value,d,Object.keys(l.options),a);s.push.apply(s,pe(C.value,t,r,i,n,d-(l.offset||0)));continue}}return fi(s)}function _i(e,t){return t?f(f(f({},e||{}),t||{}),Object.keys(e).reduce(function(r,i){return r[i]=f(f({},e[i]),t[i]||{}),r},{})):e}function vi(e,t){return t?Object.keys(e).reduce(function(r,i){return r[i]=_i(e[i],t[i]),r},f({},e)):e}function nt(e){return{create:function(){return{get:function(t){return e[t]},set:function(t,r){e[t]=r}}}}}function bi(e){return e===void 0&&(e={number:{},dateTime:{},pluralRules:{}}),{getNumberFormat:he(function(){for(var t,r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];return new((t=Intl.NumberFormat).bind.apply(t,ye([void 0],r,!1)))},{cache:nt(e.number),strategy:Ce.variadic}),getDateTimeFormat:he(function(){for(var t,r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];return new((t=Intl.DateTimeFormat).bind.apply(t,ye([void 0],r,!1)))},{cache:nt(e.dateTime),strategy:Ce.variadic}),getPluralRules:he(function(){for(var t,r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];return new((t=Intl.PluralRules).bind.apply(t,ye([void 0],r,!1)))},{cache:nt(e.pluralRules),strategy:Ce.variadic})}}var nr=(function(){function e(t,r,i,n){var o=this;if(r===void 0&&(r=e.defaultLocale),this.formatterCache={number:{},dateTime:{},pluralRules:{}},this.format=function(a){var s=o.formatToParts(a);if(s.length===1)return s[0].value;var u=s.reduce(function(c,l){return!c.length||l.type!==x.literal||typeof c[c.length-1]!="string"?c.push(l.value):c[c.length-1]+=l.value,c},[]);return u.length<=1?u[0]||"":u},this.formatToParts=function(a){return pe(o.ast,o.locales,o.formatters,o.formats,a,void 0,o.message)},this.resolvedOptions=function(){return{locale:o.resolvedLocale.toString()}},this.getAst=function(){return o.ast},this.locales=r,this.resolvedLocale=e.resolveLocale(r),typeof t=="string"){if(this.message=t,!e.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");this.ast=e.__parse(t,{ignoreTag:n?.ignoreTag,locale:this.resolvedLocale})}else this.ast=t;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=vi(e.formats,i),this.formatters=n&&n.formatters||bi(this.formatterCache)}return Object.defineProperty(e,"defaultLocale",{get:function(){return e.memoizedDefaultLocale||(e.memoizedDefaultLocale=new Intl.NumberFormat().resolvedOptions().locale),e.memoizedDefaultLocale},enumerable:!1,configurable:!0}),e.memoizedDefaultLocale=null,e.resolveLocale=function(t){var r=Intl.NumberFormat.supportedLocalesOf(t);return r.length>0?new Intl.Locale(r[0]):new Intl.Locale(typeof t=="string"?t:t[0])},e.__parse=Kt,e.formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},e})();var or=nr;var ot={en:je,de:ze};function E(e,t,...r){let i=t.replace(/['"]+/g,"");var n;try{n=e.split(".").reduce((a,s)=>a[s],ot[i])}catch{n=e.split(".").reduce((s,u)=>s[u],ot.en)}if(n===void 0&&(n=e.split(".").reduce((a,s)=>a[s],ot.en)),!r.length)return n;let o={};for(let a=0;a<r.length;a+=2){let s=r[a];s=s.replace(/^{([^}]+)?}$/,"$1"),o[s]=r[a+1]}try{return new or(n,t).format(o)}catch(a){return"Translation "+a}}var ar=async()=>{await customElements.whenDefined("partial-panel-resolver"),await document.createElement("partial-panel-resolver")._getRoutes([{component_name:"config",url_path:"a"}])?.routes?.a?.load?.(),await customElements.whenDefined("ha-panel-config");let r=document.createElement("ha-panel-config");await r?.routerOptions?.routes?.dashboard?.load?.(),await r?.routerOptions?.routes?.general?.load?.(),await r?.routerOptions?.routes?.entities?.load?.(),await r?.routerOptions?.routes?.labels?.load?.(),await customElements.whenDefined("ha-config-dashboard")};var Pe=(e,t)=>{Bt(e,"hass-notification",{message:t})};var Ne=e=>{let[t]=e.split("T"),[r,i,n]=t.split("-").map(Number);return new Date(r,i-1,n)},at=e=>`${e.progress_current??0} / ${e.progress_target??0}`,yi=(e,t,r)=>{let i=e===1?t.slice(0,-1):t;return`${e} ${E(`intervals.${i}`,r)}`},st=(e,t)=>{let r=e.trigger_type??"time";return r==="count"?E("intervals.every_uses",t,"{value}",String(e.count_threshold??0)):r==="runtime"?E("intervals.every_runtime",t,"{value}",String(e.runtime_threshold??0)):yi(e.interval_value,e.interval_type,t)},sr=e=>customElements.get("ha-dialog-footer")?_`<ha-dialog-footer slot="footer">${e}</ha-dialog-footer>`:e,He=class{constructor(t,r){this._fn=t;this._ms=r}schedule(){this.cancel(),this._timer=setTimeout(()=>{this._timer=void 0,this._fn()},this._ms)}cancel(){this._timer!==void 0&&clearTimeout(this._timer),this._timer=void 0}};var lr=e=>e.callWS({type:"home_maintenance/get_tasks"});var ur=(e,t)=>e.callWS({type:"home_maintenance/remove_task",task_id:t}),cr=(e,t)=>e.callWS({type:"home_maintenance/complete_task",task_id:t});var hr=e=>e.callWS({type:"home_maintenance/get_groups"});var dr=(e,t)=>e.connection.subscribeMessage(t,{type:"home_maintenance/subscribe_updates"});var pr=Y`
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

    .form-row {
        display: flex;
        justify-content: center;
        gap: 8px;
        flex-wrap: wrap;
    }

    .form-field,
    ha-textfield,
    ha-select,
    ha-icon-picker {
        text-align: right;
        min-width: 265px;
    }

    .extras-panel{
        margin-bottom: 14px;
    }

    .filler {
        flex-grow: 1;
    }

    .break {
        flex-basis: 100%;
        height: 0;
    }

    @media (max-width: 600px) {
        .form-row {
            flex-direction: column; /* Stack fields vertically */
        }

        .form-field {
            width: 100%; /* Full width */
        }

        ha-textfield,
        ha-select,
        ha-icon-picker {
            width: 100%;
            box-sizing: border-box;
        }
    }

    .task-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .task-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        gap: 1rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--divider-color);
    }

    .task-header {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .task-content {
        flex: 1;
    }

    .due-soon {
        color: var(--error-color, red);
        font-weight: bold;
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
`;var me=class extends T{constructor(){super(...arguments);this._opts=null}open(r){this._opts=r}_close(){this._opts=null}_handleConfirm(){let r=this._opts?.onConfirm;this._close(),r?.()}_renderButtons(){return _`
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
        `}render(){return this._opts?_`
            <ha-dialog
                open
                heading="${this._opts.heading}"
                @closed=${this._close}
            >
                <p>${this._opts.message}</p>

                ${sr(this._renderButtons())}
            </ha-dialog>
        `:_``}};me.styles=pr,w([A()],me.prototype,"_opts",2);customElements.get("hm-confirm-dialog")||customElements.define("hm-confirm-dialog",me);var F={title:"Home Maintenance",due_soon_days:14,max_items:0,show_search:!0},xi=300,S=class extends T{constructor(){super(...arguments);this._config=F;this._tasks=[];this._groups=[];this._completing=new Set;this._expandedTasks=new Set;this._searchQuery="";this._groupFilter="";this._reload=new He(()=>this._loadData(),xi);this._initialized=!1}setConfig(r){this._config={...F,...r}}static getConfigElement(){return document.createElement("home-maintenance-todo-card-editor")}static getStubConfig(){return{title:"Home Maintenance",due_soon_days:14}}getCardSize(){return 3+this._tasks.length}disconnectedCallback(){super.disconnectedCallback(),this._reload.cancel(),this._unsubscribe?.(),this._unsubscribe=void 0,this._initialized=!1}updated(){this.hass&&!this._initialized&&(this._initialized=!0,this._initialize())}async _initialize(){await ar(),await this._loadData();try{this._unsubscribe=await dr(this.hass,()=>this._reload.schedule())}catch(r){console.error("Failed to subscribe to task updates:",r)}}async _loadData(){if(this.hass)try{let[r,i]=await Promise.all([lr(this.hass),hr(this.hass)]);this._tasks=r,this._groups=i}catch{}}_computeTask(r){let i=new Date;i.setHours(0,0,0,0);let n=this._config.due_soon_days??F.due_soon_days,o=(r.trigger_type??"time")==="time",a=null,s=null;o&&r.next_due&&(a=Ne(r.next_due),s=Math.ceil((a.getTime()-i.getTime())/(1e3*60*60*24)));let u;r.due?u="overdue":s!==null&&s<=n?u="due_soon":u="upcoming";let c=!1;return r.last_performed&&(c=Ne(r.last_performed).getTime()===i.getTime()),{raw:r,nextDue:a,daysUntilDue:s,status:u,completedToday:c}}get _filteredTasks(){let r=this._tasks.map(n=>this._computeTask(n));if(this._searchQuery.trim()){let n=this._searchQuery.toLowerCase();r=r.filter(o=>o.raw.title.toLowerCase().includes(n)||o.raw.description&&o.raw.description.toLowerCase().includes(n)||o.raw.group_id&&o.raw.group_id.toLowerCase().includes(n))}let i=this._config.group?.trim()||this._groupFilter;return i&&(r=r.filter(n=>(n.raw.group_id?.trim()||"")===i)),r}_formatDaysLabel(r){let i=r.raw;if((i.trigger_type??"time")!=="time")return at(i);let n=r.daysUntilDue;if(n===null)return"";if(n===0)return"Due today";if(n<0){let o=Math.abs(n);return o===1?"1 day overdue":`${o} days overdue`}return n===1?"Due in 1 day":`${n} days left`}_formatDate(r){return r?Fe(r,this.hass.locale):""}_formatStoredDate(r){return Fe(Ne(r),this.hass.locale)}_completeTask(r){if(this._completing.has(r.id))return;let i=this.hass.language,n=(r.trigger_type??"time")==="time";this._confirmDialog?.open({heading:E("panel.dialog.confirm_complete.title",i),message:E(n?"panel.dialog.confirm_complete.message":"panel.dialog.confirm_complete.message_progress",i,"{title}",r.title,"{interval}",n?st(r,i):at(r)),confirmLabel:E("panel.dialog.confirm_complete.actions.confirm",i),cancelLabel:E("common.cancel",i),onConfirm:()=>this._doCompleteTask(r)})}async _doCompleteTask(r){let i=new Set(this._completing);i.add(r.id),this._completing=i;let n=this.hass.language;try{await cr(this.hass,r.id),Pe(this,E("panel.cards.current.alerts.complete_success",n,"{title}",r.title))}catch(a){console.error("Failed to complete task:",a),Pe(this,E("panel.cards.current.alerts.complete_error",n))}let o=new Set(this._completing);o.delete(r.id),this._completing=o}_removeTask(r){let i=this.hass.language,n=this._tasks.find(o=>o.id===r);this._confirmDialog?.open({heading:E("panel.dialog.confirm_remove.title",i),message:E("panel.dialog.confirm_remove.message",i,"{title}",n?.title??""),confirmLabel:E("panel.dialog.confirm_remove.actions.confirm",i),cancelLabel:E("common.cancel",i),destructive:!0,onConfirm:()=>this._doRemoveTask(r)})}async _doRemoveTask(r){try{await ur(this.hass,r)}catch(i){console.error("Failed to remove task:",i),Pe(this,E("panel.cards.current.alerts.remove_error",this.hass.language))}}_toggleExpand(r){let i=new Set(this._expandedTasks);i.has(r)?i.delete(r):i.add(r),this._expandedTasks=i}_openPanel(){window.location.href="/home-maintenance"}render(){if(!this.hass)return _``;let r=this._filteredTasks,i=this._config.max_items??0,n=this._config.show_search??!0,o=(l,h)=>l.nextDue&&h.nextDue?l.nextDue.getTime()-h.nextDue.getTime():l.nextDue?-1:h.nextDue?1:l.raw.title.localeCompare(h.raw.title),a=[...r.filter(l=>l.status==="overdue").sort(o),...r.filter(l=>l.status==="due_soon").sort(o),...r.filter(l=>l.status==="upcoming").sort(o)];i>0&&(a=a.slice(0,i));let s=a.filter(l=>l.status==="overdue"),u=a.filter(l=>l.status==="due_soon"),c=a.filter(l=>l.status==="upcoming");return _`
            <ha-card>
                ${this._config.title?_`
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
                `:m}

                ${n?_`
                    <div class="filter-bar">
                        <div class="search-box">
                            <ha-icon icon="mdi:magnify" class="search-icon"></ha-icon>
                            <input
                                type="text"
                                .value=${this._searchQuery}
                                @input=${l=>this._searchQuery=l.target.value}
                                placeholder="Search tasks..."
                            />
                            ${this._searchQuery?_`
                                <ha-icon-button @click=${()=>this._searchQuery=""}>
                                    <ha-icon icon="mdi:close"></ha-icon>
                                </ha-icon-button>
                            `:m}
                        </div>
                        ${this._groups.length>0&&!this._config.group?.trim()?_`
                            <select
                                class="group-filter"
                                .value=${this._groupFilter}
                                @change=${l=>this._groupFilter=l.target.value}
                            >
                                <option value="">All groups</option>
                                ${this._groups.map(l=>_`
                                    <option value=${l} ?selected=${this._groupFilter===l}>${l}</option>
                                `)}
                            </select>
                        `:m}
                    </div>
                `:m}

                <div class="task-list">
                    ${s.length>0?_`
                        <div class="group-header group-overdue">
                            <span class="group-dot dot-overdue"></span>
                            OVERDUE
                            <span class="group-count">(${s.length})</span>
                        </div>
                        ${s.map(l=>this._renderTaskCard(l))}
                    `:m}

                    ${u.length>0?_`
                        <div class="group-header group-due-soon">
                            <span class="group-dot dot-due-soon"></span>
                            DUE SOON
                            <span class="group-count">(${u.length})</span>
                        </div>
                        ${u.map(l=>this._renderTaskCard(l))}
                    `:m}

                    ${c.length>0?_`
                        <div class="group-header group-upcoming">
                            <span class="group-dot dot-upcoming"></span>
                            UPCOMING
                            <span class="group-count">(${c.length})</span>
                        </div>
                        ${c.map(l=>this._renderTaskCard(l))}
                    `:m}

                    ${a.length===0?_`
                        <div class="empty">No tasks found</div>
                    `:m}
                </div>
            </ha-card>

            <hm-confirm-dialog></hm-confirm-dialog>
        `}_renderTaskCard(r){let i=r.raw,n=this._expandedTasks.has(i.id),o=this._completing.has(i.id),a=(i.trigger_type??"time")==="time";return _`
            <div class="task-card ${r.status} ${o?"completing":""} ${r.completedToday?"done-today":""}">
                <div class="task-card-main" @click=${()=>this._toggleExpand(i.id)}>
                    <div class="task-left">
                        ${r.completedToday?_`
                            <ha-icon class="task-icon done-check" icon="mdi:check-circle"></ha-icon>
                        `:i.icon?_`<ha-icon class="task-icon" .icon=${i.icon}></ha-icon>`:m}
                        <div class="task-info">
                            <div class="task-title">${i.title}${r.completedToday?_`<span class="done-badge">Done</span>`:m}</div>
                            <div class="task-meta">
                                <span class="task-interval">${st(i,this.hass.language)}</span>
                                ${i.group_id?_`
                                    <span class="task-group">${i.group_id}</span>
                                `:m}
                            </div>
                        </div>
                    </div>
                    <div class="task-right">
                        <div class="task-due-info">
                            ${a?_`
                                <span class="due-date">${this._formatDate(r.nextDue)}</span>
                            `:m}
                            <span class="due-days ${r.status}">${this._formatDaysLabel(r)}</span>
                        </div>
                        <div class="task-actions">
                            <ha-icon-button
                                @click=${s=>{s.stopPropagation(),this._completeTask(i)}}
                                title="Complete"
                                ?disabled=${o}
                            >
                                <ha-icon icon="mdi:check-circle-outline"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${s=>{s.stopPropagation(),this._openPanel()}}
                                title="Edit in panel"
                            >
                                <ha-icon icon="mdi:pencil"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${s=>{s.stopPropagation(),this._removeTask(i.id)}}
                                title="Remove"
                            >
                                <ha-icon icon="mdi:delete"></ha-icon>
                            </ha-icon-button>
                            <ha-icon-button
                                @click=${s=>{s.stopPropagation(),this._toggleExpand(i.id)}}
                            >
                                <ha-icon icon=${n?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
                            </ha-icon-button>
                        </div>
                    </div>
                </div>

                ${n?_`
                    <div class="task-expanded">
                        ${i.description?_`
                            <div class="task-section">
                                <div class="section-label">Description</div>
                                <div class="section-content notes-content">${i.description}</div>
                            </div>
                        `:m}

                        <div class="task-section">
                            <div class="section-label">Last Performed</div>
                            <div class="section-content">
                                ${i.last_performed?this._formatStoredDate(i.last_performed):"-"}
                            </div>
                        </div>

                        ${a?m:_`
                            <div class="task-section">
                                <div class="section-label">Progress</div>
                                <div class="section-content">
                                    ${i.progress_current??0} / ${i.progress_target??0}
                                </div>
                            </div>
                        `}
                    </div>
                `:m}
            </div>
        `}};S.styles=Y`
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
    `,w([se({attribute:!1})],S.prototype,"hass",2),w([A()],S.prototype,"_config",2),w([A()],S.prototype,"_tasks",2),w([A()],S.prototype,"_groups",2),w([A()],S.prototype,"_completing",2),w([A()],S.prototype,"_expandedTasks",2),w([A()],S.prototype,"_searchQuery",2),w([A()],S.prototype,"_groupFilter",2),w([Pt("hm-confirm-dialog")],S.prototype,"_confirmDialog",2);var B=class B extends T{constructor(){super(...arguments);this._config=F;this._computeLabel=r=>B._labels[r.name]??r.name}setConfig(r){this._config={...F,...r}}_valueChanged(r){r.stopPropagation(),this._config={...F,...this._config,...r.detail.value},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}render(){return _`
            <ha-form
                .hass=${this.hass}
                .data=${{...F,...this._config}}
                .schema=${B._schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${r=>this._valueChanged(r)}
            ></ha-form>
        `}};B._schema=[{name:"title",selector:{text:{}}},{name:"due_soon_days",selector:{number:{min:0,mode:"box"}}},{name:"max_items",selector:{number:{min:0,mode:"box"}}},{name:"group",selector:{text:{}}},{name:"show_search",selector:{boolean:{}}}],B._labels={title:"Title",due_soon_days:"Due Soon Days (threshold)",max_items:"Max Items (0 = no limit)",group:"Group (show only this group's tasks)",show_search:"Show Search Bar"},w([se({attribute:!1})],B.prototype,"hass",2),w([A()],B.prototype,"_config",2);var lt=B;customElements.get("home-maintenance-todo-card")||customElements.define("home-maintenance-todo-card",S);customElements.get("home-maintenance-todo-card-editor")||customElements.define("home-maintenance-todo-card-editor",lt);window.customCards=window.customCards||[];window.customCards.push({type:"home-maintenance-todo-card",name:"Home Maintenance Todo",description:"A dashboard card mirroring the Home Maintenance panel: overdue / due soon / upcoming tasks with quick actions and expandable details",preview:!0});
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
