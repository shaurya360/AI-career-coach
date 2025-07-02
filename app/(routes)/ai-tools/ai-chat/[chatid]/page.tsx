"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2Icon, SendIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptState from '../_component/EmptState'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { useParams, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
type messages={
    content:string,
    role:string,
    type:string
}

const AiChat = () => {
    const [userInput, setUserInput] = React.useState<string>('')
    const [loading,setLoading] = useState(false);
    const[messageList,setMessageList] = useState<messages[]>([]);
    const {chatid} :any= useParams();
    const router = useRouter();
    // console.log(chatid)

    useEffect(()=>{
        // console.log("update ke lie bhejra")
        chatid && GetMessageList();
    },[chatid])

    const GetMessageList = async() =>{
        const result = await axios.get('/api/history/?recordId='+chatid)
        // console.log(result.data);
        setMessageList(result.data.content);
    }

     const onSend = async() =>{
        setLoading(true);
        setMessageList(prev=>[...prev,{
            content:userInput,
            role:'user',
            type:'text'
        }])
        setUserInput('')
        const result = await axios.post('/api/ai-career-chat-agent',{
            userInput:userInput
        })
        // console.log(result.data);
        setMessageList(prev=>[...prev,result.data])
        setLoading(false);
     }

    //  console.log(messageList)
    useEffect(()=>{
        // console.log("update ke lie bhejra")
        messageList.length>0 && updatedMessagesList()
    },[messageList])
    const updatedMessagesList=async ()=>{
        // console.log("update ke lie bhejra 1")
        const result = await axios.put('/api/history',{
            content:messageList,
            recordId:chatid
        })
        // console.log("update ke lie bhejra 4")
        // console.log(result)
    }
    const onNewChat=async()=>{ 
        const id = uuidv4();
        const result = await axios.post('/api/history',{
            recordId:id,
            content:[],
            aiAgentType:'/ai-tools/ai-chat'
        })
        // console.log(result);
        router.replace('/ai-tools/ai-chat/'+id);
    }



  return (
    <div className='px-10 md:px-24 lg:px-36 xl:px-48 h-[75vh] overflow-auto'>
        <div className='flex items-center justify-between gap-8 '>
            <div>
            <h2 className='font-bold text-lg'>AI Career Q/A Chat</h2>
            <p>Smarter career decisions start here — get tailored advice, real-time market insights</p>
            </div>
            <Button onClick={onNewChat}>New Chat</Button>
        </div>
        <div className='flex flex-col h-[75vh] mt-5 '>
            {messageList?.length <=0 &&<div>
                {/* empty state ques */}
                <EmptState selectedQuestion={(question:string)=>setUserInput(question)}/>
            </div>
}
            <div className='flex-1 '>
                {/* message list */}
                {messageList?.map((message,index)=>(
                    <div>
                    <div key={index} className={`flex mb-2 ${message.role=='user'?'justify-end':'justify-start'}`}>
                        <div className={`p-3 rounded-lg gap-2 ${message.role =='user'?'bg-gray-200 text-black rounded-lg':'bg-gray-50 text-black'}`}>
                            <ReactMarkdown>
                                {message.content}
                            </ReactMarkdown>
                            
                        </div>
                    </div>
                    {loading&&messageList?.length-1==index && <div className='flex justify-start p-3 rounded-lg gap-2 bg-gray-50 text-black mb-2 w-[300px]'>
                        <Loader2Icon className='animate-spin'/> <span>generating response...</span>
                    </div>}
                    </div>
                ))}
            </div>
            <div className='flex justify-between items-center gap-5 absolute bottom-5 w-[60%]'>
                {/* input field */}
                <Input placeholder='Type here' value={userInput} onChange={(event)=>{setUserInput(event.target.value)}}/>
                <Button onClick={onSend} disabled={loading}><SendIcon/></Button>
            </div>
        </div>
    </div>
  )
}

export default AiChat