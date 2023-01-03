import { sktFetch } from './fn'

/**
 * 加入 event id 所屬房間
 * @param eventId
 * @param socketId
 * @param code
 */
export function joinInitRoom(_id: string, eventId: string, socketId: string, code: string, channelId: string) {
    sktFetch('join', { _id, eventId, socketId, code, channelId })
}

/**
 * 加入 event id 所屬聊天室
 * @param eventId
 * @param socketId
 * @param code
 * @param identifier
 */
export function userLocate(eventId: string, socketId: string, code: string, identifier: string) {
    sktFetch('userLocate', { eventId, socketId, code, identifier })
}

export function userSwitchEvent(preEventId: string, afterEventID: string, code: string, socketId: string) {
    sktFetch('userSwitchEvent', { preEventId, afterEventID, code, socketId })
}

/**
 * 獲取目前線上等待人數
 */
export async function deliverWaitingOnlineCount(code: string) {
    const { error, data } = await sktFetch('deliverWaitingOnlineCount', { code })
    return { error, data }
}

/**
 * 處理切換頻道
 * @param newEventId 要切換過去的 event id
 * @param originalEventId 原本的 event id
 * @param _id 用戶 id
 * @param channelId 要切換過去的頻道 id
 * @returns 錯誤訊息
 */
export async function changeEvent(
    newEventId: string,
    originalEventId: string,
    _id: string,
    channelId: string,
    code: string
) {
    const { error } = await sktFetch('changeEvent', { newEventId, originalEventId, _id, channelId, code })
    return error
}

/**
 * 傳送訊息或問題至後台做審查
 * @param from 傳送者 id
 * @param to 回覆至的訊息 id
 * @param msgId 該則訊息的 id
 * @param type 訊息類型
 * @param room 傳送的房間， event id
 * @param content 傳送內容
 * @param createTime 創建時間
 * @returns 錯誤訊息
 */
export async function deliverMessageToConsole<T extends string>(
    from: T,
    to: null | { replied_id: T; repliedAvatar: T; repliedName: T; repliedContent: T },
    msgId: T,
    type: T,
    room: T,
    content: T,
    createTime: number
) {
    const { error } = await sktFetch('deliverMessageToConsole', {
        from,
        to,
        msgId,
        type,
        room,
        content,
        createTime,
    })
    return error
}

/**
 * 獲取目前 agenda index
 */
export async function getCurrentAgenda(eventId: string) {
    const data = await sktFetch('getCurrentAgenda', { eventId })
    return data
}

/**
 * 獲取會後問卷開啟狀態
 */
export async function checkPostSurveyStatus() {
    const { data } = await sktFetch('checkPostSurveyStatus')
    return data
}

/**
 * 獲取群聊視窗開啟狀態
 */
export async function checkGroupChatStatus() {
    const { data } = await sktFetch('checkGroupChatStatus')
    return data
}

/**
 * 前端觸發發起抽獎監聽後，返回確認已收到
 */
export async function receiveDrawing({ code, currentEventId }: { code: string; currentEventId: string }) {
    await sktFetch('receiveDrawing', { code, currentEventId })
}

/**
 * 前端觸發發起會中問卷後，返回確認已收到
 */
export async function receiveSurvey({ code, currentEventId }: { code: string; currentEventId: string }) {
    await sktFetch('receiveSurvey', { code, currentEventId })
}
