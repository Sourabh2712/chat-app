declare global {
    interface Window {
        _API_URL_: string;
    }
}

export const Environment = {
    production: false,
    title: 'Chat App',
    appVersion: '1.0.0',
    API_URL: window._API_URL_ || 'https://groomrtest.learnindialearn.org/api/',
};
