export class Error{
	public errorMsg: string;
	public errorCode: ErrorCode;
	constructor(errorMsg: string, errorCode: ErrorCode) {
		this.errorMsg = errorMsg;
		this.errorCode = errorCode;
	}

}
export enum ErrorCode {
	// 1000 Auth
	// 1100 Login
	LoginMissingField = 1101,
	// 1200 Register
	RegisterMissingField = 1201,



}
