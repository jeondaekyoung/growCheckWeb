<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/css/ress.min.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/appcss/wide-gs-fluid.css">
<link rel="stylesheet" type="text/css" href="<%=application.getContextPath()%>/resources/res/appcss/style.css">
<title>Main</title>
</head>
<body>

<div id="profile" class="row">
	<div class="col-12 bg-alpha">
		<div id="user-photo">
			<div id="user-img"><img src="<%=application.getContextPath()%>/resources/res/appimg/sample_img.png" alt="user-img">
				<div id="user-char"><img src="<%=application.getContextPath()%>/resources/res/appimg/sample_char.png" alt="user-char"></div>
			</div>
		</div>
		
		<div id="user-info-wrap">
			<div id="user-info">
				<p id="user-name">Name</p>
				<p id="user-age">
					<span>-years old</span> / <span>gender</span>
				</p>
			</div>
			<div id="btn-user-chg">
				<button id="btn-prev"><img src="<%=application.getContextPath()%>/resources/res/appimg/btn_prev.png" alt="prev"></button>
				<button id="btn-next"><img src="<%=application.getContextPath()%>/resources/res/appimg/btn_next.png" alt="next"></button>
			</div>
		</div>
		
		<a id="edit-child" href=""><img src="<%=application.getContextPath()%>/resources/res/appimg/edit_child.png" alt="프로필 수정"></a>
	</div>
</div>

<div id="dashboard">
	<div class="row">
		<div id="height" class="col-6">
			<span class="title">Current Height</span>
			<p class="align-center"><span class="data">138.5</span><span class="data-unit">cm</span></p>
		</div>
		<div id="weight" class="col-6">
			<span class="title">Current Weight</span>
			<p class="align-center"><span class="data">32.1</span><span class="data-unit">kg</span></p>
		</div>
	</div>
	
	<div class="row">
		<div id="nutrition" class="col-6">
			<span class="title">Nutrition</span>
			<p class="align-center"><span class="nutri-img"><img src="<%=application.getContextPath()%>/resources/res/appimg/nutrition.png" alt="go nutrition"></span></p>
		</div>
		<div id="goal" class="col-6">
			<span class="title">Goal</span>
			<span class="label">complete</span>
			<p class="align-center"><span class="goal-img"><img src="<%=application.getContextPath()%>/resources/res/appimg/goal01.png" alt="go goal"></span></p>
			<p class="align-center goal-txt">Drink a cup of milk</p>
		</div>
	</div>
</div>

<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
    <filter id="blur">
        <feGaussianBlur stdDeviation="8" />
    </filter>
</svg>

</body>
</html>