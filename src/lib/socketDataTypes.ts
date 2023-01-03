// import { User, LeaderBoardUser } from '../state'

interface Option {
    option: string
    isAnswer: boolean
}

export interface Survey {
    surveyId: string
    _id: string
    category: string
    type: string
    order: number
    mustAnswer: boolean
    subject: string
    options: Option[]
    hadAsked: boolean
    eventId: string
}

export type Award = {
    _id?: string
    award: string
    prize: string
    count: number
    path: string
    winners: Winner[]
}

export interface newAwardsState extends Award {
    key: string
}

export type SwitchAgendaPageEventData = {
    message: string
    payload: { _id: string; payload: number }
}

export type ReceiveChatbotEventData = {
    message: string
    payload: { _id: string; helper:any; helperSpeech_id: string }
}

export type RaiseSurveyEventData = {
    message: string
    payload: { _id: string; surveyData: Survey }
}

export type CronJobsData = {
    message: string
    payload: { _id: string }
}

export type CronJobsErrorData = {
    message: string
    payload: { _id: string }
}

export type ReceiveLucyDrawEventData = {
    message: string
    payload: { _id: string; win: { _id: string; code: string; company: string; name: string }[] }
}

export type ReceivePostSurveyGuidingEventData = {
    message: string
    payload: { _id: string }
}

export type PostSurveyShowData = {
    postSurveyShow: boolean
    postsurveySlug: string
}

export type GroupChatShowData = {
    groupChatShow: boolean
}

export type MiddleSurveyShowData = {
    middleSurveyShow: boolean
    middleSurveySlug: string
    timeStart: number
}

export type Winner = { _id: string; name: string; code: string; company: string }

export type DrawingData = {
    message: string
    payload: { awardPkg: newAwardsState }
}

export type StartDrawingData = {
    message: string
    payload: { aid: string; currentEventId: string; winners: Winner[] }
}

// export type LeaderBoardData = {
//     leaders: LeaderBoardUser[]
// }
