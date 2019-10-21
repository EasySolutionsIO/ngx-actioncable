export class NgxActionCableConfiguration {
    
    urls = new Map<string, string>();

    constructor(key: string, url: string) {
        this.urls.set(key, url);
    }
    
    
    addUrl(key: string, url: string) {
        this.urls.set(key, url);
    }

}
