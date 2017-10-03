<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String app_path=application.getContextPath(); %>    
<footer class="c-footer js-footer">
	<nav class="c-footer-navigation">
        <div class="c-footer-navigation_wrap">
            <ul class="c-footer-navigation_list">
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="terms.jsp">
                        <span class="c-footer-navigation_label">Terms and Conditions</span>
                    </a>
                </li>
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="privacy.jsp">
                        <span class="c-footer-navigation_label">Privacy</span>
                    </a>
                </li>
                <li class="c-footer-navigation_item -logo">
                    <a class="c-footer-navigation_link" href="/">
                        <img class="c-footer-navigation_logo_image" src="<%=app_path%>/resources/img/logo.svg" alt="grow check">
                    </a>
                </li>
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="javascript:alert('Page is under construction.')">
                        <span class="c-footer-navigation_label">FAQ</span>
                    </a>
                </li>
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="contact.jsp">
                        <span class="c-footer-navigation_label">Contact Us</span>
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
<script type="text/javascript" src="<%=app_path%>/resources/js/common.js"></script>
</footer>
