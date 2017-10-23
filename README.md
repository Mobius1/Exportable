# Exportable
[![npm version](https://badge.fury.io/js/vanilla-datatables-exportable.svg)](https://badge.fury.io/js/vanilla-datatables-exportable) [![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Mobius1/Exportable/blob/master/LICENSE) ![](http://img.badgesize.io/Mobius1/Exportable/master/datatable.exportable.min.js) ![](http://img.badgesize.io/Mobius1/Exportable/master/datatable.exportable.min.js?compression=gzip&label=gzipped)

A Vanilla-DataTables extension to allow for exporting to various formats.

NOTE: This extension is only compatable with `v2.0.0` and above of `Vanilla-DataTables`.

[DEMO](https://codepen.io/Mobius1/pen/QqJbmY/)

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

Grab the file from one of the CDNs and include them in your page:

```html
<script src="https://unpkg.com/vanilla-datatables-exportable@latest/datatable.exportable.min.js" type="text/javascript"></script>

//or

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

| Option             | Type             | Default              | Effect                                                                                                                                                                            |
|--------------------|------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`             | `string`         | `"json"`             | The format to export to: `json`, `csv` or `sql`.                                                                                                                                  |
| `download`         | `boolean`        | `true`               | Export the table data to chosen file format. Set to false to return a `string`.                                                                                                   |
| `escapeHTML`       | `boolean`        | `true`               | Strip HTML from the exported data.                                                                                                                                                |
| `filename`         | `string`         | `"datatable_export"` | The filename for the downloaded file.                                                                                                                                             |
| `skipColumns`      | `array`          | `undefined`          | A collection of column indexes to omit from the exported data.                                                                                                                    |
| `pages`            | `number|array`   | `undefined`          | A single page or collection of pages to export. All other pages will be omitted.                                                                                                  |
| `lineDelimiter`    | `string`         | `"\n"`               | The line delimiter for CSV or text data.                                                                                                                                                  |
| `columnDelimiter`  | `string`         | `","`                | The column delimiter for CSV or text data.                                                                                                                                                |
| `includeHeadings`  | `boolean`        | `true`               | Set the first line of the CSV string as the table headings.                                                                                                                       |
| `tableName`        | `string`         | `"table"`            | The MySQL table name for SQL data.                                                                                                                                                |
| `columnize`        | `boolean`        | `false`              | Format the text string into columns.                                                                                                                                                |
| `paddingCharacter` | `string`         | `" "`                | The character used to pad the columns when `columnize` is enabled.                                                                                                                                               |
| `replacer`         | `array|function` | `undefined`          | The `JSON.stringify()` replacer parameter. ([More info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)). |
| `space`            | `number|string`  |                      | The `JSON.stringify()` space argument. ([More info](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)).     |
| `modal`            | `boolean`        | `true`               | Shows the print modal when calling the `print()` method. Set to `false` to just display a printable version.                                                                      |

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

### `toText()`
Export to plain text file.

```javascript
datatable.exportable.toText();

// Export to json string
datatable.exportable.toText({ download: false });


// Columnize the data
datatable.exportable.toText({ columnize: true, paddingCharacter: " | " });

// before:
Conan the Barbarian|1982|Conan|
Conan the Destroyer|1984|Conan|
The Terminator|1984|T-800 / Terminator|
Red Sonja|1985|Kalidor|
Commando|1985|Colonel John Matrix|
Raw Deal|1986|Kaminsky|
Predator|1987|Major Alan "Dutch" Schaefer|
The Running Man|1987|Ben Richards|
Red Heat|1988|Captain Ivan Danko|
Twins|1988|Julius Benedict|
Total Recall|1990|Douglas Quaid / Hauser|
Kindergarten Cop|1990|Detective John Kimble|
Terminator 2: Judgment Day|1991|T-800|
Last Action Hero|1993|Jack Slater / Himself|Also executive producer

// after
Conan the Barbarian        | 1982 | Conan                       |                        
Conan the Destroyer        | 1984 | Conan                       |                        
The Terminator             | 1984 | T-800 / Terminator          |                        
Red Sonja                  | 1985 | Kalidor                     |                        
Commando                   | 1985 | Colonel John Matrix         |                        
Raw Deal                   | 1986 | Kaminsky                    |                        
Predator                   | 1987 | Major Alan "Dutch" Schaefer |                        
The Running Man            | 1987 | Ben Richards                |                        
Red Heat                   | 1988 | Captain Ivan Danko          |                        
Twins                      | 1988 | Julius Benedict             |                        
Total Recall               | 1990 | Douglas Quaid / Hauser      |                        
Kindergarten Cop           | 1990 | Detective John Kimble       |                        
Terminator 2: Judgment Day | 1991 | T-800                       |                        
Last Action Hero           | 1993 | Jack Slater / Himself       | Also executive producer


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

`v0.0.9`
* Added `toText()` method to export to text file/string;
* Allow formatting (padding) of text string to columns

`v0.0.7`
* Allow export of headings in CSV strings ([#1](https://github.com/Mobius1/Exportable/issues/1))
* Allow HTML to be stripped ([#1](https://github.com/Mobius1/Exportable/issues/1))

`v0.0.6`
* Added `destroy()` method
* Fix bug causing filename concatenation

`v0.0.5`
* Fix incorrect filename reference

`v0.0.4`
* Fix `toCSV()` method not returning string.

`v0.0.3`
* Incorrect file names.

`v0.0.2`
* Add `modal` option for `print()` method.

`v0.0.1`
* Initial commit.


---

Copyright © 2017 Karl Saunders | MIT license