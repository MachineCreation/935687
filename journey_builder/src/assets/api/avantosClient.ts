const baseAPIAddress = 'http://localhost:3000'
const apiPrefix = '/api/v1/'
const apiMid = '/actions/blueprints/'
const apiSuffix = '/graph'

//build api url endpoint
export const makeAPIAddress = (
    tenant_id: string,
    action_bluepprint_id: string,
    // blueprint_version_id: string  // not used in this version of the server. old documentation?
    ) => {
    const apiAddress = baseAPIAddress + apiPrefix + tenant_id + apiMid + action_bluepprint_id + apiSuffix
    return apiAddress
}

// call api url endpoint
export const getBlueprintGraph = async (apiAddress:string) => {
    const response = await fetch(apiAddress);
    return await response.json()
}