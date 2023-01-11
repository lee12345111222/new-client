import React, { createContext, useEffect, useState, Dispatch, SetStateAction, memo } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'

import zh from './i18n/zh.json'

export type LocaleProps = {
    setLocale: Dispatch<SetStateAction<string>>
    locale: string
    jsonData: any
}

export const localeContext = createContext<LocaleProps | null>(null)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const Root = memo(() => {
    const [locale, setLocale] = useState('zh')
    const [messages, setMessages] = useState(zh)
    /**
     * 根據 locale 設定的指標，判斷該讀取哪個語言設定檔
     */
    useEffect(() => {
        if (locale.includes('zh')) setMessages(zh)

        document.documentElement.lang = locale
    }, [locale])
    return <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
        <Provider store={store}>
            <localeContext.Provider value={{ locale, setLocale, jsonData: messages }}>
                <App />
            </localeContext.Provider>

        </Provider>
    </IntlProvider>
})
root.render(
    <Root />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();