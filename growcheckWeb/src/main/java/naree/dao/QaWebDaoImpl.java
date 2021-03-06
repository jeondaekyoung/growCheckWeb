package naree.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import naree.db.domain.QaWeb;
import naree.db.mapper.QaWebMapper;
import naree.util.factory.ConnectionFactory;

@Repository
public class QaWebDaoImpl implements QaWebDao {

	/**
	 * 회원의 문의내용 읽어오기
	 * @param member_seq
	 * @param pageCnt
	 * @return
	 */
	@Override
	public List<QaWeb> selectQaWebByMemberSeq(int member_seq, int pageCnt) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		List<QaWeb> result;
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("member_seq", member_seq);
		map.put("pageCnt", pageCnt*10);
		try {
			QaWebMapper QaWebMapper = sqlSession.getMapper(QaWebMapper.class);
			result = QaWebMapper.selectQaWebByMemberSeq(map);
		} finally {
			sqlSession.close();
		}
		return result;
	}

	/**
	 * 문의내용 저장하기
	 * @param QaWeb
	 * @return
	 */
	@Override
	public int insertQaWeb(QaWeb QaWeb) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		int result = 0;
		try{
			QaWebMapper QaWebMapper = sqlSession.getMapper(QaWebMapper.class);
			result = QaWebMapper.insertQaWeb(QaWeb);
		}finally{
			sqlSession.commit();
			sqlSession.close();
		}
		return result;
	}

	/**
	 * 문의사항 목록 읽어오기
	 * @param pageCnt, searchState
	 * @return
	 */
	@Override
	public List<QaWeb> listQaWeb(int pageCnt, String searchState) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		List<QaWeb> result = new ArrayList<QaWeb>();
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("pageCnt",  pageCnt*10);
		map.put("searchState", searchState);
		try {
			QaWebMapper QaWebMapper = sqlSession.getMapper(QaWebMapper.class);
			result = QaWebMapper.listQaWeb(map);
		} finally {
			sqlSession.close();
		}
		return result;
	}

	/**
	 * 문의사항 답변 저장하기
	 * @param QaWeb_seq, answer
	 * @return
	 */
	@Override
	public int modifyQaWeb(int qa_Web_seq, String answer) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		int result = 0;
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("qa_Web_seq",  qa_Web_seq);
		map.put("answer", answer);
		try {
			QaWebMapper QaWebMapper = sqlSession.getMapper(QaWebMapper.class);
			result = QaWebMapper.modifyQaWeb(map);
		} finally {
			sqlSession.commit();
			sqlSession.close();
		}
		return result;
	}

	/**
	 * 문의사항 읽어오기
	 * @param QaWeb_seq
	 * @return
	 */
	@Override
	public QaWeb selectByQaWebSeq(int QaWeb_seq) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		QaWeb result = null;
		try {
			QaWebMapper QaWebMapper = sqlSession.getMapper(QaWebMapper.class);
			result = QaWebMapper.selectByQaWebSeq(QaWeb_seq);
		} finally {
			sqlSession.close();
		}
		return result;
	}
	
	/**
	 * 문의사항 답변상태 변경
	 * @param QaWeb_seq
	 * @return
	 */
	@Override
	public int updateStateQaWeb(int qa_Web_seq) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		int result = 0;
		try {
			QaWebMapper QaWebMapper = sqlSession.getMapper(QaWebMapper.class);
			result = QaWebMapper.updateStateQaWeb(qa_Web_seq);
		} finally {
			sqlSession.commit();
			sqlSession.close();
		}
		return result;
	}
	/**
	 * 문의사항 답변상태 되돌리기
	 * @param QaWeb_seq
	 * @return
	 */
	@Override
	public int updateStateResetQaWeb(int qa_Web_seq) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		int result = 0;
		try {
			QaWebMapper QaWebMapper = sqlSession.getMapper(QaWebMapper.class);
			result = QaWebMapper.updateStateResetQaWeb(qa_Web_seq);
		} finally {
			sqlSession.commit();
			sqlSession.close();
		}
		return result;
	}
	/**
	 * 문의사항 삭제
	 * @param qa_Web_seq
	 * @return
	 */
	@Override
	public int eraseByqa_web_Seq(int qa_Web_seq) {
		SqlSession sqlSession = ConnectionFactory.getInstance().getSqlSession();
		int result = 0;
		try {
			QaWebMapper QaWebMapper = sqlSession.getMapper(QaWebMapper.class);
			result = QaWebMapper.eraseByqa_web_Seq(qa_Web_seq);
		} finally {
			sqlSession.commit();
			sqlSession.close();
		}
		return result;
	}

}
