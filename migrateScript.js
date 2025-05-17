import 'dotenv/config';
import { writeClient } from './sanity/lib/write-client.js';

async function migrate() {
  const docs = await writeClient.fetch(`*[_type == "startup"]{_id, upvotes, downvotes, comments}`);
  for (const doc of docs) {
    const patch = {};

    if (!Array.isArray(doc.upvotes)) patch.upvotes = [];
    if (!Array.isArray(doc.downvotes)) patch.downvotes = [];
    if (!Array.isArray(doc.comments)) patch.comments = [];
    if (Object.keys(patch).length) {
      console.log(`Patching ${doc._id}...`);
      await writeClient.patch(doc._id).set(patch).commit();
    }
  }
  console.log('Migration complete!');
}

migrate().catch(console.error);