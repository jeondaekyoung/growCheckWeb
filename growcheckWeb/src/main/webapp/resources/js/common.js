/**
 * 
 */

function ecilck(mod) {
		var f=document.adForm;
			switch (mod) {
			
			case "en":
				if(!f.name.value){
					alert("Please enter a name.");
					event.preventDefault();
					f.name.focus();
					return false;
				}

				if(!f.email.value){
					alert("Please enter your email.");
					event.preventDefault();
					f.email.focus();
					return false;
				}
				if(f.email.value.indexOf("@")==-1){
					alert("This is not an email format.");
					event.preventDefault();
					f.email.value="";
					f.email.focus();
					return false;
				}
				if(!f.tel.value){
					alert("Please enter your phone number.");
					event.preventDefault();
					f.tel.focus();
					return false;
				}
				if(!f.contents.value){
					alert("Please enter your content.");
					event.preventDefault();
					f.contents.focus();
					return false;
				}
				if (confirm("You can not edit your content.\n Do you want to submit this form?")!=1) {
					event.preventDefault();
					return false;
					}
				
				alert("We will reply to your inquiry by email or phone. Thank you.");
				
				break;
				
			case "ko":
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

	function onlyNumber(event,locale){
		event = event || window.event;
		 
		var keyID = (event.which) ? event.which : event.keyCode;
		//키번호 48~57 위쪽 번호키 , 96~105 오른쪽 번호키 , 8 backSpace , 46 delete , 37,39 방향키 왼쪽 오른쪽 , 107 오른쪽 +
		if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) ||
				keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 9 || keyID == 107) 
			return;
		else{
			if(locale == "ko"){
				alert('번호만 입력해주세요.');
			}else{
				alert('Please enter only numbers.');
			}
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
	
	$(window).scroll(function(){
	    if($(this).scrollTop()>=60){
	      $('.nav_wrap').css({height:60});
	    } else {
	      $('.nav_wrap').css({height:100});
	    }
	  });
	$(document).ready(function(){
		
	    if(location.host.indexOf(".kr")!=-1){
			$("body").find("a").each(function(){
				   var href=$(this).attr("href");
				if (href != null) {
					if (href.indexOf("javascript") == -1) {
						if (href.indexOf("http") == -1) {
							$(this).attr("href", "http://i-growcheck.com"+ href);
						}
					}
				}
			});
		}
		
		$('body').addClass('is-transitions-masks');
		
		function remove(){
			setTimeout(function(){
				$('body').removeClass('is-transitions-masks');
				$('.o-scroll').css('opacity','1');
				$('.c-header_wrapper').css('opacity','1');
				scrollControl();
			}, 1200);
		}	remove();
		var href = $("#lang").attr("href");
		$(window).scroll(function () {
			var de = document.documentElement;
	    	var b = document.body;
	    	var now = {};
	    	now.X = document.all ? (!de.scrollLeft ? b.scrollLeft : de.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX);
	    	now.Y = document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);
	    	$("#lang").attr("href",href+"?ns="+now.Y);
	    });
		  
		function scrollControl() {
			
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