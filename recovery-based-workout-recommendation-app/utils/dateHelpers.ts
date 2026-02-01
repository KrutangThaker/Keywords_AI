// utils/dateHelpers.ts
import {
  format,
  formatDistanceToNow,
  parseISO
} from "date-fns";

export const formatDate = (dateString: string): string => {
  const date =
    typeof dateString === "string" ? parseISO(dateString) : dateString;
  return format(date, "MMM d, yyyy");
};

export const formatTime = (dateString: string): string => {
  const date =
    typeof dateString === "string" ? parseISO(dateString) : dateString;
  return format(date, "h:mm a");
};

export const formatDateTime = (dateString: string): string => {
  const date =
    typeof dateString === "string" ? parseISO(dateString) : dateString;
  return format(date, "MMM d, yyyy • h:mm a");
};

export const getRelativeTime = (dateString: string): string => {
  const date =
    typeof dateString === "string" ? parseISO(dateString) : dateString;
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export const formatShortDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};
