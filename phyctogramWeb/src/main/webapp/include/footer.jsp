<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
                    <a class="c-footer-navigation_link" href="index.jsp">
                        <img class="c-footer-navigation_logo_image" src="<%=application.getContextPath()%>/resources/res2/img/logo.svg" alt="grow check">
                    </a>
                </li>
                <li class="c-footer-navigation_item -nav">
                    <a class="c-footer-navigation_link" href="https://www.kickstarter.com/" target="_blank">
                        <span class="c-footer-navigation_label">Kickstarter</span>
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
            <p>© Grow Check, 2017</p>
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
    <%-- <script>window.jQuery || document.write('<script src="<%=application.getContextPath()%>/resources/res2/js/jquery-3.0.0.min.js"><\/script>')</script> --%>
    <script src="<%=application.getContextPath()%>/resources/res2/js/jquery-3.0.0.min.js"></script>
    <script src="<%=application.getContextPath()%>/resources/res2/js/vendors.js"></script>
    <script src="<%=application.getContextPath()%>/resources/res2/js/app.js"></script>
<script type="text/javascript" src="http://openapi.map.naver.com/openapi/v3/maps.js?clientId=s96duQ89XbZlmLcPnKIc"></script>
<script type="text/javascript">
                   $(document).ready(function(){ 
                	  
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
