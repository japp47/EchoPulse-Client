import React from 'react'
import Image from 'next/image'
import { BiHeart, BiMessageRounded, BiUpload } from 'react-icons/bi'
import { FaRetweet } from 'react-icons/fa'
import { Echo } from '@/gql/graphql'

interface FeedCardProps {
    data: Echo
}
const FeedCard: React.FC<FeedCardProps> = (props) => {
    const {data} = props
    return <div>
        <div className='border border-r-0 border-l-0 border-t-0 border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer'>
            <div className='grid grid-cols-12 gap-3'>
                <div className='col-span-1'>
                    {data.author?.profileImageURL && 
                    <Image className='rounded-full'
                        src = {data.author?.profileImageURL} 
                        alt = "user_avatar" 
                        height = {50}
                        width = {50}
                    />}
                </div>
                <div className='col-span-11'>
                    <h5>{data.author?.firstName} {data.author?.lastName}</h5>
                    <p>
                        {data.content }
                    </p>
                    <div className='flex justify-between p-2 mt-5 text-xl items-center w-[90%]'>
                        <div>
                            <BiMessageRounded/>
                        </div>
                        <div>
                            <FaRetweet/>
                        </div>
                        <div>
                            <BiHeart/>
                        </div>
                        <div>
                            <BiUpload/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FeedCard