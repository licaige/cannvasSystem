/*function makeRedirect(url, timeout)
{
	//url = url || "/home";
	//timeout = timeout || 2000;
	
	url = (typeof url != "undefined") ? url : "/home";
	timeout = (typeof timeout != "undefined") ? timeout: 2000;
	//���������ಿ��
}*/

function makeRedirect(url = "/home", timeout = 2000, callback)
{
	console.log(url);
	console.log(timeout);
	console.log(callback);
}

//ʹ��url��timeout��Ĭ��ֵ
makeRedirect();

//ʹ��url��timeout��Ĭ��ֵ
makeRedirect(undefined, undefined, function(){});

//ʹ��timeout��Ĭ��ֵ
makeRedirect("/login");

//������timeout��Ĭ��ֵ
makeRedirect("/login", null, function(){});
