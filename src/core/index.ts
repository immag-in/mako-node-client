import { asyncTry } from '@exivar/funtry';
import { ImmaginAuthInput, uploadKeyInput, SignKeyOptions, UploadResponse, SignOptionType } from '../types/core';
import { getPutSignKey, getPostKey } from '../core/sign';
import { upload } from './upload';
import chalk from 'chalk';


class Immagin {
  protected _clientId: string;
  protected _clientSecret: string;

  constructor(auth?: ImmaginAuthInput) {
    this._clientId = process.env.IMMAGIN_CLIENT_ID || auth?.clientId || '';
    this._clientSecret = process.env.IMMAGIN_CLIENT_SECRET || auth?.clientSecret || '';
  }
  protected _buildSignOptions(options?: SignKeyOptions): SignKeyOptions {
    return {
      showWarning: options?.showWarning ?? true,
      type: options?.type || SignOptionType.PHOTO
    }
  }
  private _verifyClient() {
    if (!this._clientId || !this._clientSecret) {
      return false;
    }
    return true;
  }

  /**
   * 
   * @param key filename with extension
   * @param options immagin client options
   * @returns permission keys to be used for browser based uploads
   */
  
  async getUploadSignKey(key: uploadKeyInput, options?: SignKeyOptions) {
    if (!this._verifyClient()) {
      throw Error('clientId or ClientSecret error')
    }
    const [sign, err] = await asyncTry(
      getPostKey({
        clientId: this._clientId,
        clientSecret: this._clientSecret
        },
        this._buildSignOptions(options),
        key
      ) 
    )
    if (err) {
      throw err as Error;
    }
    return sign;
  }

  /**
   * 
   * @param file image file 
   * @returns upload response with key and date
   */
  async uploadSingleFile(file: any) {
    if (!this._verifyClient()) {
      throw Error('clientId or ClientSecret error')
    }
    const [sign, err] = await asyncTry(
      getPutSignKey({
        clientId: this._clientId,
        clientSecret: this._clientSecret
      }, file?.name)
    );
    if (err) {
      throw err as Error;
    }
    const [uploadResponse, uploadError] = await asyncTry(
      upload(
        sign?.data!,
        file,
        { clientId: this._clientId, clientSecret: this._clientSecret }
      )
    );
    if (uploadError) {
      throw uploadError;
    }
    return uploadResponse as UploadResponse;
  }
}

export default Immagin;