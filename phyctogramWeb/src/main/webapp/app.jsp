<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" class="has-smooth-scroll">
<head>
	<title>Growcheck - App</title>
	<meta property="og:title" content="Growcheck - App">
	<meta name="twitter:title" content="Growcheck - App">
	<link rel="canonical" href="http://www.i-growcheck.com/app.jsp">
	<jsp:include page="include/head.jsp" flush="true"></jsp:include>
</head>
    
<body class="is-volley-grid is-windows search-has-results is-loaded">

<div class="o-barba js-barba" id="js-barba-wrapper" aria-live="polite">
    <div class="js-barba-container o-barba_container" data-template="home">
        
        <jsp:include page="include/nav.jsp" flush="true"></jsp:include>
        
        <div class="o-scroll js-scroll is-show" tabindex="1" style="outline: none;">
        <article class="scroll-content" style="transform: translate3d(0px, 0px, 0px);">
                    
            <div></div>            
            <div></div>

            <div class="o-grid-wrap">
           
<main class="o-main">

        <section class="c-home">
            <div class="app">
            <div class="row" id="app01">
                <div class="col-6 m-col-12"><img src="<%=application.getContextPath()%>/resources/res2/img/app_01-en.png" class="app_img" alt="app1"></div>
                <div class="col-6 m-col-12 bg-grey">
                    <img class="icon m-dp-none" src="<%=application.getContextPath()%>/resources/res2/img/ic_app_01.png">
                    <h3 class="thin fz80 m-s-fz3rem">Management</h3>
                    <div class="underline"></div>
                    <p class="fz24">Manage Your Own and Kids’ Data</p>
                    <p class="fz18">You can manage your own and your kids’ data. You can also check your family’s or friends’ data if you are accepted as friend on application.</p>
                </div>
                </div>
                
            <div class="row" id="app02">
                <div class="col-6 m-col-12 fr"><img src="<%=application.getContextPath()%>/resources/res2/img/app_02-en.png" class="app_img" alt="app2"></div>
                <div class="col-6 m-col-12 fr bg-grey">
                    <img class="icon m-dp-none" src="<%=application.getContextPath()%>/resources/res2/img/ic_app_02.png">
                    <h3 class="thin fz80 m-s-fz3rem">Self Check</h3>
                    <div class="underline"></div>
                    <p class="fz24">Check Your Habit Everyday</p>
                    <p class="fz18">Check your daily data and get healthy habits. Growcheck app. allows you to track your meal, exercise and sleep habits.</p>
                </div>
                </div>
                
            <div class="row" id="app03">    
                <div class="col-6 m-col-12"><img src="<%=application.getContextPath()%>/resources/res2/img/app_03-en.png" class="app_img" alt="app3"></div>
                <div class="col-6 m-col-12 bg-grey">
                    <img class="icon m-dp-none" src="<%=application.getContextPath()%>/resources/res2/img/ic_app_03.png">
                    <h3 class="thin fz80 m-s-fz3rem">Solution</h3>
                    <div class="underline"></div>
                    <p class="fz24">Get the Personal Solution for Kids</p>
                    <p class="fz18">You can track your child’s data, and compare it with the same age and gender kids’ data. If there is an abnormal situation you can get solution about his/her growth rate.</p>
                </div>
                </div>
                
            <div class="row" id="app04">    
                <div class="col-6 m-col-12 fr"><img src="<%=application.getContextPath()%>/resources/res2/img/app_04-en.png" class="app_img" alt="app4"></div>
                <div class="col-6 m-col-12 fr bg-grey">
                    <img class="icon m-dp-none" src="<%=application.getContextPath()%>/resources/res2/img/ic_app_04.png">
                    <h3 class="thin fz80 m-s-fz3rem">Connection</h3>
                    <div class="underline"></div>
                    <p class="fz24">Connect Device Easily</p>
                    <p class="fz18">Growcheck app. is easy to use; all measured data is synchronized through BT. </p>
                </div>
                </div>
                
            <div class="row" id="app05">    
                <div class="col-6 m-col-12"><img src="<%=application.getContextPath()%>/resources/res2/img/app_05-en.png" class="app_img" alt="app3"></div>
                <div class="col-6 m-col-12 bg-grey">
                    <img class="icon m-dp-none" src="<%=application.getContextPath()%>/resources/res2/img/ic_app_05.png">
                    <h3 class="thin fz80 m-s-fz3rem">Following</h3>
                    <div class="underline"></div>
                    <p class="fz24">Follow Your Friends and Family</p>
                    <p class="fz18">You can observe your friends and family's data. It only available when your friends allowed</p>
                </div>
                </div>
            </div><br><br><br><br><br><br><br><br><br><br>
        </section>
        
</main>

                        <div class="js-sticky-stop">
                            <jsp:include page="include/footer.jsp" flush="true"></jsp:include>
                        </div>
                </div>
            </article>
    		</div>
        </div>
    </div>
</body></html>