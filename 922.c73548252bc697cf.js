"use strict";(self.webpackChunkyugiohfmr=self.webpackChunkyugiohfmr||[]).push([[922],{922:(J,d,r)=>{r.r(d),r.d(d,{CharactersModule:()=>U});var l=r(6814),h=r(157),p=r(8645),m=r(9773),t=r(5879),g=r(25),u=r(2296),C=r(5195);function M(e,c){if(1&e&&(t.TgZ(0,"div")(1,"mat-card")(2,"mat-card-header"),t._uU(3),t.qZA(),t._UZ(4,"img",2),t.TgZ(5,"a",3),t._uU(6,"Watch"),t.qZA()()()),2&e){const n=c.$implicit,o=c.index;t.xp6(3),t.hij(" ",n.name," "),t.xp6(1),t.Q6J("src","/assets/"+n.src,t.LSH),t.xp6(1),t.Q6J("routerLink",""+o)}}let O=(()=>{class e{constructor(n){this.cardApiService=n,this.notifier=new p.x,this.characters$=this.cardApiService.getCharacters().pipe((0,m.R)(this.notifier))}ngOnDestroy(){this.notifier.next(!0),this.notifier.complete()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(g.e))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-characters"]],decls:3,vars:3,consts:[[1,"flex-characters"],[4,"ngFor","ngForOf"],[3,"src"],["mat-button","","routerLinkActive","active",3,"routerLink"]],template:function(n,o){1&n&&(t.TgZ(0,"main",0),t.YNc(1,M,7,3,"div",1),t.ALo(2,"async"),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngForOf",t.lcZ(2,1,o.characters$)))},dependencies:[l.sg,h.rH,h.Od,u.zs,C.a8,C.dk,l.Ov],styles:[".flex-characters[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;padding:.7rem}.flex-characters[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{padding:.3rem;width:20%}.flex-characters[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{display:flex;width:100%;flex-direction:column;padding:.5rem}.flex-characters[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}"]}),e})();var a=r(95),v=r(1666),f=r(9157),w=r(2032),P=r(5986),_=r(2557),x=r(3226);const Z=function(){return{"card-deck-size":!0,hide:!1}};function b(e,c){if(1&e&&t._UZ(0,"app-card-show",16),2&e){const n=c.$implicit;t.Q6J("card",n.card)("chanceShow",!0)("chance100",n.chance100)("ngClass",t.DdM(4,Z))}}const T=[{path:"",component:O},{path:":id",component:(()=>{class e{constructor(n,o,s){this.route=n,this.cardApiService=o,this.dialog=s,this.notifier=new p.x,this.deckId=0,this.orderObject="100",this.search="",this.filterInput=new a.cw({monsters:new a.NI(!1),magics:new a.NI(!1),traps:new a.NI(!1),rituals:new a.NI(!1)}),this.ascending=new a.NI(!1),this.route.params.pipe((0,m.R)(this.notifier)).subscribe(i=>{Number.isNaN(i.id)||(this.deckId=Number.parseInt(i.id))}),this.cardCharacter$=o.getCurrentCharacter(this.deckId),this.updateFilter()}orderUpdate(n,o){this.orderObject=n.selected?o:"id",this.updateFilter()}updateFilter(){this.cardApiService.filterCharacterCards(this.filterInput.controls.monsters.value||this.filterInput.controls.magics.value||this.filterInput.controls.traps.value||this.filterInput.controls.rituals.value?{filters:{monsters:this.filterInput.controls.monsters.value,magics:this.filterInput.controls.magics.value,traps:this.filterInput.controls.traps.value,rituals:this.filterInput.controls.rituals.value},order:this.orderObject,ascending:this.ascending.value?1:-1,search:this.search}:{order:this.orderObject,ascending:this.ascending.value?1:-1,search:this.search})}ngOnDestroy(){this.notifier.next(!0),this.notifier.complete()}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(h.gz),t.Y36(g.e),t.Y36(v.uw))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-characters-show"]],decls:39,vars:6,consts:[[1,"section-tab"],[1,"limit-h","scrollCards"],[3,"card","chanceShow","chance100","ngClass",4,"ngFor","ngForOf"],[1,"options-card"],[1,"filter-card"],["type","text","matInput","","name","search","holder","The name of your deck",3,"ngModel","ngModelChange"],[3,"formGroup"],["color","primary","formControlName","monsters",1,"example-margin",3,"change"],["color","primary","formControlName","magics",1,"example-margin",3,"change"],["color","primary","formControlName","traps",1,"example-margin",3,"change"],["color","primary","formControlName","rituals",1,"example-margin",3,"change"],["mat-stroked-button",""],["aria-label","Sorting",1,"mat-mdc-chip-set-stacked"],[3,"selectionChange"],["selected","",3,"selectionChange"],["color","primary",1,"example-margin",3,"formControl","change"],[3,"card","chanceShow","chance100","ngClass"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t.YNc(2,b,1,5,"app-card-show",2),t.ALo(3,"async"),t.qZA(),t.TgZ(4,"div",3)(5,"section",4)(6,"h4"),t._uU(7,"Filter:"),t.qZA(),t.TgZ(8,"mat-form-field")(9,"mat-label"),t._uU(10,"Search name"),t.qZA(),t.TgZ(11,"input",5),t.NdJ("ngModelChange",function(i){return o.search=i})("ngModelChange",function(){return o.updateFilter()}),t.qZA()(),t.TgZ(12,"div",6)(13,"mat-checkbox",7),t.NdJ("change",function(){return o.updateFilter()}),t._uU(14,"Monsters"),t.qZA(),t.TgZ(15,"mat-checkbox",8),t.NdJ("change",function(){return o.updateFilter()}),t._uU(16,"Magics"),t.qZA(),t.TgZ(17,"mat-checkbox",9),t.NdJ("change",function(){return o.updateFilter()}),t._uU(18,"Traps"),t.qZA(),t.TgZ(19,"mat-checkbox",10),t.NdJ("change",function(){return o.updateFilter()}),t._uU(20,"Rituals"),t.qZA(),t.TgZ(21,"button",11),t._uU(22,"Reset filters"),t.qZA()()(),t.TgZ(23,"section",4)(24,"h4"),t._uU(25,"Sorting by:"),t.qZA(),t.TgZ(26,"mat-chip-listbox",12)(27,"mat-chip-option",13),t.NdJ("selectionChange",function(i){return o.orderUpdate(i,"id")}),t._uU(28,"id"),t.qZA(),t.TgZ(29,"mat-chip-option",13),t.NdJ("selectionChange",function(i){return o.orderUpdate(i,"name")}),t._uU(30,"Name"),t.qZA(),t.TgZ(31,"mat-chip-option",13),t.NdJ("selectionChange",function(i){return o.orderUpdate(i,"atk")}),t._uU(32,"ATK"),t.qZA(),t.TgZ(33,"mat-chip-option",13),t.NdJ("selectionChange",function(i){return o.orderUpdate(i,"def")}),t._uU(34,"DEF"),t.qZA(),t.TgZ(35,"mat-chip-option",14),t.NdJ("selectionChange",function(i){return o.orderUpdate(i,"100")}),t._uU(36,"prov%"),t.qZA()(),t.TgZ(37,"mat-checkbox",15),t.NdJ("change",function(){return o.updateFilter()}),t._uU(38,"Ascending"),t.qZA()()()()),2&n&&(t.xp6(2),t.Q6J("ngForOf",t.lcZ(3,4,o.cardCharacter$)),t.xp6(9),t.Q6J("ngModel",o.search),t.xp6(1),t.Q6J("formGroup",o.filterInput),t.xp6(25),t.Q6J("formControl",o.ascending))},dependencies:[l.mk,l.sg,u.lW,f.KE,f.hX,w.Nt,P.oG,_.z2,_.iO,a.Fj,a.JJ,a.JL,a.oH,a.sg,a.u,x.T,a.On,l.Ov],styles:[".limit-h[_ngcontent-%COMP%]{width:80%;display:flex;flex-wrap:wrap;justify-content:flex-start;align-content:flex-start;height:75vh;overflow-y:scroll;padding:.2rem;margin-top:.3rem;margin-left:.5rem;background-color:#26a69a7e;border:3px solid rgba(38,166,154,.4941176471);border-radius:.5rem}.options-card[_ngcontent-%COMP%]{width:15%;display:flex;flex-direction:column;padding:.5rem}.options-card[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{width:100%}.section-tab[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row}.filter-card[_ngcontent-%COMP%], .filter-card[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column}.filter-card[_ngcontent-%COMP%]   mat-chip-listbox[_ngcontent-%COMP%]{width:100%}.filter-card[_ngcontent-%COMP%]   mat-chip-listbox[_ngcontent-%COMP%]   mat-chip-option[_ngcontent-%COMP%]{width:40%}.filter-card[_ngcontent-%COMP%]   mat-chip-listbox[_ngcontent-%COMP%]   mat-chip-option.add-card-chip[_ngcontent-%COMP%]{width:auto}.filter-card[_ngcontent-%COMP%]   mat-button-toggle-group[_ngcontent-%COMP%]{width:100%}.filter-card[_ngcontent-%COMP%]   mat-button-toggle-group[_ngcontent-%COMP%]   mat-button-toggle[_ngcontent-%COMP%]{padding-top:.3rem;padding-bottom:.3rem;width:50%}.hide[_ngcontent-%COMP%]{visibility:hidden;position:absolute}.card-deck-size[_ngcontent-%COMP%]{display:flex;justify-content:stretch;width:25%}.flex-p[_ngcontent-%COMP%]{display:flex}.color-monster[_ngcontent-%COMP%]{background-color:#fff9c4}.color-magic[_ngcontent-%COMP%]{background-color:#a5d6a7}.color-magic[_ngcontent-%COMP%]   p.description[_ngcontent-%COMP%]{border:1px solid #7bd37e}.color-trap[_ngcontent-%COMP%]{background-color:#f8bbd0}.color-trap[_ngcontent-%COMP%]   p.description[_ngcontent-%COMP%]{border:1px solid #b85a7b}.color-ritual[_ngcontent-%COMP%]{background-color:#c5cae9}.color-ritual[_ngcontent-%COMP%]   p.description[_ngcontent-%COMP%]{border:1px solid #6671b8}@media (min-width: 700px){.card-deck[_ngcontent-%COMP%], .card-deck-size[_ngcontent-%COMP%]{width:12.5%}}"]}),e})()}];let y=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[h.Bz.forChild(T),h.Bz]}),e})();var S=r(9455),A=r(941),N=r(6993);let U=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[l.ez,y,S.q,a.UX,A.H,N.T,a.u5]}),e})()}}]);