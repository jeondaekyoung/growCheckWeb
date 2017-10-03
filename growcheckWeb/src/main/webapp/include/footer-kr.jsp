<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String app_path=application.getContextPath(); %>    
<footer class="c-footer js-footer">
	<nav class="c-footer-navigation">
        <div class="c-footer-navigation_wrap">
            <ul class="c-footer-navigation_list">
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="<%=app_path %>/kr/terms.jsp">
                        <span class="c-footer-navigation_label">이용약관</span>
                    </a>
                </li>
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="<%=app_path %>/kr/privacy.jsp">
                        <span class="c-footer-navigation_label">개인정보방침</span>
                    </a>
                </li>
                <li class="c-footer-navigation_item -logo">
                    <a class="c-footer-navigation_link" href="<%=app_path %>/kr/">
                        <img class="c-footer-navigation_logo_image" src="<%=app_path%>/resources/img/logo.svg" alt="grow check">
                    </a>
                </li>
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="javascript:alert('이 페이지는 준비중입니다.')">
                        <span class="c-footer-navigation_label">자주묻는질문</span>
                    </a>
                </li>
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="<%=app_path %>/kr/contact.jsp">
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
                <a class="c-footer-infos_social_link" href="http://knowledge-seek.com/" target="_blank"><img src="<%=app_path%>/resources/img/sns_know.jpg?ver=0.3"></a>
            </li>
            <li class="c-footer-infos_social_item">
                <a class="c-footer-infos_social_link" href="https://twitter.com/growcheck" target="_blank"><img src="<%=app_path%>/resources/img/sns_twit.jpg"></a>
            </li>
            <li class="c-footer-infos_social_item">
                <a class="c-footer-infos_social_link" href="https://www.facebook.com/growcheck/ " target="_blank"><img src="<%=app_path%>/resources/img/sns_face.jpg"></a>
            </li>
            <li class="c-footer-infos_social_item">
                <a class="c-footer-infos_social_link" href="https://www.instagram.com/grow_check/" target="_blank"><img src="<%=app_path%>/resources/img/sns_insta.jpg"></a>
            </li>
            <li class="c-footer-infos_social_item">
                <a class="c-footer-infos_social_link" href="https://www.youtube.com/channel/UCKzPFy2eWVDctvtbhp7J1Mg" target="_blank"><img src="<%=app_path%>/resources/img/sns_utube.jpg"></a>   
            </li>
        </ul>
        <div class="c-footer-infos_locomotive o-g33">
            <a target="_blank"></a>
        </div>
    </div>
<script type="text/javascript" src="http://openapi.map.naver.com/openapi/v3/maps.js?clientId=s96duQ89XbZlmLcPnKIc"></script>
<script type="text/javascript" src="<%=app_path%>/resources/js/jquery.min.js"></script>
<script src="<%=app_path%>/resources/js/common.js"></script>
</footer>