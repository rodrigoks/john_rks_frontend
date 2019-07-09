
import { environment } from './../../../environments/environment';

export class AppSettings {

    private static PRODUCAO = false;

    public static isProducao(): boolean {
      return environment.production;
    }

    public static get HTTPS_URL(): string {
      return environment.url;
    }

    public static get APPLICATION_JSON(): string {
      return 'application/json';
    }

    public static get APPLICATION_MULTIPART_FORMDATA(): string {
      return 'multipart/form-data';
    }

    public static get APPLICATION_TEXT_PLAIN(): string {
      return 'text/plain';
    }

    public static get APPLICATION_X_WWW_FORM_URLENCODED(): string {
      return 'application/x-www-form-urlencoded';
    }

    public static get UNAUTHORIZED(): number {
      return 401;
    }

    public static get FORBIDDEN(): number {
      return 403;
    }

    public static get CONFLICT(): number {
      return 409;
    }

    public static get BAD_REQUEST(): number {
      return 400;
    }

    public static get MAX_FILES_SIZE(): number {
      return 1048576;
    }

}
