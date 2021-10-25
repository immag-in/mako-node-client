// import axios from 'axios';
import { asyncTry } from '@exivar/funtry';
import axios from 'axios';
import chalk from 'chalk';
import { SignKeyOptions, ImmaginAuthInput, PutHTTPResponse, PostHTTPResponse } from '../types/core';

const API_URL = 'https://mako.immag.in';
/**
 * @returns string put url
 */
export const getPutSignKey = async (auth: ImmaginAuthInput, filename?: string | null) => {
	const url = `${API_URL}/api/rest/v1/puturl`;
	const [sign, signError] = await asyncTry(
		axios({
			method: 'POST',
			url,
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				client: auth.clientId,
				secret: auth.clientSecret,
			},
			data: {
				filename,
			},
		})
	);
	if (signError) {
		throw signError;
	}
	return sign?.data as PutHTTPResponse;
};
export const getPostKey = async (auth: ImmaginAuthInput, options: SignKeyOptions, filename?: string | null) => {
	if (!filename && options.showWarning) {
		console.log(
			chalk.yellowBright(
				'⚠️ If you do not provide filename, Immagin will automatically assigns an automated key for you'
			)
		);
	}

	const url = `${API_URL}/api/rest/v1/postsign`;
	const [sign, signError] = await asyncTry(
		axios({
			method: 'POST',
			url,
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				client: auth.clientId,
				secret: auth.clientSecret,
			},
			data: {
				filename,
			},
		})
	);
	if (signError) {
		throw signError;
	}
	return sign?.data as PostHTTPResponse;
};
