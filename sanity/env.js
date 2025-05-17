export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-04-02';

function assertValue(v, errorMessage) {
  if (v === undefined) throw new Error(errorMessage);
  return v;
}

export const dataset = assertValue(process.env.NEXT_PUBLIC_SANITY_DATASET, 'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET');
export const projectId = assertValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID');
export const token = process.env.SANITY_WRITE_TOKEN;
