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
			<a href="javascript:logOutWithKakao()">logout</a>
			<script type='text/javascript'>
  //<![CDATA[
    // 사용할 앱의 JavaScript 키를 설정해 주세요.
    Kakao.init('d655eabb3866920a8503a9e26fef16a9');
    
    
    function loginWithKakao() {
      // 로그인 창을 띄웁니다.
      Kakao.Auth.login({
        success: function(authObj) {
        	 // 로그인 성공시, API를 호출합니다.
            Kakao.API.request({
              url: '/v1/user/me',
              success: function(res) {
                //alert(JSON.stringify(res));
                console.log(res.id);
                console.log(res.properties.nickname);
                console.log(res.properties.thumbnail_image);
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
    function logOutWithKakao() {
    	Kakao.Auth.logout(function(data){
            if(data){//정상적으로 로그아웃이 되면 true가 떨어져서 처리하였습니다.
            	 console.log("true");
            	//location.href="index.html";
            }
       });	
    }
    
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
  
  FB.getLoginStatus(handleSessionResponse);
  function handleSessionResponse(response) { 
   if (!response.session) { 
    // Open login dialog box
    FB.login(handleSessionResponse);
    return; 
   } else{
    // already logged in
   }
  }
  
  function facebooklogin() {
	    //페이스북 로그인 버튼을 눌렀을 때의 루틴.
	     FB.login(function(response) {
    		if (response.status === 'connected') {
	    		  FB.api('/me',{fields :'id,name,picture,gender,birthday'}, function(response) {
	    			//alert(JSON.stringify(response));
	    			  	console.log(response.id);
	    			    console.log(response.name);
	    			    console.log(response.picture.data.url);
	    			    console.log(response.gender);
	    			    console.log(response.email);
	    			    console.log(response.birthday);
	    			});
	    		  
			} else if (response.status === 'not_authorized') {
					alert("your not authorized");
			} else {
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
			}
    	  }, {scope : "public_profile,email,user_birthday"});

	}
	/*   function getMyProfile(){
	 FB.api('/me',function(user){
	 var myName= user.name ;
	 var myEmail = user.email;
	 var myId = user.id;
	 });
	 FB.api('/me/picture',function(data){//디폴트 - 작은사진, ?type=large 큰사진. 
	 var myImg = data.data.url;
	 });
	
	
	 } */
</script>			
		</div>
	</div>
</div>

<p class="txt-white align-center copy">COPYRIGHT ⓒ 2017 Knowledge-Seek Co., Ltd. All Rights Reserved</p>
</div>
</body>
</html>