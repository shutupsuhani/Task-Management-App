"use server";

import User from "@/lib/modals/user.modal";
import { connect } from "@/lib/dbConnect";

export async function createUser(user: any) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}