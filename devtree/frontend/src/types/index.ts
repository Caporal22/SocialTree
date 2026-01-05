import type { Enabled } from "@tanstack/react-query";

export type User = {
    handle : string
    name: string;
    email: string;
    password: string;
    description: string;
    image:string;
}

export type RegisterForm = Pick<User, 'name' | 'email' | 'handle' > & {
    password: string;
    password_confirmation: string;

}

export type LoginForm = Pick<User, 'email' | 'password'>;

export type ProfileForm = Pick<User, 'handle' | 'description'>

export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>