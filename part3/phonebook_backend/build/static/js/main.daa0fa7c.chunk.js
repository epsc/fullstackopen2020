(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),u=t.n(o),c=t(4),i=t(2),l=function(e){var n=e.persons,t=e.filter,a=e.deletePerson,o=""===t?n:n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return r.a.createElement("div",null,o.map((function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number," \xa0",r.a.createElement("button",{onClick:function(){return a(e.id)}},"delete"))})))},m=function(e){var n=e.newName,t=e.newNumber,a=e.addPerson,o=e.handleNameChange,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:a},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:n,onChange:o})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:t,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.filter,t=e.handleFilterChange;return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{value:n,onChange:t}))},f=function(e){var n=e.notification;return null===n?null:r.a.createElement("div",{className:n.status},n.message)},s=t(3),h=t.n(s),b="/api/persons",p=function(){return h.a.get(b).then((function(e){return e.data}))},v=function(e){return h.a.post(b,e).then((function(e){return e.data}))},E=function(e){return h.a.delete("".concat(b,"/").concat(e))},w=function(e,n){return h.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},g=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),s=Object(i.a)(u,2),h=s[0],b=s[1],g=Object(a.useState)(""),j=Object(i.a)(g,2),O=j[0],C=j[1],N=Object(a.useState)(""),k=Object(i.a)(N,2),S=k[0],y=k[1],P=Object(a.useState)(null),D=Object(i.a)(P,2),F=D[0],I=D[1];Object(a.useEffect)((function(){p().then((function(e){o(e)}))}),[]);var J=function(e,n){I({status:e,message:n}),setTimeout((function(){I(null)}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(f,{notification:F}),r.a.createElement(d,{filter:S,handleFilterChange:function(e){y(e.target.value)}}),r.a.createElement("h2",null,"Add new"),r.a.createElement(m,{newName:h,newNumber:O,addPerson:function(e){if(e.preventDefault(),t.map((function(e){return e.name})).includes(h)){if(window.confirm("".concat(h," is already added to the phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===h})),a=Object(c.a)(Object(c.a)({},n),{},{number:O});w(a.id,a).then((function(e){o(t.map((function(n){return n.id!==a.id?n:e}))),J("pass","The phone number of ".concat(e.name," has been updated"))})).catch((function(e){e.response.data.error.startsWith("Validation failed")?J("error",e.response.data.error):(o(t.filter((function(e){return e.id!==a.id}))),J("error","Information of ".concat(a.name," has already been removed from the server")))}))}}else v({name:h,number:O}).then((function(e){o(t.concat(e)),J("pass","".concat(e.name," added"))})).catch((function(e){J("error",e.response.data.error)}));b(""),C("")},handleNameChange:function(e){b(e.target.value)},handleNumberChange:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(l,{persons:t,filter:S,deletePerson:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name," ?"))&&E(e).then((function(){o(t.filter((function(e){return e.id!==n.id})))}))}}))};t(37);u.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.daa0fa7c.chunk.js.map