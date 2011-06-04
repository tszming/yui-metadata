/*
 * Metadata - Quietly extract JSON metadata contained within DOM elements
 *
 * @namespace YAHOO.plugin
 * @module metadata
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, Jorn Zaefferer, Paul McLanahan
 *
 * Ported to YUI from jQuery by tszming (tszming@gmail.com)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are three supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *
 * @name YAHOO.plugin.Metadata.setType
 *
 * @example <p id='one' class='some_class {item_id: 1, item_label: 'Label 1'}'>This is p1</p>
 * @before YAHOO.plugin.Metadata.setType('class')
 * @after YAHOO.plugin.Metadata.get( YAHOO.util.Dom.get('one') ).item_id == 1; YAHOO.plugin.Metadata.get( YAHOO.util.Dom.get('one') ).item_label == 'Label 1'
 * @desc Reads metadata from the class attribute
 *
 * @example <p id='two' class='some_class' data='{item_id: 2, item_label: 'Label 2'}'>This is p2</p>
 * @before YAHOO.plugin.Metadata.setType('attr', 'data')
 * @after YAHOO.plugin.Metadata.get( YAHOO.util.Dom.get('two') ).item_id == 2; YAHOO.plugin.Metadata.get( YAHOO.util.Dom.get('two') ).item_label == 'Label 2'
 * @desc Reads metadata from a 'data' attribute
 *
 * @example <p id='three' class='some_class'><script>{item_id: 3, item_label: 'Label 3'}</script>This is p3</p>
 * @before YAHOO.plugin.Metadata.setType('elem', 'script')
 * @after YAHOO.plugin.Metadata.get( YAHOO.util.Dom.get('three') ).item_id == 3; YAHOO.plugin.Metadata.get( YAHOO.util.Dom.get('three') ).item_label == 'Label 3'
 * @desc Reads metadata from a nested script element
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 */

YAHOO.namespace('plugin');

YAHOO.plugin.Metadata = {

    cache: {},

    defaults: {
        type: 'class',
        name: 'metadata',
        cre: /({.*})/,
        single: 'metadata'
    },

    setType: function(type, name) {
        this.defaults.type = type;
        this.defaults.name = name;
    },

    get: function(elem, opts) {

        var settings = this.defaults;
        opts = opts || {};
        if ('undefined' !== typeof opts.type) settings.type = opts.type;
        if ('undefined' !== typeof opts.name) settings.name = opts.name;

        // check for empty string in single property
        if (!settings.single.length) settings.single = 'metadata';

        var elemId = YAHOO.util.Dom.generateId(elem);
        if ('undefined' === typeof this.cache[elemId]) this.cache[elemId] = {};
        var data = this.cache[elemId][settings.single];

        // returned cached data if it already exists
        if (data) return data;

        data = '{}';

        if (settings.type == 'class') {
            var m = settings.cre.exec(elem.className);
            if (m) data = m[1];
        } else if (settings.type == 'elem') {
            if (!elem.getElementsByTagName) return;
            var e = elem.getElementsByTagName(settings.name);
            if (e.length) data = YAHOO.lang.trim(e[0].innerHTML);
        } else if (elem.getAttribute != undefined) {
            var attr = elem.getAttribute(settings.name);
            if (attr) data = attr;
        }

        if (data.indexOf('{') < 0) data = '{' + data + '}';

        data = eval('(' + data + ')');

        this.cache[elemId][settings.single] = data;

        return data;
    }
};

YAHOO.register('YAHOO.plugin.Metadata', YAHOO.plugin.Metadata, {version: '2.0', build: '2'});