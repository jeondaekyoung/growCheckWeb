<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" class="has-smooth-scroll">
<head>
	<jsp:include page="include/head.jsp" flush="true"></jsp:include>
</head>
    
<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="include/nav.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" data-scrollbar="" tabindex="1" style="overflow: scroll; outline: none;">
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);">
                    
            <div></div>            
            <div></div>

            <div class="o-grid-wrap">
           
<main class="o-main">

        <section class="c-home">
            <div class="row contact">
                <div class="col-6 m-col-12 bg-blue">
                    <h3 class="fz60 thin">CONTACT</h3>
                    <p class="fz18 ic01">3-310, 20, Pangyo-ro 289beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea</p>
                    <p class="fz18 ic02">+82 70-8624-4536</p>
                    <p class="fz18 ic03">+82 50-4194-4532</p>
                    <a class="btn_info" href="mailto:seek-knowledge@knowledge-seek.com">info@knowledge-seek.com</a>
                </div>
                
                <div class="col-6 m-col-12">
                  <div id="map" class="box-map" style="width:100%;height:800px;"></div>
                </div>
            </div>
        </section>
</main>

                        <div class="js-sticky-stop">                            
                                <jsp:include page="include/footer.jsp" flush="true"></jsp:include>
                        </div>
                </div> 
            </article>
        <aside class="scrollbar-track scrollbar-track-x" style="display: none;">
            <div class="scrollbar-thumb scrollbar-thumb-x" style="width: 1920px; transform: translate3d(0px, 0px, 0px);"></div>
        </aside>
        <aside class="scrollbar-track scrollbar-track-y" style="display: block;">
            <div class="scrollbar-thumb scrollbar-thumb-y" style="height: 121.141px; transform: translate3d(0px, 0px, 0px);"></div>
        </aside>
        <canvas class="overscroll-glow" style="display: none; pointer-events: none;"></canvas>
    </div> 
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

</body></html>