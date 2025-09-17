"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader, Send } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import FinalUi from './FinalUi'
import SelectDays from './SelectDays'
import { useEffect } from 'react'

type Message = {
    role: string,
    content: string
    ui?: string,
}

function ChatBox() {

    const [messages, setMessages] = React.useState<Message[]>([]);
    const [userInput, setUserInput] = React.useState<string>();
    const [loading, setLoading] = useState(false);
    const [isFinal, setIsFinal] = useState(false);
    const onSend = async () => {

        if (!userInput?.trim()) return ;
        setLoading(true);
        setUserInput("");
        const newMsg:Message = {
            role: 'user',
            content: userInput
        };
        setMessages((prev:Message[])=>[...prev, newMsg]);

        const result=await axios.post('/api/aimodel', {
            messages: [...messages, newMsg]
        });
        setMessages((prev:Message[])=>[...prev, {
            role: 'assistant',
            content: result?.data?.resp,
            ui: result?.data?.ui
        }]);
        console.log(result.data);
        setLoading(false);
    }

    const RenderGenerativeUi = (ui:string) => {
        if(ui=='budget')
        {
            // Render Budget Component
            return <BudgetUi onSelectedOption={(v:string) => {setUserInput(v); onSend()}}/>;
        } else if(ui=='groupSize')
        {
            // Render Group Size Component
            return <GroupSizeUi onSelectedOption={(v:string) => {setUserInput(v); onSend()}}/>;
        } else if (ui == 'tripDuration')
        {
            // Render Select Number of Days Component
            return <SelectDays onSelectedOption={(v:string) => {setUserInput(v); onSend()}}/>;
        } else if (ui == 'final')
        {
            // Render Final Component
            return <FinalUi viewTrip={() => console.log()}/>;
        }
        return null
    }

    useEffect (() => {
        const lastMsg=messages[messages.length-1];
        if(lastMsg?.ui=='final')
        {
            setIsFinal(true);
        }
    }, [messages]);

    return (
        <div className='h-[85vh] flex flex-col'>
            {messages?.length==0&&
                <EmptyBoxState onSelectOption={(v:string) => {setUserInput(v); onSend()}}/>
            }
            {/* Display Messages */}
            <section className='flex-1 overflow-y-auto p-4'>
                {messages.map((msg: Message, index) => (
                    msg.role=='user' ?
                        <div className='flex justify-end mt-2' key={index}>
                            <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                                {msg.content}
                            </div>
                        </div> :
                        <div className='flex justify-start mt-2' key={index}>
                            <div className='max-w-lg bg-gray-100 text-gray-800 px-4 py-2 rounded-lg'>
                                {msg.content}
                                {RenderGenerativeUi(msg.ui ?? "")}
                            </div>
                        </div>
                ))}

                {loading && <div className='flex justify-start mt-2'>
                            <div className='max-w-lg bg-gray-100 text-gray-800 px-4 py-2 rounded-lg'>
                                <Loader className='animate-spin' />
                            </div>
                        </div>}

            </section>
            {/* User Input */}
            <section>
                <div className='border rounded-2xl p-4 bg-card shadow-md flex flex-col gap-4'>
                    <Textarea
                        placeholder='Start typing here...'
                        className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                        onChange={(event)=> setUserInput(event.target.value ?? "")}
                        value={userInput}
                    />
                    <Button size={'icon'} className="self-end flex items-center gap-2" onClick={() => onSend()}>
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default ChatBox