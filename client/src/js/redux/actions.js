/* action type */
export const DUID_SET = "DUID_SET";
export const DUID_LOAD = "DUID_LOAD";

export function setDUID(duid:string) {
  return {
    type : DUID_SET,
    duid : duid
  };
}

export function loadDUID() {
  return {
    type : DUID_LOAD,
    duid : ""
  };
}
