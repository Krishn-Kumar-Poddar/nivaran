"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestDatabase() {
  const [message, setMessage] = useState("Testing connection...");

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("categories")
        .select("*");

      if (error) {
        console.error(error);
        setMessage(`Error: ${error.message}`);
        return;
      }

      setMessage(`Connected! Found ${data.length} categories.`);
      console.log(data);
    }

    testConnection();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f3]">
      <div className="rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-[#0f1c3f]">
          Nivaran Database Test
        </h1>

        <p className="mt-4 text-slate-600">
          {message}
        </p>
      </div>
    </main>
  );
}