import { Resend } from 'resend'

const { resentApiKey } = useRuntimeConfig()

export const clientResend = new Resend(resentApiKey)

export const sender = 'onboarding@resend.dev'
