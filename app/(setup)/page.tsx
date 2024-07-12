import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { InitialModel } from "@/components/models/initial-model";

const SetupPage =  async() => {

        const profile = await initialProfile();

        if (!profile || !('id' in profile)) {
            return <div>Error creating profile</div>;
        }

        const server = await db.server.findFirst({
            where: {
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            }
        });

        if (server) {
      
            return redirect(`/servers/${server.id}`);
        }

        return  <InitialModel/>
    }

export default SetupPage;
