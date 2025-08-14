import { Type, Static } from '@sinclair/typebox';

export const Podcast = Type.Object({
  podcastId:  Type.String(),
  title:      Type.String(),
  author:     Type.String(),
  feedUrl:    Type.Optional(Type.String()),
  artworkUrl: Type.Optional(Type.String()),
  genres:     Type.Optional(Type.Array(Type.String())),
  itunesUrl:  Type.Optional(Type.String()),
  language:   Type.Optional(Type.String()),
  firstSeenAt: Type.String(), // ISO
  lastSeenAt:  Type.String(), // ISO
  updatedAt:   Type.String()  // ISO
});

export type Podcast = Static<typeof Podcast>;
