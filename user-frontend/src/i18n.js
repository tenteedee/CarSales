import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const apiKey = "7i4tHzCJbe7BRs1nEmRDsQ"; // Sử dụng API key của bạn
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',  // Ngôn ngữ mặc định
        ns: ['default'],    // Namespace chính
        defaultNS: 'default',
        supportedLngs: ['en', 'vn'], // Các ngôn ngữ được hỗ trợ
        backend: {
            loadPath: loadPath,
        },
        interpolation: {
            escapeValue: false, // React đã xử lý XSS
        },
    });

export default i18next;
