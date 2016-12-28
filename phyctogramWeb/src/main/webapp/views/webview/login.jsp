<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/ress.min.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/wide-gs-fluid.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/appcss/style.css">
<title>Login</title>
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
</head>
<body class="bg-gradient">
<div>
<h1 class="align-center logo col-10 prefix-1 suffix-1"><img src="<%=application.getContextPath()%>/resources/res/appimg/login_logo.png" alt="phyctogram"></h1>

<div class="wrap">
	<div class="align-center login-btn-group">
		<div>
			<a href=""><img src="<%=application.getContextPath()%>/resources/res/appimg/login.png" alt="phyctogram"></a>

		</div>
		<div>
			<a href="javascript:loginWithKakao()"><img src="<%=application.getContextPath()%>/resources/res/appimg/login_kakao.png" alt="kakao login"></a>
			<script type='text/javascript'>
  //<![CDATA[
    // 사용할 앱의 JavaScript 키를 설정해 주세요.
    Kakao.init('fb4295a19ebcb9de18a6a57a5db2e9ee');
    function loginWithKakao() {
      // 로그인 창을 띄웁니다.
      Kakao.Auth.login({
        success: function(authObj) {
          alert(JSON.stringify(authObj));
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
    };
  //]]>
</script>
			<a href=""><img src="<%=application.getContextPath()%>/resources/res/appimg/login_face.png" alt="facebook login"></a>			
		</div>
	</div>
</div>

<p class="txt-white align-center copy">COPYRIGHT ⓒ 2017 Knowledge-Seek Co., Ltd. All Rights Reserved</p>
</div>
</body>
</html>