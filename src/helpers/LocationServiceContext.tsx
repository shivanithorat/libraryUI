import { LocationService } from '@tmtsoftware/esw-ts'
import { createCtx } from './createCtx'

const locationService = LocationService()

// wrapped in context for testing purpose
export const [useLocationService, LocationServiceProvider] = createCtx(() => locationService)
