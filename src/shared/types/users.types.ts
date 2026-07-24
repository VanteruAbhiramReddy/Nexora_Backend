export interface User{
    id:number;
    name:string;
    email:string;
    password:string,
    hashed_password :string
    bio:string,
    phone:string,
    linked_in_url : string,
    github_url : string,
    avatar_url : string,
}

export type SafeData = Omit<User,"password">

export type SafeUser = Omit<User,"password"|"hashed_password">