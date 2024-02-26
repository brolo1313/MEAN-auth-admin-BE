import{a as ne}from"./chunk-H4PCDCV7.js";import{b as re,e as oe,g as ae,l as se}from"./chunk-YYFPSEIL.js";import{a as ie}from"./chunk-ASLY632G.js";import{$ as y,B as l,E as V,H as b,I as H,J as d,K as R,M as U,N as $,O as s,P as a,Q as m,R as N,S as B,T as X,U as k,V as u,W as p,X as z,Y as g,Z as j,_ as O,a as E,aa as w,b as A,ca as v,da as Z,ea as G,fa as S,ga as D,h as x,ha as J,j as C,m as W,n as h,o as _,oa as K,pa as Q,qa as Y,ra as q,s as P,sa as L,ta as ee,w as F,wa as te,x as M}from"./chunk-GD6ZBVGB.js";var T=(()=>{let e=class e{constructor(){this.selectMarketsProfilesList=V({}),this.selectAllMarketsList=V([]),this.dataIsLoadingMarketsProfilesList=V(!1)}setDataIsLoadingMarketsProfilesList(t){this.dataIsLoadingMarketsProfilesList.set(t)}getDataIsLoadingMarketsProfilesList(){return this.dataIsLoadingMarketsProfilesList()}storedMarketsProfilesList(t){this.selectMarketsProfilesList.set(t)}storedAllMarketsList(t){this.selectAllMarketsList.set(t)}getMarketsProfilesList(){return this.selectMarketsProfilesList()}getAllMarketsList(){return this.selectAllMarketsList()}addedMarketProfile(t){this.selectMarketsProfilesList.set(A(E({},this.selectMarketsProfilesList()),{items:[...this.selectMarketsProfilesList().items,t]}))}deleteMarketProfile(t){let r=this.selectMarketsProfilesList().items.filter(n=>n.id!==t);this.selectMarketsProfilesList.set(A(E({},this.selectMarketsProfilesList()),{items:[...r]}))}updateMarketProfile(t){let r=this.selectMarketsProfilesList().items.map(n=>n.id==t.id?t:n);this.selectMarketsProfilesList.set(A(E({},this.selectMarketsProfilesList()),{items:[...r]}))}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=P({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var le=(()=>{let e=class e{constructor(){this.attributeName="",this.searchText="",this.isDisabled=!1,this.searchTextChange=new x}onSearchTextChanged(){this.searchTextChange.emit(this.searchText)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=C({type:e,selectors:[["app-search-input"]],inputs:{attributeName:"attributeName",searchText:"searchText",isDisabled:"isDisabled"},outputs:{searchTextChange:"searchTextChange"},standalone:!0,features:[v],decls:3,vars:3,consts:[[1,"d-flex","justify-content-center","full-width","mt-3","pos-relative"],["src","assets/icons/shared-icons/search.svg","alt","",1,"pos-absolute"],["type","text","autocomplete","off","placeholder","\u041F\u043E\u0448\u0443\u043A",1,"form-control",3,"ngModel","disabled","ngModelChange","input"]],template:function(r,n){r&1&&(s(0,"div",0),m(1,"img",1),s(2,"input",2),w("ngModelChange",function(f){return y(n.searchText,f)||(n.searchText=f),f}),u("input",function(){return n.onSearchTextChanged()}),a()()),r&2&&(l(2),O("ngModel",n.searchText),d("disabled",n.isDisabled),H("name",n.attributeName))},dependencies:[L,se,re,oe,ae],styles:["input[name=search][_ngcontent-%COMP%]{border-radius:20px;height:45px;text-indent:10px;border:1px solid #f8b218;text-indent:25px}img[_ngcontent-%COMP%]{top:50%;left:20px;transform:translate(-50%,-50%)}.dashboard-view[_nghost-%COMP%]   input[name=search][_ngcontent-%COMP%], .dashboard-view   [_nghost-%COMP%]   input[name=search][_ngcontent-%COMP%]{border-radius:10px}"]});let i=e;return i})();var ce=(()=>{let e=class e{transform(t,r=""){return r?t.filter(n=>n.nameLabel&&n.nameLabel.toLowerCase().includes(r.toLowerCase())):t}};e.\u0275fac=function(r){return new(r||e)},e.\u0275pipe=W({name:"searchBox",type:e,pure:!0,standalone:!0});let i=e;return i})();function fe(i,e){if(i&1){let o=k();s(0,"app-search-input",11),w("searchTextChange",function(r){h(o);let n=p();return y(n.searchText,r)||(n.searchText=r),_(r)}),a()}if(i&2){let o=p();d("attributeName","search"),O("searchText",o.searchText)}}function ge(i,e){}function he(i,e){if(i&1){let o=k();s(0,"div")(1,"div",12)(2,"div",13)(3,"div")(4,"h5",14),g(5),a()(),s(6,"div",15)(7,"div",16),u("click",function(){let n=h(o).$implicit,c=p();return _(c.editMarket(n))}),m(8,"img",17),a(),s(9,"div",16),u("click",function(){let n=h(o).$implicit,c=p();return _(c.deleteMarket(n.id))}),m(10,"img",18),a()()()()()}if(i&2){let o=e.$implicit,t=e.first;l(),R("mt-5",t),l(4),j(" ",o.nameLabel," ")}}function _e(i,e){}var xe=(i,e)=>e.marketPrefix;function Me(i,e){if(i&1){let o=k();s(0,"tr")(1,"td")(2,"div",27),g(3),a()(),s(4,"td")(5,"div",27),g(6),a()(),s(7,"td")(8,"div",28)(9,"div",29),u("click",function(){let n=h(o).$implicit,c=p(3);return _(c.editMarket(n))}),m(10,"img",17),a(),s(11,"div",29),u("click",function(){let n=h(o).$implicit,c=p(3);return _(c.deleteMarket(n.id))}),m(12,"img",18),a()()()()}if(i&2){let o=e.$implicit;l(3),j(" ",o.title," "),l(3),j(" ",o.details," ")}}function Ce(i,e){if(i&1&&(s(0,"div",23)(1,"table",24)(2,"thead",25)(3,"tr")(4,"th",26),g(5,"\u041D\u0430\u0437\u0432\u0430"),a(),s(6,"th",26),g(7,"\u041F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F"),a(),m(8,"th",26),a()(),s(9,"tbody"),U(10,Me,13,2,"tr",null,xe),S(12,"searchBox"),a()()()),i&2){let o=p(2);l(10),$(D(12,0,o.store.getAllMarketsList().items,o.searchText))}}function Pe(i,e){if(i&1){let o=k();s(0,"div",19)(1,"app-search-input",20),w("searchTextChange",function(r){h(o);let n=p();return y(n.searchText,r)||(n.searchText=r),_(r)}),a(),b(2,_e,0,0,"ng-template",21)(3,Ce,13,3,"div",22),S(4,"searchBox"),a()}if(i&2){let o=p(),t=z(13),r;l(),d("attributeName","search"),O("searchText",o.searchText),l(),d("ngTemplateOutlet",t),l(),d("ngIf",(r=D(4,4,o.store.getAllMarketsList().items,o.searchText))==null?null:r.length)}}function be(i,e){if(i&1){let o=k();N(0),s(1,"div",30)(2,"h5",31),g(3," \u041D\u0435\u043C\u0430\u0454 \u0434\u0430\u043D\u0438\u0445 "),a(),s(4,"button",32),u("click",function(){h(o);let r=p();return _(r.get())}),g(5,"get"),a()(),B()}}function ke(i,e){i&1&&X(0)}function ve(i,e){if(i&1&&(N(0),s(1,"div")(2,"h5",33),g(3,"\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0456\u0432 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E"),a()(),B()),i&2){let o=p().className;l(2),d("ngClass",o)}}function Le(i,e){if(i&1&&(b(0,ve,4,1,"ng-container",9),S(1,"searchBox")),i&2){let o=p(),t;d("ngIf",!((t=D(1,1,o.store.getMarketsProfilesList().items,o.searchText))!=null&&t.length)&&!o.store.getDataIsLoadingMarketsProfilesList())}}var Te=()=>["text-white","mt-5"],Oe=i=>({className:i}),de=(()=>{let e=class e{constructor(){this.store=M(T),this.userProfile=this.store.getAllMarketsList(),this.createMarketProfile=new x,this.editMarketProfile=new x,this.deleteMarketProfile=new x,this.getAllPlans=new x,this.byId=t=>t?.id}ngOnInit(){this.getAllPlans.emit(),console.log(this.userProfile)}get(){console.log("on init compoennt dash",this.store.getAllMarketsList())}addMarket(){}deleteMarket(t){}editMarket(t){}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=C({type:e,selectors:[["app-admin-dashboard-list"]],outputs:{createMarketProfile:"createMarketProfile",editMarketProfile:"editMarketProfile",deleteMarketProfile:"deleteMarketProfile",getAllPlans:"getAllPlans"},standalone:!0,features:[v],decls:14,vars:14,consts:[[1,"wrapper-dashboard","full-height"],[1,"create_location","pos-absolute","bg-general","border-radius-half","z-index-1","p-3","cursor-pointer",3,"click"],[1,"border-0","bg-transparent"],["src","assets/icons/admin-layout-icons/added_location.svg"],[1,"d-sm-block","d-md-none","overflow-auto","mt-4",2,"max-height","500px"],[3,"attributeName","searchText","searchTextChange",4,"ngIf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngFor","ngForOf","ngForTrackBy"],["class","card d-none d-md-flex p-3",4,"ngIf"],[4,"ngIf"],["noFilterData",""],[3,"attributeName","searchText","searchTextChange"],[1,"cursor-pointer","bg-white","mt-3","border-radius-10","p-2"],[1,"content","d-flex","justify-content-between","align-items-center"],[1,"text-center","text-dark","mb-0"],[1,"actions","d-flex"],[1,"border-0","bg-transparent",3,"click"],["src","assets/icons/admin-layout-icons/edit_pencil.svg","alt",""],["src","assets/icons/admin-layout-icons/delete_trash.svg","alt",""],[1,"card","d-none","d-md-flex","p-3"],[1,"col-3","mb-4","dashboard-view",3,"attributeName","searchText","searchTextChange"],[3,"ngTemplateOutlet"],["class","overflow-auto table-responsive",4,"ngIf"],[1,"overflow-auto","table-responsive"],[1,"table","table-responsive"],[2,"position","sticky","top","0"],["scope","col"],[1,"d-flex","align-items-center",2,"height","50px"],[1,"actions","d-flex","justify-content-end"],[1,"border-0","bg-transparent","cursor-pointer",3,"click"],[1,"full-height","special-size"],[1,"d-flex","justify-content-center","align-items-center","text-center","fsz-30","special-size","text-white"],[3,"click"],[1,"text-center",3,"ngClass"]],template:function(r,n){if(r&1&&(s(0,"div",0)(1,"div",1),u("click",function(){return n.addMarket()}),s(2,"button",2),m(3,"img",3),a()(),s(4,"div",4),b(5,fe,1,2,"app-search-input",5)(6,ge,0,0,"ng-template",6)(7,he,11,3,"div",7),S(8,"searchBox"),a(),b(9,Pe,5,7,"div",8)(10,be,6,0,"ng-container",9)(11,ke,1,0,"ng-container",9),a(),b(12,Le,2,4,"ng-template",null,10,J)),r&2){let c=z(13);l(5),d("ngIf",n.store.getMarketsProfilesList().items==null?null:n.store.getMarketsProfilesList().items.length),l(),d("ngTemplateOutlet",c)("ngTemplateOutletContext",G(12,Oe,Z(11,Te))),l(),d("ngForOf",D(8,8,n.store.getMarketsProfilesList().items,n.searchText))("ngForTrackBy",n.byId),l(2),d("ngIf",n.store.getAllMarketsList().items==null?null:n.store.getAllMarketsList().items.length),l(),d("ngIf",!(n.store.getAllMarketsList().items!=null&&n.store.getAllMarketsList().items.length)),l(),d("ngIf",!(n.store.getMarketsProfilesList().items!=null&&n.store.getMarketsProfilesList().items.length)&&n.store.getDataIsLoadingMarketsProfilesList())}},dependencies:[L,K,Q,Y,q,le,ce],styles:['[_ngcontent-%COMP%]:root{--spinner-color: #e14f4f}.z-index-1[_ngcontent-%COMP%]{z-index:1}.full-width[_ngcontent-%COMP%]{width:100%}.full-height[_ngcontent-%COMP%]{height:100%}.pos-relative[_ngcontent-%COMP%]{position:relative}.pos-absolute[_ngcontent-%COMP%]{position:absolute}.pos-fixed[_ngcontent-%COMP%]{position:fixed}.sticky[_ngcontent-%COMP%]{position:fixed;top:0;width:100%}.cursor-pointer[_ngcontent-%COMP%]{cursor:pointer}.margin-top-75[_ngcontent-%COMP%]{margin-top:75px}.margin-top-150[_ngcontent-%COMP%]{margin-top:150px}.text-general[_ngcontent-%COMP%]{color:#f8b218!important}.bg-general[_ngcontent-%COMP%]{background-color:#f8b218!important}.bg-light-grey[_ngcontent-%COMP%]{background-color:#cdcdcd!important}.fsz-10[_ngcontent-%COMP%]{font-size:10px}.fsz-30[_ngcontent-%COMP%]{font-size:30px}.border-general[_ngcontent-%COMP%]{border:1px solid #f8b218}.border-radius-10[_ngcontent-%COMP%]{border-radius:10px}.border-radius-20[_ngcontent-%COMP%]{border-radius:20px}.border-radius-30[_ngcontent-%COMP%]{border-radius:30px}.border-radius-half[_ngcontent-%COMP%]{border-radius:50%}.column-gap-10[_ngcontent-%COMP%]{column-gap:10px}.column-gap-5[_ngcontent-%COMP%]{column-gap:5px}.title-text[_ngcontent-%COMP%]{margin-right:5px}.title-text[_ngcontent-%COMP%]:before, .title-text[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;right:0;background-color:#fff}.title-text[_ngcontent-%COMP%]:before{height:2px}.title-text[_ngcontent-%COMP%]:after{top:27px;height:2px}.title-text[_ngcontent-%COMP%]:before{top:0}.title-text[_ngcontent-%COMP%]:after{bottom:0}app-loader[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;width:100%;position:absolute}.no-data[_ngcontent-%COMP%]{color:#fff;display:flex;justify-content:center;align-items:center;flex-direction:column;height:100svh;background:url("./media/bg-no-data-ZW55VDXE.png") center/cover no-repeat}.create_location[_ngcontent-%COMP%]{bottom:50px;right:20px}div.wrapper-dashboard[_ngcontent-%COMP%]{padding:100px 15px 0}.content[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis}.actions[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:45px;height:45px}.table-responsive[_ngcontent-%COMP%]{max-height:500px}.table[_ngcontent-%COMP%] > thead[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{background-color:#ededed}.table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%]:first-child, .table[_ngcontent-%COMP%] > thead[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]:first-child{padding-left:20px}.special-size[_ngcontent-%COMP%]{height:calc(100% - 100px)}']});let i=e;return i})();var pe={production:!1,apiUrl:"https://node-implementation.vercel.app/api"};var me=(()=>{let e=class e{constructor(t,r,n){this.http=t,this.route=r,this.storeService=n,this.localStorageService=M(ie)}getAllMarketsList(){return this.http.get(`${pe.apiUrl}/plans`).subscribe(t=>{this.storeService.storedAllMarketsList(t)},t=>{console.error("HTTP Error:",t)})}createMarketProfile(t){return{}}deleteMarketProfile(t){return null}editMarketProfile(t,r){return{}}};e.\u0275fac=function(r){return new(r||e)(F(ee),F(te),F(T))},e.\u0275prov=P({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var mt=(()=>{let e=class e{constructor(){this.dashServices=M(me),this.store=M(T)}ngOnInit(){}getAllPlans(){this.dashServices.getAllMarketsList()}createMarketProfile(t){this.dashServices.createMarketProfile(t)}editMarketProfile(t){this.dashServices.editMarketProfile(t.id,t)}deleteMarketProfile(t){this.dashServices.deleteMarketProfile(t)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=C({type:e,selectors:[["app-admin-dashboard-list-container"]],standalone:!0,features:[v],decls:2,vars:0,consts:[[1,"pos-absolute","full-width"],[3,"createMarketProfile","editMarketProfile","deleteMarketProfile","getAllPlans"]],template:function(r,n){r&1&&(m(0,"app-admin-header",0),s(1,"app-admin-dashboard-list",1),u("createMarketProfile",function(f){return n.createMarketProfile(f)})("editMarketProfile",function(f){return n.editMarketProfile(f)})("deleteMarketProfile",function(f){return n.deleteMarketProfile(f)})("getAllPlans",function(){return n.getAllPlans()}),a())},dependencies:[L,de,ne]}),e.\u0275prov=P({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();export{mt as AdminDashboardContainerComponent};