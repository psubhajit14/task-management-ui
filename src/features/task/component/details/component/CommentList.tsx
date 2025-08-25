import { Avatar, Button, Code, Grid, Group, Loader, Stack, Text } from "@mantine/core";
import { TextInput } from "../../../../../components/TextInput.tsx";
import { profileImg } from "../../../../../constants.ts";
import { useEffect, useRef, useState } from "react";
import { useHotkeys, useIntersection } from "@mantine/hooks";
import { useLoaderData, useSearchParams } from "react-router";
import type { CommentResponse, Page } from "../../../../../types.ts";

const CreateComment = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };
  useHotkeys([["M", () => handleFocus()]], ["INPUT", "TEXTAREA"]);
  return (
    <Grid dir={"row"} grow>
      <Grid.Col flex={1}>
        <Avatar src={profileImg} />
      </Grid.Col>
      <Grid.Col flex={25} dir={"column"}>
        <TextInput label={"Add a comment..."} ref={inputRef} />
        <Group justify={"space-between"} my={4}>
          <Text fw={"bold"} c={"dimmed"}>
            Pro tip:{" "}
            <Text display={"inline"}>
              Press <Code c={"var(--mantine-color-bright)"}>M</Code> to comment
            </Text>
          </Text>
          <Button>Save</Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
};

const Comment = ({ comment }: { comment: CommentResponse }) => {
  return (
    <Grid dir={"row"} grow>
      <Grid.Col flex={1}>
        <Avatar src={profileImg} />
      </Grid.Col>
      <Grid.Col flex={25} dir={"column"}>
        <Text fw={"bold"} size={"sm"}>
          {comment.content}
        </Text>
      </Grid.Col>
    </Grid>
  );
};

export const CommentList = () => {
  const { content, last, empty } = useLoaderData() as Page<CommentResponse>;
  const [commentsList, setCommentsList] = useState<CommentResponse[]>([]);
  useEffect(() => {
    setCommentsList((prev) => [...content, ...prev]);
  }, [content]);
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1,
  });
  const [, setPage] = useState(1);
  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage((p) => {
        const newParams = new URLSearchParams();
        newParams.set("page", (p + 1).toString());
        setSearchParams(newParams);
        return p + 1;
      });
    }
  }, [entry, setSearchParams]);
  return (
    <Stack>
      <CreateComment />
      {commentsList.length > 0 && (
        <Stack>
          {commentsList.map((comment) => (
            <Comment comment={comment} />
          ))}
        </Stack>
      )}
      {/* sentinel */}
      {!last && !empty && (
        <div
          ref={ref}
          style={{ height: 40, display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Loader size="sm" />
        </div>
      )}
    </Stack>
  );
};
