import { axiosInstance } from "@/lib/api/axiosInstance"
import { CommentRequest } from "@/lib/validators/comment"

export const serviceCreateComment = async (payload: CommentRequest) => {
  return axiosInstance.post(`/api/posts/comment`, payload)
}
