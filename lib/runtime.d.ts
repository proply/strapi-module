import { CookieSerializeOptions } from 'cookie';
import Hookable from 'hookable';
import { NuxtHTTPInstance } from '@nuxt/http';
import { NuxtCookies } from 'cookie-universal-nuxt';

declare type NuxtStrapiUser = Record<string, any>;
declare type NuxtStrapiVersion = 3 | 4;
declare type NuxtStrapiQueryParams = string | {
    [key: string]: string | number | boolean;
} | Array<Array<string | number | boolean>> | URLSearchParams;
interface NuxtStrapiLoginResult {
    user: NuxtStrapiUser;
    jwt: string;
}
interface StrapiOptions {
    url: string;
    key: string;
    version: NuxtStrapiVersion;
    expires: 'session' | number;
    cookie: CookieSerializeOptions;
}
interface NuxtStrapiRegistrationData {
    username: string;
    email: string;
    password: string;
}
interface NuxtStrapiLoginData {
    /**
     * Can be either the email or the username set by the user.
     * */
    identifier: string;
    password: string;
}
interface NuxtStrapiEmailData {
    email: string;
}
interface NuxtStrapiResetPasswordData {
    code: string;
    password: string;
    passwordConfirmation: string;
}
interface NuxtStrapiModuleOptions {
    version: NuxtStrapiVersion;
    url: string;
    entities: string[];
    key: string;
    expires: 'session' | string | number;
    cookie: CookieSerializeOptions;
}

declare class Strapi extends Hookable {
    private state;
    $cookies: NuxtCookies;
    $http: NuxtHTTPInstance;
    options: StrapiOptions;
    versionPrefix: string;
    constructor(ctx: any, options: StrapiOptions);
    get user(): NuxtStrapiUser;
    set user(user: NuxtStrapiUser);
    register(data: NuxtStrapiRegistrationData): Promise<NuxtStrapiLoginResult>;
    login(data: NuxtStrapiLoginData): Promise<NuxtStrapiLoginResult>;
    forgotPassword(data: NuxtStrapiEmailData): Promise<unknown>;
    resetPassword(data: NuxtStrapiResetPasswordData): Promise<NuxtStrapiLoginResult>;
    sendEmailConfirmation(data: NuxtStrapiEmailData): Promise<unknown>;
    logout(): Promise<void>;
    fetchUser(): Promise<NuxtStrapiUser>;
    setUser(user: any): Promise<void>;
    find<T = any, E = string>(entity: E, searchParams?: NuxtStrapiQueryParams): Promise<T>;
    count<T = any, E = string>(entity: E, searchParams?: NuxtStrapiQueryParams): Promise<T>;
    findOne<T = any, E = string>(entity: E, id: string, searchParams?: NuxtStrapiQueryParams): Promise<T>;
    create<T = any, E = string>(entity: E, data: NuxtStrapiQueryParams): Promise<T>;
    update<T = any, E = string>(entity: E, id: string, data: NuxtStrapiQueryParams): Promise<T>;
    delete<T = any, E = string>(entity: E, id: string): Promise<T>;
    graphql<T = any>(query: any): Promise<T>;
    private getClientStorage;
    getToken(): string;
    setToken(token: string): void;
    clearToken(): void;
    private syncToken;
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $strapi: Strapi;
    }
    interface Context {
        $strapi: Strapi;
    }
    interface Configuration {
        strapi?: Partial<NuxtStrapiModuleOptions>;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        $strapi: Strapi;
    }
}
declare module 'vuex/types/index' {
    interface Store<S> {
        $strapi: Strapi;
    }
}

export { Strapi };
