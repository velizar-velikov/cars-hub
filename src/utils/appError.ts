export class AppError extends Error {
    readonly view: string;
    readonly data: object;

    constructor(view: string, error: any, data: object) {
        super();
        this.view = view;
        this.data = data;
        Object.setPrototypeOf(this, error);
    }
}
