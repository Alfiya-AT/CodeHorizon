import { Request, Response, NextFunction } from 'express';
export declare const getSubjects: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getSubject: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSubjectTree: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getFirstVideo: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=subject.controller.d.ts.map