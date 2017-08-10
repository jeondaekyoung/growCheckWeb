package naree.jsp.controller;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SiteMapController {

	private static final Logger logger = LoggerFactory.getLogger(SiteMapController.class);
	
	
	//특정 경로에 ftp로 업로드한 파일 찾아 파일 다운로드		
				
	@RequestMapping("/SiteMap/{file_name:.+}")
		@ResponseBody
	public ResponseEntity<FileSystemResource> ftp_down(@PathVariable("file_name") String file_name, HttpServletRequest req){		
		 
		String file_Path=req.getSession().getServletContext().getRealPath("/"+file_name);
		
			File file = new File(file_Path);		
			
			HttpHeaders header = new HttpHeaders();		
			header.setContentLength(file.length());		
			//whoAmi = Thread.currentThread().getStackTrace()[1].toString();		
			String fileName="";		
			ResponseEntity<FileSystemResource> entity = null;		
			try {		
						
				fileName = URLEncoder.encode(file_name, "UTF-8");		
				if(req!=null){		
					String userAgent=req.getHeader("user-agent");		
					 
					if(userAgent!=null&&userAgent.contains("Trident")){//IE 일 때		
					fileName = URLEncoder.encode(file_name, "EUC-KR");		
							
					 }		
				}		
						
				fileName = URLDecoder.decode(fileName, "ISO8859_1");		
			} catch (UnsupportedEncodingException e) {		
				e.printStackTrace();		
						
			}		
			try {		
				/*if(ext.equals("zip")){		
					header.set("Content-Type", "application/zip");		
				  else{		
				  	header.set("Content-Type", "application/xml");		
				  }		
				}*/		
				header.set("Content-disposition", "attachment; filename="+ fileName);		
				//System.out.println("file.exists():"+file.exists());		
			if(file.exists()){		
						
			entity = new ResponseEntity<FileSystemResource>(new FileSystemResource(file), header, HttpStatus.OK);		
			}		
			} catch (Exception e) {		
		
				e.printStackTrace();		
		
			}		
			return entity;		
					
		}		
	
}
