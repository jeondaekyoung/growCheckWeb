package naree.jsp.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import naree.db.domain.Admin;
import naree.db.domain.Member;
import naree.service.MemberService;

@Controller
@RequestMapping("app/webView")
public class Webviewcontroller {
	
	
	private static final Logger logger = LoggerFactory.getLogger(Webviewcontroller.class);
	
	@Autowired
	private MemberService memberService;
		
	
	/**
	 * 픽토그램 로그인
	 * @param member 
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "mlogin.do", method=RequestMethod.POST)
	public ModelAndView login(Member member, HttpSession session){
		logger.info("멤버 로그인 하기 : " + member.toString());
		ModelAndView mv = new ModelAndView();
		member=memberService.loginMemberByPhycto(member);
		
		if(member!=null){
			logger.info("멤버 로그인 하기 : " + member.toString());
			mv.setViewName("webview/main");
			session.setAttribute("member", member.getEmail());
		}else{
			mv.setViewName("webview/login2");
			mv.addObject("loginError", "아이디와 비번이 불일치");
			
		}
	
		return mv;
	}
	
}
