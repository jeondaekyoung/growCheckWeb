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
        
        <div class="o-scroll js-scroll is-show" data-scrollbar="" tabindex="1" style="overflow: hidden; outline: none;">
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);">
                    
            <div></div>            
            <div></div>

            <div class="o-grid-wrap">
           
<main class="o-main">

        <section class="c-home">
            <div class="row app">
                <div class="col-6"><img src="<%=application.getContextPath()%>/resources/res2/img/app_01.png" class="app_img" alt="app1"></div>
                <div class="col-6 bg-grey">
                    <img class="icon" src="<%=application.getContextPath()%>/resources/res2/img/ic_app_01.png">
                    <h3 class="thin fz80">Management</h3>
                    <div class="underline"></div>
                    <p class="fz24">Manage Your Own and Kids’ Data</p>
                    <p class="fz18">You can manage your own and your kids’ data. You can also check your family’s or friends’ data if you are accepted as friend on application.</p>
                </div>
                <div class="col-6 bg-grey">
                    <img class="icon" src="<%=application.getContextPath()%>/resources/res2/img/ic_app_02.png">
                    <h3 class="thin fz80">Self Check</h3>
                    <div class="underline"></div>
                    <p class="fz24">Check Your Habit Everyday</p>
                    <p class="fz18">Check your daily data and get healthy habits. GrowCheck app. allows you to track your meal, exercise and sleep habits.</p>
                </div>
                <div class="col-6"><img src="<%=application.getContextPath()%>/resources/res2/img/app_02.png" class="app_img" alt="app2"></div>
                <div class="col-6"><img src="<%=application.getContextPath()%>/resources/res2/img/app_03.png" class="app_img" alt="app3"></div>
                <div class="col-6 bg-grey">
                    <img class="icon" src="<%=application.getContextPath()%>/resources/res2/img/ic_app_03.png">
                    <h3 class="thin fz80">Solution</h3>
                    <div class="underline"></div>
                    <p class="fz24">Get the Personal Solution for Kids</p>
                    <p class="fz18">You can track your child’s data, and compare it with the same age and gender kids’ data. If there is an abnormal situation you can get solution about his/her growth rate.</p>
                </div>
                <div class="col-6 bg-grey">
                    <img class="icon" src="<%=application.getContextPath()%>/resources/res2/img/ic_app_04.png">
                    <h3 class="thin fz80">Connection</h3>
                    <div class="underline"></div>
                    <p class="fz24">Connect Device Easily</p>
                    <p class="fz18">GrowCheck app. is easy to use; all measured data is synchronized through Wi-Fi. </p>
                </div>
                <div class="col-6"><img src="<%=application.getContextPath()%>/resources/res2/img/app_04.png" class="app_img" alt="app4"></div>
            </div><br><br><br><br><br><br><br><br><br><br>
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
    <script>window.jQuery || document.write('<script src="<%=application.getContextPath()%>/resources/res2/js/jquery-3.0.0.min.js"><\/script>')</script>
    <script src="<%=application.getContextPath()%>/resources/res2/js/vendors.js"></script>
    <script src="<%=application.getContextPath()%>/resources/res2/js/app.js"></script>


</body></html>