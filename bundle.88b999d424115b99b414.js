webpackJsonp([0],{210:function(e,t){},212:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(215),n=e(l),r=a(213),s=e(r),i=a(138),o=e(i),d=a(216),u=e(d);a(430);var c=Element.prototype.getBoundingClientRect,h=o.default.createClass({displayName:"DataGrid",propTypes:{columnModel:o.default.PropTypes.arrayOf(o.default.PropTypes.object),initialData:o.default.PropTypes.arrayOf(o.default.PropTypes.arrayOf(o.default.PropTypes.string))},getInitialState:function(){return{columnModel:this.props.columnModel,data:this.props.initialData,sortby:null,descending:!1,edit:null,search:!1,resizing:null}},_preSearchData:null,componentDidMount:function(){this.tableWrapper.addEventListener("scroll",this.scrollHandler)},componentWillUnmount:function(){this.tableWrapper.removeEventListener("scroll",this.scrollHandler)},scrollHandler:function(){var e=this.tableWrapper.scrollTop;this.tableHead.style.transform="translate3d(0, "+e+"px, 0)"},sortData:function(e){var t=e.target.cellIndex,a=this.state.sortby===t&&!this.state.descending,l=this.state.data.slice();l.sort(function(e,l){return a?e[t]<l[t]:e[t]>l[t]}),this.setState({data:l,sortby:t,descending:a})},showEditor:function(e){this.setState({edit:{cell:e.target.cellIndex,row:parseInt(e.target.dataset.rowIndex,10)}})},save:function(e){e.preventDefault();var t=e.target.firstChild,a=this.state.data.slice();a[this.state.edit.row][this.state.edit.cell]=t.value,this.setState({edit:null,data:a})},toggleSearch:function(){this.state.search?(this.setState({data:this._preSearchData,search:!1}),this._preSearchData=null):(this._preSearchData=this.state.data,this.setState({search:!0}))},search:function(e){var t=e.target.value.toLowerCase();if(!t)return void this.setState({data:this._preSearchData});var a=e.target.dataset.idx,l=this._preSearchData.filter(function(e){return(""+e[a]).toLowerCase().indexOf(t)>-1});this.setState({data:l})},renderColumnModel:function(){return o.default.createElement("colgroup",null,this.state.columnModel.map(function(e,t){return o.default.createElement("col",{key:t,style:{width:e.width}})}))},download:function(e,t){var a="json"===e?(0,s.default)(this.state.data):this.state.data.reduce(function(e,t){return e+t.reduce(function(e,a,l){return e+'"'+a.replace(/"/g,'""')+'"'+(l<t.length-1?",":"")},"")+"\n"},""),l=window.URL||window.webkitURL,n=new Blob([a],{type:"text/"+e});t.target.href=l.createObjectURL(n),t.target.download="data."+e},startResizing:function(e){this.setState({resizing:{tableLeftX:c.call(this.tableWrapper).left,startX:e.target.clientX}}),document.addEventListener("mousemove",this.dragResizerHandler),document.addEventListener("mouseup",this.cancelResizerHandler)},stopResizing:function(){document.removeEventListener("mousemove",this.dragResizerHandler),document.removeEventListener("mousemove",this.cancelResizerHandler)},dragResizerHandler:function(e){this.setState({resizing:{moveX:e.target.pageX}})},cancelResizeHandler:function(e){this.setState({resizing:!1}),document.removeEventListener("mousemove",this.dragResizerHandler)},render:function(){var e=this,t=e.props.columnModel.map(function(t,a){var l=t.title;return e.state.sortby===a&&(l+=e.state.descending?" ↑":" ↓"),o.default.createElement("th",{key:a,className:"DataTable-Cell DataTable-Cell--Head"},l,o.default.createElement("div",{className:"CellResizer",onClick:e.startResizing}))}),a=this.state.data.map(function(t,a){return o.default.createElement("tr",{key:a,className:"DataTable-Row"},t.map(function(t,l){var n=t,r=e.state.edit;return r&&r.row===a&&r.cell===l&&(n=o.default.createElement("form",{className:"DataTable-Form",onSubmit:e.save},o.default.createElement("input",{className:"TextInput CellInput",type:"text",defaultValue:n,autoFocus:!0}))),o.default.createElement("td",{key:l,"data-row-index":a,className:"DataTable-Cell"},n)}))});return o.default.createElement("div",(0,n.default)({className:"DataGrid"},"className",(0,u.default)("DataGrid",{"DataGrid--Resizing":!!e.state.resizing})),o.default.createElement("div",{className:"DataGrid-Toolbar"},o.default.createElement("button",{className:"Button",type:"button",onClick:e.toggleSearch},"Search"),o.default.createElement("div",{className:"DataGrid-DownloadPanel"},o.default.createElement("a",{className:"Button",href:"data.json",onClick:e.download.bind(this,"json")},"Export JSON"),o.default.createElement("a",{className:"Button",href:"data.csv",onClick:e.download.bind(this,"csv")},"Export CSV"))),o.default.createElement("div",{className:(0,u.default)("DataGrid-Search",{"DataGrid-Search--Open":e.state.search})},o.default.createElement("div",{className:"DataGrid-Search-Inner"},o.default.createElement("table",{className:"DataTable"},e.renderColumnModel(),o.default.createElement("thead",{className:"DataTable-Head",onChange:e.search},o.default.createElement("tr",{className:"DataTable-Row"},e.props.columnModel.map(function(e,t){return o.default.createElement("td",{key:t,className:"DataTable-Cell"},o.default.createElement("input",{className:"TextInput CellInput",type:"text","data-idx":t}))})))))),o.default.createElement("div",{className:"DataGrid-Body",ref:function(t){return e.tableWrapper=t}},o.default.createElement("div",{className:"DataTableWrap"},o.default.createElement("table",{className:"DataTable"},e.renderColumnModel(),o.default.createElement("thead",{className:"DataTable-Head",onClick:e.sortData,ref:function(t){return e.tableHead=t}},o.default.createElement("tr",{className:"DataTable-Row"},t)),o.default.createElement("tbody",{className:"DataTable-Body",onDoubleClick:e.showEditor},a)),o.default.createElement("div",{className:"DataTableResizer",ref:function(t){return e.DataTableResizer=t},style:{transform:"translateX(${self.resizing.moveX - self.resizing.startX}px)"}}))),o.default.createElement("div",{className:"DataGrid-Footer"},o.default.createElement("span",null,"Books Count: ",o.default.createElement("b",null,this.state.data.length))))}});t.default=h}).call(this)}finally{}},430:function(e,t){},509:function(e,t,a){try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}a(208);var t=a(138),l=e(t),n=a(211);a(209),a(210);var r=a(212),s=e(r),i={columnModel:[{title:"Book",field:"Book",width:"340px"},{title:"Author",field:"Author",width:"200px"},{title:"Language",field:"Language",width:"160px"},{title:"Published",field:"Published",width:"160px"},{title:"Sales",field:"Sales",width:"160px"}],data:[["The Lord of the Rings","J. R. R. Tolkien","English","1954–1955","150 million"],["Le Petit Prince (The Little Prince)","Antoine de Saint-Exupéry","French","1943","140 million"],["Harry Potter and the Philosopher's Stone","J. K. Rowling","English","1997","107 million"],["And Then There Were None","Agatha Christie","English","1939","100 million"],["Dream of the Red Chamber","Cao Xueqin","Chinese","1754–1791","100 million"],["The Hobbit","J. R. R. Tolkien","English","1937","100 million"],["She: A History of Adventure","H. Rider Haggard","English","1887","100 million"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"],["Book Title","Author","Language","Year","sales"]]};(0,n.render)(l.default.createElement(s.default,{columnModel:i.columnModel,initialData:i.data}),document.getElementById("mount-point"))}).call(this)}finally{}}},[509]);