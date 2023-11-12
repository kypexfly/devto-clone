import { clsx, type ClassValue } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import locale from "date-fns/locale/en-US"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: "{{count}} seconds",
  xSeconds: "{{count}} seconds",
  halfAMinute: "30 seconds",
  lessThanXMinutes: "{{count}} minutes",
  xMinutes: "{{count}} minutes",
  aboutXHours: "{{count}} hours",
  xHours: "{{count}} hours",
  xDays: "{{count}} days",
  aboutXWeeks: "{{count}} weeks",
  xWeeks: "{{count}} weeks",
  aboutXMonths: "{{count}} months",
  xMonths: "{{count}} months",
  aboutXYears: "{{count}} year",
  xYears: "{{count}} year",
  overXYears: "{{count}} year",
  almostXYears: "{{count}} year",
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result
    } else {
      if (result === "just now") return result
      return result + " ago"
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function partiallyShowEmail(
  email: string,
  visibleCharacters: number
): string {
  const atIndex = email.indexOf("@")
  if (atIndex === -1) {
    return email
  }

  const [username, domain] = email.split("@")

  const visibleUsername = username.slice(0, visibleCharacters)
  const maskedUsername = "*".repeat(
    Math.max(0, username.length - visibleCharacters)
  )

  return `${visibleUsername}${maskedUsername}@${domain}`
}

export function isCurrentPathOrChild(
  currentPath: string,
  targetPath: string
): boolean {
  if (targetPath === currentPath) {
    return true
  }

  if (currentPath.startsWith(targetPath + "/")) {
    return true
  }

  return false
}

export async function delayServer(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
