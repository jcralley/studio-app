import { createContext } from '@lit/context';
import type { StudioAppProxy } from './proxies/studio-app-proxy';
export type { StudioAppProxy } from './proxies/studio-app-proxy';
export const studioAppContext = createContext<StudioAppProxy>(Symbol('studio-app'));
