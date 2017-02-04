ace.define("ace/mode/sas_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var SASHighlightRules = function() {

    this.$rules = {
        start: [{
            include: "#comments"
        }, {
            token: [
                "support.function.sas",
                "text",
                "entity.name.function.sas"
            ],
            regex: /(proc)( )(\w+)/,
            caseInsensitive: true
        }, {
            token: [
                "support.function.sas",
                "text",
                "constant.other.table-name.sas"
            ],
            regex: /^(data)( )([^\s]+)/,
            caseInsensitive: true
        }, {
            token: [
                "entity.other.attribute-name.sas",
                "text",
                "constant.other.library-name.sas",
                "constant.other.table-name.sas"
            ],
            regex: /\b(data|out)(=)((?:\w+\.)?)(\w*)\b/,
            caseInsensitive: true
        }, {
            token: "support.function.sas",
            regex: /\bsort|run|quit|output\b/,
            caseInsensitive: true
        }, {
            token: "constant.numeric.sas",
            regex: /\b\d+(?:\.\d+)*\b/
        }, {
            token: "constant.sas",
            regex: /\blow|high\b/
        }, {
            token: [
                "keyword.other.sas",
                "text",
                "variable.other.sas"
            ],
            regex: /\b(by)( )([^\s]+)\b/,
            caseInsensitive: true
        }, {
            token: [
                "keyword.other.sas",
                "text",
                "variable.other.sas"
            ],
            regex: /(keep|drop|retain|format|class|var)( )([\w\s]+)/,
            caseInsensitive: true
        }, {
            token: [
                "keyword.other.sas",
                "text",
                "constant.other.table-name.sas"
            ],
            regex: /\b(set|tables|merge)( )([\w\s]+)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.control.sas",
            regex: /\b(?:if|else|then|end)\b/
        }, {
            token: "keyword.other.order.sas",
            regex: /\bdescending\b/,
            caseInsensitive: true
        }, {
            token: "keyword.other.sas",
            regex: /\btitle\b/,
            caseInsensitive: true
        }, {
            token: "keyword.operator.star.sas",
            regex: /\*/
        }, {
            token: "keyword.operator.comparison.sas",
            regex: /\b<|>|eq|ne\b/
        }, {
            token: "keyword.null.sas",
            regex: / \. /
        }, {
            token: "keyword.operator.math.sas",
            regex: /-|\+|\//
        }, {
            token: "support.function.aggregate.sas",
            regex: /\b(?:avg|sum)(?=\s*\()/,
            caseInsensitive: true
        }, {
            token: [
                "constant.other.library-name.sas",
                "text",
                "constant.other.table-name.sas"
            ],
            regex: /(\w+?)(\.)(\w+)/
        }, {
            token: "text",
            regex: /proc sas;/,
            push: [{
                token: "text",
                regex: /quit;/,
                next: "pop"
            }, {
                include: "source.sas"
            }]
        }, {
            include: "#strings"
        }, {
            include: "#regexps"
        }],
        "#comments": [{
            token: [
                "comment.line.asterisk.sas",
                "punctuation.definition.comment.sas",
                "comment.line.asterisk.sas"
            ],
            regex: /^(\s*)(\*)(.*;\s*$)/
        }, {
            token: "punctuation.definition.comment.sas",
            regex: /\/\*/,
            push: [{
                token: "punctuation.definition.comment.sas",
                regex: /\*\//,
                next: "pop"
            }, {
                defaultToken: "comment.block.c"
            }]
        }],
        "#string_escape": [{
            token: "constant.character.escape.sas",
            regex: /\\./
        }],
        "#string_interpolation": [{
            token: [
                "punctuation.definition.string.end.sas",
                "string.interpolated.sas",
                "string.interpolated.sas"
            ],
            regex: /(#\{)([^\}]*)(\})/
        }],
        "#strings": [{
            token: [
                "punctuation.definition.string.begin.sas",
                "string.quoted.single.sas",
                "string.quoted.single.sas"
            ],
            regex: /(')([^'\\]*)(')/,
            comment: "this is faster than the next begin/end rule since sub-pattern will match till end-of-line and sas files tend to have very long lines."
        }, {
            token: "punctuation.definition.string.begin.sas",
            regex: /'/,
            push: [{
                token: "punctuation.definition.string.end.sas",
                regex: /'/,
                next: "pop"
            }, {
                include: "#string_escape"
            }, {
                defaultToken: "string.quoted.single.sas"
            }]
        }, {
            token: [
                "punctuation.definition.string.begin.sas",
                "string.quoted.other.backtick.sas",
                "string.quoted.other.backtick.sas"
            ],
            regex: /(`)([^`\\]*)(`)/,
            comment: "this is faster than the next begin/end rule since sub-pattern will match till end-of-line and sas files tend to have very long lines."
        }, {
            token: "punctuation.definition.string.begin.sas",
            regex: /`/,
            push: [{
                token: "punctuation.definition.string.end.sas",
                regex: /`/,
                next: "pop"
            }, {
                include: "#string_escape"
            }, {
                defaultToken: "string.quoted.other.backtick.sas"
            }]
        }, {
            token: [
                "punctuation.definition.string.begin.sas",
                "string.quoted.double.sas",
                "string.quoted.double.sas"
            ],
            regex: /(")([^"#]*)(")/,
            comment: "this is faster than the next begin/end rule since sub-pattern will match till end-of-line and sas files tend to have very long lines."
        }, {
            token: "punctuation.definition.string.begin.sas",
            regex: /"/,
            push: [{
                token: "punctuation.definition.string.end.sas",
                regex: /"/,
                next: "pop"
            }, {
                include: "#string_interpolation"
            }, {
                defaultToken: "string.quoted.double.sas"
            }]
        }, {
            token: "punctuation.definition.string.begin.sas",
            regex: /%\{/,
            push: [{
                token: "punctuation.definition.string.end.sas",
                regex: /\}/,
                next: "pop"
            }, {
                include: "#string_interpolation"
            }, {
                defaultToken: "string.other.quoted.brackets.sas"
            }]
        }]
    }
    
    this.normalizeRules();
};

SASHighlightRules.metaData = {
    fileTypes: ["sas"],
    foldingStartMarker: "(proc|data|%macro).*;$",
    foldingStopMarker: "(run|quit|%mend);",
    name: "SAS",
    scopeName: "source.sas"
}


oop.inherits(SASHighlightRules, TextHighlightRules);

exports.SASHighlightRules = SASHighlightRules;
});

ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/sas",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sas_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var SASHighlightRules = require("./sas_highlight_rules").SASHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = SASHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/sas"
}).call(Mode.prototype);

exports.Mode = Mode;
});
