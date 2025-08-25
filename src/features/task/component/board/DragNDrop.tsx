import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Anchor, Card, Group, ScrollArea, Stack, Text, useComputedColorScheme, } from "@mantine/core";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { NavLink, useLoaderData, useSubmit } from "react-router";
import type { TaskListProps } from "../../pages/TaskList.tsx";
import type { SelectOptionResponse, TaskResponse } from "../../../../types.ts";
import { NameFromEmployee } from "../../../../components/NameFromEmployee.tsx";
import { getIconByPriority, getIconByType, } from "../../../../components/IconsOnTaskTypeStatusPriority.tsx"; // Board data structure: columns mapped to their list of tasks

// Board data structure: columns mapped to their list of tasks
type BoardData = {
  [key in string]: TaskResponse[];
};

// -------------------- Column Component -------------------- //
// Droppable container representing a board column
const Column = ({
  id,
  children,
  length,
}: {
  id: string;
  children: React.ReactNode;
  length?: number;
}) => {
  const { setNodeRef } = useDroppable({ id }); // mark this column as a drop zone
  const { statuses } = useLoaderData() as TaskListProps;
  const isDark = useComputedColorScheme();
  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      ref={setNodeRef}
      bg={isDark == "dark" ? undefined : "var(--mantine-color-gray-1)"}
    >
      <Stack>
        {/* Column title */}
        <Group gap={16} align={"center"} w={"100%"}>
          <Text size="xl" fw="bold">
            {statuses.find((status) => status.value == id)?.label || ""}
          </Text>
          <Text>|</Text>
          <Text size="xl" fw="bold">
            {length}
          </Text>
        </Group>
        {/* Scrollable area for tasks */}
        <ScrollArea mih={400} mah={500} type="never">
          <Stack>{children}</Stack>
        </ScrollArea>
      </Stack>
    </Card>
  );
};

// Draggable card representing a task
const TaskCard = ({ taskId, taskName, type, priority, assignedTo }: TaskResponse) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: taskId });
  const isDark = useComputedColorScheme();
  // Apply transform (dragging movement) when this card is being dragged
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };
  const typeIcon = getIconByType(type);
  const priorityIcon = getIconByPriority(priority);
  return (
    <Card
      bg={isDark == "dark" ? "var(--mantine-color-dark-8)" : undefined}
      shadow="sm"
      radius="md"
      withBorder
      ref={setNodeRef}
      style={style}
      {...attributes} // accessibility attributes from dnd-kit
      {...listeners} // mouse/keyboard event listeners from dnd-kit
    >
      <Stack>
        <Anchor component={NavLink} to={`edit/${taskId}`} underline={"never"} style={{ zIndex: 4 }}>
          <Text size={"md"} fw={"bold"} c={"var(--mantine-color-blue-6)"}>
            {taskName}{" "}
          </Text>
        </Anchor>

        <Group>
          <Group gap={2}>
            {typeIcon}
            {type}
          </Group>
          <Group gap={2}>
            {priorityIcon}
            {priority}
          </Group>
        </Group>
        {assignedTo != null ? <NameFromEmployee {...assignedTo} fullNameOnly /> : "Not Assigned"}
      </Stack>
    </Card>
  );
};
const tasksToBoardData = (tasks: TaskResponse[], statuses: SelectOptionResponse) => {
  const data: BoardData = {};
  statuses.forEach((status) => {
    data[status.value] = [...tasks.filter((task) => task.status == status.value)];
  });
  return data;
};
// -------------------- Main Kanban Board -------------------- //
export const KanbanBoard = () => {
  const { tasks, statuses } = useLoaderData() as TaskListProps;
  // State: board columns and their tasks
  const [boardData, setBoardData] = useState<BoardData>({});
  useEffect(() => {
    setBoardData(tasksToBoardData(tasks, statuses));
  }, [tasks, statuses]);

  // State: track currently dragged task for the DragOverlay
  const [activeTask, setActiveTask] = useState<TaskResponse | null>(null);

  const submit = useSubmit();
  const dragEnd = useCallback(
    (task: TaskResponse, status: string) => {
      submit(
        {
          taskId: task.taskId,
          key: "status",
          value: status,
        },
        { method: "POST" },
      );
    },
    [submit],
  );
  // Called when dragging starts
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;
    // Find the dragged task in boardData
    const task = Object.values(boardData)
      .flat()
      .find((t) => t.taskId === taskId);

    if (task) {
      setActiveTask(task); // store task for overlay rendering
    }
  };

  // Called when dragging ends (drop)
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return; // dropped outside a valid column

    const taskId = active.id as string;
    const targetColumn = over.id as string;

    // Find source column where the task currently lives
    const sourceColumn = Object.keys(boardData).find((colId) =>
      boardData[colId as keyof typeof boardData].some((task) => task.taskId === taskId),
    );

    // If task not found or dropped into same column, do nothing
    if (!sourceColumn || sourceColumn === targetColumn) return;

    // Find the task object
    const task = boardData[sourceColumn as keyof typeof boardData].find(
      (t) => t.taskId === taskId,
    )!;

    // ***** Optimistically
    // Update board: remove task from source and prepend to target
    setBoardData((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn as keyof typeof prev].filter((t) => t.taskId !== taskId),
      [targetColumn]: [task, ...prev[targetColumn as keyof typeof prev]],
    }));

    // Clear overlay
    setActiveTask(null);
    // Hit Backend and update
    try {
      dragEnd(task, over.id as string);
    } catch {
      // revert changes if error occurs
      setBoardData((prev) => ({
        ...prev,
        [targetColumn]: prev[targetColumn as keyof typeof prev].filter((t) => t.taskId !== taskId),
        [sourceColumn]: [task, ...prev[sourceColumn as keyof typeof prev]],
      }));
    }
    // Notify user
    // notify({ title: "Success", message: `Task ${active.id} dropped into column ${over.id}` });
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200, // ms
        tolerance: 15, // allow slight movement before drag starts
      },
    }),
  );
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      {/* Columns laid out side by side, full height */}
      <Group grow my={16} align="stretch">
        {Object.entries(boardData).map(([status, tasks]) => (
          <Column key={status} id={status} length={tasks.length}>
            {tasks.map((task) => (
              <TaskCard key={task.taskId} {...task} />
            ))}
          </Column>
        ))}
      </Group>

      {/* Floating overlay for active dragged task (always on top) */}
      <DragOverlay>
        {activeTask ? <TaskCard key={activeTask.taskId} {...activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
