import { axiosInstance } from "@/lib/api/axiosInstance"
import { ReactionRequest } from "@/lib/validators/reaction"

export const serviceUpdateReaction = async (payload: ReactionRequest) => {
  return axiosInstance.put(`/api/reactions`, payload)
}
