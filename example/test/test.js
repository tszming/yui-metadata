function testData(index) {

	var data = YAHOO.plugin.Metadata.get( YAHOO.util.Dom.get(this) );

	switch(index) {
	case 0:
		ok( data.foo == "bar", "Check foo property" );
		ok( data.bar == "baz", "Check baz property" );
		ok( data.arr[0] == 1, "Check arr[0] property" );
		ok( data.arr[1] == 2, "Check arr[1] property" );
		break;
	case 1:
		ok( data.test == "bar", "Check test property" );
		ok( data.bar == "baz", "Check bar property" );
		break;
	case 2:
		ok( data.zoooo == "bar", "Check zoooo property" );
		ok( data.bar.test == "baz", "Check bar.test property" );
		break;
	case 3:
		ok( data.number, "Check number property" );
		ok( data.stuff[0] == 2, "Check stuff[0] property" );
		ok( data.stuff[1] == 8, "Check stuff[1] property" );
		break;
	default:
		ok( false, ["Assertion failed on index ", index, ", with data ", data].join('') );
	}
}

YAHOO.plugin.Metadata.single = "";

test("meta: type attr - from data attribute", function() {
	expect(11);
	YAHOO.plugin.Metadata.setType("attr", "data");
	$("#one li").each(testData);
});

test("meta: type class - from className", function() {
	expect(11);
	YAHOO.plugin.Metadata.setType( "class" );
	$("#two li").each(testData);
});

test("meta: children script element - get data from child script element", function() {
	expect(11);
	YAHOO.plugin.Metadata.setType( "elem", "script" );
	$("#three li").each(testData);
});

test("check if window doesn't break anything", function() {
	$(window).get();
});

test("meta: default with single data object", function() {
	expect(11);
	YAHOO.plugin.Metadata.setType("attr","data");
	YAHOO.plugin.Metadata.defaults.single = "data";
	$("#four li").each(testData);
});

test("meta with select and class", function() {
	expect(2);
	YAHOO.plugin.Metadata.setType("class");
	YAHOO.plugin.Metadata.single = "stuff";
	var e = YAHOO.plugin.Metadata.get( YAHOO.util.Dom.get('meal') );
	ok( e, "data property" );
	ok( e.required, "property on data property" );
});

test("try to add and remove classes on metadata elements", function() {
	$("#two li").addClass("foobar").addClass("foo bar").removeClass("foobar");
	ok( $("#two li").is(".foo"), 'Check class foo was added.' );
	ok( $("#two li").is(".bar"), 'Check class bar was added.' );
});
