export interface ImmaginAuthInput {
	clientId: string | undefined | null;
	clientSecret: string | undefined | null;
}

export type uploadKeyInput = string;

export interface SignKeyOptions {
	showWarning?: boolean;
}

export interface File {
	name: string;
	data: Buffer;
	size: number;
	encoding: string;
	tempFilePath?: string;
	truncated: boolean;
	mimetype: string;
	md5: string;
	mv: Function;
}

export interface SignedKeyFields {
	key: string;
	bucket: string;
	'X-Amz-Algorithm': string;
	'X-Amz-Credential': string;
	'X-Amz-Date': string;
	Policy: string;
	'X-Amz-Signature': string;
}

export interface SignKeyData {
	url: string;
	fields: SignedKeyFields;
	id: string;
	key: string;
	lunaAccessURL: string;
}

interface putKeyResponse {
	url: string;
	key: string;
}

export interface PutHTTPResponse {
	data: putKeyResponse;
	ok: boolean;
	status: number;
	error: null | Error;
}
/**
 * @returns Immagin Upload certificate to be used for browser uploads, this certificate is only valid for 60 seconds.
 */
export interface PostHTTPResponse {
	data: SignKeyData;
	ok: boolean;
	status: number;
	error?: any;
}

interface ServerResponse {
	ok: boolean;
	status: number;
	error?: any;
}

export interface UploadResponse extends ServerResponse {
	data: {
		createdAt: number;
		key: string;
	};
}
