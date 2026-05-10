import { NextResponse } from "next/server";
import { handleChefChat } from "@/lib/chef-engine";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await handleChefChat(body);

  return NextResponse.json(result);
}