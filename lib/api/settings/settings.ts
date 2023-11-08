import { axiosInstance } from "@/lib/api/axiosInstance"
import { SettingUpdateRequest } from "@/lib/validators/settings"

export const serviceUpdateSettings = async (payload: SettingUpdateRequest) => {
  return axiosInstance.patch(`/api/settings`, payload)
}
