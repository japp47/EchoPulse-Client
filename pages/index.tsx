import Image from "next/image";
import { TbSocial } from "react-icons/tb";
import { BiHomeCircle, BiHash, BiBell, BiEnvelope, BiBookmark, BiUser, BiMoney, BiImageAlt } from "react-icons/bi";
import React, { useCallback, useState } from "react";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import FeedCard from "@/components/FeedCard";
import { SlOptions } from "react-icons/sl";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserToken } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateEcho, useGetAllEchoes } from "@/hooks/echo";
import { Echo } from "@/gql/graphql";
interface SidebarButton {
  title: string
  icon: React.ReactNode;
}
const sidebarMenu: SidebarButton[] = [
  {
    title : 'Home',
    icon: <BiHomeCircle />
  },
  {
    title: 'Explore',
    icon: <BiHash/>
  },
  {
    title: 'Notification',
    icon: <BiBell/>
  },
  {
    title: 'Messages',
    icon: <BiEnvelope/>
  },
  {
    title: 'Bookmarks',
    icon: <BiBookmark/>
  },
  {
    title: 'Echo Blue',
    icon: <BiMoney/>
  },
  {
    title: 'Profile',
    icon: <BiUser />
  },
  {
    title: 'More',
    icon: <SlOptions/>
  },
]
export default function Home() {
  const {user} = useCurrentUser();
  const {echoes = []} = useGetAllEchoes();
  const {mutate} = useCreateEcho();
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click();
  },[]);

  const handleCreateEcho = useCallback(() => {
    mutate({
      content,
    });
  }, [content, mutate])

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential
    if(!googleToken) return toast.error(`Google token not found`);
    const {verifyGoogleToken} = await graphqlClient.request(verifyUserToken, {token: googleToken});
    
    toast.success("Verification Successful");
    console.log(verifyGoogleToken);
    if(verifyGoogleToken) 
      window.localStorage.setItem('__echo_token', verifyGoogleToken);
    await queryClient.invalidateQueries({queryKey:["current-user"]});
  }, 
  [queryClient])
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-52">
        <div className="col-span-3 pt-1 ml-28 relative">
          <div className="text-3xl h-fit hover:bg-gray-900 rounded-full p-4 w-fit cursor-pointer transition-all"> 
            <TbSocial />
          </div>
        <div className="mt-1 text-xl pr-4">
          <ul>
            {sidebarMenu.map((item)=> (
              <li className="flex mt-2 justify-start items-center gap-3 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer" key = {item.title}>
                <span className="text-2xl">{item.icon}</span>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 px-2">
              <button className= 'bg-[#1d9bf0] py-2 px-4 font-semibold w-full rounded-full text-lg'>Echo</button>

          </div>
        </div>
        {user && 
        <div className="bottom-5 absolute flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full ">
          {user && user.profileImageURL && 
            <Image className="rounded-full"
              src={user?.profileImageURL} 
              alt="user-image"
              height={50}
              width={50}/>}
              <div>
               <h3 className='text-lg'>{user.firstName} {user.lastName}</h3>
               
              </div>
        </div>
        }
      </div>
        <div className="col-span-5 border-r-[0.2px] h-screen overflow-scroll border-l-[0.2px] border-gray-600">
          <div>
          <div className='border border-r-0 border-l-0 border-t-0 border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer'>
            <div className='grid grid-cols-12 gap-3'>
            <div className='col-span-1'>
                    {user?.profileImageURL && 
                    <Image className='rounded-full'
                        src = {user?.profileImageURL}
                        alt = "user_avatar" 
                        height = {50}
                        width = {50}
                    />}
                </div>
                <div className= "col-span-11 ">
                  <textarea 
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                    className="w-full bg-transparent text-xl px-3 border-b border-slate-700" 
                    rows={3}
                    placeholder="Shooot up!!">

                  </textarea>
                  <div className="mt-2 flex justify-between items-center">
                    <BiImageAlt onClick={handleSelectImage} className="text-xl"/>
                    <button 
                      onClick={handleCreateEcho}
                      className= 'bg-[#1d9bf0] py-2 px-4 font-semibold rounded-full text-sm'>
                        Echo
                    </button>
                  </div>
                </div>
            </div>
          </div>
          </div>
          {
            echoes?.map(echo => 
              echo ? <FeedCard key = {echo?.id} data = {echo as Echo}/>: null)
          }
          

        </div>
        <div className="col-span-3 p-5">
          {!user &&
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-xl">New to EchoPulse?</h1>
                <GoogleLogin onSuccess={handleLoginWithGoogle}/>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
   
      