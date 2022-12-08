
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface GoogleLogin {
    accessToken: string;
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    idToken: string;
    imageUrl: string;
}

export interface LocationInput {
    coordinates: number[];
}

export interface UpdateUser {
    location?: Nullable<LocationInput>;
    name?: Nullable<string>;
    nickname?: Nullable<string>;
    surname?: Nullable<string>;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface Location {
    coordinates: number[];
    type: string;
}

export interface IMutation {
    loginGoogle(user: GoogleLogin): AuthResponse | Promise<AuthResponse>;
    rehydrate(): string | Promise<string>;
    updateUser(user: UpdateUser): boolean | Promise<boolean>;
}

export interface IQuery {
    isLogged(): boolean | Promise<boolean>;
    isUniqueNickname(nickname: string): boolean | Promise<boolean>;
    loggedUser(): User | Promise<User>;
    translate(language?: Nullable<string>): Translate | Promise<Translate>;
    user(id: string): User | Promise<User>;
    users(limit: number, offset: number): User[] | Promise<User[]>;
}

export interface Translate {
    ambition?: Nullable<string>;
    courage?: Nullable<string>;
    determination?: Nullable<string>;
    general?: Nullable<string>;
    geolocationButton?: Nullable<string>;
    geolocationDescription?: Nullable<string>;
    geolocationTitle?: Nullable<string>;
    honesty?: Nullable<string>;
    imagination?: Nullable<string>;
    independence?: Nullable<string>;
    invalidToken?: Nullable<string>;
    login?: Nullable<string>;
    loyalty?: Nullable<string>;
    maturity?: Nullable<string>;
    nickname?: Nullable<string>;
    nicknameMaxLength?: Nullable<string>;
    nicknameMinLength?: Nullable<string>;
    nicknameRequired?: Nullable<string>;
    nicknameUnique?: Nullable<string>;
    selfControl?: Nullable<string>;
    straightforwardness?: Nullable<string>;
    userNotFound?: Nullable<string>;
    userSetUpButton?: Nullable<string>;
    userSetUpDescription?: Nullable<string>;
    userSetUpTitle?: Nullable<string>;
}

export interface User {
    distance: number;
    email: string;
    googleToken: string;
    id: string;
    imageUrl: string;
    location: Location;
    name: string;
    nickname?: Nullable<string>;
    surname: string;
}

type Nullable<T> = T | null;
