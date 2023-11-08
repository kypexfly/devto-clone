import { PostPayload } from "@/types/post"
import { axiosInstance } from "@/lib/api/axiosInstance"
import { PostCreationRequest, PostUpdateRequest } from "@/lib/validators/post"

type CreatePostResponse = {
  username: string
  postId: string
}

export const serviceGetPosts = async (params: string) => {
  return axiosInstance.get<PostPayload[]>(`/api/posts?${params}`)
}

export const serviceCreatePost = async (payload: PostCreationRequest) => {
  return axiosInstance.post<CreatePostResponse>("/api/post", payload)
}

export const serviceUpdatePost = async (payload: PostUpdateRequest) => {
  return axiosInstance.put<CreatePostResponse>("/api/post", payload)
}

export const serviceDeletePost = async (postId: string) => {
  return axiosInstance.delete<CreatePostResponse>(`/api/post/${postId}`)
}
