const baseAPIAddress = 'http://localhost:3000'
const apiPrefix = '/api/v1/'
const apiMid = '/actions/blueprints/'
const apiSuffix = '/graph'

import type { Blueprint } from "../types/blueprintGraph"

//build api url endpoint
export const makeAPIAddress = (
    tenant_id: string,
    action_blueprint_id: string,
    // blueprint_version_id: string  // not used in this version of the server. old documentation?
    ) => {
    const apiAddress = baseAPIAddress + apiPrefix + tenant_id + apiMid + action_blueprint_id + apiSuffix
    return apiAddress
}

// call api url endpoint
export const getBlueprintGraph = async (apiAddress:string):Promise<number | Blueprint> => {
    const response = await fetch(apiAddress);
    if (!response.ok) {
        alert(`API responded with ${response.status}`)
        return response.status
    }
    return await response.json() as Blueprint
}