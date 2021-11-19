import express, { Application, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import compression from 'compression'; // compresses requests

import Immagin from '../../../lib/core'; // for testing purposes only

const client = new Immagin();

const PORT: number = <number | undefined>process.env.PORT || 3000;

const app: Application = express();

app.use(fileUpload());

// Express configuration
app.set('port', PORT);
app.use(express.json());
app.use(compression());

/**
 * Primary app routes.
 */
app.post('/sign', async (req: Request, res: Response) => {
  try {
		const sign = await client.getUploadSignKey('img1.jpg');
		res.status(200).json(sign);
	} catch (error) {
		res.status(200).json(error);
	}
});
app.post('/upload', async (req: Request, res: Response) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}
	try {
		const resp = await client.uploadSingleFile(req?.files?.file);
		res.json(resp);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
});

export default app;
