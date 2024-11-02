import { Resend } from 'resend'

const { resentApiKey } = useRuntimeConfig()

export const clientResend = new Resend(resentApiKey)

export const senderR = 'onboarding@resend.dev'
