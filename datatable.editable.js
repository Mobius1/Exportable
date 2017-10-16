/*! Exportable 0.0.1
 * © 2017 Karl Saunders
 */
/**
 * @summary     Exportable
 * @description Vanilla-DataTables extension to allow for exporting to various formats
 * @version     0.0.1
 * @file        datatable.editable.js
 * @author      Karl Saunders
 * @contact     mobius1@gmx.com
 * @copyright   Copyright 2017 Karl Saunders
 *
 *
 * This source file is free software, available under the following license:
 *   MIT license - https://github.com/Mobius1/Vanilla-DataTables/blob/master/LICENSE
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: https://github.com/Mobius1/Vanilla-DataTables
 */
if (window.DataTable) {
    DataTable.extend("exportable", function(instance, config, utils) {

        /**
         * Default configuration
         * @type {Object}
         */
        var defaultConfig = {
            download: true,
            skipColumns: [],

            // csv
            lineDelimiter: "\n",
            columnDelimiter: ",",

            // sql
            tableName: "table",

            // json
            replacer: null,
            space: 4
        };

        var Exporter = function() {};

        /**
         * Initialise instance of Exporter
         * @return {[type]} [description]
         */
        Exporter.prototype.init = function() {
        	if ( !this.initialised ) {
            	this.config = utils.extend(defaultConfig, config);

            	this.initialised = true;
        	}
        };

        /**
         * Export with options
         * @param  {Object} config Export options
         * @return {[type]}        [description]
         */
        Exporter.prototype.export = function(config) {
            if (config && utils.isObject(config)) {
                this.config = utils.extend(this.config, config);
            }
            switch (this.config.type.toLowerCase()) {
                case "json":
                    this.toJSON();
                    break;
                case "sql":
                    this.toSQL();
                    break;
                case "csv":
                    this.toCSV();
                    break;
            }
        };

        /**
         * Export to json
         * @param  {Object} config JSON options
         * @return {String}        JSON string
         */
        Exporter.prototype.toJSON = function(config) {

            if (config && utils.isObject(config)) {
                this.config = utils.extend(this.config, config);
            }

            this.config.type = "json";

            var str = "",
                data = [],
                o = this.config,
                table = instance.table;

            utils.each(table.rows, function(row, n) {
                data[n] = data[n] || {};

                utils.each(row.cells, function(cell, i) {
                    if (!cell.hidden && o.skipColumns.indexOf(cell.index) < 0) {
                        data[n][table.header.cells[cell.index].content] = table.rows[n].cells[cell.index].content;
                    }
                })
            });

            // Convert the array of objects to JSON string
            str = JSON.stringify(data, o.replacer, o.space);

            if (o.download) {
                this.string = "data:application/json;charset=utf-8," + str;
                this.download();
            }

            return str;
        };

        /**
         * Export to csv
         * @param  {Object} config CSV options
         * @return {String}        CSV string
         */
        Exporter.prototype.toCSV = function(config) {
            if (config && utils.isObject(config)) {
                this.config = utils.extend(this.config, config);
            }

            this.config.type = "csv";

            var str = "",
                data = [],
                o = this.config,
                table = instance.table;

            utils.each(table.rows, function(row, n) {
                data[n] = data[n] || {};

                utils.each(row.cells, function(cell, i) {
                    if (!cell.hidden && o.skipColumns.indexOf(cell.index) < 0) {
                        str += cell.content + o.columnDelimiter;
                    }
                });

                // Remove trailing column delimiter
                str = str.trim().substring(0, str.length - 1);

                // Apply line delimiter
                str += o.lineDelimiter;
            });

            // Remove trailing line delimiter
            str = str.trim().substring(0, str.length - 1);

            if (o.download) {
                this.string = "data:text/csv;charset=utf-8," + str;
                this.download();
            }
        };

        /**
         * Export to sql
         * @param  {Object} config SQL options
         * @return {String}        SQL string
         */
        Exporter.prototype.toSQL = function(config) {
            if (config && utils.isObject(config)) {
                this.config = utils.extend(this.config, config);
            }

            this.config.type = "sql";

            var o = this.config,
                table = instance.table;

            // Begin INSERT statement
            var str = "INSERT INTO `" + o.tableName + "` (";

            // Convert table headings to column names
            utils.each(table.header.cells, function(cell) {
                if (!cell.hidden && o.skipColumns.indexOf(cell.index) < 0) {
                    str += "`" + cell.content + "`,";
                }
            });

            // Remove trailing comma
            str = str.trim().substring(0, str.length - 1);

            // Begin VALUES
            str += ") VALUES ";

            // Iterate rows and convert cell data to column values
            utils.each(table.rows, function(row) {
                str += "(";

                utils.each(row.cells, function(cell) {
                    if (!cell.hidden && o.skipColumns.indexOf(cell.index) < 0) {
                        str += "`" + cell.content + "`,";
                    }
                });

                // Remove trailing comma
                str = str.trim().substring(0, str.length - 1);

                // end VALUES
                str += "),";
            });

            // Remove trailing comma
            str = str.trim().substring(0, str.length - 1);

            // Add trailing colon
            str += ";";

            if (o.download) {
                this.string = "data:application/sql;charset=utf-8," + str;
                this.download();
            }

            return str;
        };

        /**
         * Trigger download
         * @param  {String} str The formatted file contents
         * @return {Void}
         */
        Exporter.prototype.download = function(str) {

            // Download
            if (this.string) {
                // Filename
                this.config.filename = this.config.filename || "datatable_export";
                this.config.filename += "." + this.config.type;

                this.string = encodeURI(this.string);

                // Create a link to trigger the download
                var link = document.createElement("a");
                link.href = this.string;
                link.download = this.config.filename;

                // Append the link
                document.body.appendChild(link);

                // Trigger the download
                link.click();

                // Remove the link
                document.body.removeChild(link);
            }
        };

        /**
         * Print table
         * @return {Void}
         */
        Exporter.prototype.print = function() {
            var table = document.createElement("table"),
                thead = document.createElement("thead"),
                tbody = document.createElement("tbody");

            table.appendChild(thead);
            table.appendChild(tbody);

            utils.each(instance.table.header.cells, function(cell) {
                thead.appendChild(cell.node.cloneNode(true));
            });

            utils.each(instance.table.rows, function(row) {
                tbody.appendChild(row.node.cloneNode(true));
            });

            // Open new window
            var w = window.open();

            // Append the table to the body
            w.document.body.appendChild(table);

            // Print
            w.focus(); // IE
            w.print();
        };

        return new Exporter();
    });
}