export interface GetVideoCommentsRequest {
  key: string;
  part: string;
  videoId: string;
}

export interface GetVideoCommentsResponse {
  items: YouTubeVideoComment[];
}

export interface YouTubeVideoComment {
  id: string;
  snippet: YouTubeVideoCommentSnippet;
}

export interface YouTubeVideoCommentSnippet {
  videoId: string;
  topLevelComment: YouTubeVideoTopLevelComment;
}

export interface YouTubeVideoTopLevelComment {
  id: string;
  snippet: YouTubeCommentSnippetDetails;
}

export interface YouTubeCommentSnippetDetails {
  textOriginal: string;
  authorDisplayName: string;
  publishedAt: string;
  updatedAt: string;
}