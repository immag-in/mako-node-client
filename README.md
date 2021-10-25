# Immagin Mako (NodeJS Client)

## Installation

```shell
npm install @immagin/mako
#or
yarn add @immagin/mako
```

### Usage

- Obtain your clientID and Client secret from Immagin developer console <https://console.immag.in>

```js
import Immagin from '@immagin/mako';

// by default Immagin looks for
// IMMAGIN_CLIENT_ID and IMMAGIN_CLIENT_SECRET
// in ENVIROMENT values you can override them like below.

const client = new Immagin({
	clientId,
	clientSecret,
});
```

#### Upload Signature

To get upload signature to be used for browser upload. if you don't provide filename, immagin will assign a unique key that uploading files should have the same name;

```js
const sign = await client.getUploadSignKey('abc.jpg');
```

#### Single Upload

If you're uploading your images from server, you can use the following command.

```js
// refer to example folder
const response = await client.uploadSingleFile(file);
```
