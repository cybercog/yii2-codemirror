var codemirroredit{$id} = CodeMirror.fromTextArea(document.getElementById('{$id}'),
{
	mode: '".$mode."',
	
	tabSize: 4,
    indentUnit: 4,
    indentWithTabs: true,
	styleActiveLine: true,
	lineNumbers: true,
	lineWrapping: true,
	autoCloseBrackets: true,
	autoCloseTags: true,
	viewportMargin: Infinity,
	theme: 'solarized dark',
	showTrailingSpace: true,
	matchTags: true,
	matchBrackets: true,
	highlightSelectionMatches: {showToken: /\w/},
	enterMode: 'keep',
    tabMode: 'shift',
    
	gutters: ['CodeMirror-linenumbers', 'breakpoints'],
	
	extraKeys: {
        'F11': function(cm) {
          setFullScreen(cm, !isFullScreen(cm));
        },
        'Esc': function(cm) {
          if (isFullScreen(cm)) setFullScreen(cm, false);
        },
        'Ctrl-J': 'toMatchingTag',
        'Ctrl-Space': 'autocomplete'
  	}
});

function isFullScreen(cm) {
	return /\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className);
}
function winHeight() {
	return window.innerHeight || (document.documentElement || document.body).clientHeight;
}
function setFullScreen(cm, full) {
	var wrap = cm.getWrapperElement();
	if (full) {
		wrap.className += " CodeMirror-fullscreen";
		wrap.style.height = winHeight() + "px";
		document.documentElement.style.overflow = "hidden";
	} else {
		wrap.className = wrap.className.replace(" CodeMirror-fullscreen", "");
		wrap.style.height = "";
		document.documentElement.style.overflow = "";
	}
	cm.refresh();
}
CodeMirror.on(window, "resize", function() {
	var showing = document.body.getElementsByClassName("CodeMirror-fullscreen")[0];
	if (!showing) return;
	showing.CodeMirror.getWrapperElement().style.height = winHeight() + "px";
});
var input = document.getElementById("select");
function selectTheme() {
	var theme = input.options[input.selectedIndex].innerHTML;
	editor.setOption("theme", theme);
}
var choice = document.location.search && decodeURIComponent(document.location.search.slice(1));
if (choice) {
	input.value = choice;
	editor.setOption("theme", choice);
}

var charWidth = editor.defaultCharWidth(), basePadding = 4;
editor.on("renderLine", function(cm, line, elt) {
	var off = CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth;
	elt.style.textIndent = "-" + off + "px";
	elt.style.paddingLeft = (basePadding + off) + "px";
});
editor.on("gutterClick", function(cm, n) {
	var info = cm.lineInfo(n);
	cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
});

function makeMarker() {
	var marker = document.createElement("div");
	marker.style.color = "#822";
	marker.innerHTML = "?";
	return marker;
}
editor.refresh();