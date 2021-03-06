package naree.db.mapper;

import java.util.HashMap;

import naree.db.domain.Admin;

public interface AdminMapper {

	/**
	 * 관리자 아이디 확인
	 * @param id
	 * @return
	 */
	Admin searchAdminById(String id);

	/**
	 *  관리자 비번 확인
	 * @param admin
	 * @return
	 */
	int searchAdminByAdmin(Admin admin);
	
	/**
	 *  구매내역 저장
	 * @param admin
	 * @return
	 */
	int registerBuy(HashMap<String, Object> map);
	
	/**
	 *  구매내역 조회
	 * @param admin
	 * @return
	 */
	int totalPrice();

}
