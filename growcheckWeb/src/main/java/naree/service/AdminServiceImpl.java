package naree.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import naree.dao.AdminDao;
import naree.db.domain.Admin;
import naree.util.exception.GrowCheckWebException;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminDao adminDao;

	/**
	 * 관리자 로그인하기
	 * 관리자 아이디가 사용중인지, 비밀번호는 맞는지 확인한다.
	 * @param id
	 * @param pw
	 * @return
	 */
	@Override
	public Admin login(String id, String pw) {
		System.out.println("AdminServiceImpl.login()");
		Admin admin = adminDao.searchAdminById(id);
		
		if(admin == null){
			throw new GrowCheckWebException("존재하지 않는 아이디입니다");
		}
		
		admin.setPw(pw);
		if(!adminDao.searchAdminByAdmin(admin)){
			throw new GrowCheckWebException("잘못된 패스워드입니다");
		}
		
		return admin;
	}

	/**
	 * 구매내역 저장
	 * @param price
	 * @param etc
	 * @return
	 */
	@Override
	public int buy(String price, String etc) {
		return adminDao.registerBuy(price, etc);
	}

	/**
	 * 구매내역 조회
	 * @param price
	 * @param etc
	 * @return
	 */
	@Override
	public int totalPrice() {
		return adminDao.totalPrice();
	}
	
}
