export interface SearchPageParams {
    current?: number;
    size?: number;
    keyword?: string;
}

export interface UserLoginParams {
    account?: string;
    password?: string;
}

export interface UserRegisterParams {
    account?: string;
    password?: string;
    checkPassword?: string;
}

export type SearchUserParams = SearchPageParams & {
    nickname?: string;
    tags?: string[];
}

export interface UpdateUserParams {
    id?: number;
    nickname?: string;
    avatarUrl?: string;
    profile?: string;
    gender?: boolean;
    age?: number;
    phone?: string;
    email?: string;
    tags?: string[];
}

export interface CreateTeamParams {
    name: string;
    description?: string;
    maxNumber?: number;
    expireTime?: Date;
    userId?: number;
    status?: number;
    password?: string;
    tags?: string[];
}

export interface UpdateTeamParams {
    id: number;
    name?: string;
    description?: string;
    maxNumber?: number;
    expireTime?: Date;
    userId?: number;
    status?: number;
    password?: string;
    tags?: string[];
}

export interface JoinTeamParams {
    teamId?: number;
    password?: string;
}

export type SearchTeamParams = SearchPageParams & {
    keyword?: string;
}
