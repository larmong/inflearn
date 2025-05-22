"use client";

import EmptyNote from "@/components/empty-note";
import Header from "@/components/header";
import NewNote from "@/components/new-note";
import NoteViewer from "@/components/note-viewer";
import Sidebar from "@/components/sidebar";
import {useEffect, useState} from "react";
import {supabase} from "@/utils/supabase";
import {Database} from "@/types_db";

const notes = [
  // {
  //   id: 1,
  //   title: "노트 1",
  //   content: "노트 내용입니다 1",
  // },
  // {
  //   id: 2,
  //   title: "노트 2",
  //   content: "노트 내용입니다 2",
  // },
];

export default function UI() {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState<Database["public"]["tables"]["note"]["Row"]>([]);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("note")
      .select("*")
      .ilike("title", `%${search}%`);

    if(error){
      alert(error.message)
      return;
    }
    setNotes(data);
  }

  useEffect(() => {
    void fetchNotes();
  }, [])

  useEffect(() => {
    void fetchNotes();
  }, [search])

  return (
    <main className="w-full h-screen flex flex-col">
      <Header />
      <div className="grow relative">
        <Sidebar
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          setIsCreating={setIsCreating}
          notes={notes}
          search={search}
          setSearch={setSearch}
        />
        {isCreating ? (
          <NewNote fetchNotes={fetchNotes} setIsCreating={setIsCreating} setActiveNoteId={setActiveNoteId} />
        ) : activeNoteId ? (
          <NoteViewer note={notes.find((note) => note.id === activeNoteId)} fetchNotes={fetchNotes} setActiveNoteId={setActiveNoteId} />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
}
