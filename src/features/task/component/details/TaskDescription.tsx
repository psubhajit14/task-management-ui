import { useLoaderData, useSubmit } from "react-router";
import { Stack, Text } from "@mantine/core";
import type { TaskDetailsProps } from "../../pages/TaskDetails.tsx";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useDebouncedCallback } from "@mantine/hooks";

export const TaskDescription = () => {
  const { task } = useLoaderData() as TaskDetailsProps;
  const submit = useSubmit();
  const handleChangeDescription = useDebouncedCallback(
    (value: string) =>
      submit(
        {
          key: "taskDescription",
          value: value,
        },
        { method: "POST" },
      ),
    5000,
  );
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: task.taskDescription,
    onUpdate: ({ editor }) => {
      handleChangeDescription(editor.getHTML());
    },
  });
  return (
    <Stack gap={16} mt={32}>
      <Stack>
        <Text size={"md"} fw={"bold"}>
          Task Description
        </Text>
        <Text c={"dimmed"} size={"xs"}>
          ** Update on the task will update the description on 5 sec automatically
        </Text>
      </Stack>
      <RichTextEditor editor={editor} mih={400} variant={"subtle"}>
        <RichTextEditor.Toolbar sticky stickyOffset="var(--docs-header-height)">
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Stack>
  );
};
