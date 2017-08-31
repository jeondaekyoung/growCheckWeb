package naree.db.mapper;

import naree.db.domain.Member;

public interface MemberMapper {

	/**
	 * 멤버 가입하기
	 * @param member
	 * @return
	 */
	int insertMember(Member member);

	/**
	 * 픽토그램 로그인시 가입한 멤버인지 확인
	 * @param email
	 * @return
	 */
	int selectMemberExistByEmail(String email);

	/**
	 * 이메일로 멤버찾기(이용약관및개인정보취급방침을 위해 멤버시퀀스가필요)
	 * @param email
	 * @return
	 */
	Member selectMemberByEmail(String email);

	/**
	 * member_seq로 멤버찾기
	 * @param member_seq
	 * @return
	 */
	Member selectMemberByMemberSeq(int member_seq);

	/**
	 * 멤버 지우기
	 * @param member_seq
	 * @return
	 */
	int deleteMemberByMemberSeq(int member_seq);

	
}


