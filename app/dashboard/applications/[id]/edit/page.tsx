import EditApplicationForm from '@/components/forms/EditApplicationForm'
import { getApplication } from '@/lib/getApplication';
import { getUser } from '@/lib/getUser'

interface Props{
    params: Promise<{id:string}>
}
export default async function Editpage({params}:Props) {

    const user = await getUser();
    if(!user){
        return <div>Unauthorized</div>
    }

    const {id} = await params;
    const application = await getApplication(
        id,
        user.userId
    );

    if(!application){
        return(
            <div>
                Application not found
            </div>
        )
    }
  return (
    <EditApplicationForm application={JSON.parse(JSON.stringify(application))}/>
  )
}
