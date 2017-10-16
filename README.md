# Exportable

A Vanilla-DataTables extension to allow for exporting to various formats.

NOTE: This extension is only compatable with `v2.0.0` and above of `Vanilla-DataTables`.

---

### Install

## Bower
```
bower install vanilla-datatables-exportable --save
```

## npm
```
npm install vanilla-datatables-exportable --save
```

---

### Browser

Grab the files from one of the CDNs and include them in your page:

```html
<link href="https://unpkg.com/vanilla-datatables-exportable@latest/datatable.exportable.min.css" rel="stylesheet" type="text/css">
<script src="https://unpkg.com/vanilla-datatables-exportable@latest/datatable.exportable.min.js" type="text/javascript"></script>

//or

<link href="https://cdn.jsdelivr.net/npm/vanilla-datatables-exportable@latest/datatable.exportable.min.css" rel="stylesheet" type="text/css">
<script src="https://cdn.jsdelivr.net/npm/vanilla-datatables-exportable@latest/datatable.exportable.min.js" type="text/javascript"></script>
```

You can replace `latest` with the required release number.

NOTE: Make sure the above js file is included AFTER the main Vanilla-DataTables js file.

---

## Options

```javascript
var datatable = new DataTable(myTable, {
    exportable: {
        // options go here
    }
});
```

### `type`
#### type: `String`
#### default: `undefined`

The format to export to: `json`, `csv` or `sql`.

### `download`
#### type: `Boolean`
#### default: `true`

Export the table data to chosen file format. Set to false to return a string.


### `filename`
#### type: `String`
#### default: `"datatable_export"`

The filename for the downloaded file.


### `skipColumns`
#### type: `Array`

A collection of column indexes to omit from the exported data.

NOTE: columns hidden with the `columns()` API will be omitted by default.


### `lineDelimiter`
#### type: `String`
#### default: `"\n"`

The line delimiter for CSV data.


### `columnDelimiter`
#### type: `String`
#### default: `","`

The column delimiter for CSV data.


### `tableName`
#### type: `String`
#### default: `"table"`

The MySQL table name for SQL data.


### `replacer`
#### type: `Array|Function`
#### default: `null`

The `JSON.stringify()` replacer parameter.

The `replacer` parameter can be either a function or an array. As a function, it takes two parameters, the key and the value being stringified. The object in which the key was found is provided as the replacer's `this` parameter. Initially it gets called with an empty key representing the object being stringified, and it then gets called for each property on the object or array being stringified. It should return the value that should be added to the JSON string, as follows:

* If you return a `Number`, the string corresponding to that number is used as the value for the property when added to the JSON string.
* If you return a `String`, that string is used as the property's value when adding it to the JSON string.
* If you return a `Boolean`, "true" or "false" is used as the property's value, as appropriate, when adding it to the JSON string.
* If you return any other object, the object is recursively stringified into the JSON string, calling the `replacer` function on each property, unless the object is a function, in which case nothing is added to the JSON string.
* If you return `undefined`, the property is not included (i.e., filtered out) in the output JSON string.


([More info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)).


### `space`
#### type: `Number|String`
#### default: `4`

The `JSON.stringify()` space argument. 

The space argument may be used to control spacing in the final string. If it is a number, successive levels in the stringification will each be indented by this many space characters (up to 10). If it is a string, successive levels will be indented by this string (or the first ten characters of it).

([More info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)).


### `modal`
#### type: `Boolean`
#### default: `true`

Shows the print modal when calling the `print()` method. Set to `false` to just display a printable version.


---

## Public Methods

Each of the following methods accepts an optional `Object` of options as it's only parameter to configure the exporter on the fly. These options will override the global options set above.

Methods are called using the `exportable` property of the current `Vanilla-DataTables` instance:

```javascript
datatable.exportable.methodName();
```

### `export(options)`
Export with given options.

```javascript
// Export to json string
datatable.exportable.export({
    type: "json",
});
```

You can also override global options:

```javascript
// Export to json string
datatable.exportable.export({
    type: "json",
    download: false,
    space: 2
});
```

### `toJSON()`
Export to JSON file.

```javascript
datatable.exportable.toJSON();

// Export to json string
datatable.exportable.toJSON({ download: false });
```


### `toCSV()`
Export to CSV file.

```javascript
datatable.exportable.toCSV();

// Export to csv string
datatable.exportable.toCSV({ download: false });
```


### `toSQL()`
Export to SQL file.

```javascript
datatable.exportable.toSQL();

// Export to sql string
datatable.exportable.toSQL({ download: false });
```


### `print()`
Print the table. This method will open a new window/tab and display a printable version of the table.

```javascript
datatable.exportable.print();
```


---

## Changelog

`v0.0.2`
* Add `modal` option for `print()` method.

`v0.0.1`
* Initial commit.


---

Copyright © 2017 Karl Saunders | MIT license