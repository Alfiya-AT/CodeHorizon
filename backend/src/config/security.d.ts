export declare const securityConfig: {
    jwt: {
        accessExpiresIn: string;
        refreshExpiresIn: string;
        refreshExpiresInSeconds: number;
    };
    cookie: {
        httpOnly: boolean;
        secure: boolean;
        sameSite: "none" | "lax";
        domain: string;
        path: string;
        maxAge: number;
    };
    cors: {
        origin: string;
        credentials: boolean;
    };
};
//# sourceMappingURL=security.d.ts.map