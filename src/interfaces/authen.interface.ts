import { IMemberDocument } from "./member.interface";

export interface IAuthen {
    genereateAccessToken(member: IMemberDocument) : Promise<String>
}