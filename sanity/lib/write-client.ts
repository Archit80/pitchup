import "server-only"
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,    // Only if you want to use the client to create or update documents

});

if(!writeClient.config().token) {
  throw new Error("Write client requires a token to be set in the environment variables")
}

console.log("writeClient is being used in:", new Error().stack);
