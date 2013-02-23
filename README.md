Introduction
----------------

Quietly extract JSON metadata contained within DOM elements.

 * Ported from jQuery: http://code.google.com/p/jqueryjs/source/browse/#svn/tags/plugins/metadata/2.0

----
### Basic Usage

1. Include the scripts required:

        <script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/yahoo/yahoo-min.js"></script>
        <script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/dom/dom-min.js"></script>
        <script type="text/javascript" src="metadata-min.js"></script>

2. Store the data in DOM elements

        <p id="one" class="some_class {item_id: 1, item_label: 'Label 1'}">This is p1</p>
        <p id="two" class="some_class" data="{item_id: 2, item_label: 'Label 2'}">This is p2</p>
        <p id="three" class="some_class"><script type= "text/javascript">{item_id: 3, item_label: 'Label 3'}</script>This is p3</p>

3. Retrieve using metadata

        var dom = YAHOO.util.Dom;
        var metadata = YAHOO.plugin.Metadata;
        
        
        metadata.setType("class");
        document.write( metadata.get( dom.get("one") ).item_id + ", " + metadata.get( dom.get("one") ).item_label + "<br />");
        
        
        metadata.setType("attr", "data");
        document.write( metadata.get( dom.get("two") ).item_id + ", " + metadata.get( dom.get("two") ).item_label + "<br />");
        
        
        metadata.setType("elem", "script");
        document.write( metadata.get( dom.get("three") ).item_id + ", " + metadata.get( dom.get("three") ).item_label + "<br />");


----
### Using YUI Loader 

        <script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/yuiloader/yuiloader-min.js"></script>


        <script type="text/javascript">
        
            var loader = new YAHOO.util.YUILoader({
        
                onSuccess: function() {
        
                    var dom = YAHOO.util.Dom;
                    var metadata = YAHOO.plugin.Metadata;
                   
                    // do something with metadata
                 }
            });
        
            loader.addModule({
                name: "metadata",
                type: "js",
                fullpath: "http://yui-metadata.googlecode.com/svn/trunk/yui-metadata/metadata-min.js",
                varName: "YAHOO.plugin.Metadata",
                requires: ['yahoo', 'dom']
            });
        
            loader.require("metadata");
            loader.insert();
        
        </script>

----
### License

Copyright (c) 2006 John Resig, Yehuda Katz, Jorn Zaefferer, Paul McLanahan

Ported to YUI from jQuery by tszming (tszming@gmail.com)

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
