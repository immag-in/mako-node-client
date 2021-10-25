// import '@types/jest';
import Immagin from '../core';

const clientId = 'ckuz224y000242ds1yjfrqrwj';
const clientSecret = 'e26cd9513e8a74c9e2b971d863358a0971de6fb19e05ff62c9741aaffac718f7';

const client = new Immagin({
	clientId,
	clientSecret,
});

test('Get Sign key', async () => {
	const res = await client.getUploadSignKey();
	expect(res?.status).toBe(200);
});
