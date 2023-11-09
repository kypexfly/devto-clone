import { axiosInstance } from "@/lib/api/axiosInstance"
import { BookmarkRequest } from "@/lib/validators/bookmark"

export const serviceUpdateBookmark = async (payload: BookmarkRequest) => {
  return axiosInstance.put(`/api/bookmarks`, payload)
}
