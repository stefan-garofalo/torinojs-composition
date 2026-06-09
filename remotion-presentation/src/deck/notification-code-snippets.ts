export const notificationCodeSnippets = {
  postLikeClean: `function PostLikeNotification({ notification }) {
  return (
    <NotificationRow>
      <Avatar user={notification.actor} />
      <Body>{notification.actor.name} liked your post.</Body>
      <Media src={notification.post.thumbnail} />
    </NotificationRow>
  )
}`,
  followBranch: `function NotificationItem(p) {
  const followBack = useFollowBack()

  return (
    <Row>
      <Avatar user={p.actor} />
      <Body>{p.body}</Body>
      {p.type === "postLike" && <Media src={p.media} />}
      {p.type === "followRequest" && (
        <Button onClick={() => followBack(p.actor.id)}>
          Follow
        </Button>
      )}
    </Row>
  )
}`,
  dmBranch: `function NotificationItem(p) {
  const followBack = useFollowBack()
  const accept = useAcceptRequest()
  const ignore = useIgnoreRequest()

  return (
    <Row href={p.type === "dmRequest" ? p.requestHref : p.href}>
      <Avatar user={p.actor} />
      <Body>{p.body}</Body>
      {(p.type === "postLike" || p.type === "photoTag") && (
        <Media src={p.media} />
      )}
      {p.type === "followRequest" && (
        <Button onClick={() => followBack(p.actor.id)}>Follow</Button>
      )}
      {p.type === "dmRequest" && (
        <>
          <Button onClick={() => accept(p.requestId)}>Accept</Button>
          <Button onClick={() => ignore(p.requestId)}>Ignore</Button>
        </>
      )}
    </Row>
  )
}`,
  requestUsageBeforeModeration: `<NotificationItem
  type="followRequest"
  actor={user}
  body="started following you"
  primaryAction="followBack"
/>

<NotificationItem
  type="dmRequest"
  actor={user}
  body={request.preview}
  primaryAction="accept"
  secondaryAction="ignore"
/>`,
  moderationInternals: `function NotificationItem(p) {
  const followBack = useFollowBack()
  const accept = useAcceptRequest()
  const ignore = useIgnoreRequest()
  const appeal = useAppealDecision()
  const viewDecision = useViewDecision()

  return (
    <Row href={
      p.type === "moderation" ? p.decisionHref :
      p.type === "dmRequest" ? p.requestHref : p.href
    }>
      {p.type === "moderation"
        ? <SystemIcon />
        : <Avatar user={p.actor} />}
      <Body>{p.body}</Body>
      {(p.type === "postLike" || p.type === "photoTag") &&
        <Media src={p.media} />}
      {p.showInlineReason && <Reason>{p.reason}</Reason>}
      {p.type === "followRequest" &&
        <Button onClick={() => followBack(p.actor.id)}>Follow</Button>}
      {p.type === "dmRequest" && (
        <>
          <Button onClick={() => accept(p.requestId)}>Accept</Button>
          <Button onClick={() => ignore(p.requestId)}>Ignore</Button>
        </>
      )}
      {p.primaryAction === "viewDecision" &&
        <Button onClick={() => viewDecision(p.id)}>View</Button>}
      {p.secondaryAction === "appeal" &&
        <Button onClick={() => appeal(p.id)}>Appeal</Button>}
    </Row>
  )
}`,
  moderationBefore: `<NotificationItem
  type="moderation"
  actor={undefined}
  body={notification.body}
  showActor={false}
  showSystemIcon
  showInlineReason
  primaryAction="viewDecision"
  secondaryAction="appeal"
/>`,
  extractContainer: `export function ModerationNotification({ notification }) {
  const view = useModerationNotification(notification)

  return (
    <Notification.Row view={view}>
      {/* composition owns the row shape */}
    </Notification.Row>
  )
}`,
  extractActor: `export function ModerationNotification({ notification }) {
  const view = useModerationNotification(notification)

  return (
    <Notification.Row view={view}>
      <Notification.SystemIcon />
    </Notification.Row>
  )
}`,
  extractBody: `export function ModerationNotification({ notification }) {
  const view = useModerationNotification(notification)

  return (
    <Notification.Row view={view}>
      <Notification.SystemIcon />
      <Notification.Body />
      <Notification.Timestamp />
    </Notification.Row>
  )
}`,
  extractMedia: `export function PhotoTagNotification({ notification }) {
  const view = usePhotoTagNotification(notification)

  return (
    <Notification.Row view={view}>
      <Notification.Actor />
      <Notification.Body />
      <Notification.Media />
    </Notification.Row>
  )
}`,
  extractActions: `export function DMRequestNotification({ notification }) {
  const view = useDMRequestNotification(notification)

  return (
    <Notification.Row view={view}>
      <Notification.Actor />
      <Notification.Body />
      <Notification.Actions />
    </Notification.Row>
  )
}`,
  supportedShapes: `export {
  FollowRequestNotification,
  PostLikeNotification,
  DMRequestNotification,
  PhotoTagNotification,
  ModerationNotification,
  PostCommentNotification,
} from "./notifications"

export type NotificationType =
  | "followRequest"
  | "postLike"
  | "dmRequest"
  | "photoTag"
  | "moderation"
  | "postComment"

export const notificationRegistry = {
  followRequest: FollowRequestNotification,
  postLike: PostLikeNotification,
  dmRequest: DMRequestNotification,
  photoTag: PhotoTagNotification,
  moderation: ModerationNotification,
  postComment: PostCommentNotification,
} satisfies Record<NotificationType, NotificationRenderer>`,
  moderationNotification: `export function ModerationNotification({ notification }) {
  const view = useModerationNotification(notification)

  return (
    <Notification.Row view={view}>
      <Notification.SystemIcon />
      <Notification.Body />
      <Notification.Timestamp />
      <Notification.Actions />
    </Notification.Row>
  )
}`,
  postCommentNotification: `export function PostCommentNotification({ notification }) {
  const view = usePostCommentNotification(notification)

  return (
    <NotificationProvider value={view.state}>
      <Notification.Container>
        <Notification.Header />
        <Notification.Actor />
        <Notification.Body />
        <Notification.PrimaryDetail />
        <Notification.Media />
        <Notification.Actions />
      </Notification.Container>
    </NotificationProvider>
  )
}`,
} as const;
