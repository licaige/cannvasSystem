import React from 'react'

const Menu = ({ onExport, github }) => {
    return (
        <div className="padding-small container paper">
            <p>ðæ°æ®å°èªå¨ä¿å­å°ç¼å­ä¸­</p>
            <button
                onClick={onExport}
                className="btn-small">å¯¼åº</button>
            <input type="file" onChange={e => {
                console.log(e)
            }} className="btn-small" />
            <button
                onClick={() => {
                    window.open('/game/test')
                }}
                className="btn-success btn-small">ð¹è¿è¡æ¸¸æ</button>
                <p>
                    æ³è¦å°æ¸¸æåå¸å°éåæéåï¼
                    ä½ å¯ä»¥ç»æåéé®ä»¶æå°
                    <a href={github}>github</a>
                    ä¸PR
                </p>
            <h4>æ¨¡åç®å½</h4>
        </div>
    )
}

export default Menu
