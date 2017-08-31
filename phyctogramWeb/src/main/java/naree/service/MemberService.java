package naree.service;

import naree.db.domain.Member;

public interface MemberService {

	/**
	 * member 저장
	 * @param member
	 * @return 
	 */
	int registerMember(Member member);


	/**
	 * member_seq로 멤버찾기
	 * @param member_seq
	 * @return
	 */
	Member findMemberByMemberSeq(int member_seq);


	/**
	 * member_seq와 pw로 멤버 찾기
	 * @param member
	 * @return
	 */
	int findMemberByMemberSeqPw(Member member);


	/**
	 * 멤버 지우기
	 * @param member_seq
	 * @return
	 */
	int deleteMemberByMemberSeq(int member_seq);
}
