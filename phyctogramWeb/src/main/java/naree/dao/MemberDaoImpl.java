package naree.dao;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import naree.db.domain.Member;
import naree.db.mapper.MemberMapper;
import naree.util.factory.ConnectionFactory;

@Repository
public class MemberDaoImpl implements MemberDao {

	private static final Logger logger = LoggerFactory.getLogger(MemberDaoImpl.class);
	
	/**
	 * 멤버 가입하기
	 * @param member
	 * @return
	 */
	@Override
	public int insertMember(Member member) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		int result = 0;
		try{
			MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
			result = memberMapper.insertMember(member);
		}finally{
			sqlSession.commit();
			sqlSession.close();
		}
		return result;
	}

	/**
	 * 픽토그램 로그인시 가입한 멤버인지 확인
	 * @param email
	 * @return
	 */
	@Override
	public int selectMemberExistByEmail(String email) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		int result = 0;
		try{
			MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
			result = memberMapper.selectMemberExistByEmail(email);
		}finally{
			sqlSession.close();
		}
		return result;
	}

	/**
	 * 이메일로 멤버찾기(이용약관및개인정보취급방침을 위해 멤버시퀀스가필요)
	 * @param email
	 * @return
	 */
	@Override
	public Member selectMemberByEmail(String email) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		Member result;
		try{
			MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
			result = memberMapper.selectMemberByEmail(email);
		}finally{
			sqlSession.close();
		}
		return result;
	}

	/**
	 * member_seq로 멤버찾기
	 * @param member_seq
	 * @return
	 */
	@Override
	public Member selectMemberByMemberSeq(int member_seq) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		Member result;
		try{
			MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
			result = memberMapper.selectMemberByMemberSeq(member_seq);
		}finally{
			sqlSession.close();
		}
		return result;
	}


	/**
	 * 멤버 지우기
	 * @param member_seq
	 * @return
	 */
	@Override
	public int deleteMemberByMemberSeq(int member_seq) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		int result = 0;
		try{
			MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
			result = memberMapper.deleteMemberByMemberSeq(member_seq);
		}finally{
			sqlSession.commit();
			sqlSession.close();
		}
		return result;
	}


}
