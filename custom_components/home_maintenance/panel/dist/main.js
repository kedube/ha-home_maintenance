var g2=Object.defineProperty;var j5=Object.getOwnPropertyDescriptor;var O2=(C,H)=>{for(var V in H)g2(C,V,{get:H[V],enumerable:!0})};var d=(C,H,V,L)=>{for(var M=L>1?void 0:L?j5(H,V):H,r=C.length-1,e;r>=0;r--)(e=C[r])&&(M=(L?e(H,V,M):e(M))||M);return L&&M&&g2(H,V,M),M};var g1=globalThis,O1=g1.ShadowRoot&&(g1.ShadyCSS===void 0||g1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K1=Symbol(),y2=new WeakMap,e1=class{constructor(H,V,L){if(this._$cssResult$=!0,L!==K1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=H,this.t=V}get styleSheet(){let H=this.o,V=this.t;if(O1&&H===void 0){let L=V!==void 0&&V.length===1;L&&(H=y2.get(V)),H===void 0&&((this.o=H=new CSSStyleSheet).replaceSync(this.cssText),L&&y2.set(V,H))}return H}toString(){return this.cssText}},b2=C=>new e1(typeof C=="string"?C:C+"",void 0,K1),k=(C,...H)=>{let V=C.length===1?C[0]:H.reduce((L,M,r)=>L+(e=>{if(e._$cssResult$===!0)return e.cssText;if(typeof e=="number")return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(M)+C[r+1],C[0]);return new e1(V,C,K1)},k2=(C,H)=>{if(O1)C.adoptedStyleSheets=H.map(V=>V instanceof CSSStyleSheet?V:V.styleSheet);else for(let V of H){let L=document.createElement("style"),M=g1.litNonce;M!==void 0&&L.setAttribute("nonce",M),L.textContent=V.cssText,C.appendChild(L)}},X1=O1?C=>C:C=>C instanceof CSSStyleSheet?(H=>{let V="";for(let L of H.cssRules)V+=L.cssText;return b2(V)})(C):C;var{is:q5,defineProperty:K5,getOwnPropertyDescriptor:X5,getOwnPropertyNames:Y5,getOwnPropertySymbols:J5,getPrototypeOf:C3}=Object,E=globalThis,w2=E.trustedTypes,H3=w2?w2.emptyScript:"",V3=E.reactiveElementPolyfillSupport,t1=(C,H)=>C,i1={toAttribute(C,H){switch(H){case Boolean:C=C?H3:null;break;case Object:case Array:C=C==null?C:JSON.stringify(C)}return C},fromAttribute(C,H){let V=C;switch(H){case Boolean:V=C!==null;break;case Number:V=C===null?null:Number(C);break;case Object:case Array:try{V=JSON.parse(C)}catch{V=null}}return V}},y1=(C,H)=>!q5(C,H),B2={attribute:!0,type:String,converter:i1,reflect:!1,useDefault:!1,hasChanged:y1};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),E.litPropertyMetadata??(E.litPropertyMetadata=new WeakMap);var F=class extends HTMLElement{static addInitializer(H){this._$Ei(),(this.l??(this.l=[])).push(H)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(H,V=B2){if(V.state&&(V.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(H)&&((V=Object.create(V)).wrapped=!0),this.elementProperties.set(H,V),!V.noAccessor){let L=Symbol(),M=this.getPropertyDescriptor(H,L,V);M!==void 0&&K5(this.prototype,H,M)}}static getPropertyDescriptor(H,V,L){let{get:M,set:r}=X5(this.prototype,H)??{get(){return this[V]},set(e){this[V]=e}};return{get:M,set(e){let t=M?.call(this);r?.call(this,e),this.requestUpdate(H,t,L)},configurable:!0,enumerable:!0}}static getPropertyOptions(H){return this.elementProperties.get(H)??B2}static _$Ei(){if(this.hasOwnProperty(t1("elementProperties")))return;let H=C3(this);H.finalize(),H.l!==void 0&&(this.l=[...H.l]),this.elementProperties=new Map(H.elementProperties)}static finalize(){if(this.hasOwnProperty(t1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(t1("properties"))){let V=this.properties,L=[...Y5(V),...J5(V)];for(let M of L)this.createProperty(M,V[M])}let H=this[Symbol.metadata];if(H!==null){let V=litPropertyMetadata.get(H);if(V!==void 0)for(let[L,M]of V)this.elementProperties.set(L,M)}this._$Eh=new Map;for(let[V,L]of this.elementProperties){let M=this._$Eu(V,L);M!==void 0&&this._$Eh.set(M,V)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(H){let V=[];if(Array.isArray(H)){let L=new Set(H.flat(1/0).reverse());for(let M of L)V.unshift(X1(M))}else H!==void 0&&V.push(X1(H));return V}static _$Eu(H,V){let L=V.attribute;return L===!1?void 0:typeof L=="string"?L:typeof H=="string"?H.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(H=>this.enableUpdating=H),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(H=>H(this))}addController(H){(this._$EO??(this._$EO=new Set)).add(H),this.renderRoot!==void 0&&this.isConnected&&H.hostConnected?.()}removeController(H){this._$EO?.delete(H)}_$E_(){let H=new Map,V=this.constructor.elementProperties;for(let L of V.keys())this.hasOwnProperty(L)&&(H.set(L,this[L]),delete this[L]);H.size>0&&(this._$Ep=H)}createRenderRoot(){let H=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return k2(H,this.constructor.elementStyles),H}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(H=>H.hostConnected?.())}enableUpdating(H){}disconnectedCallback(){this._$EO?.forEach(H=>H.hostDisconnected?.())}attributeChangedCallback(H,V,L){this._$AK(H,L)}_$ET(H,V){let L=this.constructor.elementProperties.get(H),M=this.constructor._$Eu(H,L);if(M!==void 0&&L.reflect===!0){let r=(L.converter?.toAttribute!==void 0?L.converter:i1).toAttribute(V,L.type);this._$Em=H,r==null?this.removeAttribute(M):this.setAttribute(M,r),this._$Em=null}}_$AK(H,V){let L=this.constructor,M=L._$Eh.get(H);if(M!==void 0&&this._$Em!==M){let r=L.getPropertyOptions(M),e=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:i1;this._$Em=M;let t=e.fromAttribute(V,r.type);this[M]=t??this._$Ej?.get(M)??t,this._$Em=null}}requestUpdate(H,V,L,M=!1,r){if(H!==void 0){let e=this.constructor;if(M===!1&&(r=this[H]),L??(L=e.getPropertyOptions(H)),!((L.hasChanged??y1)(r,V)||L.useDefault&&L.reflect&&r===this._$Ej?.get(H)&&!this.hasAttribute(e._$Eu(H,L))))return;this.C(H,V,L)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(H,V,{useDefault:L,reflect:M,wrapped:r},e){L&&!(this._$Ej??(this._$Ej=new Map)).has(H)&&(this._$Ej.set(H,e??V??this[H]),r!==!0||e!==void 0)||(this._$AL.has(H)||(this.hasUpdated||L||(V=void 0),this._$AL.set(H,V)),M===!0&&this._$Em!==H&&(this._$Eq??(this._$Eq=new Set)).add(H))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(V){Promise.reject(V)}let H=this.scheduleUpdate();return H!=null&&await H,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[M,r]of this._$Ep)this[M]=r;this._$Ep=void 0}let L=this.constructor.elementProperties;if(L.size>0)for(let[M,r]of L){let{wrapped:e}=r,t=this[M];e!==!0||this._$AL.has(M)||t===void 0||this.C(M,void 0,r,t)}}let H=!1,V=this._$AL;try{H=this.shouldUpdate(V),H?(this.willUpdate(V),this._$EO?.forEach(L=>L.hostUpdate?.()),this.update(V)):this._$EM()}catch(L){throw H=!1,this._$EM(),L}H&&this._$AE(V)}willUpdate(H){}_$AE(H){this._$EO?.forEach(V=>V.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(H)),this.updated(H)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(H){return!0}update(H){this._$Eq&&(this._$Eq=this._$Eq.forEach(V=>this._$ET(V,this[V]))),this._$EM()}updated(H){}firstUpdated(H){}};F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[t1("elementProperties")]=new Map,F[t1("finalized")]=new Map,V3?.({ReactiveElement:F}),(E.reactiveElementVersions??(E.reactiveElementVersions=[])).push("2.1.2");var a1=globalThis,T2=C=>C,b1=a1.trustedTypes,P2=b1?b1.createPolicy("lit-html",{createHTML:C=>C}):void 0,N2="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,I2="?"+R,L3=`<${I2}>`,U=document,A1=()=>U.createComment(""),n1=C=>C===null||typeof C!="object"&&typeof C!="function",M2=Array.isArray,M3=C=>M2(C)||typeof C?.[Symbol.iterator]=="function",Y1=`[ 	
\f\r]`,o1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_2=/-->/g,F2=/>/g,G=RegExp(`>|${Y1}(?:([^\\s"'>=/]+)(${Y1}*=${Y1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),E2=/'/g,R2=/"/g,G2=/^(?:script|style|textarea|title)$/i,r2=C=>(H,...V)=>({_$litType$:C,strings:H,values:V}),m=r2(1),o0=r2(2),a0=r2(3),$=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),D2=new WeakMap,W=U.createTreeWalker(U,129);function W2(C,H){if(!M2(C)||!C.hasOwnProperty("raw"))throw Error("invalid template strings array");return P2!==void 0?P2.createHTML(H):H}var r3=(C,H)=>{let V=C.length-1,L=[],M,r=H===2?"<svg>":H===3?"<math>":"",e=o1;for(let t=0;t<V;t++){let i=C[t],a,A,n=-1,p=0;for(;p<i.length&&(e.lastIndex=p,A=e.exec(i),A!==null);)p=e.lastIndex,e===o1?A[1]==="!--"?e=_2:A[1]!==void 0?e=F2:A[2]!==void 0?(G2.test(A[2])&&(M=RegExp("</"+A[2],"g")),e=G):A[3]!==void 0&&(e=G):e===G?A[0]===">"?(e=M??o1,n=-1):A[1]===void 0?n=-2:(n=e.lastIndex-A[2].length,a=A[1],e=A[3]===void 0?G:A[3]==='"'?R2:E2):e===R2||e===E2?e=G:e===_2||e===F2?e=o1:(e=G,M=void 0);let u=e===G&&C[t+1].startsWith("/>")?" ":"";r+=e===o1?i+L3:n>=0?(L.push(a),i.slice(0,n)+N2+i.slice(n)+R+u):i+R+(n===-2?t:u)}return[W2(C,r+(C[V]||"<?>")+(H===2?"</svg>":H===3?"</math>":"")),L]},d1=class C{constructor({strings:H,_$litType$:V},L){let M;this.parts=[];let r=0,e=0,t=H.length-1,i=this.parts,[a,A]=r3(H,V);if(this.el=C.createElement(a,L),W.currentNode=this.el.content,V===2||V===3){let n=this.el.content.firstChild;n.replaceWith(...n.childNodes)}for(;(M=W.nextNode())!==null&&i.length<t;){if(M.nodeType===1){if(M.hasAttributes())for(let n of M.getAttributeNames())if(n.endsWith(N2)){let p=A[e++],u=M.getAttribute(n).split(R),g=/([.?@])?(.*)/.exec(p);i.push({type:1,index:r,name:g[2],strings:u,ctor:g[1]==="."?C2:g[1]==="?"?H2:g[1]==="@"?V2:Y}),M.removeAttribute(n)}else n.startsWith(R)&&(i.push({type:6,index:r}),M.removeAttribute(n));if(G2.test(M.tagName)){let n=M.textContent.split(R),p=n.length-1;if(p>0){M.textContent=b1?b1.emptyScript:"";for(let u=0;u<p;u++)M.append(n[u],A1()),W.nextNode(),i.push({type:2,index:++r});M.append(n[p],A1())}}}else if(M.nodeType===8)if(M.data===I2)i.push({type:2,index:r});else{let n=-1;for(;(n=M.data.indexOf(R,n+1))!==-1;)i.push({type:7,index:r}),n+=R.length-1}r++}}static createElement(H,V){let L=U.createElement("template");return L.innerHTML=H,L}};function X(C,H,V=C,L){if(H===$)return H;let M=L!==void 0?V._$Co?.[L]:V._$Cl,r=n1(H)?void 0:H._$litDirective$;return M?.constructor!==r&&(M?._$AO?.(!1),r===void 0?M=void 0:(M=new r(C),M._$AT(C,V,L)),L!==void 0?(V._$Co??(V._$Co=[]))[L]=M:V._$Cl=M),M!==void 0&&(H=X(C,M._$AS(C,H.values),M,L)),H}var J1=class{constructor(H,V){this._$AV=[],this._$AN=void 0,this._$AD=H,this._$AM=V}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(H){let{el:{content:V},parts:L}=this._$AD,M=(H?.creationScope??U).importNode(V,!0);W.currentNode=M;let r=W.nextNode(),e=0,t=0,i=L[0];for(;i!==void 0;){if(e===i.index){let a;i.type===2?a=new m1(r,r.nextSibling,this,H):i.type===1?a=new i.ctor(r,i.name,i.strings,this,H):i.type===6&&(a=new L2(r,this,H)),this._$AV.push(a),i=L[++t]}e!==i?.index&&(r=W.nextNode(),e++)}return W.currentNode=U,M}p(H){let V=0;for(let L of this._$AV)L!==void 0&&(L.strings!==void 0?(L._$AI(H,L,V),V+=L.strings.length-2):L._$AI(H[V])),V++}},m1=class C{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(H,V,L,M){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=H,this._$AB=V,this._$AM=L,this.options=M,this._$Cv=M?.isConnected??!0}get parentNode(){let H=this._$AA.parentNode,V=this._$AM;return V!==void 0&&H?.nodeType===11&&(H=V.parentNode),H}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(H,V=this){H=X(this,H,V),n1(H)?H===S||H==null||H===""?(this._$AH!==S&&this._$AR(),this._$AH=S):H!==this._$AH&&H!==$&&this._(H):H._$litType$!==void 0?this.$(H):H.nodeType!==void 0?this.T(H):M3(H)?this.k(H):this._(H)}O(H){return this._$AA.parentNode.insertBefore(H,this._$AB)}T(H){this._$AH!==H&&(this._$AR(),this._$AH=this.O(H))}_(H){this._$AH!==S&&n1(this._$AH)?this._$AA.nextSibling.data=H:this.T(U.createTextNode(H)),this._$AH=H}$(H){let{values:V,_$litType$:L}=H,M=typeof L=="number"?this._$AC(H):(L.el===void 0&&(L.el=d1.createElement(W2(L.h,L.h[0]),this.options)),L);if(this._$AH?._$AD===M)this._$AH.p(V);else{let r=new J1(M,this),e=r.u(this.options);r.p(V),this.T(e),this._$AH=r}}_$AC(H){let V=D2.get(H.strings);return V===void 0&&D2.set(H.strings,V=new d1(H)),V}k(H){M2(this._$AH)||(this._$AH=[],this._$AR());let V=this._$AH,L,M=0;for(let r of H)M===V.length?V.push(L=new C(this.O(A1()),this.O(A1()),this,this.options)):L=V[M],L._$AI(r),M++;M<V.length&&(this._$AR(L&&L._$AB.nextSibling,M),V.length=M)}_$AR(H=this._$AA.nextSibling,V){for(this._$AP?.(!1,!0,V);H!==this._$AB;){let L=T2(H).nextSibling;T2(H).remove(),H=L}}setConnected(H){this._$AM===void 0&&(this._$Cv=H,this._$AP?.(H))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(H,V,L,M,r){this.type=1,this._$AH=S,this._$AN=void 0,this.element=H,this.name=V,this._$AM=M,this.options=r,L.length>2||L[0]!==""||L[1]!==""?(this._$AH=Array(L.length-1).fill(new String),this.strings=L):this._$AH=S}_$AI(H,V=this,L,M){let r=this.strings,e=!1;if(r===void 0)H=X(this,H,V,0),e=!n1(H)||H!==this._$AH&&H!==$,e&&(this._$AH=H);else{let t=H,i,a;for(H=r[0],i=0;i<r.length-1;i++)a=X(this,t[L+i],V,i),a===$&&(a=this._$AH[i]),e||(e=!n1(a)||a!==this._$AH[i]),a===S?H=S:H!==S&&(H+=(a??"")+r[i+1]),this._$AH[i]=a}e&&!M&&this.j(H)}j(H){H===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,H??"")}},C2=class extends Y{constructor(){super(...arguments),this.type=3}j(H){this.element[this.name]=H===S?void 0:H}},H2=class extends Y{constructor(){super(...arguments),this.type=4}j(H){this.element.toggleAttribute(this.name,!!H&&H!==S)}},V2=class extends Y{constructor(H,V,L,M,r){super(H,V,L,M,r),this.type=5}_$AI(H,V=this){if((H=X(this,H,V,0)??S)===$)return;let L=this._$AH,M=H===S&&L!==S||H.capture!==L.capture||H.once!==L.once||H.passive!==L.passive,r=H!==S&&(L===S||M);M&&this.element.removeEventListener(this.name,this,L),r&&this.element.addEventListener(this.name,this,H),this._$AH=H}handleEvent(H){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,H):this._$AH.handleEvent(H)}},L2=class{constructor(H,V,L){this.element=H,this.type=6,this._$AN=void 0,this._$AM=V,this.options=L}get _$AU(){return this._$AM._$AU}_$AI(H){X(this,H)}};var e3=a1.litHtmlPolyfillSupport;e3?.(d1,m1),(a1.litHtmlVersions??(a1.litHtmlVersions=[])).push("3.3.3");var U2=(C,H,V)=>{let L=V?.renderBefore??H,M=L._$litPart$;if(M===void 0){let r=V?.renderBefore??null;L._$litPart$=M=new m1(H.insertBefore(A1(),r),r,void 0,V??{})}return M._$AI(C),M};var p1=globalThis,c=class extends F{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var V;let H=super.createRenderRoot();return(V=this.renderOptions).renderBefore??(V.renderBefore=H.firstChild),H}update(H){let V=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(H),this._$Do=U2(V,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $}};c._$litElement$=!0,c.finalized=!0,p1.litElementHydrateSupport?.({LitElement:c});var t3=p1.litElementPolyfillSupport;t3?.({LitElement:c});(p1.litElementVersions??(p1.litElementVersions=[])).push("4.2.2");var i3={attribute:!0,type:String,converter:i1,reflect:!1,hasChanged:y1},o3=(C=i3,H,V)=>{let{kind:L,metadata:M}=V,r=globalThis.litPropertyMetadata.get(M);if(r===void 0&&globalThis.litPropertyMetadata.set(M,r=new Map),L==="setter"&&((C=Object.create(C)).wrapped=!0),r.set(V.name,C),L==="accessor"){let{name:e}=V;return{set(t){let i=H.get.call(this);H.set.call(this,t),this.requestUpdate(e,i,C,!0,t)},init(t){return t!==void 0&&this.C(e,void 0,C,t),t}}}if(L==="setter"){let{name:e}=V;return function(t){let i=this[e];H.call(this,t),this.requestUpdate(e,i,C,!0,t)}}throw Error("Unsupported decorator location: "+L)};function s(C){return(H,V)=>typeof V=="object"?o3(C,H,V):((L,M,r)=>{let e=M.hasOwnProperty(r);return M.constructor.createProperty(r,L),e?Object.getOwnPropertyDescriptor(M,r):void 0})(C,H,V)}function h(C){return s({...C,state:!0,attribute:!1})}var Q=(C,H,V)=>(V.configurable=!0,V.enumerable=!0,Reflect.decorate&&typeof H!="object"&&Object.defineProperty(C,H,V),V);function J(C,H){return(V,L,M)=>{let r=e=>e.renderRoot?.querySelector(C)??null;if(H){let{get:e,set:t}=typeof L=="object"?V:M??(()=>{let i=Symbol();return{get(){return this[i]},set(a){this[i]=a}}})();return Q(V,L,{get(){let i=e.call(this);return i===void 0&&(i=r(this),(i!==null||this.hasUpdated)&&t.call(this,i)),i}})}return Q(V,L,{get(){return r(this)}})}}var e2={};O2(e2,{card:()=>d3,common:()=>a3,default:()=>p3,intervals:()=>A3,panel:()=>m3,trigger_types:()=>n3});var a3={loading:"Loading...",none:"None",no_tasks:"No tasks found.",ungrouped:"Ungrouped",cancel:"Cancel",invalid_date:"Invalid date entered."},A3={day:"Day",days:"Days",week:"Week",weeks:"Weeks",month:"Month",months:"Months",every_uses:"Every {value} uses",every_runtime:"Every {value} runtime"},n3={time:"Time-based",count:"Count-based",runtime:"Runtime-based"},d3={add_task:{added:'"{title}" added.'}},m3={cards:{new:{title:"Create New Task",fields:{title:{heading:"Task Title"},interval_value:{heading:"Interval"},interval_type:{heading:"Interval Type"},last_performed:{heading:"Last Performed",helper:"Leave blank to use today"},tag:{heading:"Tag"},icon:{heading:"Icon"},label:{heading:"Label(s)"},area:{heading:"Area"},description:{heading:"Description"},trigger_type:{heading:"Trigger type"},count_entity_id:{heading:"Counted entity"},count_threshold:{heading:"Count threshold"},runtime_entity_id:{heading:"Runtime sensor"},runtime_threshold:{heading:"Runtime threshold"},group_id:{heading:"Group",helper:"Pick a group or type a new name"}},sections:{optional:"Optional settings"},actions:{add_task:"Add Task"},alerts:{required:"Please fill all fields",error:"Error adding task. See console for details."}},current:{title:"Current Tasks",no_items:"No tasks found.",every:"every",last:"Last",next:"Next Due",actions:{complete:"Complete",edit:"Edit",move:"Move to group",remove:"Remove"},confirm_remove:"Are you sure you want to remove this task?",alerts:{complete_success:'"{title}" marked complete. The next due date was recalculated.',complete_error:"Failed to mark task complete. See console for details.",remove_error:"Failed to remove the task. See console for details."}},groups:{title:"Groups",fields:{new_group:{heading:"New group"}},actions:{create:"Create",rename:"Rename",delete:"Delete",save:"Save",cancel:"Cancel"},empty:"No groups yet. Create one to organize your tasks.",confirm_delete:'Delete group "{title}"? Its tasks move to Ungrouped.',alerts:{error:"Failed to create the group. Check the browser console and Home Assistant logs.",exists:'Group "{title}" already exists.',rename_error:"Failed to rename the group. See console for details.",delete_error:"Failed to delete the group. See console for details."},confirm_delete_title:"Delete Group"}},dialog:{edit_task:{title:"Edit Task",fields:{interval_value:{heading:"Interval"},interval_type:{heading:"Interval Type"},last_performed:{heading:"Last Performed",helper:"Leave blank to use today"},tag:{heading:"Tag"},icon:{heading:"Icon"},label:{heading:"Label(s)"},area:{heading:"Area"},trigger_type:{heading:"Trigger type"},count_entity_id:{heading:"Counted entity"},count_threshold:{heading:"Count threshold"},runtime_entity_id:{heading:"Runtime sensor"},runtime_threshold:{heading:"Runtime threshold"},title:{heading:"Title"},description:{heading:"Description"},group_id:{heading:"Group",helper:"Pick a group or type a new name"}},sections:{optional:"Optional settings"},actions:{cancel:"Cancel",save:"Save"},alerts:{error:"Failed to save changes. See console for details."}},move_task:{title:"Move task",fields:{group_id:{heading:"Group"}},actions:{cancel:"Cancel",move:"Move"}},confirm_complete:{title:"Mark Task Complete",message:'Mark "{title}" as complete? Last performed will be reset to today and the next due date will be recalculated based on the {interval} interval.',message_progress:'Mark "{title}" as complete? Progress ({interval}) will start over.',actions:{cancel:"Cancel",confirm:"Mark Complete"}},confirm_remove:{title:"Remove Task",message:'Remove "{title}"? This cannot be undone.',actions:{confirm:"Remove"}}}},p3={common:a3,intervals:A3,trigger_types:n3,card:d3,panel:m3};var t2={};O2(t2,{card:()=>s3,common:()=>l3,default:()=>Z3,intervals:()=>v3,panel:()=>u3,trigger_types:()=>x3});var l3={loading:"Wird geladen...",none:"Keine",no_tasks:"Keine Aufgaben gefunden.",ungrouped:"Ohne Gruppe",cancel:"Abbrechen",invalid_date:"Ung\xFCltiges Datum eingegeben."},v3={day:"Tag",days:"Tage",week:"Woche",weeks:"Wochen",month:"Monat",months:"Monate",every_uses:"Alle {value} Nutzungen",every_runtime:"Alle {value} Laufzeit"},x3={time:"Zeitbasiert",count:"Z\xE4hlerbasiert",runtime:"Laufzeitbasiert"},s3={add_task:{added:'"{title}" wurde hinzugef\xFCgt.'}},u3={cards:{new:{title:"Neue Aufgabe erstellen",fields:{title:{heading:"Aufgabentitel"},interval_value:{heading:"Intervall"},interval_type:{heading:"Intervalltyp"},last_performed:{heading:"Zuletzt durchgef\xFChrt",helper:"Leer lassen, um heutiges Datum zu verwenden"},tag:{heading:"Tag"},icon:{heading:"Symbol"},label:{heading:"Bezeichnung(en)"},area:{heading:"Bereich"},trigger_type:{heading:"Ausl\xF6ser-Typ"},count_entity_id:{heading:"Gez\xE4hlte Entit\xE4t"},count_threshold:{heading:"Z\xE4hl-Schwellwert"},runtime_entity_id:{heading:"Laufzeit-Sensor"},runtime_threshold:{heading:"Laufzeit-Schwellwert"},description:{heading:"Beschreibung"},group_id:{heading:"Gruppe",helper:"Gruppe w\xE4hlen oder neuen Namen eingeben"}},sections:{optional:"Optionale Einstellungen"},actions:{add_task:"Aufgabe hinzuf\xFCgen"},alerts:{required:"Bitte alle Felder ausf\xFCllen",error:"Fehler beim Hinzuf\xFCgen der Aufgabe. Siehe Konsole f\xFCr Details."}},current:{title:"Aktuelle Aufgaben",no_items:"Keine Aufgaben gefunden.",every:"alle",last:"Zuletzt",next:"N\xE4chste F\xE4lligkeit",actions:{complete:"Abschlie\xDFen",edit:"Bearbeiten",move:"In Gruppe verschieben",remove:"Entfernen"},confirm_remove:"Sind Sie sicher, dass Sie diese Aufgabe entfernen m\xF6chten?",alerts:{complete_success:'"{title}" wurde als erledigt markiert. Das n\xE4chste F\xE4lligkeitsdatum wurde neu berechnet.',complete_error:"Aufgabe konnte nicht als erledigt markiert werden. Details siehe Konsole.",remove_error:"Aufgabe konnte nicht entfernt werden. Details in der Konsole."}},groups:{title:"Gruppen",fields:{new_group:{heading:"Neue Gruppe"}},actions:{create:"Erstellen",rename:"Umbenennen",delete:"L\xF6schen",save:"Speichern",cancel:"Abbrechen"},empty:"Noch keine Gruppen. Erstellen Sie eine, um Aufgaben zu organisieren.",confirm_delete:'Gruppe "{title}" l\xF6schen? Ihre Aufgaben werden in "Ohne Gruppe" verschoben.',alerts:{error:"Gruppe konnte nicht erstellt werden. Pr\xFCfen Sie die Browserkonsole und die Home-Assistant-Protokolle.",exists:'Gruppe "{title}" existiert bereits.',rename_error:"Gruppe konnte nicht umbenannt werden. Details in der Konsole.",delete_error:"Gruppe konnte nicht gel\xF6scht werden. Details in der Konsole."},confirm_delete_title:"Gruppe l\xF6schen"}},dialog:{edit_task:{title:"Aufgabe bearbeiten",fields:{interval_value:{heading:"Intervall"},interval_type:{heading:"Intervalltyp"},last_performed:{heading:"Zuletzt durchgef\xFChrt",helper:"Leer lassen, um heutiges Datum zu verwenden"},tag:{heading:"Tag"},icon:{heading:"Symbol"},label:{heading:"Bezeichnung(en)"},area:{heading:"Bereich"},trigger_type:{heading:"Ausl\xF6ser-Typ"},count_entity_id:{heading:"Gez\xE4hlte Entit\xE4t"},count_threshold:{heading:"Z\xE4hl-Schwellwert"},runtime_entity_id:{heading:"Laufzeit-Sensor"},runtime_threshold:{heading:"Laufzeit-Schwellwert"},title:{heading:"Titel"},description:{heading:"Beschreibung"},group_id:{heading:"Gruppe",helper:"Gruppe w\xE4hlen oder neuen Namen eingeben"}},sections:{optional:"Optionale Einstellungen"},actions:{cancel:"Abbrechen",save:"Speichern"},alerts:{error:"\xC4nderungen konnten nicht gespeichert werden. Details in der Konsole."}},move_task:{title:"Aufgabe verschieben",fields:{group_id:{heading:"Gruppe"}},actions:{cancel:"Abbrechen",move:"Verschieben"}},confirm_complete:{title:"Aufgabe als erledigt markieren",message:'"{title}" als erledigt markieren? Zuletzt durchgef\xFChrt wird auf heute zur\xFCckgesetzt und das n\xE4chste F\xE4lligkeitsdatum wird basierend auf dem Intervall von {interval} neu berechnet.',message_progress:'"{title}" als erledigt markieren? Der Fortschritt ({interval}) beginnt von vorn.',actions:{cancel:"Abbrechen",confirm:"Als erledigt markieren"}},confirm_remove:{title:"Aufgabe entfernen",message:'"{title}" entfernen? Dies kann nicht r\xFCckg\xE4ngig gemacht werden.',actions:{confirm:"Entfernen"}}}},Z3={common:l3,intervals:v3,trigger_types:x3,card:s3,panel:u3};var i2=function(C,H){return i2=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(V,L){V.__proto__=L}||function(V,L){for(var M in L)Object.prototype.hasOwnProperty.call(L,M)&&(V[M]=L[M])},i2(C,H)};function l1(C,H){if(typeof H!="function"&&H!==null)throw new TypeError("Class extends value "+String(H)+" is not a constructor or null");i2(C,H);function V(){this.constructor=C}C.prototype=H===null?Object.create(H):(V.prototype=H.prototype,new V)}var v=function(){return v=Object.assign||function(H){for(var V,L=1,M=arguments.length;L<M;L++){V=arguments[L];for(var r in V)Object.prototype.hasOwnProperty.call(V,r)&&(H[r]=V[r])}return H},v.apply(this,arguments)};function k1(C,H,V){if(V||arguments.length===2)for(var L=0,M=H.length,r;L<M;L++)(r||!(L in H))&&(r||(r=Array.prototype.slice.call(H,0,L)),r[L]=H[L]);return C.concat(r||Array.prototype.slice.call(H))}var l;(function(C){C[C.EXPECT_ARGUMENT_CLOSING_BRACE=1]="EXPECT_ARGUMENT_CLOSING_BRACE",C[C.EMPTY_ARGUMENT=2]="EMPTY_ARGUMENT",C[C.MALFORMED_ARGUMENT=3]="MALFORMED_ARGUMENT",C[C.EXPECT_ARGUMENT_TYPE=4]="EXPECT_ARGUMENT_TYPE",C[C.INVALID_ARGUMENT_TYPE=5]="INVALID_ARGUMENT_TYPE",C[C.EXPECT_ARGUMENT_STYLE=6]="EXPECT_ARGUMENT_STYLE",C[C.INVALID_NUMBER_SKELETON=7]="INVALID_NUMBER_SKELETON",C[C.INVALID_DATE_TIME_SKELETON=8]="INVALID_DATE_TIME_SKELETON",C[C.EXPECT_NUMBER_SKELETON=9]="EXPECT_NUMBER_SKELETON",C[C.EXPECT_DATE_TIME_SKELETON=10]="EXPECT_DATE_TIME_SKELETON",C[C.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE=11]="UNCLOSED_QUOTE_IN_ARGUMENT_STYLE",C[C.EXPECT_SELECT_ARGUMENT_OPTIONS=12]="EXPECT_SELECT_ARGUMENT_OPTIONS",C[C.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE=13]="EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE",C[C.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE=14]="INVALID_PLURAL_ARGUMENT_OFFSET_VALUE",C[C.EXPECT_SELECT_ARGUMENT_SELECTOR=15]="EXPECT_SELECT_ARGUMENT_SELECTOR",C[C.EXPECT_PLURAL_ARGUMENT_SELECTOR=16]="EXPECT_PLURAL_ARGUMENT_SELECTOR",C[C.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT=17]="EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT",C[C.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT=18]="EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT",C[C.INVALID_PLURAL_ARGUMENT_SELECTOR=19]="INVALID_PLURAL_ARGUMENT_SELECTOR",C[C.DUPLICATE_PLURAL_ARGUMENT_SELECTOR=20]="DUPLICATE_PLURAL_ARGUMENT_SELECTOR",C[C.DUPLICATE_SELECT_ARGUMENT_SELECTOR=21]="DUPLICATE_SELECT_ARGUMENT_SELECTOR",C[C.MISSING_OTHER_CLAUSE=22]="MISSING_OTHER_CLAUSE",C[C.INVALID_TAG=23]="INVALID_TAG",C[C.INVALID_TAG_NAME=25]="INVALID_TAG_NAME",C[C.UNMATCHED_CLOSING_TAG=26]="UNMATCHED_CLOSING_TAG",C[C.UNCLOSED_TAG=27]="UNCLOSED_TAG"})(l||(l={}));var Z;(function(C){C[C.literal=0]="literal",C[C.argument=1]="argument",C[C.number=2]="number",C[C.date=3]="date",C[C.time=4]="time",C[C.select=5]="select",C[C.plural=6]="plural",C[C.pound=7]="pound",C[C.tag=8]="tag"})(Z||(Z={}));var z;(function(C){C[C.number=0]="number",C[C.dateTime=1]="dateTime"})(z||(z={}));function o2(C){return C.type===Z.literal}function $2(C){return C.type===Z.argument}function w1(C){return C.type===Z.number}function B1(C){return C.type===Z.date}function T1(C){return C.type===Z.time}function P1(C){return C.type===Z.select}function _1(C){return C.type===Z.plural}function Q2(C){return C.type===Z.pound}function F1(C){return C.type===Z.tag}function E1(C){return!!(C&&typeof C=="object"&&C.type===z.number)}function v1(C){return!!(C&&typeof C=="object"&&C.type===z.dateTime)}var a2=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;var S3=/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;function z2(C){var H={};return C.replace(S3,function(V){var L=V.length;switch(V[0]){case"G":H.era=L===4?"long":L===5?"narrow":"short";break;case"y":H.year=L===2?"2-digit":"numeric";break;case"Y":case"u":case"U":case"r":throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");case"q":case"Q":throw new RangeError("`q/Q` (quarter) patterns are not supported");case"M":case"L":H.month=["numeric","2-digit","short","long","narrow"][L-1];break;case"w":case"W":throw new RangeError("`w/W` (week) patterns are not supported");case"d":H.day=["numeric","2-digit"][L-1];break;case"D":case"F":case"g":throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");case"E":H.weekday=L===4?"short":L===5?"narrow":"short";break;case"e":if(L<4)throw new RangeError("`e..eee` (weekday) patterns are not supported");H.weekday=["short","long","narrow","short"][L-4];break;case"c":if(L<4)throw new RangeError("`c..ccc` (weekday) patterns are not supported");H.weekday=["short","long","narrow","short"][L-4];break;case"a":H.hour12=!0;break;case"b":case"B":throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");case"h":H.hourCycle="h12",H.hour=["numeric","2-digit"][L-1];break;case"H":H.hourCycle="h23",H.hour=["numeric","2-digit"][L-1];break;case"K":H.hourCycle="h11",H.hour=["numeric","2-digit"][L-1];break;case"k":H.hourCycle="h24",H.hour=["numeric","2-digit"][L-1];break;case"j":case"J":case"C":throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");case"m":H.minute=["numeric","2-digit"][L-1];break;case"s":H.second=["numeric","2-digit"][L-1];break;case"S":case"A":throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");case"z":H.timeZoneName=L<4?"short":"long";break;case"Z":case"O":case"v":case"V":case"X":case"x":throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead")}return""}),H}var j2=/[\t-\r \x85\u200E\u200F\u2028\u2029]/i;function Y2(C){if(C.length===0)throw new Error("Number skeleton cannot be empty");for(var H=C.split(j2).filter(function(p){return p.length>0}),V=[],L=0,M=H;L<M.length;L++){var r=M[L],e=r.split("/");if(e.length===0)throw new Error("Invalid number skeleton");for(var t=e[0],i=e.slice(1),a=0,A=i;a<A.length;a++){var n=A[a];if(n.length===0)throw new Error("Invalid number skeleton")}V.push({stem:t,options:i})}return V}function c3(C){return C.replace(/^(.*?)-/,"")}var q2=/^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,J2=/^(@+)?(\+|#+)?[rs]?$/g,h3=/(\*)(0+)|(#+)(0+)|(0+)/g,C5=/^(0+)$/;function K2(C){var H={};return C[C.length-1]==="r"?H.roundingPriority="morePrecision":C[C.length-1]==="s"&&(H.roundingPriority="lessPrecision"),C.replace(J2,function(V,L,M){return typeof M!="string"?(H.minimumSignificantDigits=L.length,H.maximumSignificantDigits=L.length):M==="+"?H.minimumSignificantDigits=L.length:L[0]==="#"?H.maximumSignificantDigits=L.length:(H.minimumSignificantDigits=L.length,H.maximumSignificantDigits=L.length+(typeof M=="string"?M.length:0)),""}),H}function H5(C){switch(C){case"sign-auto":return{signDisplay:"auto"};case"sign-accounting":case"()":return{currencySign:"accounting"};case"sign-always":case"+!":return{signDisplay:"always"};case"sign-accounting-always":case"()!":return{signDisplay:"always",currencySign:"accounting"};case"sign-except-zero":case"+?":return{signDisplay:"exceptZero"};case"sign-accounting-except-zero":case"()?":return{signDisplay:"exceptZero",currencySign:"accounting"};case"sign-never":case"+_":return{signDisplay:"never"}}}function f3(C){var H;if(C[0]==="E"&&C[1]==="E"?(H={notation:"engineering"},C=C.slice(2)):C[0]==="E"&&(H={notation:"scientific"},C=C.slice(1)),H){var V=C.slice(0,2);if(V==="+!"?(H.signDisplay="always",C=C.slice(2)):V==="+?"&&(H.signDisplay="exceptZero",C=C.slice(2)),!C5.test(C))throw new Error("Malformed concise eng/scientific notation");H.minimumIntegerDigits=C.length}return H}function X2(C){var H={},V=H5(C);return V||H}function V5(C){for(var H={},V=0,L=C;V<L.length;V++){var M=L[V];switch(M.stem){case"percent":case"%":H.style="percent";continue;case"%x100":H.style="percent",H.scale=100;continue;case"currency":H.style="currency",H.currency=M.options[0];continue;case"group-off":case",_":H.useGrouping=!1;continue;case"precision-integer":case".":H.maximumFractionDigits=0;continue;case"measure-unit":case"unit":H.style="unit",H.unit=c3(M.options[0]);continue;case"compact-short":case"K":H.notation="compact",H.compactDisplay="short";continue;case"compact-long":case"KK":H.notation="compact",H.compactDisplay="long";continue;case"scientific":H=v(v(v({},H),{notation:"scientific"}),M.options.reduce(function(i,a){return v(v({},i),X2(a))},{}));continue;case"engineering":H=v(v(v({},H),{notation:"engineering"}),M.options.reduce(function(i,a){return v(v({},i),X2(a))},{}));continue;case"notation-simple":H.notation="standard";continue;case"unit-width-narrow":H.currencyDisplay="narrowSymbol",H.unitDisplay="narrow";continue;case"unit-width-short":H.currencyDisplay="code",H.unitDisplay="short";continue;case"unit-width-full-name":H.currencyDisplay="name",H.unitDisplay="long";continue;case"unit-width-iso-code":H.currencyDisplay="symbol";continue;case"scale":H.scale=parseFloat(M.options[0]);continue;case"integer-width":if(M.options.length>1)throw new RangeError("integer-width stems only accept a single optional option");M.options[0].replace(h3,function(i,a,A,n,p,u){if(a)H.minimumIntegerDigits=A.length;else{if(n&&p)throw new Error("We currently do not support maximum integer digits");if(u)throw new Error("We currently do not support exact integer digits")}return""});continue}if(C5.test(M.stem)){H.minimumIntegerDigits=M.stem.length;continue}if(q2.test(M.stem)){if(M.options.length>1)throw new RangeError("Fraction-precision stems only accept a single optional option");M.stem.replace(q2,function(i,a,A,n,p,u){return A==="*"?H.minimumFractionDigits=a.length:n&&n[0]==="#"?H.maximumFractionDigits=n.length:p&&u?(H.minimumFractionDigits=p.length,H.maximumFractionDigits=p.length+u.length):(H.minimumFractionDigits=a.length,H.maximumFractionDigits=a.length),""});var r=M.options[0];r==="w"?H=v(v({},H),{trailingZeroDisplay:"stripIfInteger"}):r&&(H=v(v({},H),K2(r)));continue}if(J2.test(M.stem)){H=v(v({},H),K2(M.stem));continue}var e=H5(M.stem);e&&(H=v(v({},H),e));var t=f3(M.stem);t&&(H=v(v({},H),t))}return H}var x1={AX:["H"],BQ:["H"],CP:["H"],CZ:["H"],DK:["H"],FI:["H"],ID:["H"],IS:["H"],ML:["H"],NE:["H"],RU:["H"],SE:["H"],SJ:["H"],SK:["H"],AS:["h","H"],BT:["h","H"],DJ:["h","H"],ER:["h","H"],GH:["h","H"],IN:["h","H"],LS:["h","H"],PG:["h","H"],PW:["h","H"],SO:["h","H"],TO:["h","H"],VU:["h","H"],WS:["h","H"],"001":["H","h"],AL:["h","H","hB"],TD:["h","H","hB"],"ca-ES":["H","h","hB"],CF:["H","h","hB"],CM:["H","h","hB"],"fr-CA":["H","h","hB"],"gl-ES":["H","h","hB"],"it-CH":["H","h","hB"],"it-IT":["H","h","hB"],LU:["H","h","hB"],NP:["H","h","hB"],PF:["H","h","hB"],SC:["H","h","hB"],SM:["H","h","hB"],SN:["H","h","hB"],TF:["H","h","hB"],VA:["H","h","hB"],CY:["h","H","hb","hB"],GR:["h","H","hb","hB"],CO:["h","H","hB","hb"],DO:["h","H","hB","hb"],KP:["h","H","hB","hb"],KR:["h","H","hB","hb"],NA:["h","H","hB","hb"],PA:["h","H","hB","hb"],PR:["h","H","hB","hb"],VE:["h","H","hB","hb"],AC:["H","h","hb","hB"],AI:["H","h","hb","hB"],BW:["H","h","hb","hB"],BZ:["H","h","hb","hB"],CC:["H","h","hb","hB"],CK:["H","h","hb","hB"],CX:["H","h","hb","hB"],DG:["H","h","hb","hB"],FK:["H","h","hb","hB"],GB:["H","h","hb","hB"],GG:["H","h","hb","hB"],GI:["H","h","hb","hB"],IE:["H","h","hb","hB"],IM:["H","h","hb","hB"],IO:["H","h","hb","hB"],JE:["H","h","hb","hB"],LT:["H","h","hb","hB"],MK:["H","h","hb","hB"],MN:["H","h","hb","hB"],MS:["H","h","hb","hB"],NF:["H","h","hb","hB"],NG:["H","h","hb","hB"],NR:["H","h","hb","hB"],NU:["H","h","hb","hB"],PN:["H","h","hb","hB"],SH:["H","h","hb","hB"],SX:["H","h","hb","hB"],TA:["H","h","hb","hB"],ZA:["H","h","hb","hB"],"af-ZA":["H","h","hB","hb"],AR:["H","h","hB","hb"],CL:["H","h","hB","hb"],CR:["H","h","hB","hb"],CU:["H","h","hB","hb"],EA:["H","h","hB","hb"],"es-BO":["H","h","hB","hb"],"es-BR":["H","h","hB","hb"],"es-EC":["H","h","hB","hb"],"es-ES":["H","h","hB","hb"],"es-GQ":["H","h","hB","hb"],"es-PE":["H","h","hB","hb"],GT:["H","h","hB","hb"],HN:["H","h","hB","hb"],IC:["H","h","hB","hb"],KG:["H","h","hB","hb"],KM:["H","h","hB","hb"],LK:["H","h","hB","hb"],MA:["H","h","hB","hb"],MX:["H","h","hB","hb"],NI:["H","h","hB","hb"],PY:["H","h","hB","hb"],SV:["H","h","hB","hb"],UY:["H","h","hB","hb"],JP:["H","h","K"],AD:["H","hB"],AM:["H","hB"],AO:["H","hB"],AT:["H","hB"],AW:["H","hB"],BE:["H","hB"],BF:["H","hB"],BJ:["H","hB"],BL:["H","hB"],BR:["H","hB"],CG:["H","hB"],CI:["H","hB"],CV:["H","hB"],DE:["H","hB"],EE:["H","hB"],FR:["H","hB"],GA:["H","hB"],GF:["H","hB"],GN:["H","hB"],GP:["H","hB"],GW:["H","hB"],HR:["H","hB"],IL:["H","hB"],IT:["H","hB"],KZ:["H","hB"],MC:["H","hB"],MD:["H","hB"],MF:["H","hB"],MQ:["H","hB"],MZ:["H","hB"],NC:["H","hB"],NL:["H","hB"],PM:["H","hB"],PT:["H","hB"],RE:["H","hB"],RO:["H","hB"],SI:["H","hB"],SR:["H","hB"],ST:["H","hB"],TG:["H","hB"],TR:["H","hB"],WF:["H","hB"],YT:["H","hB"],BD:["h","hB","H"],PK:["h","hB","H"],AZ:["H","hB","h"],BA:["H","hB","h"],BG:["H","hB","h"],CH:["H","hB","h"],GE:["H","hB","h"],LI:["H","hB","h"],ME:["H","hB","h"],RS:["H","hB","h"],UA:["H","hB","h"],UZ:["H","hB","h"],XK:["H","hB","h"],AG:["h","hb","H","hB"],AU:["h","hb","H","hB"],BB:["h","hb","H","hB"],BM:["h","hb","H","hB"],BS:["h","hb","H","hB"],CA:["h","hb","H","hB"],DM:["h","hb","H","hB"],"en-001":["h","hb","H","hB"],FJ:["h","hb","H","hB"],FM:["h","hb","H","hB"],GD:["h","hb","H","hB"],GM:["h","hb","H","hB"],GU:["h","hb","H","hB"],GY:["h","hb","H","hB"],JM:["h","hb","H","hB"],KI:["h","hb","H","hB"],KN:["h","hb","H","hB"],KY:["h","hb","H","hB"],LC:["h","hb","H","hB"],LR:["h","hb","H","hB"],MH:["h","hb","H","hB"],MP:["h","hb","H","hB"],MW:["h","hb","H","hB"],NZ:["h","hb","H","hB"],SB:["h","hb","H","hB"],SG:["h","hb","H","hB"],SL:["h","hb","H","hB"],SS:["h","hb","H","hB"],SZ:["h","hb","H","hB"],TC:["h","hb","H","hB"],TT:["h","hb","H","hB"],UM:["h","hb","H","hB"],US:["h","hb","H","hB"],VC:["h","hb","H","hB"],VG:["h","hb","H","hB"],VI:["h","hb","H","hB"],ZM:["h","hb","H","hB"],BO:["H","hB","h","hb"],EC:["H","hB","h","hb"],ES:["H","hB","h","hb"],GQ:["H","hB","h","hb"],PE:["H","hB","h","hb"],AE:["h","hB","hb","H"],"ar-001":["h","hB","hb","H"],BH:["h","hB","hb","H"],DZ:["h","hB","hb","H"],EG:["h","hB","hb","H"],EH:["h","hB","hb","H"],HK:["h","hB","hb","H"],IQ:["h","hB","hb","H"],JO:["h","hB","hb","H"],KW:["h","hB","hb","H"],LB:["h","hB","hb","H"],LY:["h","hB","hb","H"],MO:["h","hB","hb","H"],MR:["h","hB","hb","H"],OM:["h","hB","hb","H"],PH:["h","hB","hb","H"],PS:["h","hB","hb","H"],QA:["h","hB","hb","H"],SA:["h","hB","hb","H"],SD:["h","hB","hb","H"],SY:["h","hB","hb","H"],TN:["h","hB","hb","H"],YE:["h","hB","hb","H"],AF:["H","hb","hB","h"],LA:["H","hb","hB","h"],CN:["H","hB","hb","h"],LV:["H","hB","hb","h"],TL:["H","hB","hb","h"],"zu-ZA":["H","hB","hb","h"],CD:["hB","H"],IR:["hB","H"],"hi-IN":["hB","h","H"],"kn-IN":["hB","h","H"],"ml-IN":["hB","h","H"],"te-IN":["hB","h","H"],KH:["hB","h","H","hb"],"ta-IN":["hB","h","hb","H"],BN:["hb","hB","h","H"],MY:["hb","hB","h","H"],ET:["hB","hb","h","H"],"gu-IN":["hB","hb","h","H"],"mr-IN":["hB","hb","h","H"],"pa-IN":["hB","hb","h","H"],TW:["hB","hb","h","H"],KE:["hB","hb","H","h"],MM:["hB","hb","H","h"],TZ:["hB","hb","H","h"],UG:["hB","hb","H","h"]};function L5(C,H){for(var V="",L=0;L<C.length;L++){var M=C.charAt(L);if(M==="j"){for(var r=0;L+1<C.length&&C.charAt(L+1)===M;)r++,L++;var e=1+(r&1),t=r<2?1:3+(r>>1),i="a",a=g3(H);for((a=="H"||a=="k")&&(t=0);t-- >0;)V+=i;for(;e-- >0;)V=a+V}else M==="J"?V+="H":V+=M}return V}function g3(C){var H=C.hourCycle;if(H===void 0&&C.hourCycles&&C.hourCycles.length&&(H=C.hourCycles[0]),H)switch(H){case"h24":return"k";case"h23":return"H";case"h12":return"h";case"h11":return"K";default:throw new Error("Invalid hourCycle")}var V=C.language,L;V!=="root"&&(L=C.maximize().region);var M=x1[L||""]||x1[V||""]||x1["".concat(V,"-001")]||x1["001"];return M[0]}var A2,O3=new RegExp("^".concat(a2.source,"*")),y3=new RegExp("".concat(a2.source,"*$"));function x(C,H){return{start:C,end:H}}var b3=!!String.prototype.startsWith,k3=!!String.fromCodePoint,w3=!!Object.fromEntries,B3=!!String.prototype.codePointAt,T3=!!String.prototype.trimStart,P3=!!String.prototype.trimEnd,_3=!!Number.isSafeInteger,F3=_3?Number.isSafeInteger:function(C){return typeof C=="number"&&isFinite(C)&&Math.floor(C)===C&&Math.abs(C)<=9007199254740991},d2=!0;try{M5=i5("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu"),d2=((A2=M5.exec("a"))===null||A2===void 0?void 0:A2[0])==="a"}catch{d2=!1}var M5,r5=b3?function(H,V,L){return H.startsWith(V,L)}:function(H,V,L){return H.slice(L,L+V.length)===V},m2=k3?String.fromCodePoint:function(){for(var H=[],V=0;V<arguments.length;V++)H[V]=arguments[V];for(var L="",M=H.length,r=0,e;M>r;){if(e=H[r++],e>1114111)throw RangeError(e+" is not a valid code point");L+=e<65536?String.fromCharCode(e):String.fromCharCode(((e-=65536)>>10)+55296,e%1024+56320)}return L},e5=w3?Object.fromEntries:function(H){for(var V={},L=0,M=H;L<M.length;L++){var r=M[L],e=r[0],t=r[1];V[e]=t}return V},t5=B3?function(H,V){return H.codePointAt(V)}:function(H,V){var L=H.length;if(!(V<0||V>=L)){var M=H.charCodeAt(V),r;return M<55296||M>56319||V+1===L||(r=H.charCodeAt(V+1))<56320||r>57343?M:(M-55296<<10)+(r-56320)+65536}},E3=T3?function(H){return H.trimStart()}:function(H){return H.replace(O3,"")},R3=P3?function(H){return H.trimEnd()}:function(H){return H.replace(y3,"")};function i5(C,H){return new RegExp(C,H)}var p2;d2?(n2=i5("([^\\p{White_Space}\\p{Pattern_Syntax}]*)","yu"),p2=function(H,V){var L;n2.lastIndex=V;var M=n2.exec(H);return(L=M[1])!==null&&L!==void 0?L:""}):p2=function(H,V){for(var L=[];;){var M=t5(H,V);if(M===void 0||a5(M)||I3(M))break;L.push(M),V+=M>=65536?2:1}return m2.apply(void 0,L)};var n2,o5=(function(){function C(H,V){V===void 0&&(V={}),this.message=H,this.position={offset:0,line:1,column:1},this.ignoreTag=!!V.ignoreTag,this.locale=V.locale,this.requiresOtherClause=!!V.requiresOtherClause,this.shouldParseSkeletons=!!V.shouldParseSkeletons}return C.prototype.parse=function(){if(this.offset()!==0)throw Error("parser can only be used once");return this.parseMessage(0,"",!1)},C.prototype.parseMessage=function(H,V,L){for(var M=[];!this.isEOF();){var r=this.char();if(r===123){var e=this.parseArgument(H,L);if(e.err)return e;M.push(e.val)}else{if(r===125&&H>0)break;if(r===35&&(V==="plural"||V==="selectordinal")){var t=this.clonePosition();this.bump(),M.push({type:Z.pound,location:x(t,this.clonePosition())})}else if(r===60&&!this.ignoreTag&&this.peek()===47){if(L)break;return this.error(l.UNMATCHED_CLOSING_TAG,x(this.clonePosition(),this.clonePosition()))}else if(r===60&&!this.ignoreTag&&l2(this.peek()||0)){var e=this.parseTag(H,V);if(e.err)return e;M.push(e.val)}else{var e=this.parseLiteral(H,V);if(e.err)return e;M.push(e.val)}}}return{val:M,err:null}},C.prototype.parseTag=function(H,V){var L=this.clonePosition();this.bump();var M=this.parseTagName();if(this.bumpSpace(),this.bumpIf("/>"))return{val:{type:Z.literal,value:"<".concat(M,"/>"),location:x(L,this.clonePosition())},err:null};if(this.bumpIf(">")){var r=this.parseMessage(H+1,V,!0);if(r.err)return r;var e=r.val,t=this.clonePosition();if(this.bumpIf("</")){if(this.isEOF()||!l2(this.char()))return this.error(l.INVALID_TAG,x(t,this.clonePosition()));var i=this.clonePosition(),a=this.parseTagName();return M!==a?this.error(l.UNMATCHED_CLOSING_TAG,x(i,this.clonePosition())):(this.bumpSpace(),this.bumpIf(">")?{val:{type:Z.tag,value:M,children:e,location:x(L,this.clonePosition())},err:null}:this.error(l.INVALID_TAG,x(t,this.clonePosition())))}else return this.error(l.UNCLOSED_TAG,x(L,this.clonePosition()))}else return this.error(l.INVALID_TAG,x(L,this.clonePosition()))},C.prototype.parseTagName=function(){var H=this.offset();for(this.bump();!this.isEOF()&&N3(this.char());)this.bump();return this.message.slice(H,this.offset())},C.prototype.parseLiteral=function(H,V){for(var L=this.clonePosition(),M="";;){var r=this.tryParseQuote(V);if(r){M+=r;continue}var e=this.tryParseUnquoted(H,V);if(e){M+=e;continue}var t=this.tryParseLeftAngleBracket();if(t){M+=t;continue}break}var i=x(L,this.clonePosition());return{val:{type:Z.literal,value:M,location:i},err:null}},C.prototype.tryParseLeftAngleBracket=function(){return!this.isEOF()&&this.char()===60&&(this.ignoreTag||!D3(this.peek()||0))?(this.bump(),"<"):null},C.prototype.tryParseQuote=function(H){if(this.isEOF()||this.char()!==39)return null;switch(this.peek()){case 39:return this.bump(),this.bump(),"'";case 123:case 60:case 62:case 125:break;case 35:if(H==="plural"||H==="selectordinal")break;return null;default:return null}this.bump();var V=[this.char()];for(this.bump();!this.isEOF();){var L=this.char();if(L===39)if(this.peek()===39)V.push(39),this.bump();else{this.bump();break}else V.push(L);this.bump()}return m2.apply(void 0,V)},C.prototype.tryParseUnquoted=function(H,V){if(this.isEOF())return null;var L=this.char();return L===60||L===123||L===35&&(V==="plural"||V==="selectordinal")||L===125&&H>0?null:(this.bump(),m2(L))},C.prototype.parseArgument=function(H,V){var L=this.clonePosition();if(this.bump(),this.bumpSpace(),this.isEOF())return this.error(l.EXPECT_ARGUMENT_CLOSING_BRACE,x(L,this.clonePosition()));if(this.char()===125)return this.bump(),this.error(l.EMPTY_ARGUMENT,x(L,this.clonePosition()));var M=this.parseIdentifierIfPossible().value;if(!M)return this.error(l.MALFORMED_ARGUMENT,x(L,this.clonePosition()));if(this.bumpSpace(),this.isEOF())return this.error(l.EXPECT_ARGUMENT_CLOSING_BRACE,x(L,this.clonePosition()));switch(this.char()){case 125:return this.bump(),{val:{type:Z.argument,value:M,location:x(L,this.clonePosition())},err:null};case 44:return this.bump(),this.bumpSpace(),this.isEOF()?this.error(l.EXPECT_ARGUMENT_CLOSING_BRACE,x(L,this.clonePosition())):this.parseArgumentOptions(H,V,M,L);default:return this.error(l.MALFORMED_ARGUMENT,x(L,this.clonePosition()))}},C.prototype.parseIdentifierIfPossible=function(){var H=this.clonePosition(),V=this.offset(),L=p2(this.message,V),M=V+L.length;this.bumpTo(M);var r=this.clonePosition(),e=x(H,r);return{value:L,location:e}},C.prototype.parseArgumentOptions=function(H,V,L,M){var r,e=this.clonePosition(),t=this.parseIdentifierIfPossible().value,i=this.clonePosition();switch(t){case"":return this.error(l.EXPECT_ARGUMENT_TYPE,x(e,i));case"number":case"date":case"time":{this.bumpSpace();var a=null;if(this.bumpIf(",")){this.bumpSpace();var A=this.clonePosition(),n=this.parseSimpleArgStyleIfPossible();if(n.err)return n;var p=R3(n.val);if(p.length===0)return this.error(l.EXPECT_ARGUMENT_STYLE,x(this.clonePosition(),this.clonePosition()));var u=x(A,this.clonePosition());a={style:p,styleLocation:u}}var g=this.tryParseArgumentClose(M);if(g.err)return g;var w=x(M,this.clonePosition());if(a&&r5(a?.style,"::",0)){var N=E3(a.style.slice(2));if(t==="number"){var n=this.parseNumberSkeletonFromString(N,a.styleLocation);return n.err?n:{val:{type:Z.number,value:L,location:w,style:n.val},err:null}}else{if(N.length===0)return this.error(l.EXPECT_DATE_TIME_SKELETON,w);var M1=N;this.locale&&(M1=L5(N,this.locale));var p={type:z.dateTime,pattern:M1,location:a.styleLocation,parsedOptions:this.shouldParseSkeletons?z2(M1):{}},K=t==="date"?Z.date:Z.time;return{val:{type:K,value:L,location:w,style:p},err:null}}}return{val:{type:t==="number"?Z.number:t==="date"?Z.date:Z.time,value:L,location:w,style:(r=a?.style)!==null&&r!==void 0?r:null},err:null}}case"plural":case"selectordinal":case"select":{var B=this.clonePosition();if(this.bumpSpace(),!this.bumpIf(","))return this.error(l.EXPECT_SELECT_ARGUMENT_OPTIONS,x(B,v({},B)));this.bumpSpace();var r1=this.parseIdentifierIfPossible(),I=0;if(t!=="select"&&r1.value==="offset"){if(!this.bumpIf(":"))return this.error(l.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,x(this.clonePosition(),this.clonePosition()));this.bumpSpace();var n=this.tryParseDecimalInteger(l.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE,l.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);if(n.err)return n;this.bumpSpace(),r1=this.parseIdentifierIfPossible(),I=n.val}var f1=this.tryParsePluralOrSelectOptions(H,t,V,r1);if(f1.err)return f1;var g=this.tryParseArgumentClose(M);if(g.err)return g;var f2=x(M,this.clonePosition());return t==="select"?{val:{type:Z.select,value:L,options:e5(f1.val),location:f2},err:null}:{val:{type:Z.plural,value:L,options:e5(f1.val),offset:I,pluralType:t==="plural"?"cardinal":"ordinal",location:f2},err:null}}default:return this.error(l.INVALID_ARGUMENT_TYPE,x(e,i))}},C.prototype.tryParseArgumentClose=function(H){return this.isEOF()||this.char()!==125?this.error(l.EXPECT_ARGUMENT_CLOSING_BRACE,x(H,this.clonePosition())):(this.bump(),{val:!0,err:null})},C.prototype.parseSimpleArgStyleIfPossible=function(){for(var H=0,V=this.clonePosition();!this.isEOF();){var L=this.char();switch(L){case 39:{this.bump();var M=this.clonePosition();if(!this.bumpUntil("'"))return this.error(l.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE,x(M,this.clonePosition()));this.bump();break}case 123:{H+=1,this.bump();break}case 125:{if(H>0)H-=1;else return{val:this.message.slice(V.offset,this.offset()),err:null};break}default:this.bump();break}}return{val:this.message.slice(V.offset,this.offset()),err:null}},C.prototype.parseNumberSkeletonFromString=function(H,V){var L=[];try{L=Y2(H)}catch{return this.error(l.INVALID_NUMBER_SKELETON,V)}return{val:{type:z.number,tokens:L,location:V,parsedOptions:this.shouldParseSkeletons?V5(L):{}},err:null}},C.prototype.tryParsePluralOrSelectOptions=function(H,V,L,M){for(var r,e=!1,t=[],i=new Set,a=M.value,A=M.location;;){if(a.length===0){var n=this.clonePosition();if(V!=="select"&&this.bumpIf("=")){var p=this.tryParseDecimalInteger(l.EXPECT_PLURAL_ARGUMENT_SELECTOR,l.INVALID_PLURAL_ARGUMENT_SELECTOR);if(p.err)return p;A=x(n,this.clonePosition()),a=this.message.slice(n.offset,this.offset())}else break}if(i.has(a))return this.error(V==="select"?l.DUPLICATE_SELECT_ARGUMENT_SELECTOR:l.DUPLICATE_PLURAL_ARGUMENT_SELECTOR,A);a==="other"&&(e=!0),this.bumpSpace();var u=this.clonePosition();if(!this.bumpIf("{"))return this.error(V==="select"?l.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT:l.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT,x(this.clonePosition(),this.clonePosition()));var g=this.parseMessage(H+1,V,L);if(g.err)return g;var w=this.tryParseArgumentClose(u);if(w.err)return w;t.push([a,{value:g.val,location:x(u,this.clonePosition())}]),i.add(a),this.bumpSpace(),r=this.parseIdentifierIfPossible(),a=r.value,A=r.location}return t.length===0?this.error(V==="select"?l.EXPECT_SELECT_ARGUMENT_SELECTOR:l.EXPECT_PLURAL_ARGUMENT_SELECTOR,x(this.clonePosition(),this.clonePosition())):this.requiresOtherClause&&!e?this.error(l.MISSING_OTHER_CLAUSE,x(this.clonePosition(),this.clonePosition())):{val:t,err:null}},C.prototype.tryParseDecimalInteger=function(H,V){var L=1,M=this.clonePosition();this.bumpIf("+")||this.bumpIf("-")&&(L=-1);for(var r=!1,e=0;!this.isEOF();){var t=this.char();if(t>=48&&t<=57)r=!0,e=e*10+(t-48),this.bump();else break}var i=x(M,this.clonePosition());return r?(e*=L,F3(e)?{val:e,err:null}:this.error(V,i)):this.error(H,i)},C.prototype.offset=function(){return this.position.offset},C.prototype.isEOF=function(){return this.offset()===this.message.length},C.prototype.clonePosition=function(){return{offset:this.position.offset,line:this.position.line,column:this.position.column}},C.prototype.char=function(){var H=this.position.offset;if(H>=this.message.length)throw Error("out of bound");var V=t5(this.message,H);if(V===void 0)throw Error("Offset ".concat(H," is at invalid UTF-16 code unit boundary"));return V},C.prototype.error=function(H,V){return{val:null,err:{kind:H,message:this.message,location:V}}},C.prototype.bump=function(){if(!this.isEOF()){var H=this.char();H===10?(this.position.line+=1,this.position.column=1,this.position.offset+=1):(this.position.column+=1,this.position.offset+=H<65536?1:2)}},C.prototype.bumpIf=function(H){if(r5(this.message,H,this.offset())){for(var V=0;V<H.length;V++)this.bump();return!0}return!1},C.prototype.bumpUntil=function(H){var V=this.offset(),L=this.message.indexOf(H,V);return L>=0?(this.bumpTo(L),!0):(this.bumpTo(this.message.length),!1)},C.prototype.bumpTo=function(H){if(this.offset()>H)throw Error("targetOffset ".concat(H," must be greater than or equal to the current offset ").concat(this.offset()));for(H=Math.min(H,this.message.length);;){var V=this.offset();if(V===H)break;if(V>H)throw Error("targetOffset ".concat(H," is at invalid UTF-16 code unit boundary"));if(this.bump(),this.isEOF())break}},C.prototype.bumpSpace=function(){for(;!this.isEOF()&&a5(this.char());)this.bump()},C.prototype.peek=function(){if(this.isEOF())return null;var H=this.char(),V=this.offset(),L=this.message.charCodeAt(V+(H>=65536?2:1));return L??null},C})();function l2(C){return C>=97&&C<=122||C>=65&&C<=90}function D3(C){return l2(C)||C===47}function N3(C){return C===45||C===46||C>=48&&C<=57||C===95||C>=97&&C<=122||C>=65&&C<=90||C==183||C>=192&&C<=214||C>=216&&C<=246||C>=248&&C<=893||C>=895&&C<=8191||C>=8204&&C<=8205||C>=8255&&C<=8256||C>=8304&&C<=8591||C>=11264&&C<=12271||C>=12289&&C<=55295||C>=63744&&C<=64975||C>=65008&&C<=65533||C>=65536&&C<=983039}function a5(C){return C>=9&&C<=13||C===32||C===133||C>=8206&&C<=8207||C===8232||C===8233}function I3(C){return C>=33&&C<=35||C===36||C>=37&&C<=39||C===40||C===41||C===42||C===43||C===44||C===45||C>=46&&C<=47||C>=58&&C<=59||C>=60&&C<=62||C>=63&&C<=64||C===91||C===92||C===93||C===94||C===96||C===123||C===124||C===125||C===126||C===161||C>=162&&C<=165||C===166||C===167||C===169||C===171||C===172||C===174||C===176||C===177||C===182||C===187||C===191||C===215||C===247||C>=8208&&C<=8213||C>=8214&&C<=8215||C===8216||C===8217||C===8218||C>=8219&&C<=8220||C===8221||C===8222||C===8223||C>=8224&&C<=8231||C>=8240&&C<=8248||C===8249||C===8250||C>=8251&&C<=8254||C>=8257&&C<=8259||C===8260||C===8261||C===8262||C>=8263&&C<=8273||C===8274||C===8275||C>=8277&&C<=8286||C>=8592&&C<=8596||C>=8597&&C<=8601||C>=8602&&C<=8603||C>=8604&&C<=8607||C===8608||C>=8609&&C<=8610||C===8611||C>=8612&&C<=8613||C===8614||C>=8615&&C<=8621||C===8622||C>=8623&&C<=8653||C>=8654&&C<=8655||C>=8656&&C<=8657||C===8658||C===8659||C===8660||C>=8661&&C<=8691||C>=8692&&C<=8959||C>=8960&&C<=8967||C===8968||C===8969||C===8970||C===8971||C>=8972&&C<=8991||C>=8992&&C<=8993||C>=8994&&C<=9e3||C===9001||C===9002||C>=9003&&C<=9083||C===9084||C>=9085&&C<=9114||C>=9115&&C<=9139||C>=9140&&C<=9179||C>=9180&&C<=9185||C>=9186&&C<=9254||C>=9255&&C<=9279||C>=9280&&C<=9290||C>=9291&&C<=9311||C>=9472&&C<=9654||C===9655||C>=9656&&C<=9664||C===9665||C>=9666&&C<=9719||C>=9720&&C<=9727||C>=9728&&C<=9838||C===9839||C>=9840&&C<=10087||C===10088||C===10089||C===10090||C===10091||C===10092||C===10093||C===10094||C===10095||C===10096||C===10097||C===10098||C===10099||C===10100||C===10101||C>=10132&&C<=10175||C>=10176&&C<=10180||C===10181||C===10182||C>=10183&&C<=10213||C===10214||C===10215||C===10216||C===10217||C===10218||C===10219||C===10220||C===10221||C===10222||C===10223||C>=10224&&C<=10239||C>=10240&&C<=10495||C>=10496&&C<=10626||C===10627||C===10628||C===10629||C===10630||C===10631||C===10632||C===10633||C===10634||C===10635||C===10636||C===10637||C===10638||C===10639||C===10640||C===10641||C===10642||C===10643||C===10644||C===10645||C===10646||C===10647||C===10648||C>=10649&&C<=10711||C===10712||C===10713||C===10714||C===10715||C>=10716&&C<=10747||C===10748||C===10749||C>=10750&&C<=11007||C>=11008&&C<=11055||C>=11056&&C<=11076||C>=11077&&C<=11078||C>=11079&&C<=11084||C>=11085&&C<=11123||C>=11124&&C<=11125||C>=11126&&C<=11157||C===11158||C>=11159&&C<=11263||C>=11776&&C<=11777||C===11778||C===11779||C===11780||C===11781||C>=11782&&C<=11784||C===11785||C===11786||C===11787||C===11788||C===11789||C>=11790&&C<=11798||C===11799||C>=11800&&C<=11801||C===11802||C===11803||C===11804||C===11805||C>=11806&&C<=11807||C===11808||C===11809||C===11810||C===11811||C===11812||C===11813||C===11814||C===11815||C===11816||C===11817||C>=11818&&C<=11822||C===11823||C>=11824&&C<=11833||C>=11834&&C<=11835||C>=11836&&C<=11839||C===11840||C===11841||C===11842||C>=11843&&C<=11855||C>=11856&&C<=11857||C===11858||C>=11859&&C<=11903||C>=12289&&C<=12291||C===12296||C===12297||C===12298||C===12299||C===12300||C===12301||C===12302||C===12303||C===12304||C===12305||C>=12306&&C<=12307||C===12308||C===12309||C===12310||C===12311||C===12312||C===12313||C===12314||C===12315||C===12316||C===12317||C>=12318&&C<=12319||C===12320||C===12336||C===64830||C===64831||C>=65093&&C<=65094}function v2(C){C.forEach(function(H){if(delete H.location,P1(H)||_1(H))for(var V in H.options)delete H.options[V].location,v2(H.options[V].value);else w1(H)&&E1(H.style)||(B1(H)||T1(H))&&v1(H.style)?delete H.style.location:F1(H)&&v2(H.children)})}function A5(C,H){H===void 0&&(H={}),H=v({shouldParseSkeletons:!0,requiresOtherClause:!0},H);var V=new o5(C,H).parse();if(V.err){var L=SyntaxError(l[V.err.kind]);throw L.location=V.err.location,L.originalMessage=V.err.message,L}return H?.captureLocation||v2(V.val),V.val}function s1(C,H){var V=H&&H.cache?H.cache:z3,L=H&&H.serializer?H.serializer:Q3,M=H&&H.strategy?H.strategy:W3;return M(C,{cache:V,serializer:L})}function G3(C){return C==null||typeof C=="number"||typeof C=="boolean"}function n5(C,H,V,L){var M=G3(L)?L:V(L),r=H.get(M);return typeof r>"u"&&(r=C.call(this,L),H.set(M,r)),r}function d5(C,H,V){var L=Array.prototype.slice.call(arguments,3),M=V(L),r=H.get(M);return typeof r>"u"&&(r=C.apply(this,L),H.set(M,r)),r}function x2(C,H,V,L,M){return V.bind(H,C,L,M)}function W3(C,H){var V=C.length===1?n5:d5;return x2(C,this,V,H.cache.create(),H.serializer)}function U3(C,H){return x2(C,this,d5,H.cache.create(),H.serializer)}function $3(C,H){return x2(C,this,n5,H.cache.create(),H.serializer)}var Q3=function(){return JSON.stringify(arguments)};function s2(){this.cache=Object.create(null)}s2.prototype.get=function(C){return this.cache[C]};s2.prototype.set=function(C,H){this.cache[C]=H};var z3={create:function(){return new s2}},R1={variadic:U3,monadic:$3};var j;(function(C){C.MISSING_VALUE="MISSING_VALUE",C.INVALID_VALUE="INVALID_VALUE",C.MISSING_INTL_API="MISSING_INTL_API"})(j||(j={}));var u1=(function(C){l1(H,C);function H(V,L,M){var r=C.call(this,V)||this;return r.code=L,r.originalMessage=M,r}return H.prototype.toString=function(){return"[formatjs Error: ".concat(this.code,"] ").concat(this.message)},H})(Error);var u2=(function(C){l1(H,C);function H(V,L,M,r){return C.call(this,'Invalid values for "'.concat(V,'": "').concat(L,'". Options are "').concat(Object.keys(M).join('", "'),'"'),j.INVALID_VALUE,r)||this}return H})(u1);var m5=(function(C){l1(H,C);function H(V,L,M){return C.call(this,'Value for "'.concat(V,'" must be of type ').concat(L),j.INVALID_VALUE,M)||this}return H})(u1);var p5=(function(C){l1(H,C);function H(V,L){return C.call(this,'The intl string context variable "'.concat(V,'" was not provided to the string "').concat(L,'"'),j.MISSING_VALUE,L)||this}return H})(u1);var O;(function(C){C[C.literal=0]="literal",C[C.object=1]="object"})(O||(O={}));function j3(C){return C.length<2?C:C.reduce(function(H,V){var L=H[H.length-1];return!L||L.type!==O.literal||V.type!==O.literal?H.push(V):L.value+=V.value,H},[])}function q3(C){return typeof C=="function"}function Z1(C,H,V,L,M,r,e){if(C.length===1&&o2(C[0]))return[{type:O.literal,value:C[0].value}];for(var t=[],i=0,a=C;i<a.length;i++){var A=a[i];if(o2(A)){t.push({type:O.literal,value:A.value});continue}if(Q2(A)){typeof r=="number"&&t.push({type:O.literal,value:V.getNumberFormat(H).format(r)});continue}var n=A.value;if(!(M&&n in M))throw new p5(n,e);var p=M[n];if($2(A)){(!p||typeof p=="string"||typeof p=="number")&&(p=typeof p=="string"||typeof p=="number"?String(p):""),t.push({type:typeof p=="string"?O.literal:O.object,value:p});continue}if(B1(A)){var u=typeof A.style=="string"?L.date[A.style]:v1(A.style)?A.style.parsedOptions:void 0;t.push({type:O.literal,value:V.getDateTimeFormat(H,u).format(p)});continue}if(T1(A)){var u=typeof A.style=="string"?L.time[A.style]:v1(A.style)?A.style.parsedOptions:L.time.medium;t.push({type:O.literal,value:V.getDateTimeFormat(H,u).format(p)});continue}if(w1(A)){var u=typeof A.style=="string"?L.number[A.style]:E1(A.style)?A.style.parsedOptions:void 0;u&&u.scale&&(p=p*(u.scale||1)),t.push({type:O.literal,value:V.getNumberFormat(H,u).format(p)});continue}if(F1(A)){var g=A.children,w=A.value,N=M[w];if(!q3(N))throw new m5(w,"function",e);var M1=Z1(g,H,V,L,M,r),K=N(M1.map(function(I){return I.value}));Array.isArray(K)||(K=[K]),t.push.apply(t,K.map(function(I){return{type:typeof I=="string"?O.literal:O.object,value:I}}))}if(P1(A)){var B=A.options[p]||A.options.other;if(!B)throw new u2(A.value,p,Object.keys(A.options),e);t.push.apply(t,Z1(B.value,H,V,L,M));continue}if(_1(A)){var B=A.options["=".concat(p)];if(!B){if(!Intl.PluralRules)throw new u1(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`,j.MISSING_INTL_API,e);var r1=V.getPluralRules(H,{type:A.pluralType}).select(p-(A.offset||0));B=A.options[r1]||A.options.other}if(!B)throw new u2(A.value,p,Object.keys(A.options),e);t.push.apply(t,Z1(B.value,H,V,L,M,p-(A.offset||0)));continue}}return j3(t)}function K3(C,H){return H?v(v(v({},C||{}),H||{}),Object.keys(C).reduce(function(V,L){return V[L]=v(v({},C[L]),H[L]||{}),V},{})):C}function X3(C,H){return H?Object.keys(C).reduce(function(V,L){return V[L]=K3(C[L],H[L]),V},v({},C)):C}function Z2(C){return{create:function(){return{get:function(H){return C[H]},set:function(H,V){C[H]=V}}}}}function Y3(C){return C===void 0&&(C={number:{},dateTime:{},pluralRules:{}}),{getNumberFormat:s1(function(){for(var H,V=[],L=0;L<arguments.length;L++)V[L]=arguments[L];return new((H=Intl.NumberFormat).bind.apply(H,k1([void 0],V,!1)))},{cache:Z2(C.number),strategy:R1.variadic}),getDateTimeFormat:s1(function(){for(var H,V=[],L=0;L<arguments.length;L++)V[L]=arguments[L];return new((H=Intl.DateTimeFormat).bind.apply(H,k1([void 0],V,!1)))},{cache:Z2(C.dateTime),strategy:R1.variadic}),getPluralRules:s1(function(){for(var H,V=[],L=0;L<arguments.length;L++)V[L]=arguments[L];return new((H=Intl.PluralRules).bind.apply(H,k1([void 0],V,!1)))},{cache:Z2(C.pluralRules),strategy:R1.variadic})}}var l5=(function(){function C(H,V,L,M){var r=this;if(V===void 0&&(V=C.defaultLocale),this.formatterCache={number:{},dateTime:{},pluralRules:{}},this.format=function(e){var t=r.formatToParts(e);if(t.length===1)return t[0].value;var i=t.reduce(function(a,A){return!a.length||A.type!==O.literal||typeof a[a.length-1]!="string"?a.push(A.value):a[a.length-1]+=A.value,a},[]);return i.length<=1?i[0]||"":i},this.formatToParts=function(e){return Z1(r.ast,r.locales,r.formatters,r.formats,e,void 0,r.message)},this.resolvedOptions=function(){return{locale:r.resolvedLocale.toString()}},this.getAst=function(){return r.ast},this.locales=V,this.resolvedLocale=C.resolveLocale(V),typeof H=="string"){if(this.message=H,!C.__parse)throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");this.ast=C.__parse(H,{ignoreTag:M?.ignoreTag,locale:this.resolvedLocale})}else this.ast=H;if(!Array.isArray(this.ast))throw new TypeError("A message must be provided as a String or AST.");this.formats=X3(C.formats,L),this.formatters=M&&M.formatters||Y3(this.formatterCache)}return Object.defineProperty(C,"defaultLocale",{get:function(){return C.memoizedDefaultLocale||(C.memoizedDefaultLocale=new Intl.NumberFormat().resolvedOptions().locale),C.memoizedDefaultLocale},enumerable:!1,configurable:!0}),C.memoizedDefaultLocale=null,C.resolveLocale=function(H){var V=Intl.NumberFormat.supportedLocalesOf(H);return V.length>0?new Intl.Locale(V[0]):new Intl.Locale(typeof H=="string"?H:H[0])},C.__parse=A5,C.formats={number:{integer:{maximumFractionDigits:0},currency:{style:"currency"},percent:{style:"percent"}},date:{short:{month:"numeric",day:"numeric",year:"2-digit"},medium:{month:"short",day:"numeric",year:"numeric"},long:{month:"long",day:"numeric",year:"numeric"},full:{weekday:"long",month:"long",day:"numeric",year:"numeric"}},time:{short:{hour:"numeric",minute:"numeric"},medium:{hour:"numeric",minute:"numeric",second:"numeric"},long:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"},full:{hour:"numeric",minute:"numeric",second:"numeric",timeZoneName:"short"}}},C})();var v5=l5;var S2={en:e2,de:t2};function o(C,H,...V){let L=H.replace(/['"]+/g,"");var M;try{M=C.split(".").reduce((e,t)=>e[t],S2[L])}catch{M=C.split(".").reduce((t,i)=>t[i],S2.en)}if(M===void 0&&(M=C.split(".").reduce((e,t)=>e[t],S2.en)),!V.length)return M;let r={};for(let e=0;e<V.length;e+=2){let t=V[e];t=t.replace(/^{([^}]+)?}$/,"$1"),r[t]=V[e+1]}try{return new v5(M,H).format(r)}catch(e){return"Translation "+e}}var x5=async()=>{await customElements.whenDefined("partial-panel-resolver"),await document.createElement("partial-panel-resolver")._getRoutes([{component_name:"config",url_path:"a"}])?.routes?.a?.load?.(),await customElements.whenDefined("ha-panel-config");let V=document.createElement("ha-panel-config");await V?.routerOptions?.routes?.dashboard?.load?.(),await V?.routerOptions?.routes?.general?.load?.(),await V?.routerOptions?.routes?.entities?.load?.(),await V?.routerOptions?.routes?.labels?.load?.(),await customElements.whenDefined("ha-config-dashboard")};var s5,u5;var c2=function(C,H){return J3(H).format(C)},J3=function(C){return new Intl.DateTimeFormat(C.language,{year:"numeric",month:"numeric",day:"numeric"})};(function(C){C.language="language",C.system="system",C.comma_decimal="comma_decimal",C.decimal_comma="decimal_comma",C.space_comma="space_comma",C.none="none"})(s5||(s5={})),(function(C){C.language="language",C.system="system",C.am_pm="12",C.twenty_four="24"})(u5||(u5={}));var Z5=function(C,H,V,L){L=L||{},V=V??{};var M=new Event(H,{bubbles:L.bubbles===void 0||L.bubbles,cancelable:!!L.cancelable,composed:L.composed===void 0||L.composed});return M.detail=V,C.dispatchEvent(M),M};var f=(C,H)=>{Z5(C,"hass-notification",{message:H})};var b=k`
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
`;var N1=C=>{let[H]=C.split("T"),[V,L,M]=H.split("-").map(Number);return new Date(V,L-1,M)},S1=C=>`${C.progress_current??0} / ${C.progress_target??0}`,I1=(C,H,V)=>{let L=C===1?H.slice(0,-1):H;return`${C} ${o(`intervals.${L}`,V)}`};var V1=C=>customElements.get("ha-dialog-footer")?m`<ha-dialog-footer slot="footer">${C}</ha-dialog-footer>`:C,D1=class{constructor(H,V){this._fn=H;this._ms=V}schedule(){this.cancel(),this._timer=setTimeout(()=>{this._timer=void 0,this._fn()},this._ms)}cancel(){this._timer!==void 0&&clearTimeout(this._timer),this._timer=void 0}};var S5=C=>C.connection.sendMessagePromise({type:"tag/list"}),c5=C=>C.callWS({type:"config/entity_registry/list"}),h5=C=>C.callWS({type:"config/label_registry/list"}),f5=C=>C.callWS({type:"home_maintenance/get_tasks"}),g5=(C,H)=>C.callWS({type:"home_maintenance/get_task",task_id:H}),O5=(C,H)=>C.callWS({type:"home_maintenance/add_task",...H}),y5=(C,H)=>C.callWS({type:"home_maintenance/remove_task",task_id:H}),b5=(C,H)=>C.callWS({type:"home_maintenance/complete_task",task_id:H}),G1=(C,H)=>C.callWS({type:"home_maintenance/update_task",...H}),k5=C=>C.callWS({type:"home_maintenance/get_groups"}),w5=(C,H)=>C.callWS({type:"home_maintenance/create_group",group_id:H}),B5=(C,H,V)=>C.callWS({type:"home_maintenance/rename_group",old_group_id:H,new_group_id:V}),T5=(C,H)=>C.callWS({type:"home_maintenance/delete_group",group_id:H}),P5=C=>C.callWS({type:"home_maintenance/get_config"}),_5=(C,H)=>C.connection.subscribeMessage(H,{type:"home_maintenance/subscribe_updates"});var F5="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";var E5="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z";var R5="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";var D5="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";var N5="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";var c1=class extends c{constructor(){super();this.items=[]}render(){return m`
            <ha-dropdown @wa-select=${this._handleMenuAction}>
                <ha-icon-button slot="trigger">
                    <ha-icon icon="mdi:dots-vertical"></ha-icon>
                </ha-icon-button>
                ${this.items.map(V=>m`
                    <ha-dropdown-item value="${V.value}">
                        <span>${V.label}</span>
                        <ha-icon slot="icon" icon="${V.icon}"></ha-icon>
                    </ha-dropdown-item>
                `)}
            </ha-dropdown>
        `}_handleMenuAction(V){let L=V.detail.item.value;this.dispatchEvent(new CustomEvent("menu-action",{detail:{action:L},bubbles:!0,composed:!0}))}static get styles(){return k`
            ha-icon-button ha-icon {
                display: flex;
            }
            span {
                white-space: nowrap;
                padding-right: 1em;
            }
        `}};d([s()],c1.prototype,"hass",2),d([s()],c1.prototype,"items",2);customElements.get("hm-task-menu")||customElements.define("hm-task-menu",c1);var C0=new Date(9999,0,1),T=class extends c{constructor(){super(...arguments);this.tasks=[];this.groups=[];this.registry=[];this.labelRegistry=[]}get _columns(){return{icon:{title:"",moveable:!1,showNarrow:!1,label:"icon",type:"icon",template:V=>V.icon?m`<ha-icon .icon=${V.icon}></ha-icon>`:S},tagIcon:{title:"",moveable:!1,showNarrow:!1,label:"tag",type:"icon",template:V=>V.tagIcon?m`<ha-icon .icon=${V.tagIcon}></ha-icon>`:S},title:{title:"Title",main:!0,showNarrow:!0,sortable:!0,filterable:!0,grows:!0,extraTemplate:V=>{let L=this.registry.find(r=>r.unique_id===V.id);if(!L)return S;let M=this.labelRegistry.filter(r=>L.labels.includes(r.label_id));return M.length?m`<ha-data-table-labels .labels=${M}></ha-data-table-labels>`:S}},interval_days:{title:"Interval",showNarrow:!1,sortable:!0,minWidth:"100px",maxWidth:"100px",template:V=>V.trigger_type!=="time"?S1(V):I1(V.interval_value,V.interval_type,this.hass.language)},last_performed:{title:"Last Performed",showNarrow:!1,sortable:!0,minWidth:"150px",maxWidth:"150px",template:V=>V.trigger_type!=="time"||!V.last_performed?"-":c2(N1(V.last_performed),this.hass.locale)},next_due:{title:o("panel.cards.current.next",this.hass.language),showNarrow:!0,sortable:!0,direction:"asc",minWidth:"100px",maxWidth:"100px",template:V=>{let L=V.due?"color: var(--error-color, red); font-weight: bold;":"";return V.trigger_type!=="time"?m`
                            <span style=${L}>
                                ${S1(V)}
                            </span>`:V.next_due_date?m`
                        <span style=${L}>
                            ${c2(V.next_due_date,this.hass.locale)}
                        </span>`:"\u2014"}},complete:{minWidth:"64px",maxWidth:"64px",sortable:!1,groupable:!1,showNarrow:!0,moveable:!1,hideable:!1,type:"overflow",template:V=>m`
                <ha-icon-button
                    @click=${()=>this._dispatch("task-complete",V.id)}
                    .label="Complete"
                    title="Mark Task Complete"
                    .path=${E5}
                ></ha-icon-button>
              `},actions:{title:"",width:"80px",showNarrow:!0,moveable:!1,hideable:!1,type:"overflow-menu",template:V=>m`
                    <hm-task-menu
                        .hass=${this.hass}
                        .items=${[{value:"edit",label:o("panel.cards.current.actions.edit",this.hass.language),icon:"mdi:pencil"},{value:"move",label:o("panel.cards.current.actions.move",this.hass.language),icon:"mdi:folder-move-outline"},{value:"delete",label:o("panel.cards.current.actions.remove",this.hass.language),icon:"mdi:delete"}]}
                    @menu-action=${L=>this._dispatch("task-menu-action",V.id,L.detail.action)}
                    ></hm-task-menu>
                `}}}get _columnsToDisplay(){let V=this.hass.language;if(this._columnsCache&&this._columnsCache.narrow===this.narrow&&this._columnsCache.language===V)return this._columnsCache.columns;let L=Object.fromEntries(Object.entries(this._columns).filter(([M,r])=>this.narrow?r.showNarrow!==!1:!0));return this._columnsCache={narrow:this.narrow,language:V,columns:L},L}get _rows(){if(this._rowsCache?.tasks===this.tasks)return this._rowsCache.rows;let V=this.tasks.map(L=>this._taskToRow(L));return this._rowsCache={tasks:this.tasks,rows:V},V}_taskToRow(V){return{...V,trigger_type:V.trigger_type??"time",interval_days:this._intervalSortKey(V),next_due_date:V.next_due?N1(V.next_due):null,next_due:this._dueSortKey(V),tagIcon:V.tag_id&&V.tag_id.trim()!==""?"mdi:tag":void 0}}get _sections(){if(this._sectionsCache?.tasks===this.tasks&&this._sectionsCache?.groups===this.groups)return this._sectionsCache.sections;let V=new Map;this.groups.forEach(e=>V.set(e,[])),V.set("",[]),this.tasks.forEach(e=>{let t=e.group_id?.trim()||"";V.has(t)||V.set(t,[]),V.get(t).push(this._taskToRow(e))});let L=[...V.keys()].filter(e=>e!=="").sort((e,t)=>e.localeCompare(t)),M=V.get(""),r=[...M.length?[{title:o("common.ungrouped",this.hass.language),rows:M}]:[],...L.map(e=>({title:e,rows:V.get(e)}))];return this._sectionsCache={tasks:this.tasks,groups:this.groups,sections:r},r}_intervalSortKey(V){if(V.trigger_type==="count"||V.trigger_type==="runtime")return V.progress_target?V.progress_target-(V.progress_current??0):Number.MAX_SAFE_INTEGER;switch(V.interval_type){case"days":return V.interval_value;case"weeks":return V.interval_value*7;case"months":return V.interval_value*30;default:return Number.MAX_SAFE_INTEGER}}_dueSortKey(V){return V.next_due?N1(V.next_due):V.due?new Date(0):C0}_dispatch(V,L,M){this.dispatchEvent(new CustomEvent(V,{detail:{taskId:L,action:M},bubbles:!0,composed:!0}))}render(){return this.hass?(!this.tasks||this.tasks.length===0)&&this.groups.length===0?m`<span>${o("common.no_tasks",this.hass.language)}</span>`:this.groups.length===0?m`
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
            `:m`
            <div class="table-wrapper">
                ${this._sections.map(V=>m`
                    <div class="group-section">
                        <div class="group-header">
                            <span class="group-title">${V.title}</span>
                            <span class="group-count">${V.rows.length}</span>
                        </div>
                        ${V.rows.length?m`
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
                        `:m`
                            <span class="secondary">${o("common.no_tasks",this.hass.language)}</span>
                        `}
                    </div>
                `)}
            </div>
        `:m``}};T.styles=b,d([s()],T.prototype,"hass",2),d([s()],T.prototype,"narrow",2),d([s({attribute:!1})],T.prototype,"tasks",2),d([s({attribute:!1})],T.prototype,"groups",2),d([s({attribute:!1})],T.prototype,"registry",2),d([s({attribute:!1})],T.prototype,"labelRegistry",2);customElements.get("hm-task-table")||customElements.define("hm-task-table",T);var I5=(C,H,V,L)=>{try{return o(`${C.keyPrefix}.${H}.${V}`,C.hass.language)??L}catch{return L}},W1=(C,H)=>m`
    <div class="field ${H.name}">
        <div class="field-label">
            ${I5(C,H.name,"heading",H.name)}${H.required?" *":""}
        </div>
        <ha-selector
            .hass=${C.hass}
            .selector=${H.selector}
            .value=${C.data[H.name]}
            .helper=${I5(C,H.name,"helper","")}
            .required=${H.required??!1}
            @value-changed=${V=>C.onChange(H.name,V)}
        ></ha-selector>
    </div>
`,U1=k`
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
`;var G5=["days","weeks","months"];function W5(C){return{days:o("intervals.days",C),weeks:o("intervals.weeks",C),months:o("intervals.months",C)}}var L1=()=>({title:"",trigger_type:"time",interval_value:"",interval_type:"days",last_performed:"",icon:"",label:[],tag:"",count_entity_id:"",count_threshold:"",runtime_entity_id:"",runtime_threshold:"",area:"",description:"",group_id:""}),U5=(C,H,V)=>({title:C.title,trigger_type:C.trigger_type??"time",interval_value:C.interval_value,interval_type:C.interval_type,last_performed:C.last_performed??"",icon:C.icon??"",label:V.map(L=>L.label_id),tag:C.tag_id??"",count_entity_id:C.count_entity_id??"",count_threshold:C.count_threshold??"",runtime_entity_id:C.runtime_entity_id??"",runtime_threshold:C.runtime_threshold??"",area:H?.area_id??"",description:C.description??"",group_id:C.group_id??""}),H0=C=>({name:"trigger_type",required:!0,selector:{select:{options:[{value:"time",label:o("trigger_types.time",C)},{value:"count",label:o("trigger_types.count",C)},{value:"runtime",label:o("trigger_types.runtime",C)}],mode:"dropdown"}}}),V0=(C,H)=>C.trigger_type==="count"?[{name:"count_entity_id",required:!0,selector:{entity:{}}},{name:"count_threshold",required:!0,selector:{number:{min:1,mode:"box"}}}]:C.trigger_type==="runtime"?[{name:"runtime_entity_id",required:!0,selector:{entity:{filter:{domain:"sensor"}}}},{name:"runtime_threshold",required:!0,selector:{number:{min:.1,step:.1,mode:"box"}}}]:[{name:"interval_value",required:!0,selector:{number:{min:1,mode:"box"}}},{name:"interval_type",required:!0,selector:{select:{options:G5.map(V=>({value:V,label:W5(H)[V]})),mode:"dropdown"}}}],h2=(C,H)=>({name:"group_id",selector:{select:{options:[{value:"",label:o("common.ungrouped",H)},...C.map(V=>({value:V,label:V}))],mode:"dropdown",custom_value:!0}}}),$1=(C,H)=>[{name:"title",required:!0,selector:{text:{}}},H0(H),...V0(C,H),{name:"last_performed",selector:{date:{}}}],Q1=(C,H)=>[h2(C,H),{name:"icon",selector:{icon:{}}},{name:"tag",selector:{entity:{filter:{domain:"tag"}}}},{name:"area",selector:{area:{}}},{name:"label",selector:{label:{multiple:!0}}}],z1=C=>({name:"description",selector:{text:C?{multiline:!0}:{}}}),j1=C=>C.title?.trim()?C.trigger_type==="count"?!!(C.count_entity_id?.trim()&&C.count_threshold):C.trigger_type==="runtime"?!!(C.runtime_entity_id?.trim()&&C.runtime_threshold):!!(C.interval_value&&C.interval_type):!1,q1=C=>{if(!C){let i=new Date;return i.setHours(0,0,0,0),i.toISOString()}let[H,V,L]=C.split("T")[0].split("-"),M=Number(H),r=Number(V),e=Number(L);if(isNaN(M)||isNaN(r)||isNaN(e))return null;let t=new Date(M,r-1,e);return t.setHours(0,0,0,0),t.toISOString()},$5=C=>{let H=C.trigger_type==="count",V=C.trigger_type==="runtime";return{trigger_type:C.trigger_type||"time",interval_value:H||V?1:Number(C.interval_value),interval_type:H||V?"days":C.interval_type,count_entity_id:H&&C.count_entity_id?.trim()||null,count_threshold:H?Number(C.count_threshold):0,runtime_entity_id:V&&C.runtime_entity_id?.trim()||null,runtime_threshold:V?Number(C.runtime_threshold):0}},Q5=(C,H)=>{let V=$5(C);return{title:C.title.trim(),interval_value:V.interval_value,interval_type:V.interval_type,trigger_type:V.trigger_type,last_performed:H,tag_id:C.tag?.trim()||void 0,icon:C.icon?.trim()||"mdi:calendar-check",labels:C.label??[],area_id:C.area?.trim()||void 0,description:C.description||void 0,group_id:C.group_id?.trim()||void 0,...V.count_entity_id?{count_entity_id:V.count_entity_id,count_threshold:V.count_threshold}:{},...V.runtime_entity_id?{runtime_entity_id:V.runtime_entity_id,runtime_threshold:V.runtime_threshold}:{}}},z5=(C,H)=>({title:C.title.trim(),...$5(C),last_performed:H,icon:C.icon?.trim()||"mdi:calendar-check",labels:C.label,tag_id:C.tag?.trim()||null,area_id:C.area?.trim()||null,description:C.description??"",group_id:C.group_id?.trim()||null});var q=class extends c{constructor(){super(...arguments);this.groups=[];this._formData=L1();this._advancedOpen=!1;this._handleFieldChanged=(V,L)=>{L.stopPropagation(),this._formData={...this._formData,[V]:L.detail.value}};this._renderField=V=>W1({hass:this.hass,keyPrefix:"panel.cards.new.fields",data:this._formData,onChange:this._handleFieldChanged},V)}async _handleAddTaskClick(){if(!j1(this._formData)){f(this,o("panel.cards.new.alerts.required",this.hass.language));return}let V=q1(this._formData.last_performed);if(V===null){f(this,o("common.invalid_date",this.hass.language));return}try{let L=this._formData.title.trim();await O5(this.hass,Q5(this._formData,V)),this._formData=L1(),this.dispatchEvent(new CustomEvent("task-added",{detail:{title:L},bubbles:!0,composed:!0}))}catch(L){console.error("Failed to add task:",L),f(this,o("panel.cards.new.alerts.error",this.hass.language))}}render(){return this.hass?m`
            <div class="basic-row">
                <div class="fields-grid">
                    ${$1(this._formData,this.hass.language).map(this._renderField)}
                </div>
                <ha-button size="small" class="add-button"
                    @click=${this._handleAddTaskClick}>${o("panel.cards.new.actions.add_task",this.hass.language)}
                </ha-button>
            </div>

            <ha-expansion-panel
                header="${o("panel.cards.new.sections.optional",this.hass.language)}"
                .opened=${this._advancedOpen}
                @opened-changed=${V=>this._advancedOpen=V.detail.value}
                class="extras-panel"
            >
                <div class="fields-grid">
                    ${Q1(this.groups,this.hass.language).map(this._renderField)}
                    ${this._renderField(z1(!1))}
                </div>
            </ha-expansion-panel>
        `:m``}};q.styles=[b,U1,k`
        .basic-row .fields-grid {
            flex: 1 1 500px;
            min-width: 0;
        }
    `],d([s()],q.prototype,"hass",2),d([s({attribute:!1})],q.prototype,"groups",2),d([h()],q.prototype,"_formData",2);customElements.get("hm-task-form")||customElements.define("hm-task-form",q);var P=class extends c{constructor(){super(...arguments);this.registry=[];this.labelRegistry=[];this.groups=[];this._taskId=null;this._formData=L1();this._handleFieldChanged=(V,L)=>{L.stopPropagation(),this._formData={...this._formData,[V]:L.detail.value}};this._renderField=V=>W1({hass:this.hass,keyPrefix:"panel.dialog.edit_task.fields",data:this._formData,onChange:this._handleFieldChanged},V)}async open(V){try{let L=await g5(this.hass,V),M=this.registry.find(e=>e.unique_id===L.id),r=M?this.labelRegistry.filter(e=>M.labels.includes(e.label_id)):[];this._formData=U5(L,M,r),this._taskId=L.id}catch(L){console.error("Failed to fetch task for edit:",L)}}async _handleSaveClick(){if(!this._taskId)return;if(!j1(this._formData)){f(this,o("panel.cards.new.alerts.required",this.hass.language));return}let V=q1(this._formData.last_performed);if(V===null){f(this,o("common.invalid_date",this.hass.language));return}try{await G1(this.hass,{task_id:this._taskId,updates:z5(this._formData,V)}),this._close()}catch(L){console.error("Failed to update task:",L),f(this,o("panel.dialog.edit_task.alerts.error",this.hass.language))}}_close(){this._taskId=null,this._formData=L1()}render(){if(!this.hass||!this._taskId)return m``;let V=this.hass.language;return m`
            <ha-dialog
                open
                heading="${o("panel.dialog.edit_task.title",V)}: ${this._formData.title}"
                prevent-scrim-close
                @closed=${this._close}
            >
                <div class="fields-grid">
                    ${$1(this._formData,V).map(this._renderField)}
                </div>

                <div class="section-label">
                    ${o("panel.dialog.edit_task.sections.optional",V)}
                </div>

                <div class="fields-grid">
                    ${Q1(this.groups,V).map(this._renderField)}
                    ${this._renderField(z1(!0))}
                </div>

                ${V1(m`
                    <ha-button
                        data-dialog="close"
                        appearance="plain"
                        slot="secondaryAction"
                        @click=${this._close}
                    >
                        ${o("panel.dialog.edit_task.actions.cancel",V)}
                    </ha-button>
                    <ha-button slot="primaryAction" @click=${this._handleSaveClick}>
                        ${o("panel.dialog.edit_task.actions.save",V)}
                    </ha-button>
                `)}
            </ha-dialog>
        `}};P.styles=[b,U1,k`
        .section-label {
            font-weight: 500;
            color: var(--secondary-text-color);
            margin: 20px 0 12px;
        }
    `],d([s()],P.prototype,"hass",2),d([s({attribute:!1})],P.prototype,"registry",2),d([s({attribute:!1})],P.prototype,"labelRegistry",2),d([s({attribute:!1})],P.prototype,"groups",2),d([h()],P.prototype,"_taskId",2),d([h()],P.prototype,"_formData",2);customElements.get("hm-edit-dialog")||customElements.define("hm-edit-dialog",P);var h1=class extends c{constructor(){super(...arguments);this._opts=null}open(V){this._opts=V}_close(){this._opts=null}_handleConfirm(){let V=this._opts?.onConfirm;this._close(),V?.()}_renderButtons(){return m`
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
        `}render(){return this._opts?m`
            <ha-dialog
                open
                heading="${this._opts.heading}"
                @closed=${this._close}
            >
                <p>${this._opts.message}</p>

                ${V1(this._renderButtons())}
            </ha-dialog>
        `:m``}};h1.styles=b,d([h()],h1.prototype,"_opts",2);customElements.get("hm-confirm-dialog")||customElements.define("hm-confirm-dialog",h1);var _=class extends c{constructor(){super(...arguments);this.groups=[];this._newGroupName="";this._renamingGroup=null;this._renameValue=""}async _handleCreate(){let V=this._newGroupName.trim();if(V){if(this.groups.includes(V)){f(this,o("panel.cards.groups.alerts.exists",this.hass.language,"{title}",V));return}try{await w5(this.hass,V),this._newGroupName=""}catch(L){console.error("Failed to create group:",L),f(this,o("panel.cards.groups.alerts.error",this.hass.language))}}}_startRename(V){this._renamingGroup=V,this._renameValue=V}async _handleRename(){let V=this._renamingGroup,L=this._renameValue.trim();if(!V||!L||V===L){this._renamingGroup=null;return}if(this.groups.includes(L)){f(this,o("panel.cards.groups.alerts.exists",this.hass.language,"{title}",L));return}this._renamingGroup=null;try{await B5(this.hass,V,L)}catch(M){console.error("Failed to rename group:",M),f(this,o("panel.cards.groups.alerts.rename_error",this.hass.language))}}_handleDelete(V){let L=this.hass.language;this._confirmDialog?.open({heading:o("panel.cards.groups.confirm_delete_title",L),message:o("panel.cards.groups.confirm_delete",L,"{title}",V),confirmLabel:o("panel.cards.groups.actions.delete",L),cancelLabel:o("common.cancel",L),destructive:!0,onConfirm:()=>this._deleteGroup(V)})}async _deleteGroup(V){try{await T5(this.hass,V)}catch(L){console.error("Failed to delete group:",L),f(this,o("panel.cards.groups.alerts.delete_error",this.hass.language))}}render(){if(!this.hass)return m``;let V=this.hass.language;return m`
            <div class="group-management-row">
                <ha-selector
                    .hass=${this.hass}
                    .selector=${{text:{}}}
                    .value=${this._newGroupName}
                    .label=${o("panel.cards.groups.fields.new_group.heading",V)}
                    .required=${!1}
                    @value-changed=${L=>this._newGroupName=L.detail.value??""}
                    @keydown=${L=>L.key==="Enter"&&this._handleCreate()}
                ></ha-selector>
                <ha-button size="small" @click=${this._handleCreate}>
                    ${o("panel.cards.groups.actions.create",V)}
                </ha-button>
            </div>

            <div class="group-list">
                ${this.groups.length===0?m`<span class="secondary">${o("panel.cards.groups.empty",V)}</span>`:this.groups.map(L=>this._renamingGroup===L?m`
                        <div class="group-list-row">
                            <ha-selector
                                .hass=${this.hass}
                                .selector=${{text:{}}}
                                .value=${this._renameValue}
                                .required=${!1}
                                @value-changed=${M=>this._renameValue=M.detail.value??""}
                                @keydown=${M=>M.key==="Enter"&&this._handleRename()}
                            ></ha-selector>
                            <span class="group-actions">
                                <ha-icon-button
                                    .path=${F5}
                                    .label=${o("panel.cards.groups.actions.save",V)}
                                    @click=${this._handleRename}
                                ></ha-icon-button>
                                <ha-icon-button
                                    .path=${R5}
                                    .label=${o("panel.cards.groups.actions.cancel",V)}
                                    @click=${()=>this._renamingGroup=null}
                                ></ha-icon-button>
                            </span>
                        </div>
                    `:m`
                        <div class="group-list-row">
                            <span>${L}</span>
                            <span class="group-actions">
                                <ha-icon-button
                                    .path=${N5}
                                    .label=${o("panel.cards.groups.actions.rename",V)}
                                    @click=${()=>this._startRename(L)}
                                ></ha-icon-button>
                                <ha-icon-button
                                    .path=${D5}
                                    .label=${o("panel.cards.groups.actions.delete",V)}
                                    @click=${()=>this._handleDelete(L)}
                                ></ha-icon-button>
                            </span>
                        </div>
                    `)}
            </div>

            <hm-confirm-dialog></hm-confirm-dialog>
        `}};_.styles=b,d([s()],_.prototype,"hass",2),d([s({attribute:!1})],_.prototype,"groups",2),d([h()],_.prototype,"_newGroupName",2),d([h()],_.prototype,"_renamingGroup",2),d([h()],_.prototype,"_renameValue",2),d([J("hm-confirm-dialog")],_.prototype,"_confirmDialog",2);customElements.get("hm-group-manager")||customElements.define("hm-group-manager",_);var D=class extends c{constructor(){super(...arguments);this.groups=[];this._task=null;this._groupId=""}open(V){this._task=V,this._groupId=V.group_id??""}_close(){this._task=null}async _handleMove(){if(this._task)try{await G1(this.hass,{task_id:this._task.id,updates:{group_id:this._groupId?.trim()||null}}),this._close()}catch(V){console.error("Failed to move task:",V)}}render(){if(!this.hass||!this._task)return m``;let V=this.hass.language;return m`
            <ha-dialog
                open
                heading="${o("panel.dialog.move_task.title",V)}: ${this._task.title}"
                @closed=${this._close}
            >
                <ha-form
                    .hass=${this.hass}
                    .schema=${[h2(this.groups,V)]}
                    .computeLabel=${()=>o("panel.dialog.move_task.fields.group_id.heading",V)}
                    .data=${{group_id:this._groupId}}
                    @value-changed=${L=>this._groupId=L.detail.value.group_id??""}
                ></ha-form>

                ${V1(m`
                    <ha-button
                        data-dialog="close"
                        appearance="plain"
                        slot="secondaryAction"
                        @click=${this._close}
                    >
                        ${o("panel.dialog.move_task.actions.cancel",V)}
                    </ha-button>
                    <ha-button slot="primaryAction" @click=${this._handleMove}>
                        ${o("panel.dialog.move_task.actions.move",V)}
                    </ha-button>
                `)}
            </ha-dialog>
        `}};D.styles=b,d([s()],D.prototype,"hass",2),d([s({attribute:!1})],D.prototype,"groups",2),d([h()],D.prototype,"_task",2),d([h()],D.prototype,"_groupId",2);customElements.get("hm-move-dialog")||customElements.define("hm-move-dialog",D);var L0=300,y=class extends c{constructor(){super(...arguments);this.tags=null;this.tasks=[];this.groups=[];this.config=null;this.registry=[];this.labelRegistry=[];this._reload=new D1(()=>this._loadData(),L0)}connectedCallback(){super.connectedCallback(),this._initialize()}disconnectedCallback(){super.disconnectedCallback(),this._reload.cancel(),this._unsubscribe?.(),this._unsubscribe=void 0}async _initialize(){await x5();let[V,L]=await Promise.all([S5(this.hass),P5(this.hass)]);this.tags=V,this.config=L,await this._loadData();try{this._unsubscribe=await _5(this.hass,()=>this._reload.schedule())}catch(M){console.error("Failed to subscribe to task updates:",M)}}async _loadData(){let[V,L,M,r]=await Promise.all([f5(this.hass),k5(this.hass),c5(this.hass),h5(this.hass)]);this.tasks=V,this.groups=L,this.registry=M,this.labelRegistry=r}_handleComplete(V){let L=this.tasks.find(t=>t.id===V.detail.taskId);if(!L)return;let M=this.hass.language,r=(L.trigger_type??"time")==="time",e=r?I1(L.interval_value,L.interval_type,M):S1(L);this._confirmDialog?.open({heading:o("panel.dialog.confirm_complete.title",M),message:o(r?"panel.dialog.confirm_complete.message":"panel.dialog.confirm_complete.message_progress",M,"{title}",L.title,"{interval}",e),confirmLabel:o("panel.dialog.confirm_complete.actions.confirm",M),cancelLabel:o("common.cancel",M),onConfirm:()=>this._completeTask(L)})}async _completeTask(V){let L=this.hass.language;try{await b5(this.hass,V.id),f(this,o("panel.cards.current.alerts.complete_success",L,"{title}",V.title))}catch(M){console.error("Failed to complete task:",M),f(this,o("panel.cards.current.alerts.complete_error",L))}}_handleMenuAction(V){let{taskId:L,action:M}=V.detail;if(M==="edit")this._editDialog?.open(L);else if(M==="move"){let r=this.tasks.find(e=>e.id===L);r&&this._moveDialog?.open(r)}else M==="delete"&&this._handleRemove(L)}_handleRemove(V){let L=this.hass.language,M=this.tasks.find(r=>r.id===V);this._confirmDialog?.open({heading:o("panel.dialog.confirm_remove.title",L),message:o("panel.dialog.confirm_remove.message",L,"{title}",M?.title??""),confirmLabel:o("panel.dialog.confirm_remove.actions.confirm",L),cancelLabel:o("common.cancel",L),destructive:!0,onConfirm:()=>this._removeTask(V)})}async _removeTask(V){try{await y5(this.hass,V)}catch(L){console.error("Failed to remove task:",L),f(this,o("panel.cards.current.alerts.remove_error",this.hass.language))}}_handleTaskAdded(V){f(this,o("card.add_task.added",this.hass.language,"{title}",V.detail?.title??""))}render(){return this.hass?!this.tasks||!this.tags?m`<p>${o("common.loading",this.hass.language)}</p>`:m`
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
                    header="${o("panel.cards.new.title",this.hass.language)}"
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
                    header="${o("panel.cards.current.title",this.hass.language)}"
                    class="card-current"
                >
                    <div class="card-content">
                        <hm-task-table
                            .hass=${this.hass}
                            .narrow=${this.narrow}
                            .tasks=${this.tasks}
                            .groups=${this.groups}
                            .registry=${this.registry}
                            .labelRegistry=${this.labelRegistry}
                            @task-complete=${this._handleComplete}
                            @task-menu-action=${this._handleMenuAction}
                        ></hm-task-table>
                    </div>
                </ha-card>

                <ha-card
                    header="${o("panel.cards.groups.title",this.hass.language)}"
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
        `:m``}};y.styles=b,d([s()],y.prototype,"hass",2),d([s()],y.prototype,"narrow",2),d([h()],y.prototype,"tags",2),d([h()],y.prototype,"tasks",2),d([h()],y.prototype,"groups",2),d([h()],y.prototype,"config",2),d([h()],y.prototype,"registry",2),d([h()],y.prototype,"labelRegistry",2),d([J("hm-edit-dialog")],y.prototype,"_editDialog",2),d([J("hm-move-dialog")],y.prototype,"_moveDialog",2),d([J("hm-confirm-dialog")],y.prototype,"_confirmDialog",2);customElements.define("home-maintenance-panel",y);export{y as HomeMaintenancePanel};
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
