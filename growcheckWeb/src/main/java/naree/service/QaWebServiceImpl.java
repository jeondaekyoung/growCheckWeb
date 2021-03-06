package naree.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import naree.dao.QaWebDao;
import naree.db.domain.QaWeb;

@Service
public class QaWebServiceImpl implements QaWebService {

	@Autowired
	private QaWebDao QaWebDao;
	
	/**
	 * 회원의 문의내용 읽어오기
	 * @param member_seq
	 * @param pageCnt
	 * @return
	 */
	@Override
	public List<QaWeb> findQaWebByMemberSeq(int member_seq, int pageCnt) {
		
		return QaWebDao.selectQaWebByMemberSeq(member_seq, pageCnt);
	}

	/**
	 * 문의내용 저장하기
	 * @param QaWeb
	 * @return
	 */
	@Override
	public int registerQaWeb(QaWeb QaWeb) {
		
		return QaWebDao.insertQaWeb(QaWeb);
	}

	/**
	 * 문의사항 목록 불러오기
	 * @param pageCnt
	 * @return
	 */
	@Override
	public List<QaWeb> listQaWeb(int pageCnt, String searchState) {
		
		return QaWebDao.listQaWeb(pageCnt, searchState);
	}

	/**
	 * 문의사항 답변 저장하기
	 * @param QaWeb_seq, answer
	 * @return
	 */
	@Override
	public int modifyQaWeb(int QaWeb_seq, String answer) {
		
		return QaWebDao.modifyQaWeb(QaWeb_seq, answer);
	}

	/**
	 * 문의사항 읽어오기
	 * @param QaWeb_seq
	 * @return
	 */
	@Override
	public QaWeb searchByQaWebSeq(int QaWeb_seq) {
		
		return QaWebDao.selectByQaWebSeq(QaWeb_seq);
	}
	
	/**
	 * 문의사항 답변상태 변경
	 * @param QaWeb_seq
	 * @return
	 */
	@Override
	public int updateStateQaWeb(int QaWeb_seq) {
		return QaWebDao.updateStateQaWeb(QaWeb_seq);
	}
	
	
	/**
	 * 문의사항 답변상태 되돌리기
	 * @param QaWeb_seq
	 * @return
	 */
	@Override
	public int updateStateResetQaWeb(int qa_Web_seq) {
		return QaWebDao.updateStateResetQaWeb(qa_Web_seq);
	}
	
	/**
	 * 문의사항 삭제
	 * @param qa_Web_seq
	 * @return
	 */
	@Override
	public int eraseByqa_web_Seq(int qa_Web_seq) {
		return QaWebDao.eraseByqa_web_Seq(qa_Web_seq);
	}

}
