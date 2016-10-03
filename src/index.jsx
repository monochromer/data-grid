import React from 'react';
import { render } from 'react-dom';

import 'normalize.css/normalize.css';
import './common.styl';

var db = {
  "columnModel": [
    { title: "Book",      "field": "Book",      width: '340px' },
    { title: "Author",    "field": "Author",    width: '200px' },
    { title: "Language",  "field": "Language",  width: '160px' },
    { title: "Published", "field": "Published", width: '160px' },
    { title: "Sales",     "field": "Sales",     width: '160px' }
  ],
  "data": [
    [
      "The Lord of the Rings",
      "J. R. R. Tolkien",
      "English",
      "1954–1955",
      "150 million"
    ],
    [
      "Le Petit Prince (The Little Prince)",
      "Antoine de Saint-Exupéry",
      "French",
      "1943",
      "140 million"
    ],
    [
      "Harry Potter and the Philosopher's Stone",
      "J. K. Rowling",
      "English",
      "1997",
      "107 million"
    ],
    [
      "And Then There Were None",
      "Agatha Christie",
      "English",
      "1939",
      "100 million"
    ],
    [
      "Dream of the Red Chamber",
      "Cao Xueqin",
      "Chinese",
      "1754–1791",
      "100 million"
    ],
    [
      "The Hobbit",
      "J. R. R. Tolkien",
      "English",
      "1937",
      "100 million"
    ],
    [
      "She: A History of Adventure",
      "H. Rider Haggard",
      "English",
      "1887",
      "100 million"
    ],
    
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
    [ "Book Title", "Author", "Language", "Year", "sales"],
  ]
};

import DataGrid from './components/datagrid/datagrid.jsx';

render(
    <DataGrid columnModel={db.columnModel} initialData={db.data} />,
    document.getElementById('mount-point')
);