export interface User {
    id?: number;
    nickname?: string;
    avatarUrl?: string;
    profile?: string;
    gender?: boolean;
    age?: number;
    role: number;
    tags?: string[];
}

export interface SelfInfo {
    id?: number;
    account?: string;
    nickname?: string;
    avatarUrl?: string;
    profile?: string;
    gender?: boolean;
    age?: number;
    phone?: string;
    email?: string;
    createTime?: Date;
    role: number;
    tags?: string[];
}

export interface Page<T> {
    records?: T[];
    total?: number;
    size?: number;
    current?: number;
    orders?: [];
    optimizeCountSql?: boolean;
    optimizeJoinOfCountSql?: boolean;
    searchCount?: boolean;
    maxLimit?: number;
    countId?: number;
}

export interface Team {
    id?: number;
    name?: string;
    description?: string;
    maxNumber?: number;
    expireTime?: Date;
    userId: number;
    status: number;
    tags?: string[];
    createTime?: Date;
    members?: User[];
}

export interface BaseResponse<T> extends Promise<{
    code?: number;
    message?: string;
    data?: T;
}> {
}
