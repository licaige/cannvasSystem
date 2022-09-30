export default [
    {
        id: '圆角矩形框',
        type: 'roundrect',
        props: {
            x: 10,
            y: 10,
            w: 200,
            h: 300,
            r: 10,
            fillStyle: '#ff0000',
        }
    },
    {
        id: '矩形框',
        type: 'stroke',
        props: {
            x: 30,
            y: 30,
            w: 200,
            h: 300,
            strokeStyle: '#000',
        }
    },
    {
        id: '线段',
        type: 'line',
        props: {
            path: [
                {
                    x: 120,
                    y: 120,
                },
                {
                    x: 160,
                    y: 160,
                },
                {
                    x: 160,
                    y: 220,
                },
                {
                    x: 80,
                    y: 380,
                },
            ],
            lineWidth: 10,
        }
    },
    {
        id: '文字',
        type: 'text',
        props: {
            x: 50,
            y: 230,
            t: '提娜佳raga案件阿塞飞静安寺',
            fillStyle: 'yellow',
            maxWidth: 150,
        }
    },{
        id: '圆弧',
        type: 'arc',
        props: {
            x: 100,
            y: 100,
            r: 25,
            strokeStyle: '#000',
            lineWidth: 10,
            startAngle: -180,
            endAngle: 0,
        }
    },
]