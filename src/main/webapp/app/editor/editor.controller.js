'use strict'

var sampleText="proc surveyselect data=EastHigh method=srs n=15 out=sample1;"
    ;


(function() {
    'use strict';

    angular
        .module('staceyEditorApp')
        .controller('EditorController', EditorController);

    EditorController.$inject = ['$scope', '$state', '$stateParams', 'entity', 'File', 'FileState', '$window'];

    function EditorController ($scope, $state, $stateParams, entity, File, FileState, $window) {
        var vm = this;


        var langTools = ace.require("ace/ext/language_tools");
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/textmate");
        editor.getSession().setMode("ace/mode/sas");

        var sasCompleter = {
            getCompletions: function (editor, session, pos, prefix, callback) {
                var sasFirstExpList =  ["axis",
                                        "call",
                                        "catname",
                                        "checkpoint execute_always",
                                        "comment",
                                        "data",
                                        "dm",
                                        "endrsubmit",
                                        "endsas",
                                        "filename",
                                        "footnote",
                                        "goptions",
                                        "goption",
                                        "killtask",
                                        "legend",
                                        "libname",
                                        "listtask",
                                        "lock",
                                        "ods",
                                        "option",
                                        "options",
                                        "page",
                                        "pattern",
                                        "proc",
                                        "procedure",
                                        "quit",
                                        "rdisplay",
                                        "resetline",
                                        "rget",
                                        "rsubmit",
                                        "run",
                                        "run cancel",
                                        "sasfile",
                                        "signoff",
                                        "signon",
                                        "skip",
                                        "symbol",
                                        "sysecho",
                                        "systask",
                                        "waitfor",
                                        "%abort",
                                        "%armconv",
                                        "%armend",
                                        "%armgtid",
                                        "%arminit",
                                        "%armjoin",
                                        "%armproc",
                                        "%armstop",
                                        "%armstrt",
                                        "%armupdt",
                                        "%copy",
                                        "%display",
                                        "%do",
                                        "%do %until",
                                        "%do %while",
                                        "%else",
                                        "%end",
                                        "%global",
                                        "%goto",
                                        "%if",
                                        "%include",
                                        "%input",
                                        "%let",
                                        "%list",
                                        "%local",
                                        "%macro",
                                        "%mend",
                                        "%perfend",
                                        "%perfinit",
                                        "%perfstop",
                                        "%perfstrt",
                                        "%put",
                                        "%return",
                                        "%run",
                                        "%symdel",
                                        "%syscall",
                                        "%sysexec",
                                        "%syslput",
                                        "%sysmacdelete",
                                        "%sysmstoreclear",
                                        "%sysrput",
                                        "%until",
                                        "%while",
                                        "%window"
                                        ];

                var sasFirstExpListWithPercent =  ["abort",
                                        "armconv",
                                        "armend",
                                        "armgtid",
                                        "arminit",
                                        "armjoin",
                                        "armproc",
                                        "armstop",
                                        "armstrt",
                                        "armupdt",
                                        "copy",
                                        "display",
                                        "do",
                                        "do %until",
                                        "do %while",
                                        "else",
                                        "end",
                                        "global",
                                        "goto",
                                        "if",
                                        "include",
                                        "input",
                                        "let",
                                        "list",
                                        "local",
                                        "macro",
                                        "mend",
                                        "perfend",
                                        "perfinit",
                                        "perfstop",
                                        "perfstrt",
                                        "put",
                                        "return",
                                        "run",
                                        "symdel",
                                        "syscall",
                                        "sysexec",
                                        "syslput",
                                        "sysmacdelete",
                                        "sysmstoreclear",
                                        "sysrput",
                                        "until",
                                        "while",
                                        "window"
                                        ];

                var expListAfterAxis =  ["caxis=",
                                        "color=",
                                        "ctext=",
                                        "interval=",
                                        "label=",
                                        "label=none",
                                        "length=",
                                        "logbase=",
                                        "logstyle=",
                                        "major=",
                                        "major=none",
                                        "minor=",
                                        "minor=none",
                                        "nobrackets",
                                        "noplane",
                                        "offset=",
                                        "order=",
                                        "origin=",
                                        "reflabel=",
                                        "reflabel=none",
                                        "split=",
                                        "stagger",
                                        "style=",
                                        "value=",
                                        "value=none",
                                        "width="
                                        ];

                var expListAfterData =  ["pgm=",
                                        "view=",
                                        "_null_"
                                        ];

                var expListAfterFilename =  ["align",
                                        "alq=",
                                        "altdest=",
                                        "attach=",
                                        "batchfile=",
                                        "baud=",
                                        "bcc=",
                                        "binary",
                                        "bits=",
                                        "blk=",
                                        "blksize=",
                                        "block",
                                        "blocksize=",
                                        "bom",
                                        "bomfile",
                                        "buffer=",
                                        "burst",
                                        "byte",
                                        "catalog",
                                        "cc=",
                                        "cd=",
                                        "char1=",
                                        "char2=",
                                        "char3=",
                                        "char4=",
                                        "clear",
                                        "client",
                                        "clipbrd",
                                        "close",
                                        "command",
                                        "commport",
                                        "comtimeout=",
                                        "console=",
                                        "content_type=",
                                        "copies=",
                                        "ct=",
                                        "dataclas=",
                                        "dde",
                                        "debug",
                                        "deliverreceipt",
                                        "deq=",
                                        "desc=",
                                        "dest=",
                                        "dir",
                                        "disk",
                                        "disp=",
                                        "drivemap",
                                        "dropnull=",
                                        "dsntype=",
                                        "dsorg=",
                                        "dummy",
                                        "email",
                                        "encoding=",
                                        "eofconnect",
                                        "expires=",
                                        "ext=",
                                        "extension=",
                                        "fac=",
                                        "fcb=",
                                        "filedata=",
                                        "fileext",
                                        "flash=",
                                        "flashc=",
                                        "flow=",
                                        "fold",
                                        "formdef=",
                                        "forms=",
                                        "from=",
                                        "ftp",
                                        "gsfcc=",
                                        "gterm",
                                        "hfs",
                                        "hold",
                                        "host=",
                                        "hostresponselen=",
                                        "hotlink",
                                        "http",
                                        "id=",
                                        "ignoredoseof",
                                        "importance=",
                                        "key=",
                                        "keyvalue=",
                                        "label=",
                                        "library",
                                        "like=",
                                        "list",
                                        "localcache=",
                                        "lockduration=",
                                        "lockinternal=",
                                        "lowcase_memname",
                                        "lrecl=",
                                        "ls",
                                        "lsa",
                                        "lsfile=",
                                        "mbc=",
                                        "mbf=",
                                        "message",
                                        "mget",
                                        "mgmtclas=",
                                        "mod",
                                        "modify=",
                                        "modifyt=",
                                        "mprompt",
                                        "mvs",
                                        "name=",
                                        "namepipe",
                                        "new",
                                        "noblock",
                                        "nobom",
                                        "nobomfile",
                                        "nomount",
                                        "nomvstrans",
                                        "noprompt",
                                        "notab",
                                        "notesdb",
                                        "old",
                                        "optcd=",
                                        "options=",
                                        "outdes=",
                                        "outencoding=",
                                        "outlim=",
                                        "pagedef=",
                                        "parity=",
                                        "parm1=",
                                        "parm2=",
                                        "parm3=",
                                        "parm4=",
                                        "parm5=",
                                        "pass=",
                                        "passive",
                                        "password=",
                                        "path",
                                        "pgm=",
                                        "pipe",
                                        "plotter",
                                        "port=",
                                        "ppass",
                                        "printer",
                                        "prmode=",
                                        "prompt",
                                        "proxy=",
                                        "puser=",
                                        "pw=",
                                        "pwd=",
                                        "rcmd=",
                                        "rconst=",
                                        "readreceipt",
                                        "recfm=",
                                        "reconn=",
                                        "recorg=",
                                        "replyto='",
                                        "retry=",
                                        "reuse",
                                        "rhelp",
                                        "rmulti=",
                                        "rstat",
                                        "s370v",
                                        "s370vs",
                                        "sasxbamw",
                                        "saveuser",
                                        "server",
                                        "sftp",
                                        "shr=",
                                        "socket",
                                        "space=",
                                        "stop=",
                                        "stopclas=",
                                        "subject=",
                                        "subsys=",
                                        "sysout=",
                                        "tape",
                                        "temp",
                                        "terminal",
                                        "termstr=",
                                        "to=",
                                        "type=",
                                        "ucs=",
                                        "ucsver",
                                        "uid=",
                                        "unbuf",
                                        "unit=",
                                        "uprinter",
                                        "url",
                                        "user=",
                                        "verify",
                                        "volcount=",
                                        "volseq=",
                                        "volser=",
                                        "wait=",
                                        "wait_milliseconds=",
                                        "wconst=",
                                        "webdav",
                                        "wmulti="
                                        ];

                var completersList = [];
                var currline = editor.getSelectionRange().start.row;
                var wholelinetxt = editor.session.getLine(currline);
                var lineWithoutLeftAndRightSpace = wholelinetxt.trim();
                var lineWithoutLeftSpace = wholelinetxt.trimLeft();
                var lineLastCharacter = wholelinetxt.slice(-1);
                var lineContainsSpaceInTheMiddle = false;
                var lineFinishesWithSpace = false;
                var lineStartsWithPercent = false;

                if (lineWithoutLeftAndRightSpace.indexOf(' ') >= 0) {
                    lineContainsSpaceInTheMiddle = true;
                }
                if (lineLastCharacter.indexOf(' ') >= 0) {
                    lineFinishesWithSpace = true;
                }
                if (lineWithoutLeftSpace.charAt(0) === '%') {
                    lineStartsWithPercent = true;
                }

                if (!lineContainsSpaceInTheMiddle) {
                    if (!lineFinishesWithSpace) {
                        if (!lineStartsWithPercent) {
                            completersList = sasFirstExpList;
                        } else {
                            completersList = sasFirstExpListWithPercent;
                        }
                    } else {
                        if (lineWithoutLeftAndRightSpace === 'axis') {
                            completersList = expListAfterAxis;
                        }
                        if (lineWithoutLeftAndRightSpace === 'data') {
                            completersList = expListAfterData;
                        }
                        if (lineWithoutLeftAndRightSpace === 'filename') {
                            completersList = expListAfterFilename;
                        }
                    }
                }

                callback(null, completersList.map(function (sasExp) {
                    return {
                        caption: sasExp,
                        value: sasExp,
                        meta: "language"
                    };
                }));
            }
        }

        langTools.setCompleters([sasCompleter]);

        editor.setOptions({
            enableBasicAutocompletion: true
            //,enableLiveAutocompletion: true
        });

        load();

        function load(){
            editor.session.setValue(sampleText)
            //TODO load entity.filestate.content
        }

        function register () {
            $state.go('register');
        }

        function saveFile() {
            vm.isSaving = true;
            if (vm.file.id !== null) {
                File.update(vm.file, onSaveSuccess, onSaveError);
                FileState.save({
                    fileForStateId : vm.file.id,
                    content : editor.session.getValue(),
                    contentContentType : 'TextBlob',
                }, onSaveSuccess, onSaveError);
            } else {
                File.save(vm.file, onSaveSuccess, onSaveError);
                FileState.save({
                    fileForStateId : vm.file.id,
                    content : editor.session.getValue(),
                    contentContentType : 'Clob',
                }, onSaveSuccess, onSaveError);
            }
        }

        vm.saveFile = saveFile;

        function onSaveSuccess (result) {
            alert('success');
            vm.isSaving = false;
        }

        function onSaveError () {
            alert('error');
            vm.isSaving = false;
        }
    }

})();
