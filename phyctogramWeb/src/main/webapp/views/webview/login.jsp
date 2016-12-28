<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
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
			<a href="login2.jsp"><img src="<%=application.getContextPath()%>/resources/res/appimg/login.png" alt="phyctogram"></a>

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
        	 // 로그인 성공시, API를 호출합니다.
            Kakao.API.request({
              url: '/v1/user/me',
              success: function(res) {
                alert(JSON.stringify(res));
              },
              fail: function(error) {
                alert(JSON.stringify(error));
              }
            });
        },
        fail: function(err) {
          alert(JSON.stringify(err));
        }
      });
    };
  //]]>
</script>
			<a href="javascript:facebooklogin()"><img src="<%=application.getContextPath()%>/resources/res/appimg/login_face.png" alt="facebook login"></a>
<script language="javascript" src="http://connect.facebook.net/ko_KR/all.js"></script>
<script>				
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '594350060751876',
      xfbml      : true,
      version    : 'v2.8'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/ko_KR/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  
  function facebooklogin() {
	    //페이스북 로그인 버튼을 눌렀을 때의 루틴.
	        FB.login(function(response) {
	            var fbname;
	            var accessToken = response.authResponse.accessToken;
	        }, {scope: "public_profile,email,user_birthday"});
  	
	}
  function getMyProfile(){
	  FB.api('/me',function(user){
	  var myName= user.name ;
	            var myEmail = user.email;
	                    var myId = user.id;
	   });
	  FB.api('/me/picture',function(data){//디폴트 - 작은사진, ?type=large 큰사진. 
	  var myImg = data.data.url;
	  });
	   
	   
 }
  
</script>			
		</div>
	</div>
</div>

<p class="txt-white align-center copy">COPYRIGHT ⓒ 2017 Knowledge-Seek Co., Ltd. All Rights Reserved</p>
</div>
</body>
</html>