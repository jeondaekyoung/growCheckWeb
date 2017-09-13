<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<footer class="c-footer js-footer">
	<nav class="c-footer-navigation">
        <div class="c-footer-navigation_wrap">
            <ul class="c-footer-navigation_list">
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="<%=application.getContextPath() %>/kr/terms.jsp">
                        <span class="c-footer-navigation_label">이용약관</span>
                    </a>
                </li>
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="<%=application.getContextPath() %>/kr/privacy.jsp">
                        <span class="c-footer-navigation_label">개인정보방침</span>
                    </a>
                </li>
                <li class="c-footer-navigation_item -logo">
                    <a class="c-footer-navigation_link" href="<%=application.getContextPath() %>/kr/index.jsp">
                        <img class="c-footer-navigation_logo_image" src="<%=application.getContextPath()%>/resources/res2/img/logo.svg" alt="grow check">
                    </a>
                </li>
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="javascript:alert('이 페이지는 준비중입니다.')">
                        <span class="c-footer-navigation_label">자주묻는질문</span>
                    </a>
                </li>
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="<%=application.getContextPath() %>/kr/contact.jsp">
                        <span class="c-footer-navigation_label">문의하기</span>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="c-footer-infos o-grid">
        <div class="c-footer-infos_copyright o-g33">
            <p>Copyright © 2017 Knowledge-seek &amp; Company All rights reserved</p>
        </div>
        <ul class="c-footer-infos_social o-g33">
            <li class="c-footer-infos_social_item">
                <a class="c-footer-infos_social_link" href="http://knowledge-seek.com/" target="_blank"><img src="<%=application.getContextPath()%>/resources/res2/img/sns_know.jpg?ver=0.3"></a>
            </li>
            <li class="c-footer-infos_social_item">
                <a class="c-footer-infos_social_link" href="https://twitter.com/growcheck" target="_blank"><img src="<%=application.getContextPath()%>/resources/res2/img/sns_twit.jpg"></a>
            </li>
            <li class="c-footer-infos_social_item">
                <a class="c-footer-infos_social_link" href="https://www.facebook.com/growcheck/ " target="_blank"><img src="<%=application.getContextPath()%>/resources/res2/img/sns_face.jpg"></a>
            </li>
            <li class="c-footer-infos_social_item">
                <a class="c-footer-infos_social_link" href="https://www.instagram.com/grow_check/" target="_blank"><img src="<%=application.getContextPath()%>/resources/res2/img/sns_insta.jpg"></a>
            </li>
            <li class="c-footer-infos_social_item">
                <a class="c-footer-infos_social_link" href="https://www.youtube.com/channel/UCKzPFy2eWVDctvtbhp7J1Mg" target="_blank"><img src="<%=application.getContextPath()%>/resources/res2/img/sns_utube.jpg"></a>   
            </li>
        </ul>
        <div class="c-footer-infos_locomotive o-g33">
            <a target="_blank"></a>
        </div>
    </div>
<script src="<%=application.getContextPath()%>/resources/res2/js/jquery.min.js"></script>
<script type="text/javascript" src="http://openapi.map.naver.com/openapi/v3/maps.js?clientId=s96duQ89XbZlmLcPnKIc"></script>
<script type="text/javascript">
$(window).scroll(function(){
    if($(this).scrollTop()>=60){
      $('.nav_wrap').css({height:60});
    } else {
      $('.nav_wrap').css({height:130});
    }
  });
$(document).ready(function(){
	$('body').addClass('is-transitions-masks');
	
	function remove(){
		setTimeout(function(){
			$('body').removeClass('is-transitions-masks');
			$('.o-scroll').css('opacity','1');
			$('.c-header_wrapper').css('opacity','1');
			scrollControl();
		}, 1200);
		
	}	remove();
	
	function scrollControl() {
		var scroll='<%= request.getParameter("nowScroll") %>';
    	 if(!window.location.hash){
    	$('html, body').animate({scrollTop : scroll}, 400);
    	} 
	}
	
	$('.c-header-burger').click(function(){
		$('body').toggleClass('has-header-navigation-opened');
		$('.nav').toggle();
		$('.language').toggle();
	});
	
	$('.c-card-carousel_categories div:first-child').click(function(){
		$('.c-home_carousel section div:first-child').addClass('is-current');
		$('.c-home_carousel section p:first-child').addClass('is-current');
		$('.c-home_carousel section div:nth-child(2)').removeClass('is-current');
		$('.c-home_carousel section p:nth-child(2)').removeClass('is-current');
	});
	$('.c-card-carousel_categories div:last-child').click(function(){
		$('.c-home_carousel section div:first-child').removeClass('is-current');
		$('.c-home_carousel section p:first-child').removeClass('is-current');
		$('.c-home_carousel section div:nth-child(2)').addClass('is-current');
		$('.c-home_carousel section p:nth-child(2)').addClass('is-current');
	});
	
   var position = new naver.maps.LatLng(37.4047786, 127.1059992);
   var map = new naver.maps.Map('map', {
       center: position,
       scrollWheel : false,
       scaleControl: false,
       logoControl: false,
       mapDataControl: false,
       zoomControl: true,
       minZoom: 1,
       zoom: 12
   });
   var markerOptions = {
       position: position,
       map: map
   };
   var marker = new naver.maps.Marker(markerOptions);
   map.refresh();
});
</script>
</footer>