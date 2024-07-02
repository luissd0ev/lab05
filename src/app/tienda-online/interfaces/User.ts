export interface UserInfoCredentials{
    email: string;
    passworduser: string; 
}

export interface LoginUserResponse {
    message: string;
    isSuccessful: boolean;
    userId: number;
    userName: string | null;
  }
