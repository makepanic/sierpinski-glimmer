(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t():"function"==typeof define&&define.amd?define(t):t()})(0,function(){"use strict"
function e(e="unreachable"){return new Error(e)}function t(e,t){if(!e)throw new Error(t||"assertion failure")}const s=Object.keys
function i(e){for(let t=1;t<arguments.length;t++){let i=arguments[t]
if(null===i||"object"!=typeof i)continue
let n=s(i)
for(let t=0;t<n.length;t++){let s=n[t]
e[s]=i[s]}}return e}let n=0
function r(e){return e._guid=++n}function a(){return Object.create(null)}class l{constructor(){this.stack=[],this.current=null}get size(){return this.stack.length}push(e){this.current=e,this.stack.push(e)}pop(){let e=this.stack.pop(),t=this.stack.length
return this.current=0===t?null:this.stack[t-1],void 0===e?null:e}isEmpty(){return 0===this.stack.length}}class o{constructor(e){this.next=null,this.prev=null,this.value=e}}class h{constructor(){this.clear()}head(){return this._head}tail(){return this._tail}clear(){this._head=this._tail=null}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e.next}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=t.next}insertBefore(e,t=null){return null===t?this.append(e):(t.prev?t.prev.next=e:this._head=e,e.prev=t.prev,e.next=t,t.prev=e,e)}append(e){let t=this._tail
return t?(t.next=e,e.prev=t,e.next=null):this._head=e,this._tail=e}remove(e){return e.prev?e.prev.next=e.next:this._head=e.next,e.next?e.next.prev=e.prev:this._tail=e.prev,e}}class u{constructor(e,t){this._head=e,this._tail=t}forEachNode(e){let t=this._head
for(;null!==t;)e(t),t=this.nextNode(t)}head(){return this._head}tail(){return this._tail}toArray(){let e=[]
return this.forEachNode(t=>e.push(t)),e}nextNode(e){return e===this._tail?null:e.next}}new u(null,null)
const c=Object.freeze([]),p=1
class d{validate(e){return this.value()===e}}d.id=0
const m=[],f=[]
class g{constructor(e,t){this.type=e,this.inner=t}value(){return(0,m[this.type])(this.inner)}validate(e){return(0,f[this.type])(this.inner,e)}}function b(e){let t=m.length
m.push(e=>e.value()),f.push((e,t)=>e.validate(t)),e.id=t}m.push(()=>0),f.push((e,t)=>0===t)
const y=new g(0,null)
m.push(()=>NaN),f.push((e,t)=>NaN===t)
const v=new g(1,null)
m.push(()=>w),f.push((e,t)=>t===w)
new g(2,null)
function k({tag:e}){return e===y}function S(e){return e===y}let w=p
class _ extends d{static create(e=w){return new g(this.id,new _(e))}constructor(e=w){super(),this.revision=e}value(){return this.revision}dirty(){this.revision=++w}}function E(e){let t=[]
for(let s=0,i=e.length;s<i;s++){let i=e[s].tag
if(i===v)return v
i!==y&&t.push(i)}return A(t)}function C(e){let t=[],s=e.head()
for(;null!==s;){let i=s.tag
if(i===v)return v
i!==y&&t.push(i),s=e.nextNode(s)}return A(t)}function x(e){let t=[]
for(let s=0,i=e.length;s<i;s++){let i=e[s]
if(i===v)return v
i!==y&&t.push(i)}return A(t)}function A(e){switch(e.length){case 0:return y
case 1:return e[0]
case 2:return O.create(e[0],e[1])
default:return T.create(e)}}b(_)
class N extends d{constructor(){super(...arguments),this.lastChecked=null,this.lastValue=null}value(){let e=this.lastChecked,t=this.lastValue
return e!==w&&(this.lastChecked=w,this.lastValue=t=this.compute()),this.lastValue}invalidate(){this.lastChecked=null}}class O extends N{static create(e,t){return new g(this.id,new O(e,t))}constructor(e,t){super(),this.first=e,this.second=t}compute(){return Math.max(this.first.value(),this.second.value())}}b(O)
class T extends N{static create(e){return new g(this.id,new T(e))}constructor(e){super(),this.tags=e}compute(){let e=this.tags,t=-1
for(let s=0;s<e.length;s++){let i=e[s].value()
t=Math.max(i,t)}return t}}b(T)
class L extends N{static create(e){return new g(this.id,new L(e))}constructor(e){super(),this.tag=e,this.lastUpdated=p}compute(){return Math.max(this.lastUpdated,this.tag.value())}update(e){e!==this.tag&&(this.tag=e,this.lastUpdated=w,this.invalidate())}}b(L)
class B{constructor(){this.lastRevision=null,this.lastValue=null}value(){let e=this.tag,t=this.lastRevision,s=this.lastValue
return null!==t&&e.validate(t)||(s=this.lastValue=this.compute(),this.lastRevision=e.value()),s}invalidate(){this.lastRevision=null}}class D{constructor(e){this.lastValue=null,this.lastRevision=null,this.initialized=!1,this.tag=e.tag,this.reference=e}peek(){return this.initialized?this.lastValue:this.initialize()}revalidate(){if(!this.initialized)return this.initialize()
let e=this.reference,t=this.lastRevision,s=e.tag
if(s.validate(t))return R
this.lastRevision=s.value()
let i=this.lastValue,n=e.value()
return n===i?R:(this.lastValue=n,n)}initialize(){let e=this.reference,t=this.lastValue=e.value()
return this.lastRevision=e.tag.value(),this.initialized=!0,t}}const R="adb3b78e-3d22-4e4b-877a-6317c2c5c145"
class M{constructor(e){this.inner=e,this.tag=y}value(){return this.inner}}class I extends o{constructor(e,t){super(e.valueReferenceFor(t)),this.retained=!1,this.seen=!1,this.key=t.key,this.iterable=e,this.memo=e.memoReferenceFor(t)}update(e){this.retained=!0,this.iterable.updateValueReference(this.value,e),this.iterable.updateMemoReference(this.memo,e)}shouldRemove(){return!this.retained}reset(){this.retained=!1,this.seen=!1}}class F{constructor(e){this.iterator=null,this.map=a(),this.list=new h,this.tag=e.tag,this.iterable=e}isEmpty(){return(this.iterator=this.iterable.iterate()).isEmpty()}iterate(){let e
return e=null===this.iterator?this.iterable.iterate():this.iterator,this.iterator=null,e}has(e){return!!this.map[e]}get(e){return this.map[e]}wasSeen(e){let t=this.map[e]
return void 0!==t&&t.seen}append(e){let t=this.map,s=this.list,i=this.iterable,n=t[e.key]=new I(i,e)
return s.append(n),n}insertBefore(e,t){let s=this.map,i=this.list,n=this.iterable,r=s[e.key]=new I(n,e)
return r.retained=!0,i.insertBefore(r,t),r}move(e,t){let s=this.list
e.retained=!0,s.remove(e),s.insertBefore(e,t)}remove(e){this.list.remove(e),delete this.map[e.key]}nextNode(e){return this.list.nextNode(e)}head(){return this.list.head()}}var P;(function(e){e[e.Append=0]="Append",e[e.Prune=1]="Prune",e[e.Done=2]="Done"})(P||(P={}))
class j{constructor({target:e,artifacts:t}){this.target=e,this.artifacts=t,this.iterator=t.iterate(),this.current=t.head()}sync(){let e=P.Append
for(;;)switch(e){case P.Append:e=this.nextAppend()
break
case P.Prune:e=this.nextPrune()
break
case P.Done:return void this.nextDone()}}advanceToKey(e){let t=this.current,s=this.artifacts,i=t
for(;null!==i&&i.key!==e;)i.seen=!0,i=s.nextNode(i)
null!==i&&(this.current=s.nextNode(i))}nextAppend(){let e=this.iterator,t=this.current,s=this.artifacts,i=e.next()
if(null===i)return this.startPrune()
let n=i.key
return null!==t&&t.key===n?this.nextRetain(i):s.has(n)?this.nextMove(i):this.nextInsert(i),P.Append}nextRetain(e){let t=this.artifacts,s=this.current;(s=s).update(e),this.current=t.nextNode(s),this.target.retain(e.key,s.value,s.memo)}nextMove(e){let t=this.current,s=this.artifacts,i=this.target,n=e.key,r=s.get(e.key)
r.update(e),s.wasSeen(e.key)?(s.move(r,t),i.move(r.key,r.value,r.memo,t?t.key:null)):this.advanceToKey(n)}nextInsert(e){let t=this.artifacts,s=this.target,i=this.current,n=t.insertBefore(e,i)
s.insert(n.key,n.value,n.memo,i?i.key:null)}startPrune(){return this.current=this.artifacts.head(),P.Prune}nextPrune(){let e=this.artifacts,t=this.target,s=this.current
if(null===s)return P.Done
let i=s
return this.current=e.nextNode(i),i.shouldRemove()?(e.remove(i),t.delete(i.key)):i.reset(),P.Prune}nextDone(){this.target.done()}}function V(...e){let t=e[0],s=e[1],i=e[2]
return"string"==typeof t?function(t,s,i){return z(t,s,i,e)}:i?z(t,s,i,[]):void function(e,t){let s,i=Symbol(t)
$(e).trackedProperties[t]=!0,void 0!==e[t]&&(s=e[t])
Object.defineProperty(e,t,{configurable:!0,get(){return this[i]},set(e){$(this).dirtyableTagFor(t).inner.dirty(),this[i]=e,Y()}})}(t,s)}function z(e,t,s,i){let n=$(e)
return n.trackedProperties[t]=!0,n.trackedPropertyDependencies[t]=i||[],{enumerable:!0,configurable:!1,get:s.get,set:function(){$(this).dirtyableTagFor(t).inner.dirty(),s.set.apply(this,arguments),Y()}}}class H{constructor(e){this.tags=a(),this.computedPropertyTags=a(),this.trackedProperties=e?Object.create(e.trackedProperties):a(),this.trackedPropertyDependencies=e?Object.create(e.trackedPropertyDependencies):a()}tagFor(e){let t,s=this.tags[e]
return s||((t=this.trackedPropertyDependencies[e])?this.tags[e]=function(e,t,s){let i=[e.dirtyableTagFor(t)]
if(s&&s.length)for(let n=0;n<s.length;n++)i.push(e.tagFor(s[n]))
return x(i)}(this,e,t):this.tags[e]=_.create())}dirtyableTagFor(e){let t
return this.trackedPropertyDependencies[e]?(t=this.computedPropertyTags[e])||(this.computedPropertyTags[e]=_.create()):(t=this.tags[e])||(this.tags[e]=_.create())}}let U=Symbol("ember-object")
function $(e){let t=e[U]
return t&&function(e,t){return G.call(e,t)}(e,U)?t:e[U]=new H(t)}let G=Object.prototype.hasOwnProperty
let Y=function(){}
class X extends Error{constructor(e,t,s){super(s),this.target=e,this.key=t}static for(e,t){return new X(e,t,`The property '${t}' on ${e} was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.`)}}function W(e,t,s=function(e,t){throw X.for(e,t)}){if("object"==typeof e&&e){return $(e).tagFor(t)}return y}class K{constructor(e){this.debugName=null,this.__args__=null,Object.assign(this,e)}get element(){let e=this.bounds
return t(e&&e.firstNode===e.lastNode,"The 'element' property can only be accessed on components that contain a single root element in their template. Try using 'bounds' instead to access the first and last nodes."),e.firstNode}get args(){return this.__args__}set args(e){this.__args__=e,$(this).dirtyableTagFor("args").inner.dirty()}static create(e){return new this(e)}didInsertElement(){}didUpdate(){}willDestroy(){}destroy(){this.willDestroy()}toString(){return`${this.debugName} component`}}const q={dynamicLayout:!1,dynamicTag:!0,prepareArgs:!1,createArgs:!0,attributeHook:!0,elementHook:!0}
class J{constructor(e,t,s,i){this.name=e,this.manager=t,this.ComponentClass=s,this.handle=i,this.state={name:e,capabilities:q,ComponentClass:s,handle:i}}toJSON(){return{GlimmerDebug:`<component-definition name="${this.name}">`}}}class Z{constructor(e,t=null){this._registry=e,this._resolver=t,this._lookups={},this._factoryDefinitionLookups={}}factoryFor(e){let t=this._factoryDefinitionLookups[e]
if(t||(this._resolver&&(t=this._resolver.retrieve(e)),t||(t=this._registry.registration(e)),t&&(this._factoryDefinitionLookups[e]=t)),t)return this.buildFactory(e,t)}lookup(e){let t=!1!==this._registry.registeredOption(e,"singleton")
if(t&&this._lookups[e])return this._lookups[e]
let s=this.factoryFor(e)
if(!s)return
if(!1===this._registry.registeredOption(e,"instantiate"))return s.class
let i=s.create()
return t&&i&&(this._lookups[e]=i),i}defaultInjections(e){return{}}buildInjections(e){let t,s=this.defaultInjections(e),i=this._registry.registeredInjections(e)
for(let n=0;n<i.length;n++)s[(t=i[n]).property]=this.lookup(t.source)
return s}buildFactory(e,t){let s=this.buildInjections(e)
return{class:t,create(e){let i=Object.assign({},s,e)
return t.create(i)}}}}class Q{constructor(e){this._registrations={},this._registeredOptions={},this._registeredInjections={},e&&e.fallback&&(this._fallback=e.fallback)}register(e,t,s){this._registrations[e]=t,s&&(this._registeredOptions[e]=s)}registration(e){let t=this._registrations[e]
return void 0===t&&this._fallback&&(t=this._fallback.registration(e)),t}unregister(e){delete this._registrations[e],delete this._registeredOptions[e],delete this._registeredInjections[e]}registerOption(e,t,s){let i=this._registeredOptions[e]
i||(i={},this._registeredOptions[e]=i),i[t]=s}registeredOption(e,t){let s,i=this.registeredOptions(e)
return i&&(s=i[t]),void 0===s&&void 0!==this._fallback&&(s=this._fallback.registeredOption(e,t)),s}registeredOptions(e){let t=this._registeredOptions[e]
if(void 0===t){let s=e.split(":")[0]
t=this._registeredOptions[s]}return t}unregisterOption(e,t){let s=this._registeredOptions[e]
s&&delete s[t]}registerInjection(e,t,s){let i=this._registeredInjections[e]
void 0===i&&(this._registeredInjections[e]=i=[]),i.push({property:t,source:s})}registeredInjections(e){let t=e.split(":")[0],s=this._fallback?this._fallback.registeredInjections(e):[]
return Array.prototype.push.apply(s,this._registeredInjections[t]),Array.prototype.push.apply(s,this._registeredInjections[e]),s}}const ee="__owner__"
function te(e){return e[ee]}function se(e,t){e[ee]=t}class ie{constructor(e){this._bounds=e}get firstNode(){return this._bounds.firstNode()}get lastNode(){return this._bounds.lastNode()}}const ne=new class{constructor(){this.evaluateOpcode=function(e){let t=new Array(e)
for(let s=0;s<e;s++)t[s]=null
return t}(82).slice()}add(e,t,s="syscall"){this.evaluateOpcode[e]={syscall:"syscall"===s,evaluate:t}}debugBefore(e,t,s){return{sp:void 0,state:void 0}}debugAfter(e,t,s,i){i.sp
i.state,e.stack.sp}evaluate(e,t,s){let i=this.evaluateOpcode[s]
i.syscall?i.evaluate(e,t):i.evaluate(e.inner,t)}}
class re{constructor(){r(this)}}class ae extends re{constructor(){super(...arguments),this.next=null,this.prev=null}}var le;(function(e){e[e.pc=0]="pc",e[e.ra=1]="ra",e[e.fp=2]="fp",e[e.sp=3]="sp",e[e.s0=4]="s0",e[e.s1=5]="s1",e[e.t0=6]="t0",e[e.t1=7]="t1",e[e.v0=8]="v0"})(le||(le={}))
class oe extends M{constructor(e){super(e)}static create(e){return void 0===e?ce:null===e?pe:!0===e?de:!1===e?me:"number"==typeof e?new ue(e):new he(e)}get(e){return ce}}class he extends oe{constructor(){super(...arguments),this.lengthReference=null}get(e){if("length"===e){let e=this.lengthReference
return null===e&&(e=this.lengthReference=new ue(this.inner.length)),e}return super.get(e)}}class ue extends oe{constructor(e){super(e)}}const ce=new ue(void 0),pe=new ue(null),de=new ue(!0),me=new ue(!1)
class fe{constructor(e){this.inner=e,this.tag=e.tag}value(){return this.toBool(this.inner.value())}toBool(e){return!!e}}var ge
function be(e){return function(t){return Array.isArray(t)&&t[0]===e}}ne.add(1,(e,{op1:t})=>{let s=e.stack,i=e.constants.resolveHandle(t)(e,s.pop())
e.loadValue(le.v0,i)}),ne.add(4,(e,{op1:t})=>{let s=e.referenceForSymbol(t)
e.stack.push(s)}),ne.add(2,(e,{op1:t})=>{let s=e.stack.pop()
e.scope().bindSymbol(t,s)}),ne.add(3,(e,{op1:t})=>{let s=e.stack.pop(),i=e.stack.pop(),n=e.stack.pop(),r=n?[s,i,n]:null
e.scope().bindBlock(t,r)}),ne.add(80,(e,{op1:t})=>{let s=e.constants.getString(t),i=e.scope().getPartialMap()[s]
void 0===i&&(i=e.getSelf().get(s)),e.stack.push(i)}),ne.add(17,(e,{op1:t,op2:s})=>{e.pushRootScope(t,!!s)}),ne.add(5,(e,{op1:t})=>{let s=e.constants.getString(t),i=e.stack.pop()
e.stack.push(i.get(s))}),ne.add(6,(e,{op1:t})=>{let s=e.stack,i=e.scope().getBlock(t)
i?(s.push(i[2]),s.push(i[1]),s.push(i[0])):(s.push(null),s.push(null),s.push(null))}),ne.add(7,(e,{op1:t})=>{let s=!!e.scope().getBlock(t)
e.stack.push(s?de:me)}),ne.add(8,e=>{e.stack.pop(),e.stack.pop()
let t=e.stack.pop(),s=t&&t.parameters.length
e.stack.push(s?de:me)}),ne.add(9,(e,{op1:t})=>{let s=new Array(t)
for(let i=t;i>0;i--){s[i-1]=e.stack.pop()}e.stack.push(new class extends B{constructor(e){super(),this.parts=e,this.tag=E(e)}compute(){let e=new Array
for(let s=0;s<this.parts.length;s++){let t=this.parts[s].value()
null!==t&&void 0!==t&&(e[s]="function"!=typeof(t=t).toString?"":String(t))}var t
return e.length>0?e.join(""):null}}(s))}),function(e){e[e.Text=0]="Text",e[e.Append=1]="Append",e[e.Comment=2]="Comment",e[e.Modifier=3]="Modifier",e[e.Block=4]="Block",e[e.Component=5]="Component",e[e.OpenElement=6]="OpenElement",e[e.OpenSplattedElement=7]="OpenSplattedElement",e[e.FlushElement=8]="FlushElement",e[e.CloseElement=9]="CloseElement",e[e.StaticAttr=10]="StaticAttr",e[e.DynamicAttr=11]="DynamicAttr",e[e.AttrSplat=12]="AttrSplat",e[e.Yield=13]="Yield",e[e.Partial=14]="Partial",e[e.DynamicArg=15]="DynamicArg",e[e.StaticArg=16]="StaticArg",e[e.TrustingAttr=17]="TrustingAttr",e[e.Debugger=18]="Debugger",e[e.ClientSideStatement=19]="ClientSideStatement",e[e.Unknown=20]="Unknown",e[e.Get=21]="Get",e[e.MaybeLocal=22]="MaybeLocal",e[e.HasBlock=23]="HasBlock",e[e.HasBlockParams=24]="HasBlockParams",e[e.Undefined=25]="Undefined",e[e.Helper=26]="Helper",e[e.Concat=27]="Concat",e[e.ClientSideExpression=28]="ClientSideExpression"}(ge||(ge={}))
const ye=be(ge.Get),ve=be(ge.MaybeLocal)
var ke,Se;(Se=ke||(ke={}))[Se.OpenComponentElement=0]="OpenComponentElement",Se[Se.DidCreateElement=1]="DidCreateElement",Se[Se.SetComponentAttrs=2]="SetComponentAttrs",Se[Se.DidRenderLayout=3]="DidRenderLayout",Se[Se.Debugger=4]="Debugger"
var we=ge
const _e="&attrs"
class Ee{constructor(e=0){this.offset=e,this.names=a(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}compile(e,t){let s=e[this.offset],i=this.names[s],n=this.funcs[i]
n(e,t)}}let Ce,xe
function Ae(e,t,s){let i=e[1],n=e[2],r=e[3]
s.expr(n),r?s.dynamicAttr(i,r,t):s.dynamicAttr(i,null,t)}class Ne{constructor(){var e=function(e=new Oe,t=new Te){return e.add("if",(e,t,s,i,n)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #if requires a single argument")
n.startLabels(),n.pushFrame(),n.returnTo("END"),n.expr(e[0]),n.toBoolean(),n.enter(1),n.jumpUnless("ELSE"),n.invokeStaticBlock(s),i?(n.jump("EXIT"),n.label("ELSE"),n.invokeStaticBlock(i),n.label("EXIT"),n.exit(),n.return()):(n.label("ELSE"),n.exit(),n.return()),n.label("END"),n.popFrame(),n.stopLabels()}),e.add("unless",(e,t,s,i,n)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #unless requires a single argument")
n.startLabels(),n.pushFrame(),n.returnTo("END"),n.expr(e[0]),n.toBoolean(),n.enter(1),n.jumpIf("ELSE"),n.invokeStaticBlock(s),i?(n.jump("EXIT"),n.label("ELSE"),n.invokeStaticBlock(i),n.label("EXIT"),n.exit(),n.return()):(n.label("ELSE"),n.exit(),n.return()),n.label("END"),n.popFrame(),n.stopLabels()}),e.add("with",(e,t,s,i,n)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #with requires a single argument")
n.startLabels(),n.pushFrame(),n.returnTo("END"),n.expr(e[0]),n.dup(),n.toBoolean(),n.enter(2),n.jumpUnless("ELSE"),n.invokeStaticBlock(s,1),i?(n.jump("EXIT"),n.label("ELSE"),n.invokeStaticBlock(i),n.label("EXIT"),n.exit(),n.return()):(n.label("ELSE"),n.exit(),n.return()),n.label("END"),n.popFrame(),n.stopLabels()}),e.add("each",(e,t,s,i,n)=>{n.startLabels(),n.pushFrame(),n.returnTo("END"),t&&"key"===t[0][0]?n.expr(t[1][0]):n.pushPrimitiveReference(null),n.expr(e[0]),n.enter(2),n.putIterator(),n.jumpUnless("ELSE"),n.pushFrame(),n.returnTo("ITER"),n.dup(le.fp,1),n.enterList("BODY"),n.label("ITER"),n.iterate("BREAK"),n.label("BODY"),n.invokeStaticBlock(s,2),n.pop(2),n.exit(),n.return(),n.label("BREAK"),n.exitList(),n.popFrame(),i?(n.jump("EXIT"),n.label("ELSE"),n.invokeStaticBlock(i),n.label("EXIT"),n.exit(),n.return()):(n.label("ELSE"),n.exit(),n.return()),n.label("END"),n.popFrame(),n.stopLabels()}),e.add("in-element",(e,t,s,i,n)=>{if(!e||1!==e.length)throw new Error("SYNTAX ERROR: #in-element requires a single argument")
n.startLabels(),n.pushFrame(),n.returnTo("END")
let r=t[0],a=t[1]
for(let l=0;l<r.length;l++){let e=r[l]
if("nextSibling"!==e&&"guid"!==e)throw new Error(`SYNTAX ERROR: #in-element does not take a \`${r[0]}\` option`)
n.expr(a[l])}n.expr(e[0]),n.dup(),n.enter(4),n.jumpUnless("ELSE"),n.pushRemoteElement(),n.invokeStaticBlock(s),n.popRemoteElement(),n.label("ELSE"),n.exit(),n.return(),n.label("END"),n.popFrame(),n.stopLabels()}),e.add("-with-dynamic-vars",(e,t,s,i,n)=>{if(t){let e=t[0],i=t[1]
n.compileParams(i),n.pushDynamicScope(),n.bindDynamicScope(e),n.invokeStaticBlock(s),n.popDynamicScope()}else n.invokeStaticBlock(s)}),e.add("component",(e,t,s,i,n)=>{if("string"==typeof e[0]&&n.staticComponentHelper(e[0],t,s))return
let r=e[0],a=e.slice(1)
n.dynamicComponent(r,a,t,!0,s,i)}),t.add("component",(e,t,s,i)=>{let n=t&&t[0]
if("string"==typeof n&&i.staticComponentHelper(n,s,null))return!0
let r=t[0],a=t.slice(1)
return i.dynamicComponent(r,a,s,!0,null,null),!0}),{blocks:e,inlines:t}}()
let t=e.blocks,s=e.inlines
this.blocks=t,this.inlines=s}}class Oe{constructor(){this.names=a(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t,s,i,n,r){let a=this.names[e]
if(void 0===a){(0,this.missing)(e,t,s,i,n,r)}else{(0,this.funcs[a])(t,s,i,n,r)}}}class Te{constructor(){this.names=a(),this.funcs=[]}add(e,t){this.funcs.push(t),this.names[e]=this.funcs.length-1}addMissing(e){this.missing=e}compile(e,t){let s,i,n,r=e[1]
if(!Array.isArray(r))return["expr",r]
if(r[0]===we.Helper)s=r[1],i=r[2],n=r[3]
else{if(r[0]!==we.Unknown)return["expr",r]
s=r[1],i=n=null}let a=this.names[s]
if(void 0===a&&this.missing){let e=(0,this.missing)(s,i,n,t)
return!1===e?["expr",r]:e}if(void 0!==a){let e=(0,this.funcs[a])(s,i,n,t)
return!1===e?["expr",r]:e}return["expr",r]}}const Le=-1
class Be{constructor(e,t,s,i){this.statements=e,this.containingLayout=t,this.options=s,this.symbolTable=i,this.compiled=null,this.statementCompiler=function(){if(Ce)return Ce
const e=Ce=new Ee
e.add(we.Text,(e,t)=>{t.text(e[1])}),e.add(we.Comment,(e,t)=>{t.comment(e[1])}),e.add(we.CloseElement,(e,t)=>{t.closeElement()}),e.add(we.FlushElement,(e,t)=>{t.flushElement()}),e.add(we.Modifier,(e,t)=>{let s=t.resolver,i=t.referrer,n=e[1],r=e[2],a=e[3],l=s.lookupModifier(n,i)
if(!l)throw new Error(`Compile Error ${n} is not a modifier: Helpers may not be used in the element form.`)
t.modifier(l,r,a)}),e.add(we.StaticAttr,(e,t)=>{let s=e[1],i=e[2],n=e[3]
t.staticAttr(s,n,i)}),e.add(we.DynamicAttr,(e,t)=>{Ae(e,!1,t)}),e.add(we.TrustingAttr,(e,t)=>{Ae(e,!0,t)}),e.add(we.OpenElement,(e,t)=>{t.openPrimitiveElement(e[1])}),e.add(we.OpenSplattedElement,(e,t)=>{t.setComponentAttrs(!0),t.putComponentOperations(),t.openPrimitiveElement(e[1])}),e.add(we.Component,(e,t)=>{let s=e[1],i=e[2],n=e[3],r=e[4],a=t.resolver,l=t.referrer,o=a.lookupComponentDefinition(s,l)
if(null===o)throw new Error(`Compile Error: Cannot find component ${s}`)
{let e=a.getCapabilities(o),s=[[we.ClientSideStatement,ke.SetComponentAttrs,!0],...i,[we.ClientSideStatement,ke.SetComponentAttrs,!1]],l=t.inlineBlock({statements:s,parameters:c}),h=t.template(r)
if(!1===e.dynamicLayout){let s=a.getLayout(o)
t.pushComponentDefinition(o),t.invokeStaticComponent(e,s,l,null,n,!1,h&&h)}else t.pushComponentDefinition(o),t.invokeComponent(l,null,n,!1,h&&h)}}),e.add(we.Partial,(e,t)=>{let s=e[1],i=e[2],n=t.referrer
t.startLabels(),t.pushFrame(),t.returnTo("END"),t.expr(s),t.dup(),t.enter(2),t.jumpUnless("ELSE"),t.invokePartial(n,t.evalSymbols(),i),t.popScope(),t.popFrame(),t.label("ELSE"),t.exit(),t.return(),t.label("END"),t.popFrame(),t.stopLabels()}),e.add(we.Yield,(e,t)=>{let s=e[1],i=e[2]
t.yield(s,i)}),e.add(we.AttrSplat,(e,t)=>{let s=e[1]
t.yield(s,[]),t.didCreateElement(le.s0),t.setComponentAttrs(!1)}),e.add(we.Debugger,(e,t)=>{let s=e[1]
t.debugger(t.evalSymbols(),s)}),e.add(we.ClientSideStatement,(e,s)=>{t.compile(e,s)}),e.add(we.Append,(e,t)=>{let s=e[1],i=e[2]
if(!0===(t.macros.inlines.compile(e,t)||s))return
let n=ye(s),r=ve(s)
i?t.guardedAppend(s,!0):n||r?t.guardedAppend(s,!1):(t.expr(s),t.primitive(!1),t.load(le.t0),t.dynamicContent())}),e.add(we.Block,(e,t)=>{let s=e[1],i=e[2],n=e[3],r=e[4],a=e[5],l=t.template(r),o=t.template(a),h=l&&l,u=o&&o
t.macros.blocks.compile(s,i,n,h,u,t)})
const t=new Ee(1)
return t.add(ke.OpenComponentElement,(e,t)=>{t.putComponentOperations(),t.openPrimitiveElement(e[2])}),t.add(ke.DidCreateElement,(e,t)=>{t.didCreateElement(le.s0)}),t.add(ke.SetComponentAttrs,(e,t)=>{t.setComponentAttrs(e[2])}),t.add(ke.Debugger,()=>{}),t.add(ke.DidRenderLayout,(e,t)=>{t.didRenderLayout(le.s0)}),e}()}static topLevel(e,t){return new Be(e.statements,{block:e,referrer:t.referrer},t,{referrer:t.referrer,hasEval:e.hasEval,symbols:e.symbols})}compile(e){let t=this.compiled
if(null!==t)return t
this.compiled=Le
let s=this.options,i=this.statements,n=this.containingLayout,r=n.referrer,a=s.program,l=s.resolver,o=s.macros,h=s.asPartial,u=new(0,s.Builder)(a,l,r,o,n,h,e)
for(let p=0;p<i.length;p++)this.statementCompiler.compile(i[p],u)
let c=u.commit(a.heap,n.block.symbols.length)
return this.compiled=c}}class De{constructor(e){this.builder=e}static(e,t){let s=t[0],i=t[1],n=t[2],r=t[3],a=this.builder,l=a.resolver
if(null!==e){let t=l.getCapabilities(e)
if(!1===t.dynamicLayout){let o=l.getLayout(e)
a.pushComponentDefinition(e),a.invokeStaticComponent(t,o,null,s,i,!1,n,r)}else a.pushComponentDefinition(e),a.invokeComponent(null,s,i,!1,n,r)}}}class Re{constructor(e){this.buffer=e,this.typePos=0,this.size=0}encode(e,t){if(e>255)throw new Error(`Opcode type over 8-bits. Got ${e}.`)
this.buffer.push(e|t|arguments.length-2<<8),this.typePos=this.buffer.length-1
for(let s=2;s<arguments.length;s++){let e=arguments[s]
if("number"==typeof e&&e>65535)throw new Error(`Operand over 16-bits. Got ${e}.`)
this.buffer.push(e)}this.size=this.buffer.length}patch(e,t){if(-1!==this.buffer[e+1])throw new Error("Trying to patch operand in populated slot instead of a reserved slot.")
this.buffer[e+1]=t}}class Me{constructor(){this.labels=a(),this.targets=[]}label(e,t){this.labels[e]=t}target(e,t){this.targets.push({at:e,target:t})}patch(e){let t=this.targets,s=this.labels
for(let n=0;n<t.length;n++){var i=t[n]
let r=i.at,a=s[i.target]-r
e.patch(r,a)}}}class Ie{constructor(){this.encoder=new Re([])}push(e){switch(arguments.length){case 1:return this.encoder.encode(e,0)
case 2:return this.encoder.encode(e,0,arguments[1])
case 3:return this.encoder.encode(e,0,arguments[1],arguments[2])
default:return this.encoder.encode(e,0,arguments[1],arguments[2],arguments[3])}}pushMachine(e){switch(arguments.length){case 1:return this.encoder.encode(e,1024)
case 2:return this.encoder.encode(e,1024,arguments[1])
case 3:return this.encoder.encode(e,1024,arguments[1],arguments[2])
default:return this.encoder.encode(e,1024,arguments[1],arguments[2],arguments[3])}}commit(e,t){this.pushMachine(20)
let s=this.encoder.buffer,i=e.malloc()
for(let n=0;n<s.length;n++){let t=s[n]
"function"==typeof t?e.pushPlaceholder(t):e.push(t)}return e.finishMalloc(i,t),i}reserve(e){this.encoder.encode(e,0,-1)}reserveMachine(e){this.encoder.encode(e,1024,-1)}main(){this.push(56,le.s0),this.invokePreparedComponent(!1)}dynamicContent(){this.push(24)}beginComponentTransaction(){this.push(75)}commitComponentTransaction(){this.push(76)}pushDynamicScope(){this.push(36)}popDynamicScope(){this.push(37)}pushRemoteElement(){this.push(33)}popRemoteElement(){this.push(34)}pushRootScope(e,t){this.push(17,e,t?1:0)}pushChildScope(){this.push(18)}popScope(){this.push(19)}prepareArgs(e){this.push(65,e)}createComponent(e,t){let s=0|t
this.push(67,s,e)}registerComponentDestructor(e){this.push(68,e)}putComponentOperations(){this.push(69)}getComponentSelf(e){this.push(70,e)}getComponentTagName(e){this.push(71,e)}getComponentLayout(e){this.push(72,e)}invokeComponentLayout(e){this.push(74,e)}didCreateElement(e){this.push(77,e)}didRenderLayout(e){this.push(78,e)}pushFrame(){this.pushMachine(47)}popFrame(){this.pushMachine(48)}invokeVirtual(){this.pushMachine(41)}invokeYield(){this.push(43)}toBoolean(){this.push(51)}invokePreparedComponent(e,t=null){this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(le.s0,e),t&&t(),this.registerComponentDestructor(le.s0),this.getComponentSelf(le.s0),this.invokeComponentLayout(le.s0),this.didRenderLayout(le.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction()}get pos(){return this.encoder.typePos}get nextPos(){return this.encoder.size}}class Fe extends Ie{constructor(e,t,s,i,n,r,a){super(),this.program=e,this.resolver=t,this.referrer=s,this.macros=i,this.containingLayout=n,this.asPartial=r,this.stdLib=a,this.component=new De(this),this.expressionCompiler=function(){if(xe)return xe
const e=xe=new Ee
return e.add(we.Unknown,(e,t)=>{let s=t.resolver,i=t.asPartial,n=t.referrer,r=e[1],a=s.lookupHelper(r,n)
null!==a?t.helper(a,null,null):i?t.resolveMaybeLocal(r):(t.getVariable(0),t.getProperty(r))}),e.add(we.Concat,(e,t)=>{let s=e[1]
for(let i=0;i<s.length;i++)t.expr(s[i])
t.concat(s.length)}),e.add(we.Helper,(e,t)=>{let s=t.resolver,i=t.referrer,n=e[1],r=e[2],a=e[3]
if("component"===n){let e=r[0],s=r.slice(1)
return void t.curryComponent(e,s,a,!0)}let l=s.lookupHelper(n,i)
if(null===l)throw new Error(`Compile Error: ${n} is not a helper`)
t.helper(l,r,a)}),e.add(we.Get,(e,t)=>{let s=e[1],i=e[2]
t.getVariable(s)
for(let n=0;n<i.length;n++)t.getProperty(i[n])}),e.add(we.MaybeLocal,(e,t)=>{let s=e[1]
if(t.asPartial){let e=s[0]
s=s.slice(1),t.resolveMaybeLocal(e)}else t.getVariable(0)
for(let i=0;i<s.length;i++)t.getProperty(s[i])}),e.add(we.Undefined,(e,t)=>t.pushPrimitiveReference(void 0)),e.add(we.HasBlock,(e,t)=>{t.hasBlock(e[1])}),e.add(we.HasBlockParams,(e,t)=>{t.hasBlockParams(e[1])}),e}(),this.labelsStack=new l,this.isComponentAttrs=!1,this.constants=e.constants}label(e){this.labels.label(e,this.nextPos)}setComponentAttrs(e){this.isComponentAttrs=e}expr(e){Array.isArray(e)?this.expressionCompiler.compile(e,this):this.pushPrimitiveReference(e)}pushArgs(e,t){let s=this.constants.stringArray(e)
this.push(63,s,t)}get labels(){return this.labelsStack.current}startLabels(){this.labelsStack.push(new Me)}stopLabels(){this.labelsStack.pop().patch(this.encoder)}pushComponentDefinition(e){this.push(59,this.constants.handle(e))}pushCurriedComponent(){this.push(61)}pushDynamicComponentInstance(){this.push(60)}resolveDynamicComponent(e){this.push(62,this.constants.serializable(e))}staticComponentHelper(e,t,s){let i=this.resolver.lookupComponentDefinition(e,this.referrer)
if(i){let e=this.resolver.getCapabilities(i)
if(!1===e.dynamicLayout){if(t)for(let e=0;e<t.length;e+=2)t[e][0]=`@${t[e][0]}`
let n=this.resolver.getLayout(i)
return this.pushComponentDefinition(i),this.invokeStaticComponent(e,n,null,null,t,!1,s&&s),!0}}return!1}invokePartial(e,t,s){let i=this.constants.serializable(e),n=this.constants.stringArray(t),r=this.constants.array(s)
this.push(79,i,n,r)}resolveMaybeLocal(e){this.push(80,this.string(e))}debugger(e,t){this.push(81,this.constants.stringArray(e),this.constants.array(t))}text(e){this.push(22,this.constants.string(e))}openPrimitiveElement(e){this.push(25,this.constants.string(e))}openDynamicElement(){this.push(26)}flushElement(){this.push(30)}closeElement(){this.push(31)}staticAttr(e,t,s){let i=this.constants.string(e),n=t?this.constants.string(t):0
if(this.isComponentAttrs)this.pushPrimitiveReference(s),this.push(29,i,1,n)
else{let e=this.constants.string(s)
this.push(27,i,e,n)}}dynamicAttr(e,t,s){let i=this.constants.string(e),n=t?this.constants.string(t):0
this.isComponentAttrs?this.push(29,i,!0===s?1:0,n):this.push(28,i,!0===s?1:0,n)}comment(e){let t=this.constants.string(e)
this.push(23,t)}modifier(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(32,this.constants.handle(e)),this.popFrame()}putIterator(){this.push(54)}enterList(e){this.reserve(52),this.labels.target(this.pos,e)}exitList(){this.push(53)}iterate(e){this.reserve(55),this.labels.target(this.pos,e)}setVariable(e){this.push(2,e)}setBlock(e){this.push(3,e)}getVariable(e){this.push(4,e)}getProperty(e){this.push(5,this.string(e))}getBlock(e){this.push(6,e)}hasBlock(e){this.push(7,e)}hasBlockParams(e){this.getBlock(e),this.resolveBlock(),this.push(8)}concat(e){this.push(9,e)}load(e){this.push(15,e)}fetch(e){this.push(16,e)}dup(e=le.sp,t=0){return this.push(13,e,t)}pop(e=1){return this.push(14,e)}returnTo(e){this.reserveMachine(21),this.labels.target(this.pos,e)}primitive(e){let t,s=0
switch(typeof e){case"number":e%1==0?e>-1?t=e:(t=this.negative(e),s=4):(t=this.float(e),s=1)
break
case"string":t=this.string(e),s=2
break
case"boolean":t=0|e,s=3
break
case"object":t=2,s=3
break
case"undefined":t=3,s=3
break
default:throw new Error("Invalid primitive passed to pushPrimitive")}this.push(11,t<<3|s)}float(e){return this.constants.float(e)}negative(e){return this.constants.negative(e)}pushPrimitiveReference(e){this.primitive(e),this.primitiveReference()}primitiveReference(){this.push(12)}helper(e,t,s){this.pushFrame(),this.compileArgs(t,s,null,!0),this.push(1,this.constants.handle(e)),this.popFrame(),this.fetch(le.v0)}bindDynamicScope(e){this.push(35,this.names(e))}enter(e){this.push(49,e)}exit(){this.push(50)}return(){this.pushMachine(20)}jump(e){this.reserveMachine(44),this.labels.target(this.pos,e)}jumpIf(e){this.reserve(45),this.labels.target(this.pos,e)}jumpUnless(e){this.reserve(46),this.labels.target(this.pos,e)}string(e){return this.constants.string(e)}names(e){let t=[]
for(let s=0;s<e.length;s++){let i=e[s]
t[s]=this.constants.string(i)}return this.constants.array(t)}symbols(e){return this.constants.array(e)}inlineBlock(e){let t=e.parameters,s=e.statements,i={parameters:t,referrer:this.containingLayout.referrer},n={program:this.program,macros:this.macros,Builder:this.constructor,resolver:this.resolver,asPartial:this.asPartial,referrer:this.referrer}
return new Be(s,this.containingLayout,n,i)}evalSymbols(){let e=this.containingLayout.block
return e.hasEval?e.symbols:null}compileParams(e){if(!e)return 0
for(let t=0;t<e.length;t++)this.expr(e[t])
return e.length}compileArgs(e,t,s,i){s&&(this.pushYieldableBlock(s.main),this.pushYieldableBlock(s.else),this.pushYieldableBlock(s.attrs))
let n=this.compileParams(e)<<4
i&&(n|=8),s&&(n|=7)
let r=c
if(t){r=t[0]
let e=t[1]
for(let t=0;t<e.length;t++)this.expr(e[t])}this.pushArgs(r,n)}invokeStaticBlock(e,t=0){let s=e.symbolTable.parameters,i=s.length,n=Math.min(t,i)
if(this.pushFrame(),n){this.pushChildScope()
for(let e=0;e<n;e++)this.dup(le.fp,t-e),this.setVariable(s[e])}this.pushBlock(e),this.resolveBlock(),this.invokeVirtual(),n&&this.popScope(),this.popFrame()}builtInGuardedAppend(){this.dup(),this.startLabels(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.dynamicContent(),this.exit(),this.return(),this.stopLabels()}guardedAppend(e,t){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.stdLib?(this.primitive(!!t),this.load(le.t0),this.expr(e),this.primitive(this.stdLib.guardedAppend),this.invokeVirtual()):(this.expr(e),this.dup(),this.isComponent(),this.enter(2),this.jumpUnless("ELSE"),this.pushCurriedComponent(),this.pushDynamicComponentInstance(),this.invokeComponent(null,null,null,!1,null,null),this.exit(),this.return(),this.label("ELSE"),this.primitive(!!t),this.load(le.t0),this.dynamicContent(),this.exit(),this.return()),this.label("END"),this.popFrame(),this.stopLabels()}yield(e,t){this.compileArgs(t,null,null,!1),this.getBlock(e),this.resolveBlock(),this.invokeYield(),this.popScope(),this.popFrame()}populateLayout(e){this.push(73,e)}invokeComponent(e,t,s,i,n,r=null,a){this.fetch(le.s0),this.dup(le.sp,1),this.load(le.s0),this.pushFrame()
let l={main:n,else:r,attrs:e}
this.compileArgs(t,s,l,i),this.prepareArgs(le.s0),this.invokePreparedComponent(null!==n,()=>{a?(this.pushSymbolTable(a.symbolTable),this.pushLayout(a),this.resolveLayout()):this.getComponentLayout(le.s0),this.populateLayout(le.s0)}),this.load(le.s0)}invokeStaticComponent(t,s,i,n,r,a,l,o=null){let h=s.symbolTable
if(h.hasEval||t.prepareArgs)return void this.invokeComponent(i,n,r,a,l,o,s)
this.fetch(le.s0),this.dup(le.sp,1),this.load(le.s0)
let u=h.symbols
t.createArgs&&(this.pushFrame(),this.compileArgs(null,r,null,a)),this.beginComponentTransaction(),this.pushDynamicScope(),this.createComponent(le.s0,null!==l),t.createArgs&&this.popFrame(),this.registerComponentDestructor(le.s0)
let c=[]
this.getComponentSelf(le.s0),c.push({symbol:0,isBlock:!1})
for(let d=0;d<u.length;d++){let t=u[d]
switch(t.charAt(0)){case"&":let s=null
if("&default"===t)s=l
else if("&inverse"===t)s=o
else{if(t!==_e)throw e()
s=i}s?(this.pushYieldableBlock(s),c.push({symbol:d+1,isBlock:!0})):(this.pushYieldableBlock(null),c.push({symbol:d+1,isBlock:!0}))
break
case"@":if(!r)break
let n=r[0],h=r[1],u=t
a&&(u=t.slice(1))
let p=n.indexOf(u);-1!==p&&(this.expr(h[p]),c.push({symbol:d+1,isBlock:!1}))}}this.pushRootScope(u.length+1,!!(l||o||i))
for(let e=c.length-1;e>=0;e--){var p=c[e]
let t=p.symbol
p.isBlock?this.setBlock(t):this.setVariable(t)}this.pushFrame(),this.invokeStatic(s),this.didRenderLayout(le.s0),this.popFrame(),this.popScope(),this.popDynamicScope(),this.commitComponentTransaction(),this.load(le.s0)}dynamicComponent(e,t,s,i,n,r=null){this.startLabels(),this.pushFrame(),this.returnTo("END"),this.expr(e),this.dup(),this.enter(2),this.jumpUnless("ELSE"),this.resolveDynamicComponent(this.referrer),this.pushDynamicComponentInstance(),this.invokeComponent(null,t,s,i,n,r),this.label("ELSE"),this.exit(),this.return(),this.label("END"),this.popFrame(),this.stopLabels()}isComponent(){this.push(57)}curryComponent(e,t,s,i){let n=this.referrer
this.pushFrame(),this.compileArgs(t,s,null,i),this.push(66),this.expr(e),this.push(58,this.constants.serializable(n)),this.popFrame(),this.fetch(le.v0)}pushSymbolTable(e){if(e){let t=this.constants.serializable(e)
this.push(40,t)}else this.primitive(null)}pushBlockScope(){this.push(39)}pushYieldableBlock(e){this.pushSymbolTable(e&&e.symbolTable),this.pushBlockScope(),this.pushBlock(e)}template(e){return e?this.inlineBlock(e):null}}class Pe extends Fe{pushBlock(e){e?this.pushOther(e):this.primitive(null)}resolveBlock(){this.push(38)}pushLayout(e){e?this.pushOther(e):this.primitive(null)}resolveLayout(){this.push(38)}invokeStatic(e){this.pushOther(e),this.push(38),this.pushMachine(41)}pushOther(e){this.push(10,this.other(e))}other(e){return this.constants.other(e)}}class je{constructor(){this.base=0,this.length=0,this.stack=null,this._tag=null,this._references=null}setup(e,t,s){this.stack=e,this.base=t,this.length=s,0===s?(this._tag=y,this._references=c):(this._tag=null,this._references=null)}get tag(){let e=this._tag
return e||(e=this._tag=E(this.references)),e}at(e){let t=this.base,s=this.length,i=this.stack
return e<0||e>=s?ce:i.get(e,t)}capture(){return new Ve(this.tag,this.references)}prepend(e){let t=e.length
if(t>0){let s=this.base,i=this.length,n=this.stack
this.base=s-=t,this.length=i+t
for(let r=0;r<t;r++)n.set(e.at(r),r,s)
this._tag=null,this._references=null}}get references(){let e=this._references
if(!e){let t=this.stack,s=this.base,i=this.length
e=this._references=t.sliceArray(s,s+i)}return e}}class Ve{constructor(e,t,s=t.length){this.tag=e,this.references=t,this.length=s}static empty(){return new Ve(y,c,0)}at(e){return this.references[e]}value(){return this.references.map(this.valueOf)}get(e){let t=this.references,s=this.length
if("length"===e)return oe.create(s)
{let i=parseInt(e,10)
return i<0||i>=s?ce:t[i]}}valueOf(e){return e.value()}}class ze{constructor(){this.base=0,this.length=0,this._references=null,this._names=c,this._atNames=c}setup(e,t,s,i,n){this.stack=e,this.base=t,this.length=s,0===s?(this._references=c,this._names=c,this._atNames=c):(this._references=null,n?(this._names=i,this._atNames=null):(this._names=null,this._atNames=i))}get tag(){return E(this.references)}get names(){let e=this._names
return e||(e=this._names=this._atNames.map(this.toSyntheticName)),e}get atNames(){let e=this._atNames
return e||(e=this._atNames=this._names.map(this.toAtName)),e}has(e){return-1!==this.names.indexOf(e)}get(e,t=!0){let s=this.base,i=this.stack,n=(t?this.names:this.atNames).indexOf(e)
return-1===n?ce:i.get(n,s)}capture(){return new He(this.tag,this.names,this.references)}merge(e){let t=e.length
if(t>0){let s=this.names,i=this.length,n=this.stack,r=e.names
Object.isFrozen(s)&&0===s.length&&(s=[])
for(let a=0;a<t;a++){let t=r[a];-1===s.indexOf(t)&&(i=s.push(t),n.push(e.references[a]))}this.length=i,this._references=null,this._names=s,this._atNames=null}}get references(){let e=this._references
if(!e){let t=this.base,s=this.length,i=this.stack
e=this._references=i.sliceArray(t,t+s)}return e}toSyntheticName(e){return e.slice(1)}toAtName(e){return`@${e}`}}class He{constructor(e,t,s){this.tag=e,this.names=t,this.references=s,this.length=t.length,this._map=null}get map(){let e=this._map
if(!e){let t=this.names,s=this.references
e=this._map=a()
for(let i=0;i<t.length;i++){e[t[i]]=s[i]}}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names,s=this.references,i=t.indexOf(e)
return-1===i?ce:s[i]}value(){let e=this.names,t=this.references,s=a()
for(let i=0;i<e.length;i++){s[e[i]]=t[i].value()}return s}}class Ue{constructor(){this.internalValues=null,this.internalTag=null,this.names=c,this.length=0,this.base=0}setup(e,t,s,i){this.stack=e,this.names=i,this.base=t,this.length=s,0===s?(this.internalTag=y,this.internalValues=c):(this.internalTag=null,this.internalValues=null)}get values(){let e=this.internalValues
if(!e){let t=this.base,s=this.length,i=this.stack
e=this.internalValues=i.sliceArray(t,t+3*s)}return e}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.base,s=this.stack,i=this.names,n=i.indexOf(e)
if(-1===i.indexOf(e))return null
let r=s.get(3*n,t),a=s.get(3*n+1,t),l=s.get(3*n+2,t)
return null===l?null:[l,a,r]}capture(){return new $e(this.names,this.values)}}class $e{constructor(e,t){this.names=e,this.values=t,this.length=e.length}has(e){return-1!==this.names.indexOf(e)}get(e){let t=this.names.indexOf(e)
return-1===t?null:[this.values[3*t+2],this.values[3*t+1],this.values[3*t]]}}const Ge=new He(y,c,c),Ye=new Ve(y,c),Xe={tag:y,length:0,positional:Ye,named:Ge},We="CURRIED COMPONENT DEFINITION [id=6f00feb9-a0ef-4547-99ea-ac328f80acea]"
function Ke(e){return!(!e||!e[We])}class qe{constructor(e,t){this.inner=e,this.args=t,this[We]=!0}unwrap(e){e.realloc(this.offset)
let t=this
for(;;){var s=t
let i=s.args,n=s.inner
if(i&&(e.positional.prepend(i.positional),e.named.merge(i.named)),!Ke(n))return n
t=n}}get offset(){let e=this.inner,t=this.args,s=t?t.positional.length:0
return Ke(e)?s+e.offset:s}}class Je extends fe{static create(e){return new Je(e)}toBool(e){return Ke(e)}}ne.add(24,e=>{let t,s=e.stack.pop(),i=e.fetchValue(le.t0),n=s.value()
t=i?e.elements().appendTrustingDynamicContent(n):e.elements().appendCautiousDynamicContent(n),k(s)||e.updateWith(new class extends ae{constructor(e,t){super(),this.reference=e,this.content=t,this.tag=e.tag}evaluate(e){let t=this.content,s=this.reference
t.update(e.env,s.value())}}(s,t)),e.loadValue(le.t0,null)})
ne.add(18,e=>e.pushChildScope()),ne.add(19,e=>e.popScope()),ne.add(36,e=>e.pushDynamicScope()),ne.add(37,e=>e.popDynamicScope()),ne.add(10,(e,{op1:t})=>{e.stack.push(e.constants.getOther(t))}),ne.add(11,(e,{op1:t})=>{let s=e.stack,i=t>>3
switch(7&t){case 0:s.push(i)
break
case 1:s.push(e.constants.getFloat(i))
break
case 2:s.push(e.constants.getString(i))
break
case 3:s.pushEncodedImmediate(t)
break
case 4:s.push(e.constants.getNegative(i))}}),ne.add(12,e=>{let t=e.stack
t.push(oe.create(t.pop()))}),ne.add(13,(e,{op1:t,op2:s})=>{let i=e.fetchValue(t)-s
e.stack.dup(i)}),ne.add(14,(e,{op1:t})=>{e.stack.pop(t)}),ne.add(15,(e,{op1:t})=>{e.load(t)}),ne.add(16,(e,{op1:t})=>{e.fetch(t)}),ne.add(35,(e,{op1:t})=>{let s=e.constants.getArray(t)
e.bindDynamicScope(s)}),ne.add(49,(e,{op1:t})=>{e.enter(t)}),ne.add(50,e=>{e.exit()}),ne.add(40,(e,{op1:t})=>{e.stack.push(e.constants.getSerializable(t))}),ne.add(39,e=>{e.stack.push(e.scope())}),ne.add(38,e=>{let t=e.stack,s=t.pop()
s?t.pushSmi(s.compile()):t.pushNull()}),ne.add(43,e=>{let t=e.stack,s=t.pop(),i=t.pop(),n=t.pop(),r=t.pop()
if(null===n)return e.pushFrame(),void e.pushScope(i)
let a=i
{let e=n.parameters,t=e.length
if(t>0){a=a.child()
for(let s=0;s<t;s++)a.bindSymbol(e[s],r.at(s))}}e.pushFrame(),e.pushScope(a),e.call(s)}),ne.add(45,(e,{op1:t})=>{let s=e.stack.pop()
if(k(s))s.value()&&e.goto(t)
else{let i=new D(s)
i.peek()&&e.goto(t),e.updateWith(new Ze(i))}}),ne.add(46,(e,{op1:t})=>{let s=e.stack.pop()
if(k(s))s.value()||e.goto(t)
else{let i=new D(s)
i.peek()||e.goto(t),e.updateWith(new Ze(i))}}),ne.add(51,e=>{let t=e.env,s=e.stack
s.push(t.toConditionalReference(s.pop()))})
class Ze extends ae{constructor(e){super(),this.type="assert",this.tag=e.tag,this.cache=e}evaluate(e){let t=this.cache
t.revalidate()!==R&&e.throw()}}class Qe extends ae{constructor(e,t){super(),this.target=t,this.type="jump-if-not-modified",this.tag=e,this.lastRevision=e.value()}evaluate(e){let t=this.tag,s=this.target,i=this.lastRevision
!e.alwaysRevalidate&&t.validate(i)&&e.goto(s)}didModify(){this.lastRevision=this.tag.value()}}class et extends ae{constructor(e){super(),this.target=e,this.type="did-modify",this.tag=y}evaluate(){this.target.didModify()}}class tt{constructor(e){this.tag=y,this.type="label",this.label=null,this.prev=null,this.next=null,r(this),this.label=e}evaluate(){}inspect(){return`${this.label} [${this._guid}]`}}ne.add(22,(e,{op1:t})=>{e.elements().appendText(e.constants.getString(t))}),ne.add(23,(e,{op1:t})=>{e.elements().appendComment(e.constants.getString(t))}),ne.add(25,(e,{op1:t})=>{e.elements().openElement(e.constants.getString(t))}),ne.add(26,e=>{let t=e.stack.pop().value()
e.elements().openElement(t)}),ne.add(33,e=>{let t,s,i=e.stack.pop(),n=e.stack.pop(),r=e.stack.pop().value()
if(k(i))t=i.value()
else{let s=new D(i)
t=s.peek(),e.updateWith(new Ze(s))}if(k(n))s=n.value()
else{let t=new D(n)
s=t.peek(),e.updateWith(new Ze(t))}e.elements().pushRemoteElement(t,r,s)}),ne.add(34,e=>{e.elements().popRemoteElement()}),ne.add(30,e=>{let t=e.fetchValue(le.t0)
t&&(t.flush(e),e.loadValue(le.t0,null)),e.elements().flushElement()}),ne.add(31,e=>{e.elements().closeElement()}),ne.add(32,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),i=e.stack.pop()
var n=e.elements()
let r=n.constructing,a=n.updateOperations,l=e.dynamicScope(),o=s.create(r,i,l,a)
e.env.scheduleInstallModifier(o,s)
let h=s.getDestructor(o)
h&&e.newDestroyable(h)
let u=s.getTag(o)
S(u)||e.updateWith(new class extends ae{constructor(e,t,s){super(),this.tag=e,this.manager=t,this.modifier=s,this.type="update-modifier",this.lastUpdated=e.value()}evaluate(e){let t=this.manager,s=this.modifier,i=this.tag,n=this.lastUpdated
i.validate(n)||(e.env.scheduleUpdateModifier(s,t),this.lastUpdated=i.value())}}(u,s,o))})
ne.add(27,(e,{op1:t,op2:s,op3:i})=>{let n=e.constants.getString(t),r=e.constants.getString(s),a=i?e.constants.getString(i):null
e.elements().setStaticAttribute(n,r,a)}),ne.add(28,(e,{op1:t,op2:s,op3:i})=>{let n=e.constants.getString(t),r=e.stack.pop(),a=r.value(),l=i?e.constants.getString(i):null,o=e.elements().setDynamicAttribute(n,a,!!s,l)
k(r)||e.updateWith(new st(r,o))})
class st extends ae{constructor(e,t){super(),this.reference=e,this.attribute=t,this.type="patch-element",this.tag=e.tag,this.lastRevision=this.tag.value()}evaluate(e){let t=this.attribute,s=this.reference,i=this.tag
i.validate(this.lastRevision)||(this.lastRevision=i.value(),t.update(s.value(),e.env))}}function it(e,t,s){let i=e.lookupComponent(t,s)
return i}function nt(e){return rt(e)?"":String(e)}function rt(e){return null===e||void 0===e||"function"!=typeof e.toString}function at(e){return"object"==typeof e&&null!==e&&"function"==typeof e.toHTML}function lt(e){return"object"==typeof e&&null!==e&&"number"==typeof e.nodeType}function ot(e){return lt(e)&&11===e.nodeType}function ht(e){return"string"==typeof e}class ut{constructor(e){this.list=e,this.tag=E(e),this.list=e}value(){let e=[],t=this.list
for(let s=0;s<t.length;s++){let i=nt(t[s].value())
i&&e.push(i)}return 0===e.length?null:e.join(" ")}}function ct(e){return 0|(e.dynamicLayout?1:0)|(e.dynamicTag?2:0)|(e.prepareArgs?4:0)|(e.createArgs?8:0)|(e.attributeHook?16:0)|(e.elementHook?32:0)}function pt(e,t){return!!(e&t)}const dt=new class{constructor(){this.stack=null,this.positional=new je,this.named=new ze,this.blocks=new Ue}setup(e,t,s,i,n){this.stack=e
let r=this.named,a=t.length,l=e.sp-a+1
r.setup(e,l,a,t,n)
let o=l-i
this.positional.setup(e,o,i)
let h=this.blocks,u=s.length,c=o-3*u
h.setup(e,c,u,s)}get tag(){return E([this.positional,this.named])}get base(){return this.blocks.base}get length(){return this.positional.length+this.named.length+3*this.blocks.length}at(e){return this.positional.at(e)}realloc(e){if(e>0){let t=this.positional,s=this.named,i=this.stack,n=t.base+e
for(let e=t.length+s.length-1;e>=0;e--)i.copy(e+t.base,e+n)
t.base+=e,s.base+=e,i.sp+=e}}capture(){let e=0===this.positional.length?Ye:this.positional.capture(),t=0===this.named.length?Ge:this.named.capture()
return{tag:this.tag,length:this.length,positional:e,named:t}}clear(){let e=this.stack,t=this.length
e.pop(t)}}
ne.add(57,e=>{let t=e.stack,s=t.pop()
t.push(Je.create(s))}),ne.add(58,(e,{op1:t})=>{let s=e.stack,i=s.pop(),n=s.pop(),r=e.constants.getSerializable(t),a=e.constants.resolver
e.loadValue(le.v0,new class{constructor(e,t,s,i){this.inner=e,this.resolver=t,this.meta=s,this.args=i,this.tag=e.tag,this.lastValue=null,this.lastDefinition=null}value(){let e=this.inner,t=this.lastValue,s=e.value()
if(s===t)return this.lastDefinition
let i=null
return Ke(s)?i=s:"string"==typeof s&&s&&(i=it(this.resolver,s,this.meta)),i=this.curry(i),this.lastValue=s,this.lastDefinition=i,i}get(){return ce}curry(e){let t=this.args
return!t&&Ke(e)?e:e?new qe(e,t):null}}(i,a,r,n))}),ne.add(59,(e,{op1:t})=>{let s=e.constants.resolveHandle(t),i=s.manager,n={definition:s,manager:i,capabilities:ct(i.getCapabilities(s.state)),state:null,handle:null,table:null}
e.stack.push(n)}),ne.add(62,(t,{op1:s})=>{let i,n=t.stack,r=n.pop().value(),a=t.constants.getSerializable(s)
if(t.loadValue(le.t1,null),"string"==typeof r){i=it(t.constants.resolver,r,a)}else{if(!Ke(r))throw e()
i=r}n.push(i)}),ne.add(60,e=>{let t,s,i=e.stack,n=i.pop()
Ke(n)?s=t=null:t=ct((s=n.manager).getCapabilities(n.state)),i.push({definition:n,capabilities:t,manager:s,state:null,handle:null,table:null})}),ne.add(61,(t,{op1:s})=>{let i,n=t.stack,r=n.pop().value()
if(!Ke(r))throw e()
i=r,n.push(i)}),ne.add(63,(e,{op1:t,op2:s})=>{let i=e.stack,n=e.constants.getStringArray(t),r=s>>4,a=8&s,l=[]
4&s&&l.push("main"),2&s&&l.push("else"),1&s&&l.push("attrs"),dt.setup(i,n,l,r,!!a),i.push(dt)}),ne.add(66,e=>{let t=e.stack,s=t.pop().capture()
t.push(s)}),ne.add(65,(e,{op1:t})=>{let s=e.stack,i=e.fetchValue(t),n=s.pop(),r=i.definition
Ke(r)&&(r=function(e,t,s){let i=e.definition=t.unwrap(s),n=i.manager,r=i.state
return e.manager=n,e.capabilities=ct(n.getCapabilities(r)),i}(i,r,n))
var a=r
let l=a.manager,o=a.state
if(!0!==pt(i.capabilities,4))return void s.push(n)
let h=n.blocks.values,u=n.blocks.names,c=l.prepareArgs(o,n)
if(c){n.clear()
for(let n=0;n<h.length;n++)s.push(h[n])
let e=c.positional,t=c.named,i=e.length
for(let n=0;n<i;n++)s.push(e[n])
let r=Object.keys(t)
for(let n=0;n<r.length;n++)s.push(t[r[n]])
n.setup(s,r,u,i,!0)}s.push(n)}),ne.add(67,(e,{op1:t,op2:s})=>{let i=e.dynamicScope(),n=e.fetchValue(s),r=n.definition,a=n.manager,l=1&t,o=null
pt(n.capabilities=ct(a.getCapabilities(r.state)),8)&&(o=e.stack.peek())
let h=a.create(e.env,r.state,o,i,e.getSelf(),!!l)
n.state=h
let u=a.getTag(h)
S(u)||e.updateWith(new class extends ae{constructor(e,t,s,i){super(),this.tag=e,this.component=t,this.manager=s,this.dynamicScope=i,this.type="update-component"}evaluate(e){let t=this.component,s=this.manager,i=this.dynamicScope
s.update(t,i)}}(u,h,a,i))}),ne.add(68,(e,{op1:t})=>{var s=e.fetchValue(t)
let i=s.manager,n=s.state,r=i.getDestructor(n)
r&&e.newDestroyable(r)}),ne.add(75,e=>{e.beginCacheGroup(),e.elements().pushSimpleBlock()}),ne.add(69,e=>{e.loadValue(le.t0,new class{constructor(){this.attributes=a(),this.classes=[]}setAttribute(e,t,s,i){let n={value:t,namespace:i,trusting:s}
"class"===e&&this.classes.push(t),this.attributes[e]=n}flush(e){for(let t in this.attributes){let s=this.attributes[t],i=s.value,n=s.namespace,r=s.trusting
"class"===t&&(i=new ut(this.classes))
let a=e.elements().setDynamicAttribute(t,i.value(),r,n)
k(i)||e.updateWith(new st(i,a))}}})}),ne.add(29,(e,{op1:t,op2:s,op3:i})=>{let n=e.constants.getString(t),r=e.stack.pop(),a=i?e.constants.getString(i):null
e.fetchValue(le.t0).setAttribute(n,r,!!s,a)})
ne.add(77,(e,{op1:t})=>{var s=e.fetchValue(t)
let i=s.definition,n=s.state,r=i.manager,a=e.fetchValue(le.t0)
r.didCreateElement(n,e.elements().expectConstructing("DidCreateElementOpcode#evaluate"),a)}),ne.add(70,(e,{op1:t})=>{var s=e.fetchValue(t)
let i=s.definition,n=s.state,r=i.manager
e.stack.push(r.getSelf(n))}),ne.add(71,(e,{op1:t})=>{var s=e.fetchValue(t)
let i=s.definition,n=s.state,r=i.manager
e.stack.push(r.getTagName(n))}),ne.add(72,(t,{op1:s})=>{let i,n=t.fetchValue(s),r=n.manager,a=n.definition,l=t.constants.resolver,o=t.stack,h=n.state,u=n.capabilities,c=a.state
if(!1===pt(u,1))i=r.getLayout(c,l)
else{if(!function(e,t){return!0===pt(e,1)}(u))throw e()
i=r.getDynamicLayout(h,l)}o.push(i.symbolTable),o.push(i.handle)}),ne.add(56,(e,{op1:t})=>{let s=e.stack.pop(),i=e.stack.pop(),n=s.manager,r={definition:s,manager:n,capabilities:ct(n.getCapabilities(s.state)),state:null,handle:i.handle,table:i.symbolTable}
e.loadValue(t,r)}),ne.add(73,(e,{op1:t})=>{let s=e.stack,i=s.pop(),n=s.pop(),r=e.fetchValue(t)
r.handle=i,r.table=n}),ne.add(74,(e,{op1:t})=>{let s=e.stack
var i=e.fetchValue(t)
let n=i.handle
var r=i.table
let l=r.symbols,o=r.hasEval
{let t=s.pop(),i=e.pushRootScope(l.length+1,!0)
i.bindSelf(t)
let r=e.stack.pop(),h=null
o&&(h=a())
let u=r.named.atNames
for(let e=u.length-1;e>=0;e--){let t=u[e],s=l.indexOf(u[e]),n=r.named.get(t,!1);-1!==s&&i.bindSymbol(s+1,n),o&&(h[t]=n)}let c=(e,t)=>{let s=l.indexOf(e),n=p.get(t);-1!==s&&i.bindBlock(s+1,n),h&&(h[e]=n)},p=r.blocks
c(_e,"attrs"),c("&inverse","else"),c("&default","main"),h&&i.bindEvalScope(h),e.call(n)}}),ne.add(78,(e,{op1:t})=>{var s=e.fetchValue(t)
let i=s.manager,n=s.state,r=e.elements().popBlock()
i.didRenderLayout(n,r),e.env.didCreate(n,i),e.updateWith(new class extends ae{constructor(e,t,s){super(),this.manager=e,this.component=t,this.bounds=s,this.type="did-update-layout",this.tag=y}evaluate(e){let t=this.manager,s=this.component,i=this.bounds
t.didUpdateLayout(s,i),e.env.didUpdate(s,t)}}(i,n,r))}),ne.add(76,e=>{e.commitCacheGroup()})
let mt=function(e,t){console.info("Use `context`, and `get(<path>)` to debug this template."),t("this")}
ne.add(81,(e,{op1:t,op2:s})=>{let i=e.constants.getStringArray(t),n=e.constants.getArray(s),r=new class{constructor(e,t,s){this.scope=e,this.locals=a()
for(let i=0;i<s.length;i++){let n=s[i],r=t[n-1],a=e.getSymbol(n)
this.locals[r]=a}}get(e){let t=this.scope,s=this.locals,i=e.split(".")
var n=e.split(".")
let r,a=n[0],l=n.slice(1),o=t.getEvalScope()
return"this"===a?r=t.getSelf():s[a]?r=s[a]:0===a.indexOf("@")&&o[a]?r=o[a]:(r=this.scope.getSelf(),l=i),l.reduce((e,t)=>e.get(t),r)}}(e.scope(),i,n)
mt(e.getSelf().value(),e=>r.get(e).value())}),ne.add(79,(e,{op1:t,op2:s,op3:i})=>{let n=e.constants,r=e.constants.resolver,a=e.stack.pop().value(),l=n.getSerializable(t),o=n.getStringArray(s),h=n.getArray(i),u=r.lookupPartial(a,l)
var c=r.resolve(u).getPartial()
let p=c.symbolTable,d=c.handle
{let t=p.symbols,s=e.scope(),i=e.pushRootScope(t.length,!1),n=s.getEvalScope()
i.bindCallerScope(s.getCallerScope()),i.bindEvalScope(n),i.bindSelf(s.getSelf())
let r=Object.create(s.getPartialMap())
for(let e=0;e<h.length;e++){let t=h[e],i=o[t-1],n=s.getSymbol(t)
r[i]=n}if(n)for(let e=0;e<t.length;e++){let s=e+1,r=n[t[e]]
void 0!==r&&i.bind(s,r)}i.bindPartialMap(r),e.pushFrame(),e.call(d)}})
ne.add(54,e=>{let t=e.stack,s=t.pop(),i=t.pop(),n=new class{constructor(e){this.iterator=null
let t=new F(e)
this.artifacts=t}next(){let e=this.artifacts,t=(this.iterator=this.iterator||e.iterate()).next()
return null===t?null:e.append(t)}}(e.env.iterableFor(s,i.value()))
t.push(n),t.push(new class{constructor(e){this.tag=e.tag,this.artifacts=e}value(){return!this.artifacts.isEmpty()}}(n.artifacts))}),ne.add(52,(e,{op1:t})=>{e.enterList(t)}),ne.add(53,e=>{e.exitList()}),ne.add(55,(e,{op1:t})=>{let s=e.stack.peek().next()
if(s){let t=e.iterate(s.memo,s.value)
e.enterItem(s.key,t)}else e.goto(t)})
class ft{constructor(e,t){this.element=e,this.nextSibling=t}}class gt{constructor(e,t,s){this.parentNode=e,this.first=t,this.last=s}parentElement(){return this.parentNode}firstNode(){return this.first}lastNode(){return this.last}}class bt{constructor(e,t){this.parentNode=e,this.node=t}parentElement(){return this.parentNode}firstNode(){return this.node}lastNode(){return this.node}}function yt(e,t){return new bt(e,t)}function vt(e,t){let s=e.parentElement(),i=e.firstNode(),n=e.lastNode(),r=i
for(;r;){let e=r.nextSibling
if(s.insertBefore(r,t),r===n)return e
r=e}return null}function kt(e){let t=e.parentElement(),s=e.firstNode(),i=e.lastNode(),n=s
for(;n;){let e=n.nextSibling
if(t.removeChild(n),n===i)return e
n=e}return null}const St="http://www.w3.org/2000/svg"
function wt(e,t,s){if(!e)return t
if(!function(e,t){let s=e.createElementNS(t,"svg")
try{s.insertAdjacentHTML("beforeend","<circle></circle>")}catch(e){}finally{return 1!==s.childNodes.length||s.firstChild.namespaceURI!==St}}(e,s))return t
let i=e.createElement("div")
return class extends t{insertHTMLBefore(e,t,n){return null===n||""===n?super.insertHTMLBefore(e,t,n):e.namespaceURI!==s?super.insertHTMLBefore(e,t,n):function(e,t,s,i){let n="<svg>"+s+"</svg>"
t.innerHTML=n
var r=function(e,t,s){let i=e.firstChild,n=null,r=i
for(;r;)n=r,r=r.nextSibling,t.insertBefore(n,s)
return[i,n]}(t.firstChild,e,i)
let a=r[0],l=r[1]
return new gt(e,a,l)}(e,i,n,t)}}}function _t(e,t){return e&&function(e){let t=e.createElement("div")
if(t.innerHTML="first",t.insertAdjacentHTML("beforeend","second"),2===t.childNodes.length)return!1
return!0}(e)?class extends t{constructor(e){super(e),this.uselessComment=e.createComment("")}insertHTMLBefore(e,t,s){if(null===s)return super.insertHTMLBefore(e,t,s)
let i=!1,n=t?t.previousSibling:e.lastChild
n&&n instanceof Text&&(i=!0,e.insertBefore(this.uselessComment,t))
let r=super.insertHTMLBefore(e,t,s)
return i&&e.removeChild(this.uselessComment),r}}:t}const Et="http://www.w3.org/2000/svg",Ct={foreignObject:1,desc:1,title:1},xt=Object.create(null);["b","big","blockquote","body","br","center","code","dd","div","dl","dt","em","embed","h1","h2","h3","h4","h5","h6","head","hr","i","img","li","listing","main","meta","nobr","ol","p","pre","ruby","s","small","span","strong","strike","sub","sup","table","tt","u","ul","var"].forEach(e=>xt[e]=1)
let At="undefined"==typeof document?null:document
class Nt{constructor(e){this.document=e,this.setupUselessElement()}setupUselessElement(){this.uselessElement=this.document.createElement("div")}createElement(e,t){let s,i
if(t?(s=t.namespaceURI===Et||"svg"===e,i=Ct[t.tagName]):(s="svg"===e,i=!1),s&&!i){if(xt[e])throw new Error(`Cannot create a ${e} inside an SVG context`)
return this.document.createElementNS(Et,e)}return this.document.createElement(e)}insertBefore(e,t,s){e.insertBefore(t,s)}insertHTMLBefore(e,t,s){return function(e,t,s,i){let n,r=t,a=s,l=a?a.previousSibling:r.lastChild
if(null===i||""===i)return new gt(r,null,null)
null===a?(r.insertAdjacentHTML("beforeend",i),n=r.lastChild):a instanceof HTMLElement?(a.insertAdjacentHTML("beforebegin",i),n=a.previousSibling):(r.insertBefore(e,a),e.insertAdjacentHTML("beforebegin",i),n=e.previousSibling,r.removeChild(e))
let o=l?l.nextSibling:r.firstChild
return new gt(r,o,n)}(this.uselessElement,e,t,s)}createTextNode(e){return this.document.createTextNode(e)}createComment(e){return this.document.createComment(e)}}var Ot;(function(e){class t extends Nt{createElementNS(e,t){return this.document.createElementNS(e,t)}setAttribute(e,t,s,i=null){i?e.setAttributeNS(i,t,s):e.setAttribute(t,s)}}e.TreeConstruction=t
let s=t
s=_t(At,s),s=wt(At,s,Et),e.DOMTreeConstruction=s})(Ot||(Ot={}))
let Tt=class extends Nt{constructor(e){super(e),this.document=e,this.namespace=null}setAttribute(e,t,s){e.setAttribute(t,s)}removeAttribute(e,t){e.removeAttribute(t)}insertAfter(e,t,s){this.insertBefore(e,t,s.nextSibling)}}
Tt=_t(At,Tt)
var Lt=Tt=wt(At,Tt,Et)
const Bt=Ot.DOMTreeConstruction,Dt=["javascript:","vbscript:"],Rt=["A","BODY","LINK","IMG","IFRAME","BASE","FORM"],Mt=["EMBED"],It=["href","src","background","action"],Ft=["src"]
function Pt(e,t){return-1!==e.indexOf(t)}function jt(e,t){return(null===e||Pt(Rt,e))&&Pt(It,t)}function Vt(e,t){return null!==e&&(Pt(Mt,e)&&Pt(Ft,t))}function zt(e,t){return jt(e,t)||Vt(e,t)}function Ht(e,t,s,i){let n=null
if(null===i||void 0===i)return i
if(at(i))return i.toHTML()
n=t?t.tagName.toUpperCase():null
let r=nt(i)
if(jt(n,s)){let t=e.protocolForURL(r)
if(Pt(Dt,t))return`unsafe:${r}`}return Vt(n,s)?`unsafe:${r}`:r}function Ut(e,t){let s,i
if(t in e)i=t,s="prop"
else{let n=t.toLowerCase()
n in e?(s="prop",i=n):(s="attr",i=t)}return"prop"!==s||"style"!==i.toLowerCase()&&!function(e,t){let s=$t[e.toUpperCase()]
return s&&s[t.toLowerCase()]||!1}(e.tagName,i)||(s="attr"),{normalized:i,type:s}}const $t={INPUT:{form:!0,autocorrect:!0,list:!0},SELECT:{form:!0},OPTION:{form:!0},TEXTAREA:{form:!0},LABEL:{form:!0},FIELDSET:{form:!0},LEGEND:{form:!0},OBJECT:{form:!0}}
function Gt(e,t){let s=e.tagName
if(e.namespaceURI===Et)return Yt(s,t)
var i=Ut(e,t)
let n=i.type,r=i.normalized
return"attr"===n?Yt(s,r):function(e,t){if(zt(e,t))return qt
if(function(e,t){return("INPUT"===e||"TEXTAREA"===e)&&"value"===t}(e,t))return Zt
if(function(e,t){return"OPTION"===e&&"selected"===t}(e,t))return Qt
return Kt}(s,r)}function Yt(e,t){return zt(e,t)?Jt:Wt}class Xt{constructor(e){this.attribute=e}}class Wt extends Xt{set(e,t,s){let i=es(t)
if(null!==i){var n=this.attribute
let t=n.name,s=n.namespace
e.__setAttribute(t,i,s)}}update(e,t){let s=es(e)
var i=this.attribute
let n=i.element,r=i.name
null===s?n.removeAttribute(r):n.setAttribute(r,s)}}class Kt extends Xt{set(e,t,s){if(null!==t&&void 0!==t){let s=this.attribute.name
this.value=t,e.__setProperty(s,t)}}update(e,t){var s=this.attribute
let i=s.element,n=s.name
this.value!==e&&(i[n]=this.value=e,null!==e&&void 0!==e||this.removeAttribute())}removeAttribute(){var e=this.attribute
let t=e.element,s=e.name,i=e.namespace
i?t.removeAttributeNS(i,s):t.removeAttribute(s)}}class qt extends Kt{set(e,t,s){var i=this.attribute
let n=Ht(s,i.element,i.name,t)
super.set(e,n,s)}update(e,t){var s=this.attribute
let i=Ht(t,s.element,s.name,e)
super.update(i,t)}}class Jt extends Wt{set(e,t,s){var i=this.attribute
let n=Ht(s,i.element,i.name,t)
super.set(e,n,s)}update(e,t){var s=this.attribute
let i=Ht(t,s.element,s.name,e)
super.update(i,t)}}class Zt extends Kt{set(e,t){e.__setProperty("value",nt(t))}update(e){let t=this.attribute.element,s=t.value,i=nt(e)
s!==i&&(t.value=i)}}class Qt extends Kt{set(e,t){null!==t&&void 0!==t&&!1!==t&&e.__setProperty("selected",!0)}update(e){let t=this.attribute.element
t.selected=!!e}}function es(e){return!1===e||void 0===e||null===e||void 0===e.toString?null:!0===e?"":"function"==typeof e?null:String(e)}class ts{constructor(e,t,s,i){this.slots=e,this.callerScope=t,this.evalScope=s,this.partialMap=i}static root(e,t=0){let s=new Array(t+1)
for(let i=0;i<=t;i++)s[i]=ce
return new ts(s,null,null,null).init({self:e})}static sized(e=0){let t=new Array(e+1)
for(let s=0;s<=e;s++)t[s]=ce
return new ts(t,null,null,null)}init({self:e}){return this.slots[0]=e,this}getSelf(){return this.get(0)}getSymbol(e){return this.get(e)}getBlock(e){return this.get(e)}getEvalScope(){return this.evalScope}getPartialMap(){return this.partialMap}bind(e,t){this.set(e,t)}bindSelf(e){this.set(0,e)}bindSymbol(e,t){this.set(e,t)}bindBlock(e,t){this.set(e,t)}bindEvalScope(e){this.evalScope=e}bindPartialMap(e){this.partialMap=e}bindCallerScope(e){this.callerScope=e}getCallerScope(){return this.callerScope}child(){return new ts(this.slots.slice(),this.callerScope,this.evalScope,this.partialMap)}get(e){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
return this.slots[e]}set(e,t){if(e>=this.slots.length)throw new RangeError(`BUG: cannot get $${e} from scope; length=${this.slots.length}`)
this.slots[e]=t}}class ss{constructor(){this.scheduledInstallManagers=[],this.scheduledInstallModifiers=[],this.scheduledUpdateModifierManagers=[],this.scheduledUpdateModifiers=[],this.createdComponents=[],this.createdManagers=[],this.updatedComponents=[],this.updatedManagers=[],this.destructors=[]}didCreate(e,t){this.createdComponents.push(e),this.createdManagers.push(t)}didUpdate(e,t){this.updatedComponents.push(e),this.updatedManagers.push(t)}scheduleInstallModifier(e,t){this.scheduledInstallManagers.push(t),this.scheduledInstallModifiers.push(e)}scheduleUpdateModifier(e,t){this.scheduledUpdateModifierManagers.push(t),this.scheduledUpdateModifiers.push(e)}didDestroy(e){this.destructors.push(e)}commit(){let e=this.createdComponents,t=this.createdManagers
for(let h=0;h<e.length;h++){let s=e[h]
t[h].didCreate(s)}let s=this.updatedComponents,i=this.updatedManagers
for(let h=0;h<s.length;h++){let e=s[h]
i[h].didUpdate(e)}let n=this.destructors
for(let h=0;h<n.length;h++)n[h].destroy()
let r=this.scheduledInstallManagers,a=this.scheduledInstallModifiers
for(let h=0;h<r.length;h++){let e=r[h],t=a[h]
e.install(t)}let l=this.scheduledUpdateModifierManagers,o=this.scheduledUpdateModifiers
for(let h=0;h<l.length;h++){let e=l[h],t=o[h]
e.update(t)}}}class is{constructor({appendOperations:e,updateOperations:t}){this._transaction=null,this.appendOperations=e,this.updateOperations=t}toConditionalReference(e){return new fe(e)}getAppendOperations(){return this.appendOperations}getDOM(){return this.updateOperations}getIdentity(e){return function(e){return e._guid||r(e)}(e)+""}begin(){this._transaction=new ss}get transaction(){return this._transaction}didCreate(e,t){this.transaction.didCreate(e,t)}didUpdate(e,t){this.transaction.didUpdate(e,t)}scheduleInstallModifier(e,t){this.transaction.scheduleInstallModifier(e,t)}scheduleUpdateModifier(e,t){this.transaction.scheduleUpdateModifier(e,t)}didDestroy(e){this.transaction.didDestroy(e)}commit(){let e=this.transaction
this._transaction=null,e.commit()}attributeFor(e,t,s,i=null){return Gt(e,t)}}class ns{constructor(e,t,s,i,n=-1,r=-1){this.stack=e,this.heap=t,this.program=s,this.externs=i,this.pc=n,this.ra=r,this.currentOpSize=0}pushFrame(){this.stack.pushSmi(this.ra),this.stack.pushSmi(this.stack.fp),this.stack.fp=this.stack.sp-1}popFrame(){this.stack.sp=this.stack.fp-1,this.ra=this.stack.getSmi(0),this.stack.fp=this.stack.getSmi(1)}goto(e){let t=this.pc+e-this.currentOpSize
this.pc=t}call(e){this.ra=this.pc,this.pc=this.heap.getaddr(e)}returnTo(e){let t=this.pc+e-this.currentOpSize
this.ra=t}return(){this.pc=this.ra}nextStatement(){let e=this.pc,t=this.program
if(-1===e)return null
let s=this.program.opcode(e).size,i=this.currentOpSize=s
return this.pc+=i,t.opcode(e)}evaluateOuter(e,t){this.evaluateInner(e,t)}evaluateInner(e,t){e.isMachine?this.evaluateMachine(e):this.evaluateSyscall(e,t)}evaluateMachine(e){switch(e.type){case 47:return this.pushFrame()
case 48:return this.popFrame()
case 42:return this.call(e.op1)
case 41:return this.call(this.stack.popSmi())
case 44:return this.goto(e.op1)
case 20:return this.return()
case 21:return this.returnTo(e.op1)}}evaluateSyscall(e,t){ne.evaluate(t,e,e.type)}}class rs{constructor(e){this.trusting=e}retry(e,t){let s=this.bounds,i=s.parentElement(),n=kt(s),r=ds.forInitialRender(e,{element:i,nextSibling:n})
return this.trusting?r.__appendTrustingDynamicContent(t):r.__appendCautiousDynamicContent(t)}}class as{constructor(e){this.inner=e,this.bounds=e.bounds}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}update(e,t){let s=this.inner=this.inner.update(e,t)
return this.bounds=s.bounds,this}}class ls extends rs{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s,i=this.lastValue
if(t===i)return this
if(lt(t)||at(t))return this.retry(e,t)
if((s=rt(t)?"":ht(t)?t:String(t))!==i){this.bounds.firstNode().nodeValue=this.lastValue=s}return this}}class os extends rs{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){return t===this.lastValue?this:this.retry(e,t)}}class hs extends rs{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s=this.lastValue
return t===s?this:at(t)&&t.toHTML()===s.toHTML()?(this.lastValue=t,this):this.retry(e,t)}}class us extends rs{constructor(e,t,s){super(s),this.bounds=e,this.lastValue=t}update(e,t){let s=this.lastValue
return t===s?this:function(e){return rt(e)?"":ht(e)?e:at(e)?e.toHTML():lt(e)?e:String(e)}(t)===s?this:this.retry(e,t)}}class cs{constructor(e){this.node=e}firstNode(){return this.node}}class ps{constructor(e){this.node=e}lastNode(){return this.node}}class ds{constructor(e,t,s){this.constructing=null,this.operations=null,this.cursorStack=new l,this.blockStack=new l,this.pushElement(t,s),this.env=e,this.dom=e.getAppendOperations(),this.updateOperations=e.getDOM()}static forInitialRender(e,t){let s=new this(e,t.element,t.nextSibling)
return s.pushSimpleBlock(),s}static resume(e,t,s){let i=new this(e,t.parentElement(),s)
return i.pushSimpleBlock(),i.pushBlockTracker(t),i}get element(){return this.cursorStack.current.element}get nextSibling(){return this.cursorStack.current.nextSibling}expectConstructing(e){return this.constructing}block(){return this.blockStack.current}popElement(){this.cursorStack.pop(),this.cursorStack.current}pushSimpleBlock(){return this.pushBlockTracker(new ms(this.element))}pushUpdatableBlock(){return this.pushBlockTracker(new gs(this.element))}pushBlockList(e){return this.pushBlockTracker(new bs(this.element,e))}pushBlockTracker(e,t=!1){let s=this.blockStack.current
return null!==s&&(s.newDestroyable(e),t||s.didAppendBounds(e)),this.__openBlock(),this.blockStack.push(e),e}popBlock(){return this.block().finalize(this),this.__closeBlock(),this.blockStack.pop()}__openBlock(){}__closeBlock(){}openElement(e){let t=this.__openElement(e)
return this.constructing=t,t}__openElement(e){return this.dom.createElement(e,this.element)}flushElement(){let e=this.element,t=this.constructing
this.__flushElement(e,t),this.constructing=null,this.operations=null,this.pushElement(t,null),this.didOpenElement(t)}__flushElement(e,t){this.dom.insertBefore(e,t,this.nextSibling)}closeElement(){this.willCloseElement(),this.popElement()}pushRemoteElement(e,t,s=null){this.__pushRemoteElement(e,t,s)}__pushRemoteElement(e,t,s){this.pushElement(e,s)
let i=new fs(e)
this.pushBlockTracker(i,!0)}popRemoteElement(){this.popBlock(),this.popElement()}pushElement(e,t){this.cursorStack.push(new ft(e,t))}didAddDestroyable(e){this.block().newDestroyable(e)}didAppendBounds(e){return this.block().didAppendBounds(e),e}didAppendNode(e){return this.block().didAppendNode(e),e}didOpenElement(e){return this.block().openElement(e),e}willCloseElement(){this.block().closeElement()}appendText(e){return this.didAppendNode(this.__appendText(e))}__appendText(e){let t=this.dom,s=this.element,i=this.nextSibling,n=t.createTextNode(e)
return t.insertBefore(s,n,i),n}__appendNode(e){return this.dom.insertBefore(this.element,e,this.nextSibling),e}__appendFragment(e){let t=e.firstChild
if(t){let s=function(e,t,s){return new gt(e,t,s)}(this.element,t,e.lastChild)
return this.dom.insertBefore(this.element,e,this.nextSibling),s}return yt(this.element,this.__appendComment(""))}__appendHTML(e){return this.dom.insertHTMLBefore(this.element,this.nextSibling,e)}appendTrustingDynamicContent(e){let t=new as(this.__appendTrustingDynamicContent(e))
return this.didAppendBounds(t),t}__appendTrustingDynamicContent(e){if(ht(e))return this.trustedContent(e)
if(rt(e))return this.trustedContent("")
if(at(e))return this.trustedContent(e.toHTML())
if(ot(e)){let t=this.__appendFragment(e)
return new os(t,e,!0)}if(lt(e)){let t=this.__appendNode(e)
return new os(yt(this.element,t),t,!0)}return this.trustedContent(String(e))}appendCautiousDynamicContent(e){let t=new as(this.__appendCautiousDynamicContent(e))
return this.didAppendBounds(t.bounds),t}__appendCautiousDynamicContent(e){if(ht(e))return this.untrustedContent(e)
if(rt(e))return this.untrustedContent("")
if(ot(e)){let t=this.__appendFragment(e)
return new os(t,e,!1)}if(lt(e)){let t=this.__appendNode(e)
return new os(yt(this.element,t),t,!1)}if(at(e)){let t=e.toHTML(),s=this.__appendHTML(t)
return new hs(s,e,!1)}return this.untrustedContent(String(e))}trustedContent(e){let t=this.__appendHTML(e)
return new us(t,e,!0)}untrustedContent(e){let t=this.__appendText(e),s=yt(this.element,t)
return new ls(s,e,!1)}appendComment(e){return this.didAppendNode(this.__appendComment(e))}__appendComment(e){let t=this.dom,s=this.element,i=this.nextSibling,n=t.createComment(e)
return t.insertBefore(s,n,i),n}__setAttribute(e,t,s){this.dom.setAttribute(this.constructing,e,t,s)}__setProperty(e,t){this.constructing[e]=t}setStaticAttribute(e,t,s){this.__setAttribute(e,t,s)}setDynamicAttribute(e,t,s,i){let n=this.constructing,r=new(this.env.attributeFor(n,e,s,i))({element:n,name:e,namespace:i||null})
return r.set(this,t,this.env),r}}class ms{constructor(e){this.parent=e,this.first=null,this.last=null,this.destroyables=null,this.nesting=0}destroy(){let e=this.destroyables
if(e&&e.length)for(let t=0;t<e.length;t++)e[t].destroy()}parentElement(){return this.parent}firstNode(){return this.first&&this.first.firstNode()}lastNode(){return this.last&&this.last.lastNode()}openElement(e){this.didAppendNode(e),this.nesting++}closeElement(){this.nesting--}didAppendNode(e){0===this.nesting&&(this.first||(this.first=new cs(e)),this.last=new ps(e))}didAppendBounds(e){0===this.nesting&&(this.first||(this.first=e),this.last=e)}newDestroyable(e){this.destroyables=this.destroyables||[],this.destroyables.push(e)}finalize(e){this.first||e.appendComment("")}}class fs extends ms{destroy(){super.destroy(),kt(this)}}class gs extends ms{reset(e){let t=this.destroyables
if(t&&t.length)for(let i=0;i<t.length;i++)e.didDestroy(t[i])
let s=kt(this)
return this.first=null,this.last=null,this.destroyables=null,this.nesting=0,s}}class bs{constructor(e,t){this.parent=e,this.boundList=t,this.parent=e,this.boundList=t}destroy(){this.boundList.forEachNode(e=>e.destroy())}parentElement(){return this.parent}firstNode(){let e=this.boundList.head()
return e&&e.firstNode()}lastNode(){let e=this.boundList.tail()
return e&&e.lastNode()}openElement(e){}closeElement(){}didAppendNode(e){}didAppendBounds(e){}newDestroyable(e){}finalize(e){}}class ys{constructor(e=[]){this.vec=e}clone(){return new ys(this.vec.slice())}sliceFrom(e){return new ys(this.vec.slice(e))}slice(e,t){return new ys(this.vec.slice(e,t))}copy(e,t){this.vec[t]=this.vec[e]}writeRaw(e,t){this.vec[e]=t}writeSmi(e,t){var s
this.vec[e]=(s=t)<0?Math.abs(s)<<3|4:s<<3|0}getRaw(e){return this.vec[e]}getSmi(e){return function(e){switch(7&e){case 0:return e>>3
case 4:return-(e>>3)
default:throw new Error("unreachable")}}(this.vec[e])}reset(){this.vec.length=0}len(){return this.vec.length}}const vs=2147483648,ks=2147483647
class Ss{constructor(e=new ys,t=[]){this.inner=e,this.js=t}slice(e,t){let s
return s="number"==typeof e&&"number"==typeof t?this.inner.slice(e,t):"number"==typeof e&&void 0===t?this.inner.sliceFrom(e):this.inner.clone(),new Ss(s,this.js.slice(e,t))}sliceInner(e,t){let s=[]
for(let i=e;i<t;i++)s.push(this.get(i))
return s}copy(e,t){this.inner.copy(e,t)}write(e,t){if(function(e){let t=typeof e
if(null===e||void 0===e)return!0
switch(t){case"boolean":case"undefined":return!0
case"number":if(e%1!=0)return!1
let s=Math.abs(e)
return!(s&vs)
default:return!1}}(t))this.inner.writeRaw(e,_s(t))
else{let s=this.js.length
this.js.push(t),this.inner.writeRaw(e,s|vs)}}writeSmi(e,t){this.inner.writeSmi(e,t)}writeImmediate(e,t){this.inner.writeRaw(e,t)}get(t){let s=this.inner.getRaw(t)
return s&vs?this.js[s&ks]:function(t){switch(t){case 3:return!1
case 11:return!0
case 19:return null
case 27:return
default:return function(t){switch(7&t){case 0:return t>>3
case 4:return-(t>>3)
default:throw e()}}(t)}}(s)}getSmi(e){return this.inner.getSmi(e)}reset(){this.inner.reset()}get length(){return this.inner.len()}}class ws{constructor(e,t,s){this.stack=e,this.fp=t,this.sp=s}static empty(){return new this(new Ss,0,-1)}static restore(e){let t=new Ss
for(let s=0;s<e.length;s++)t.write(s,e[s])
return new this(t,0,e.length-1)}push(e){this.stack.write(++this.sp,e)}pushSmi(e){this.stack.writeSmi(++this.sp,e)}pushImmediate(e){this.stack.writeImmediate(++this.sp,_s(e))}pushEncodedImmediate(e){this.stack.writeImmediate(++this.sp,e)}pushNull(){this.stack.writeImmediate(++this.sp,19)}dup(e=this.sp){this.stack.copy(e,++this.sp)}copy(e,t){this.stack.copy(e,t)}pop(e=1){let t=this.stack.get(this.sp)
return this.sp-=e,t}popSmi(){return this.stack.getSmi(this.sp--)}peek(e=0){return this.stack.get(this.sp-e)}peekSmi(e=0){return this.stack.getSmi(this.sp-e)}get(e,t=this.fp){return this.stack.get(t+e)}getSmi(e,t=this.fp){return this.stack.getSmi(t+e)}set(e,t,s=this.fp){this.stack.write(s+t,e)}slice(e,t){return this.stack.slice(e,t)}sliceArray(e,t){return this.stack.sliceInner(e,t)}capture(e){let t=this.sp+1,s=t-e
return this.stack.sliceInner(s,t)}reset(){this.stack.reset()}toArray(){return this.stack.sliceInner(this.fp,this.sp+1)}}function _s(t){switch(typeof t){case"number":return function(e){return e<0?Math.abs(e)<<3|4:e<<3|0}(t)
case"boolean":return t?11:3
case"object":return 19
case"undefined":return 27
default:throw e()}}class Es{constructor(e,t,{alwaysRevalidate:s=!1}){this.frameStack=new l,this.env=e,this.constants=t.constants,this.dom=e.getDOM(),this.alwaysRevalidate=s}execute(e,t){let s=this.frameStack
for(this.try(e,t);!s.isEmpty();){let e=this.frame.nextStatement()
null!==e?e.evaluate(this):this.frameStack.pop()}}get frame(){return this.frameStack.current}goto(e){this.frame.goto(e)}try(e,t){this.frameStack.push(new Os(e,t))}throw(){this.frame.handleException(),this.frameStack.pop()}}class Cs extends ae{constructor(e,t,s,i){super(),this.start=e,this.state=t,this.type="block",this.next=null,this.prev=null,this.children=i,this.bounds=s}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}evaluate(e){e.try(this.children,null)}destroy(){this.bounds.destroy()}didDestroy(){this.state.env.didDestroy(this.bounds)}}class xs extends Cs{constructor(e,t,s,i){super(e,t,s,i),this.type="try",this.tag=this._tag=L.create(y)}didInitializeChildren(){this._tag.inner.update(C(this.children))}evaluate(e){e.try(this.children,this)}handleException(){let e=this.state,t=this.bounds,s=this.children,i=this.start,n=this.prev,r=this.next
s.clear()
let a=ds.resume(e.env,t,t.reset(e.env)),l=Ls.resume(e,a),o=new h
l.execute(i,t=>{t.stack=ws.restore(e.stack),t.updatingOpcodeStack.push(o),t.updateWith(this),t.updatingOpcodeStack.push(s)}),this.prev=n,this.next=r}}class As{constructor(e,t){this.opcode=e,this.marker=t,this.didInsert=!1,this.didDelete=!1,this.map=e.map,this.updating=e.children}insert(e,t,s,i){let n=this.map,r=this.opcode,a=this.updating,l=null,o=null
l=i?(o=n[i]).bounds.firstNode():this.marker
let u=r.vmForInsertion(l),c=null,p=r.start
u.execute(p,i=>{n[e]=c=i.iterate(s,t),i.updatingOpcodeStack.push(new h),i.updateWith(c),i.updatingOpcodeStack.push(c.children)}),a.insertBefore(c,o),this.didInsert=!0}retain(e,t,s){}move(e,t,s,i){let n=this.map,r=this.updating,a=n[e],l=n[i]||null
vt(a,i?l.firstNode():this.marker),r.remove(a),r.insertBefore(a,l)}delete(e){let t=this.map,s=t[e]
s.didDestroy(),kt(s),this.updating.remove(s),delete t[e],this.didDelete=!0}done(){this.opcode.didInitializeChildren(this.didInsert||this.didDelete)}}class Ns extends Cs{constructor(e,t,s,i,n){super(e,t,s,i),this.type="list-block",this.map=a(),this.lastIterated=p,this.artifacts=n
let r=this._tag=L.create(y)
this.tag=x([n.tag,r])}didInitializeChildren(e=!0){this.lastIterated=this.artifacts.tag.value(),e&&this._tag.inner.update(C(this.children))}evaluate(e){let t=this.artifacts,s=this.lastIterated
if(!t.tag.validate(s)){let s=this.bounds,i=e.dom,n=i.createComment("")
i.insertAfter(s.parentElement(),n,s.lastNode())
let r=new As(this,n)
new j({target:r,artifacts:t}).sync(),this.parentElement().removeChild(n)}super.evaluate(e)}vmForInsertion(e){let t=this.bounds,s=this.state,i=ds.forInitialRender(s.env,{element:t.parentElement(),nextSibling:e})
return Ls.resume(s,i)}}class Os{constructor(e,t){this.ops=e,this.exceptionHandler=t,this.current=e.head()}goto(e){this.current=e}nextStatement(){let e=this.current,t=this.ops
return e&&(this.current=t.nextNode(e)),e}handleException(){this.exceptionHandler&&this.exceptionHandler.handleException()}}class Ts{constructor(e,t,s,i){this.env=e,this.program=t,this.updating=s,this.bounds=i}rerender({alwaysRevalidate:e=!1}={alwaysRevalidate:!1}){let t=this.env,s=this.program,i=this.updating
new Es(t,s,{alwaysRevalidate:e}).execute(i,this)}parentElement(){return this.bounds.parentElement()}firstNode(){return this.bounds.firstNode()}lastNode(){return this.bounds.lastNode()}handleException(){throw"this should never happen"}destroy(){this.bounds.destroy(),kt(this.bounds)}}class Ls{constructor(e,t,s,i,n){this.program=e,this.env=t,this.elementStack=n,this.dynamicScopeStack=new l,this.scopeStack=new l,this.updatingOpcodeStack=new l,this.cacheGroups=new l,this.listBlockStack=new l,this.s0=null,this.s1=null,this.t0=null,this.t1=null,this.v0=null,this.env=t,this.heap=e.heap,this.constants=e.constants,this.elementStack=n,this.scopeStack.push(s),this.dynamicScopeStack.push(i),this.inner=new ns(ws.empty(),this.heap,e,{debugBefore:e=>ne.debugBefore(this,e,e.type),debugAfter:(e,t)=>{ne.debugAfter(this,e,e.type,t)}})}get stack(){return this.inner.stack}set stack(e){this.inner.stack=e}set currentOpSize(e){this.inner.currentOpSize=e}get currentOpSize(){return this.inner.currentOpSize}get pc(){return this.inner.pc}set pc(e){this.inner.pc=e}get ra(){return this.inner.ra}set ra(e){this.inner.ra=e}get fp(){return this.stack.fp}set fp(e){this.stack.fp=e}get sp(){return this.stack.sp}set sp(e){this.stack.sp=e}fetch(e){this.stack.push(this[le[e]])}load(e){this[le[e]]=this.stack.pop()}fetchValue(e){return this[le[e]]}loadValue(e,t){this[le[e]]=t}pushFrame(){this.inner.pushFrame()}popFrame(){this.inner.popFrame()}goto(e){this.inner.goto(e)}call(e){this.inner.call(e)}returnTo(e){this.inner.returnTo(e)}return(){this.inner.return()}static initial(e,t,s,i,n,r,a){let l=e.heap.scopesizeof(a),o=ts.root(s,l),u=new Ls(e,t,o,n,r)
return u.pc=u.heap.getaddr(a),u.updatingOpcodeStack.push(new h),u}static empty(e,t,s){let i={get:()=>ce,set:()=>ce,child:()=>i},n=new Ls(e,t,ts.root(ce,0),i,s)
return n.updatingOpcodeStack.push(new h),n}static resume({program:e,env:t,scope:s,dynamicScope:i},n){return new Ls(e,t,s,i,n)}capture(e){return{env:this.env,program:this.program,dynamicScope:this.dynamicScope(),scope:this.scope(),stack:this.stack.capture(e)}}beginCacheGroup(){this.cacheGroups.push(this.updating().tail())}commitCacheGroup(){let e=new tt("END"),t=this.updating(),s=this.cacheGroups.pop(),i=s?t.nextNode(s):t.head(),n=t.tail(),r=C(new u(i,n)),a=new Qe(r,e)
t.insertBefore(a,i),t.append(new et(a)),t.append(e)}enter(e){let t=new h,s=this.capture(e),i=this.elements().pushUpdatableBlock(),n=new xs(this.heap.gethandle(this.pc),s,i,t)
this.didEnter(n)}iterate(e,t){let s=this.stack
s.push(t),s.push(e)
let i=this.capture(2),n=this.elements().pushUpdatableBlock()
return new xs(this.heap.gethandle(this.pc),i,n,new h)}enterItem(e,t){this.listBlock().map[e]=t,this.didEnter(t)}enterList(e){let t=new h,s=this.capture(0),i=this.elements().pushBlockList(t),n=this.stack.peek().artifacts,r=this.pc+e-this.currentOpSize,a=this.heap.gethandle(r),l=new Ns(a,s,i,t,n)
this.listBlockStack.push(l),this.didEnter(l)}didEnter(e){this.updateWith(e),this.updatingOpcodeStack.push(e.children)}exit(){this.elements().popBlock(),this.updatingOpcodeStack.pop(),this.updating().tail().didInitializeChildren()}exitList(){this.exit(),this.listBlockStack.pop()}updateWith(e){this.updating().append(e)}listBlock(){return this.listBlockStack.current}updating(){return this.updatingOpcodeStack.current}elements(){return this.elementStack}scope(){return this.scopeStack.current}dynamicScope(){return this.dynamicScopeStack.current}pushChildScope(){this.scopeStack.push(this.scope().child())}pushDynamicScope(){let e=this.dynamicScope().child()
return this.dynamicScopeStack.push(e),e}pushRootScope(e,t){let s=ts.sized(e)
return t&&s.bindCallerScope(this.scope()),this.scopeStack.push(s),s}pushScope(e){this.scopeStack.push(e)}popScope(){this.scopeStack.pop()}popDynamicScope(){this.dynamicScopeStack.pop()}newDestroyable(e){this.elements().didAddDestroyable(e)}getSelf(){return this.scope().getSelf()}referenceForSymbol(e){return this.scope().getSymbol(e)}execute(e,t){let s
for(this.pc=this.heap.getaddr(e),t&&t(this);!(s=this.next()).done;);return s.value}next(){let e,t=this.env,s=this.program,i=this.updatingOpcodeStack,n=this.elementStack,r=this.inner.nextStatement()
return null!==r?(this.inner.evaluateOuter(r,this),e={done:!1,value:null}):(this.stack.reset(),e={done:!0,value:new Ts(t,s,i.pop(),n.popBlock())}),e}bindDynamicScope(e){let t=this.dynamicScope()
for(let s=e.length-1;s>=0;s--){let i=this.constants.getString(e[s])
t.set(i,this.stack.pop())}}}class Bs{constructor(e){this.vm=e}next(){return this.vm.next()}}let Ds=0
class Rs{constructor(e,t){this.options=e,this.parsedLayout=t,this.layout=null,this.partial=null
let s=t.block
this.symbols=s.symbols,this.hasEval=s.hasEval,this.statements=s.statements,this.referrer=t.referrer,this.id=t.id||`client-${Ds++}`}renderLayout(e){let t=e.env,s=e.self,i=e.dynamicScope
var n=e.args
let r=void 0===n?Xe:n,a=e.builder,l=this.asLayout().compile(),o=Ls.initial(this.options.program,t,s,r,i,a,l)
return new Bs(o)}asLayout(){return this.layout?this.layout:this.layout=Ms(this.parsedLayout,this.options,!1)}asPartial(){return this.partial?this.partial:this.partial=Ms(this.parsedLayout,this.options,!0)}}function Ms(e,t,s){let n=e.block,r=e.referrer,a=n.hasEval,l=n.symbols,o=i({},t,{asPartial:s,referrer:r})
return new Be(n.statements,e,o,{referrer:r,hasEval:a,symbols:l})}class Is{get(e){return js.create(this,e)}}class Fs extends Is{constructor(){super(...arguments),this._lastRevision=null,this._lastValue=null}value(){let e=this.tag,t=this._lastRevision,s=this._lastValue
return t&&e.validate(t)||(s=this._lastValue=this.compute(),this._lastRevision=e.value()),s}}class Ps extends M{constructor(){super(...arguments),this.children=a()}get(e){let t=this.children[e]
return t||(t=this.children[e]=new Vs(this.inner,e)),t}}class js extends Fs{static create(e,t){return k(e)?new Vs(e.value(),t):new zs(e,t)}get(e){return new zs(this,e)}}class Vs extends js{constructor(e,t){super(),this._parentValue=e,this._propertyKey=t,this.tag=W(e,t)}compute(){return this._parentValue[this._propertyKey]}}class zs extends js{constructor(e,t){super()
let s=e.tag,i=L.create(y)
this._parentReference=e,this._parentObjectTag=i,this._propertyKey=t,this.tag=x([s,i])}compute(){let e=this._parentReference,t=this._parentObjectTag,s=this._propertyKey,i=e.value()
return t.inner.update(W(i,s)),"string"==typeof i&&"length"===s?i.length:"object"==typeof i&&i?i[s]:void 0}}class Hs extends Is{constructor(e){super(),this.tag=_.create(),this._value=e}value(){return this._value}update(e){e!==this._value&&(this.tag.inner.dirty(),this._value=e)}}class Us{constructor(e,t,s){let i=e.ComponentClass,n=e.name
this.args=t
let r={debugName:n,args:this.namedArgsSnapshot()}
se(r,s),i&&(this.component=i.create(r))}get tag(){return this.args.tag}namedArgsSnapshot(){return Object.freeze(this.args.named.value())}}const $s=new Ps(null)
class Gs{static create(e){return new Gs(e)}constructor(e){this.env=e.env}prepareArgs(e,t){return null}getCapabilities(e){return e.capabilities}getLayout({name:e,handle:t,symbolTable:s},i){return t&&s?{handle:t,symbolTable:s}:i.compileTemplate(e,t)}create(e,t,s,i,n,r){if(t.ComponentClass){let e=te(this.env)
return new Us(t,s.capture(),e)}}getSelf(e){return e?new Ps(e.component):$s}didCreateElement(e,t){}didRenderLayout(e,t){e&&(e.component.bounds=new ie(t))}didCreate(e){e&&e.component.didInsertElement()}getTag(e){return e?e.tag:y}update(e,t){e&&(e.component.args=e.namedArgsSnapshot())}didUpdateLayout(){}didUpdate(e){e&&e.component.didUpdate()}getDestructor(e){return e?e.component:Ys}}const Ys={destroy(){}}
class Xs{constructor(e,t){this._registry=e,this._resolver=t}register(e,t,s){let i=this._toAbsoluteSpecifier(e)
this._registry.register(i,t,s)}registration(e){let t=this._toAbsoluteSpecifier(e)
return this._registry.registration(t)}unregister(e){let t=this._toAbsoluteSpecifier(e)
this._registry.unregister(t)}registerOption(e,t,s){let i=this._toAbsoluteOrTypeSpecifier(e)
this._registry.registerOption(i,t,s)}registeredOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOption(s,t)}registeredOptions(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredOptions(t)}unregisterOption(e,t){let s=this._toAbsoluteOrTypeSpecifier(e)
this._registry.unregisterOption(s,t)}registerInjection(e,t,s){let i=this._toAbsoluteOrTypeSpecifier(e),n=this._toAbsoluteSpecifier(s)
this._registry.registerInjection(i,t,n)}registeredInjections(e){let t=this._toAbsoluteOrTypeSpecifier(e)
return this._registry.registeredInjections(t)}_toAbsoluteSpecifier(e,t){return this._resolver.identify(e,t)}_toAbsoluteOrTypeSpecifier(e){return function(e){return-1===e.indexOf(":")}(e)?e:this._toAbsoluteSpecifier(e)}}class Ws{constructor(e=null){this.bucket=e?i({},e):{}}get(e){return this.bucket[e]}set(e,t){return this.bucket[e]=t}child(){return new Ws(this.bucket)}}class Ks{constructor(e,t){this.position=0,this.array=e,this.keyFor=t}isEmpty(){return 0===this.array.length}next(){let e=this.position,t=this.array,s=this.keyFor
if(e>=t.length)return null
let i=t[e],n=s(i,e),r=e
return this.position++,{key:n,value:i,memo:r}}}class qs{constructor(e,t,s){this.position=0,this.keys=e,this.values=t,this.keyFor=s}isEmpty(){return 0===this.keys.length}next(){let e=this.position,t=this.keys,s=this.values,i=this.keyFor
if(e>=t.length)return null
let n=s[e],r=t[e],a=i(n,r)
return this.position++,{key:a,value:n,memo:r}}}const Js=new class{isEmpty(){return!0}next(){throw new Error("Cannot call next() on an empty iterator")}}
class Zs{constructor(e,t){this.tag=e.tag,this.ref=e,this.keyFor=t}iterate(){let e=this.ref,t=this.keyFor,s=e.value()
if(Array.isArray(s))return s.length>0?new Ks(s,t):Js
if(void 0===s||null===s)return Js
if(void 0!==s.forEach){let e=[]
return s.forEach(function(t){e.push(t)}),e.length>0?new Ks(e,t):Js}if("object"==typeof s){let e=Object.keys(s)
return e.length>0?new qs(e,e.map(e=>s[e]),t):Js}throw new Error(`Don't know how to {{#each ${s}}}`)}valueReferenceFor(e){return new Hs(e.value)}updateValueReference(e,t){e.update(t.value)}memoReferenceFor(e){return new Hs(e.memo)}updateMemoReference(e,t){e.update(t.memo)}}class Qs extends is{static create(e={}){return e.document=e.document||self.document,e.appendOperations=e.appendOperations||new Bt(e.document),new Qs(e)}constructor(e){super({appendOperations:e.appendOperations,updateOperations:new Lt(e.document||document)}),se(this,te(e)),this.uselessAnchor=e.document.createElement("a")}protocolForURL(e){return this.uselessAnchor.href=e,this.uselessAnchor.protocol}iterableFor(e,t){let s
if(!t)throw new Error("Must specify a key for #each")
switch(t){case"@index":s=((e,t)=>String(t))
break
case"@primitive":s=(e=>String(e))
break
default:s=(e=>e[t])}return new Zs(e,s)}}const ei="object"==typeof document?document:null
class ti{constructor(e){this._roots=[],this._rootsIndex=0,this._initializers=[],this._initialized=!1,this._rendering=!1,this._rendered=!1,this._scheduled=!1,this._notifiers=[],this.rootName=e.rootName,this.resolver=e.resolver,t(e.loader,"Must provide a Loader for preparing templates and other metadata required for a Glimmer Application."),t(e.renderer,"Must provide a Renderer to render the templates produced by the Loader."),t(e.builder,"Must provide a Builder that is responsible to building DOM."),this.document=e.document||ei,this.loader=e.loader,this.renderer=e.renderer,this.builder=e.builder}renderComponent(e,t,s=null){let i=this._roots,n=this._self
i.push({id:this._rootsIndex++,component:e,parent:t,nextSibling:s}),n&&(n.update({roots:i}),this.scheduleRerender())}async boot(){this.initialize(),this.env=this.lookup(`environment:/${this.rootName}/main/main`),await this._render()}scheduleRerender(){!this._scheduled&&this._rendered&&(this._rendering=!0,this._scheduled=!0,setTimeout(()=>{this._scheduled=!1,this._rerender(),this._rendering=!1},0))}initialize(){this.initRegistry(),this.initContainer()}registerInitializer(e){this._initializers.push(e)}initRegistry(){let e=this._registry=new Q,t=new Xs(this._registry,this.resolver)
e.register(`environment:/${this.rootName}/main/main`,Qs),e.registerOption("helper","instantiate",!1),e.registerOption("template","instantiate",!1),e.register(`document:/${this.rootName}/main/main`,this.document),e.registerOption("document","instantiate",!1),e.registerInjection("environment","document",`document:/${this.rootName}/main/main`),e.registerInjection("component-manager","env",`environment:/${this.rootName}/main/main`)
let s=this._initializers
for(let i=0;i<s.length;i++)s[i].initialize(t)
this._initialized=!0}initContainer(){this._container=new Z(this._registry,this.resolver),this._container.defaultInjections=(e=>{let t={}
return se(t,this),t})}async _render(){let e=this.env,t=this._self=new Hs({roots:this._roots}),s=new Ws,i=this.builder.getBuilder(e),n=await this.loader.getTemplateIterator(this,e,i,s,t)
try{e.begin(),await this.renderer.render(n),e.commit(),this._didRender()}catch(e){throw this._didError(e),e}}async _rerender(){let e=this.env
try{e.begin(),await this.renderer.rerender(),e.commit(),this._didRender()}catch(e){throw this._didError(e),e}}_didRender(){this._rendered=!0
let e=this._notifiers
this._notifiers=[],e.forEach(e=>e[0]())}_didError(e){let t=this._notifiers
this._notifiers=[],t.forEach(t=>t[1](e))}identify(e,t){return this.resolver.identify(e,t)}factoryFor(e,t){return this._container.factoryFor(this.identify(e,t))}lookup(e,t){return this._container.lookup(this.identify(e,t))}}class si{constructor(){this.byName=a(),this.byHandle=a()}hasName(e){return e in this.byName}getHandle(e){return this.byName[e]}hasHandle(e){return e in this.byHandle}getByHandle(e){return this.byHandle[e]}register(e,t,s){this.byHandle[e]=s,this.byName[t]=e}}class ii{constructor(e,t){this.helper=e,this.tag=t.tag,this.args=t.capture()}value(){let e=this.helper,t=this.args
return e(t.positional.value(),t.named.value())}get(){return new Ps(this)}}class ni{constructor(e){this.owner=e,this.handleLookup=[],this.cache={component:new si,template:new si,compiledTemplate:new si,helper:new si,manager:new si,modifier:new si}}setCompileOptions(e){this.templateOptions=e}lookup(e,t,s){return this.cache[e].hasName(t)?this.cache[e].getHandle(t):null}register(e,t,s){let i=this.cache[e],n=this.handleLookup.length
return this.handleLookup.push(i),this.cache[e].register(n,t,s),n}lookupModifier(e,t){let s=this.lookup("modifier",e)
if(null===s)throw new Error(`Modifier for ${e} not found.`)
return s}compileTemplate(e,t){if(!this.cache.compiledTemplate.hasName(e)){let s=this.resolve(t),i=s.block,n=s.meta,r=s.id,a=JSON.parse(i),l=new Rs(this.templateOptions,{id:r,block:a,referrer:n}).asLayout(),o={handle:l.compile(),symbolTable:l.symbolTable}
return this.register("compiledTemplate",e,o),o}let s=this.lookup("compiledTemplate",e)
return this.resolve(s)}registerHelper(e,t){return this.register("helper",e,(e,s)=>new ii(t,s))}registerInternalHelper(e,t){this.register("helper",e,t)}registerComponent(e,t,s,i){let n=this.registerTemplate(t,i),r=this.managerFor(n.meta.managerId),a=new J(e,r,s,n.handle)
return this.register("component",e,a)}lookupComponentHandle(e,t){return this.cache.component.hasName(e)||this.lookupComponent(e,t),this.lookup("component",e,t)}managerFor(e="main"){let t
if(this.cache.manager.hasName(e)){let t=this.cache.manager.getHandle(e)
return this.cache.manager.getByHandle(t)}{let s=this.owner.rootName
if(!(t=this.owner.lookup(`component-manager:/${s}/component-managers/${e}`)))throw new Error(`No component manager found for ID ${e}.`)
return this.register("manager",e,t),t}}registerTemplate(e,t){return{name:e,handle:this.register("template",e,t),meta:t.meta}}lookupComponent(e,t){let s
if(this.cache.component.hasName(e))s=this.lookup("component",e,t)
else{let i=function(e,t){if(null===e||void 0===e)throw new Error(t)
return e}(this.identifyComponent(e,t),`Could not find the component '${e}'`),n=this.owner.lookup("template",i),r=this.owner.identify("component",i),a=null
void 0!==r&&(a=this.owner.factoryFor(r)),s=this.registerComponent(e,i,a,n)}return this.resolve(s)}lookupHelper(e,t){if(!this.cache.helper.hasName(e)){let s=this.owner,i=`helper:${e}`,n=t.specifier,r=s.identify(i,n)
if(void 0===r)return null
let a=this.owner.lookup(r,t.specifier)
return this.registerHelper(e,a)}return this.lookup("helper",e,t)}lookupPartial(e,t){throw new Error("Partials are not available in Glimmer applications.")}resolve(e){return this.handleLookup[e].getByHandle(e)}identifyComponent(e,t){let s=this.owner,i=`template:${e}`,n=t.specifier,r=s.identify(i,n)
if(void 0===r&&s.identify(`component:${e}`,n))throw new Error(`The component '${e}' is missing a template. All components must have a template. Make sure there is a template.hbs in the component directory.`)
return r}}const ri={},ai=0,li=Object.freeze([])
class oi{constructor(){this.strings=[],this.arrays=[li],this.tables=[],this.handles=[],this.resolved=[],this.floats=[],this.negatives=[]}float(e){let t=this.floats.indexOf(e)
return t>-1?t:this.floats.push(e)-1}negative(e){return this.negatives.push(e)-1}string(e){let t=this.strings.indexOf(e)
return t>-1?t:this.strings.push(e)-1}stringArray(e){let t=new Array(e.length)
for(let s=0;s<e.length;s++)t[s]=this.string(e[s])
return this.array(t)}array(e){if(0===e.length)return ai
let t=this.arrays.indexOf(e)
return t>-1?t:this.arrays.push(e)-1}handle(e){let t=this.handles.indexOf(e)
return t>-1?t:(this.resolved.push(ri),this.handles.push(e)-1)}serializable(e){let t=JSON.stringify(e),s=this.strings.indexOf(t)
return s>-1?s:this.strings.push(t)-1}toPool(){return{strings:this.strings,arrays:this.arrays,handles:this.handles,floats:this.floats,negatives:this.negatives}}}class hi extends oi{constructor(e,t){super(),this.resolver=e,t&&(this.strings=t.strings,this.arrays=t.arrays,this.handles=t.handles,this.floats=t.floats,this.negatives=t.negatives,this.resolved=this.handles.map(()=>ri))}getFloat(e){return this.floats[e]}getNegative(e){return this.negatives[e]}getString(e){return this.strings[e]}getStringArray(e){let t=this.getArray(e),s=new Array(t.length)
for(let i=0;i<t.length;i++){let e=t[i]
s[i]=this.getString(e)}return s}getArray(e){return this.arrays[e]}resolveHandle(e){let t=this.resolved[e]
if(t===ri){let s=this.handles[e]
t=this.resolved[e]=this.resolver.resolve(s)}return t}getSerializable(e){return JSON.parse(this.strings[e])}}class ui extends hi{constructor(){super(...arguments),this.others=[],this.serializables=[]}serializable(e){let t=this.serializables.indexOf(e)
return t>-1?t:this.serializables.push(e)-1}getSerializable(e){return this.serializables[e]}getOther(e){return this.others[e-1]}other(e){return this.others.push(e)}}class ci{constructor(e){this.heap=e,this.offset=0}get size(){return 1+((768&this.heap.getbyaddr(this.offset))>>8)}get isMachine(){return 1024&this.heap.getbyaddr(this.offset)}get type(){return 255&this.heap.getbyaddr(this.offset)}get op1(){return this.heap.getbyaddr(this.offset+1)}get op2(){return this.heap.getbyaddr(this.offset+2)}get op3(){return this.heap.getbyaddr(this.offset+3)}}function pi(e,t,s){return e|t<<16|s<<30}function di(e,t){return e|t<<30}class mi{constructor(e){if(this.placeholders=[],this.offset=0,this.handle=0,e){let t=e.buffer,s=e.table,i=e.handle
this.heap=new Uint16Array(t),this.table=s,this.offset=this.heap.length,this.handle=i}else this.heap=new Uint16Array(1048576),this.table=[]}push(e){this.heap[this.offset++]=e}getbyaddr(e){return this.heap[e]}setbyaddr(e,t){this.heap[e]=t}malloc(){this.table.push(this.offset,0)
let e=this.handle
return this.handle+=2,e}finishMalloc(e,t){let s=this.table[e],i=pi(this.offset-s,t,0)
this.table[e+1]=i}size(){return this.offset}getaddr(e){return this.table[e]}gethandle(e){this.table.push(e,pi(0,0,3))
let t=this.handle
return this.handle+=2,t}sizeof(e){return-1}scopesizeof(e){return(1073676288&this.table[e+1])>>16}free(e){let t=this.table[e+1]
this.table[e+1]=di(t,1)}compact(){let e=0,t=this.table,s=this.table.length,i=this.heap
for(let n=0;n<s;n+=2){let s=t[n],r=t[n+1],a=65535&r,l=-1&r
if(2!==l)if(1===l)t[n+1]=di(r,2),e+=a
else if(0===l){for(let t=s;t<=n+a;t++)i[t-e]=i[t]
t[n]=s-e}else 3===l&&(t[n]=s-e)}this.offset=this.offset-e}pushPlaceholder(e){let t=this.offset++
this.heap[t]=65535,this.placeholders.push([t,e])}patchPlaceholders(){let e=this.placeholders
for(let s=0;s<e.length;s++){var t=e[s]
let i=t[0],n=t[1]
this.setbyaddr(i,n())}}capture(){this.patchPlaceholders()
let e=function(e,t,s){if(e instanceof Uint16Array){if(void 0!==e.slice)return e.slice(t,s).buffer
let i=new Uint16Array(s)
for(;t<s;t++)i[t]=e[t]
return i.buffer}return null}(this.heap,0,this.offset)
return{handle:this.handle,table:this.table,buffer:e}}}class fi{constructor(e=new oi,t=new mi){this.constants=e,this.heap=t,this._opcode=new ci(this.heap)}opcode(e){return this._opcode.offset=e,this._opcode}}class gi extends fi{}var bi={id:"j7SGa6Pm",block:'{"symbols":["root"],"statements":[[4,"each",[[22,["roots"]]],[["key"],["id"]],{"statements":[[4,"in-element",[[21,1,["parent"]]],[["guid","nextSibling"],["%cursor:0%",[21,1,["nextSibling"]]]],{"statements":[[1,[26,"component",[[21,1,["component"]]],null],false]],"parameters":[]},null]],"parameters":[1]},null]],"hasEval":false}',meta:{specifier:"template:/-application/application/src/templates/main"}}
function yi(e,t){let s=e.getSelf(),i=t.capture(),n=i.positional.at(0).value()
return"function"!=typeof n&&function(e,t){let s=function(e){let t,s,i=""
if(null===e||void 0===e)return i
"parent"in e&&"property"in e?(t=e.parent.value(),s=e.property):"_parentValue"in e&&"_propertyKey"in e&&(t=e._parentValue,s=e._propertyKey)
void 0!==s&&(i+=`('${s}' on ${function(e){let t=typeof e
if(null===e||void 0===e)return t
if("number"===t||"boolean"===t)return e.toString()
if(e.debugName)return e.debugName
try{return JSON.stringify(e)}catch(e){}return e.toString()}(t)}) `)
return i}(t)
throw new Error(`You tried to create an action with the {{action}} helper, but the first argument ${s}was ${typeof e} instead of a function.`)}(n,i.positional.at(0)),new Hs(function(...e){let t=i.positional.value()
t.shift(),t.push(...e),n.apply(s&&s.value(),t)})}function vi(e){return e[0]?e[1]:e[2]}class ki{constructor(e){this.resolver=e}getComponentDefinition(e){let s=this.resolver.resolve(e)
return t(!!s,`Couldn't find a template for ${e}`),s}getCapabilities(e){let t=this.getComponentDefinition(e),s=t.manager,i=t.state
return s.getCapabilities(i)}getLayout(e){let t=this.getComponentDefinition(e),s=t.manager.getLayout(t,this.resolver)
return{compile:()=>s.handle,symbolTable:s.symbolTable}}lookupHelper(e,t){return this.resolver.lookupHelper(e,t)}lookupModifier(e,t){return this.resolver.lookupModifier(e,t)}lookupComponentDefinition(e,t){return this.resolver.lookupComponentHandle(e,t)}lookupPartial(e,t){return this.resolver.lookupPartial(e,t)}}class Si{constructor(e){this.resolver=e}async getTemplateIterator(e,t,s,n,r){let a=new ni(e),l={program:new gi(new ui(a)),macros:new Ne,resolver:new ki(a),Builder:Pe}
a.setCompileOptions(l),a.registerTemplate("main",bi),a.registerInternalHelper("action",yi),a.registerHelper("if",vi)
let o=function({id:e,meta:t,block:s}){let n,r=e||`client-${Ds++}`
return{id:r,meta:t,create:(e,a)=>{let l=a?i({},a,t):t
return n||(n=JSON.parse(s)),new Rs(e,{id:r,block:n,referrer:l})}}}(bi).create(l)
return Promise.resolve(o.renderLayout({env:t,builder:s,dynamicScope:n,self:r}))}}class wi{constructor({element:e,nextSibling:t=null}){this.cursor={element:e,nextSibling:t}}getBuilder(e){return function(e,t){return ds.forInitialRender(e,t)}(e,this.cursor)}}class _i{render(e){let t
do{t=e.next()}while(!t.done)
this.result=t.value}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}const Ei=250
class Ci{constructor(e={}){this.timeout=e.timeout||Ei}render(e){return new Promise(t=>{let s=this.timeout,i=n=>{let r
do{r=e.next()}while(!r.done&&n.timeRemaining()>1)
if(r.done)return this.result=r.value,t()
requestIdleCallback(i,{timeout:s})}
requestIdleCallback(i,{timeout:s})})}rerender(){if(!this.result)throw new Error("Cannot re-render before initial render has completed")
this.result.rerender()}}function xi(e){return void 0!==e.rootName&&void 0!==e.collection&&void 0!==e.name&&void 0!==e.type}function Ai(e){let t=e.type,s=function(e){let t=[]
e.rootName&&t.push(e.rootName)
e.collection&&t.push(e.collection)
e.namespace&&t.push(e.namespace)
e.name&&t.push(e.name)
if(t.length>0){let s=t.join("/")
return xi(e)&&(s="/"+s),s}}(e)
return s?t+":"+s:t}function Ni(e){let t={}
if(e.indexOf(":")>-1){var s=e.split(":")
let i,n=s[0],r=s[1]
t.type=n,0===r.indexOf("/")?(i=r.substr(1).split("/"),t.rootName=i.shift(),t.collection=i.shift()):i=r.split("/"),i.length>0&&(t.name=i.pop(),i.length>0&&(t.namespace=i.join("/")))}else t.type=e
return t}function Oi(e,t){if(!t)throw new Error("Assertion Failed: "+e)}class Ti{constructor(e,t){this.config=e,this.registry=t}identify(e,t){if(function(e){var t=e.split(":")
let s=t[0],i=t[1]
return!!(s&&i&&0===i.indexOf("/")&&i.split("/").length>3)}(e))return e
let s,i=Ni(e)
if(t){let e=Ni(t)
if(xi(e)){Oi("Specifier must not include a rootName, collection, or namespace when combined with an absolute referrer",void 0===i.rootName&&void 0===i.collection&&void 0===i.namespace),i.rootName=e.rootName,i.collection=e.collection
let t=this._definitiveCollection(i.type)
if(!i.name)return i.namespace=e.namespace,i.name=e.name,this._serializeAndVerify(i)
if(i.namespace=e.namespace?e.namespace+"/"+e.name:e.name,function(e){let t=e.namespace,s=e.collection,i=t.lastIndexOf("/-")
if(i>-1){i+=2
let e=t.indexOf("/",i)
s=t.slice(i,e>-1?e:void 0)}return s}(i)===t&&(s=this._serializeAndVerify(i)))return s
if(t&&(i.namespace+="/-"+t,s=this._serializeAndVerify(i)))return s
i.rootName=i.collection=i.namespace=void 0}else Oi('Referrer must either be "absolute" or include a `type` to determine the associated type',e.type),i.collection=this._definitiveCollection(e.type),i.namespace||(i.namespace=e.rootName),Oi(`'${e.type}' does not have a definitive collection`,i.collection)}if(i.collection||(i.collection=this._definitiveCollection(i.type),Oi(`'${i.type}' does not have a definitive collection`,i.collection)),!i.rootName){if(i.rootName=this.config.app.rootName||"app",s=this._serializeAndVerify(i))return s
i.namespace?(i.rootName=i.namespace,i.namespace=void 0):(i.rootName=i.name,i.name="main")}return(s=this._serializeAndVerify(i))?s:void 0}retrieve(e){return this.registry.get(e)}resolve(e,t){let s=this.identify(e,t)
if(s)return this.retrieve(s)}_definitiveCollection(e){let t=this.config.types[e]
return Oi(`'${e}' is not a recognized type`,t),t.definitiveCollection}_serializeAndVerify(e){let t=Ai(e)
if(this.registry.has(t))return t}}class Li{constructor(e={}){this._entries=e}has(e){return e in this._entries}get(e){return this._entries[e]}}var Bi=function(e,t,s,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,i)
else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(r<3?n(a):r>3?n(t,s,a):n(t,s))||a)
return r>3&&a&&Object.defineProperty(t,s,a),a}
class Di extends K{constructor(){super(...arguments),this.hover=!1}get style(){const e=1.3*this.args.size
return isNaN(this.args.y)&&console.log(`dot ${this.args.x} ${this.args.y}`),`\n      width: ${e}px;\n      height: ${e}px;\n      left: ${this.args.x}px;\n      top: ${this.args.y}px;\n      border-radius: ${e/2}px;\n      line-height: ${e}px;\n      background: ${this.hover?"#ff0":"#61dafb"}\n    `}enter(){this.hover=!0}leave(){this.hover=!1}}Bi([V],Di.prototype,"hover",void 0),Bi([V("hover")],Di.prototype,"style",null)
var Ri=function(e,t,s,i){var n,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i
if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,i)
else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(r<3?n(a):r>3?n(t,s,a):n(t,s))||a)
return r>3&&a&&Object.defineProperty(t,s,a),a}
class Mi extends K{constructor(){super(...arguments),this.seconds=0,this.intervalId=-1,this.elapsed=0,this.start=Date.now()}didInsertElement(){this.intervalId=setInterval(this.tick.bind(this),1e3),this.tickElapsed()}tickElapsed(){this.elapsed=Date.now()-this.start,requestAnimationFrame(this.tickElapsed.bind(this))}tick(){this.seconds=this.seconds%10+1}get style(){const e=this.elapsed/1e3%10
return`transform: ${"scaleX("+(1+(e>5?10-e:e)/10)/2.1+") scaleY(0.7) translateZ(0.1px)"}`}}Ri([V],Mi.prototype,"seconds",void 0),Ri([V],Mi.prototype,"elapsed",void 0),Ri([V("elapsed")],Mi.prototype,"style",null)
var Ii={"component:/my-app/components/Dot":Di,"template:/my-app/components/Dot":{id:"xkJdV7Se",block:'{"symbols":["&default"],"statements":[[6,"div"],[10,"class","dotStyle"],[11,"style",[20,"style"],null],[11,"onmouseenter",[26,"action",[[22,["enter"]]],null],null],[11,"onmouseleave",[26,"action",[[22,["leave"]]],null],null],[8],[0,"\\n"],[4,"if",[[22,["hover"]]],null,{"statements":[[0,"    *"],[13,1],[0,"*\\n"]],"parameters":[]},{"statements":[[0,"    "],[13,1],[0,"\\n"]],"parameters":[]}],[9]],"hasEval":false}',meta:{specifier:"template:/my-app/components/Dot"}},"component:/my-app/components/MyApp":Mi,"template:/my-app/components/MyApp":{id:"YPYxdtGT",block:'{"symbols":[],"statements":[[6,"h1"],[8],[0,"Glimmer Example "],[6,"small"],[8],[6,"a"],[10,"title","source"],[10,"href","https://github.com/makepanic/sierpinski-glimmer/"],[8],[0,"🔗"],[9],[9],[9],[0,"\\n"],[6,"div"],[10,"id","container"],[8],[0,"\\n  Naive dummy app that renders a "],[6,"a"],[10,"href","https://en.wikipedia.org/wiki/Sierpinski_triangle"],[8],[0,"Sierpinski triangle"],[9],[0," as a simple \\"benchmark\\"."],[6,"br"],[8],[9],[0,"\\n  Created out of curiosity on how glimmer compares to "],[6,"a"],[10,"href","https://medium.com/@marcisbee/how-i-built-super-fast-js-framework-faster-than-react-ea99f0d03150"],[8],[0,"other implementations"],[9],[0,"."],[6,"br"],[8],[9],[0,"\\n  "],[6,"small"],[8],[0,"This is a quick implementation and has some implementation differences."],[9],[6,"br"],[8],[9],[0,"\\n  Switch renderer:"],[6,"br"],[8],[9],[0,"\\n  "],[6,"ul"],[8],[0,"\\n    "],[6,"li"],[8],[6,"a"],[10,"href","https://github.com/glimmerjs/glimmer.js/pull/34"],[8],[0,"AsyncRenderer"],[9],[0,": "],[6,"a"],[10,"href","?async"],[8],[0,"enable"],[9],[9],[0,"\\n    "],[6,"li"],[8],[0,"SyncRenderer: "],[6,"a"],[10,"href","?"],[8],[0,"enable"],[9],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n\\n"],[6,"div"],[10,"class","containerStyle"],[11,"style",[20,"style"],null],[8],[0,"\\n  "],[5,"SierpinskiTriangle",[],[["@x","@y","@s"],[0,0,1000]],{"statements":[[1,[20,"seconds"],false]],"parameters":[]}],[0,"\\n"],[9]],"hasEval":false}',meta:{specifier:"template:/my-app/components/MyApp"}},"component:/my-app/components/SierpinskiTriangle":class extends K{},"template:/my-app/components/SierpinskiTriangle":{id:"oT8Acmet",block:'{"symbols":["s","@x","@y","&default","@s"],"statements":[[4,"if",[[26,"lte",[[21,5,[]],25],null]],null,{"statements":[[0,"  "],[5,"Dot",[],[["@x","@y","@size"],[[26,"sub",[[21,2,[]],12.5],null],[26,"sub",[[21,3,[]],12.5],null],"25"]],{"statements":[[13,4]],"parameters":[]}],[0,"\\n"]],"parameters":[]},{"statements":[[4,"with",[[26,"div",[[21,5,[]],2],null]],null,{"statements":[[0,"    "],[6,"div"],[8],[0,"\\n      "],[5,"SierpinskiTriangle",[],[["@x","@y","@s"],[[21,2,[]],[26,"sub",[[21,3,[]],[26,"div",[[21,1,[]],2],null]],null],[21,1,[]]]],{"statements":[[13,4]],"parameters":[]}],[0,"\\n      "],[5,"SierpinskiTriangle",[],[["@x","@y","@s"],[[26,"sub",[[21,2,[]],[21,1,[]]],null],[26,"add",[[21,3,[]],[26,"div",[[21,1,[]],2],null]],null],[21,1,[]]]],{"statements":[[13,4]],"parameters":[]}],[0,"\\n      "],[5,"SierpinskiTriangle",[],[["@x","@y","@s"],[[26,"add",[[21,2,[]],[21,1,[]]],null],[26,"add",[[21,3,[]],[26,"div",[[21,1,[]],2],null]],null],[21,1,[]]]],{"statements":[[13,4]],"parameters":[]}],[0,"\\n    "],[9],[0,"\\n"]],"parameters":[1]},null]],"parameters":[]}]],"hasEval":false}',meta:{specifier:"template:/my-app/components/SierpinskiTriangle"}},"helper:/my-app/components/add":function([e,t]){return e+t},"helper:/my-app/components/div":function([e,t]){const s=e/t
return isNaN(s),s},"helper:/my-app/components/lte":function([e,t]){return e<=t},"helper:/my-app/components/sub":function([e,t]){let s=e-t
return isNaN(s),s}},Fi={app:{name:"my-app",rootName:"my-app"},types:{application:{definitiveCollection:"main"},component:{definitiveCollection:"components"},"component-test":{unresolvable:!0},helper:{definitiveCollection:"components"},"helper-test":{unresolvable:!0},renderer:{definitiveCollection:"main"},template:{definitiveCollection:"components"}},collections:{main:{types:["application","renderer"]},components:{group:"ui",types:["component","component-test","template","helper","helper-test"],defaultType:"component",privateCollections:["utils"]},styles:{group:"ui",unresolvable:!0},utils:{unresolvable:!0}}}
const Pi=new class extends ti{constructor(){let e=new Li(Ii),t=new Ti(Fi,e)
const s=document.body,i=location.search.endsWith("async")?new Ci:new _i
super({builder:new wi({element:s,nextSibling:null}),loader:new Si(t),renderer:i,resolver:t,rootName:Fi.app.rootName})}},ji=document.getElementById("app")
Y=(()=>{Pi.scheduleRerender()}),Pi.registerInitializer({initialize(e){e.register(`component-manager:/${Pi.rootName}/component-managers/main`,Gs)}}),Pi.renderComponent("MyApp",ji,null),Pi.boot()})
