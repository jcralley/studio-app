import { createContext } from '@lit/context';
import type { StudioAppProxy } from './StudioAppProxy';
export type { StudioAppProxy } from './StudioAppProxy';
export const studioAppContext = createContext<StudioAppProxy>(Symbol('studio-app'));
