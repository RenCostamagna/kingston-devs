import { eveChannel } from "eve/channels/eve"
import { none } from "eve/channels/auth"

// Demo app without end-user login: the eve HTTP routes are public.
// Swap `none()` for `vercelOidc()` / a session policy once auth is added.
export default eveChannel({ auth: [none()] })
