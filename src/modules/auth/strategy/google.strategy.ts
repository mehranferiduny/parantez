import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class  GoogleStrategy extends PassportStrategy(Strategy,"google"){
  constructor(){
    super({
      clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLINET_SECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect",
    scope:['email','profile']
    })
  }

  async validate(acssesToken:string,refreshToken:string,profile:any,done:VerifyCallback){
   const {name,emails,photos}=profile
   const{ givenName:fristName,familyName:lastName}=name
   const [emailData]=emails;
   const [image]=photos
   const users={
    fristName,
    lastName,
    email:emailData?.value,
    profile_photo:image?.value,
    acssesToken
   }

    done(null,users)
  }
}