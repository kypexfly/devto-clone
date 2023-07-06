import {z} from "zod"

export const SettingsUpdateValidator = z.object({
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/).optional(),
  bio: z.string().max(200).optional(),
  location: z.string().max(100).optional(),
  website: z.string().max(200).optional(),
})

export type SettingUpdateRequest = z.infer<typeof SettingsUpdateValidator>