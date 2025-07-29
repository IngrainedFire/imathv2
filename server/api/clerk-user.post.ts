// server/api/clerk-user.post.ts

import { H3Event } from 'h3'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey // Only use this server-side!
  )

  const body = await readBody(event)

  // Clerk webhook sends user info under `data`
  const { id, email_addresses } = body.data
  const email = email_addresses?.[0]?.email_address

  if (!id || !email) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Missing Clerk user data' }))
  }

  // Upsert user into Supabase
  const { error } = await supabase.from('users').upsert({
    clerk_id: id,
    email: email
  })

  if (error) {
    console.error('Supabase insert error:', error)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Database error' }))
  }

  return { success: true }
})
