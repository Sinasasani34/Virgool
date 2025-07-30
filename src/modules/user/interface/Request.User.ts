// request for user
export interface RequestUser {
    id: number;
    profileId?: number;
    new_email: string;
    new_phone: string;
}