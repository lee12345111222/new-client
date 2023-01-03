import { Dispatch, SetStateAction } from 'react'
import socket from './socket'

export function sktFetch<T = any>(event: string, data = {}): Promise<{ error: string | null; data: T | null }> {
    return new Promise((resolve) => {
        socket.emit(event, data, ({ error, data }: any) => {
            resolve({ error, data })
        })
    })
}

export const handleTimestampToString = (timestamp: number): string => {
    const hour = new Date(timestamp).getHours()
    const date = new Date(timestamp)

    return `${hour}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`
}

export const removeDup = <T>(mergedArr: T[], check: (m: T) => string) => {
    const set = new Set()
    return mergedArr.filter((m) => {
        const id = check(m)
        return set.has(id) ? false : set.add(id)
    })
}

export const handleGetTopics = (ve: string, jsonData: any): string[] => {
    const keys = Object.keys(jsonData)
    const topics = keys.filter((key) => {
        return key.includes(ve) && key.includes('#topic')
    })

    const topicVals = topics.map((topic) => {
        return `${jsonData[topic]}`
    })

    return topicVals
}

export const handleGetSymbols = (ve: string, jsonData: any): string[] => {
    const keys = Object.keys(jsonData)
    const topics = keys.filter((key) => {
        return key.includes(ve) && key.includes('#topic')
    })

    const spks = keys.filter((key) => {
        return key.includes(ve) && key.includes('#spk')
    })

    const symbols = topics.map((topic, i) => {
        return `${jsonData[topic]}_${jsonData[spks[i]]}`
    })

    return symbols
}

export const handleGetSymbolsSpk = (ve: string, jsonData: any): string[] => {
    const keys = Object.keys(jsonData)
    const topics = keys.filter((key) => {
        return key.includes(ve) && key.includes('#topic')
    })

    const set: Set<string> = new Set()

    const spks = keys.filter((key) => {
        if (key.includes(ve) && key.includes('Speaker Name') && !set.has(jsonData[key])) {
            set.add(jsonData[key])
            return key.includes(ve) && key.includes('#spk')
        } else return false
    })

    const symbols = spks.map((spk, i) => {
        return `${jsonData[topics[i]]}_${jsonData[spk]}`
    })

    return symbols
}

/**
 * 判斷 url 的 params，並設定 locale 語言
 */
export const handleCheckParams = (slug: string, setLocale: Dispatch<SetStateAction<string>>) => {
    if (slug.includes('GS')) setLocale('zh')
    else if (slug.includes('GE') || slug.includes('SE') || slug.includes('AE') || slug.includes('IE')) setLocale('en')
    else if (slug.includes('JJ')) setLocale('ja')
    else if (slug.includes('KK')) setLocale('ko')
    else if (slug.includes('SI')) setLocale('id')
    else if (slug.includes('ST')) setLocale('th')
    else if (slug.includes('SV')) setLocale('vi')
    else setLocale('en')
}



export const toPercent = (num: number, total: number) => {
    return Math.round((num / total) * 10000) / 100.0
}

export const encodeName = (name: string) => {
    const re = /([^A-Za-z0-9\s]{1})([^A-Za-z0-9\s]{1})/
    return name.replace(re, '$1*')
}

export const encodeCompany = (company: string) => {
    const re1 = /有限公司|股份有限公司/g
    const re2 = /[^A-Za-z0-9\s]/

    return company.replace(re1, '').replace(re2, '*')
}

export const debounce = (func: any, wait = 450) => {
    let timer: number

    return (...args:any) => {
        window.clearTimeout(timer)
        timer = window.setTimeout(() => func.apply(this, args), wait)
    }
}
