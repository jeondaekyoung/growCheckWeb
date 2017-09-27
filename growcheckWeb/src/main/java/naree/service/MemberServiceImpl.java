package naree.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import naree.dao.MemberDao;
import naree.db.domain.Member;

@Service
public class MemberServiceImpl implements MemberService{

	private static final Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);
	
	@Autowired
	private MemberDao memberDao;
	
	/**
	 * member 저장
	 * @param member
	 * @return 
	 */
	@Override
	public int registerMember(Member member) {
		int result = 100;
		
			result = memberDao.selectMemberExistByEmail(member.getEmail());
			logger.info("가입확인 : " + result);
			if(result == 0){
				//가입
				result = memberDao.insertMember(member);
			} else if(result == 1){
				logger.info("이미 픽토그램에 가입된 이메일입니다");
				return 5;
			}
			return result;
			
	}

	/**
	 * member_seq로 멤버찾기
	 * @param member_seq
	 * @return
	 */
	@Override
	public Member findMemberByMemberSeq(int member_seq) {
		
		return memberDao.selectMemberByMemberSeq(member_seq);
	}

	/**
	 * e메일로 멤버 찾기
	 * @param email
	 * @return
	 */
	@Override
	public Member findMemberByEmail(String email) {

		return memberDao.selectMemberByEmail(email);
	}

	
	
	/**
	 * 멤버 지우기
	 * @param member_seq
	 * @return
	 */
	@Override
	public int deleteMemberByMemberSeq(int member_seq) {
		//멤버 지우기
		logger.info("멤버 지우기");
		return memberDao.deleteMemberByMemberSeq(member_seq);
	}


}
