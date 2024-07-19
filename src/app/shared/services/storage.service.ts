import { Injectable } from '@angular/core';

export enum AuthKey {
    Credentials = 'CREDENTIALS',
}

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    protected credentials!: string | null;

    public setCredentials(email: string): void {
        sessionStorage.removeItem(AuthKey.Credentials);
        if (email) {
            sessionStorage.setItem(AuthKey.Credentials, email);
        }
    }

    public getCredentials(): string {
        return sessionStorage.getItem(AuthKey.Credentials)!;
    }

    public clear() {
        this.credentials = null;
        sessionStorage.clear();
    }
}
