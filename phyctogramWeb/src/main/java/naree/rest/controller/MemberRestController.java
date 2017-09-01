package naree.rest.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.android.gcm.server.Message;
import com.google.android.gcm.server.MulticastResult;
import com.google.android.gcm.server.Result;
import com.google.android.gcm.server.Sender;

import naree.db.domain.Member;
import naree.service.MemberService;
import naree.service.QaService;

@RestController
@RequestMapping(value = "rest/member")
public class MemberRestController {

	private static final Logger logger = LoggerFactory.getLogger(MemberRestController.class);
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private QaService qaService;
	
	/**
	 * 회원 정보 받기
	 * @param member
	 * @return
	 */
	@RequestMapping(value = "register", method = RequestMethod.POST)
	public Member registerMember(@RequestBody Member member){
		logger.info("Member 저장");
		System.out.println(member.toString());
		
		
		int result = memberService.registerMember(member);
		
		logger.info("Member 저장 결과 : " + result);
		
		if(result == 5){
			//이미 픽토그램에 가입된 이메일이다.
			return null;
		} else if(result == 1){
			//가입했거나, 가입된 상태이다.
			
			member=memberService.findMemberByEmail(member.getEmail());
			System.out.println("member:"+member.toString());
			return member;
		} else {
			//그 밖의 에러상황, 발생할 이유가 없다.
			return null;
		}
	}
	
	/**
	 * 픽토그램 멤버찾기
	 * @param member
	 * @return
	 */
	@RequestMapping(value = "findMemberByMemberSeq", method = RequestMethod.POST)
	public Member findMemberByMemberSeq(@RequestBody int member_seq){
		logger.info("member 찾기 " + member_seq);
		
		Member memberResult = memberService.findMemberByMemberSeq(member_seq);
		return memberResult;
	}
	
	/**
	 * 멤버 탈퇴하기
	 * @param member_seq
	 * @param pw
	 * @return
	 */
	@RequestMapping(value = "withdrawMember", method = RequestMethod.DELETE)
	public String withrawMember(@RequestParam("member_seq") int member_seq, @RequestParam("pw") String pw,
			@RequestParam("join_route") String join_route){
		logger.info("멤버 탈퇴하기 : " + member_seq + ", " + pw + ", " + join_route);
		
		Member member = new Member();
		member.setMember_seq(member_seq);
		
		//문의 지우기
		int result_qa = qaService.deleteByMember_seq(member_seq);
		
		//멤버 지우기
		int result_member = memberService.deleteMemberByMemberSeq(member_seq); 
		
		if(result_member == 1){
			return "success";
		} else {
			return "fail";
		}
	}
	
	
	
}
