"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { aiToolsList } from './AiTools';
import Link from 'next/link';
import { Divide } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const History = () => {
    const [userHistory,setUserHistory] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
      getHistroy();
    },[])
    const getHistroy=async()=>{
      setLoading(true);
      const result = await axios.get('/api/history');
      // console.log(result.data)
      setUserHistory(result.data);
      setLoading(false);
    }
    const GetAgentName=(path:string)=>{
      const agent = aiToolsList.find(item=>item.path==path)
      return agent;
    }

  return (
    <div className='mt-5 p-5 border rounded-xl'>
        <h2 className='font-bold text-lg'>Previous History</h2>
        <p>What Your previously work on, You can find here</p>
        
        {loading&& 
        <div>
          {[1,2,3,4,5].map((item,index)=>(
            <div key={index}>
              <Skeleton className='h-[50px] w-full mt-4 rounded-md'/>
            </div>
          ))}
        </div>
        }
        
        {
            userHistory?.length == 0&&!loading ?
            <div className='flex items-center justify-center mt-5 flex-col mt-6'>
                <Image src={'/idea.png'} alt='bulb' width={50} height={50}/>
                <h2>You do not have any history</h2>
                <Button className='mt-3'>Explore AI tools</Button>
            </div>
            :
            <div>
              {userHistory?.map((history:any,index:number)=>(
                <Link href={history?.aiAgentType+'/'+history.recordId} className='flex justify-between items-center space-y-6 border p-3 rounded-lg my-3'>
                <div key={index} className='flex gap-5'>
                  {/* @ts-ignore */}
                  <Image src={GetAgentName(history?.aiAgentType)?.icon} alt='image' width={20} height={20}/>
                  <h2>{GetAgentName(history?.aiAgentType)?.name}</h2>
                </div>
                <h2>{history.createdAt}</h2>
                </Link>
                
              ))}
            </div>
        }
    </div>
  )
}

export default History
