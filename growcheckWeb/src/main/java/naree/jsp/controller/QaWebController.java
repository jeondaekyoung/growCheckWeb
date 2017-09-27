package naree.jsp.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import naree.db.domain.QaWeb;
import naree.service.QaWebService;
import naree.util.Sender_mail;

@Controller
@RequestMapping("QaWeb")
public class QaWebController {

	private static final Logger logger = LoggerFactory.getLogger(QaWebController.class);
	
	@Autowired
	private QaWebService qaWebService;
	
	/**
	 * 문의사항 목록읽어오기
	 * @param pageCnt, searchState
	 * @return
	 */
	@RequestMapping(value = "list.do", method=RequestMethod.POST)
	@ResponseBody
	public List<QaWeb> list(int pageCnt, String searchState){
		logger.info("QaWeb/list.do - 페이지번호 : " + pageCnt + "조회 상태 : " +  searchState);
		
		List<QaWeb> QaWebs = qaWebService.listQaWeb(pageCnt, searchState);
		
		return QaWebs;
	}
	/**
	 * 문의내용 보기
	 * @param qa_Web_seq
	 * @return
	 */
	@RequestMapping(value = "view.do", method=RequestMethod.GET)
	public ModelAndView view(@Param("qa_Web_seq")int qa_Web_seq){
		logger.info("QaWeb/view.do - 문의 번호 : " + qa_Web_seq);
		ModelAndView mv = new ModelAndView();
		
		QaWeb QaWeb = qaWebService.searchByQaWebSeq(qa_Web_seq);
		mv.addObject("QaWeb", QaWeb);
		
		mv.setViewName("admin/qaView-web");
		return mv;
	}
	/**
	 * 문의내용 저장 (사용자)
	 * @param qaWeb
	 * @return
	 */
	@RequestMapping(value = "write.do", method=RequestMethod.POST)
	public String write(QaWeb qaWeb){
		logger.info("QaWeb/write.do - 문의 하기 : " + qaWeb);
		
		qaWebService.registerQaWeb(qaWeb);
		String sender ="nareejdk@naver.com";
		String sender_pw ="naree123";
		String subject ="문의하기가 등록 되었습니다.( GrowCheck- 관리자)";
		String content ="<a href='http://i-growcheck.com/admin/index.do' target='_blank'>관리자 페이지에서 확인해주세요!<!-- Left Click icon by Icons8 --><img src='https://png.icons8.com/left-click/win8/26' title='Left Click' width='15' height='15'></a>"
				+ "<a target='_blank'></a><br><br>ID:naree<br>PW:개발자에게 문의 해주세요.<br><span style='color: rgb(255, 0, 0);'><b> 문의자에게 답변을 보낸뒤에는 꼭 답변완료를 체크해주세요! </b></span>";
		String [] receivers ={"fany.noh@gmail.com","job_1253@naver.com","aram@knowledge-seek.com","jdk7167@naver.com","gizemtopal@knowledge-seek.com"};
		for (int i = 0; i < receivers.length; i++) {
			String receiver =receivers[i];
			Sender_mail.send(sender,sender_pw, receiver, subject, content);
		}
		return "redirect:/contact.jsp";
	}
	/**
	 * 문의내용 답변
	 * @param QaWeb_seq,model
	 * @return
	 */
	@RequestMapping(value = "answerForm.do", method=RequestMethod.GET)
	public String answerForm(@Param("qa_Web_seq")int qa_Web_seq,Model model){
		logger.info("QaWeb/answerForm.do: 메일로 답변 폼 " + qa_Web_seq);
		
		QaWeb QaWeb = qaWebService.searchByQaWebSeq(qa_Web_seq);
		model.addAttribute("QaWeb", QaWeb);
	
		return "admin/answer_mail";
	}
	/**
	 * 문의내용 답변 메일 발송
	 * @param QaWeb_seq,HttpServletRequest,Model model
	 * @return
	 */
	@RequestMapping(value = "sendMail.do", method=RequestMethod.POST)
	public String sendMail(@Param("qa_Web_seq")int qa_Web_seq,HttpServletRequest request,Model model){
		logger.info("QaWeb/sendMail.do: 메일 보내기  " + qa_Web_seq);
		
		String sender_pw = request.getParameter("sender_pw");
		String sender = request.getParameter("sender");
		String receiver = request.getParameter("receiver");
		String subject = request.getParameter("subject");
		String content = request.getParameter("content");
		
		String script = Sender_mail.send(sender,sender_pw, receiver, subject, content);
		System.out.println(script);
		model.addAttribute("script",script);
		if(script.contains("성공")){
			qaWebService.updateStateQaWeb(qa_Web_seq);
		}
		
		return "admin/answer_mail";
	}
	
	/**
	 * 문의내용 수동 답변
	 * @param qa_Web_seq
	 * @return
	 */
	@RequestMapping(value = "manual_answer.do", method=RequestMethod.GET)
	public String manual_answer(@Param("qa_Web_seq")int qa_Web_seq,@Param("answer")String answer,Model model){
		System.out.println("답변자:"+answer);
		qaWebService.updateStateQaWeb(qa_Web_seq);
		qaWebService.modifyQaWeb(qa_Web_seq, answer);
		return "redirect:/views/admin/qaList-web.jsp";
	}
	/**
	 * 문의사항 삭제하기
	 * @param qa_Web_seq
	 * @return
	 */
	@RequestMapping(value = "erase.do", method=RequestMethod.POST)
	public ModelAndView erase(@Param("qa_Web_seq")int qa_Web_seq){
		logger.info("QaWeb/erase.do - 문의하기 번호 : " + qa_Web_seq);
		ModelAndView mv = new ModelAndView();
		
		qaWebService.eraseByqa_web_Seq(qa_Web_seq);
		mv.setViewName("admin/qaList-web");
		return mv;
	}
}
