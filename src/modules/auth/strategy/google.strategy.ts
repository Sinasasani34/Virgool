import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, StrategyOptions, VerifyCallback } from "passport-google-oauth20";
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        const options: StrategyOptions = {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET_ID!,
            callbackURL: "http://localhost:3000/auth/google/redirect",
            scope: ['email', 'profile']
        }
        super(options);
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
        const { name, emails, photo } = profile;
        const { givenName: firstName, familyName: lastName } = name;
        const [emailData] = emails || [];
        const [image] = photo || [];
        const user = {
            firstName,
            lastName,
            email: emailData?.value,
            profile_image: image?.value || null,
            accessToken
        }
        console.log(JSON.stringify(profile, null, 2));
        done(null, user)
    }

}