import {
  Accordion,
  AccordionControl,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Code,
  Grid,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { TextInput } from "../../../../../components/TextInput.tsx";
import { profileImg } from "../../../../../constants.ts";
import { useEffect, useRef, useState } from "react";
import { useHotkeys, useIntersection } from "@mantine/hooks";
import { Form, useActionData, useNavigate, useParams } from "react-router";
import type { CommentResponse, Page } from "../../../../../types.ts";
import { loadMoreComment } from "../../../../../api/comment.ts";
import { differenceInSeconds, formatDistanceToNow } from "date-fns";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";

// ---------------------------
// Create / Update Form
// ---------------------------
const CreateOrUpdateComment = ({
  comment,
  onSuccess,
}: {
  comment?: CommentResponse;
  onSuccess?: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { commentId } = (useActionData() as CommentResponse) ?? {};
  const navigate = useNavigate();

  // focus with hotkey
  useHotkeys([["M", () => inputRef.current?.focus()]], ["INPUT", "TEXTAREA"]);

  // clear input + trigger callback when action succeeds
  useEffect(() => {
    if (commentId && inputRef.current) {
      if (onSuccess) onSuccess();
      navigate("."); // reset action data
    }
  }, [commentId, navigate, onSuccess]);

  return (
    <Form action="." method="POST" key={commentId}>
      <Grid dir="row" grow>
        {/* avatar */}
        <Grid.Col flex={1}>
          <Avatar src={profileImg} />
        </Grid.Col>

        {/* intent (create/update) */}
        {comment?.commentId ? (
          <>
            <input hidden name="intent" value="update" readOnly />
            <input hidden name="commentId" value={comment.commentId} readOnly />
          </>
        ) : (
          <input hidden name="intent" value="create" readOnly />
        )}

        {/* content input */}
        <Grid.Col flex={25} dir="column" my={8}>
          <TextInput
            required
            label="Add a comment..."
            ref={inputRef}
            name="content"
            defaultValue={comment?.content}
          />

          {/* footer */}
          <Group justify="space-between" my={4}>
            <Box display="flex">
              <Text fw="bold" c="dimmed" mr={8}>
                Pro Tip:
              </Text>
              <Text>
                Press <Code c="var(--mantine-color-bright)">M</Code> to comment
              </Text>
            </Box>
            {comment?.commentId ? (
              <Group gap={4}>
                <Button type="submit">Update</Button>
                <Button variant={"outline"} c={"var(--mantine-color-bright)"} onClick={onSuccess}>
                  Cancel
                </Button>
              </Group>
            ) : (
              <Button type="submit">Save</Button>
            )}
          </Group>
        </Grid.Col>
      </Grid>
    </Form>
  );
};

// ---------------------------
// Single Comment
// ---------------------------
const CommentItem = ({ comment }: { comment: CommentResponse }) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <CreateOrUpdateComment comment={comment} onSuccess={() => setEditing(false)} />;
  }

  const isEdited = differenceInSeconds(comment.createdAt, comment.updatedAt) !== 0;

  return (
    <Grid dir="row" grow>
      <Grid.Col flex={1}>
        <Avatar src={profileImg} />
      </Grid.Col>

      <Grid.Col flex={25} dir="column">
        <Stack gap={0}>
          <Group>
            <Text fw="bold" size="sm">
              {comment.content}
            </Text>
            <Text c="dimmed">
              {formatDistanceToNow(comment.updatedAt, { addSuffix: true })} {isEdited && "(Edited)"}
            </Text>
          </Group>

          <Group gap={4}>
            <Button
              variant="subtle"
              p={0}
              c="var(--mantine-color-bright)"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
            •
            <Form action="." method="POST">
              <input hidden name="intent" value="delete" readOnly />
              <input hidden name="commentId" value={comment.commentId} readOnly />
              <Button variant="subtle" p={0} c="var(--mantine-color-bright)" type="submit">
                Delete
              </Button>
            </Form>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

// ---------------------------
// Comment List
// ---------------------------
export const CommentList = () => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [content, setContent] = useState<Page<CommentResponse>>();
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");

  const actionRes = useActionData() as CommentResponse;
  const containerRef = useRef<HTMLDivElement>(null);
  const { taskId } = useParams();

  // infinite scroll intersection
  const { ref: loaderRef, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  // toggle sort
  const toggleSortBy = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSortBy((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // reload after action or sort change
  useEffect(() => {
    if (actionRes) {
      loadComments(0, sortBy);
    }
  }, [actionRes, sortBy]);

  // reset list when sort changes
  useEffect(() => {
    setPage(0);
    setComments([]);
  }, [sortBy]);

  // infinite scroll load
  useEffect(() => {
    if (entry?.isIntersecting) {
      loadComments(page, sortBy);
    }
  }, [entry?.isIntersecting, sortBy]);

  const loadComments = (page: number, sort: string) => {
    loadMoreComment(taskId as string, page, sort).then((res) => {
      const response = res as Page<CommentResponse>;
      setComments((prev) => (page === 0 ? [...response.content] : [...prev, ...response.content]));
      setContent(response);
      setPage(page + 1);
    });
  };

  return (
    <Accordion variant="contained">
      <Accordion.Item value="comments">
        {/* header */}
        <AccordionControl chevron={<></>}>
          <Group w="100%" justify="space-between" my={8}>
            <Text fw="bold" size="lg">
              Comments
            </Text>
            {sortBy === "asc" ? (
              <IconSortAscending onClick={toggleSortBy} />
            ) : (
              <IconSortDescending onClick={toggleSortBy} />
            )}
          </Group>
        </AccordionControl>

        {/* body */}
        <AccordionPanel>
          <ScrollArea ref={containerRef} h={300} type="never" overscrollBehavior="contain">
            {/* comment form */}
            <CreateOrUpdateComment />

            {/* comment list */}
            {comments.length > 0 && (
              <Stack>
                {comments.map((c) => (
                  <CommentItem key={c.commentId} comment={c} />
                ))}
              </Stack>
            )}

            {/* loader / end */}
            <Group justify="center" mt={48}>
              {page !== content?.totalPages && !content?.empty ? (
                <Loader ref={loaderRef} variant="circle" />
              ) : (
                <Text c="dimmed" size="sm">
                  No More Comments
                </Text>
              )}
            </Group>
          </ScrollArea>
        </AccordionPanel>
      </Accordion.Item>
    </Accordion>
  );
};
