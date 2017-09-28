<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" class="has-smooth-scroll">
<head>
	<title>그로첵 (Growcheck) - Contact Us</title>
	<link rel="canonical" href="http://www.i-growcheck.com/kr/contact.jsp">
	<link rel="alternate" hreflang="x-default" href="http://www.i-growcheck.com/kr/contact.jsp"/>
	<link rel="alternate" hreflang="en-us" href="http://www.i-growcheck.com/contact.jsp" />
	<link rel="alternate" hreflang="ko-kr" href="http://www.i-growcheck.com/kr/contact.jsp" />
	<meta property="og:title" content="그로첵 (Growcheck) - 문의하기">
	<meta property="og:url" content="http://www.i-growcheck.com/kr/contact.jsp">
	<meta name="twitter:title" content="그로첵 (Growcheck) - 문의하기">
	<meta name="twitter:url" content="http://www.i-growcheck.com/kr/contact.jsp">
	<jsp:include page="../include/head.jsp" flush="true"></jsp:include>
</head>
    
<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="../include/nav-kr.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" tabindex="1" style="outline: none;">
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);">
                    
            <div></div>            
            <div></div>

            <div class="o-grid-wrap">
           
<main class="o-main">

        <section class="c-home">
            <div class="row contact">
	            <div class="row">
	                <div class="col-6 m-col-12 bg-blue">
	                    <h3 class="fz60 thin">CONTACT</h3>
	                    <p class="fz18 ic01">경기도 성남시 분당구 판교로 289번길 20 3동 310호</p>
	                    <p class="fz18 ic02">070-8624-4536</p>
	                    <p class="fz18 ic03">050-4194-4532</p>
	                    <a class="btn_info" href="mailto:seek-knowledge@knowledge-seek.com">info@knowledge-seek.com</a>
	                </div>
	                <div class="col-6 m-col-12 qna">
		                <form action='<c:url value="/QaWeb/write.do"/>' name="adForm" method="post">
		            		<input type="hidden" name="state" value="답변대기">
			                <input type="text" name="name"  placeholder="NAME">
			                <input type="text" name="email"  placeholder="E-MAIL">
			                <input type="text" name="tel" onkeydown='return onlyNumber(event)' onkeyup='removeChar(event)'  placeholder="PHONE NUMBER">
			                <textarea name="contents" placeholder="MESSAGES"></textarea>
			                <!-- <label for="upload">FILE UPLOAD</label><input type="file" id="upload"> -->
			                <input type="submit" name="submit" onclick="ecilck('submit')" class="btn" value="전송"/>
		            	</form>
	                </div>
                </div>
                
                <div class="col-12">
                  <div id="map" class="box-map" style="width:100%;height:752px;"></div>
                </div>
            </div>
        </section>
</main>

                        <div class="js-sticky-stop">                            
                                <jsp:include page="../include/footer-kr.jsp" flush="true"></jsp:include>
                        </div>
                        
                </div> 
            </article>
    		</div> 
        </div> 
    </div> 
 <script type="text/javascript">
	function ecilck(mod) {
		var f=document.adForm;
			switch (mod) {
			case "reset":
				
				if (confirm("작성하신 내용을 취소 하시겠습니까?")!=1) {
					event.preventDefault();
					return false;}
				
				break;
				
			case "submit":
				if(!f.name.value){
					alert("이름을 입력해주세요.");
					event.preventDefault();
					f.name.focus();
					return false;
				}

				if(!f.email.value){
					alert("이메일을 입력해주세요.");
					event.preventDefault();
					f.email.focus();
					return false;
				}
				if(f.email.value.indexOf("@")==-1){
					alert("이메일 형식이 아닙니다.");
					event.preventDefault();
					f.email.value="";
					f.email.focus();
					return false;
				}
				if(!f.tel.value){
					alert("전화번호를 입력해주세요.");
					event.preventDefault();
					f.tel.focus();
					return false;
				}
				if(!f.contents.value){
					alert("내용을 입력하세요.");
					event.preventDefault();
					f.contents.focus();
					return false;
				}
				
				
				
				if (confirm("작성하신 내용은 수정 하실수 없습니다.  \n 이대로 관리자에게 전송하시겠습니까? ")!=1) {
					event.preventDefault();
					return false;
					}
				
				alert("문의 하신 내용은 입력하신 정보로 \n 이메일이나 전화를 통해 답변 드릴 예정 입니다. 감사합니다.");
				
				break;
			}
			
	} 
	function onlyNumber(event){
		event = event || window.event;
		var keyID = (event.which) ? event.which : event.keyCode;
		//키번호 48~57 위쪽 번호키 , 96~105 오른쪽 번호키 , 8 backSpace , 46 delete , 37,39 방향키 왼쪽 오른쪽 , 107 오른쪽 +
		if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) ||
				keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 9 || keyID == 107) 
			return;
		else{
			alert('번호만 입력해주세요.');
			return false;
		}
	}
	function removeChar(event) {
		event = event || window.event;
		var keyID = (event.which) ? event.which : event.keyCode;
		if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID==107){
			
			return;
		}
		else
			event.target.value = event.target.value.replace(/[^0-9\+]/g, "");
	}
	</script>
</body></html>