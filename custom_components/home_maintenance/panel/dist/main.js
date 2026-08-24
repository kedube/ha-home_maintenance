var Q2=Object.defineProperty;var g3=Object.getOwnPropertyDescriptor;var I=(C,H)=>{for(var V in H)Q2(C,V,{get:H[V],enumerable:!0})};var p=(C,H,V,L)=>{for(var e=L>1?void 0:L?g3(H,V):H,r=C.length-1,M;r>=0;r--)(M=C[r])&&(e=(L?M(H,V,e):M(e))||e);return L&&e&&Q2(H,V,e),e};var N1=globalThis,I1=N1.ShadowRoot&&(N1.ShadyCSS===void 0||N1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,A2=Symbol(),j2=new WeakMap,u1=class{constructor(H,V,L){if(this._$cssResult$=!0,L!==A2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=H,this.t=V}get styleSheet(){let H=this.o,V=this.t;if(I1&&H===void 0){let L=V!==void 0&&V.length===1;L&&(H=j2.get(V)),H===void 0&&((this.o=H=new CSSStyleSheet).replaceSync(this.cssText),L&&j2.set(V,H))}return H}toString(){return this.cssText}},q2=C=>new u1(typeof C=="string"?C:C+"",void 0,A2),O=(C,...H)=>{let V=C.length===1?C[0]:H.reduce((L,e,r)=>L+(M=>{if(M._$cssResult$===!0)return M.cssText;if(typeof M=="number")return M;throw Error("Value passed to 'css' function must be a 'css' function result: "+M+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+C[r+1],C[0]);return new u1(V,C,A2)},K2=(C,H)=>{if(I1)C.adoptedStyleSheets=H.map(V=>V instanceof CSSStyleSheet?V:V.styleSheet);else for(let V of H){let L=document.createElement("style"),e=N1.litNonce;e!==void 0&&L.setAttribute("nonce",e),L.textContent=V.cssText,C.appendChild(L)}},n2=I1?C=>C:C=>C instanceof CSSStyleSheet?(H=>{let V="";for(let L of H.cssRules)V+=L.cssText;return q2(V)})(C):C;var{is:f3,defineProperty:O3,getOwnPropertyDescriptor:y3,getOwnPropertyNames:b3,getOwnPropertySymbols:_3,getPrototypeOf:k3}=Object,z=globalThis,X2=z.trustedTypes,w3=X2?X2.emptyScript:"",T3=z.reactiveElementPolyfillSupport,c1=(C,H)=>C,Z1={toAttribute(C,H){switch(H){case Boolean:C=C?w3:null;break;case Object:case Array:C=C==null?C:JSON.stringify(C)}return C},fromAttribute(C,H){let V=C;switch(H){case Boolean:V=C!==null;break;case Number:V=C===null?null:Number(C);break;case Object:case Array:try{V=JSON.parse(C)}catch{V=null}}return V}},z1=(C,H)=>!f3(C,H),J2={attribute:!0,type:String,converter:Z1,reflect:!1,useDefault:!1,hasChanged:z1};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),z.litPropertyMetadata??(z.litPropertyMetadata=new WeakMap);var D=class extends HTMLElement{static addInitializer(H){this._$Ei(),(this.l??(this.l=[])).push(H)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(H,V=J2){if(V.state&&(V.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(H)&&((V=Object.create(V)).wrapped=!0),this.elementProperties.set(H,V),!V.noAccessor){let L=Symbol(),e=this.getPropertyDescriptor(H,L,V);e!==void 0&&O3(this.prototype,H,e)}}static getPropertyDescriptor(H,V,L){let{get:e,set:r}=y3(this.prototype,H)??{get(){return this[V]},set(M){this[V]=M}};return{get:e,set(M){let t=e?.call(this);r?.call(this,M),this.requestUpdate(H,t,L)},configurable:!0,enumerable:!0}}static getPropertyOptions(H){return this.elementProperties.get(H)??J2}static _$Ei(){if(this.hasOwnProperty(c1("elementProperties")))return;let H=k3(this);H.finalize(),H.l!==void 0&&(this.l=[...H.l]),this.elementProperties=new Map(H.elementProperties)}static finalize(){if(this.hasOwnProperty(c1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(c1("properties"))){let V=this.properties,L=[...b3(V),..._3(V)];for(let e of L)this.createProperty(e,V[e])}let H=this[Symbol.metadata];if(H!==null){let V=litPropertyMetadata.get(H);if(V!==void 0)for(let[L,e]of V)this.elementProperties.set(L,e)}this._$Eh=new Map;for(let[V,L]of this.elementProperties){let e=this._$Eu(V,L);e!==void 0&&this._$Eh.set(e,V)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(H){let V=[];if(Array.isArray(H)){let L=new Set(H.flat(1/0).reverse());for(let e of L)V.unshift(n2(e))}else H!==void 0&&V.push(n2(H));return V}static _$Eu(H,V){let L=V.attribute;return L===!1?void 0:typeof L=="string"?L:typeof H=="string"?H.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(H=>this.enableUpdating=H),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(H=>H(this))}addController(H){(this._$EO??(this._$EO=new Set)).add(H),this.renderRoot!==void 0&&this.isConnected&&H.hostConnected?.()}removeController(H){this._$EO?.delete(H)}_$E_(){let H=new Map,V=this.constructor.elementProperties;for(let L of V.keys())this.hasOwnProperty(L)&&(H.set(L,this[L]),delete this[L]);H.size>0&&(this._$Ep=H)}createRenderRoot(){let H=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return K2(H,this.constructor.elementStyles),H}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(H=>H.hostConnected?.())}enableUpdating(H){}disconnectedCallback(){this._$EO?.forEach(H=>H.hostDisconnected?.())}attributeChangedCallback(H,V,L){this._$AK(H,L)}_$ET(H,V){let L=this.constructor.elementProperties.get(H),e=this.constructor._$Eu(H,L);if(e!==void 0&&L.reflect===!0){let r=(L.converter?.toAttribute!==void 0?L.converter:Z1).toAttribute(V,L.type);this._$Em=H,r==null?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null}}_$AK(H,V){let L=this.constructor,e=L._$Eh.get(H);if(e!==void 0&&this._$Em!==e){let r=L.getPropertyOptions(e),M=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:Z1;this._$Em=e;let t=M.fromAttribute(V,r.type);this[e]=t??this._$Ej?.get(e)??t,this._$Em=null}}requestUpdate(H,V,L,e=!1,r){if(H!==void 0){let M=this.constructor;if(e===!1&&(r=this[H]),L??(L=M.getPropertyOptions(H)),!((L.hasChanged??z1)(r,V)||L.useDefault&&L.reflect&&r===this._$Ej?.get(H)&&!this.hasAttribute(M._$Eu(H,L))))return;this.C(H,V,L)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(H,V,{useDefault:L,reflect:e,wrapped:r},M){L&&!(this._$Ej??(this._$Ej=new Map)).has(H)&&(this._$Ej.set(H,M??V??this[H]),r!==!0||M!==void 0)||(this._$AL.has(H)||(this.hasUpdated||L||(V=void 0),this._$AL.set(H,V)),e===!0&&this._$Em!==H&&(this._$Eq??(this._$Eq=new Set)).add(H))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(V){Promise.reject(V)}let H=this.scheduleUpdate();return H!=null&&await H,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[e,r]of this._$Ep)this[e]=r;this._$Ep=void 0}let L=this.constructor.elementProperties;if(L.size>0)for(let[e,r]of L){let{wrapped:M}=r,t=this[e];M!==!0||this._$AL.has(e)||t===void 0||this.C(e,void 0,r,t)}}let H=!1,V=this._$AL;try{H=this.shouldUpdate(V),H?(this.willUpdate(V),this._$EO?.forEach(L=>L.hostUpdate?.()),this.update(V)):this._$EM()}catch(L){throw H=!1,this._$EM(),L}H&&this._$AE(V)}willUpdate(H){}_$AE(H){this._$EO?.forEach(V=>V.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(H)),this.updated(H)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(H){return!0}update(H){this._$Eq&&(this._$Eq=this._$Eq.forEach(V=>this._$ET(V,this[V]))),this._$EM()}updated(H){}firstUpdated(H){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[c1("elementProperties")]=new Map,D[c1("finalized")]=new Map,T3?.({ReactiveElement:D}),(z.reactiveElementVersions??(z.reactiveElementVersions=[])).push("2.1.2");var S1=globalThis,Y2=C=>C,G1=S1.trustedTypes,C5=G1?G1.createPolicy("lit-html",{createHTML:C=>C}):void 0,M5="$lit$",G=`lit$${Math.random().toFixed(9).slice(2)}$`,t5="?"+G,B3=`<${t5}>`,e1=document,g1=()=>e1.createComment(""),f1=C=>C===null||typeof C!="object"&&typeof C!="function",x2=Array.isArray,P3=C=>x2(C)||typeof C?.[Symbol.iterator]=="function",d2=`[ 	
\f\r]`,h1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H5=/-->/g,V5=/>/g,V1=RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),L5=/'/g,e5=/"/g,i5=/^(?:script|style|textarea|title)$/i,u2=C=>(H,...V)=>({_$litType$:C,strings:H,values:V}),d=u2(1),W7=u2(2),$7=u2(3),r1=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),r5=new WeakMap,L1=e1.createTreeWalker(e1,129);function a5(C,H){if(!x2(C)||!C.hasOwnProperty("raw"))throw Error("invalid template strings array");return C5!==void 0?C5.createHTML(H):H}var E3=(C,H)=>{let V=C.length-1,L=[],e,r=H===2?"<svg>":H===3?"<math>":"",M=h1;for(let t=0;t<V;t++){let a=C[t],A,n,l=-1,m=0;for(;m<a.length&&(M.lastIndex=m,n=M.exec(a),n!==null);)m=M.lastIndex,M===h1?n[1]==="!--"?M=H5:n[1]!==void 0?M=V5:n[2]!==void 0?(i5.test(n[2])&&(e=RegExp("</"+n[2],"g")),M=V1):n[3]!==void 0&&(M=V1):M===V1?n[0]===">"?(M=e??h1,l=-1):n[1]===void 0?l=-2:(l=M.lastIndex-n[2].length,A=n[1],M=n[3]===void 0?V1:n[3]==='"'?e5:L5):M===e5||M===L5?M=V1:M===H5||M===V5?M=h1:(M=V1,e=void 0);let Z=M===V1&&C[t+1].startsWith("/>")?" ":"";r+=M===h1?a+B3:l>=0?(L.push(A),a.slice(0,l)+M5+a.slice(l)+G+Z):a+G+(l===-2?t:Z)}return[a5(C,r+(C[V]||"<?>")+(H===2?"</svg>":H===3?"</math>":"")),L]},O1=class C{constructor({strings:H,_$litType$:V},L){let e;this.parts=[];let r=0,M=0,t=H.length-1,a=this.parts,[A,n]=E3(H,V);if(this.el=C.createElement(A,L),L1.currentNode=this.el.content,V===2||V===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(e=L1.nextNode())!==null&&a.length<t;){if(e.nodeType===1){if(e.hasAttributes())for(let l of e.getAttributeNames())if(l.endsWith(M5)){let m=n[M++],Z=e.getAttribute(l).split(G),b=/([.?@])?(.*)/.exec(m);a.push({type:1,index:r,name:b[2],strings:Z,ctor:b[1]==="."?l2:b[1]==="?"?m2:b[1]==="@"?s2:n1}),e.removeAttribute(l)}else l.startsWith(G)&&(a.push({type:6,index:r}),e.removeAttribute(l));if(i5.test(e.tagName)){let l=e.textContent.split(G),m=l.length-1;if(m>0){e.textContent=G1?G1.emptyScript:"";for(let Z=0;Z<m;Z++)e.append(l[Z],g1()),L1.nextNode(),a.push({type:2,index:++r});e.append(l[m],g1())}}}else if(e.nodeType===8)if(e.data===t5)a.push({type:2,index:r});else{let l=-1;for(;(l=e.data.indexOf(G,l+1))!==-1;)a.push({type:7,index:r}),l+=G.length-1}r++}}static createElement(H,V){let L=e1.createElement("template");return L.innerHTML=H,L}};function A1(C,H,V=C,L){if(H===r1)return H;let e=L!==void 0?V._$Co?.[L]:V._$Cl,r=f1(H)?void 0:H._$litDirective$;return e?.constructor!==r&&(e?._$AO?.(!1),r===void 0?e=void 0:(e=new r(C),e._$AT(C,V,L)),L!==void 0?(V._$Co??(V._$Co=[]))[L]=e:V._$Cl=e),e!==void 0&&(H=A1(C,e._$AS(C,H.values),e,L)),H}var p2=class{constructor(H,V){this._$AV=[],this._$AN=void 0,this._$AD=H,this._$AM=V}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(H){let{el:{content:V},parts:L}=this._$AD,e=(H?.creationScope??e1).importNode(V,!0);L1.currentNode=e;let r=L1.nextNode(),M=0,t=0,a=L[0];for(;a!==void 0;){if(M===a.index){let A;a.type===2?A=new y1(r,r.nextSibling,this,H):a.type===1?A=new a.ctor(r,a.name,a.strings,this,H):a.type===6&&(A=new v2(r,this,H)),this._$AV.push(A),a=L[++t]}M!==a?.index&&(r=L1.nextNode(),M++)}return L1.currentNode=e1,e}p(H){let V=0;for(let L of this._$AV)L!==void 0&&(L.strings!==void 0?(L._$AI(H,L,V),V+=L.strings.length-2):L._$AI(H[V])),V++}},y1=class C{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(H,V,L,e){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=H,this._$AB=V,this._$AM=L,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let H=this._$AA.parentNode,V=this._$AM;return V!==void 0&&H?.nodeType===11&&(H=V.parentNode),H}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(H,V=this){H=A1(this,H,V),f1(H)?H===v||H==null||H===""?(this._$AH!==v&&this._$AR(),this._$AH=v):H!==this._$AH&&H!==r1&&this._(H):H._$litType$!==void 0?this.$(H):H.nodeType!==void 0?this.T(H):P3(H)?this.k(H):this._(H)}O(H){return this._$AA.parentNode.insertBefore(H,this._$AB)}T(H){this._$AH!==H&&(this._$AR(),this._$AH=this.O(H))}_(H){this._$AH!==v&&f1(this._$AH)?this._$AA.nextSibling.data=H:this.T(e1.createTextNode(H)),this._$AH=H}$(H){let{values:V,_$litType$:L}=H,e=typeof L=="number"?this._$AC(H):(L.el===void 0&&(L.el=O1.createElement(a5(L.h,L.h[0]),this.options)),L);if(this._$AH?._$AD===e)this._$AH.p(V);else{let r=new p2(e,this),M=r.u(this.options);r.p(V),this.T(M),this._$AH=r}}_$AC(H){let V=r5.get(H.strings);return V===void 0&&r5.set(H.strings,V=new O1(H)),V}k(H){x2(this._$AH)||(this._$AH=[],this._$AR());let V=this._$AH,L,e=0;for(let r of H)e===V.length?V.push(L=new C(this.O(g1()),this.O(g1()),this,this.options)):L=V[e],L._$AI(r),e++;e<V.length&&(this._$AR(L&&L._$AB.nextSibling,e),V.length=e)}_$AR(H=this._$AA.nextSibling,V){for(this._$AP?.(!1,!0,V);H!==this._$AB;){let L=Y2(H).nextSibling;Y2(H).remove(),H=L}}setConnected(H){this._$AM===void 0&&(this._$Cv=H,this._$AP?.(H))}},n1=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(H,V,L,e,r){this.type=1,this._$AH=v,this._$AN=void 0,this.element=H,this.name=V,this._$AM=e,this.options=r,L.length>2||L[0]!==""||L[1]!==""?(this._$AH=Array(L.length-1).fill(new String),this.strings=L):this._$AH=v}_$AI(H,V=this,L,e){let r=this.strings,M=!1;if(r===void 0)H=A1(this,H,V,0),M=!f1(H)||H!==this._$AH&&H!==r1,M&&(this._$AH=H);else{let t=H,a,A;for(H=r[0],a=0;a<r.length-1;a++)A=A1(this,t[L+a],V,a),A===r1&&(A=this._$AH[a]),M||(M=!f1(A)||A!==this._$AH[a]),A===v?H=v:H!==v&&(H+=(A??"")+r[a+1]),this._$AH[a]=A}M&&!e&&this.j(H)}j(H){H===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,H??"")}},l2=class extends n1{constructor(){super(...arguments),this.type=3}j(H){this.element[this.name]=H===v?void 0:H}},m2=class extends n1{constructor(){super(...arguments),this.type=4}j(H){this.element.toggleAttribute(this.name,!!H&&H!==v)}},s2=class extends n1{constructor(H,V,L,e,r){super(H,V,L,e,r),this.type=5}_$AI(H,V=this){if((H=A1(this,H,V,0)??v)===r1)return;let L=this._$AH,e=H===v&&L!==v||H.capture!==L.capture||H.once!==L.once||H.passive!==L.passive,r=H!==v&&(L===v||e);e&&this.element.removeEventListener(this.name,this,L),r&&this.element.addEventListener(this.name,this,H),this._$AH=H}handleEvent(H){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,H):this._$AH.handleEvent(H)}},v2=class{constructor(H,V,L){this.element=H,this.type=6,this._$AN=void 0,this._$AM=V,this.options=L}get _$AU(){return this._$AM._$AU}_$AI(H){A1(this,H)}};var R3=S1.litHtmlPolyfillSupport;R3?.(O1,y1),(S1.litHtmlVersions??(S1.litHtmlVersions=[])).push("3.3.3");var o5=(C,H,V)=>{let L=V?.renderBefore??H,e=L._$litPart$;if(e===void 0){let r=V?.renderBefore??null;L._$litPart$=e=new y1(H.insertBefore(g1(),r),r,void 0,V??{})}return e._$AI(C),e};var b1=globalThis,g=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var V;let H=super.createRenderRoot();return(V=this.renderOptions).renderBefore??(V.renderBefore=H.firstChild),H}update(H){let V=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(H),this._$Do=o5(V,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return r1}};g._$litElement$=!0,g.finalized=!0,b1.litElementHydrateSupport?.({LitElement:g});var F3=b1.litElementPolyfillSupport;F3?.({LitElement:g});(b1.litElementVersions??(b1.litElementVersions=[])).push("4.2.2");var D3={attribute:!0,type:String,converter:Z1,reflect:!1,hasChanged:z1},N3=(C=D3,H,V)=>{let{kind:L,metadata:e}=V,r=globalThis.litPropertyMetadata.get(e);if(r===void 0&&globalThis.litPropertyMetadata.set(e,r=new Map),L==="setter"&&((C=Object.create(C)).wrapped=!0),r.set(V.name,C),L==="accessor"){let{name:M}=V;return{set(t){let a=H.get.call(this);H.set.call(this,t),this.requestUpdate(M,a,C,!0,t)},init(t){return t!==void 0&&this.C(M,void 0,C,t),t}}}if(L==="setter"){let{name:M}=V;return function(t){let a=this[M];H.call(this,t),this.requestUpdate(M,a,C,!0,t)}}throw Error("Unsupported decorator location: "+L)};function c(C){return(H,V)=>typeof V=="object"?N3(C,H,V):((L,e,r)=>{let M=e.hasOwnProperty(r);return e.constructor.createProperty(r,L),M?Object.getOwnPropertyDescriptor(e,r):void 0})(C,H,V)}function h(C){return c({...C,state:!0,attribute:!1})}var M1=(C,H,V)=>(V.configurable=!0,V.enumerable=!0,Reflect.decorate&&typeof H!="object"&&Object.defineProperty(C,H,V),V);function T(C,H){return(V,L,e)=>{let r=M=>M.renderRoot?.querySelector(C)??null;if(H){let{get:M,set:t}=typeof L=="object"?V:e??(()=>{let a=Symbol();return{get(){return this[a]},set(A){this[a]=A}}})();return M1(V,L,{get(){let a=M.call(this);return a===void 0&&(a=r(this),(a!==null||this.hasUpdated)&&t.call(this,a)),a}})}return M1(V,L,{get(){return r(this)}})}}var c2={};I(c2,{card:()=>W3,common:()=>I3,default:()=>j3,intervals:()=>z3,notifications:()=>U3,panel:()=>$3,templates:()=>Q3,trigger_types:()=>G3});var I3={loading:"Loading...",none:"None",no_tasks:"No tasks found.",ungrouped:"Ungrouped",cancel:"Cancel",invalid_date:"Invalid date entered."},z3={day:"Day",days:"Days",week:"Week",weeks:"Weeks",month:"Month",months:"Months",year:"Year",years:"Years",every_uses:"Every {value} uses",every_runtime:"Every {value} runtime"},G3={time:"Time-based",date:"Fixed date",count:"Count-based",runtime:"Runtime-based"},U3={when:{due:"Due",overdue:"Overdue",due_and_overdue:"Due and overdue"}},W3={add_task:{added:'"{title}" added.'},todo:{due_today:"Due today",days_overdue:"{count, plural, one {1 day overdue} other {# days overdue}}",days_left:"{count, plural, one {Due in 1 day} other {# days left}}",search:"Search tasks...",all_groups:"All groups",overdue:"Overdue",due_soon:"Due soon",upcoming:"Upcoming",no_tasks:"No tasks found",done:"Done",description:"Description",last_performed:"Last Performed",progress:"Progress",history:"History",open_panel:"Open full panel",complete:"Complete",edit:"Edit in panel",remove:"Remove"}},$3={cards:{new:{title:"Create New Task",fields:{title:{heading:"Task Title"},interval_value:{heading:"Interval"},interval_type:{heading:"Interval Type"},last_performed:{heading:"Last Performed",helper:"Leave blank to use today"},anchor_date:{heading:"Anchor date",helper:"The schedule repeats from this fixed date"},tag:{heading:"Tag"},icon:{heading:"Icon"},label:{heading:"Label(s)"},area:{heading:"Area"},description:{heading:"Description"},trigger_type:{heading:"Trigger type"},count_entity_id:{heading:"Counted entity"},count_threshold:{heading:"Count threshold"},runtime_entity_id:{heading:"Runtime sensor"},runtime_threshold:{heading:"Runtime threshold"},group_id:{heading:"Group",helper:"Pick a group or type a new name"},notifications_enabled:{heading:"Enable notifications"},notification_target:{heading:"Notify service",helper:"Leave empty to use notify.notify"},notify_when:{heading:"Notify when"},notify_days_before_due:{heading:"Days before due",helper:"Optional due-soon reminder offset"},notification_time:{heading:"Time of day",helper:"When automatic notifications are sent"},notification_url:{heading:"Open URL",helper:"Optional URL for the notification's Open action"},active_months:{heading:"Active months",helper:"Seasonal tasks are only due in these months (empty = year-round)"}},sections:{optional:"Optional settings",notifications:"Notifications"},actions:{add_task:"Add Task"},alerts:{required:"Please fill all fields",error:"Error adding task. See console for details."}},current:{title:"Current Tasks",next:"Next Due",actions:{edit:"Edit",move:"Move to group",remove:"Remove"},alerts:{complete_success:'"{title}" marked complete. The next due date was recalculated.',complete_error:"Failed to mark task complete. See console for details.",remove_error:"Failed to remove the task. See console for details."},filter:{search:"Search tasks...",templates:"Browse templates",export:"Export CSV",clear:"Clear filters"}},groups:{title:"Groups",fields:{new_group:{heading:"New group"}},actions:{create:"Create",rename:"Rename",delete:"Delete",save:"Save",cancel:"Cancel"},empty:"No groups yet. Create one to organize your tasks.",confirm_delete:'Delete group "{title}"? Its tasks move to Ungrouped.',alerts:{error:"Failed to create the group. Check the browser console and Home Assistant logs.",exists:'Group "{title}" already exists.',rename_error:"Failed to rename the group. See console for details.",delete_error:"Failed to delete the group. See console for details."},confirm_delete_title:"Delete Group"}},dialog:{edit_task:{title:"Edit Task",fields:{interval_value:{heading:"Interval"},interval_type:{heading:"Interval Type"},last_performed:{heading:"Last Performed",helper:"Leave blank to use today"},anchor_date:{heading:"Anchor date",helper:"The schedule repeats from this fixed date"},tag:{heading:"Tag"},icon:{heading:"Icon"},label:{heading:"Label(s)"},area:{heading:"Area"},trigger_type:{heading:"Trigger type"},count_entity_id:{heading:"Counted entity"},count_threshold:{heading:"Count threshold"},runtime_entity_id:{heading:"Runtime sensor"},runtime_threshold:{heading:"Runtime threshold"},title:{heading:"Title"},description:{heading:"Description"},group_id:{heading:"Group",helper:"Pick a group or type a new name"},notifications_enabled:{heading:"Enable notifications"},notification_target:{heading:"Notify service",helper:"Leave empty to use notify.notify"},notify_when:{heading:"Notify when"},notify_days_before_due:{heading:"Days before due",helper:"Optional due-soon reminder offset"},notification_time:{heading:"Time of day",helper:"When automatic notifications are sent"},notification_url:{heading:"Open URL",helper:"Optional URL for the notification's Open action"},active_months:{heading:"Active months",helper:"Seasonal tasks are only due in these months (empty = year-round)"}},sections:{optional:"Optional settings",notifications:"Notifications",history:"History"},actions:{cancel:"Cancel",save:"Save",test_notification:"Send test notification"},alerts:{error:"Failed to save changes. See console for details.",test_error:"Failed to send the test notification. See console for details."}},move_task:{title:"Move task",fields:{group_id:{heading:"Group"}},actions:{cancel:"Cancel",move:"Move"}},confirm_complete:{title:"Mark Task Complete",message:'Mark "{title}" as complete? Last performed will be reset to today and the next due date will be recalculated based on the {interval} interval.',message_progress:'Mark "{title}" as complete? Progress ({interval}) will start over.',note_label:"Note (optional)",actions:{confirm:"Mark Complete"}},confirm_remove:{title:"Remove Task",message:'Remove "{title}"? This cannot be undone.',actions:{confirm:"Remove"}},templates:{title:"Task Templates",search:"Search templates...",import_csv:"Import from CSV",choose_csv:"Choose CSV file",csv_hint:"Columns: title (required), description, interval_value, interval_type, last_performed (YYYY-MM-DD), icon, group_id",csv_empty:"No importable rows found in the file.",no_matches:"No templates match your search.",import_count:"{count, plural, one {Import 1 task} other {Import # tasks}}",imported:"{count, plural, one {1 task imported.} other {# tasks imported.}}",import_failed:"Failed to import: {titles}",preview:{title:"Title",interval:"Interval",last_performed:"Last performed",group:"Group"}}}},Q3={categories:{hvac:"HVAC",plumbing:"Plumbing",electrical:"Electrical",appliances:"Appliances",interior:"Interior",exterior:"Exterior",yard:"Yard & garden",safety:"Safety",vehicles:"Vehicles"}},j3={common:I3,intervals:z3,trigger_types:G3,notifications:U3,card:W3,panel:$3,templates:Q3};var Z2={};I(Z2,{card:()=>Y3,common:()=>q3,default:()=>V0,intervals:()=>K3,notifications:()=>J3,panel:()=>C0,templates:()=>H0,trigger_types:()=>X3});var q3={loading:"Wird geladen...",none:"Keine",no_tasks:"Keine Aufgaben gefunden.",ungrouped:"Ohne Gruppe",cancel:"Abbrechen",invalid_date:"Ung\xFCltiges Datum eingegeben."},K3={day:"Tag",days:"Tage",week:"Woche",weeks:"Wochen",month:"Monat",months:"Monate",year:"Jahr",years:"Jahre",every_uses:"Alle {value} Nutzungen",every_runtime:"Alle {value} Laufzeit"},X3={time:"Zeitbasiert",date:"Festes Datum",count:"Z\xE4hlerbasiert",runtime:"Laufzeitbasiert"},J3={when:{due:"F\xE4llig",overdue:"\xDCberf\xE4llig",due_and_overdue:"F\xE4llig und \xFCberf\xE4llig"}},Y3={add_task:{added:'"{title}" wurde hinzugef\xFCgt.'},todo:{due_today:"Heute f\xE4llig",days_overdue:"{count, plural, one {1 Tag \xFCberf\xE4llig} other {# Tage \xFCberf\xE4llig}}",days_left:"{count, plural, one {F\xE4llig in 1 Tag} other {Noch # Tage}}",search:"Aufgaben suchen...",all_groups:"Alle Gruppen",overdue:"\xDCberf\xE4llig",due_soon:"Bald f\xE4llig",upcoming:"Anstehend",no_tasks:"Keine Aufgaben gefunden",done:"Erledigt",description:"Beschreibung",last_performed:"Zuletzt durchgef\xFChrt",progress:"Fortschritt",history:"Verlauf",open_panel:"Vollst\xE4ndiges Panel \xF6ffnen",complete:"Abschlie\xDFen",edit:"Im Panel bearbeiten",remove:"Entfernen"}},C0={cards:{new:{title:"Neue Aufgabe erstellen",fields:{title:{heading:"Aufgabentitel"},interval_value:{heading:"Intervall"},interval_type:{heading:"Intervalltyp"},last_performed:{heading:"Zuletzt durchgef\xFChrt",helper:"Leer lassen, um heutiges Datum zu verwenden"},anchor_date:{heading:"Ankerdatum",helper:"Der Zeitplan wiederholt sich ab diesem festen Datum"},tag:{heading:"Tag"},icon:{heading:"Symbol"},label:{heading:"Bezeichnung(en)"},area:{heading:"Bereich"},trigger_type:{heading:"Ausl\xF6ser-Typ"},count_entity_id:{heading:"Gez\xE4hlte Entit\xE4t"},count_threshold:{heading:"Z\xE4hl-Schwellwert"},runtime_entity_id:{heading:"Laufzeit-Sensor"},runtime_threshold:{heading:"Laufzeit-Schwellwert"},description:{heading:"Beschreibung"},group_id:{heading:"Gruppe",helper:"Gruppe w\xE4hlen oder neuen Namen eingeben"},notifications_enabled:{heading:"Benachrichtigungen aktivieren"},notification_target:{heading:"Benachrichtigungsdienst",helper:"Leer lassen, um notify.notify zu verwenden"},notify_when:{heading:"Benachrichtigen bei"},notify_days_before_due:{heading:"Tage vor F\xE4lligkeit",helper:"Optionale Vorab-Erinnerung"},notification_time:{heading:"Uhrzeit",helper:"Wann automatische Benachrichtigungen gesendet werden"},notification_url:{heading:"URL \xF6ffnen",helper:"Optionale URL f\xFCr die Aktion \u201E\xD6ffnen\u201C der Benachrichtigung"},active_months:{heading:"Aktive Monate",helper:"Saisonale Aufgaben sind nur in diesen Monaten f\xE4llig (leer = ganzj\xE4hrig)"}},sections:{optional:"Optionale Einstellungen",notifications:"Benachrichtigungen"},actions:{add_task:"Aufgabe hinzuf\xFCgen"},alerts:{required:"Bitte alle Felder ausf\xFCllen",error:"Fehler beim Hinzuf\xFCgen der Aufgabe. Siehe Konsole f\xFCr Details."}},current:{title:"Aktuelle Aufgaben",next:"N\xE4chste F\xE4lligkeit",actions:{edit:"Bearbeiten",move:"In Gruppe verschieben",remove:"Entfernen"},alerts:{complete_success:'"{title}" wurde als erledigt markiert. Das n\xE4chste F\xE4lligkeitsdatum wurde neu berechnet.',complete_error:"Aufgabe konnte nicht als erledigt markiert werden. Details siehe Konsole.",remove_error:"Aufgabe konnte nicht entfernt werden. Details in der Konsole."},filter:{search:"Aufgaben durchsuchen...",templates:"Vorlagen durchsuchen",export:"CSV exportieren",clear:"Filter zur\xFCcksetzen"}},groups:{title:"Gruppen",fields:{new_group:{heading:"Neue Gruppe"}},actions:{create:"Erstellen",rename:"Umbenennen",delete:"L\xF6schen",save:"Speichern",cancel:"Abbrechen"},empty:"Noch keine Gruppen. Erstellen Sie eine, um Aufgaben zu organisieren.",confirm_delete:'Gruppe "{title}" l\xF6schen? Ihre Aufgaben werden in "Ohne Gruppe" verschoben.',alerts:{error:"Gruppe konnte nicht erstellt werden. Pr\xFCfen Sie die Browserkonsole und die Home-Assistant-Protokolle.",exists:'Gruppe "{title}" existiert bereits.',rename_error:"Gruppe konnte nicht umbenannt werden. Details in der Konsole.",delete_error:"Gruppe konnte nicht gel\xF6scht werden. Details in der Konsole."},confirm_delete_title:"Gruppe l\xF6schen"}},dialog:{edit_task:{title:"Aufgabe bearbeiten",fields:{interval_value:{heading:"Intervall"},interval_type:{heading:"Intervalltyp"},last_performed:{heading:"Zuletzt durchgef\xFChrt",helper:"Leer lassen, um heutiges Datum zu verwenden"},anchor_date:{heading:"Ankerdatum",helper:"Der Zeitplan wiederholt sich ab diesem festen Datum"},tag:{heading:"Tag"},icon:{heading:"Symbol"},label:{heading:"Bezeichnung(en)"},area:{heading:"Bereich"},trigger_type:{heading:"Ausl\xF6ser-Typ"},count_entity_id:{heading:"Gez\xE4hlte Entit\xE4t"},count_threshold:{heading:"Z\xE4hl-Schwellwert"},runtime_entity_id:{heading:"Laufzeit-Sensor"},runtime_threshold:{heading:"Laufzeit-Schwellwert"},title:{heading:"Titel"},description:{heading:"Beschreibung"},group_id:{heading:"Gruppe",helper:"Gruppe w\xE4hlen oder neuen Namen eingeben"},notifications_enabled:{heading:"Benachrichtigungen aktivieren"},notification_target:{heading:"Benachrichtigungsdienst",helper:"Leer lassen, um notify.notify zu verwenden"},notify_when:{heading:"Benachrichtigen bei"},notify_days_before_due:{heading:"Tage vor F\xE4lligkeit",helper:"Optionale Vorab-Erinnerung"},notification_time:{heading:"Uhrzeit",helper:"Wann automatische Benachrichtigungen gesendet werden"},notification_url:{heading:"URL \xF6ffnen",helper:"Optionale URL f\xFCr die Aktion \u201E\xD6ffnen\u201C der Benachrichtigung"},active_months:{heading:"Aktive Monate",helper:"Saisonale Aufgaben sind nur in diesen Monaten f\xE4llig (leer = ganzj\xE4hrig)"}},sections:{optional:"Optionale Einstellungen",notifications:"Benachrichtigungen",history:"Verlauf"},actions:{cancel:"Abbrechen",save:"Speichern",test_notification:"Testbenachrichtigung senden"},alerts:{error:"\xC4nderungen konnten nicht gespeichert werden. Details in der Konsole.",test_error:"Testbenachrichtigung konnte nicht gesendet werden. Details in der Konsole."}},move_task:{title:"Aufgabe verschieben",fields:{group_id:{heading:"Gruppe"}},actions:{cancel:"Abbrechen",move:"Verschieben"}},confirm_complete:{title:"Aufgabe als erledigt markieren",message:'"{title}" als erledigt markieren? Zuletzt durchgef\xFChrt wird auf heute zur\xFCckgesetzt und das n\xE4chste F\xE4lligkeitsdatum wird basierend auf dem Intervall von {interval} neu berechnet.',message_progress:'"{title}" als erledigt markieren? Der Fortschritt ({interval}) beginnt von vorn.',note_label:"Notiz (optional)",actions:{confirm:"Als erledigt markieren"}},confirm_remove:{title:"Aufgabe entfernen",message:'"{title}" entfernen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.',actions:{confirm:"Entfernen"}},templates:{title:"Aufgabenvorlagen",search:"Vorlagen durchsuchen...",import_csv:"Aus CSV importieren",choose_csv:"CSV-Datei ausw\xE4hlen",csv_hint:"Spalten: title (erforderlich), description, interval_value, interval_type, last_performed (JJJJ-MM-TT), icon, group_id",csv_empty:"Keine importierbaren Zeilen in der Datei gefunden.",no_matches:"Keine Vorlagen entsprechen deiner Suche.",import_count:"{count, plural, one {1 Aufgabe importieren} other {# Aufgaben importieren}}",imported:"{count, plural, one {1 Aufgabe importiert.} other {# Aufgaben importiert.}}",import_failed:"Import fehlgeschlagen: {titles}",preview:{title:"Titel",interval:"Intervall",last_performed:"Zuletzt erledigt",group:"Gruppe"}}}},H0={categories:{hvac:"Heizung & Klima",plumbing:"Sanit\xE4r",electrical:"Elektrik",appliances:"Haushaltsger\xE4te",interior:"Innenbereich",exterior:"Au\xDFenbereich",yard:"Garten",safety:"Sicherheit",vehicles:"Fahrzeuge"}},V0={common:q3,intervals:K3,trigger_types:X3,notifications:J3,card:Y3,panel:C0,templates:H0};var h2={};I(h2,{card:()=>t0,common:()=>L0,default:()=>o0,intervals:()=>e0,notifications:()=>M0,panel:()=>i0,templates:()=>a0,trigger_types:()=>r0});var L0={loading:"Cargando...",none:"Ninguno",no_tasks:"No se encontraron tareas.",ungrouped:"Sin grupo",cancel:"Cancelar",invalid_date:"La fecha introducida no es v\xE1lida."},e0={day:"D\xEDa",days:"D\xEDas",week:"Semana",weeks:"Semanas",month:"Mes",months:"Meses",year:"A\xF1o",years:"A\xF1os",every_uses:"Cada {value} usos",every_runtime:"Cada {value} de funcionamiento"},r0={time:"Basado en tiempo",date:"Fecha fija",count:"Basado en conteo",runtime:"Basado en tiempo de funcionamiento"},M0={when:{due:"Al vencer",overdue:"Con retraso",due_and_overdue:"Al vencer y con retraso"}},t0={add_task:{added:'Se a\xF1adi\xF3 "{title}".'},todo:{due_today:"Vence hoy",days_overdue:"{count, plural, one {1 d\xEDa de retraso} other {# d\xEDas de retraso}}",days_left:"{count, plural, one {Vence en 1 d\xEDa} other {Quedan # d\xEDas}}",search:"Buscar tareas...",all_groups:"Todos los grupos",overdue:"Atrasadas",due_soon:"Vencen pronto",upcoming:"Pr\xF3ximas",no_tasks:"No se encontraron tareas",done:"Hecho",description:"Descripci\xF3n",last_performed:"\xDAltima realizaci\xF3n",progress:"Progreso",history:"Historial",open_panel:"Abrir el panel completo",complete:"Completar",edit:"Editar en el panel",remove:"Eliminar"}},i0={cards:{new:{title:"Crear nueva tarea",fields:{title:{heading:"T\xEDtulo de la tarea"},interval_value:{heading:"Intervalo"},interval_type:{heading:"Tipo de intervalo"},last_performed:{heading:"\xDAltima realizaci\xF3n",helper:"Deja en blanco para usar hoy"},anchor_date:{heading:"Fecha de anclaje",helper:"La programaci\xF3n se repite a partir de esta fecha fija"},tag:{heading:"Tag"},icon:{heading:"Icono"},label:{heading:"Etiqueta(s)"},area:{heading:"\xC1rea"},description:{heading:"Descripci\xF3n"},trigger_type:{heading:"Tipo de disparador"},count_entity_id:{heading:"Entidad contada"},count_threshold:{heading:"Umbral de conteo"},runtime_entity_id:{heading:"Sensor de tiempo de funcionamiento"},runtime_threshold:{heading:"Umbral de tiempo de funcionamiento"},group_id:{heading:"Grupo",helper:"Elige un grupo o escribe un nombre nuevo"},notifications_enabled:{heading:"Activar notificaciones"},notification_target:{heading:"Servicio de notificaci\xF3n",helper:"Deja vac\xEDo para usar notify.notify"},notify_when:{heading:"Notificar cuando"},notify_days_before_due:{heading:"D\xEDas antes del vencimiento",helper:"Desfase opcional del recordatorio de vencimiento pr\xF3ximo"},notification_time:{heading:"Hora del d\xEDa",helper:"Cu\xE1ndo se env\xEDan las notificaciones autom\xE1ticas"},notification_url:{heading:"URL para abrir",helper:"URL opcional para la acci\xF3n Abrir de la notificaci\xF3n"},active_months:{heading:"Meses activos",helper:"Las tareas de temporada solo vencen en estos meses (vac\xEDo = todo el a\xF1o)"}},sections:{optional:"Ajustes opcionales",notifications:"Notificaciones"},actions:{add_task:"A\xF1adir tarea"},alerts:{required:"Completa todos los campos",error:"Error al a\xF1adir la tarea. Consulta la consola para m\xE1s detalles."}},current:{title:"Tareas actuales",next:"Pr\xF3ximo vencimiento",actions:{edit:"Editar",move:"Mover a un grupo",remove:"Eliminar"},alerts:{complete_success:'"{title}" marcada como completada. Se recalcul\xF3 la pr\xF3xima fecha de vencimiento.',complete_error:"No se pudo marcar la tarea como completada. Consulta la consola para m\xE1s detalles.",remove_error:"No se pudo eliminar la tarea. Consulta la consola para m\xE1s detalles."},filter:{search:"Buscar tareas...",templates:"Explorar plantillas",export:"Exportar CSV",clear:"Borrar filtros"}},groups:{title:"Grupos",fields:{new_group:{heading:"Nuevo grupo"}},actions:{create:"Crear",rename:"Renombrar",delete:"Eliminar",save:"Guardar",cancel:"Cancelar"},empty:"A\xFAn no hay grupos. Crea uno para organizar tus tareas.",confirm_delete:'\xBFEliminar el grupo "{title}"? Sus tareas se mover\xE1n a Sin grupo.',alerts:{error:"No se pudo crear el grupo. Revisa la consola del navegador y los registros de Home Assistant.",exists:'El grupo "{title}" ya existe.',rename_error:"No se pudo renombrar el grupo. Consulta la consola para m\xE1s detalles.",delete_error:"No se pudo eliminar el grupo. Consulta la consola para m\xE1s detalles."},confirm_delete_title:"Eliminar grupo"}},dialog:{edit_task:{title:"Editar tarea",fields:{interval_value:{heading:"Intervalo"},interval_type:{heading:"Tipo de intervalo"},last_performed:{heading:"\xDAltima realizaci\xF3n",helper:"Deja en blanco para usar hoy"},anchor_date:{heading:"Fecha de anclaje",helper:"La programaci\xF3n se repite a partir de esta fecha fija"},tag:{heading:"Tag"},icon:{heading:"Icono"},label:{heading:"Etiqueta(s)"},area:{heading:"\xC1rea"},trigger_type:{heading:"Tipo de disparador"},count_entity_id:{heading:"Entidad contada"},count_threshold:{heading:"Umbral de conteo"},runtime_entity_id:{heading:"Sensor de tiempo de funcionamiento"},runtime_threshold:{heading:"Umbral de tiempo de funcionamiento"},title:{heading:"T\xEDtulo"},description:{heading:"Descripci\xF3n"},group_id:{heading:"Grupo",helper:"Elige un grupo o escribe un nombre nuevo"},notifications_enabled:{heading:"Activar notificaciones"},notification_target:{heading:"Servicio de notificaci\xF3n",helper:"Deja vac\xEDo para usar notify.notify"},notify_when:{heading:"Notificar cuando"},notify_days_before_due:{heading:"D\xEDas antes del vencimiento",helper:"Desfase opcional del recordatorio de vencimiento pr\xF3ximo"},notification_time:{heading:"Hora del d\xEDa",helper:"Cu\xE1ndo se env\xEDan las notificaciones autom\xE1ticas"},notification_url:{heading:"URL para abrir",helper:"URL opcional para la acci\xF3n Abrir de la notificaci\xF3n"},active_months:{heading:"Meses activos",helper:"Las tareas de temporada solo vencen en estos meses (vac\xEDo = todo el a\xF1o)"}},sections:{optional:"Ajustes opcionales",notifications:"Notificaciones",history:"Historial"},actions:{cancel:"Cancelar",save:"Guardar",test_notification:"Enviar notificaci\xF3n de prueba"},alerts:{error:"No se pudieron guardar los cambios. Consulta la consola para m\xE1s detalles.",test_error:"No se pudo enviar la notificaci\xF3n de prueba. Consulta la consola para m\xE1s detalles."}},move_task:{title:"Mover tarea",fields:{group_id:{heading:"Grupo"}},actions:{cancel:"Cancelar",move:"Mover"}},confirm_complete:{title:"Marcar tarea como completada",message:'\xBFMarcar "{title}" como completada? La \xFAltima realizaci\xF3n se restablecer\xE1 a hoy y la pr\xF3xima fecha de vencimiento se recalcular\xE1 seg\xFAn el intervalo de {interval}.',message_progress:'\xBFMarcar "{title}" como completada? El progreso ({interval}) comenzar\xE1 de nuevo.',note_label:"Nota (opcional)",actions:{confirm:"Marcar como completada"}},confirm_remove:{title:"Eliminar tarea",message:'\xBFEliminar "{title}"? Esta acci\xF3n no se puede deshacer.',actions:{confirm:"Eliminar"}},templates:{title:"Plantillas de tareas",search:"Buscar plantillas...",import_csv:"Importar desde CSV",choose_csv:"Elegir archivo CSV",csv_hint:"Columnas: title (obligatoria), description, interval_value, interval_type, last_performed (AAAA-MM-DD), icon, group_id",csv_empty:"No se encontraron filas importables en el archivo.",no_matches:"Ninguna plantilla coincide con tu b\xFAsqueda.",import_count:"{count, plural, one {Importar 1 tarea} other {Importar # tareas}}",imported:"{count, plural, one {1 tarea importada.} other {# tareas importadas.}}",import_failed:"Error al importar: {titles}",preview:{title:"T\xEDtulo",interval:"Intervalo",last_performed:"\xDAltima realizaci\xF3n",group:"Grupo"}}}},a0={categories:{hvac:"Climatizaci\xF3n",plumbing:"Fontaner\xEDa",electrical:"Electricidad",appliances:"Electrodom\xE9sticos",interior:"Interior",exterior:"Exterior",yard:"Jard\xEDn",safety:"Seguridad",vehicles:"Veh\xEDculos"}},o0={common:L0,intervals:e0,trigger_types:r0,notifications:M0,card:t0,panel:i0,templates:a0};var S2={};I(S2,{card:()=>l0,common:()=>A0,default:()=>v0,intervals:()=>n0,notifications:()=>p0,panel:()=>m0,templates:()=>s0,trigger_types:()=>d0});var A0={loading:"Chargement...",none:"Aucun",no_tasks:"Aucune t\xE2che trouv\xE9e.",ungrouped:"Sans groupe",cancel:"Annuler",invalid_date:"Date saisie non valide."},n0={day:"Jour",days:"Jours",week:"Semaine",weeks:"Semaines",month:"Mois",months:"Mois",year:"Ann\xE9e",years:"Ann\xE9es",every_uses:"Toutes les {value} utilisations",every_runtime:"Tous les {value} de fonctionnement"},d0={time:"Bas\xE9 sur le temps",date:"Date fixe",count:"Bas\xE9 sur un compteur",runtime:"Bas\xE9 sur le fonctionnement"},p0={when:{due:"\xC0 \xE9ch\xE9ance",overdue:"En retard",due_and_overdue:"\xC0 \xE9ch\xE9ance et en retard"}},l0={add_task:{added:'"{title}" ajout\xE9e.'},todo:{due_today:"\xC9ch\xE9ance aujourd'hui",days_overdue:"{count, plural, one {1 jour de retard} other {# jours de retard}}",days_left:"{count, plural, one {\xC9ch\xE9ance dans 1 jour} other {# jours restants}}",search:"Rechercher des t\xE2ches...",all_groups:"Tous les groupes",overdue:"En retard",due_soon:"\xC9ch\xE9ance proche",upcoming:"\xC0 venir",no_tasks:"Aucune t\xE2che trouv\xE9e",done:"Termin\xE9",description:"Description",last_performed:"Derni\xE8re ex\xE9cution",progress:"Progression",history:"Historique",open_panel:"Ouvrir le panneau complet",complete:"Terminer",edit:"Modifier dans le panneau",remove:"Supprimer"}},m0={cards:{new:{title:"Cr\xE9er une nouvelle t\xE2che",fields:{title:{heading:"Titre de la t\xE2che"},interval_value:{heading:"Intervalle"},interval_type:{heading:"Type d'intervalle"},last_performed:{heading:"Derni\xE8re ex\xE9cution",helper:"Laissez vide pour utiliser aujourd'hui"},anchor_date:{heading:"Date d'ancrage",helper:"Le planning se r\xE9p\xE8te \xE0 partir de cette date fixe"},tag:{heading:"Tag"},icon:{heading:"Ic\xF4ne"},label:{heading:"Libell\xE9(s)"},area:{heading:"Pi\xE8ce"},description:{heading:"Description"},trigger_type:{heading:"Type de d\xE9clencheur"},count_entity_id:{heading:"Entit\xE9 compt\xE9e"},count_threshold:{heading:"Seuil de comptage"},runtime_entity_id:{heading:"Capteur de fonctionnement"},runtime_threshold:{heading:"Seuil de fonctionnement"},group_id:{heading:"Groupe",helper:"Choisissez un groupe ou saisissez un nouveau nom"},notifications_enabled:{heading:"Activer les notifications"},notification_target:{heading:"Service de notification",helper:"Laissez vide pour utiliser notify.notify"},notify_when:{heading:"Notifier quand"},notify_days_before_due:{heading:"Jours avant l'\xE9ch\xE9ance",helper:"D\xE9calage facultatif du rappel d'\xE9ch\xE9ance proche"},notification_time:{heading:"Heure de la journ\xE9e",helper:"Heure d'envoi des notifications automatiques"},notification_url:{heading:"URL \xE0 ouvrir",helper:"URL facultative pour l'action Ouvrir de la notification"},active_months:{heading:"Mois actifs",helper:"Les t\xE2ches saisonni\xE8res ne sont dues que pendant ces mois (vide = toute l'ann\xE9e)"}},sections:{optional:"Param\xE8tres facultatifs",notifications:"Notifications"},actions:{add_task:"Ajouter la t\xE2che"},alerts:{required:"Veuillez remplir tous les champs",error:"Erreur lors de l'ajout de la t\xE2che. Consultez la console pour plus de d\xE9tails."}},current:{title:"T\xE2ches actuelles",next:"Prochaine \xE9ch\xE9ance",actions:{edit:"Modifier",move:"D\xE9placer vers un groupe",remove:"Supprimer"},alerts:{complete_success:'"{title}" marqu\xE9e comme termin\xE9e. La prochaine \xE9ch\xE9ance a \xE9t\xE9 recalcul\xE9e.',complete_error:"Impossible de marquer la t\xE2che comme termin\xE9e. Consultez la console pour plus de d\xE9tails.",remove_error:"Impossible de supprimer la t\xE2che. Consultez la console pour plus de d\xE9tails."},filter:{search:"Rechercher des t\xE2ches...",templates:"Parcourir les mod\xE8les",export:"Exporter en CSV",clear:"Effacer les filtres"}},groups:{title:"Groupes",fields:{new_group:{heading:"Nouveau groupe"}},actions:{create:"Cr\xE9er",rename:"Renommer",delete:"Supprimer",save:"Enregistrer",cancel:"Annuler"},empty:"Aucun groupe pour le moment. Cr\xE9ez-en un pour organiser vos t\xE2ches.",confirm_delete:'Supprimer le groupe "{title}" ? Ses t\xE2ches seront d\xE9plac\xE9es vers Sans groupe.',alerts:{error:"Impossible de cr\xE9er le groupe. V\xE9rifiez la console du navigateur et les journaux de Home Assistant.",exists:'Le groupe "{title}" existe d\xE9j\xE0.',rename_error:"Impossible de renommer le groupe. Consultez la console pour plus de d\xE9tails.",delete_error:"Impossible de supprimer le groupe. Consultez la console pour plus de d\xE9tails."},confirm_delete_title:"Supprimer le groupe"}},dialog:{edit_task:{title:"Modifier la t\xE2che",fields:{interval_value:{heading:"Intervalle"},interval_type:{heading:"Type d'intervalle"},last_performed:{heading:"Derni\xE8re ex\xE9cution",helper:"Laissez vide pour utiliser aujourd'hui"},anchor_date:{heading:"Date d'ancrage",helper:"Le planning se r\xE9p\xE8te \xE0 partir de cette date fixe"},tag:{heading:"Tag"},icon:{heading:"Ic\xF4ne"},label:{heading:"Libell\xE9(s)"},area:{heading:"Pi\xE8ce"},trigger_type:{heading:"Type de d\xE9clencheur"},count_entity_id:{heading:"Entit\xE9 compt\xE9e"},count_threshold:{heading:"Seuil de comptage"},runtime_entity_id:{heading:"Capteur de fonctionnement"},runtime_threshold:{heading:"Seuil de fonctionnement"},title:{heading:"Titre"},description:{heading:"Description"},group_id:{heading:"Groupe",helper:"Choisissez un groupe ou saisissez un nouveau nom"},notifications_enabled:{heading:"Activer les notifications"},notification_target:{heading:"Service de notification",helper:"Laissez vide pour utiliser notify.notify"},notify_when:{heading:"Notifier quand"},notify_days_before_due:{heading:"Jours avant l'\xE9ch\xE9ance",helper:"D\xE9calage facultatif du rappel d'\xE9ch\xE9ance proche"},notification_time:{heading:"Heure de la journ\xE9e",helper:"Heure d'envoi des notifications automatiques"},notification_url:{heading:"URL \xE0 ouvrir",helper:"URL facultative pour l'action Ouvrir de la notification"},active_months:{heading:"Mois actifs",helper:"Les t\xE2ches saisonni\xE8res ne sont dues que pendant ces mois (vide = toute l'ann\xE9e)"}},sections:{optional:"Param\xE8tres facultatifs",notifications:"Notifications",history:"Historique"},actions:{cancel:"Annuler",save:"Enregistrer",test_notification:"Envoyer une notification de test"},alerts:{error:"Impossible d'enregistrer les modifications. Consultez la console pour plus de d\xE9tails.",test_error:"Impossible d'envoyer la notification de test. Consultez la console pour plus de d\xE9tails."}},move_task:{title:"D\xE9placer la t\xE2che",fields:{group_id:{heading:"Groupe"}},actions:{cancel:"Annuler",move:"D\xE9placer"}},confirm_complete:{title:"Marquer la t\xE2che comme termin\xE9e",message:`Marquer "{title}" comme termin\xE9e ? La derni\xE8re ex\xE9cution sera r\xE9initialis\xE9e \xE0 aujourd'hui et la prochaine \xE9ch\xE9ance sera recalcul\xE9e en fonction de l'intervalle {interval}.`,message_progress:'Marquer "{title}" comme termin\xE9e ? La progression ({interval}) repartira de z\xE9ro.',note_label:"Note (facultatif)",actions:{confirm:"Marquer comme termin\xE9e"}},confirm_remove:{title:"Supprimer la t\xE2che",message:'Supprimer "{title}" ? Cette action est irr\xE9versible.',actions:{confirm:"Supprimer"}},templates:{title:"Mod\xE8les de t\xE2ches",search:"Rechercher des mod\xE8les...",import_csv:"Importer depuis un CSV",choose_csv:"Choisir un fichier CSV",csv_hint:"Colonnes : title (obligatoire), description, interval_value, interval_type, last_performed (AAAA-MM-JJ), icon, group_id",csv_empty:"Aucune ligne importable trouv\xE9e dans le fichier.",no_matches:"Aucun mod\xE8le ne correspond \xE0 votre recherche.",import_count:"{count, plural, one {Importer 1 t\xE2che} other {Importer # t\xE2ches}}",imported:"{count, plural, one {1 t\xE2che import\xE9e.} other {# t\xE2ches import\xE9es.}}",import_failed:"\xC9chec de l'importation : {titles}",preview:{title:"Titre",interval:"Intervalle",last_performed:"Derni\xE8re ex\xE9cution",group:"Groupe"}}}},s0={categories:{hvac:"CVC",plumbing:"Plomberie",electrical:"\xC9lectricit\xE9",appliances:"\xC9lectrom\xE9nager",interior:"Int\xE9rieur",exterior:"Ext\xE9rieur",yard:"Jardin",safety:"S\xE9curit\xE9",vehicles:"V\xE9hicules"}},v0={common:A0,intervals:n0,trigger_types:d0,notifications:p0,card:l0,panel:m0,templates:s0};var g2={};I(g2,{card:()=>h0,common:()=>x0,default:()=>f0,intervals:()=>u0,notifications:()=>Z0,panel:()=>S0,templates:()=>g0,trigger_types:()=>c0});var x0={loading:"Caricamento...",none:"Nessuno",no_tasks:"Nessuna attivit\xE0 trovata.",ungrouped:"Senza gruppo",cancel:"Annulla",invalid_date:"Data inserita non valida."},u0={day:"Giorno",days:"Giorni",week:"Settimana",weeks:"Settimane",month:"Mese",months:"Mesi",year:"Anno",years:"Anni",every_uses:"Ogni {value} utilizzi",every_runtime:"Ogni {value} di funzionamento"},c0={time:"Basato sul tempo",date:"Data fissa",count:"Basato sul conteggio",runtime:"Basato sul tempo di funzionamento"},Z0={when:{due:"In scadenza",overdue:"Scadute",due_and_overdue:"In scadenza e scadute"}},h0={add_task:{added:'"{title}" aggiunta.'},todo:{due_today:"Scade oggi",days_overdue:"{count, plural, one {1 giorno di ritardo} other {# giorni di ritardo}}",days_left:"{count, plural, one {Scade tra 1 giorno} other {# giorni rimanenti}}",search:"Cerca attivit\xE0...",all_groups:"Tutti i gruppi",overdue:"Scadute",due_soon:"In scadenza",upcoming:"In arrivo",no_tasks:"Nessuna attivit\xE0 trovata",done:"Completate",description:"Descrizione",last_performed:"Ultima esecuzione",progress:"Avanzamento",history:"Cronologia",open_panel:"Apri pannello completo",complete:"Completa",edit:"Modifica nel pannello",remove:"Rimuovi"}},S0={cards:{new:{title:"Crea nuova attivit\xE0",fields:{title:{heading:"Titolo attivit\xE0"},interval_value:{heading:"Intervallo"},interval_type:{heading:"Tipo di intervallo"},last_performed:{heading:"Ultima esecuzione",helper:"Lascia vuoto per usare oggi"},anchor_date:{heading:"Data di riferimento",helper:"La pianificazione si ripete a partire da questa data fissa"},tag:{heading:"Tag"},icon:{heading:"Icona"},label:{heading:"Etichetta/e"},area:{heading:"Area"},description:{heading:"Descrizione"},trigger_type:{heading:"Tipo di attivazione"},count_entity_id:{heading:"Entit\xE0 conteggiata"},count_threshold:{heading:"Soglia di conteggio"},runtime_entity_id:{heading:"Sensore tempo di funzionamento"},runtime_threshold:{heading:"Soglia tempo di funzionamento"},group_id:{heading:"Gruppo",helper:"Scegli un gruppo o digita un nuovo nome"},notifications_enabled:{heading:"Abilita notifiche"},notification_target:{heading:"Servizio di notifica",helper:"Lascia vuoto per usare notify.notify"},notify_when:{heading:"Notifica quando"},notify_days_before_due:{heading:"Giorni prima della scadenza",helper:"Anticipo facoltativo per il promemoria di scadenza imminente"},notification_time:{heading:"Ora del giorno",helper:"Quando vengono inviate le notifiche automatiche"},notification_url:{heading:"URL da aprire",helper:"URL facoltativo per l'azione Apri della notifica"},active_months:{heading:"Mesi attivi",helper:"Le attivit\xE0 stagionali scadono solo in questi mesi (vuoto = tutto l'anno)"}},sections:{optional:"Impostazioni facoltative",notifications:"Notifiche"},actions:{add_task:"Aggiungi attivit\xE0"},alerts:{required:"Compila tutti i campi",error:"Errore durante l'aggiunta dell'attivit\xE0. Vedi la console per i dettagli."}},current:{title:"Attivit\xE0 correnti",next:"Prossima scadenza",actions:{edit:"Modifica",move:"Sposta nel gruppo",remove:"Rimuovi"},alerts:{complete_success:'"{title}" contrassegnata come completata. La prossima scadenza \xE8 stata ricalcolata.',complete_error:"Impossibile contrassegnare l'attivit\xE0 come completata. Vedi la console per i dettagli.",remove_error:"Impossibile rimuovere l'attivit\xE0. Vedi la console per i dettagli."},filter:{search:"Cerca attivit\xE0...",templates:"Sfoglia modelli",export:"Esporta CSV",clear:"Cancella filtri"}},groups:{title:"Gruppi",fields:{new_group:{heading:"Nuovo gruppo"}},actions:{create:"Crea",rename:"Rinomina",delete:"Elimina",save:"Salva",cancel:"Annulla"},empty:"Nessun gruppo ancora. Creane uno per organizzare le tue attivit\xE0.",confirm_delete:'Eliminare il gruppo "{title}"? Le sue attivit\xE0 passeranno a Senza gruppo.',alerts:{error:"Impossibile creare il gruppo. Controlla la console del browser e i log di Home Assistant.",exists:'Il gruppo "{title}" esiste gi\xE0.',rename_error:"Impossibile rinominare il gruppo. Vedi la console per i dettagli.",delete_error:"Impossibile eliminare il gruppo. Vedi la console per i dettagli."},confirm_delete_title:"Elimina gruppo"}},dialog:{edit_task:{title:"Modifica attivit\xE0",fields:{interval_value:{heading:"Intervallo"},interval_type:{heading:"Tipo di intervallo"},last_performed:{heading:"Ultima esecuzione",helper:"Lascia vuoto per usare oggi"},anchor_date:{heading:"Data di riferimento",helper:"La pianificazione si ripete a partire da questa data fissa"},tag:{heading:"Tag"},icon:{heading:"Icona"},label:{heading:"Etichetta/e"},area:{heading:"Area"},trigger_type:{heading:"Tipo di attivazione"},count_entity_id:{heading:"Entit\xE0 conteggiata"},count_threshold:{heading:"Soglia di conteggio"},runtime_entity_id:{heading:"Sensore tempo di funzionamento"},runtime_threshold:{heading:"Soglia tempo di funzionamento"},title:{heading:"Titolo"},description:{heading:"Descrizione"},group_id:{heading:"Gruppo",helper:"Scegli un gruppo o digita un nuovo nome"},notifications_enabled:{heading:"Abilita notifiche"},notification_target:{heading:"Servizio di notifica",helper:"Lascia vuoto per usare notify.notify"},notify_when:{heading:"Notifica quando"},notify_days_before_due:{heading:"Giorni prima della scadenza",helper:"Anticipo facoltativo per il promemoria di scadenza imminente"},notification_time:{heading:"Ora del giorno",helper:"Quando vengono inviate le notifiche automatiche"},notification_url:{heading:"URL da aprire",helper:"URL facoltativo per l'azione Apri della notifica"},active_months:{heading:"Mesi attivi",helper:"Le attivit\xE0 stagionali scadono solo in questi mesi (vuoto = tutto l'anno)"}},sections:{optional:"Impostazioni facoltative",notifications:"Notifiche",history:"Cronologia"},actions:{cancel:"Annulla",save:"Salva",test_notification:"Invia notifica di prova"},alerts:{error:"Impossibile salvare le modifiche. Vedi la console per i dettagli.",test_error:"Impossibile inviare la notifica di prova. Vedi la console per i dettagli."}},move_task:{title:"Sposta attivit\xE0",fields:{group_id:{heading:"Gruppo"}},actions:{cancel:"Annulla",move:"Sposta"}},confirm_complete:{title:"Contrassegna attivit\xE0 come completata",message:`Contrassegnare "{title}" come completata? L'ultima esecuzione sar\xE0 reimpostata a oggi e la prossima scadenza sar\xE0 ricalcolata in base all'intervallo {interval}.`,message_progress:`Contrassegnare "{title}" come completata? L'avanzamento ({interval}) ripartir\xE0 da zero.`,note_label:"Nota (facoltativa)",actions:{confirm:"Contrassegna come completata"}},confirm_remove:{title:"Rimuovi attivit\xE0",message:`Rimuovere "{title}"? L'operazione non pu\xF2 essere annullata.`,actions:{confirm:"Rimuovi"}},templates:{title:"Modelli di attivit\xE0",search:"Cerca modelli...",import_csv:"Importa da CSV",choose_csv:"Scegli file CSV",csv_hint:"Colonne: title (obbligatoria), description, interval_value, interval_type, last_performed (AAAA-MM-GG), icon, group_id",csv_empty:"Nessuna riga importabile trovata nel file.",no_matches:"Nessun modello corrisponde alla ricerca.",import_count:"{count, plural, one {Importa 1 attivit\xE0} other {Importa # attivit\xE0}}",imported:"{count, plural, one {1 attivit\xE0 importata.} other {# attivit\xE0 importate.}}",import_failed:"Importazione non riuscita: {titles}",preview:{title:"Titolo",interval:"Intervallo",last_performed:"Ultima esecuzione",group:"Gruppo"}}}},g0={categories:{hvac:"Climatizzazione",plumbing:"Idraulica",electrical:"Impianto elettrico",appliances:"Elettrodomestici",interior:"Interni",exterior:"Esterni",yard:"Giardino",safety:"Sicurezza",vehicles:"Veicoli"}},f0={common:x0,intervals:u0,trigger_types:c0,notifications:Z0,card:h0,panel:S0,templates:g0};var f2={};I(f2,{card:()=>k0,common:()=>O0,default:()=>B0,intervals:()=>y0,notifications:()=>_0,panel:()=>w0,templates:()=>T0,trigger_types:()=>b0});var O0={loading:"Laden...",none:"Geen",no_tasks:"Geen taken gevonden.",ungrouped:"Niet gegroepeerd",cancel:"Annuleren",invalid_date:"Ongeldige datum ingevoerd."},y0={day:"Dag",days:"Dagen",week:"Week",weeks:"Weken",month:"Maand",months:"Maanden",year:"Jaar",years:"Jaren",every_uses:"Om de {value} gebruiksbeurten",every_runtime:"Om de {value} draaitijd"},b0={time:"Op basis van tijd",date:"Vaste datum",count:"Op basis van aantal",runtime:"Op basis van draaitijd"},_0={when:{due:"Op vervaldatum",overdue:"Achterstallig",due_and_overdue:"Op vervaldatum en achterstallig"}},k0={add_task:{added:'"{title}" toegevoegd.'},todo:{due_today:"Vervalt vandaag",days_overdue:"{count, plural, one {1 dag achterstallig} other {# dagen achterstallig}}",days_left:"{count, plural, one {Vervalt over 1 dag} other {Nog # dagen}}",search:"Taken zoeken...",all_groups:"Alle groepen",overdue:"Achterstallig",due_soon:"Vervalt binnenkort",upcoming:"Aankomend",no_tasks:"Geen taken gevonden",done:"Voltooid",description:"Beschrijving",last_performed:"Laatst uitgevoerd",progress:"Voortgang",history:"Geschiedenis",open_panel:"Volledig paneel openen",complete:"Voltooien",edit:"Bewerken in paneel",remove:"Verwijderen"}},w0={cards:{new:{title:"Nieuwe taak aanmaken",fields:{title:{heading:"Taaktitel"},interval_value:{heading:"Interval"},interval_type:{heading:"Intervaltype"},last_performed:{heading:"Laatst uitgevoerd",helper:"Laat leeg om vandaag te gebruiken"},anchor_date:{heading:"Ankerdatum",helper:"Het schema herhaalt zich vanaf deze vaste datum"},tag:{heading:"Tag"},icon:{heading:"Pictogram"},label:{heading:"Label(s)"},area:{heading:"Ruimte"},description:{heading:"Beschrijving"},trigger_type:{heading:"Triggertype"},count_entity_id:{heading:"Getelde entiteit"},count_threshold:{heading:"Teldrempel"},runtime_entity_id:{heading:"Draaitijdsensor"},runtime_threshold:{heading:"Draaitijddrempel"},group_id:{heading:"Groep",helper:"Kies een groep of typ een nieuwe naam"},notifications_enabled:{heading:"Meldingen inschakelen"},notification_target:{heading:"Meldingsservice",helper:"Laat leeg om notify.notify te gebruiken"},notify_when:{heading:"Melden wanneer"},notify_days_before_due:{heading:"Dagen v\xF3\xF3r vervaldatum",helper:"Optionele vooruitlooptijd voor de herinnering"},notification_time:{heading:"Tijdstip",helper:"Wanneer automatische meldingen worden verzonden"},notification_url:{heading:"URL openen",helper:"Optionele URL voor de Open-actie van de melding"},active_months:{heading:"Actieve maanden",helper:"Seizoenstaken zijn alleen in deze maanden verschuldigd (leeg = het hele jaar)"}},sections:{optional:"Optionele instellingen",notifications:"Meldingen"},actions:{add_task:"Taak toevoegen"},alerts:{required:"Vul alle velden in",error:"Fout bij het toevoegen van de taak. Zie de console voor details."}},current:{title:"Huidige taken",next:"Volgende vervaldatum",actions:{edit:"Bewerken",move:"Verplaatsen naar groep",remove:"Verwijderen"},alerts:{complete_success:'"{title}" gemarkeerd als voltooid. De volgende vervaldatum is opnieuw berekend.',complete_error:"Kan de taak niet als voltooid markeren. Zie de console voor details.",remove_error:"Kan de taak niet verwijderen. Zie de console voor details."},filter:{search:"Taken zoeken...",templates:"Sjablonen bekijken",export:"CSV exporteren",clear:"Filters wissen"}},groups:{title:"Groepen",fields:{new_group:{heading:"Nieuwe groep"}},actions:{create:"Aanmaken",rename:"Hernoemen",delete:"Verwijderen",save:"Opslaan",cancel:"Annuleren"},empty:"Nog geen groepen. Maak er een aan om je taken te organiseren.",confirm_delete:'Groep "{title}" verwijderen? De taken worden verplaatst naar Niet gegroepeerd.',alerts:{error:"Kan de groep niet aanmaken. Controleer de browserconsole en de Home Assistant-logboeken.",exists:'Groep "{title}" bestaat al.',rename_error:"Kan de groep niet hernoemen. Zie de console voor details.",delete_error:"Kan de groep niet verwijderen. Zie de console voor details."},confirm_delete_title:"Groep verwijderen"}},dialog:{edit_task:{title:"Taak bewerken",fields:{interval_value:{heading:"Interval"},interval_type:{heading:"Intervaltype"},last_performed:{heading:"Laatst uitgevoerd",helper:"Laat leeg om vandaag te gebruiken"},anchor_date:{heading:"Ankerdatum",helper:"Het schema herhaalt zich vanaf deze vaste datum"},tag:{heading:"Tag"},icon:{heading:"Pictogram"},label:{heading:"Label(s)"},area:{heading:"Ruimte"},trigger_type:{heading:"Triggertype"},count_entity_id:{heading:"Getelde entiteit"},count_threshold:{heading:"Teldrempel"},runtime_entity_id:{heading:"Draaitijdsensor"},runtime_threshold:{heading:"Draaitijddrempel"},title:{heading:"Titel"},description:{heading:"Beschrijving"},group_id:{heading:"Groep",helper:"Kies een groep of typ een nieuwe naam"},notifications_enabled:{heading:"Meldingen inschakelen"},notification_target:{heading:"Meldingsservice",helper:"Laat leeg om notify.notify te gebruiken"},notify_when:{heading:"Melden wanneer"},notify_days_before_due:{heading:"Dagen v\xF3\xF3r vervaldatum",helper:"Optionele vooruitlooptijd voor de herinnering"},notification_time:{heading:"Tijdstip",helper:"Wanneer automatische meldingen worden verzonden"},notification_url:{heading:"URL openen",helper:"Optionele URL voor de Open-actie van de melding"},active_months:{heading:"Actieve maanden",helper:"Seizoenstaken zijn alleen in deze maanden verschuldigd (leeg = het hele jaar)"}},sections:{optional:"Optionele instellingen",notifications:"Meldingen",history:"Geschiedenis"},actions:{cancel:"Annuleren",save:"Opslaan",test_notification:"Testmelding verzenden"},alerts:{error:"Kan de wijzigingen niet opslaan. Zie de console voor details.",test_error:"Kan de testmelding niet verzenden. Zie de console voor details."}},move_task:{title:"Taak verplaatsen",fields:{group_id:{heading:"Groep"}},actions:{cancel:"Annuleren",move:"Verplaatsen"}},confirm_complete:{title:"Taak als voltooid markeren",message:'"{title}" als voltooid markeren? Laatst uitgevoerd wordt teruggezet naar vandaag en de volgende vervaldatum wordt opnieuw berekend op basis van het interval {interval}.',message_progress:'"{title}" als voltooid markeren? De voortgang ({interval}) begint opnieuw.',note_label:"Notitie (optioneel)",actions:{confirm:"Als voltooid markeren"}},confirm_remove:{title:"Taak verwijderen",message:'"{title}" verwijderen? Dit kan niet ongedaan worden gemaakt.',actions:{confirm:"Verwijderen"}},templates:{title:"Taaksjablonen",search:"Sjablonen zoeken...",import_csv:"Importeren uit CSV",choose_csv:"CSV-bestand kiezen",csv_hint:"Kolommen: title (verplicht), description, interval_value, interval_type, last_performed (JJJJ-MM-DD), icon, group_id",csv_empty:"Geen importeerbare rijen gevonden in het bestand.",no_matches:"Geen sjablonen gevonden voor je zoekopdracht.",import_count:"{count, plural, one {1 taak importeren} other {# taken importeren}}",imported:"{count, plural, one {1 taak ge\xEFmporteerd.} other {# taken ge\xEFmporteerd.}}",import_failed:"Importeren mislukt: {titles}",preview:{title:"Titel",interval:"Interval",last_performed:"Laatst uitgevoerd",group:"Groep"}}}},T0={categories:{hvac:"Verwarming & airco",plumbing:"Sanitair",electrical:"Elektra",appliances:"Apparaten",interior:"Binnen",exterior:"Buiten",yard:"Tuin",safety:"Veiligheid",vehicles:"Voertuigen"}},B0={common:O0,intervals:y0,trigger_types:b0,notifications:_0,card:k0,panel:w0,templates:T0};var O2={};I(O2,{card:()=>D0,common:()=>P0,default:()=>z0,intervals:()=>E0,notifications:()=>F0,panel:()=>N0,templates:()=>I0,trigger_types:()=>R0});var P0={loading:"\u0141adowanie...",none:"Brak",no_tasks:"Nie znaleziono zada\u0144.",ungrouped:"Bez grupy",cancel:"Anuluj",invalid_date:"Wprowadzono nieprawid\u0142ow\u0105 dat\u0119."},E0={day:"Dzie\u0144",days:"Dni",week:"Tydzie\u0144",weeks:"Tygodnie",month:"Miesi\u0105c",months:"Miesi\u0105ce",year:"Rok",years:"Lata",every_uses:"Co {value} u\u017Cy\u0107",every_runtime:"Co {value} czasu pracy"},R0={time:"Na podstawie czasu",date:"Sta\u0142a data",count:"Na podstawie liczby u\u017Cy\u0107",runtime:"Na podstawie czasu pracy"},F0={when:{due:"Termin",overdue:"Po terminie",due_and_overdue:"Termin i po terminie"}},D0={add_task:{added:'Dodano "{title}".'},todo:{due_today:"Termin dzisiaj",days_overdue:"{count, plural, one {1 dzie\u0144 po terminie} few {# dni po terminie} many {# dni po terminie} other {# dnia po terminie}}",days_left:"{count, plural, one {Termin za 1 dzie\u0144} few {Zosta\u0142y # dni} many {Zosta\u0142o # dni} other {Zosta\u0142o # dnia}}",search:"Szukaj zada\u0144...",all_groups:"Wszystkie grupy",overdue:"Po terminie",due_soon:"Wkr\xF3tce termin",upcoming:"Nadchodz\u0105ce",no_tasks:"Nie znaleziono zada\u0144",done:"Wykonane",description:"Opis",last_performed:"Ostatnio wykonane",progress:"Post\u0119p",history:"Historia",open_panel:"Otw\xF3rz pe\u0142ny panel",complete:"Wykonane",edit:"Edytuj w panelu",remove:"Usu\u0144"}},N0={cards:{new:{title:"Utw\xF3rz nowe zadanie",fields:{title:{heading:"Tytu\u0142 zadania"},interval_value:{heading:"Interwa\u0142"},interval_type:{heading:"Typ interwa\u0142u"},last_performed:{heading:"Ostatnio wykonane",helper:"Pozostaw puste, aby u\u017Cy\u0107 dzisiejszej daty"},anchor_date:{heading:"Data odniesienia",helper:"Harmonogram powtarza si\u0119 od tej sta\u0142ej daty"},tag:{heading:"Tag"},icon:{heading:"Ikona"},label:{heading:"Etykieta(-y)"},area:{heading:"Obszar"},description:{heading:"Opis"},trigger_type:{heading:"Typ wyzwalacza"},count_entity_id:{heading:"Zliczana encja"},count_threshold:{heading:"Pr\xF3g liczby u\u017Cy\u0107"},runtime_entity_id:{heading:"Czujnik czasu pracy"},runtime_threshold:{heading:"Pr\xF3g czasu pracy"},group_id:{heading:"Grupa",helper:"Wybierz grup\u0119 lub wpisz now\u0105 nazw\u0119"},notifications_enabled:{heading:"W\u0142\u0105cz powiadomienia"},notification_target:{heading:"Us\u0142uga powiadomie\u0144",helper:"Pozostaw puste, aby u\u017Cy\u0107 notify.notify"},notify_when:{heading:"Powiadamiaj, gdy"},notify_days_before_due:{heading:"Dni przed terminem",helper:"Opcjonalne wyprzedzenie przypomnienia o zbli\u017Caj\u0105cym si\u0119 terminie"},notification_time:{heading:"Pora dnia",helper:"Kiedy wysy\u0142ane s\u0105 automatyczne powiadomienia"},notification_url:{heading:"Adres URL do otwarcia",helper:"Opcjonalny adres URL dla akcji Otw\xF3rz w powiadomieniu"},active_months:{heading:"Aktywne miesi\u0105ce",helper:"Zadania sezonowe s\u0105 wymagane tylko w tych miesi\u0105cach (puste = ca\u0142y rok)"}},sections:{optional:"Ustawienia opcjonalne",notifications:"Powiadomienia"},actions:{add_task:"Dodaj zadanie"},alerts:{required:"Wype\u0142nij wszystkie pola",error:"B\u0142\u0105d podczas dodawania zadania. Szczeg\xF3\u0142y w konsoli."}},current:{title:"Bie\u017C\u0105ce zadania",next:"Nast\u0119pny termin",actions:{edit:"Edytuj",move:"Przenie\u015B do grupy",remove:"Usu\u0144"},alerts:{complete_success:'"{title}" oznaczono jako wykonane. Nast\u0119pny termin zosta\u0142 przeliczony.',complete_error:"Nie uda\u0142o si\u0119 oznaczy\u0107 zadania jako wykonane. Szczeg\xF3\u0142y w konsoli.",remove_error:"Nie uda\u0142o si\u0119 usun\u0105\u0107 zadania. Szczeg\xF3\u0142y w konsoli."},filter:{search:"Szukaj zada\u0144...",templates:"Przegl\u0105daj szablony",export:"Eksportuj CSV",clear:"Wyczy\u015B\u0107 filtry"}},groups:{title:"Grupy",fields:{new_group:{heading:"Nowa grupa"}},actions:{create:"Utw\xF3rz",rename:"Zmie\u0144 nazw\u0119",delete:"Usu\u0144",save:"Zapisz",cancel:"Anuluj"},empty:"Brak grup. Utw\xF3rz grup\u0119, aby uporz\u0105dkowa\u0107 zadania.",confirm_delete:'Usun\u0105\u0107 grup\u0119 "{title}"? Jej zadania trafi\u0105 do kategorii Bez grupy.',alerts:{error:"Nie uda\u0142o si\u0119 utworzy\u0107 grupy. Sprawd\u017A konsol\u0119 przegl\u0105darki i logi Home Assistant.",exists:'Grupa "{title}" ju\u017C istnieje.',rename_error:"Nie uda\u0142o si\u0119 zmieni\u0107 nazwy grupy. Szczeg\xF3\u0142y w konsoli.",delete_error:"Nie uda\u0142o si\u0119 usun\u0105\u0107 grupy. Szczeg\xF3\u0142y w konsoli."},confirm_delete_title:"Usu\u0144 grup\u0119"}},dialog:{edit_task:{title:"Edytuj zadanie",fields:{interval_value:{heading:"Interwa\u0142"},interval_type:{heading:"Typ interwa\u0142u"},last_performed:{heading:"Ostatnio wykonane",helper:"Pozostaw puste, aby u\u017Cy\u0107 dzisiejszej daty"},anchor_date:{heading:"Data odniesienia",helper:"Harmonogram powtarza si\u0119 od tej sta\u0142ej daty"},tag:{heading:"Tag"},icon:{heading:"Ikona"},label:{heading:"Etykieta(-y)"},area:{heading:"Obszar"},trigger_type:{heading:"Typ wyzwalacza"},count_entity_id:{heading:"Zliczana encja"},count_threshold:{heading:"Pr\xF3g liczby u\u017Cy\u0107"},runtime_entity_id:{heading:"Czujnik czasu pracy"},runtime_threshold:{heading:"Pr\xF3g czasu pracy"},title:{heading:"Tytu\u0142"},description:{heading:"Opis"},group_id:{heading:"Grupa",helper:"Wybierz grup\u0119 lub wpisz now\u0105 nazw\u0119"},notifications_enabled:{heading:"W\u0142\u0105cz powiadomienia"},notification_target:{heading:"Us\u0142uga powiadomie\u0144",helper:"Pozostaw puste, aby u\u017Cy\u0107 notify.notify"},notify_when:{heading:"Powiadamiaj, gdy"},notify_days_before_due:{heading:"Dni przed terminem",helper:"Opcjonalne wyprzedzenie przypomnienia o zbli\u017Caj\u0105cym si\u0119 terminie"},notification_time:{heading:"Pora dnia",helper:"Kiedy wysy\u0142ane s\u0105 automatyczne powiadomienia"},notification_url:{heading:"Adres URL do otwarcia",helper:"Opcjonalny adres URL dla akcji Otw\xF3rz w powiadomieniu"},active_months:{heading:"Aktywne miesi\u0105ce",helper:"Zadania sezonowe s\u0105 wymagane tylko w tych miesi\u0105cach (puste = ca\u0142y rok)"}},sections:{optional:"Ustawienia opcjonalne",notifications:"Powiadomienia",history:"Historia"},actions:{cancel:"Anuluj",save:"Zapisz",test_notification:"Wy\u015Blij powiadomienie testowe"},alerts:{error:"Nie uda\u0142o si\u0119 zapisa\u0107 zmian. Szczeg\xF3\u0142y w konsoli.",test_error:"Nie uda\u0142o si\u0119 wys\u0142a\u0107 powiadomienia testowego. Szczeg\xF3\u0142y w konsoli."}},move_task:{title:"Przenie\u015B zadanie",fields:{group_id:{heading:"Grupa"}},actions:{cancel:"Anuluj",move:"Przenie\u015B"}},confirm_complete:{title:"Oznacz zadanie jako wykonane",message:'Oznaczy\u0107 "{title}" jako wykonane? Data ostatniego wykonania zostanie ustawiona na dzi\u015B, a nast\u0119pny termin zostanie przeliczony na podstawie interwa\u0142u {interval}.',message_progress:'Oznaczy\u0107 "{title}" jako wykonane? Post\u0119p ({interval}) zacznie si\u0119 od nowa.',note_label:"Notatka (opcjonalnie)",actions:{confirm:"Oznacz jako wykonane"}},confirm_remove:{title:"Usu\u0144 zadanie",message:'Usun\u0105\u0107 "{title}"? Tej operacji nie mo\u017Cna cofn\u0105\u0107.',actions:{confirm:"Usu\u0144"}},templates:{title:"Szablony zada\u0144",search:"Szukaj szablon\xF3w...",import_csv:"Importuj z CSV",choose_csv:"Wybierz plik CSV",csv_hint:"Kolumny: title (wymagana), description, interval_value, interval_type, last_performed (RRRR-MM-DD), icon, group_id",csv_empty:"Nie znaleziono wierszy do zaimportowania.",no_matches:"\u017Baden szablon nie pasuje do wyszukiwania.",import_count:"{count, plural, one {Importuj 1 zadanie} few {Importuj # zadania} many {Importuj # zada\u0144} other {Importuj # zadania}}",imported:"{count, plural, one {Zaimportowano 1 zadanie.} few {Zaimportowano # zadania.} many {Zaimportowano # zada\u0144.} other {Zaimportowano # zadania.}}",import_failed:"Nie uda\u0142o si\u0119 zaimportowa\u0107: {titles}",preview:{title:"Tytu\u0142",interval:"Interwa\u0142",last_performed:"Ostatnio wykonano",group:"Grupa"}}}},I0={categories:{hvac:"Ogrzewanie i klimatyzacja",plumbing:"Hydraulika",electrical:"Elektryka",appliances:"Sprz\u0119t AGD",interior:"Wn\u0119trze",exterior:"Na zewn\u0105trz",yard:"Ogr\xF3d",safety:"Bezpiecze\u0144stwo",vehicles:"Pojazdy"}},z0={common:P0,intervals:E0,trigger_types:R0,notifications:F0,card:D0,panel:N0,templates:I0};var y2={};I(y2,{card:()=>Q0,common:()=>G0,default:()=>K0,intervals:()=>U0,notifications:()=>$0,panel:()=>j0,templates:()=>q0,trigger_types:()=>W0});var G0={loading:"Carregando...",none:"Nenhum",no_tasks:"Nenhuma tarefa encontrada.",ungrouped:"Sem grupo",cancel:"Cancelar",invalid_date:"Data inv\xE1lida."},U0={day:"Dia",days:"Dias",week:"Semana",weeks:"Semanas",month:"M\xEAs",months:"Meses",year:"Ano",years:"Anos",every_uses:"A cada {value} usos",every_runtime:"A cada {value} de tempo de uso"},W0={time:"Por tempo",date:"Data fixa",count:"Por contagem",runtime:"Por tempo de uso"},$0={when:{due:"No vencimento",overdue:"Em atraso",due_and_overdue:"No vencimento e em atraso"}},Q0={add_task:{added:'"{title}" adicionada.'},todo:{due_today:"Vence hoje",days_overdue:"{count, plural, one {1 dia de atraso} other {# dias de atraso}}",days_left:"{count, plural, one {Vence em 1 dia} other {Faltam # dias}}",search:"Pesquisar tarefas...",all_groups:"Todos os grupos",overdue:"Atrasadas",due_soon:"Vence em breve",upcoming:"Pr\xF3ximas",no_tasks:"Nenhuma tarefa encontrada",done:"Conclu\xEDdas",description:"Descri\xE7\xE3o",last_performed:"\xDAltima execu\xE7\xE3o",progress:"Progresso",history:"Hist\xF3rico",open_panel:"Abrir painel completo",complete:"Concluir",edit:"Editar no painel",remove:"Remover"}},j0={cards:{new:{title:"Criar nova tarefa",fields:{title:{heading:"T\xEDtulo da tarefa"},interval_value:{heading:"Intervalo"},interval_type:{heading:"Tipo de intervalo"},last_performed:{heading:"\xDAltima execu\xE7\xE3o",helper:"Deixe em branco para usar hoje"},anchor_date:{heading:"Data de refer\xEAncia",helper:"O agendamento se repete a partir desta data fixa"},tag:{heading:"Tag"},icon:{heading:"\xCDcone"},label:{heading:"Etiqueta(s)"},area:{heading:"\xC1rea"},description:{heading:"Descri\xE7\xE3o"},trigger_type:{heading:"Tipo de gatilho"},count_entity_id:{heading:"Entidade contada"},count_threshold:{heading:"Limite de contagem"},runtime_entity_id:{heading:"Sensor de tempo de uso"},runtime_threshold:{heading:"Limite de tempo de uso"},group_id:{heading:"Grupo",helper:"Escolha um grupo ou digite um novo nome"},notifications_enabled:{heading:"Ativar notifica\xE7\xF5es"},notification_target:{heading:"Servi\xE7o de notifica\xE7\xE3o",helper:"Deixe em branco para usar notify.notify"},notify_when:{heading:"Notificar quando"},notify_days_before_due:{heading:"Dias antes do vencimento",helper:"Anteced\xEAncia opcional do lembrete de vencimento"},notification_time:{heading:"Hor\xE1rio do dia",helper:"Quando as notifica\xE7\xF5es autom\xE1ticas s\xE3o enviadas"},notification_url:{heading:"URL para abrir",helper:"URL opcional para a a\xE7\xE3o Abrir da notifica\xE7\xE3o"},active_months:{heading:"Meses ativos",helper:"Tarefas sazonais s\xF3 vencem nesses meses (vazio = o ano todo)"}},sections:{optional:"Configura\xE7\xF5es opcionais",notifications:"Notifica\xE7\xF5es"},actions:{add_task:"Adicionar tarefa"},alerts:{required:"Preencha todos os campos",error:"Erro ao adicionar a tarefa. Veja o console para detalhes."}},current:{title:"Tarefas atuais",next:"Pr\xF3ximo vencimento",actions:{edit:"Editar",move:"Mover para grupo",remove:"Remover"},alerts:{complete_success:'"{title}" marcada como conclu\xEDda. O pr\xF3ximo vencimento foi recalculado.',complete_error:"Falha ao marcar a tarefa como conclu\xEDda. Veja o console para detalhes.",remove_error:"Falha ao remover a tarefa. Veja o console para detalhes."},filter:{search:"Pesquisar tarefas...",templates:"Explorar modelos",export:"Exportar CSV",clear:"Limpar filtros"}},groups:{title:"Grupos",fields:{new_group:{heading:"Novo grupo"}},actions:{create:"Criar",rename:"Renomear",delete:"Excluir",save:"Salvar",cancel:"Cancelar"},empty:"Nenhum grupo ainda. Crie um para organizar suas tarefas.",confirm_delete:'Excluir o grupo "{title}"? Suas tarefas ir\xE3o para Sem grupo.',alerts:{error:"Falha ao criar o grupo. Verifique o console do navegador e os logs do Home Assistant.",exists:'O grupo "{title}" j\xE1 existe.',rename_error:"Falha ao renomear o grupo. Veja o console para detalhes.",delete_error:"Falha ao excluir o grupo. Veja o console para detalhes."},confirm_delete_title:"Excluir grupo"}},dialog:{edit_task:{title:"Editar tarefa",fields:{interval_value:{heading:"Intervalo"},interval_type:{heading:"Tipo de intervalo"},last_performed:{heading:"\xDAltima execu\xE7\xE3o",helper:"Deixe em branco para usar hoje"},anchor_date:{heading:"Data de refer\xEAncia",helper:"O agendamento se repete a partir desta data fixa"},tag:{heading:"Tag"},icon:{heading:"\xCDcone"},label:{heading:"Etiqueta(s)"},area:{heading:"\xC1rea"},trigger_type:{heading:"Tipo de gatilho"},count_entity_id:{heading:"Entidade contada"},count_threshold:{heading:"Limite de contagem"},runtime_entity_id:{heading:"Sensor de tempo de uso"},runtime_threshold:{heading:"Limite de tempo de uso"},title:{heading:"T\xEDtulo"},description:{heading:"Descri\xE7\xE3o"},group_id:{heading:"Grupo",helper:"Escolha um grupo ou digite um novo nome"},notifications_enabled:{heading:"Ativar notifica\xE7\xF5es"},notification_target:{heading:"Servi\xE7o de notifica\xE7\xE3o",helper:"Deixe em branco para usar notify.notify"},notify_when:{heading:"Notificar quando"},notify_days_before_due:{heading:"Dias antes do vencimento",helper:"Anteced\xEAncia opcional do lembrete de vencimento"},notification_time:{heading:"Hor\xE1rio do dia",helper:"Quando as notifica\xE7\xF5es autom\xE1ticas s\xE3o enviadas"},notification_url:{heading:"URL para abrir",helper:"URL opcional para a a\xE7\xE3o Abrir da notifica\xE7\xE3o"},active_months:{heading:"Meses ativos",helper:"Tarefas sazonais s\xF3 vencem nesses meses (vazio = o ano todo)"}},sections:{optional:"Configura\xE7\xF5es opcionais",notifications:"Notifica\xE7\xF5es",history:"Hist\xF3rico"},actions:{cancel:"Cancelar",save:"Salvar",test_notification:"Enviar notifica\xE7\xE3o de teste"},alerts:{error:"Falha ao salvar as altera\xE7\xF5es. Veja o console para detalhes.",test_error:"Falha ao enviar a notifica\xE7\xE3o de teste. Veja o console para detalhes."}},move_task:{title:"Mover tarefa",fields:{group_id:{heading:"Grupo"}},actions:{cancel:"Cancelar",move:"Mover"}},confirm_complete:{title:"Marcar tarefa como conclu\xEDda",message:'Marcar "{title}" como conclu\xEDda? A \xFAltima execu\xE7\xE3o ser\xE1 redefinida para hoje e o pr\xF3ximo vencimento ser\xE1 recalculado com base no intervalo de {interval}.',message_progress:'Marcar "{title}" como conclu\xEDda? O progresso ({interval}) recome\xE7ar\xE1 do zero.',note_label:"Nota (opcional)",actions:{confirm:"Marcar como conclu\xEDda"}},confirm_remove:{title:"Remover tarefa",message:'Remover "{title}"? Isso n\xE3o pode ser desfeito.',actions:{confirm:"Remover"}},templates:{title:"Modelos de tarefas",search:"Pesquisar modelos...",import_csv:"Importar de CSV",choose_csv:"Escolher arquivo CSV",csv_hint:"Colunas: title (obrigat\xF3ria), description, interval_value, interval_type, last_performed (AAAA-MM-DD), icon, group_id",csv_empty:"Nenhuma linha import\xE1vel encontrada no arquivo.",no_matches:"Nenhum modelo corresponde \xE0 sua pesquisa.",import_count:"{count, plural, one {Importar 1 tarefa} other {Importar # tarefas}}",imported:"{count, plural, one {1 tarefa importada.} other {# tarefas importadas.}}",import_failed:"Falha ao importar: {titles}",preview:{title:"T\xEDtulo",interval:"Intervalo",last_performed:"\xDAltima execu\xE7\xE3o",group:"Grupo"}}}},q0={categories:{hvac:"Climatiza\xE7\xE3o",plumbing:"Hidr\xE1ulica",electrical:"El\xE9trica",appliances:"Eletrodom\xE9sticos",interior:"Interior",exterior:"Exterior",yard:"Jardim",safety:"Seguran\xE7a",vehicles:"Ve\xEDculos"}},K0={common:G0,intervals:U0,trigger_types:W0,notifications:$0,card:Q0,panel:j0,templates:q0};var b2=function(C,H){return b2=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(V,L){V.__proto__=L}||function(V,L){for(var e in L)Object.prototype.hasOwnProperty.call(L,e)&&(V[e]=L[e])},b2(C,H)};function _1(C,H){if(typeof H!="function"&&H!==null)throw new TypeError("Class extends value "+String(H)+" is not a constructor or null");b2(C,H);function V(){this.constructor=C}C.prototype=H===null?Object.create(H):(V.prototype=H.prototype,new V)}var x=function(){return x=Object.assign||function(H){for(var V,L=1,e=arguments.length;L<e;L++){V=arguments[L];for(var r in V)Object.prototype.hasOwnProperty.call(V,r)&&(H[r]=V[r])}return H},x.apply(this,arguments)};function U1(C,H,V){if(V||arguments.length===2)for(var L=0,e=H.length,r;L<e;L++)(r||!(L in H))&&(r||(r=Array.prototype.slice.call(H,0,L)),r[L]=H[L]);return C.concat(r||Array.prototype.slice.call(H))}var s;(function(C){C[C.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",C[C.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",C[C.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",C[C.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",C[C.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",C[C.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",C[C.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",C[C.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",C[C.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",C[C.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",C[C.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",C[C.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",C[C.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",C[C.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",C[C.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",C[C.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",C[C.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",C[C.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",C[C.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",C[C.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",C[C.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",C[C.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",C[C.INVALID_TAG=23]="INVALID_TAG",C[C.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",C[C.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",C[C.UNCLOSED_TAG=27]="UNCLOSED_TAG"})(s||(s={}));var S;(function(C){C[C.literal=0]="literal",C[C.argument=1]="argument",C[C.number=2]="number",C[C.date=3]="date",C[C.time=4]="time",C[C.select=5]="select",C[C.plural=6]="plural",C[C.pound=7]="pound",C[C.tag=8]="tag"})(S||(S={}));var t1;(function(C){C[C.number=0]="number",C[C.dateTime=1]="dateTime"})(t1||(t1={}));function _2(C){return C.type===S.literal}function A5(C){return C.type===S.argument}function W1(C){return C.type===S.number}function $1(C){return C.type===S.date}function Q1(C){return C.type===S.time}function j1(C){return C.type===S.select}function q1(C){return C.type===S.plural}function n5(C){return C.type===S.pound}function K1(C){return C.type===S.tag}function X1(C){return!!(C&&typeof C=="object"&&C.type===t1.number)}function k1(C){return!!(C&&typeof C=="object"&&C.type===t1.dateTime)}var k2=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;var X0=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function d5(C){var H={};return C.replace(X0,function(V){var L=V.length;switch(V[0]){case"G":H.era=L===4?"long":L===5?"narrow":"short";break;case"y":H.year=L===2?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":H.month=["numeric","2-digit","short","long","narrow"][L-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":H.day=["numeric","2-digit"][L-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":H.weekday=L===4?"short":L===5?"narrow":"short";break;case"e":if(L<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");H.weekday=["short","long","narrow","short"][L-4];break;case"c":if(L<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");H.weekday=["short","long","narrow","short"][L-4];break;case"a":H.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":H.hourCycle="h12",H.hour=["numeric","2-digit"][L-1];break;case"H":H.hourCycle="h23",H.hour=["numeric","2-digit"][L-1];break;case"K":H.hourCycle="h11",H.hour=["numeric","2-digit"][L-1];break;case"k":H.hourCycle="h24",H.hour=["numeric","2-digit"][L-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":H.minute=["numeric","2-digit"][L-1];break;case"s":H.second=["numeric","2-digit"][L-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":H.timeZoneName=L<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""}),H}var p5=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;function v5(C){if(C.length===0)throw new Error("Number skeleton cannot be empty");for(var H=C.split(p5).filter(function(m){return m.length>0}),V=[],L=0,e=H;L<e.length;L++){var r=e[L],M=r.split("/");if(M.length===0)throw new Error("Invalid number skeleton");for(var t=M[0],a=M.slice(1),A=0,n=a;A<n.length;A++){var l=n[A];if(l.length===0)throw new Error("Invalid number skeleton")}V.push({stem:t,options:a})}return V}function J0(C){return C.replace(/^(.*?)-/,"")}var l5=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,x5=/^(@+)?(\+|#+)?[rs]?$/g,Y0=/(\*)(0+)|(#+)(0+)|(0+)/g,u5=/^(0+)$/;function m5(C){var H={};return C[C.length-1]==="r"?H.roundingPriority="morePrecision":C[C.length-1]==="s"&&(H.roundingPriority="lessPrecision"),C.replace(x5,function(V,L,e){return typeof e!="string"?(H.minimumSignificantDigits=L.length,H.maximumSignificantDigits=L.length):e==="+"?H.minimumSignificantDigits=L.length:L[0]==="#"?H.maximumSignificantDigits=L.length:(H.minimumSignificantDigits=L.length,H.maximumSignificantDigits=L.length+(typeof e=="string"?e.length:0)),""}),H}function c5(C){switch(C){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function C7(C){var H;if(C[0]==="E"&&C[1]==="E"?(H={notation:"engineering"},C=C.slice(2)):C[0]==="E"&&(H={notation:"scientific"},C=C.slice(1)),H){var V=C.slice(0,2);if(V==="+!"?(H.signDisplay="always",C=C.slice(2)):V==="+?"&&(H.signDisplay="exceptZero",C=C.slice(2)),!u5.test(C))throw new Error("Malformed concise eng/scientific notation");H.minimumIntegerDigits=C.length}return H}function s5(C){var H={},V=c5(C);return V||H}function Z5(C){for(var H={},V=0,L=C;V<L.length;V++){var e=L[V];switch(e.stem){case"percent":case"%":H.style="percent";continue;case"%x100":H.style="percent",H.scale=100;continue;case"currency":H.style="currency",H.currency=e.options[0];continue;case"group-off":case",_":H.useGrouping=!1;continue;case"precision-integer":case".":H.maximumFractionDigits=0;continue;case"measure-unit":case"unit":H.style="unit",H.unit=J0(e.options[0]);continue;case"compact-short":case"K":H.notation="compact",H.compactDisplay="short";continue;case"compact-long":case"KK":H.notation="compact",H.compactDisplay="long";continue;case"scientific":H=x(x(x({},H),{notation:"scientific"}),e.options.reduce(function(a,A){return x(x({},a),s5(A))},{}));continue;case"engineering":H=x(x(x({},H),{notation:"engineering"}),e.options.reduce(function(a,A){return x(x({},a),s5(A))},{}));continue;case"notation-simple":H.notation="standard";continue;case"unit-width-narrow":H.currencyDisplay="narrowSymbol",H.unitDisplay="narrow";continue;case"unit-width-short":H.currencyDisplay="code",H.unitDisplay="short";continue;case"unit-width-full-name":H.currencyDisplay="name",H.unitDisplay="long";continue;case"unit-width-iso-code":H.currencyDisplay="symbol";continue;case"scale":H.scale=parseFloat(e.options[0]);continue;case"integer-width":if(e.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");e.options[0].replace(Y0,function(a,A,n,l,m,Z){if(A)H.minimumIntegerDigits=n.length;else{if(l&&m)throw new Error("We currently do not support maximum integer digits");if(Z)throw new Error("We currently do not support exact integer digits")}return""});continue}if(u5.test(e.stem)){H.minimumIntegerDigits=e.stem.length;continue}if(l5.test(e.stem)){if(e.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");e.stem.replace(l5,function(a,A,n,l,m,Z){return n==="*"?H.minimumFractionDigits=A.length:l&&l[0]==="#"?H.maximumFractionDigits=l.length:m&&Z?(H.minimumFractionDigits=m.length,H.maximumFractionDigits=m.length+Z.length):(H.minimumFractionDigits=A.length,H.maximumFractionDigits=A.length),""});var r=e.options[0];r==="w"?H=x(x({},H),{trailingZeroDisplay:"stripIfInteger"}):r&&(H=x(x({},H),m5(r)));continue}if(x5.test(e.stem)){H=x(x({},H),m5(e.stem));continue}var M=c5(e.stem);M&&(H=x(x({},H),M));var t=C7(e.stem);t&&(H=x(x({},H),t))}return H}var w1={AX:["H"],BQ:["H"],CP:["H"],CZ:["H"],DK:["H"],FI:["H"],ID:["H"],IS:["H"],ML:["H"],NE:["H"],RU:["H"],SE:["H"],SJ:["H"],SK:["H"],AS:["h","H"],BT:["h","H"],DJ:["h","H"],ER:["h","H"],GH:["h","H"],IN:["h","H"],LS:["h","H"],PG:["h","H"],PW:["h","H"],SO:["h","H"],TO:["h","H"],VU:["h","H"],WS:["h","H"],"001":["H","h"],AL:["h","H","hB"],TD:["h","H","hB"],"ca-ES":["H","h","hB"],CF:["H","h","hB"],CM:["H","h","hB"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],LU:["H","h","hB"],NP:["H","h","hB"],PF:["H","h","hB"],SC:["H","h","hB"],SM:["H","h","hB"],SN:["H","h","hB"],TF:["H","h","hB"],VA:["H","h","hB"],CY:["h","H","hb","hB"],GR:["h","H","hb","hB"],CO:["h","H","hB","hb"],DO:["h","H","hB","hb"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],NA:["h","H","hB","hb"],PA:["h","H","hB","hb"],PR:["h","H","hB","hb"],VE:["h","H","hB","hb"],AC:["H","h","hb","hB"],AI:["H","h","hb","hB"],BW:["H","h","hb","hB"],BZ:["H","h","hb","hB"],CC:["H","h","hb","hB"],CK:["H","h","hb","hB"],CX:["H","h","hb","hB"],DG:["H","h","hb","hB"],FK:["H","h","hb","hB"],GB:["H","h","hb","hB"],GG:["H","h","hb","hB"],GI:["H","h","hb","hB"],IE:["H","h","hb","hB"],IM:["H","h","hb","hB"],IO:["H","h","hb","hB"],JE:["H","h","hb","hB"],LT:["H","h","hb","hB"],MK:["H","h","hb","hB"],MN:["H","h","hb","hB"],MS:["H","h","hb","hB"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],PN:["H","h","hb","hB"],SH:["H","h","hb","hB"],SX:["H","h","hb","hB"],TA:["H","h","hb","hB"],ZA:["H","h","hb","hB"],"af-ZA":["H","h","hB","hb"],AR:["H","h","hB","hb"],CL:["H","h","hB","hb"],CR:["H","h","hB","hb"],CU:["H","h","hB","hb"],EA:["H","h","hB","hb"],"es-BO":["H","h","hB","hb"],"es-BR":["H","h","hB","hb"],"es-EC":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"es-PE":["H","h","hB","hb"],GT:["H","h","hB","hb"],HN:["H","h","hB","hb"],IC:["H","h","hB","hb"],KG:["H","h","hB","hb"],KM:["H","h","hB","hb"],LK:["H","h","hB","hb"],MA:["H","h","hB","hb"],MX:["H","h","hB","hb"],NI:["H","h","hB","hb"],PY:["H","h","hB","hb"],SV:["H","h","hB","hb"],UY:["H","h","hB","hb"],JP:["H","h","K"],AD:["H","hB"],AM:["H","hB"],AO:["H","hB"],AT:["H","hB"],AW:["H","hB"],BE:["H","hB"],BF:["H","hB"],BJ:["H","hB"],BL:["H","hB"],BR:["H","hB"],CG:["H","hB"],CI:["H","hB"],CV:["H","hB"],DE:["H","hB"],EE:["H","hB"],FR:["H","hB"],GA:["H","hB"],GF:["H","hB"],GN:["H","hB"],GP:["H","hB"],GW:["H","hB"],HR:["H","hB"],IL:["H","hB"],IT:["H","hB"],KZ:["H","hB"],MC:["H","hB"],MD:["H","hB"],MF:["H","hB"],MQ:["H","hB"],MZ:["H","hB"],NC:["H","hB"],NL:["H","hB"],PM:["H","hB"],PT:["H","hB"],RE:["H","hB"],RO:["H","hB"],SI:["H","hB"],SR:["H","hB"],ST:["H","hB"],TG:["H","hB"],TR:["H","hB"],WF:["H","hB"],YT:["H","hB"],BD:["h","hB","H"],PK:["h","hB","H"],AZ:["H","hB","h"],BA:["H","hB","h"],BG:["H","hB","h"],CH:["H","hB","h"],GE:["H","hB","h"],LI:["H","hB","h"],ME:["H","hB","h"],RS:["H","hB","h"],UA:["H","hB","h"],UZ:["H","hB","h"],XK:["H","hB","h"],AG:["h","hb","H","hB"],AU:["h","hb","H","hB"],BB:["h","hb","H","hB"],BM:["h","hb","H","hB"],BS:["h","hb","H","hB"],CA:["h","hb","H","hB"],DM:["h","hb","H","hB"],"en-001":["h","hb","H","hB"],FJ:["h","hb","H","hB"],FM:["h","hb","H","hB"],GD:["h","hb","H","hB"],GM:["h","hb","H","hB"],GU:["h","hb","H","hB"],GY:["h","hb","H","hB"],JM:["h","hb","H","hB"],KI:["h","hb","H","hB"],KN:["h","hb","H","hB"],KY:["h","hb","H","hB"],LC:["h","hb","H","hB"],LR:["h","hb","H","hB"],MH:["h","hb","H","hB"],MP:["h","hb","H","hB"],MW:["h","hb","H","hB"],NZ:["h","hb","H","hB"],SB:["h","hb","H","hB"],SG:["h","hb","H","hB"],SL:["h","hb","H","hB"],SS:["h","hb","H","hB"],SZ:["h","hb","H","hB"],TC:["h","hb","H","hB"],TT:["h","hb","H","hB"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],VC:["h","hb","H","hB"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],ZM:["h","hb","H","hB"],BO:["H","hB","h","hb"],EC:["H","hB","h","hb"],ES:["H","hB","h","hb"],GQ:["H","hB","h","hb"],PE:["H","hB","h","hb"],AE:["h","hB","hb","H"],"ar-001":["h","hB","hb","H"],BH:["h","hB","hb","H"],DZ:["h","hB","hb","H"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],HK:["h","hB","hb","H"],IQ:["h","hB","hb","H"],JO:["h","hB","hb","H"],KW:["h","hB","hb","H"],LB:["h","hB","hb","H"],LY:["h","hB","hb","H"],MO:["h","hB","hb","H"],MR:["h","hB","hb","H"],OM:["h","hB","hb","H"],PH:["h","hB","hb","H"],PS:["h","hB","hb","H"],QA:["h","hB","hb","H"],SA:["h","hB","hb","H"],SD:["h","hB","hb","H"],SY:["h","hB","hb","H"],TN:["h","hB","hb","H"],YE:["h","hB","hb","H"],AF:["H","hb","hB","h"],LA:["H","hb","hB","h"],CN:["H","hB","hb","h"],LV:["H","hB","hb","h"],TL:["H","hB","hb","h"],"zu-ZA":["H","hB","hb","h"],CD:["hB","H"],IR:["hB","H"],"hi-IN":["hB","h","H"],"kn-IN":["hB","h","H"],"ml-IN":["hB","h","H"],"te-IN":["hB","h","H"],KH:["hB","h","H","hb"],"ta-IN":["hB","h","hb","H"],BN:["hb","hB","h","H"],MY:["hb","hB","h","H"],ET:["hB","hb","h","H"],"gu-IN":["hB","hb","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],TW:["hB","hb","h","H"],KE:["hB","hb","H","h"],MM:["hB","hb","H","h"],TZ:["hB","hb","H","h"],UG:["hB","hb","H","h"]};function h5(C,H){for(var V="",L=0;L<C.length;L++){var e=C.charAt(L);if(e==="j"){for(var r=0;L+1<C.length&&C.charAt(L+1)===e;)r++,L++;var M=1+(r&1),t=r<2?1:3+(r>>1),a="a",A=H7(H);for((A=="H"||A=="k")&&(t=0);t-- >0;)V+=a;for(;M-- >0;)V=A+V}else e==="J"?V+="H":V+=e}return V}function H7(C){var H=C.hourCycle;if(H===void 0&&C.hourCycles&&C.hourCycles.length&&(H=C.hourCycles[0]),H)switch(H){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}var V=C.language,L;V!=="root"&&(L=C.maximize().region);var e=w1[L||""]||w1[V||""]||w1["".concat(V,"-001")]||w1["001"];return e[0]}var w2,V7=new RegExp("^".concat(k2.source,"*")),L7=new RegExp("".concat(k2.source,"*$"));function u(C,H){return{start:C,end:H}}var e7=!!String.prototype.startsWith,r7=!!String.fromCodePoint,M7=!!Object.fromEntries,t7=!!String.prototype.codePointAt,i7=!!String.prototype.trimStart,a7=!!String.prototype.trimEnd,o7=!!Number.isSafeInteger,A7=o7?Number.isSafeInteger:function(C){return typeof C=="number"&&isFinite(C)&&Math.floor(C)===C&&Math.abs(C)<=9007199254740991},B2=!0;try{S5=y5("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu"),B2=((w2=S5.exec("a"))===null||w2===void 0?void 0:w2[0])==="a"}catch{B2=!1}var S5,g5=e7?function(H,V,L){return H.startsWith(V,L)}:function(H,V,L){return H.slice(L,L+V.length)===V},P2=r7?String.fromCodePoint:function(){for(var H=[],V=0;V<arguments.length;V++)H[V]=arguments[V];for(var L="",e=H.length,r=0,M;e>r;){if(M=H[r++],M>1114111)throw RangeError(M+" is not a valid code point");L+=M<65536?String.fromCharCode(M):String.fromCharCode(((M-=65536)>>10)+55296,M%1024+56320)}return L},f5=M7?Object.fromEntries:function(H){for(var V={},L=0,e=H;L<e.length;L++){var r=e[L],M=r[0],t=r[1];V[M]=t}return V},O5=t7?function(H,V){return H.codePointAt(V)}:function(H,V){var L=H.length;if(!(V<0||V>=L)){var e=H.charCodeAt(V),r;return e<55296||e>56319||V+1===L||(r=H.charCodeAt(V+1))<56320||r>57343?e:(e-55296<<10)+(r-56320)+65536}},n7=i7?function(H){return H.trimStart()}:function(H){return H.replace(V7,"")},d7=a7?function(H){return H.trimEnd()}:function(H){return H.replace(L7,"")};function y5(C,H){return new RegExp(C,H)}var E2;B2?(T2=y5("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu"),E2=function(H,V){var L;T2.lastIndex=V;var e=T2.exec(H);return(L=e[1])!==null&&L!==void 0?L:""}):E2=function(H,V){for(var L=[];;){var e=O5(H,V);if(e===void 0||_5(e)||m7(e))break;L.push(e),V+=e>=65536?2:1}return P2.apply(void 0,L)};var T2,b5=(function(){function C(H,V){V===void 0&&(V={}),this.message=H,this.position={offset:0,line:1,column:1},this.ignoreTag=!!V.ignoreTag,this.locale=V.locale,this.requiresOtherClause=!!V.requiresOtherClause,this.shouldParseSkeletons=!!V.shouldParseSkeletons}return C.prototype.parse=function(){if(this.offset()!==0)throw Error("parser can only be used once");return this.parseMessage(0,"",!1)},C.prototype.parseMessage=function(H,V,L){for(var e=[];!this.isEOF();){var r=this.char();if(r===123){var M=this.parseArgument(H,L);if(M.err)return M;e.push(M.val)}else{if(r===125&&H>0)break;if(r===35&&(V==="plural"||V==="selectordinal")){var t=this.clonePosition();this.bump(),e.push({type:S.pound,location:u(t,this.clonePosition())})}else if(r===60&&!this.ignoreTag&&this.peek()===47){if(L)break;return this.error(s.UNMATCHED_CLOSING_TAG,u(this.clonePosition(),this.clonePosition()))}else if(r===60&&!this.ignoreTag&&R2(this.peek()||0)){var M=this.parseTag(H,V);if(M.err)return M;e.push(M.val)}else{var M=this.parseLiteral(H,V);if(M.err)return M;e.push(M.val)}}}return{val:e,err:null}},C.prototype.parseTag=function(H,V){var L=this.clonePosition();this.bump();var e=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:S.literal,value:"<".concat(e,"/>"),location:u(L,this.clonePosition())},err:null};if(this.bumpIf(">")){var r=this.parseMessage(H+1,V,!0);if(r.err)return r;var M=r.val,t=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!R2(this.char()))return this.error(s.INVALID_TAG,u(t,this.clonePosition()));var a=this.clonePosition(),A=this.parseTagName();return e!==A?this.error(s.UNMATCHED_CLOSING_TAG,u(a,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:S.tag,value:e,children:M,location:u(L,this.clonePosition())},err:null}:this.error(s.INVALID_TAG,u(t,this.clonePosition())))}else return this.error(s.UNCLOSED_TAG,u(L,this.clonePosition()))}else return this.error(s.INVALID_TAG,u(L,this.clonePosition()))},C.prototype.parseTagName=function(){var H=this.offset();for(this.bump();!this.isEOF()&&l7(this.char());)this.bump();return this.message.slice(H,this.offset())},C.prototype.parseLiteral=function(H,V){for(var L=this.clonePosition(),e="";;){var r=this.tryParseQuote(V);if(r){e+=r;continue}var M=this.tryParseUnquoted(H,V);if(M){e+=M;continue}var t=this.tryParseLeftAngleBracket();if(t){e+=t;continue}break}var a=u(L,this.clonePosition());return{val:{type:S.literal,value:e,location:a},err:null}},C.prototype.tryParseLeftAngleBracket=function(){return!this.isEOF()&&this.char()===60&&(this.ignoreTag||!p7(this.peek()||0))?(this.bump(),"<"):null},C.prototype.tryParseQuote=function(H){if(this.isEOF()||this.char()!==39)return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if(H==="plural"||H==="selectordinal")break;return null;default:return null}this.bump();var V=[this.char()];for(this.bump();!this.isEOF();){var L=this.char();if(L===39)if(this.peek()===39)V.push(39),this.bump();else{this.bump();break}else V.push(L);this.bump()}return P2.apply(void 0,V)},C.prototype.tryParseUnquoted=function(H,V){if(this.isEOF())return null;var L=this.char();return L===60||L===123||L===35&&(V==="plural"||V==="selectordinal")||L===125&&H>0?null:(this.bump(),P2(L))},C.prototype.parseArgument=function(H,V){var L=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(s.EXPECT_ARGUMENT_CLOSING_BRACE,u(L,this.clonePosition()));if(this.char()===125)return this.bump(),this.error(s.EMPTY_ARGUMENT,u(L,this.clonePosition()));var e=this.parseIdentifierIfPossible().value;if(!e)return this.error(s.MALFORMED_ARGUMENT,u(L,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(s.EXPECT_ARGUMENT_CLOSING_BRACE,u(L,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:S.argument,value:e,location:u(L,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(s.EXPECT_ARGUMENT_CLOSING_BRACE,u(L,this.clonePosition())):this.parseArgumentOptions(H,V,e,L);default:return this.error(s.MALFORMED_ARGUMENT,u(L,this.clonePosition()))}},C.prototype.parseIdentifierIfPossible=function(){var H=this.clonePosition(),V=this.offset(),L=E2(this.message,V),e=V+L.length;this.bumpTo(e);var r=this.clonePosition(),M=u(H,r);return{value:L,location:M}},C.prototype.parseArgumentOptions=function(H,V,L,e){var r,M=this.clonePosition(),t=this.parseIdentifierIfPossible().value,a=this.clonePosition();switch(t){case"":return this.error(s.EXPECT_ARGUMENT_TYPE,u(M,a));case"number":case"date":case"time":{this.bumpSpace();var A=null;if(this.bumpIf(",")){this.bumpSpace();var n=this.clonePosition(),l=this.parseSimpleArgStyleIfPossible();if(l.err)return l;var m=d7(l.val);if(m.length===0)return this.error(s.EXPECT_ARGUMENT_STYLE,u(this.clonePosition(),this.clonePosition()));var Z=u(n,this.clonePosition());A={style:m,styleLocation:Z}}var b=this.tryParseArgumentClose(e);if(b.err)return b;var w=u(e,this.clonePosition());if(A&&g5(A?.style,"::",0)){var C1=n7(A.style.slice(2));if(t==="number"){var l=this.parseNumberSkeletonFromString(C1,A.styleLocation);return l.err?l:{val:{type:S.number,value:L,location:w,style:l.val},err:null}}else{if(C1.length===0)return this.error(s.EXPECT_DATE_TIME_SKELETON,w);var v1=C1;this.locale&&(v1=h5(C1,this.locale));var m={type:t1.dateTime,pattern:v1,location:A.styleLocation,parsedOptions:this.shouldParseSkeletons?d5(v1):{}},o1=t==="date"?S.date:S.time;return{val:{type:o1,value:L,location:w,style:m},err:null}}}return{val:{type:t==="number"?S.number:t==="date"?S.date:S.time,value:L,location:w,style:(r=A?.style)!==null&&r!==void 0?r:null},err:null}}case"plural":case"selectordinal":case"select":{var R=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(s.EXPECT_SELECT_ARGUMENT_OPTIONS,u(R,x({},R)));this.bumpSpace();var x1=this.parseIdentifierIfPossible(),H1=0;if(t!=="select"&&x1.value==="offset"){if(!this.bumpIf(":"))return this.error(s.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,u(this.clonePosition(),this.clonePosition()));this.bumpSpace();var l=this.tryParseDecimalInteger(s.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,s.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);if(l.err)return l;this.bumpSpace(),x1=this.parseIdentifierIfPossible(),H1=l.val}var D1=this.tryParsePluralOrSelectOptions(H,t,V,x1);if(D1.err)return D1;var b=this.tryParseArgumentClose(e);if(b.err)return b;var $2=u(e,this.clonePosition());return t==="select"?{val:{type:S.select,value:L,options:f5(D1.val),location:$2},err:null}:{val:{type:S.plural,value:L,options:f5(D1.val),offset:H1,pluralType:t==="plural"?"cardinal":"ordinal",location:$2},err:null}}default:return this.error(s.INVALID_ARGUMENT_TYPE,u(M,a))}},C.prototype.tryParseArgumentClose=function(H){return this.isEOF()||this.char()!==125?this.error(s.EXPECT_ARGUMENT_CLOSING_BRACE,u(H,this.clonePosition())):(this.bump(),{val:!0,err:null})},C.prototype.parseSimpleArgStyleIfPossible=function(){for(var H=0,V=this.clonePosition();!this.isEOF();){var L=this.char();switch(L){case 39:{this.bump();var e=this.clonePosition();if(!this.bumpUntil("'"))return this.error(s.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,u(e,this.clonePosition()));this.bump();break}case 123:{H+=1,this.bump();break}case 125:{if(H>0)H-=1;else return{val:this.message.slice(V.offset,this.offset()),err:null};break}default:this.bump();break}}return{val:this.message.slice(V.offset,this.offset()),err:null}},C.prototype.parseNumberSkeletonFromString=function(H,V){var L=[];try{L=v5(H)}catch{return this.error(s.INVALID_NUMBER_SKELETON,V)}return{val:{type:t1.number,tokens:L,location:V,parsedOptions:this.shouldParseSkeletons?Z5(L):{}},err:null}},C.prototype.tryParsePluralOrSelectOptions=function(H,V,L,e){for(var r,M=!1,t=[],a=new Set,A=e.value,n=e.location;;){if(A.length===0){var l=this.clonePosition();if(V!=="select"&&this.bumpIf("=")){var m=this.tryParseDecimalInteger(s.EXPECT_PLURAL_ARGUMENT_SELECTOR,s.INVALID_PLURAL_ARGUMENT_SELECTOR);if(m.err)return m;n=u(l,this.clonePosition()),A=this.message.slice(l.offset,this.offset())}else break}if(a.has(A))return this.error(V==="select"?s.DUPLICATE_SELECT_ARGUMENT_SELECTOR:s.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,n);A==="other"&&(M=!0),this.bumpSpace();var Z=this.clonePosition();if(!this.bumpIf("{"))return this.error(V==="select"?s.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:s.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,u(this.clonePosition(),this.clonePosition()));var b=this.parseMessage(H+1,V,L);if(b.err)return b;var w=this.tryParseArgumentClose(Z);if(w.err)return w;t.push([A,{value:b.val,location:u(Z,this.clonePosition())}]),a.add(A),this.bumpSpace(),r=this.parseIdentifierIfPossible(),A=r.value,n=r.location}return t.length===0?this.error(V==="select"?s.EXPECT_SELECT_ARGUMENT_SELECTOR:s.EXPECT_PLURAL_ARGUMENT_SELECTOR,u(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!M?this.error(s.MISSING_OTHER_CLAUSE,u(this.clonePosition(),this.clonePosition())):{val:t,err:null}},C.prototype.tryParseDecimalInteger=function(H,V){var L=1,e=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(L=-1);for(var r=!1,M=0;!this.isEOF();){var t=this.char();if(t>=48&&t<=57)r=!0,M=M*10+(t-48),this.bump();else break}var a=u(e,this.clonePosition());return r?(M*=L,A7(M)?{val:M,err:null}:this.error(V,a)):this.error(H,a)},C.prototype.offset=function(){return this.position.offset},C.prototype.isEOF=function(){return this.offset()===this.message.length},C.prototype.clonePosition=function(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}},C.prototype.char=function(){var H=this.position.offset;if(H>=this.message.length)throw Error("out of bound");var V=O5(this.message,H);if(V===void 0)throw Error("Offset ".concat(H," is at invalid UTF-16 code unit boundary"));return V},C.prototype.error=function(H,V){return{val:null,err:{kind:H,message:this.message,location:V}}},C.prototype.bump=function(){if(!this.isEOF()){var H=this.char();H===10?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=H<65536?1:2)}},C.prototype.bumpIf=function(H){if(g5(this.message,H,this.offset())){for(var V=0;V<H.length;V++)this.bump();return!0}return!1},C.prototype.bumpUntil=function(H){var V=this.offset(),L=this.message.indexOf(H,V);return L>=0?(this.bumpTo(L),!0):(this.bumpTo(this.message.length),!1)},C.prototype.bumpTo=function(H){if(this.offset()>H)throw Error("targetOffset ".concat(H," must be greater than or equal to the current offset ").concat(this.offset()));for(H=Math.min(H,this.message.length);;){var V=this.offset();if(V===H)break;if(V>H)throw Error("targetOffset ".concat(H," is at invalid UTF-16 code unit boundary"));if(this.bump(),this.isEOF())break}},C.prototype.bumpSpace=function(){for(;!this.isEOF()&&_5(this.char());)this.bump()},C.prototype.peek=function(){if(this.isEOF())return null;var H=this.char(),V=this.offset(),L=this.message.charCodeAt(V+(H>=65536?2:1));return L??null},C})();function R2(C){return C>=97&&C<=122||C>=65&&C<=90}function p7(C){return R2(C)||C===47}function l7(C){return C===45||C===46||C>=48&&C<=57||C===95||C>=97&&C<=122||C>=65&&C<=90||C==183||C>=192&&C<=214||C>=216&&C<=246||C>=248&&C<=893||C>=895&&C<=8191||C>=8204&&C<=8205||C>=8255&&C<=8256||C>=8304&&C<=8591||C>=11264&&C<=12271||C>=12289&&C<=55295||C>=63744&&C<=64975||C>=65008&&C<=65533||C>=65536&&C<=983039}function _5(C){return C>=9&&C<=13||C===32||C===133||C>=8206&&C<=8207||C===8232||C===8233}function m7(C){return C>=33&&C<=35||C===36||C>=37&&C<=39||C===40||C===41||C===42||C===43||C===44||C===45||C>=46&&C<=47||C>=58&&C<=59||C>=60&&C<=62||C>=63&&C<=64||C===91||C===92||C===93||C===94||C===96||C===123||C===124||C===125||C===126||C===161||C>=162&&C<=165||C===166||C===167||C===169||C===171||C===172||C===174||C===176||C===177||C===182||C===187||C===191||C===215||C===247||C>=8208&&C<=8213||C>=8214&&C<=8215||C===8216||C===8217||C===8218||C>=8219&&C<=8220||C===8221||C===8222||C===8223||C>=8224&&C<=8231||C>=8240&&C<=8248||C===8249||C===8250||C>=8251&&C<=8254||C>=8257&&C<=8259||C===8260||C===8261||C===8262||C>=8263&&C<=8273||C===8274||C===8275||C>=8277&&C<=8286||C>=8592&&C<=8596||C>=8597&&C<=8601||C>=8602&&C<=8603||C>=8604&&C<=8607||C===8608||C>=8609&&C<=8610||C===8611||C>=8612&&C<=8613||C===8614||C>=8615&&C<=8621||C===8622||C>=8623&&C<=8653||C>=8654&&C<=8655||C>=8656&&C<=8657||C===8658||C===8659||C===8660||C>=8661&&C<=8691||C>=8692&&C<=8959||C>=8960&&C<=8967||C===8968||C===8969||C===8970||C===8971||C>=8972&&C<=8991||C>=8992&&C<=8993||C>=8994&&C<=9e3||C===9001||C===9002||C>=9003&&C<=9083||C===9084||C>=9085&&C<=9114||C>=9115&&C<=9139||C>=9140&&C<=9179||C>=9180&&C<=9185||C>=9186&&C<=9254||C>=9255&&C<=9279||C>=9280&&C<=9290||C>=9291&&C<=9311||C>=9472&&C<=9654||C===9655||C>=9656&&C<=9664||C===9665||C>=9666&&C<=9719||C>=9720&&C<=9727||C>=9728&&C<=9838||C===9839||C>=9840&&C<=10087||C===10088||C===10089||C===10090||C===10091||C===10092||C===10093||C===10094||C===10095||C===10096||C===10097||C===10098||C===10099||C===10100||C===10101||C>=10132&&C<=10175||C>=10176&&C<=10180||C===10181||C===10182||C>=10183&&C<=10213||C===10214||C===10215||C===10216||C===10217||C===10218||C===10219||C===10220||C===10221||C===10222||C===10223||C>=10224&&C<=10239||C>=10240&&C<=10495||C>=10496&&C<=10626||C===10627||C===10628||C===10629||C===10630||C===10631||C===10632||C===10633||C===10634||C===10635||C===10636||C===10637||C===10638||C===10639||C===10640||C===10641||C===10642||C===10643||C===10644||C===10645||C===10646||C===10647||C===10648||C>=10649&&C<=10711||C===10712||C===10713||C===10714||C===10715||C>=10716&&C<=10747||C===10748||C===10749||C>=10750&&C<=11007||C>=11008&&C<=11055||C>=11056&&C<=11076||C>=11077&&C<=11078||C>=11079&&C<=11084||C>=11085&&C<=11123||C>=11124&&C<=11125||C>=11126&&C<=11157||C===11158||C>=11159&&C<=11263||C>=11776&&C<=11777||C===11778||C===11779||C===11780||C===11781||C>=11782&&C<=11784||C===11785||C===11786||C===11787||C===11788||C===11789||C>=11790&&C<=11798||C===11799||C>=11800&&C<=11801||C===11802||C===11803||C===11804||C===11805||C>=11806&&C<=11807||C===11808||C===11809||C===11810||C===11811||C===11812||C===11813||C===11814||C===11815||C===11816||C===11817||C>=11818&&C<=11822||C===11823||C>=11824&&C<=11833||C>=11834&&C<=11835||C>=11836&&C<=11839||C===11840||C===11841||C===11842||C>=11843&&C<=11855||C>=11856&&C<=11857||C===11858||C>=11859&&C<=11903||C>=12289&&C<=12291||C===12296||C===12297||C===12298||C===12299||C===12300||C===12301||C===12302||C===12303||C===12304||C===12305||C>=12306&&C<=12307||C===12308||C===12309||C===12310||C===12311||C===12312||C===12313||C===12314||C===12315||C===12316||C===12317||C>=12318&&C<=12319||C===12320||C===12336||C===64830||C===64831||C>=65093&&C<=65094}function F2(C){C.forEach(function(H){if(delete H.location,j1(H)||q1(H))for(var V in H.options)delete H.options[V].location,F2(H.options[V].value);else W1(H)&&X1(H.style)||($1(H)||Q1(H))&&k1(H.style)?delete H.style.location:K1(H)&&F2(H.children)})}function k5(C,H){H===void 0&&(H={}),H=x({shouldParseSkeletons:!0,requiresOtherClause:!0},H);var V=new b5(C,H).parse();if(V.err){var L=SyntaxError(s[V.err.kind]);throw L.location=V.err.location,L.originalMessage=V.err.message,L}return H?.captureLocation||F2(V.val),V.val}function T1(C,H){var V=H&&H.cache?H.cache:Z7,L=H&&H.serializer?H.serializer:c7,e=H&&H.strategy?H.strategy:v7;return e(C,{cache:V,serializer:L})}function s7(C){return C==null||typeof C=="number"||typeof C=="boolean"}function w5(C,H,V,L){var e=s7(L)?L:V(L),r=H.get(e);return typeof r>"u"&&(r=C.call(this,L),H.set(e,r)),r}function T5(C,H,V){var L=Array.prototype.slice.call(arguments,3),e=V(L),r=H.get(e);return typeof r>"u"&&(r=C.apply(this,L),H.set(e,r)),r}function D2(C,H,V,L,e){return V.bind(H,C,L,e)}function v7(C,H){var V=C.length===1?w5:T5;return D2(C,this,V,H.cache.create(),H.serializer)}function x7(C,H){return D2(C,this,T5,H.cache.create(),H.serializer)}function u7(C,H){return D2(C,this,w5,H.cache.create(),H.serializer)}var c7=function(){return JSON.stringify(arguments)};function N2(){this.cache=Object.create(null)}N2.prototype.get=function(C){return this.cache[C]};N2.prototype.set=function(C,H){this.cache[C]=H};var Z7={create:function(){return new N2}},J1={variadic:x7,monadic:u7};var i1;(function(C){C.MISSING_VALUE="MISSING_VALUE",C.INVALID_VALUE="INVALID_VALUE",C.MISSING_INTL_API="MISSING_INTL_API"})(i1||(i1={}));var B1=(function(C){_1(H,C);function H(V,L,e){var r=C.call(this,V)||this;return r.code=L,r.originalMessage=e,r}return H.prototype.toString=function(){return"[formatjs Error: ".concat(this.code,"] ").concat(this.message)},H})(Error);var I2=(function(C){_1(H,C);function H(V,L,e,r){return C.call(this,'Invalid values for "'.concat(V,'": "').concat(L,'". Options are "').concat(Object.keys(e).join('", "'),'"'),i1.INVALID_VALUE,r)||this}return H})(B1);var B5=(function(C){_1(H,C);function H(V,L,e){return C.call(this,'Value for "'.concat(V,'" must be of type ').concat(L),i1.INVALID_VALUE,e)||this}return H})(B1);var P5=(function(C){_1(H,C);function H(V,L){return C.call(this,'The intl string context variable "'.concat(V,'" was not provided to the string "').concat(L,'"'),i1.MISSING_VALUE,L)||this}return H})(B1);var _;(function(C){C[C.literal=0]="literal",C[C.object=1]="object"})(_||(_={}));function h7(C){return C.length<2?C:C.reduce(function(H,V){var L=H[H.length-1];return!L||L.type!==_.literal||V.type!==_.literal?H.push(V):L.value+=V.value,H},[])}function S7(C){return typeof C=="function"}function P1(C,H,V,L,e,r,M){if(C.length===1&&_2(C[0]))return[{type:_.literal,value:C[0].value}];for(var t=[],a=0,A=C;a<A.length;a++){var n=A[a];if(_2(n)){t.push({type:_.literal,value:n.value});continue}if(n5(n)){typeof r=="number"&&t.push({type:_.literal,value:V.getNumberFormat(H).format(r)});continue}var l=n.value;if(!(e&&l in e))throw new P5(l,M);var m=e[l];if(A5(n)){(!m||typeof m=="string"||typeof m=="number")&&(m=typeof m=="string"||typeof m=="number"?String(m):""),t.push({type:typeof m=="string"?_.literal:_.object,value:m});continue}if($1(n)){var Z=typeof n.style=="string"?L.date[n.style]:k1(n.style)?n.style.parsedOptions:void 0;t.push({type:_.literal,value:V.getDateTimeFormat(H,Z).format(m)});continue}if(Q1(n)){var Z=typeof n.style=="string"?L.time[n.style]:k1(n.style)?n.style.parsedOptions:L.time.medium;t.push({type:_.literal,value:V.getDateTimeFormat(H,Z).format(m)});continue}if(W1(n)){var Z=typeof n.style=="string"?L.number[n.style]:X1(n.style)?n.style.parsedOptions:void 0;Z&&Z.scale&&(m=m*(Z.scale||1)),t.push({type:_.literal,value:V.getNumberFormat(H,Z).format(m)});continue}if(K1(n)){var b=n.children,w=n.value,C1=e[w];if(!S7(C1))throw new B5(w,"function",M);var v1=P1(b,H,V,L,e,r),o1=C1(v1.map(function(H1){return H1.value}));Array.isArray(o1)||(o1=[o1]),t.push.apply(t,o1.map(function(H1){return{type:typeof H1=="string"?_.literal:_.object,value:H1}}))}if(j1(n)){var R=n.options[m]||n.options.other;if(!R)throw new I2(n.value,m,Object.keys(n.options),M);t.push.apply(t,P1(R.value,H,V,L,e));continue}if(q1(n)){var R=n.options["=".concat(m)];if(!R){if(!Intl.PluralRules)throw new B1(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`,i1.MISSING_INTL_API,M);var x1=V.getPluralRules(H,{type:n.pluralType}).select(m-(n.offset||0));R=n.options[x1]||n.options.other}if(!R)throw new I2(n.value,m,Object.keys(n.options),M);t.push.apply(t,P1(R.value,H,V,L,e,m-(n.offset||0)));continue}}return h7(t)}function g7(C,H){return H?x(x(x({},C||{}),H||{}),Object.keys(C).reduce(function(V,L){return V[L]=x(x({},C[L]),H[L]||{}),V},{})):C}function f7(C,H){return H?Object.keys(C).reduce(function(V,L){return V[L]=g7(C[L],H[L]),V},x({},C)):C}function z2(C){return{create:function(){return{get:function(H){return C[H]},set:function(H,V){C[H]=V}}}}}function O7(C){return C===void 0&&(C={number:{},dateTime:{},pluralRules:{}}),{getNumberFormat:T1(function(){for(var H,V=[],L=0;L<arguments.length;L++)V[L]=arguments[L];return new((H=Intl.NumberFormat).bind.apply(H,U1([void 0],V,!1)))},{cache:z2(C.number),strategy:J1.variadic}),getDateTimeFormat:T1(function(){for(var H,V=[],L=0;L<arguments.length;L++)V[L]=arguments[L];return new((H=Intl.DateTimeFormat).bind.apply(H,U1([void 0],V,!1)))},{cache:z2(C.dateTime),strategy:J1.variadic}),getPluralRules:T1(function(){for(var H,V=[],L=0;L<arguments.length;L++)V[L]=arguments[L];return new((H=Intl.PluralRules).bind.apply(H,U1([void 0],V,!1)))},{cache:z2(C.pluralRules),strategy:J1.variadic})}}var E5=(function(){function C(H,V,L,e){var r=this;if(V===void 0&&(V=C.defaultLocale),this.formatterCache={number:{},dateTime:{},pluralRules:{}},this.format=function(M){var t=r.formatToParts(M);if(t.length===1)return t[0].value;var a=t.reduce(function(A,n){return!A.length||n.type!==_.literal||typeof A[A.length-1]!="string"?A.push(n.value):A[A.length-1]+=n.value,A},[]);return a.length<=1?a[0]||"":a},this.formatToParts=function(M){return P1(r.ast,r.locales,r.formatters,r.formats,M,void 0,r.message)},this.resolvedOptions=function(){return{locale:r.resolvedLocale.toString()}},this.getAst=function(){return r.ast},this.locales=V,this.resolvedLocale=C.resolveLocale(V),typeof H=="string"){if(this.message=H,!C.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");this.ast=C.__parse(H,{ignoreTag:e?.ignoreTag,locale:this.resolvedLocale})}else this.ast=H;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=f7(C.formats,L),this.formatters=e&&e.formatters||O7(this.formatterCache)}return Object.defineProperty(C,"defaultLocale",{get:function(){return C.memoizedDefaultLocale||(C.memoizedDefaultLocale=new Intl.NumberFormat().resolvedOptions().locale),C.memoizedDefaultLocale},enumerable:!1,configurable:!0}),C.memoizedDefaultLocale=null,C.resolveLocale=function(H){var V=Intl.NumberFormat.supportedLocalesOf(H);return V.length>0?new Intl.Locale(V[0]):new Intl.Locale(typeof H=="string"?H:H[0])},C.__parse=k5,C.formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},C})();var R5=E5;var N={en:c2,de:Z2,es:h2,fr:S2,it:g2,nl:f2,pl:O2,"pt-BR":y2};function y7(C){let H=C.replace(/['"]+/g,"");if(N[H])return N[H];let V=H.split("-")[0];if(N[V])return N[V];let L=Object.keys(N).find(e=>e.startsWith(V+"-"));return L?N[L]:N.en}function i(C,H,...V){var L;try{L=C.split(".").reduce((r,M)=>r[M],y7(H))}catch{L=C.split(".").reduce((M,t)=>M[t],N.en)}if(L===void 0&&(L=C.split(".").reduce((r,M)=>r[M],N.en)),!V.length)return L;let e={};for(let r=0;r<V.length;r+=2){let M=V[r];M=M.replace(/^{([^}]+)?}$/,"$1"),e[M]=V[r+1]}try{return new R5(L,H).format(e)}catch(r){return"Translation "+r}}var F5=async()=>{await customElements.whenDefined("partial-panel-resolver"),await document.createElement("partial-panel-resolver")._getRoutes([{component_name:"config",url_path:"a"}])?.routes?.a?.load?.(),await customElements.whenDefined("ha-panel-config");let V=document.createElement("ha-panel-config");await V?.routerOptions?.routes?.dashboard?.load?.(),await V?.routerOptions?.routes?.general?.load?.(),await V?.routerOptions?.routes?.entities?.load?.(),await V?.routerOptions?.routes?.labels?.load?.(),await customElements.whenDefined("ha-config-dashboard")};var D5,N5;var E1=function(C,H){return b7(H).format(C)},b7=function(C){return new Intl.DateTimeFormat(C.language,{year:"numeric",month:"numeric",day:"numeric"})};(function(C){C.language="language",C.system="system",C.comma_decimal="comma_decimal",C.decimal_comma="decimal_comma",C.space_comma="space_comma",C.none="none"})(D5||(D5={})),(function(C){C.language="language",C.system="system",C.am_pm="12",C.twenty_four="24"})(N5||(N5={}));var I5=function(C,H,V,L){L=L||{},V=V??{};var e=new Event(H,{bubbles:L.bubbles===void 0||L.bubbles,cancelable:!!L.cancelable,composed:L.composed===void 0||L.composed});return e.detail=V,C.dispatchEvent(e),e};var f=(C,H)=>{I5(C,"hass-notification",{message:H})};var k=O`
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
`;var d1=C=>{let[H]=C.split("T"),[V,L,e]=H.split("-").map(Number);return new Date(V,L-1,e)},p1=C=>{let H=C.trigger_type??"time";return H==="time"||H==="date"},R1=C=>`${C.progress_current??0} / ${C.progress_target??0}`,G2=(C,H,V)=>{let L=C===1?H.slice(0,-1):H;return`${C} ${i(`intervals.${L}`,V)}`},z5=(C,H)=>{let V=C.trigger_type??"time";return V==="count"?i("intervals.every_uses",H,"{value}",String(C.count_threshold??0)):V==="runtime"?i("intervals.every_runtime",H,"{value}",String(C.runtime_threshold??0)):G2(C.interval_value,C.interval_type,H)};var G5=(C,H,V,L)=>{let e=V.trim().toLowerCase();if(!e&&!L.length)return C;let r=new Map;return L.length&&H.forEach(M=>r.set(M.unique_id,M.labels)),C.filter(M=>{if(e&&!`${M.title}
${M.description??""}
${M.group_id??""}`.toLowerCase().includes(e))return!1;if(L.length){let t=r.get(M.id)??[];if(!L.some(a=>t.includes(a)))return!1}return!0})},Y1=class{constructor(H,V){this._fn=H;this._ms=V}schedule(){this.cancel(),this._timer=setTimeout(()=>{this._timer=void 0,this._fn()},this._ms)}cancel(){this._timer!==void 0&&clearTimeout(this._timer),this._timer=void 0}};var C2=["days","weeks","months","years"],U5={days:1,weeks:7,months:30,years:365},W5=500;function $5(C){return{days:i("intervals.days",C),weeks:i("intervals.weeks",C),months:i("intervals.months",C),years:i("intervals.years",C)}}var _7=["title","description","interval_value","interval_type","last_performed","icon","group_id"],Q5=C=>{let H=[],V=[],L="",e=!1,r=0,M=()=>{V.push(L),L=""},t=()=>{M(),V.some(a=>a.trim()!=="")&&H.push(V),V=[]};for(;r<C.length;){let a=C[r];if(e){if(a==='"'){if(C[r+1]==='"'){L+='"',r+=2;continue}e=!1,r+=1;continue}L+=a,r+=1;continue}if(a==='"'&&L===""){e=!0,r+=1;continue}if(a===","){M(),r+=1;continue}if(a===`
`||a==="\r"){a==="\r"&&C[r+1]===`
`&&(r+=1),t(),r+=1;continue}L+=a,r+=1}return(L!==""||V.length)&&t(),H},k7=/^\d{4}-\d{2}-\d{2}$/,j5=C=>{if(!C.length)return{tasks:[],errors:["The file is empty."]};let H=C[0].map(e=>e.trim().toLowerCase());if(!H.includes("title"))return{tasks:[],errors:['The header row must include a "title" column.']};let V=[],L=[];return C.slice(1).forEach((e,r)=>{let M=r+2,t=b=>{let w=H.indexOf(b);return w>=0?(e[w]??"").trim():""},a=t("title");if(!a){L.push(`Line ${M}: missing title.`);return}let A=t("interval_value"),n=A===""?30:Number(A);if(!Number.isFinite(n)||n<1){L.push(`Line ${M}: invalid interval_value "${A}".`);return}let l=t("interval_type").toLowerCase(),m=l===""?"days":l;if(!C2.includes(m)){L.push(`Line ${M}: invalid interval_type "${l}".`);return}let Z=t("last_performed");if(Z&&!k7.test(Z)){L.push(`Line ${M}: last_performed must be YYYY-MM-DD.`);return}V.push({title:a,description:t("description")||void 0,interval_value:Math.floor(n),interval_type:m,last_performed:Z||void 0,icon:t("icon")||void 0,group_id:t("group_id")||void 0})}),{tasks:V,errors:L}},w7=C=>{let H=/^[=+\-@\t]/.test(C)?`'${C}`:C;return/[",\n\r]/.test(H)?`"${H.replace(/"/g,'""')}"`:H},q5=C=>{let H=[_7.join(",")];return C.forEach(V=>{H.push([V.title,V.description??"",String(V.interval_value),V.interval_type,V.last_performed?V.last_performed.split("T")[0]:"",V.icon??"",V.group_id??""].map(w7).join(","))}),H.join(`\r
`)+`\r
`};var K5=C=>C.callWS({type:"config/entity_registry/list"}),X5=C=>C.callWS({type:"config/label_registry/list"}),J5=C=>C.callWS({type:"home_maintenance/get_tasks"}),Y5=(C,H)=>C.callWS({type:"home_maintenance/get_task",task_id:H}),H2=(C,H)=>C.callWS({type:"home_maintenance/add_task",...H}),C3=(C,H)=>C.callWS({type:"home_maintenance/remove_task",task_id:H}),H3=(C,H,V)=>C.callWS({type:"home_maintenance/complete_task",task_id:H,...V?{note:V}:{}}),V2=(C,H)=>C.callWS({type:"home_maintenance/update_task",...H}),V3=C=>C.callWS({type:"home_maintenance/get_groups"}),L3=(C,H)=>C.callWS({type:"home_maintenance/create_group",group_id:H}),e3=(C,H,V)=>C.callWS({type:"home_maintenance/rename_group",old_group_id:H,new_group_id:V}),r3=(C,H)=>C.callWS({type:"home_maintenance/delete_group",group_id:H}),M3=C=>C.callWS({type:"home_maintenance/get_config"}),t3=(C,H)=>C.connection.subscribeMessage(H,{type:"home_maintenance/subscribe_updates"});var T7=(C,H)=>{let V=C.language,L=p1(H),e=L?z5(H,V):R1(H);return{heading:i("panel.dialog.confirm_complete.title",V),message:i(L?"panel.dialog.confirm_complete.message":"panel.dialog.confirm_complete.message_progress",V,"{title}",H.title,"{interval}",e),confirmLabel:i("panel.dialog.confirm_complete.actions.confirm",V),cancelLabel:i("common.cancel",V),input:{label:i("panel.dialog.confirm_complete.note_label",V)},onConfirm:()=>{}}},i3=(C,H,V,L,e=r=>r())=>{let r=V.language;H?.open({...T7(V,L),onConfirm:M=>e(async()=>{try{await H3(V,L.id,M),f(C,i("panel.cards.current.alerts.complete_success",r,"{title}",L.title))}catch(t){console.error("Failed to complete task:",t),f(C,i("panel.cards.current.alerts.complete_error",r))}})})},a3=(C,H,V,L,e)=>{let r=V.language;H?.open({heading:i("panel.dialog.confirm_remove.title",r),message:i("panel.dialog.confirm_remove.message",r,"{title}",L?.title??""),confirmLabel:i("panel.dialog.confirm_remove.actions.confirm",r),cancelLabel:i("common.cancel",r),destructive:!0,onConfirm:async()=>{try{await C3(V,e)}catch(M){console.error("Failed to remove task:",M),f(C,i("panel.cards.current.alerts.remove_error",r))}}})};var o3="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";var A3="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z";var n3="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";var d3="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var p3="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var F1=class extends g{constructor(){super();this.items=[]}render(){return d`
            <ha-dropdown @wa-select=${this._handleMenuAction}>
                <ha-icon-button slot="trigger">
                    <ha-icon icon="mdi:dots-vertical"></ha-icon>
                </ha-icon-button>
                ${this.items.map(V=>d`
                    <ha-dropdown-item value="${V.value}">
                        <span>${V.label}</span>
                        <ha-icon slot="icon" icon="${V.icon}"></ha-icon>
                    </ha-dropdown-item>
                `)}
            </ha-dropdown>
        `}_handleMenuAction(V){let L=V.detail.item.value;this.dispatchEvent(new CustomEvent("menu-action",{detail:{action:L},bubbles:!0,composed:!0}))}static get styles(){return O`
            ha-icon-button ha-icon {
                display: flex;
            }
            span {
                white-space: nowrap;
                padding-right: 1em;
            }
        `}};p([c()],F1.prototype,"hass",2),p([c()],F1.prototype,"items",2);customElements.get("hm-task-menu")||customElements.define("hm-task-menu",F1);var B7=new Date(9999,0,1),B=class extends g{constructor(){super(...arguments);this.tasks=[];this.groups=[];this.registry=[];this.labelRegistry=[];this.hideEmptyGroups=!1}get _columns(){return{icon:{title:"",moveable:!1,showNarrow:!1,label:"icon",type:"icon",template:V=>V.icon?d`<ha-icon .icon=${V.icon}></ha-icon>`:v},tagIcon:{title:"",moveable:!1,showNarrow:!1,label:"tag",type:"icon",template:V=>V.tagIcon?d`<ha-icon .icon=${V.tagIcon}></ha-icon>`:v},title:{title:"Title",main:!0,showNarrow:!0,sortable:!0,filterable:!0,grows:!0,extraTemplate:V=>{let L=this._taskLabels.get(V.id);return L?.length?d`<ha-data-table-labels .labels=${L}></ha-data-table-labels>`:v}},interval_days:{title:"Interval",showNarrow:!1,sortable:!0,minWidth:"100px",maxWidth:"100px",template:V=>p1(V)?G2(V.interval_value,V.interval_type,this.hass.language):R1(V)},last_performed:{title:"Last Performed",showNarrow:!1,sortable:!0,minWidth:"150px",maxWidth:"150px",template:V=>!p1(V)||!V.last_performed?"-":E1(d1(V.last_performed),this.hass.locale)},next_due:{title:i("panel.cards.current.next",this.hass.language),showNarrow:!0,sortable:!0,direction:"asc",minWidth:"100px",maxWidth:"100px",template:V=>{let L=V.due?"color: var(--error-color, red); font-weight: bold;":"";return p1(V)?V.next_due_date?d`
                        <span style=${L}>
                            ${E1(V.next_due_date,this.hass.locale)}
                        </span>`:"\u2014":d`
                            <span style=${L}>
                                ${R1(V)}
                            </span>`}},complete:{minWidth:"64px",maxWidth:"64px",sortable:!1,groupable:!1,showNarrow:!0,moveable:!1,hideable:!1,type:"overflow",template:V=>d`
                <ha-icon-button
                    @click=${()=>this._dispatch("task-complete",V.id)}
                    .label="Complete"
                    title="Mark Task Complete"
                    .path=${A3}
                ></ha-icon-button>
              `},actions:{title:"",width:"80px",showNarrow:!0,moveable:!1,hideable:!1,type:"overflow-menu",template:V=>d`
                    <hm-task-menu
                        .hass=${this.hass}
                        .items=${[{value:"edit",label:i("panel.cards.current.actions.edit",this.hass.language),icon:"mdi:pencil"},{value:"move",label:i("panel.cards.current.actions.move",this.hass.language),icon:"mdi:folder-move-outline"},{value:"delete",label:i("panel.cards.current.actions.remove",this.hass.language),icon:"mdi:delete"}]}
                    @menu-action=${L=>this._dispatch("task-menu-action",V.id,L.detail.action)}
                    ></hm-task-menu>
                `}}}get _columnsToDisplay(){let V=this.hass.language;if(this._columnsCache&&this._columnsCache.narrow===this.narrow&&this._columnsCache.language===V)return this._columnsCache.columns;let L=Object.fromEntries(Object.entries(this._columns).filter(([e,r])=>this.narrow?r.showNarrow!==!1:!0));return this._columnsCache={narrow:this.narrow,language:V,columns:L},L}get _taskLabels(){let V=this._labelMapCache;if(V&&V.registry===this.registry&&V.labelRegistry===this.labelRegistry)return V.map;let L=new Map(this.labelRegistry.map(r=>[r.label_id,r])),e=new Map;return this.registry.forEach(r=>{if(r.labels.length){let M=r.labels.map(t=>L.get(t)).filter(t=>!!t);M.length&&e.set(r.unique_id,M)}}),this._labelMapCache={registry:this.registry,labelRegistry:this.labelRegistry,map:e},e}get _rows(){if(this._rowsCache?.tasks===this.tasks)return this._rowsCache.rows;let V=this.tasks.map(L=>this._taskToRow(L));return this._rowsCache={tasks:this.tasks,rows:V},V}_taskToRow(V){return{...V,trigger_type:V.trigger_type??"time",interval_days:this._intervalSortKey(V),next_due_date:V.next_due?d1(V.next_due):null,next_due:this._dueSortKey(V),tagIcon:V.tag_id&&V.tag_id.trim()!==""?"mdi:tag":void 0}}get _sections(){if(this._sectionsCache?.tasks===this.tasks&&this._sectionsCache?.groups===this.groups&&this._sectionsCache?.hideEmpty===this.hideEmptyGroups)return this._sectionsCache.sections;let V=new Map;this.groups.forEach(M=>V.set(M,[])),V.set("",[]),this.tasks.forEach(M=>{let t=M.group_id?.trim()||"";V.has(t)||V.set(t,[]),V.get(t).push(this._taskToRow(M))});let L=[...V.keys()].filter(M=>M!=="").sort((M,t)=>M.localeCompare(t)),e=V.get(""),r=[...e.length?[{title:i("common.ungrouped",this.hass.language),rows:e}]:[],...L.map(M=>({title:M,rows:V.get(M)}))];return this.hideEmptyGroups&&(r=r.filter(M=>M.rows.length>0)),this._sectionsCache={tasks:this.tasks,groups:this.groups,hideEmpty:this.hideEmptyGroups,sections:r},r}_intervalSortKey(V){if(V.trigger_type==="count"||V.trigger_type==="runtime")return V.progress_target?V.progress_target-(V.progress_current??0):Number.MAX_SAFE_INTEGER;let L=U5[V.interval_type];return L?V.interval_value*L:Number.MAX_SAFE_INTEGER}_dueSortKey(V){return V.next_due?d1(V.next_due):V.due?new Date(0):B7}_dispatch(V,L,e){this.dispatchEvent(new CustomEvent(V,{detail:{taskId:L,action:e},bubbles:!0,composed:!0}))}render(){return this.hass?(!this.tasks||this.tasks.length===0)&&this.groups.length===0?d`<span>${i("common.no_tasks",this.hass.language)}</span>`:this.groups.length===0?d`
                <div class="table-wrapper">
                    <ha-data-table
                        .hass=${this.hass}
                        .columns=${this._columnsToDisplay}
                        .data=${this._rows}
                        .narrow=${this.narrow}
                        auto-height
                        id="tasks-table"
                        class="tasks-table"
                        clickable
                    >
                    </ha-data-table>
                </div>
            `:d`
            <div class="table-wrapper">
                ${this._sections.map(V=>d`
                    <div class="group-section">
                        <div class="group-header">
                            <span class="group-title">${V.title}</span>
                            <span class="group-count">${V.rows.length}</span>
                        </div>
                        ${V.rows.length?d`
                            <ha-data-table
                                .hass=${this.hass}
                                .columns=${this._columnsToDisplay}
                                .data=${V.rows}
                                .narrow=${this.narrow}
                                auto-height
                                class="tasks-table"
                                clickable
                            >
                            </ha-data-table>
                        `:d`
                            <span class="secondary">${i("common.no_tasks",this.hass.language)}</span>
                        `}
                    </div>
                `)}
            </div>
        `:d``}};B.styles=k,p([c()],B.prototype,"hass",2),p([c()],B.prototype,"narrow",2),p([c({attribute:!1})],B.prototype,"tasks",2),p([c({attribute:!1})],B.prototype,"groups",2),p([c({attribute:!1})],B.prototype,"registry",2),p([c({attribute:!1})],B.prototype,"labelRegistry",2),p([c({attribute:!1})],B.prototype,"hideEmptyGroups",2);customElements.get("hm-task-table")||customElements.define("hm-task-table",B);var L2=C=>Object.keys(C.services?.notify??{}).filter(H=>H!=="notify").map(H=>`notify.${H}`).sort((H,V)=>H.localeCompare(V)),J=C=>customElements.get("ha-dialog-footer")?d`<ha-dialog-footer slot="footer">${C}</ha-dialog-footer>`:C,l3=(C,H,V)=>C?.length?d`
        <ul class="history-list">
            ${C.slice(-H).reverse().map(L=>d`
                <li>
                    ${E1(d1(L.performed),V)}${L.note?d` — <span class="history-note">${L.note}</span>`:v}
                </li>
            `)}
        </ul>
    `:v,m3=O`
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
`;var s3=(C,H,V,L)=>{try{return i(`${C.keyPrefix}.${H}.${V}`,C.hass.language)??L}catch{return L}},e2=(C,H)=>d`
    <div class="field ${H.name}">
        <div class="field-label">
            ${s3(C,H.name,"heading",H.name)}${H.required?" *":""}
        </div>
        <ha-selector
            .hass=${C.hass}
            .selector=${H.selector}
            .value=${C.data[H.name]}
            .helper=${s3(C,H.name,"helper","")}
            .required=${H.required??!1}
            @value-changed=${V=>C.onChange(H.name,V)}
        ></ha-selector>
    </div>
`,r2=O`
    .fields-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
        column-gap: 8px;
        row-gap: 16px;
        align-items: start;
    }

    .field-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .field ha-selector {
        display: block;
        width: 100%;
    }

    /* Description spans the full line below the other fields. */
    .field.description {
        grid-column: 1 / -1;
    }
`;var l1=()=>({title:"",trigger_type:"time",interval_value:"",interval_type:"days",last_performed:"",anchor_date:"",active_months:[],icon:"",label:[],tag:"",count_entity_id:"",count_threshold:"",runtime_entity_id:"",runtime_threshold:"",area:"",description:"",group_id:"",notifications_enabled:!1,notification_target:"",notification_time:"09:00",notification_url:"",notify_when:"due_and_overdue",notify_days_before_due:""}),x3=(C,H,V)=>({title:C.title,trigger_type:C.trigger_type??"time",interval_value:C.interval_value,interval_type:C.interval_type,last_performed:C.last_performed??"",anchor_date:C.anchor_date??"",active_months:(C.active_months??[]).map(String),icon:C.icon??"",label:V.map(L=>L.label_id),tag:C.tag_id??"",count_entity_id:C.count_entity_id??"",count_threshold:C.count_threshold??"",runtime_entity_id:C.runtime_entity_id??"",runtime_threshold:C.runtime_threshold??"",area:H?.area_id??"",description:C.description??"",group_id:C.group_id??"",notifications_enabled:C.notifications_enabled??!1,notification_target:C.notification_target??"",notification_time:C.notification_time??"09:00",notification_url:C.notification_url??"",notify_when:C.notify_when??"due_and_overdue",notify_days_before_due:C.notify_days_before_due??""}),P7=C=>({name:"trigger_type",required:!0,selector:{select:{options:[{value:"time",label:i("trigger_types.time",C)},{value:"date",label:i("trigger_types.date",C)},{value:"count",label:i("trigger_types.count",C)},{value:"runtime",label:i("trigger_types.runtime",C)}],mode:"dropdown"}}}),E7=C=>{let H;try{H=new Intl.DateTimeFormat(C,{month:"long"})}catch{H=new Intl.DateTimeFormat("en",{month:"long"})}return Array.from({length:12},(V,L)=>({value:String(L+1),label:H.format(new Date(2026,L,1,12))}))},R7=C=>({name:"active_months",selector:{select:{options:E7(C),multiple:!0,mode:"dropdown"}}}),v3=C=>({name:"interval_type",required:!0,selector:{select:{options:C2.map(H=>({value:H,label:$5(C)[H]})),mode:"dropdown"}}}),F7=(C,H)=>C.trigger_type==="date"?[{name:"anchor_date",required:!0,selector:{date:{}}},{name:"interval_value",required:!0,selector:{number:{min:1,mode:"box"}}},v3(H)]:C.trigger_type==="count"?[{name:"count_entity_id",required:!0,selector:{entity:{}}},{name:"count_threshold",required:!0,selector:{number:{min:1,mode:"box"}}}]:C.trigger_type==="runtime"?[{name:"runtime_entity_id",required:!0,selector:{entity:{filter:{domain:"sensor"}}}},{name:"runtime_threshold",required:!0,selector:{number:{min:.1,step:.1,mode:"box"}}}]:[{name:"interval_value",required:!0,selector:{number:{min:1,mode:"box"}}},v3(H),R7(H)],U2=(C,H)=>({name:"group_id",selector:{select:{options:[{value:"",label:i("common.ungrouped",H)},...C.map(V=>({value:V,label:V}))],mode:"dropdown",custom_value:!0}}}),M2=(C,H)=>[{name:"title",required:!0,selector:{text:{}}},P7(H),...F7(C,H),{name:"last_performed",selector:{date:{}}}],t2=(C,H)=>[U2(C,H),{name:"icon",selector:{icon:{}}},{name:"tag",selector:{entity:{filter:{domain:"tag"}}}},{name:"area",selector:{area:{}}},{name:"label",selector:{label:{multiple:!0}}}],i2=C=>({name:"description",selector:{text:C?{multiline:!0}:{}}}),a2=(C,H,V)=>{let L={name:"notifications_enabled",selector:{boolean:{}}};return C.notifications_enabled?[L,{name:"notification_target",selector:{select:{options:[{value:"",label:i("common.none",V)},...H.map(e=>({value:e,label:e}))],mode:"dropdown",custom_value:!0}}},{name:"notify_when",selector:{select:{options:[{value:"due",label:i("notifications.when.due",V)},{value:"overdue",label:i("notifications.when.overdue",V)},{value:"due_and_overdue",label:i("notifications.when.due_and_overdue",V)}],mode:"dropdown"}}},...C.trigger_type==="time"||C.trigger_type==="date"?[{name:"notify_days_before_due",selector:{number:{min:1,mode:"box"}}}]:[],{name:"notification_time",selector:{time:{no_second:!0}}},{name:"notification_url",selector:{text:{}}}]:[L]},o2=C=>C.title?.trim()?C.trigger_type==="count"?!!(C.count_entity_id?.trim()&&C.count_threshold):C.trigger_type==="runtime"?!!(C.runtime_entity_id?.trim()&&C.runtime_threshold):C.trigger_type==="date"?!!(C.anchor_date?.trim()&&C.interval_value&&C.interval_type):!!(C.interval_value&&C.interval_type):!1,m1=C=>{if(!C){let a=new Date;return a.setHours(0,0,0,0),a.toISOString()}let[H,V,L]=C.split("T")[0].split("-"),e=Number(H),r=Number(V),M=Number(L);if(isNaN(e)||isNaN(r)||isNaN(M))return null;let t=new Date(e,r-1,M);return t.setHours(0,0,0,0),t.toISOString()},u3=C=>({notifications_enabled:C.notifications_enabled??!1,notification_target:C.notification_target?.trim()||null,notification_time:C.notification_time?.trim()||"09:00",notification_url:C.notification_url?.trim()||null,notify_when:C.notify_when||"due_and_overdue",notify_days_before_due:C.notify_days_before_due===""||C.notify_days_before_due==null?null:Number(C.notify_days_before_due)}),c3=C=>{let H=C.trigger_type==="count",V=C.trigger_type==="runtime",L=C.trigger_type==="date",e=!H&&!V&&!L;return{trigger_type:C.trigger_type||"time",interval_value:H||V?1:Number(C.interval_value),interval_type:H||V?"days":C.interval_type,anchor_date:L&&C.anchor_date?.trim().split("T")[0]||null,active_months:e?(C.active_months??[]).map(Number):[],count_entity_id:H&&C.count_entity_id?.trim()||null,count_threshold:H?Number(C.count_threshold):0,runtime_entity_id:V&&C.runtime_entity_id?.trim()||null,runtime_threshold:V?Number(C.runtime_threshold):0}},Z3=(C,H)=>{let V=c3(C),L=C.trigger_type==="date"&&!C.last_performed?.trim();return{title:C.title.trim(),interval_value:V.interval_value,interval_type:V.interval_type,trigger_type:V.trigger_type,...L?{}:{last_performed:H},tag_id:C.tag?.trim()||void 0,icon:C.icon?.trim()||"mdi:calendar-check",labels:C.label??[],area_id:C.area?.trim()||void 0,description:C.description||void 0,group_id:C.group_id?.trim()||void 0,...V.anchor_date?{anchor_date:V.anchor_date}:{},...V.active_months.length?{active_months:V.active_months}:{},...V.count_entity_id?{count_entity_id:V.count_entity_id,count_threshold:V.count_threshold}:{},...V.runtime_entity_id?{runtime_entity_id:V.runtime_entity_id,runtime_threshold:V.runtime_threshold}:{},...u3(C)}},h3=(C,H)=>({title:C.title.trim(),...c3(C),last_performed:H,icon:C.icon?.trim()||"mdi:calendar-check",labels:C.label,tag_id:C.tag?.trim()||null,area_id:C.area?.trim()||null,description:C.description??"",group_id:C.group_id?.trim()||null,...u3(C)});var a1=class extends g{constructor(){super(...arguments);this.groups=[];this._formData=l1();this._advancedOpen=!1;this._handleFieldChanged=(V,L)=>{L.stopPropagation(),this._formData={...this._formData,[V]:L.detail.value}};this._renderField=V=>e2({hass:this.hass,keyPrefix:"panel.cards.new.fields",data:this._formData,onChange:this._handleFieldChanged},V)}prefill(V){this._formData={...this._formData,...V}}async _handleAddTaskClick(){if(!o2(this._formData)){f(this,i("panel.cards.new.alerts.required",this.hass.language));return}let V=m1(this._formData.last_performed);if(V===null){f(this,i("common.invalid_date",this.hass.language));return}try{let L=this._formData.title.trim();await H2(this.hass,Z3(this._formData,V)),this._formData=l1(),this.dispatchEvent(new CustomEvent("task-added",{detail:{title:L},bubbles:!0,composed:!0}))}catch(L){console.error("Failed to add task:",L),f(this,i("panel.cards.new.alerts.error",this.hass.language))}}render(){return this.hass?d`
            <div class="basic-row">
                <div class="fields-grid">
                    ${M2(this._formData,this.hass.language).map(this._renderField)}
                </div>
                <ha-button size="small" class="add-button"
                    @click=${this._handleAddTaskClick}>${i("panel.cards.new.actions.add_task",this.hass.language)}
                </ha-button>
            </div>

            <ha-expansion-panel
                header="${i("panel.cards.new.sections.optional",this.hass.language)}"
                .opened=${this._advancedOpen}
                @opened-changed=${V=>this._advancedOpen=V.detail.value}
                class="extras-panel"
            >
                <div class="fields-grid">
                    ${t2(this.groups,this.hass.language).map(this._renderField)}
                    ${this._renderField(i2(!1))}
                </div>

                <div class="section-label">
                    ${i("panel.cards.new.sections.notifications",this.hass.language)}
                </div>
                <div class="fields-grid">
                    ${a2(this._formData,L2(this.hass),this.hass.language).map(this._renderField)}
                </div>
            </ha-expansion-panel>
        `:d``}};a1.styles=[k,r2,O`
        .basic-row .fields-grid {
            flex: 1 1 500px;
            min-width: 0;
        }

        .section-label {
            font-weight: 500;
            color: var(--secondary-text-color);
            margin: 20px 0 12px;
        }
    `],p([c()],a1.prototype,"hass",2),p([c({attribute:!1})],a1.prototype,"groups",2),p([h()],a1.prototype,"_formData",2);customElements.get("hm-task-form")||customElements.define("hm-task-form",a1);var P=class extends g{constructor(){super(...arguments);this.registry=[];this.labelRegistry=[];this.groups=[];this._taskId=null;this._formData=l1();this._history=[];this._handleFieldChanged=(V,L)=>{L.stopPropagation(),this._formData={...this._formData,[V]:L.detail.value}};this._renderField=V=>e2({hass:this.hass,keyPrefix:"panel.dialog.edit_task.fields",data:this._formData,onChange:this._handleFieldChanged},V)}async open(V){try{let L=await Y5(this.hass,V),e=this.registry.find(M=>M.unique_id===L.id),r=e?this.labelRegistry.filter(M=>e.labels.includes(M.label_id)):[];this._formData=x3(L,e,r),this._history=L.history??[],this._taskId=L.id}catch(L){console.error("Failed to fetch task for edit:",L)}}async _handleSaveClick(){if(!this._taskId)return;if(!o2(this._formData)){f(this,i("panel.cards.new.alerts.required",this.hass.language));return}let V=m1(this._formData.last_performed);if(V===null){f(this,i("common.invalid_date",this.hass.language));return}try{await V2(this.hass,{task_id:this._taskId,updates:h3(this._formData,V)}),this._close()}catch(L){console.error("Failed to update task:",L),f(this,i("panel.dialog.edit_task.alerts.error",this.hass.language))}}_close(){this._taskId=null,this._formData=l1(),this._history=[]}async _handleTestNotification(){let V=this.registry.find(L=>L.unique_id===this._taskId);if(V)try{await this.hass.callService("home_maintenance","send_task_notification",{entity_id:V.entity_id})}catch(L){console.error("Failed to send test notification:",L),f(this,i("panel.dialog.edit_task.alerts.test_error",this.hass.language))}}render(){if(!this.hass||!this._taskId)return d``;let V=this.hass.language;return d`
            <ha-dialog
                open
                heading="${i("panel.dialog.edit_task.title",V)}: ${this._formData.title}"
                prevent-scrim-close
                @closed=${this._close}
            >
                <div class="fields-grid">
                    ${M2(this._formData,V).map(this._renderField)}
                </div>

                <div class="section-label">
                    ${i("panel.dialog.edit_task.sections.optional",V)}
                </div>

                <div class="fields-grid">
                    ${t2(this.groups,V).map(this._renderField)}
                    ${this._renderField(i2(!0))}
                </div>

                <div class="section-label">
                    ${i("panel.dialog.edit_task.sections.notifications",V)}
                </div>

                <div class="fields-grid">
                    ${a2(this._formData,L2(this.hass),V).map(this._renderField)}
                </div>
                ${this._formData.notifications_enabled?d`
                    <ha-button
                        appearance="plain"
                        size="small"
                        class="test-notification"
                        @click=${this._handleTestNotification}
                    >
                        ${i("panel.dialog.edit_task.actions.test_notification",V)}
                    </ha-button>
                `:""}

                ${this._history.length?d`
                    <div class="section-label">
                        ${i("panel.dialog.edit_task.sections.history",V)}
                    </div>
                    <div class="history-scroll">
                        ${l3(this._history,this._history.length,this.hass.locale)}
                    </div>
                `:v}

                ${J(d`
                    <ha-button
                        data-dialog="close"
                        appearance="plain"
                        slot="secondaryAction"
                        @click=${this._close}
                    >
                        ${i("panel.dialog.edit_task.actions.cancel",V)}
                    </ha-button>
                    <ha-button slot="primaryAction" @click=${this._handleSaveClick}>
                        ${i("panel.dialog.edit_task.actions.save",V)}
                    </ha-button>
                `)}
            </ha-dialog>
        `}};P.styles=[k,r2,m3,O`
        .section-label {
            font-weight: 500;
            color: var(--secondary-text-color);
            margin: 20px 0 12px;
        }

        .test-notification {
            margin-top: 12px;
        }
    `],p([c()],P.prototype,"hass",2),p([c({attribute:!1})],P.prototype,"registry",2),p([c({attribute:!1})],P.prototype,"labelRegistry",2),p([c({attribute:!1})],P.prototype,"groups",2),p([h()],P.prototype,"_taskId",2),p([h()],P.prototype,"_formData",2),p([h()],P.prototype,"_history",2);customElements.get("hm-edit-dialog")||customElements.define("hm-edit-dialog",P);var s1=class extends g{constructor(){super(...arguments);this._opts=null}open(V){this._opts=V}_close(){this._opts=null}_handleConfirm(){let V=this._opts?.onConfirm,L=this._input?.value.trim()||void 0;this._close(),V?.(L)}_renderButtons(){return d`
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
        `}render(){return this._opts?d`
            <ha-dialog
                open
                heading="${this._opts.heading}"
                @closed=${this._close}
            >
                <p>${this._opts.message}</p>

                ${this._opts.input?d`
                    <label class="confirm-input-label">
                        ${this._opts.input.label}
                        <input
                            class="confirm-input"
                            type="text"
                            maxlength=${W5}
                            placeholder=${this._opts.input.placeholder??""}
                        />
                    </label>
                `:v}

                ${J(this._renderButtons())}
            </ha-dialog>
        `:d``}};s1.styles=[k,O`
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
    `],p([h()],s1.prototype,"_opts",2),p([T(".confirm-input")],s1.prototype,"_input",2);customElements.get("hm-confirm-dialog")||customElements.define("hm-confirm-dialog",s1);var F=class extends g{constructor(){super(...arguments);this.groups=[];this._newGroupName="";this._renamingGroup=null;this._renameValue=""}async _handleCreate(){let V=this._newGroupName.trim();if(V){if(this.groups.includes(V)){f(this,i("panel.cards.groups.alerts.exists",this.hass.language,"{title}",V));return}try{await L3(this.hass,V),this._newGroupName=""}catch(L){console.error("Failed to create group:",L),f(this,i("panel.cards.groups.alerts.error",this.hass.language))}}}_startRename(V){this._renamingGroup=V,this._renameValue=V}async _handleRename(){let V=this._renamingGroup,L=this._renameValue.trim();if(!V||!L||V===L){this._renamingGroup=null;return}if(this.groups.includes(L)){f(this,i("panel.cards.groups.alerts.exists",this.hass.language,"{title}",L));return}this._renamingGroup=null;try{await e3(this.hass,V,L)}catch(e){console.error("Failed to rename group:",e),f(this,i("panel.cards.groups.alerts.rename_error",this.hass.language))}}_handleDelete(V){let L=this.hass.language;this._confirmDialog?.open({heading:i("panel.cards.groups.confirm_delete_title",L),message:i("panel.cards.groups.confirm_delete",L,"{title}",V),confirmLabel:i("panel.cards.groups.actions.delete",L),cancelLabel:i("common.cancel",L),destructive:!0,onConfirm:()=>this._deleteGroup(V)})}async _deleteGroup(V){try{await r3(this.hass,V)}catch(L){console.error("Failed to delete group:",L),f(this,i("panel.cards.groups.alerts.delete_error",this.hass.language))}}render(){if(!this.hass)return d``;let V=this.hass.language;return d`
            <div class="group-management-row">
                <ha-selector
                    .hass=${this.hass}
                    .selector=${{text:{}}}
                    .value=${this._newGroupName}
                    .label=${i("panel.cards.groups.fields.new_group.heading",V)}
                    .required=${!1}
                    @value-changed=${L=>this._newGroupName=L.detail.value??""}
                    @keydown=${L=>L.key==="Enter"&&this._handleCreate()}
                ></ha-selector>
                <ha-button size="small" @click=${this._handleCreate}>
                    ${i("panel.cards.groups.actions.create",V)}
                </ha-button>
            </div>

            <div class="group-list">
                ${this.groups.length===0?d`<span class="secondary">${i("panel.cards.groups.empty",V)}</span>`:this.groups.map(L=>this._renamingGroup===L?d`
                        <div class="group-list-row">
                            <ha-selector
                                .hass=${this.hass}
                                .selector=${{text:{}}}
                                .value=${this._renameValue}
                                .required=${!1}
                                @value-changed=${e=>this._renameValue=e.detail.value??""}
                                @keydown=${e=>e.key==="Enter"&&this._handleRename()}
                            ></ha-selector>
                            <span class="group-actions">
                                <ha-icon-button
                                    .path=${o3}
                                    .label=${i("panel.cards.groups.actions.save",V)}
                                    @click=${this._handleRename}
                                ></ha-icon-button>
                                <ha-icon-button
                                    .path=${n3}
                                    .label=${i("panel.cards.groups.actions.cancel",V)}
                                    @click=${()=>this._renamingGroup=null}
                                ></ha-icon-button>
                            </span>
                        </div>
                    `:d`
                        <div class="group-list-row">
                            <span>${L}</span>
                            <span class="group-actions">
                                <ha-icon-button
                                    .path=${p3}
                                    .label=${i("panel.cards.groups.actions.rename",V)}
                                    @click=${()=>this._startRename(L)}
                                ></ha-icon-button>
                                <ha-icon-button
                                    .path=${d3}
                                    .label=${i("panel.cards.groups.actions.delete",V)}
                                    @click=${()=>this._handleDelete(L)}
                                ></ha-icon-button>
                            </span>
                        </div>
                    `)}
            </div>

            <hm-confirm-dialog></hm-confirm-dialog>
        `}};F.styles=k,p([c()],F.prototype,"hass",2),p([c({attribute:!1})],F.prototype,"groups",2),p([h()],F.prototype,"_newGroupName",2),p([h()],F.prototype,"_renamingGroup",2),p([h()],F.prototype,"_renameValue",2),p([T("hm-confirm-dialog")],F.prototype,"_confirmDialog",2);customElements.get("hm-group-manager")||customElements.define("hm-group-manager",F);var Y=class extends g{constructor(){super(...arguments);this.groups=[];this._task=null;this._groupId=""}open(V){this._task=V,this._groupId=V.group_id??""}_close(){this._task=null}async _handleMove(){if(this._task)try{await V2(this.hass,{task_id:this._task.id,updates:{group_id:this._groupId?.trim()||null}}),this._close()}catch(V){console.error("Failed to move task:",V)}}render(){if(!this.hass||!this._task)return d``;let V=this.hass.language;return d`
            <ha-dialog
                open
                heading="${i("panel.dialog.move_task.title",V)}: ${this._task.title}"
                @closed=${this._close}
            >
                <ha-form
                    .hass=${this.hass}
                    .schema=${[U2(this.groups,V)]}
                    .computeLabel=${()=>i("panel.dialog.move_task.fields.group_id.heading",V)}
                    .data=${{group_id:this._groupId}}
                    @value-changed=${L=>this._groupId=L.detail.value.group_id??""}
                ></ha-form>

                ${J(d`
                    <ha-button
                        data-dialog="close"
                        appearance="plain"
                        slot="secondaryAction"
                        @click=${this._close}
                    >
                        ${i("panel.dialog.move_task.actions.cancel",V)}
                    </ha-button>
                    <ha-button slot="primaryAction" @click=${this._handleMove}>
                        ${i("panel.dialog.move_task.actions.move",V)}
                    </ha-button>
                `)}
            </ha-dialog>
        `}};Y.styles=k,p([c()],Y.prototype,"hass",2),p([c({attribute:!1})],Y.prototype,"groups",2),p([h()],Y.prototype,"_task",2),p([h()],Y.prototype,"_groupId",2);customElements.get("hm-move-dialog")||customElements.define("hm-move-dialog",Y);var S3=["hvac","plumbing","electrical","appliances","interior","exterior","yard","safety","vehicles"],o=(C,H,V,L,e,r)=>({category:C,title:H,description:V,interval_value:L,interval_type:e,icon:r}),W2=[o("hvac","Replace HVAC filter","Replace the furnace/air-handler filter; check size and MERV rating.",3,"months","mdi:air-filter"),o("hvac","Service furnace","Annual professional furnace inspection and tune-up before heating season.",1,"years","mdi:fire"),o("hvac","Service air conditioner","Annual professional A/C inspection and refrigerant check before cooling season.",1,"years","mdi:air-conditioner"),o("hvac","Clean A/C condenser coils","Rinse debris from the outdoor condenser unit and clear vegetation around it.",6,"months","mdi:hvac"),o("hvac","Clean air vents and registers","Vacuum supply and return registers; check for blockages.",6,"months","mdi:air-purifier"),o("hvac","Clean ceiling fan blades","Dust fan blades and check for wobble; reverse direction seasonally.",6,"months","mdi:ceiling-fan"),o("hvac","Replace humidifier filter","Replace the whole-home humidifier evaporator pad.",1,"years","mdi:air-humidifier"),o("hvac","Clean dehumidifier","Empty, clean the tank and filter, and check drainage.",3,"months","mdi:water-percent"),o("hvac","Have air ducts inspected","Inspect ductwork for leaks and dust buildup; consider cleaning.",5,"years","mdi:pipe"),o("hvac","Clean bathroom exhaust fans","Remove covers and vacuum dust from bathroom exhaust fans.",6,"months","mdi:fan"),o("plumbing","Flush water heater","Drain sediment from the water heater tank and test the pressure-relief valve.",1,"years","mdi:water-boiler"),o("plumbing","Test sump pump","Pour water into the sump pit and verify the pump runs and drains.",3,"months","mdi:water-pump"),o("plumbing","Clean faucet aerators","Unscrew aerators and rinse out sediment for steady flow.",6,"months","mdi:faucet"),o("plumbing","Check for plumbing leaks","Inspect under sinks, around toilets, and exposed pipes for moisture.",3,"months","mdi:pipe-leak"),o("plumbing","Clean shower heads","Descale shower heads with vinegar to restore spray pattern.",6,"months","mdi:shower-head"),o("plumbing","Inspect washing machine hoses","Check supply hoses for bulges or leaks; replace every 5 years.",6,"months","mdi:washing-machine"),o("plumbing","Clean garbage disposal","Freshen the disposal with ice, citrus peel, and a rinse.",1,"months","mdi:sink"),o("plumbing","Snake slow drains","Clear hair and buildup from bathroom drains before they clog.",6,"months","mdi:pipe-wrench"),o("plumbing","Inspect toilet internals","Check flapper, fill valve, and for silent leaks with a dye test.",1,"years","mdi:toilet"),o("plumbing","Service water softener","Check salt level and clean the brine tank.",1,"months","mdi:water-opacity"),o("plumbing","Replace water filter cartridge","Replace under-sink or whole-home water filter cartridges.",6,"months","mdi:filter"),o("plumbing","Winterize outdoor faucets","Disconnect hoses, drain exterior spigots, and insulate before frost.",1,"years","mdi:snowflake-alert"),o("electrical","Test GFCI outlets","Press test/reset on every GFCI outlet to verify protection.",6,"months","mdi:power-socket-us"),o("electrical","Test AFCI breakers","Trip and reset arc-fault breakers in the panel.",6,"months","mdi:electric-switch"),o("electrical","Inspect electrical panel","Look for corrosion, heat marks, or loose breakers; label circuits.",1,"years","mdi:lightning-bolt"),o("electrical","Check cords and outlets","Inspect for frayed cords, warm outlets, and overloaded strips.",1,"years","mdi:power-plug"),o("electrical","Test backup generator","Run the generator under load and check oil and fuel.",3,"months","mdi:engine"),o("electrical","Replace UPS batteries","Test uninterruptible power supplies and replace aging batteries.",3,"years","mdi:battery-charging"),o("electrical","Dust electronics and vents","Blow dust from equipment vents, routers, and media consoles.",3,"months","mdi:desktop-classic"),o("appliances","Clean refrigerator coils","Vacuum condenser coils under/behind the fridge for efficiency.",6,"months","mdi:fridge"),o("appliances","Replace refrigerator water filter","Swap the fridge water/ice filter cartridge.",6,"months","mdi:cup-water"),o("appliances","Clean dishwasher filter","Remove and rinse the dishwasher filter; wipe door seals.",1,"months","mdi:dishwasher"),o("appliances","Run dishwasher cleaner","Run an empty hot cycle with dishwasher cleaner or vinegar.",3,"months","mdi:dishwasher-alert"),o("appliances","Clean washing machine","Run a tub-clean cycle and wipe the door gasket to prevent mildew.",3,"months","mdi:washing-machine"),o("appliances","Clean dryer lint duct","Disconnect the dryer and clear lint from the duct to the exterior vent.",1,"years","mdi:tumble-dryer"),o("appliances","Vacuum dryer lint housing","Vacuum the lint-screen housing and behind the dryer.",3,"months","mdi:tumble-dryer-alert"),o("appliances","Clean oven","Deep-clean the oven interior and door glass.",6,"months","mdi:stove"),o("appliances","Clean range hood filter","Degrease the range hood mesh filter in hot soapy water.",3,"months","mdi:fan"),o("appliances","Descale coffee maker","Run a descaling cycle through the coffee maker or espresso machine.",3,"months","mdi:coffee-maker"),o("appliances","Clean microwave and seals","Clean interior, turntable, and check door seals.",1,"months","mdi:microwave"),o("appliances","Defrost chest freezer","Defrost and clean the freezer; check door gaskets.",1,"years","mdi:fridge-bottom"),o("appliances","Replace vacuum filters","Replace or wash vacuum cleaner filters and check the brush roll.",6,"months","mdi:robot-vacuum"),o("interior","Deep clean carpets","Shampoo or steam-clean carpets and rugs.",1,"years","mdi:rug"),o("interior","Wash windows inside","Clean interior window glass, sills, and tracks.",6,"months","mdi:window-closed-variant"),o("interior","Clean window treatments","Dust or launder blinds, shades, and curtains.",6,"months","mdi:blinds"),o("interior","Touch up paint and caulk","Touch up wall paint; re-caulk tubs, showers, and backsplashes.",1,"years","mdi:format-paint"),o("interior","Lubricate door hinges and locks","Silence squeaks and lubricate locks with graphite.",1,"years","mdi:door"),o("interior","Clean baseboards and trim","Wipe down baseboards, door frames, and switch plates.",3,"months","mdi:broom"),o("interior","Rotate mattresses","Rotate (and flip if applicable) mattresses for even wear.",3,"months","mdi:bed"),o("interior","Wash pillows and duvets","Launder pillows, duvets, and mattress protectors.",6,"months","mdi:bed-king"),o("interior","Inspect attic and basement","Look for leaks, pests, and mold in the attic and basement/crawlspace.",6,"months","mdi:home-search"),o("interior","Check door and window seals","Inspect weatherstripping and replace worn seals.",1,"years","mdi:window-shutter"),o("interior","Clean light fixtures","Dust fixtures and wash glass shades; replace dim bulbs.",6,"months","mdi:ceiling-light"),o("interior","Descale humidifiers","Descale and disinfect portable humidifiers.",1,"months","mdi:air-humidifier"),o("exterior","Clean gutters","Remove leaves and debris from gutters and check downspout flow.",6,"months","mdi:home-roof"),o("exterior","Inspect roof","Check shingles/flashing for damage from the ground or ladder.",1,"years","mdi:home-alert"),o("exterior","Wash siding","Rinse or soft-wash siding to remove dirt and mildew.",1,"years","mdi:home-modern"),o("exterior","Wash windows outside","Clean exterior window glass and screens.",6,"months","mdi:window-open-variant"),o("exterior","Inspect driveway and walkways","Look for cracks to seal and settled pavers to relevel.",1,"years","mdi:road-variant"),o("exterior","Seal deck or fence","Clean and re-stain/seal wooden decks and fences.",2,"years","mdi:fence"),o("exterior","Inspect exterior paint and caulk","Check for peeling paint and failed caulk around openings.",1,"years","mdi:brush"),o("exterior","Clean garage door tracks","Clear tracks, lubricate rollers/springs, and test auto-reverse.",1,"years","mdi:garage"),o("exterior","Inspect foundation","Walk the foundation looking for new cracks or water pooling.",1,"years","mdi:home-floor-b"),o("exterior","Check chimney and cap","Inspect the chimney exterior and cap; schedule a sweep if used.",1,"years","mdi:fireplace"),o("exterior","Clean outdoor furniture","Wash outdoor furniture and check covers.",6,"months","mdi:table-chair"),o("exterior","Clean grill","Deep-clean grill grates and burners; check propane connections.",6,"months","mdi:grill"),o("yard","Fertilize lawn","Apply seasonal fertilizer appropriate for your grass type.",3,"months","mdi:grass"),o("yard","Prune trees and shrubs","Prune dead growth and branches near the house or lines.",1,"years","mdi:tree"),o("yard","Mulch garden beds","Refresh mulch in planting beds for moisture and weed control.",1,"years","mdi:flower"),o("yard","Service lawn mower","Change oil, sharpen the blade, and replace the spark plug.",1,"years","mdi:mower"),o("yard","Start up irrigation system","Recharge the sprinkler system and check heads in spring.",1,"years","mdi:sprinkler-variant"),o("yard","Winterize irrigation system","Blow out sprinkler lines before the first freeze.",1,"years","mdi:sprinkler"),o("yard","Clean and store hoses","Drain garden hoses and check spray nozzles.",1,"years","mdi:watering-can"),o("yard","Inspect trees after storms","Check for damaged limbs and clear debris.",6,"months","mdi:tree-outline"),o("yard","Reseed bare lawn spots","Overseed thin areas and water until established.",1,"years","mdi:seed"),o("safety","Test smoke detectors","Press the test button on every smoke detector.",1,"months","mdi:smoke-detector"),o("safety","Test carbon monoxide detectors","Test CO detectors and note their replacement date.",1,"months","mdi:molecule-co"),o("safety","Replace detector batteries","Replace batteries in smoke and CO detectors.",1,"years","mdi:battery-alert"),o("safety","Inspect fire extinguishers","Check gauge pressure, pin, and expiration on each extinguisher.",6,"months","mdi:fire-extinguisher"),o("safety","Practice fire escape plan","Review and practice the household emergency escape plan.",1,"years","mdi:exit-run"),o("safety","Check emergency kit","Rotate water, food, batteries, and medications in the emergency kit.",6,"months","mdi:medical-bag"),o("safety","Test security system","Test alarm sensors, cameras, and backup batteries.",6,"months","mdi:shield-home"),o("safety","Clean dryer vent exterior flap","Verify the exterior dryer vent flap opens and is lint-free.",6,"months","mdi:tumble-dryer"),o("safety","Test water shutoff valve","Exercise the main water shutoff so it moves freely in an emergency.",1,"years","mdi:valve"),o("safety","Restock first aid kit","Replace used and expired first aid supplies.",6,"months","mdi:bandage"),o("vehicles","Change vehicle oil","Change engine oil and filter per the manufacturer schedule.",6,"months","mdi:oil"),o("vehicles","Rotate tires","Rotate tires and check tread depth and pressure.",6,"months","mdi:tire"),o("vehicles","Replace wiper blades","Replace windshield wiper blades and top up washer fluid.",1,"years","mdi:wiper"),o("vehicles","Check vehicle battery","Test battery health and clean terminal corrosion.",1,"years","mdi:car-battery"),o("vehicles","Replace cabin air filter","Replace the vehicle cabin air filter.",1,"years","mdi:car-defrost-front"),o("vehicles","Wash and wax vehicle","Wash, decontaminate, and wax the paint.",3,"months","mdi:car-wash"),o("vehicles","Check bicycle tune-up","Lubricate the chain, check brakes and tire pressure.",6,"months","mdi:bike")];var E=class extends g{constructor(){super(...arguments);this._open=!1;this._query="";this._csvRows=null;this._csvErrors=[];this._importing=!1;this._close=()=>{this._open=!1,this._query="",this._resetCsv()}}open(){this._open=!0}_resetCsv(){this._csvRows=null,this._csvErrors=[],this._importing=!1,this._fileInput&&(this._fileInput.value="")}get _filteredTemplates(){let V=this._query.trim().toLowerCase();return V?W2.filter(L=>`${L.title}
${L.description}`.toLowerCase().includes(V)):W2}_selectTemplate(V){this.dispatchEvent(new CustomEvent("template-selected",{detail:{template:V},bubbles:!0,composed:!0})),this._close()}async _handleFilePicked(V){let L=V.target.files?.[0];if(!L)return;let e=await L.text(),r=j5(Q5(e));this._csvRows=r.tasks,this._csvErrors=r.errors}async _handleImport(){if(!this._csvRows?.length||this._importing)return;this._importing=!0;let V=0,L=[];for(let e of this._csvRows)try{await H2(this.hass,{title:e.title,interval_value:e.interval_value,interval_type:e.interval_type,trigger_type:"time",last_performed:m1(e.last_performed??""),icon:e.icon||"mdi:calendar-check",...e.description?{description:e.description}:{},...e.group_id?{group_id:e.group_id}:{}}),V+=1}catch(r){console.error("Failed to import task:",e.title,r),L.push(e.title)}this.dispatchEvent(new CustomEvent("csv-imported",{detail:{created:V,failures:L},bubbles:!0,composed:!0})),this._close()}_renderCsvSection(){let V=this.hass.language;return d`
            <div class="csv-section">
                <div class="csv-actions">
                    <ha-button appearance="plain" size="small" @click=${()=>this._fileInput?.click()}>
                        ${i("panel.dialog.templates.choose_csv",V)}
                    </ha-button>
                    <input type="file" accept=".csv,text/csv" hidden @change=${this._handleFilePicked} />
                    <span class="csv-hint">${i("panel.dialog.templates.csv_hint",V)}</span>
                </div>

                ${this._csvErrors.length?d`
                    <ul class="csv-errors">
                        ${this._csvErrors.map(L=>d`<li>${L}</li>`)}
                    </ul>
                `:v}

                ${this._csvRows?.length?d`
                    <div class="csv-preview">
                        <table>
                            <thead>
                                <tr>
                                    <th>${i("panel.dialog.templates.preview.title",V)}</th>
                                    <th>${i("panel.dialog.templates.preview.interval",V)}</th>
                                    <th>${i("panel.dialog.templates.preview.last_performed",V)}</th>
                                    <th>${i("panel.dialog.templates.preview.group",V)}</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this._csvRows.map(L=>d`
                                    <tr>
                                        <td>${L.title}</td>
                                        <td>${L.interval_value} ${L.interval_type}</td>
                                        <td>${L.last_performed??"\u2014"}</td>
                                        <td>${L.group_id??"\u2014"}</td>
                                    </tr>
                                `)}
                            </tbody>
                        </table>
                    </div>
                    <ha-button
                        class="import-button"
                        .disabled=${this._importing}
                        @click=${this._handleImport}
                    >
                        ${i("panel.dialog.templates.import_count",V,"{count}",this._csvRows.length)}
                    </ha-button>
                `:this._csvRows!==null&&!this._csvErrors.length?d`
                    <span class="csv-hint">${i("panel.dialog.templates.csv_empty",V)}</span>
                `:v}
            </div>
        `}render(){if(!this.hass||!this._open)return d``;let V=this.hass.language,L=this._filteredTemplates;return d`
            <ha-dialog
                open
                heading="${i("panel.dialog.templates.title",V)}"
                @closed=${this._close}
            >
                <input
                    class="search-input"
                    type="search"
                    .value=${this._query}
                    placeholder=${i("panel.dialog.templates.search",V)}
                    @input=${e=>{this._query=e.target.value}}
                />

                <div class="template-list">
                    ${S3.map(e=>{let r=L.filter(M=>M.category===e);return r.length?d`
                            <div class="category-header">
                                ${i(`templates.categories.${e}`,V)}
                            </div>
                            ${r.map(M=>d`
                                <button class="template-row" @click=${()=>this._selectTemplate(M)}>
                                    <ha-icon .icon=${M.icon}></ha-icon>
                                    <span class="template-text">
                                        <span class="template-title">${M.title}</span>
                                        <span class="template-detail">
                                            ${M.interval_value} ${M.interval_type} — ${M.description}
                                        </span>
                                    </span>
                                </button>
                            `)}
                        `:v})}
                    ${L.length===0?d`
                        <span class="csv-hint">${i("panel.dialog.templates.no_matches",V)}</span>
                    `:v}
                </div>

                <div class="section-label">${i("panel.dialog.templates.import_csv",V)}</div>
                ${this._renderCsvSection()}

                ${J(d`
                    <ha-button data-dialog="close" appearance="plain" slot="secondaryAction" @click=${this._close}>
                        ${i("common.cancel",V)}
                    </ha-button>
                `)}
            </ha-dialog>
        `}};E.styles=[k,O`
        ha-dialog {
            --mdc-dialog-min-width: min(720px, 95vw);
        }

        .search-input {
            width: 100%;
            box-sizing: border-box;
            padding: 10px 12px;
            border: 1px solid var(--divider-color);
            border-radius: 8px;
            background: var(--card-background-color);
            color: var(--primary-text-color);
            font: inherit;
        }

        .search-input:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: -1px;
        }

        .template-list {
            max-height: 320px;
            overflow-y: auto;
            margin-top: 8px;
            border: 1px solid var(--divider-color);
            border-radius: 8px;
        }

        .category-header {
            position: sticky;
            top: 0;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            color: var(--secondary-text-color);
            background: var(--secondary-background-color);
        }

        .template-row {
            display: flex;
            gap: 12px;
            align-items: center;
            width: 100%;
            padding: 8px 12px;
            border: none;
            background: none;
            color: var(--primary-text-color);
            text-align: left;
            font: inherit;
            cursor: pointer;
        }

        .template-row:hover {
            background: var(--secondary-background-color);
        }

        .template-row ha-icon {
            color: var(--secondary-text-color);
            flex-shrink: 0;
        }

        .template-text {
            display: flex;
            flex-direction: column;
            min-width: 0;
        }

        .template-detail {
            font-size: 12px;
            color: var(--secondary-text-color);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .section-label {
            font-weight: 500;
            color: var(--secondary-text-color);
            margin: 20px 0 8px;
        }

        .csv-actions {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }

        .csv-hint {
            font-size: 12px;
            color: var(--secondary-text-color);
        }

        .csv-errors {
            margin: 8px 0 0;
            padding-left: 18px;
            font-size: 13px;
            color: var(--error-color, #b71c1c);
        }

        .csv-preview {
            max-height: 200px;
            overflow: auto;
            margin-top: 8px;
            border: 1px solid var(--divider-color);
            border-radius: 8px;
        }

        .csv-preview table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }

        .csv-preview th,
        .csv-preview td {
            padding: 6px 10px;
            text-align: left;
            border-bottom: 1px solid var(--divider-color);
            white-space: nowrap;
        }

        .csv-preview th {
            position: sticky;
            top: 0;
            background: var(--secondary-background-color);
        }

        .import-button {
            margin-top: 12px;
        }
    `],p([c()],E.prototype,"hass",2),p([h()],E.prototype,"_open",2),p([h()],E.prototype,"_query",2),p([h()],E.prototype,"_csvRows",2),p([h()],E.prototype,"_csvErrors",2),p([h()],E.prototype,"_importing",2),p([T('input[type="file"]')],E.prototype,"_fileInput",2);customElements.get("hm-template-dialog")||customElements.define("hm-template-dialog",E);var D7=300,y=class extends g{constructor(){super(...arguments);this._loaded=!1;this.tasks=[];this.groups=[];this.config=null;this.registry=[];this.labelRegistry=[];this._search="";this._selectedLabels=[];this._reload=new Y1(()=>this._loadData(),D7)}connectedCallback(){super.connectedCallback(),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._reload.cancel(),this._unsubscribe?.(),this._unsubscribe=void 0}async _initialize(){await F5(),this.config=await M3(this.hass),await this._loadData(),this._loaded=!0;try{this._unsubscribe=await t3(this.hass,()=>this._reload.schedule())}catch(V){console.error("Failed to subscribe to task updates:",V)}}async _loadData(){let[V,L,e,r]=await Promise.all([J5(this.hass),V3(this.hass),K5(this.hass),X5(this.hass)]);this.tasks=V,this.groups=L,this.registry=e,this.labelRegistry=r}_handleComplete(V){let L=this.tasks.find(e=>e.id===V.detail.taskId);L&&i3(this,this._confirmDialog,this.hass,L)}_handleMenuAction(V){let{taskId:L,action:e}=V.detail;if(e==="edit")this._editDialog?.open(L);else if(e==="move"){let r=this.tasks.find(M=>M.id===L);r&&this._moveDialog?.open(r)}else e==="delete"&&this._handleRemove(L)}_handleRemove(V){let L=this.tasks.find(e=>e.id===V);a3(this,this._confirmDialog,this.hass,L,V)}_handleTaskAdded(V){f(this,i("card.add_task.added",this.hass.language,"{title}",V.detail?.title??""))}_handleTemplateSelected(V){let L=V.detail.template;this._taskForm?.prefill({title:L.title,description:L.description,trigger_type:"time",interval_value:L.interval_value,interval_type:L.interval_type,icon:L.icon}),this._taskForm?.scrollIntoView({behavior:"smooth",block:"center"})}_handleCsvImported(V){let{created:L,failures:e}=V.detail;f(this,i("panel.dialog.templates.imported",this.hass.language,"{count}",L)),e.length&&f(this,i("panel.dialog.templates.import_failed",this.hass.language,"{titles}",e.join(", ")))}_handleExportCsv(){let V=new Blob([q5(this.tasks)],{type:"text/csv"}),L=URL.createObjectURL(V),e=document.createElement("a");e.href=L,e.download="home_maintenance_tasks.csv",e.click(),URL.revokeObjectURL(L)}get _visibleTasks(){let V=this._visibleCache;if(V&&V.tasks===this.tasks&&V.registry===this.registry&&V.search===this._search&&V.labels===this._selectedLabels)return V.result;let L=G5(this.tasks,this.registry,this._search,this._selectedLabels);return this._visibleCache={tasks:this.tasks,registry:this.registry,search:this._search,labels:this._selectedLabels,result:L},L}get _labelsInUse(){let V=this._labelsInUseCache;if(V&&V.tasks===this.tasks&&V.registry===this.registry&&V.labelRegistry===this.labelRegistry)return V.result;let L=new Set,e=new Set(this.tasks.map(M=>M.id));this.registry.forEach(M=>{e.has(M.unique_id)&&M.labels.forEach(t=>L.add(t))});let r=this.labelRegistry.filter(M=>L.has(M.label_id));return this._labelsInUseCache={tasks:this.tasks,registry:this.registry,labelRegistry:this.labelRegistry,result:r},r}_toggleLabel(V){this._selectedLabels=this._selectedLabels.includes(V)?this._selectedLabels.filter(L=>L!==V):[...this._selectedLabels,V]}render(){return this.hass?this._loaded?d`
            <div class="header">
                <div class="toolbar">
                    <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
                    <div class="main-title">
                        ${this.config?.options.sidebar_title}
                    </div>
                    <div class="version">
                        v${this.config?.version??""}
                    </div>
                </div>
            </div>

            <div class="view">
                <ha-card
                    header="${i("panel.cards.new.title",this.hass.language)}"
                    class="card-new"
                >
                    <div class="card-content">
                        <hm-task-form
                            .hass=${this.hass}
                            .groups=${this.groups}
                            @task-added=${this._handleTaskAdded}
                        ></hm-task-form>
                    </div>
                </ha-card>

                <ha-card
                    header="${i("panel.cards.current.title",this.hass.language)}"
                    class="card-current"
                >
                    <div class="card-content">
                        ${this._renderFilterBar()}
                        <hm-task-table
                            .hass=${this.hass}
                            .narrow=${this.narrow}
                            .tasks=${this._visibleTasks}
                            .groups=${this.groups}
                            .registry=${this.registry}
                            .labelRegistry=${this.labelRegistry}
                            .hideEmptyGroups=${!!(this._search.trim()||this._selectedLabels.length)}
                            @task-complete=${this._handleComplete}
                            @task-menu-action=${this._handleMenuAction}
                        ></hm-task-table>
                    </div>
                </ha-card>

                <ha-card
                    header="${i("panel.cards.groups.title",this.hass.language)}"
                    class="card-new"
                >
                    <div class="card-content">
                        <hm-group-manager .hass=${this.hass} .groups=${this.groups}></hm-group-manager>
                    </div>
                </ha-card>
            </div>

            <hm-edit-dialog
                .hass=${this.hass}
                .registry=${this.registry}
                .labelRegistry=${this.labelRegistry}
                .groups=${this.groups}
            ></hm-edit-dialog>
            <hm-move-dialog .hass=${this.hass} .groups=${this.groups}></hm-move-dialog>
            <hm-confirm-dialog></hm-confirm-dialog>
            <hm-template-dialog
                .hass=${this.hass}
                @template-selected=${this._handleTemplateSelected}
                @csv-imported=${this._handleCsvImported}
            ></hm-template-dialog>
        `:d`<p>${i("common.loading",this.hass.language)}</p>`:d``}_renderFilterBar(){let V=this.hass.language,L=this._labelsInUse,e=!!(this._search.trim()||this._selectedLabels.length);return d`
            <div class="filter-bar">
                <input
                    class="search-input"
                    type="search"
                    .value=${this._search}
                    placeholder=${i("panel.cards.current.filter.search",V)}
                    @input=${r=>{this._search=r.target.value}}
                />
                <div class="filter-actions">
                    <ha-button appearance="plain" size="small"
                        @click=${()=>this._templateDialog?.open()}>
                        ${i("panel.cards.current.filter.templates",V)}
                    </ha-button>
                    <ha-button appearance="plain" size="small" @click=${this._handleExportCsv}>
                        ${i("panel.cards.current.filter.export",V)}
                    </ha-button>
                </div>
            </div>
            ${L.length?d`
                <div class="label-chips">
                    ${L.map(r=>d`
                        <button
                            class="label-chip ${this._selectedLabels.includes(r.label_id)?"selected":""}"
                            @click=${()=>this._toggleLabel(r.label_id)}
                        >
                            ${r.icon?d`<ha-icon .icon=${r.icon}></ha-icon>`:""}
                            ${r.name}
                        </button>
                    `)}
                    ${e?d`
                        <button class="label-chip clear"
                            @click=${()=>{this._search="",this._selectedLabels=[]}}>
                            ${i("panel.cards.current.filter.clear",V)}
                        </button>
                    `:""}
                </div>
            `:""}
        `}};y.styles=[k,O`
        .filter-bar {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 8px;
        }

        .search-input {
            flex: 1 1 220px;
            min-width: 0;
            box-sizing: border-box;
            padding: 8px 12px;
            border: 1px solid var(--divider-color);
            border-radius: 8px;
            background: var(--card-background-color);
            color: var(--primary-text-color);
            font: inherit;
        }

        .search-input:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: -1px;
        }

        .filter-actions {
            display: flex;
            gap: 4px;
        }

        .label-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-bottom: 8px;
        }

        .label-chip {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 12px;
            border: 1px solid var(--divider-color);
            border-radius: 16px;
            background: var(--card-background-color);
            color: var(--primary-text-color);
            font: inherit;
            font-size: 13px;
            cursor: pointer;
        }

        .label-chip ha-icon {
            --mdc-icon-size: 16px;
        }

        .label-chip.selected {
            background: var(--primary-color);
            border-color: var(--primary-color);
            color: var(--text-primary-color, #fff);
        }

        .label-chip.clear {
            border-style: dashed;
            color: var(--secondary-text-color);
        }
    `],p([c()],y.prototype,"hass",2),p([c()],y.prototype,"narrow",2),p([h()],y.prototype,"_loaded",2),p([h()],y.prototype,"tasks",2),p([h()],y.prototype,"groups",2),p([h()],y.prototype,"config",2),p([h()],y.prototype,"registry",2),p([h()],y.prototype,"labelRegistry",2),p([h()],y.prototype,"_search",2),p([h()],y.prototype,"_selectedLabels",2),p([T("hm-edit-dialog")],y.prototype,"_editDialog",2),p([T("hm-move-dialog")],y.prototype,"_moveDialog",2),p([T("hm-confirm-dialog")],y.prototype,"_confirmDialog",2),p([T("hm-template-dialog")],y.prototype,"_templateDialog",2),p([T("hm-task-form")],y.prototype,"_taskForm",2);customElements.define("home-maintenance-panel",y);export{y as HomeMaintenancePanel};
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
