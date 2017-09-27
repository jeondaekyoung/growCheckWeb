package naree.util.exception;

public class GrowCheckWebException extends RuntimeException {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3723074792587584831L;

	public GrowCheckWebException(String message){
		super(message, null, false, false);
	}
	
	public GrowCheckWebException(Exception exception){
		super(exception.getMessage(), null, false, false);
	}
}
