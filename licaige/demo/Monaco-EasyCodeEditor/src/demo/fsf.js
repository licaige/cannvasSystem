import * as monaco from "monaco-editor";

let sqlStr = "ADD,EXCEPT,PERCENT,ALL,EXEC,PLAN,ALTER,EXECUTE,PRECISION,AND,EXISTS,PRIMARY,ANY,EXIT,PRINT,AS,FETCH,PROC,ASC,FILE,PROCEDURE,AUTHORIZATION,FILLFACTOR,PUBLIC,BACKUP,FOR,RAISERROR,BEGIN,FOREIGN,READ,BETWEEN,FREETEXT,READTEXT,BREAK,FREETEXTTABLE,RECONFIGURE,BROWSE,FROM,REFERENCES,BULK,FULL,REPLICATION,BY,FUNCTION,RESTORE,CASCADE,GOTO,RESTRICT,CASE,GRANT,RETURN,CHECK,GROUP,REVOKE,CHECKPOINT,HAVING,RIGHT,CLOSE,HOLDLOCK,ROLLBACK,CLUSTERED,IDENTITY,ROWCOUNT,COALESCE,IDENTITY_INSERT,ROWGUIDCOL,COLLATE,IDENTITYCOL,RULE,COLUMN,IF,SAVE,COMMIT,IN,SCHEMA,COMPUTE,INDEX,SELECT,CONSTRAINT,INNER,SESSION_USER,CONTAINS,INSERT,SET,CONTAINSTABLE,INTERSECT,SETUSER,CONTINUE,INTO,SHUTDOWN,CONVERT,IS,SOME,CREATE,JOIN,STATISTICS,CROSS,KEY,SYSTEM_USER,CURRENT,KILL,TABLE,CURRENT_DATE,LEFT,TEXTSIZE,CURRENT_TIME,LIKE,THEN,CURRENT_TIMESTAMP,LINENO,TO,CURRENT_USER,LOAD,TOP,CURSOR,NATIONAL,TRAN,DATABASE,NOCHECK,TRANSACTION,DBCC,NONCLUSTERED,TRIGGER,DEALLOCATE,NOT,TRUNCATE,DECLARE,NULL,TSEQUAL,DEFAULT,NULLIF,UNION,DELETE,OF,UNIQUE,DENY,OFF,UPDATE,DESC,OFFSETS,UPDATETEXT,DISK,ON,USE,DISTINCT,OPEN,USER,DISTRIBUTED,OPENDATASOURCE,VALUES,DOUBLE,OPENQUERY,VARYING,DROP,OPENROWSET,VIEW,DUMMY,OPENXML,WAITFOR,DUMP,OPTION,WHEN,ELSE,OR,WHERE,END,ORDER,WHILE,ERRLVL,OUTER,WITH,ESCAPE,OVER,WRITETEXT,SELECT,INSERT,DELETE,UPDATE,CREATE TABLE,DROP TABLE,ALTER TABLE,CREATE VIEW,DROP VIEW,CREATE INDEX,DROP INDEX,CREATE PROCEDURE,DROP PROCEDURE,CREATE TRIGGER,DROP TRIGGER,CREATE SCHEMA,DROP SCHEMA,CREATE DOMAIN,ALTER DOMAIN,DROP DOMAIN,GRANT,DENY,REVOKE,COMMIT,ROLLBACK,SET TRANSACTION,DECLARE,EXPLAN,OPEN,FETCH,CLOSE,PREPARE,EXECUTE,DESCRIBE,FORM,ORDER BY";
let pythonStr = "False,None,self,True,and,as,assert,break,class,continue,def,del,elif,else,except,finally,for,from,global,if,import,in,is,lambda,nonlocal,not,or,pass,raise,return,try,while,with,yield";
//let ScalaStr = "import,val,def,spark,sqlContext,show";
let ScalaStr = ''
const LoadToken = (Hints, languages) => {
    monaco.languages.setMonarchTokensProvider(languages, {
        keywords: Hints,
        tokenizer: {
            root: [
                // identifiers and keywords
                [/[a-z_$][\w$]*/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'identifier'
                    }
                }],
            ]

        }
    })
}

const init = () => {
    let hintsSql = []
    hintsSql = sqlStr.split(",");
    hintsSql = Array.from(new Set([...hintsSql])).sort();

    let hintsPython = []
    hintsPython = pythonStr.split(",");
    hintsPython = Array.from(new Set([...hintsPython])).sort();

    let hintsScala = []
    hintsScala = ScalaStr.split(",");
    hintsScala = Array.from(new Set([...hintsScala])).sort();

    initLanguage(hintsSql, 'sql')
    initLanguage(hintsPython, 'python')
    //initLanguage(hintsScala, 'scala')

    monaco.editor.defineTheme('my-balck', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            {token: 'source.myLang', foreground: '001529'},
            {background: '001529', fontSize: "14px"}
        ],
        colors: {
            'editor.background': '#001529',
            'editor.lineHighlightBorder': '#001529'
        },
    });

    monaco.editor.defineTheme('my-white', {
        base: 'vs',
        inherit: true,
        rules: [
            {token: 'source.myLang', foreground: 'ffffff'},
            {background: 'ffffff', fontSize: "14px"}
        ],
        colors: {
            'editor.background': '#ffffff',
            'editor.lineHighlightBorder': '#ffffff'
        },
    });
}

export const initLanguage = (Hints, languages) => {
    let createCompleters = (textUntilPosition, value) => {
        //过滤特殊字符
        let _textUntilPosition = textUntilPosition
            .replace(/[\*\[\]@\$\(\)]/g, "")
            .replace(/[\s+\.,]/g, " ");
        //切割成数组
        let arr = _textUntilPosition.split(" ");
        //取当前输入值
        let activeStr = arr[arr.length - 1];
        //获得输入值的长度
        let len = activeStr.length;

        //获得编辑区域内已经存在的内容
        let rexp = new RegExp("([^\\w]|^)" + activeStr + "\\w*", "gim");
        let match = value.match(rexp);
        let _hints = !match
            ? []
            : match.map(ele => {
                let rexp = new RegExp(activeStr, "gim");
                let search = ele.search(rexp);
                return ele.substr(search);
            });

        //查找匹配当前输入值的元素
        let hints = Array.from(new Set([...Hints, ..._hints]))
            .sort()
            .filter(ele => {
                let rexp = new RegExp(ele.substr(0, len), "gim");
                return (match && match.length === 1 && ele === activeStr) ||
                ele.length === 1
                    ? false
                    : activeStr.match(rexp);
            });

        //添加内容提示
        let res = hints.map(ele => {
            return {
                label: ele,
                kind:
                    hints.indexOf(ele) > -1
                        ? monaco.languages.CompletionItemKind.Keyword
                        : monaco.languages.CompletionItemKind.Text,
                documentation: ele,
                insertText: ele
            };
        });
        return res;
    };
    monaco.languages.register({id: languages});
    LoadToken(Hints, languages);
    monaco.languages.registerCompletionItemProvider(languages, {
        provideCompletionItems(model, position) {
            var textUntilPosition = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
            });
            var value = model.getValue();
            var suggestions = createCompleters(textUntilPosition, value);
            return {
                suggestions: suggestions
            };
        }
    });
}
init()


export default monaco
