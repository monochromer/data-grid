import React from 'react';
import classNames from 'classnames';

import './datagrid.styl';


const DataGrid = React.createClass({  
    propTypes: {
      headers: React.PropTypes.arrayOf(React.PropTypes.string),
      initialData: React.PropTypes.arrayOf(
        React.PropTypes.arrayOf(React.PropTypes.string)
      ),
    },
    
    getInitialState() {
      return {
        columnModel: this.props.columnModel,
        data: this.props.initialData,
        sortby: null,
        descending: false,
        edit: null,
        search: false,
        resizing: null
      }
    },
    
    _preSearchData: null,
    
    componentDidMount() {
      this.tableWrapper.addEventListener('scroll', this.scrollHandler);
    },
    
    componentWillUnmount() {
      this.tableWrapper.removeEventListener('scroll', this.scrollHandler);
    },
    
    scrollHandler() {
      var scrollTop = this.tableWrapper.scrollTop;
      this.tableHead.style.transform = `translateY(${scrollTop}px)`;
    },
    
    sortData(e) {
      var column = e.target.cellIndex;
      var descending = this.state.sortby === column && !this.state.descending;
      var data = this.state.data.slice();
      
      data.sort(function(a, b) {
        return descending
          ? a[column] < b[column]
          : a[column] > b[column];
      });
      
      this.setState({
        data: data,
        sortby: column,
        descending: descending
      });
    },

    showEditor(e) {
      this.setState({
        edit: {
          cell: e.target.cellIndex,
          row: parseInt(e.target.dataset.rowIndex, 10)
          // row: e.target.parentNode.rowIndex
        }
      });
    },
    
    save(e) {
      e.preventDefault();
      var input = e.target.firstChild;
      var data = this.state.data.slice();
      data[this.state.edit.row][this.state.edit.cell] = input.value;
      this.setState({
        edit: null,
        data: data
      });
    },

    toggleSearch() {
      if (this.state.search) {
        this.setState({
          data: this._preSearchData,
          search: false
        });
        this._preSearchData = null;
      } else {
          this._preSearchData = this.state.data;
          this.setState({
            search: true
          });
      }
    },
    
    search: function(e) {
      var needle = e.target.value.toLowerCase();
      
      if (!needle) {
        this.setState({ data: this._preSearchData });
        return;
      }
      
      var idx = e.target.dataset.idx;
      var searchdata = this._preSearchData.filter(function (row) {
        return row[idx].toString().toLowerCase().indexOf(needle) > -1;
      });

      this.setState({ data: searchdata });
    },
    
    renderColumnModel() {
      return (
        <colgroup>
        {
          this.state.columnModel.map(function(item, index) {
            return <col key={index} style={{width: item.width}} />
          })
        }
        </colgroup>
      )
    },
    
    download(format, ev) {
      var contents = format === 'json'
        ? JSON.stringify(this.state.data)
        : this.state.data.reduce(function(result, row) {
            return result
              + row.reduce(function(rowresult, cell, idx) {
                  return rowresult
                    + '"'
                    + cell.replace(/"/g, '""')
                    + '"'
                    + (idx < row.length - 1 ? ',' : '');
                }, '')
              + "\n";
          }, '');

      var URL = window.URL || window.webkitURL;
      var blob = new Blob([contents], {type: 'text/' + format});
      ev.target.href = URL.createObjectURL(blob);
      ev.target.download = 'data.' + format;
    },
    
    // startResizing(e) {
    //   this.setState({
    //     resizing: {
    //       x: e.target.pageX
    //     }
    //   });
    //   document.addEventListener('mousemove', this.dragResizerHandler);
    // },
    // 
    // stopResizing() {
    //   this.setState({
    //     resizing: null
    //   });
    //   document.removeEventListener('mousemove', this.dragResizerHandler);
    // },
    // 
    // dragResizerHandler(e) {
    //   this.setState({
    //     resizing: {
    //       x: e.target.pageX
    //     }
    //   });
    // },
    
    render() {
        var self = this;

        var headers = self.props.columnModel.map(function(cellContent, index) {
          var content = cellContent.title;
          if (self.state.sortby === index) {
            content += self.state.descending ? ' \u2191' : ' \u2193'
          }
          return (
            <th key={index} className="DataTable-Cell DataTable-Cell--Head">
              {content}
              <div className="CellResizer" onMouseDown={self.startResizing} onMouseUp={self.stopResizing}></div>
            </th>
          )
        });
        
        var rows = this.state.data.map(function(row, rowIndex) {
          return (
            <tr key={rowIndex} className="DataTable-Row">
              {
                row.map(function(cell, cellIndex) {
                  var content = cell;
                  var edit = self.state.edit;
                  if (edit && edit.row === rowIndex && edit.cell === cellIndex) {
                    content = (
                      <form onSubmit={self.save}>
                        <input className="TextInput CellInput" type="text" defaultValue={content} autoFocus /> 
                      </form>
                    );
                  }
                  return <td key={cellIndex} data-row-index={rowIndex} className="DataTable-Cell">{content}</td>
                })
              }
            </tr>
          )
        })

        return (
            <div className="DataGrid" className={classNames("DataGrid", {"DataGrid--Resizing": self.state.resizing})}>
              <div className="DataGrid-Toolbar">
                <button className="Button" type="button" onClick={self.toggleSearch}>Search</button>
                
                <div className="DataGrid-DownloadPanel">
                  <a className="Button" href="data.json" onClick={self.download.bind(this, 'json')}>Export JSON</a>
                  <a className="Button" href="data.csv" onClick={self.download.bind(this, 'csv')}>Export CSV</a>
                </div>
              </div>
              
              <div className={ classNames('DataGrid-Search', {'DataGrid-Search--Open': self.state.search}) }>
                <div className="DataGrid-Search-Inner">
                  <table className="DataTable">
                    { self.renderColumnModel() }
                    <thead className="DataTable-Head" onChange={self.search}>
                      <tr className="DataTable-Row">
                        {
                          self.props.columnModel.map(function(cellContent, index) {
                            return (
                              <td key={index} className="DataTable-Cell">
                                <input className="TextInput CellInput" type="text" data-idx={index} />
                              </td>
                            )
                          })
                        }
                      </tr>
                    </thead> 
                  </table> 
                </div>
              </div>
              
              <div className="DataGrid-Body" ref={(c) => self.tableWrapper = c}>
                <div className="DataTableWrap">
                  <table className="DataTable">
                    { self.renderColumnModel() }
                    <thead className="DataTable-Head" onClick={self.sortData} ref={(c) => self.tableHead = c}>
                      <tr className="DataTable-Row">
                        { headers }
                      </tr>
                    </thead>
                    <tbody className="DataTable-Body" onDoubleClick={self.showEditor}>
                      { rows }
                    </tbody> 
                  </table>
                  
                  <div className="DataTableResizer" style={{transform: 'translateX(${self.resizing.x}px)'}}></div>
                </div>
              </div>
              
              <div className="DataGrid-Footer">
                <span>Books Count: <b>{this.state.data.length}</b></span>
              </div>
            </div>
        );
    }
});


export default DataGrid;