import { createThemeAction } from "remix-themes"
import { getThemeSessionResolver } from "../lib/sessions.server"
import { ActionFunctionArgs } from "@remix-run/cloudflare"


export default function action ({context}: ActionFunctionArgs)  {
    const  themeSessionResolver = getThemeSessionResolver(context.env)
    createThemeAction(themeSessionResolver)
}
