import axios from 'axios';
import { Readable } from 'stream';
import ExifImage from 'exif';
import { asyncTry } from '@exivar/funtry';
import { ImmaginAuthInput } from '../types/core';

const API_URL = 'https://mako.immag.in';

export const upload = async (sign: { url: string; key: string }, file: any, auth: ImmaginAuthInput) => {
	try {
		const data = Readable.from(file.data);
		const contentLength = file.size;
		await axios({
			url: sign.url,
			data,
			method: 'PUT',
			headers: {
				'Content-Length': `${contentLength}`,
			},
		});

		const [exif = {}] = await asyncTry(ImageExifSync(file.data));
		const url = `${API_URL}/api/rest/v1/upload`;
		const [uploadResponse, uploadError] = await asyncTry(
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
					key: sign.key,
					exif,
				},
			})
		);
		if (uploadResponse) {
			return uploadResponse?.data;
		}
		return false;
	} catch (error) {
		console.log(error);
	}

	return true;
};

const ImageExifSync = (file: any) =>
	new Promise((resolve, reject) => {
		try {
			ExifImage(file, function (error, exifData) {
				if (error) reject(error);
				else resolve(exifData);
			});
		} catch (error) {
			console.log(error);
			throw 'exif error';
		}
	});
