export class NgxActionCableConfiguration {
    
    urls = new Map<string, string>();

    constructor(url: string, key?: string) {
        if (key == null) {
            key = ''; // default key
        }
        this.urls.set(key, url);
    }
    
    addUrl(key: string, url: string) {
        this.urls.set(key, url);
    }

}
