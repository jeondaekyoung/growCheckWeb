package naree.jsp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import naree.service.CommonService;

@Controller
@RequestMapping("fileUpload")
public class FileUploadController {

	private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);
	
	@Autowired
	private CommonService commonService;

	
	//single1
	@RequestMapping(value = "single1", method = RequestMethod.POST)
	public @ResponseBody String single1(@RequestParam(value = "myfile") MultipartFile myfile){
		System.out.println("single1 실행");
		if(myfile == null){
			logger.info("fileUpload/single1 : " + "myfile은 없다");
		} else {
			logger.info("fileUpload/single1 : " + myfile.getOriginalFilename());
		}
		
		return "test1";
	}
	
	//single2
	@RequestMapping(value = "single2", method = RequestMethod.POST)
	public @ResponseBody String single2(@RequestBody MultipartFile myfile){
		System.out.println("single2 실행");
		if(myfile == null){
			logger.info("fileUpload/single2 : " + "myfile은 없다");
		} else {
			logger.info("fileUpload/single2 : " + myfile.getOriginalFilename());
		}
		
		return "test2";
	}
	
	//single3
	@RequestMapping(value = "single3", method = RequestMethod.POST)
	public @ResponseBody String single3(MultipartFile myfile){
		System.out.println("single3 실행");
		if(myfile == null){
			logger.info("fileUpload/single3 : " + "myfile은 없다");
		} else {
			logger.info("fileUpload/single3 : " + myfile.getOriginalFilename());
		}
		
		return "test3";
	}
	
	@RequestMapping(value = "hallym", method = {RequestMethod.POST, RequestMethod.GET}, produces = "text/plain;charset=UTF-8")
	public String hallym(@RequestParam("myfile") MultipartFile file){
		System.out.println("hallym 실행");
		//String whoAmi = Thread.currentThread().getStackTrace()[1].toString();
		
		if(file != null){
			logger.info("file size : " + file.getSize());
		} else {
			logger.info("file이 없다");
		}
		
		return "hallym";
	}

}
