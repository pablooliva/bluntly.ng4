import { UIRouter } from "@uirouter/angular";

import { requiresAuthHook } from "./auth.hook";

export function uiRouterConfigFn(router: UIRouter): void {
  const transitionService = router.transitionService;
  requiresAuthHook(transitionService);
}
